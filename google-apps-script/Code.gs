/**
 * The Edu Consultant - Google Sheets & Excel Live Leads Automation Webhook
 * Configured for Google account: farazahamad201@gmail.com (Admissions Lead Desk)
 * 
 * Instructions:
 * 1. Open Google Drive (drive.google.com) with farazahamad201@gmail.com
 * 2. Create a new Google Spreadsheet named: "The Edu Consultant - Live Leads & Inquiries"
 * 3. Go to Extensions > Apps Script
 * 4. Replace everything in Code.gs with this code and click Save (Ctrl+S / Cmd+S)
 * 5. Click "Deploy" > "Manage deployments" > Edit (or "New deployment")
 *    - Select type: "Web app"
 *    - Description: "Live Leads Webhook v2"
 *    - Execute as: "Me (farazahamad201@gmail.com)"
 *    - Who has access: "Anyone" (allows website to submit leads)
 * 6. Click "Deploy" and Authorize access.
 * 7. Copy the "Web app URL" and paste it in The Edu Consultant Admin Dashboard (Settings > Firebase & Excel).
 */

function setupSheet(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#000064");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Arial");
    headerRange.setFontSize(11);
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error("No active spreadsheet found. Please make sure this script is created inside your Google Sheet via Extensions > Apps Script.");
    }

    var rawData = (e && e.postData && e.postData.contents) ? e.postData.contents : null;
    var data = {};
    if (rawData) {
      try {
        data = JSON.parse(rawData);
      } catch (parseErr) {
        data = (e && e.parameter) ? e.parameter : {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var type = data.type || 'lead';
    var sheetName = (type === 'meeting') ? 'Meetings' : 'Leads';
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      // If default first sheet is empty, rename it so Leads is the primary visible tab
      var sheets = ss.getSheets();
      if (sheets.length === 1 && sheets[0].getLastRow() === 0) {
        sheets[0].setName(sheetName);
        sheet = sheets[0];
      } else {
        sheet = ss.insertSheet(sheetName);
      }
    }

    var dateFormatted = data.dateFormatted || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd MMM yyyy, hh:mm a");

    if (type === 'meeting') {
      var meetingHeaders = [
        "Timestamp", "Meeting ID", "Client Name", "Phone", "Email", 
        "Preferred Date", "Preferred Time", "Consultation Mode", 
        "Destination", "Topic / Notes", "Status", "Account"
      ];
      setupSheet(sheet, meetingHeaders);

      sheet.appendRow([
        dateFormatted,
        data.id || 'MTG-' + new Date().getTime(),
        data.name || '',
        data.phone || '',
        data.email || '',
        data.preferredDate || data.date || '',
        data.preferredTime || data.time || '',
        data.service || data.mode || 'Virtual Video Consultation',
        data.destination || 'Global',
        data.message || data.notes || '',
        data.status || 'Pending',
        data.account || 'enquiry@theeduconsultant.com & farazahamad201@gmail.com'
      ]);
    } else {
      var leadHeaders = [
        "Timestamp", "Lead ID", "Student Name", "Phone", "Email", 
        "Target Destination", "Service / Course", "Inquiry Message", 
        "WhatsApp Opt-In", "Source Page", "Status", "Account"
      ];
      setupSheet(sheet, leadHeaders);

      sheet.appendRow([
        dateFormatted,
        data.id || 'lead-' + new Date().getTime(),
        data.name || '',
        data.phone || '',
        data.email || '',
        data.destination || 'Study Abroad',
        data.service || data.topic || 'General Advisory',
        data.message || '',
        data.whatsappOptIn || 'YES',
        data.source || 'Website Form',
        data.status || 'New',
        data.account || 'enquiry@theeduconsultant.com & farazahamad201@gmail.com'
      ]);
    }

    // Auto-fit columns for clean presentation
    try {
      sheet.autoResizeColumns(1, 12);
    } catch (resizeErr) {}

    // Send instant email alert to admissions
    try {
      var emailSubject = "[Live " + (type === 'meeting' ? 'Meeting' : 'Lead') + " Alert] " + (data.name || 'New Student') + " - " + (data.destination || 'Study Abroad');
      var emailBody = "New " + (type === 'meeting' ? 'consultation meeting booking' : 'lead inquiry') + " has been recorded in your Live Google Sheet!\n\n" +
                      "Name: " + (data.name || 'N/A') + "\n" +
                      "Phone: " + (data.phone || 'N/A') + "\n" +
                      "Email: " + (data.email || 'N/A') + "\n" +
                      "Destination: " + (data.destination || 'N/A') + "\n" +
                      (type === 'meeting' ? ("Date/Time: " + (data.preferredDate || data.date || '') + " at " + (data.preferredTime || data.time || '') + "\n") : "") +
                      "Message / Notes: " + (data.message || data.notes || 'N/A') + "\n" +
                      "Source: " + (data.source || 'Website') + "\n" +
                      "Recorded At: " + dateFormatted + "\n\n" +
                      "Official Lead Desks: enquiry@theeduconsultant.com & farazahamad201@gmail.com\n" +
                      "Hotline: +91 9845371459\n" +
                      "Agency Support: ElavateX (Farhan: +91 7676808068)\n";
      
      MailApp.sendEmail("enquiry@theeduconsultant.com, farazahamad201@gmail.com", emailSubject, emailBody);
    } catch (mailErr) {}

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: (type === 'meeting' ? "Meeting" : "Lead") + " recorded in Google Sheet",
      id: data.id
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  if (e && e.parameter && (e.parameter.phone || e.parameter.email || e.parameter.name)) {
    return doPost(e);
  }
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    service: "The Edu Consultant - Live Leads & Excel Automation Engine",
    domain: "enquiry@theeduconsultant.com & farazahamad201@gmail.com",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
