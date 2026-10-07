# The Edu Consultant - Hostinger Hosting & Production Setup Guide

This guide explains how to host **The Edu Consultant** on **Hostinger**, how the database works, and why **you do NOT need Firebase**.

---

## 1. Do You Need Firebase for Hostinger?

### **Short Answer: NO, you do NOT need Firebase!**

Hostinger already gives you everything built-in for free:

| Feature | Hostinger (Built-in & Included) | Firebase (External Third-Party) |
| :--- | :--- | :--- |
| **Database** | **Free MySQL / MariaDB included** in your hosting plan | Free tier has strict limits; charges credit card when usage grows |
| **Database Latency** | **Instant (1 to 5 ms)** - Runs locally on the same server | **Slow (150 - 500 ms)** - Connects across external Google Cloud servers |
| **Control Panel** | **Free phpMyAdmin** inside Hostinger hPanel | Complex Google Cloud Console |
| **Email Accounts** | **Free custom domain emails** (`enquiry@`, `noreply@`) | None (requires external SendGrid / Mailgun setup) |
| **Monthly Cost** | **\$0 extra** (Included in hosting) | Unpredictable pay-as-you-go billing |
| **Simplicity** | 1 Single Login (Hostinger hPanel) | Multiple Google Cloud accounts & API keys |

> **Why external databases cause slow loading:**
> When you use a separate external free database (like Firebase or Supabase), every page request must make a round-trip across the internet to an external server. When that external server goes idle (cold start), the website experiences delays of 2 to 5 seconds.
> With **Hostinger's built-in MySQL**, the database is on the exact same computer as your website files. The response time is virtually instantaneous with **zero lag**.

---

## 2. Pre-Configured Files Created for Hostinger

Your project is now fully configured for Hostinger LiteSpeed / Apache hosting:

1. **`.htaccess`**:
   - Automatically forces **HTTPS (SSL)**.
   - Enables **Clean URLs** (e.g., `theeduconsultant.com/blog-list` opens `blog-list.html` cleanly).
   - Enables **Gzip & Brotli compression** (speeds up website loading by up to 70%).
   - Enables **1-Year Browser Caching** for images, fonts, and stylesheets.
   - Enforces **Enterprise Security Headers** (XSS protection, anti-clickjacking, nosniff, HSTS).
   - Blocks unauthorized downloads of hidden files, `.git`, `.env`, and backup files.
   - Routes broken URLs to your branded `404.html`.

2. **`404.html`**:
   - Custom branded 404 error page matching The Edu Consultant design with direct links back to Home, Universities, Scholarships, and direct counselor WhatsApp/Phone contacts.

3. **`robots.txt` & `sitemap.xml`**:
   - Configured for Google and search engines to index your study abroad pages, universities, and blogs while keeping admin routes private.

4. **`api/lead-handler.php` & `api/config.php`**:
   - Secure REST API that receives leads, contact submissions, and meeting bookings.
   - Automatically saves them to Hostinger's MySQL database.
   - Sends notification emails to **farazahamad201@gmail.com** and **enquiry@theeduconsultant.com** from **noreply@theeduconsultant.com**.
   - Sends an automatic confirmation email to the student.

5. **`api/db-setup.sql`**:
   - Ready-to-import SQL schema for Hostinger phpMyAdmin (creates `leads`, `meetings`, `users`, and `applications` tables).

---

## 3. Step-by-Step Hostinger Deployment Instructions

### Step 1: Upload Files to Hostinger
1. Log in to your **Hostinger hPanel** (`hpanel.hostinger.com`).
2. Go to **Websites** -> Select your domain -> Click **File Manager**.
3. Open the `public_html` directory.
4. Upload all files and folders from this project into `public_html`.
   *(Ensure `.htaccess`, `index.html`, `js/`, `css/`, `api/`, etc., are inside `public_html`)*.

---

### Step 2: Create Your Free MySQL Database in Hostinger
1. In Hostinger hPanel, search for **Databases** (or go to **Databases -> MySQL Databases**).
2. Enter:
   - **Database Name**: e.g. `edu_db` *(Hostinger will prefix it, e.g. `u123456789_edu_db`)*.
   - **Username**: e.g. `edu_user` *(Hostinger will prefix it, e.g. `u123456789_edu_user`)*.
   - **Password**: Create a strong password (copy and save this password).
3. Click **Create**.

---

### Step 3: Import the Database Schema with 1 Click
1. On the same Databases page in Hostinger, click **Enter phpMyAdmin** next to your newly created database.
2. In phpMyAdmin, click the **Import** tab at the top.
3. Click **Choose File** and select `api/db-setup.sql` from your project files.
4. Click **Import** (or **Go**) at the bottom.
5. All 4 tables (`leads`, `meetings`, `users`, `applications`) will be created instantly!

---

### Step 4: Connect the Database in `api/config.php`
1. In Hostinger File Manager, navigate to `public_html/api/config.php`.
2. Right-click and choose **Edit**.
3. Update the credentials with the ones created in Step 2:
   ```php
   define('DB_HOST', 'localhost');                  // Always 'localhost' on Hostinger
   define('DB_NAME', 'u123456789_edu_db');          // Your Hostinger database name
   define('DB_USER', 'u123456789_edu_user');        // Your Hostinger database username
   define('DB_PASS', 'YourSecretPasswordHere');     // Your database password
   ```
4. Click **Save & Close**.

---

### Step 5: Set Up Your Free Business Emails in Hostinger
Hostinger provides free email accounts for your domain:
1. In Hostinger hPanel, go to **Emails -> Email Accounts**.
2. Click **Create Email Account**:
   - `enquiry@theeduconsultant.com`
   - `noreply@theeduconsultant.com`
3. Any inquiry submitted on the website or meeting scheduled will automatically route through Hostinger's mail system to:
   - **farazahamad201@gmail.com** (Lead alert)
   - **enquiry@theeduconsultant.com** (Office inbox)
   - **noreply@theeduconsultant.com** (System outgoing sender)

---

## 4. Current Status & Verification
The website continues running smoothly on Vercel (`https://edu-two-eta.vercel.app`) using client-side storage, and all Hostinger files are in place so that the day you decide to upload to Hostinger, the transition will be 100% plug-and-play.
