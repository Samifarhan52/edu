<?php
/**
 * The Edu Consultant - Production OTP Dispatch Service (Email & SMS)
 * Sends real 6-digit one-time passcodes to student email addresses and phone numbers.
 */

define('EDU_APP_SECURE', true);
require_once __DIR__ . '/config.php';

// Set Headers
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// CORS handling
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

// Read and decode JSON payload
$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput, true);
if (!$payload && !empty($_POST)) {
    $payload = $_POST;
}

if (!$payload || !is_array($payload)) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Invalid JSON request payload.']));
}

$target   = trim($payload['target'] ?? '');
$channel  = strtolower(trim($payload['channel'] ?? 'email'));
$otp      = trim($payload['otp'] ?? '');
$name     = trim($payload['name'] ?? 'Scholar');
$context  = trim($payload['context'] ?? 'signup');
$altEmail = trim($payload['altEmail'] ?? '');

if (empty($target) || empty($otp)) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Target and OTP are required.']));
}

// 1. Dispatch Email OTP
$mailSent = false;
$emailTarget = ($channel === 'email') ? $target : $altEmail;

if (!empty($emailTarget) && filter_var($emailTarget, FILTER_VALIDATE_EMAIL)) {
    $subject = "Your Verification Code: $otp - The Edu Consultant";
    $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $contextLabel = ($context === 'login') ? 'Sign-In Security Verification' : 'Portal Account Registration';

    $htmlBody = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6fa; margin: 0; padding: 20px; }
            .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,100,0.08); border: 1px solid #e2e8f0; }
            .header { background-color: #000064; padding: 32px 24px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
            .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.85; }
            .content { padding: 32px 28px; color: #334155; }
            .greeting { font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #0f172a; }
            .instruction { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
            .otp-box { background: #f8fafc; border: 2px dashed #000064; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
            .otp-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; margin-bottom: 8px; }
            .otp-code { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #000064; margin: 0; }
            .validity { font-size: 12px; color: #dc2626; font-weight: 600; margin-top: 8px; }
            .warning { font-size: 12px; color: #64748b; line-height: 1.5; border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 24px; }
            .footer { background: #f1f5f9; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; line-height: 1.5; }
            .footer a { color: #000064; text-decoration: none; font-weight: 600; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>The Edu Consultant</h1>
                <p>Global Higher Education Admissions & Mentorship</p>
            </div>
            <div class='content'>
                <div class='greeting'>Hello $safeName,</div>
                <div class='instruction'>
                    Please use the following 6-digit one-time security code (OTP) to complete your <strong>$contextLabel</strong>:
                </div>
                <div class='otp-box'>
                    <div class='otp-label'>Your 6-Digit Passcode</div>
                    <div class='otp-code'>$otp</div>
                    <div class='validity'>⏱ Code valid for 5 minutes</div>
                </div>
                <div class='warning'>
                    <strong>Security Notice:</strong> Never share this verification passcode with anyone. The Edu Consultant advisors will never ask for your private verification code. If you did not initiate this request, please safely disregard this email.
                </div>
            </div>
            <div class='footer'>
                <strong>The Edu Consultant Global Admissions</strong><br>
                Direct Advisory Hotline: <a href='tel:+919845371459'>+91 9845371459</a> | Email: <a href='mailto:enquiry@theeduconsultant.com'>enquiry@theeduconsultant.com</a><br>
                Bangalore Headquarters: Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025
            </div>
        </div>
    </body>
    </html>
    ";

    $headers  = "From: " . BRAND_NAME . " <" . NOREPLY_EMAIL . ">\r\n";
    $headers .= "Reply-To: " . ENQUIRY_EMAIL . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    $mailSent = @mail($emailTarget, $subject, $htmlBody, $headers);
}

// 2. Dispatch SMS OTP (Live Gateway or SMS Bridge)
$smsDispatched = false;
$smsMessage = "Your The Edu Consultant verification code is: $otp. Valid for 5 minutes. Do not share.";

if ($channel === 'sms') {
    // If external SMS Gateway is configured in config.php (e.g. Fast2SMS / Twilio)
    if (defined('FAST2SMS_API_KEY') && !empty(FAST2SMS_API_KEY)) {
        $cleanPhone = preg_replace('/[^0-9]/', '', $target);
        if (strlen($cleanPhone) >= 10) {
            $last10 = substr($cleanPhone, -10);
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "https://www.fast2sms.com/dev/bulkV2?authorization=" . FAST2SMS_API_KEY . "&route=otp&variables_values=" . urlencode($otp) . "&flash=0&numbers=" . urlencode($last10));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 6);
            $smsRes = curl_exec($ch);
            curl_close($ch);
            $smsDispatched = true;
        }
    }

    // Also forward OTP record to admissions notification email
    $adminNotice = "SMS OTP Verification Alert:\nTarget Phone: $target\nOTP Code: $otp\nUser: $name\nTime: " . date('Y-m-d H:i:s') . "\n";
    @mail(ADMIN_EMAIL, "[OTP Alert] SMS Code $otp for $target", $adminNotice, "From: " . NOREPLY_EMAIL . "\r\n");
}

// Return detailed response
echo json_encode([
    'status'       => 'success',
    'channel'      => $channel,
    'target'       => $target,
    'otp'          => $otp,
    'email_sent'   => $mailSent,
    'sms_sent'     => $smsDispatched,
    'message'      => ($channel === 'email') 
                        ? "Verification email dispatched to $target." 
                        : "Verification OTP code $otp prepared for $target."
]);
