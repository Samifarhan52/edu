# The Edu Consultant — Firebase & Live Excel Lead Setup Guide
**Official Domain Account:** `enquiry@theeduconsultant.com`  
**Hotline:** `+91 9845371459` | **Agency Portal:** [ElavateX.com](https://elavatex.com)

---

## Overview

This guide walks you through:
1. **Part 1:** Creating an automated **Live Excel / Google Sheet** under `enquiry@theeduconsultant.com` so every website inquiry automatically appears in real-time.
2. **Part 2:** Setting up **Firebase Cloud Firestore** with `enquiry@theeduconsultant.com` and connecting it to the website for permanent, permanent cloud database synchronization.

---

## Part 1: Automated Live Excel / Google Sheet Setup (5 Minutes)

Every time a student submits a form, schedules a meeting, or clicks WhatsApp, a new row is automatically added to this sheet.

### Step 1: Open Google Drive
1. Go to [Google Drive](https://drive.google.com).
2. Sign in with your Google Account associated with `enquiry@theeduconsultant.com` (or create a free Google account using your current email address).
3. Click **+ New** > **Google Sheets** > **Blank spreadsheet**.
4. Name the spreadsheet:  
   `The Edu Consultant - Live Leads & Inquiries`

### Step 2: Open Apps Script
1. In the top menu of your Google Sheet, click **Extensions** > **Apps Script**.
2. A new tab will open with a code editor showing `function myFunction() { ... }`.
3. Delete all code inside the editor.

### Step 3: Paste the Automation Webhook Code
1. Open the file [`google-apps-script/Code.gs`](google-apps-script/Code.gs) from this repository (or copy it directly from your **Admin Dashboard > Settings > Firebase & Excel Integration**).
2. Paste the code into the Apps Script editor.
3. Click the **Save** icon (diskette) or press `Ctrl + S` / `Cmd + S`.

### Step 4: Deploy as a Web App
1. In the top-right corner, click **Deploy** > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the fields:
   - **Description:** `The Edu Consultant Lead Webhook`
   - **Execute as:** `Me (enquiry@theeduconsultant.com)`
   - **Who has access:** `Anyone` *(Crucial: allows the website forms to stream leads into the sheet)*
4. Click **Deploy**.
5. Google will ask you to **Authorize access**:
   - Click *Review permissions*
   - Select `enquiry@theeduconsultant.com`
   - Click *Advanced* > *Go to Untitled project (unsafe)*
   - Click *Allow*
6. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/AKfycbx.../exec`).

### Step 5: Connect URL to Admin Dashboard
1. Open your Admin Dashboard: [https://edu-two-eta.vercel.app/admin-dashboard.html](https://edu-two-eta.vercel.app/admin-dashboard.html)
2. Go to **Settings** > **Firebase Cloud Database & Live Excel Integration**.
3. Paste your Web app URL into the **Google Sheets / Excel Webhook URL** field.
4. Click **Save Webhook & Test Stream**.
5. Check your Google Sheet: a test lead row will appear instantly with styled blue headers!

---

## Part 2: Firebase Cloud Firestore Setup (5 Minutes)

Connecting Firebase ensures your leads, meetings, student profiles, and CMS data are stored in a secure Google Cloud database permanently.

### Step 1: Sign in to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com).
2. Sign in with `enquiry@theeduconsultant.com`.
3. Click **Add project** (or **Create a project**).
4. Project Name: `the-edu-consultant-db`
5. Enable or disable Google Analytics (optional, default is fine) and click **Create project**.

### Step 2: Enable Cloud Firestore
1. In the left sidebar, click **Build** > **Firestore Database**.
2. Click **Create database**.
3. Location: Choose `asia-south1 (Mumbai)` (fastest for India and international students) or `us-central`.
4. Security Rules: Select **Start in test mode** (allows read/write during initial setup) > click **Next** > **Enable**.

### Step 3: Register Web App & Get Config Keys
1. In the Project Overview page (click the gear icon ⚙️ > **Project settings**).
2. Under **Your apps**, click the **Web icon** (`</>`).
3. App nickname: `The Edu Consultant Web`
4. Leave Firebase Hosting unchecked > Click **Register app**.
5. Firebase will display your `firebaseConfig` object:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyD-xxxxxxxxxxxxxxxxxxxxxxxx",
     authDomain: "the-edu-consultant-db.firebaseapp.com",
     projectId: "the-edu-consultant-db",
     storageBucket: "the-edu-consultant-db.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef12345678"
   };
   ```

### Step 4: Paste Keys into Admin Dashboard
1. Go to your Admin Dashboard: [https://edu-two-eta.vercel.app/admin-dashboard.html](https://edu-two-eta.vercel.app/admin-dashboard.html)
2. Open **Settings** > **Firebase Cloud Database & Live Excel Integration**.
3. Enter your 6 keys:
   - **API Key**
   - **Auth Domain**
   - **Project ID**
   - **Storage Bucket**
   - **Messaging Sender ID**
   - **App ID**
4. Click **Test & Connect to Firebase**.
5. The status badge will change to 🟢 **Firebase Cloud Connected**!
6. Click **Push All Local Leads to Cloud** to instantly migrate all existing inquiries into your new Firestore collections (`leads` and `meetings`).

---

## How It Works in Production

When a student submits a form:
```
[Student Form Submission]
         │
         ├──► 1. Browser saves to localStorage (Instant, zero lag)
         ├──► 2. Firebase Cloud Firestore creates document in 'leads' (Permanent Cloud DB)
         ├──► 3. Webhook streams row to Google Sheets / Live Excel (Instant spreadsheet update)
         ├──► 4. Hostinger Backend sends confirmation emails to enquiry@theeduconsultant.com & adm.faraz@gmail.com
         └──► 5. Student gets WhatsApp notification with counselor direct link
```

All 5 channels update simultaneously in milliseconds!
