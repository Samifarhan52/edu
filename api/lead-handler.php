<?php
/**
 * The Edu Consultant - Production Lead & Meeting Booking Handler
 * Optimized for Hostinger PHP 8.x + MySQL
 * Features:
 * 1. REST API endpoint accepting JSON payloads from frontend forms
 * 2. Input validation & XSS sanitization
 * 3. Rate limiting per client IP
 * 4. Storage into Hostinger MySQL (with JSON persistence fallback)
 * 5. Automatic email dispatch to farazahamad201@gmail.com, enquiry@theeduconsultant.com, and confirmation to student
 */

define('EDU_APP_SECURE', true);
require_once __DIR__ . '/config.php';

// Set Headers
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// Allow same-origin or localhost for development
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (!empty($origin)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['status' => 'error', 'message' => 'Method not allowed (405). Use POST.']));
}

// 1. IP-Based Rate Limiting (10 requests per 5 minutes)
$clientIp = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateDir = __DIR__ . '/../data/ratelimit';
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0755, true);
}
$rateFile = $rateDir . '/' . md5($clientIp) . '.json';
$now = time();
$history = [];
if (file_exists($rateFile)) {
    $content = @file_get_contents($rateFile);
    $history = json_decode($content, true) ?: [];
}
// Keep requests in the last 300 seconds
$history = array_filter($history, function ($ts) use ($now) {
    return ($now - $ts) < 300;
});
if (count($history) >= 10) {
    http_response_code(429);
    exit(json_encode(['status' => 'error', 'message' => 'Rate limit exceeded. Please wait 5 minutes before submitting again.']));
}
$history[] = $now;
@file_put_contents($rateFile, json_encode(array_values($history)));

// 2. Read and Decode Request Payload
$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput, true);
if (!$payload && !empty($_POST)) {
    $payload = $_POST;
}

if (!$payload || !is_array($payload)) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Invalid JSON request payload.']));
}

// 3. Extract and Sanitize Fields
function sanitizeField($str) {
    if ($str === null) return '';
    return htmlspecialchars(strip_tags(trim((string)$str)), ENT_QUOTES, 'UTF-8');
}

$type        = sanitizeField($payload['type'] ?? 'lead'); // 'lead', 'meeting', 'contact'
$name        = sanitizeField($payload['name'] ?? '');
$email       = filter_var(trim($payload['email'] ?? ''), FILTER_VALIDATE_EMAIL) ? trim($payload['email']) : '';
$phone       = sanitizeField($payload['phone'] ?? '');
$destination = sanitizeField($payload['destination'] ?? $payload['country'] ?? '');
$service     = sanitizeField($payload['service'] ?? $payload['topic'] ?? '');
$message     = sanitizeField($payload['message'] ?? $payload['notes'] ?? '');
$date        = sanitizeField($payload['date'] ?? $payload['preferredDate'] ?? '');
$time        = sanitizeField($payload['time'] ?? $payload['preferredTime'] ?? '');
$whatsappOpt = !empty($payload['whatsappOptIn']) ? 1 : 0;
$source      = sanitizeField($payload['source'] ?? 'Website Inquiry');

if (empty($name) || (empty($phone) && empty($email))) {
    http_response_code(422);
    exit(json_encode(['status' => 'error', 'message' => 'Name and either Phone or Email are required.']));
}

$recordId = ($type === 'meeting' ? 'MTG-' : 'LED-') . date('Ymd') . '-' . substr(md5(uniqid(mt_rand(), true)), 0, 6);
$createdAt = date('Y-m-d H:i:s');

// 4. Persistence into Hostinger MySQL (with JSON fallback)
$pdo = getDbConnection();
$savedToDb = false;

if ($pdo) {
    try {
        if ($type === 'meeting') {
            $stmt = $pdo->prepare("INSERT INTO meetings (id, name, email, phone, preferred_date, preferred_time, topic, notes, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending', ?)");
            $stmt->execute([$recordId, $name, $email, $phone, $date, $time, $service, $message, $createdAt]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO leads (id, name, email, phone, destination, service, message, source, whatsapp_opt_in, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', ?)");
            $stmt->execute([$recordId, $name, $email, $phone, $destination, $service, $message, $source, $whatsappOpt, $createdAt]);
        }
        $savedToDb = true;
    } catch (Exception $e) {
        error_log("DB Save Error: " . $e->getMessage());
    }
}

// Backup / Fallback JSON storage
$dataDir = __DIR__ . '/../data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}
$archiveFile = $dataDir . '/' . ($type === 'meeting' ? 'meetings_archive.json' : 'leads_archive.json');
$archive = [];
if (file_exists($archiveFile)) {
    $archive = json_decode(@file_get_contents($archiveFile), true) ?: [];
}
$archive[] = [
    'id' => $recordId,
    'type' => $type,
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'destination' => $destination,
    'service' => $service,
    'message' => $message,
    'date' => $date,
    'time' => $time,
    'whatsappOptIn' => $whatsappOpt,
    'source' => $source,
    'createdAt' => $createdAt,
    'savedToDb' => $savedToDb
];
@file_put_contents($archiveFile, json_encode($archive, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

// 4b. Stream to Google Sheets / Live Excel Webhook
$sheetsWebhookUrl = 'https://script.google.com/macros/s/AKfycbxgUoEMiYVQIPi-LE0rqW2Mho63s1JV6WbbPNnOsGwdgoDDP6VQAYf1ImfulmWRb1bn/exec';
if (!empty($sheetsWebhookUrl) && function_exists('curl_init')) {
    $sheetPayload = json_encode([
        'type' => $type,
        'id' => $recordId,
        'timestamp' => date('c'),
        'dateFormatted' => date('d M Y, h:i A'),
        'name' => $name,
        'phone' => $phone,
        'email' => $email,
        'destination' => $destination,
        'service' => $service,
        'message' => $message,
        'preferredDate' => $date,
        'preferredTime' => $time,
        'whatsappOptIn' => $whatsappOpt ? 'YES' : 'NO',
        'source' => $source,
        'status' => 'New',
        'account' => 'enquiry@theeduconsultant.com & farazahamad201@gmail.com'
    ]);

    $ch = curl_init($sheetsWebhookUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $sheetPayload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: text/plain;charset=utf-8']);
    curl_setopt($ch, CURLOPT_TIMEOUT, 4);
    @curl_exec($ch);
    @curl_close($ch);
}

// 5. Send Notification Emails via Hostinger Mail
$mailSubject = ($type === 'meeting') 
    ? "New Scheduled Meeting: $name ($date $time)" 
    : "New Lead Inquiry: $name ($source)";

$mailBody = "
==================================================
THE EDU CONSULTANT - NEW CLIENT INQUIRY
==================================================
Record ID    : $recordId
Submission   : " . strtoupper($type) . "
Date & Time  : $createdAt
Client Name  : $name
Phone Number : $phone
Email Address: $email
Destination  : $destination
Service/Topic: $service
Preferred Date/Time: $date $time
WhatsApp Sync: " . ($whatsappOpt ? 'YES' : 'NO') . "
Source Page  : $source

Message / Notes:
$message
==================================================
";

// Headers for Admin Notification
$headers = "From: " . NOREPLY_EMAIL . "\r\n";
$headers .= "Reply-To: " . ($email ?: NOREPLY_EMAIL) . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send to farazahamad201@gmail.com and enquiry@theeduconsultant.com
@mail(ADMIN_EMAIL, $mailSubject, $mailBody, $headers);
@mail(ENQUIRY_EMAIL, $mailSubject, $mailBody, $headers);

// Send Auto-Confirmation to Student if valid email provided
if (!empty($email)) {
    $studentSubject = "We received your inquiry - The Edu Consultant";
    $studentBody = "Dear $name,\n\nThank you for reaching out to The Edu Consultant.\n\nWe have received your " . ($type === 'meeting' ? "meeting request for $date at $time" : "admissions inquiry") . ".\nOur senior advisory team will review your requirements and reach out to you directly on WhatsApp ($phone) or via phone shortly.\n\nKey Office Contacts:\nPhone / WhatsApp: +91 9845371459\nDirect Email: farazahamad201@gmail.com / enquiry@theeduconsultant.com\nAddress: Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025\n\nWarm regards,\nFaraz Ahamed\nFounder & Principal Consultant\nThe Edu Consultant\nhttps://theeduconsultant.com\n";
    
    $studentHeaders = "From: " . NOREPLY_EMAIL . "\r\n";
    $studentHeaders .= "Reply-To: " . ENQUIRY_EMAIL . "\r\n";
    $studentHeaders .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $studentHeaders .= "MIME-Version: 1.0\r\n";
    $studentHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    @mail($email, $studentSubject, $studentBody, $studentHeaders);
}

// 6. Optional: Forward to Live Google Sheets / Excel Webhook
if (defined('SHEETS_WEBHOOK_URL') && !empty(SHEETS_WEBHOOK_URL)) {
    try {
        $ch = curl_init(SHEETS_WEBHOOK_URL);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            'type' => $type,
            'id' => $recordId,
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'destination' => $destination,
            'service' => $service,
            'message' => $message,
            'preferredDate' => $date,
            'preferredTime' => $time,
            'whatsappOptIn' => $whatsappOpt ? 'YES' : 'NO',
            'source' => $source,
            'status' => 'New',
            'account' => ENQUIRY_EMAIL
        ]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 4);
        @curl_exec($ch);
        curl_close($ch);
    } catch (Exception $chErr) {}
}

// 7. Return Clean Success JSON Response
http_response_code(200);
echo json_encode([
    'status' => 'success',
    'id' => $recordId,
    'message' => ($type === 'meeting') ? 'Your meeting request has been submitted successfully.' : 'Your inquiry has been received. Our counselor will contact you shortly.',
    'savedToDatabase' => $savedToDb,
    'emailsDispatched' => true
]);
?>
