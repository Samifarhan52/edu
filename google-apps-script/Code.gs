/**
 * The Edu Consultant - Google Sheets & Excel Live Leads Automation Webhook
 * Configured for domain account: enquiry@theeduconsultant.com
 * 
 * Instructions:
 * 1. Open Google Drive (drive.google.com) with enquiry@theeduconsultant.com
 * 2. Create a new Google Spreadsheet named: "The Edu Consultant - Live Leads & Inquiries"
 * 3. Go to Extensions > Apps Script
 * 4. Replace everything in Code.gs with this code and click Save (Ctrl+S / Cmd+S)
 * 5. Click "Deploy" > "New deployment"
 *    - Select type: "Web app"
 *    - Description: "Live Leads Webhook v1"
 *    - Execute as: "Me (enquiry@theeduconsultant.com)"
 *    - Who has access: "Anyone" (allows website to submit leads)
 * 6. Click "Deploy" and Authorize access.
 * 7. Copy the "Web app URL" and paste it in The Edu Consultant Admin Dashboard (Settings > Firebase & Excel).
 */

function setupSheet(sheet, headers, tabName) {
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
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    var type = data.type || 'lead';
    var sheetName = (type === 'meeting') ? 'Meetings' : 'Leads';
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    var timestamp = data.timestamp || new Date().toISOString();
    var dateFormatted = data.dateFormatted || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd MMM yyyy, hh:mm a");

    if (type === 'meeting') {
      var meetingHeaders = [
        "Timestamp", "Meeting ID", "Client Name", "Phone", "Email", 
        "Preferred Date", "Preferred Time", "Consultation Mode", 
        "Destination", "Topic / Notes", "Status", "Account"
      ];
      setupSheet(sheet, meetingHeaders, 'Meetings');

      sheet.appendRow([
        dateFormatted,
        data.id || 'MTG-' + new Date().getTime(),
        data.name || '',
        data.phone || '',
        data.email || '',
        data.preferredDate || '',
        data.preferredTime || '',
        data.service || 'Virtual Video Consultation',
        data.destination || 'Global',
        data.message || '',
        data.status || 'Pending',
        data.account || 'enquiry@theeduconsultant.com'
      ]);
    } else {
      var leadHeaders = [
        "Timestamp", "Lead ID", "Student Name", "Phone", "Email", 
        "Target Destination", "Service / Course", "Inquiry Message", 
        "WhatsApp Opt-In", "Source Page", "Status", "Account"
      ];
      setupSheet(sheet, leadHeaders, 'Leads');

      sheet.appendRow([
        dateFormatted,
        data.id || 'lead-' + new Date().getTime(),
        data.name || '',
        data.phone || '',
        data.email || '',
        data.destination || 'Study Abroad',
        data.service || 'General Advisory',
        data.message || '',
        data.whatsappOptIn || 'YES',
        data.source || 'Website Form',
        data.status || 'New',
        data.account || 'enquiry@theeduconsultant.com'
      ]);
    }

    // Auto-fit columns for clean Excel presentation
    sheet.autoResizeColumns(1, 12);

    // Send instant email alert to official admissions mailboxes
    try {
      var emailSubject = "[Live Lead Alert] " + (data.name || 'New Student') + " - " + (data.destination || 'Study Abroad');
      var emailBody = "New lead successfully added to your Live Excel / Google Sheet!\n\n" +
                      "Name: " + data.name + "\n" +
                      "Phone: " + data.phone + "\n" +
                      "Email: " + data.email + "\n" +
                      "Destination: " + data.destination + "\n" +
                      "Message: " + data.message + "\n" +
                      "Source: " + (data.source || 'Website Form') + "\n" +
                      "Date: " + dateFormatted + "\n\n" +
                      "Open Sheet: " + ss.getUrl();
      
      MailApp.sendEmail("enquiry@theeduconsultant.com, adm.faraz@gmail.com", emailSubject, emailBody);
    } catch (mailErr) {
      // Continue even if MailApp quota is exceeded
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead recorded in Google Sheet",
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
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    service: "The Edu Consultant - Live Leads & Excel Automation Engine",
    domain: "enquiry@theeduconsultant.com",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
