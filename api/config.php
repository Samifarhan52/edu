<?php
/**
 * The Edu Consultant - Production Server & Database Configuration (Hostinger / cPanel)
 * Strict Security: Direct file execution forbidden
 */

if (!defined('EDU_APP_SECURE')) {
    http_response_code(403);
    header('Content-Type: application/json');
    exit(json_encode(['error' => 'Direct access forbidden (403)']));
}

// ==============================================================================
// 1. HOSTINGER MYSQL DATABASE CREDENTIALS
// (You will get these from your Hostinger hPanel -> Databases -> MySQL Databases)
// ==============================================================================
define('DB_HOST', 'localhost');                  // On Hostinger, this is always localhost
define('DB_NAME', 'the_edu_consultant_db');      // Replace with your Hostinger DB name (e.g. u123456789_edu)
define('DB_USER', 'the_edu_consultant_user');    // Replace with your Hostinger DB username
define('DB_PASS', 'YOUR_STRONG_PASSWORD_HERE');  // Replace with your Hostinger DB password
define('DB_CHARSET', 'utf8mb4');

// ==============================================================================
// 2. CONTACT, LEADS & NOTIFICATION EMAIL ADDRESSES
// ==============================================================================
define('ADMIN_EMAIL', 'enquiry@theeduconsultant.com');
define('ENQUIRY_EMAIL', 'enquiry@theeduconsultant.com');
define('NOREPLY_EMAIL', 'noreply@theeduconsultant.com');
define('ADMIN_PHONE', '9845371459');
define('BRAND_NAME', 'The Edu Consultant');
define('SHEETS_WEBHOOK_URL', ''); // Paste Google Apps Script Web App URL here if desired

// ==============================================================================
// 3. DATABASE CONNECTION HELPER (PDO WITH FALLBACK)
// ==============================================================================
function getDbConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    // Don't attempt connection if default placeholder password is unchanged
    if (DB_PASS === 'YOUR_STRONG_PASSWORD_HERE') {
        return null; // Signals handler to use reliable JSON data fallback
    }

    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        // Silently log error, do not leak db credentials to frontend
        error_log("EduConsultant DB Connection Error: " . $e->getMessage());
        return null;
    }
}
?>
