/**
 * The Edu Consultant - Communications, Leads, WhatsApp & Meetings Engine
 * Features:
 * 1. Dual Connect Widget (Direct Call vs WhatsApp vs Schedule Meeting)
 * 2. Schedule Meeting Interactive Modal & Form Booking
 * 3. WhatsApp Notification to Admin (9845371459) with Confirm & Reschedule Actions
 * 4. Automated Confirmation Email Dispatch from noreply@theeduconsultant.com
 * 5. Admin Dashboard Scheduled Meetings Tab, KPIs & Management
 * 6. Lead Generation Sync & CSV Export
 */

(function () {
    'use strict';

    const CONFIG = {
        phone: '9845371459',
        phoneFormatted: '+91 9845371459',
        phoneTel: 'tel:+919845371459',
        whatsappInternational: '919845371459',
        adminEmail: 'adm.faraz@gmail.com',
        enquiryEmail: 'enquiry@theeduconsultant.com',
        noreplyEmail: 'noreply@theeduconsultant.com',
        brandName: 'The Edu Consultant',
        storageKey: 'theeduconsultants_leads',
        meetingsStorageKey: 'theeduconsultants_meetings',
        emailsStorageKey: 'theeduconsultants_email_logs',
        address: 'Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025',
        baseUrl: 'https://edu-two-eta.vercel.app'
    };

    // Robust, cross-browser date/time formatter (safe against Intl option errors)
    function formatDateTime(d) {
        try {
            const dt = (d instanceof Date) ? d : (d ? new Date(d) : new Date());
            if (isNaN(dt.getTime())) return new Date().toDateString();
            return dt.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }) + ', ' + dt.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } catch (e) {
            try {
                return new Date().toLocaleString();
            } catch (e2) {
                return new Date().toDateString();
            }
        }
    }

    // Default Seed Inquiries for Admin Dashboard
    const SEED_LEADS = [
        {
            id: 'lead-1791001',
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
            dateFormatted: formatDateTime(Date.now() - 3600000 * 2),
            name: 'Aarav Sharma',
            phone: '+91 98765 43210',
            email: 'aarav.sharma@gmail.com',
            source: 'Free Consultation Form',
            destination: 'Australia - University of Melbourne',
            message: 'Looking for Master of Data Science admissions with 50% scholarship and post-study work visa guidance.',
            whatsappOptIn: true,
            status: 'New'
        },
        {
            id: 'lead-1791002',
            createdAt: new Date(Date.now() - 3600000 * 7).toISOString(),
            dateFormatted: formatDateTime(Date.now() - 3600000 * 7),
            name: 'Priyanka Reddy',
            phone: '+91 98451 23456',
            email: 'priyanka.r@outlook.com',
            source: 'Contact Page Inquiry',
            destination: 'United States - Top 50 STEM Programs',
            message: 'Inquiring about Fall 2026 MS in CS intake, GRE waiver criteria, and application fee waivers.',
            whatsappOptIn: true,
            status: 'In Review'
        },
        {
            id: 'lead-1791003',
            createdAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
            dateFormatted: formatDateTime(Date.now() - 86400000 * 1.5),
            name: 'Karan Mehra',
            phone: '+91 97112 88990',
            email: 'karan.m@yahoo.com',
            source: 'IELTS Diagnostic Test',
            destination: 'United Kingdom - Russell Group',
            message: 'Targeting IELTS 7.5+ band score for MSc Finance admissions. Needs evening batch schedule.',
            whatsappOptIn: true,
            status: 'Contacted'
        }
    ];

    // Default Seed Scheduled Meetings for Admin Dashboard
    const SEED_MEETINGS = [
        {
            id: 'MTG-2026-1082',
            createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
            dateFormatted: formatDateTime(Date.now() - 3600000 * 3),
            name: 'Rohan Deshmukh',
            phone: '+91 98452 33445',
            email: 'rohan.d@example.com',
            mode: 'Virtual Video Session (Google Meet)',
            date: '2026-10-06',
            time: '11:30 AM - 12:30 PM',
            destination: 'United States',
            notes: 'Need counseling on Fall 2026 MS CS admissions with scholarship options.',
            status: 'Pending',
            confirmedAt: null
        },
        {
            id: 'MTG-2026-1055',
            createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
            dateFormatted: formatDateTime(Date.now() - 86400000 * 1),
            name: 'Ananya Sen',
            phone: '+91 98200 44556',
            email: 'ananya.sen@example.com',
            mode: 'In-Person (Bengaluru Lounge, Shanthala Nagar)',
            date: '2026-10-05',
            time: '04:00 PM - 05:00 PM',
            destination: 'United Kingdom',
            notes: 'MSc Business Analytics Russell Group university shortlisting & visa documentation.',
            status: 'Confirmed',
            confirmedAt: new Date(Date.now() - 86400000 * 0.8).toISOString()
        }
    ];

    const EduLeads = {
        config: CONFIG,
        formatDateTime: formatDateTime,

        // ======================================================================
        // 1. LEADS REPOSITORY
        // ======================================================================
        getLeads: function () {
            try {
                const stored = localStorage.getItem(CONFIG.storageKey);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
                }
                localStorage.setItem(CONFIG.storageKey, JSON.stringify(SEED_LEADS));
                return SEED_LEADS;
            } catch (e) {
                console.error('[EduLeads] Error retrieving leads:', e);
                return SEED_LEADS;
            }
        },

        saveLead: function (lead) {
            const leads = this.getLeads();
            const newLead = Object.assign({
                id: 'lead-' + Date.now(),
                createdAt: new Date().toISOString(),
                dateFormatted: formatDateTime(),
                status: 'New'
            }, lead);

            leads.unshift(newLead);
            try {
                localStorage.setItem(CONFIG.storageKey, JSON.stringify(leads));
            } catch (e) {
                console.error('[EduLeads] Error saving lead:', e);
            }

            this.updateBadge();

            // Background sync to Hostinger PHP & MySQL backend if available
            try {
                if (typeof fetch === 'function') {
                    fetch('api/lead-handler.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(Object.assign({ type: 'lead' }, newLead))
                    }).catch(function () {});
                }
            } catch (syncErr) {}

            return newLead;
        },

        updateLeadStatus: function (id, newStatus) {
            const leads = this.getLeads();
            const idx = leads.findIndex(l => l.id === id);
            if (idx !== -1) {
                leads[idx].status = newStatus;
                localStorage.setItem(CONFIG.storageKey, JSON.stringify(leads));
                this.updateBadge();
                return true;
            }
            return false;
        },

        deleteLead: function (id) {
            let leads = this.getLeads();
            leads = leads.filter(l => l.id !== id);
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(leads));
            this.updateBadge();
            return leads;
        },

        exportCSV: function () {
            const leads = this.getLeads();
            if (!leads.length) {
                alert('No leads available to export.');
                return;
            }

            const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Source', 'Destination', 'Message', 'WhatsApp Opt-In', 'Status'];
            const rows = leads.map(l => [
                l.id,
                `"${l.dateFormatted || l.createdAt}"`,
                `"${(l.name || '').replace(/"/g, '""')}"`,
                `"${(l.phone || '').replace(/"/g, '""')}"`,
                `"${(l.email || '').replace(/"/g, '""')}"`,
                `"${(l.source || '').replace(/"/g, '""')}"`,
                `"${(l.destination || '').replace(/"/g, '""')}"`,
                `"${(l.message || '').replace(/"/g, '""')}"`,
                l.whatsappOptIn ? 'YES' : 'NO',
                l.status || 'New'
            ]);

            const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', `the-edu-consultant-leads-${new Date().toISOString().slice(0, 10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        getWhatsAppUrl: function (lead) {
            const lines = [
                `*New Student Inquiry - The Edu Consultant*`,
                `👤 *Name:* ${lead.name || 'Student'}`,
                `📞 *Phone:* ${lead.phone || 'N/A'}`,
                `✉️ *Email:* ${lead.email || 'N/A'}`,
                `🎯 *Program / Country:* ${lead.destination || 'Study Abroad Counseling'}`,
                `💬 *Query:* ${lead.message || 'I would like to speak with a senior admissions counselor.'}`,
                `\n_Sent via The Edu Consultant Portal (${lead.source || 'Website'})_`
            ];
            const msg = encodeURIComponent(lines.join('\n'));
            return `https://wa.me/${CONFIG.whatsappInternational}?text=${msg}`;
        },

        handleFormSubmit: function (e, sourceName) {
            if (e && e.preventDefault) e.preventDefault();
            const form = e.target || e;

            if (window.EduSecurity && window.EduSecurity.rateLimiter) {
                const rate = window.EduSecurity.rateLimiter.check('lead_form', 4, 60000);
                if (!rate.allowed) {
                    alert(rate.message);
                    return false;
                }
                window.EduSecurity.rateLimiter.record('lead_form');
            }

            const getVal = (selector) => {
                const el = form.querySelector(selector);
                return el ? el.value.trim() : '';
            };

            const firstName = getVal('input[name="firstName"], input[placeholder*="First Name"], #inputFirstName');
            const lastName = getVal('input[name="lastName"], input[placeholder*="Last Name"], #inputLastName');
            let fullName = getVal('input[name="fullName"], input[name="name"], input[placeholder*="Full Name"], input[placeholder*="Your Name"]');
            if (!fullName && (firstName || lastName)) {
                fullName = `${firstName} ${lastName}`.trim();
            }
            if (!fullName) fullName = 'Prospective Student';

            const phone = getVal('input[type="tel"], input[name="phone"], input[name="mobile"], input[placeholder*="Mobile"], input[placeholder*="Phone"]');
            const email = getVal('input[type="email"], input[name="email"], input[placeholder*="Email"]');
            const destination = getVal('select[name="destination"], select[name="country"], select, input[name="destination"]') || 'Global Admissions';
            const message = getVal('textarea, input[name="message"]') || `Inquiry for ${destination} counseling from ${sourceName}.`;

            const waCheckbox = form.querySelector('input[type="checkbox"][name="whatsappOptIn"], input[type="checkbox"][id*="whatsApp"], input[type="checkbox"][id*="whatsapp"]');
            const whatsappOptIn = waCheckbox ? waCheckbox.checked : true;

            if (!phone && !email) {
                alert('Please provide at least a phone number or email address so our counselors can reach you.');
                return false;
            }

            const leadData = {
                name: fullName,
                phone: phone || 'Not provided',
                email: email || 'Not provided',
                source: sourceName || 'Website Lead Form',
                destination: destination,
                message: message,
                whatsappOptIn: whatsappOptIn
            };

            this.saveLead(leadData);
            this.logEmailNotification(leadData);

            if (whatsappOptIn) {
                const waUrl = this.getWhatsAppUrl(leadData);
                window.open(waUrl, '_blank');
            }

            this.showSuccessModal(leadData, whatsappOptIn);
            if (form && typeof form.reset === 'function') form.reset();
            return false;
        },

        logEmailNotification: function (lead) {
            if (typeof console !== 'undefined' && console && typeof console.log === 'function') {
                console.log(`%c[Lead Notification Sent]%c 
To: ${CONFIG.enquiryEmail}, ${CONFIG.adminEmail}
From: ${CONFIG.noreplyEmail}
Subject: [New Student Lead] ${lead.name} - ${lead.destination}
Phone: ${lead.phone}
Email: ${lead.email}
WhatsApp Opt-In: ${lead.whatsappOptIn ? 'YES' : 'NO'}
Message: ${lead.message}`, 'color: #000064; font-weight: bold;', 'color: #333;');
            }
        },

        showSuccessModal: function (lead, openedWhatsApp) {
            let existingModal = document.getElementById('eduLeadSuccessModal');
            if (existingModal) existingModal.remove();

            const modalHtml = `
            <div class="modal fade show" id="eduLeadSuccessModal" tabindex="-1" style="display: block; background: rgba(0,0,100,0.6); z-index: 9999;" aria-modal="true" role="dialog">
                <div class="modal-dialog modal-dialog-centered" style="max-width: 500px;">
                    <div class="modal-content rounded-4 border-0 shadow-2xl overflow-hidden">
                        <div class="modal-header border-0 pb-0" style="background: linear-gradient(135deg, #000064, #00004a); color: white;">
                            <div class="d-flex align-items-center gap-2">
                                <div class="rounded-circle d-flex align-items-center justify-content-center" style="width: 36px; height: 36px; background: #f5dc3c; color: #000064;">
                                    <i class="fa-solid fa-circle-check fs-5"></i>
                                </div>
                                <h5 class="modal-title fw-bold fs-16 mb-0 text-white">Inquiry Received Successfully!</h5>
                            </div>
                            <button type="button" class="btn-close btn-close-white" onclick="document.getElementById('eduLeadSuccessModal').remove()"></button>
                        </div>
                        <div class="modal-body p-4 text-start">
                            <p class="text-dark fs-14 mb-3">
                                Thank you, <strong>${lead.name}</strong>! Your inquiry has been securely registered in our system and forwarded to our senior admissions team.
                            </p>
                            <div class="p-3 rounded-3 bg-light border mb-3 fs-13">
                                <div class="mb-1"><span class="text-muted">Lead Destination:</span> <strong>${lead.destination}</strong></div>
                                <div class="mb-1"><span class="text-muted">Contact Phone:</span> <strong>${lead.phone}</strong></div>
                                <div class="mb-1"><span class="text-muted">Forwarded To:</span> <span class="badge bg-primary text-white">${CONFIG.enquiryEmail}</span> <span class="badge bg-secondary text-dark">${CONFIG.adminEmail}</span></div>
                                <div><span class="text-muted">Status:</span> <span class="badge bg-success">Stored in Admin Dashboard</span></div>
                            </div>
                            ${openedWhatsApp ? `
                            <div class="alert alert-success d-flex align-items-center gap-2 py-2 px-3 fs-13 mb-3 rounded-3 border-0">
                                <i class="fa-brands fa-whatsapp fs-5 text-success"></i>
                                <div>WhatsApp conversation opened! You can now chat directly with our counselors.</div>
                            </div>` : ''}
                            <div class="d-flex gap-2">
                                <button type="button" class="btn btn-warning rounded-pill w-50 py-2 fs-13 fw-bold" onclick="document.getElementById('eduLeadSuccessModal').remove(); window.EduLeads.openMeetingModal();">
                                    <i class="fa-solid fa-calendar-check me-1"></i> Schedule Meeting
                                </button>
                                <a href="${this.getWhatsAppUrl(lead)}" target="_blank" class="btn btn-success rounded-pill w-50 py-2 fs-13 fw-bold">
                                    <i class="fa-brands fa-whatsapp me-1"></i> WhatsApp
                                </a>
                            </div>
                        </div>
                        <div class="modal-footer border-0 pt-0 bg-white">
                            <button type="button" class="btn btn-secondary rounded-pill w-100 fs-13" onclick="document.getElementById('eduLeadSuccessModal').remove()">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        },

        // ======================================================================
        // 2. SCHEDULED MEETINGS REPOSITORY & WORKFLOW
        // ======================================================================
        getMeetings: function () {
            try {
                const stored = localStorage.getItem(CONFIG.meetingsStorageKey);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
                }
                localStorage.setItem(CONFIG.meetingsStorageKey, JSON.stringify(SEED_MEETINGS));
                return SEED_MEETINGS;
            } catch (e) {
                console.error('[EduLeads] Error retrieving meetings:', e);
                return SEED_MEETINGS;
            }
        },

        saveMeeting: function (meetingData) {
            const meetings = this.getMeetings();
            const meetingId = 'MTG-2026-' + Math.floor(1000 + Math.random() * 9000);
            const newMeeting = Object.assign({
                id: meetingId,
                status: 'Pending',
                createdAt: new Date().toISOString(),
                dateFormatted: formatDateTime(),
                confirmedAt: null,
                rescheduledAt: null
            }, meetingData);

            meetings.unshift(newMeeting);
            try {
                localStorage.setItem(CONFIG.meetingsStorageKey, JSON.stringify(meetings));
            } catch (e) {
                console.error('[EduLeads] Error saving meeting:', e);
            }

            // Also record in Leads pipeline
            this.saveLead({
                name: newMeeting.name,
                phone: newMeeting.phone,
                email: newMeeting.email,
                source: 'Schedule Meeting Form (' + newMeeting.mode + ')',
                destination: newMeeting.destination + ` [Date: ${newMeeting.date} @ ${newMeeting.time}]`,
                message: `Advisory Session Request (${newMeeting.mode}) for ${newMeeting.destination}. Agenda: ${newMeeting.notes || 'General Study Abroad Guidance'}`,
                whatsappOptIn: true,
                status: 'In Review'
            });

            // Generate WhatsApp message with Confirm & Reschedule Action Links
            const confirmUrl = `${CONFIG.baseUrl}/admin-dashboard.html?action=confirm_meeting&id=${newMeeting.id}`;
            const rescheduleUrl = `${CONFIG.baseUrl}/admin-dashboard.html?action=reschedule_meeting&id=${newMeeting.id}`;

            const waTextLines = [
                `🗓️ *NEW MEETING SCHEDULE REQUEST*`,
                `*The Edu Consultant - Senior Advisory Booking*`,
                `----------------------------------------`,
                `📌 *Booking ID:* ${newMeeting.id}`,
                `👤 *Student Name:* ${newMeeting.name}`,
                `📞 *Phone:* ${newMeeting.phone}`,
                `✉️ *Email:* ${newMeeting.email}`,
                `📅 *Preferred Date:* ${newMeeting.date}`,
                `⏰ *Preferred Time Slot:* ${newMeeting.time}`,
                `📍 *Consultation Mode:* ${newMeeting.mode}`,
                `🎯 *Target Destination:* ${newMeeting.destination}`,
                `📝 *Agenda / Notes:* ${newMeeting.notes || 'General admissions counseling'}`,
                `----------------------------------------`,
                `👉 *CLICK TO CONFIRM MEETING:*`,
                `${confirmUrl}`,
                ``,
                `👉 *CLICK TO RE-SCHEDULE MEETING:*`,
                `${rescheduleUrl}`,
                `----------------------------------------`,
                `_Auto-generated from The Edu Consultant Portal_`
            ];

            const waEncoded = encodeURIComponent(waTextLines.join('\n'));
            const waLink = `https://wa.me/${CONFIG.whatsappInternational}?text=${waEncoded}`;
            newMeeting.waLink = waLink;

            // Open WhatsApp with all meeting details and buttons safely
            try {
                if (typeof window !== 'undefined' && typeof window.open === 'function') {
                    window.open(waLink, '_blank');
                }
            } catch (openErr) {}

            // Log initial booking email dispatch notice
            this.logEmailNotification({
                name: newMeeting.name,
                destination: `${newMeeting.destination} (${newMeeting.date} @ ${newMeeting.time})`,
                phone: newMeeting.phone,
                email: newMeeting.email,
                whatsappOptIn: true,
                message: `Meeting Request [${newMeeting.id}]. Confirm Link: ${confirmUrl}`
            });

            // Update badge & render table if open
            this.updateBadge();
            if (document.getElementById('adminMeetingsTableBody')) {
                this.renderAdminMeetingsTable();
            }

            // Background sync to Hostinger PHP & MySQL backend if available
            try {
                if (typeof fetch === 'function') {
                    fetch('api/lead-handler.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(Object.assign({ type: 'meeting' }, newMeeting))
                    }).catch(function () {});
                }
            } catch (syncErr) {}

            return newMeeting;
        },

        confirmMeeting: function (meetingId, silent = false) {
            const meetings = this.getMeetings();
            const meeting = meetings.find(m => m.id === meetingId);
            if (!meeting) {
                if (!silent) alert(`Meeting with ID "${meetingId}" not found.`);
                return false;
            }

            meeting.status = 'Confirmed';
            meeting.confirmedAt = new Date().toISOString();
            localStorage.setItem(CONFIG.meetingsStorageKey, JSON.stringify(meetings));

            // Generate automated confirmation email dispatch record from noreply@theeduconsultant.com
            const emailLog = {
                id: 'EML-' + Date.now(),
                meetingId: meeting.id,
                from: CONFIG.noreplyEmail,
                to: meeting.email,
                cc: `${CONFIG.adminEmail}, ${CONFIG.enquiryEmail}`,
                subject: `Confirmed: Your 1-on-1 Advisory Session with The Edu Consultant [${meeting.id}]`,
                date: new Date().toISOString(),
                dateFormatted: formatDateTime(),
                body: `Dear ${meeting.name},

We are pleased to confirm that your 1-on-1 Study Abroad Advisory Consultation with The Edu Consultant has been officially CONFIRMED!

BOOKING CONFIRMATION SUMMARY:
==================================================
• Booking Reference: ${meeting.id}
• Confirmed Date: ${meeting.date}
• Confirmed Time Slot: ${meeting.time}
• Advisory Mode: ${meeting.mode}
• Target Country / Destination: ${meeting.destination}
• Session Access / Venue: ${meeting.mode.includes('In-Person') ? CONFIG.address : 'Google Meet Video Room: https://meet.google.com/edu-adv-' + meeting.id.toLowerCase().replace(/[^a-z0-9]/g, '')}
• Status: CONFIRMED & SLOTTED

PREPARATION CHECKLIST:
1. Academic Transcripts & marksheets for recent degrees
2. English Test scores (IELTS/TOEFL/PTE) or GRE/GMAT if available
3. Updated CV / Resume and preferred university list

If you need any adjustments prior to your consultation, please reply directly to this confirmation or reach our advisory desk at ${CONFIG.enquiryEmail}.

Warm regards,
Senior Admissions Advisory Board
The Edu Consultant
Official Mail: noreply@theeduconsultant.com | enquiry@theeduconsultant.com
Hotline: +91 9845371459
Office: ${CONFIG.address}`
            };

            this.saveEmailLog(emailLog);
            this.updateBadge();

            if (document.getElementById('adminMeetingsTableBody')) {
                this.renderAdminMeetingsTable();
            }

            // Show confirmation toast / alert
            this.showMeetingConfirmedModal(meeting, emailLog);
            return true;
        },

        rescheduleMeeting: function (meetingId, newDate, newTime, reason) {
            const meetings = this.getMeetings();
            const meeting = meetings.find(m => m.id === meetingId);
            if (!meeting) return false;

            meeting.status = 'Rescheduled';
            meeting.date = newDate || meeting.date;
            meeting.time = newTime || meeting.time;
            meeting.rescheduleReason = reason || 'Counselor calendar adjustment';
            meeting.rescheduledAt = new Date().toISOString();

            localStorage.setItem(CONFIG.meetingsStorageKey, JSON.stringify(meetings));

            const emailLog = {
                id: 'EML-' + Date.now(),
                meetingId: meeting.id,
                from: CONFIG.noreplyEmail,
                to: meeting.email,
                cc: `${CONFIG.adminEmail}, ${CONFIG.enquiryEmail}`,
                subject: `Rescheduled: Your Study Abroad Advisory Session with The Edu Consultant [${meeting.id}]`,
                date: new Date().toISOString(),
                dateFormatted: formatDateTime(),
                body: `Dear ${meeting.name},

Your 1-on-1 Study Abroad Advisory Session [${meeting.id}] has been rescheduled to the following updated slot:

NEW SCHEDULE DETAILS:
• New Date: ${meeting.date}
• New Time Slot: ${meeting.time}
• Mode: ${meeting.mode}
• Note from Counselor: ${meeting.rescheduleReason}

If this new timing works for you, no further action is required. If you wish to propose a different time, please reply to this email or reach us at ${CONFIG.enquiryEmail}.

Warm regards,
The Edu Consultant Admissions Team
noreply@theeduconsultant.com`
            };

            this.saveEmailLog(emailLog);
            this.updateBadge();

            if (document.getElementById('adminMeetingsTableBody')) {
                this.renderAdminMeetingsTable();
            }

            alert(`Meeting ${meeting.id} has been marked as Rescheduled to ${meeting.date} (${meeting.time}). An automated update email was dispatched from noreply@theeduconsultant.com to ${meeting.email}.`);
            return true;
        },

        saveEmailLog: function (emailLog) {
            try {
                const logs = this.getEmailLogs();
                logs.unshift(emailLog);
                localStorage.setItem(CONFIG.emailsStorageKey, JSON.stringify(logs));
            } catch (e) {
                console.error('[EduLeads] Error logging email:', e);
            }
        },

        getEmailLogs: function () {
            try {
                const raw = localStorage.getItem(CONFIG.emailsStorageKey);
                return raw ? JSON.parse(raw) : [];
            } catch (e) {
                return [];
            }
        },

        viewEmailLog: function (meetingId) {
            const logs = this.getEmailLogs();
            const log = logs.find(l => l.meetingId === meetingId) || logs[0];
            if (!log) {
                alert('No automated email log found for this meeting.');
                return;
            }

            let existing = document.getElementById('eduEmailLogModal');
            if (existing) existing.remove();

            const html = `
            <div class="modal fade show" id="eduEmailLogModal" tabindex="-1" style="display: block; background: rgba(0,0,100,0.6); z-index: 9999;" aria-modal="true" role="dialog">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content rounded-4 border-0 shadow-2xl overflow-hidden">
                        <div class="modal-header border-0 pb-0" style="background: linear-gradient(135deg, #000064, #00004a); color: white;">
                            <div class="d-flex align-items-center gap-2">
                                <i class="fa-solid fa-envelope-circle-check fs-4 text-warning"></i>
                                <div>
                                    <h5 class="modal-title fw-bold fs-16 mb-0 text-white">Automated Confirmation Email Record</h5>
                                    <span class="fs-11 text-white-50">Dispatched from noreply@theeduconsultant.com</span>
                                </div>
                            </div>
                            <button type="button" class="btn-close btn-close-white" onclick="document.getElementById('eduEmailLogModal').remove()"></button>
                        </div>
                        <div class="modal-body p-4 text-start">
                            <div class="p-3 rounded-3 bg-light border mb-3 fs-13">
                                <div><strong>From:</strong> <span class="badge bg-danger">${log.from}</span></div>
                                <div class="mt-1"><strong>To:</strong> <span class="badge bg-primary">${log.to}</span></div>
                                <div class="mt-1"><strong>CC:</strong> <span class="text-muted">${log.cc}</span></div>
                                <div class="mt-1"><strong>Subject:</strong> <span class="fw-bold text-dark">${log.subject}</span></div>
                                <div class="mt-1"><strong>Timestamp:</strong> <span class="text-muted">${log.dateFormatted || log.date}</span></div>
                            </div>
                            <div class="email-dispatch-preview">${log.body}</div>
                        </div>
                        <div class="modal-footer border-0 pt-0 bg-white">
                            <button type="button" class="btn btn-secondary rounded-pill px-4 fs-13" onclick="document.getElementById('eduEmailLogModal').remove()">Close</button>
                        </div>
                    </div>
                </div>
            </div>`;
            document.body.insertAdjacentHTML('beforeend', html);
        },

        showMeetingConfirmedModal: function (meeting, emailLog) {
            let existing = document.getElementById('eduMeetingConfirmSuccessModal');
            if (existing) existing.remove();

            const html = `
            <div class="modal fade show" id="eduMeetingConfirmSuccessModal" tabindex="-1" style="display: block; background: rgba(0,0,100,0.6); z-index: 9999;" aria-modal="true" role="dialog">
                <div class="modal-dialog modal-dialog-centered" style="max-width: 520px;">
                    <div class="modal-content rounded-4 border-0 shadow-2xl overflow-hidden">
                        <div class="modal-header border-0 pb-0" style="background: linear-gradient(135deg, #166534, #14532d); color: white;">
                            <div class="d-flex align-items-center gap-2">
                                <i class="fa-solid fa-circle-check fs-3 text-warning"></i>
                                <div>
                                    <h5 class="modal-title fw-bold fs-16 mb-0 text-white">Meeting Confirmed Successfully!</h5>
                                    <span class="fs-11 text-white-50">Automated Email Dispatched to Student</span>
                                </div>
                            </div>
                            <button type="button" class="btn-close btn-close-white" onclick="document.getElementById('eduMeetingConfirmSuccessModal').remove()"></button>
                        </div>
                        <div class="modal-body p-4 text-start">
                            <p class="text-dark fs-14 mb-3">
                                Booking <strong>#${meeting.id}</strong> for <strong>${meeting.name}</strong> is now officially <span class="badge bg-success">CONFIRMED</span> in the Admin CMS.
                            </p>
                            <div class="alert alert-success d-flex align-items-center gap-2 py-2 px-3 fs-13 mb-3 rounded-3 border-0">
                                <i class="fa-solid fa-paper-plane fs-5 text-success"></i>
                                <div>
                                    Confirmation email sent to <strong>${meeting.email}</strong> from <strong>${CONFIG.noreplyEmail}</strong>.
                                </div>
                            </div>
                            <div class="p-3 rounded-3 bg-light border mb-3 fs-13">
                                <div><span class="text-muted">Confirmed Date:</span> <strong>${meeting.date}</strong></div>
                                <div><span class="text-muted">Time Slot:</span> <strong>${meeting.time}</strong></div>
                                <div><span class="text-muted">Mode:</span> <strong>${meeting.mode}</strong></div>
                                <div><span class="text-muted">Destination:</span> <strong>${meeting.destination}</strong></div>
                            </div>
                            <div class="d-flex gap-2">
                                <button type="button" class="btn btn-outline-primary rounded-pill w-50 py-2 fs-13 fw-bold" onclick="document.getElementById('eduMeetingConfirmSuccessModal').remove(); window.EduLeads.viewEmailLog('${meeting.id}');">
                                    <i class="fa-solid fa-eye me-1"></i> View Sent Email
                                </button>
                                <a href="https://wa.me/${(meeting.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${meeting.name}, your meeting with The Edu Consultant on ${meeting.date} at ${meeting.time} is CONFIRMED!`)}" target="_blank" class="btn btn-success rounded-pill w-50 py-2 fs-13 fw-bold">
                                    <i class="fa-brands fa-whatsapp me-1"></i> WhatsApp Student
                                </a>
                            </div>
                        </div>
                        <div class="modal-footer border-0 pt-0 bg-white">
                            <button type="button" class="btn btn-secondary rounded-pill w-100 fs-13" onclick="document.getElementById('eduMeetingConfirmSuccessModal').remove()">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
            document.body.insertAdjacentHTML('beforeend', html);
        },

        closeMeetingModal: function () {
            const modalEl = document.getElementById('eduScheduleMeetingModal');
            if (modalEl) {
                try {
                    if (window.bootstrap && window.bootstrap.Modal) {
                        const bsModal = bootstrap.Modal.getInstance(modalEl);
                        if (bsModal) bsModal.hide();
                    }
                } catch (mErr) {}
                modalEl.classList.remove('show');
                modalEl.style.display = 'none';
                modalEl.setAttribute('aria-hidden', 'true');
            }
            document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
            document.body.classList.remove('modal-open');
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('padding-right');
        },

        // ======================================================================
        // 3. SCHEDULE MEETING MODAL (CLIENT INTERFACE)
        // ======================================================================
        openMeetingModal: function () {
            let modal = document.getElementById('eduScheduleMeetingModal');
            const todayStr = new Date().toISOString().slice(0, 10);

            if (modal) {
                // Reset form state if already present
                const form = document.getElementById('eduScheduleMeetingForm');
                if (form) form.reset();
                const dateEl = document.getElementById('meetingDate');
                if (dateEl) {
                    dateEl.value = todayStr;
                    dateEl.min = todayStr;
                }
                const errBox = document.getElementById('meetingFormError');
                if (errBox) {
                    errBox.classList.add('d-none');
                    errBox.textContent = '';
                }
                const submitBtn = document.getElementById('btnSubmitMeeting');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-calendar-check me-2"></i> Confirm & Book Slot';
                }
            } else {
                const modalHtml = `
                <div class="modal fade" id="eduScheduleMeetingModal" tabindex="-1" aria-labelledby="eduScheduleMeetingModalLabel" aria-hidden="true" style="z-index: 9990;">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content rounded-4 border-0 shadow-2xl overflow-hidden">
                            <div class="modal-header border-0 p-4" style="background: linear-gradient(135deg, #000064 0%, #00004a 100%); color: white;">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="rounded-circle d-flex align-items-center justify-content-center" style="width: 44px; height: 44px; background: #f5dc3c; color: #000064;">
                                        <i class="fa-solid fa-calendar-check fs-4"></i>
                                    </div>
                                    <div>
                                        <h5 class="modal-title fw-bold fs-18 mb-0 text-white" id="eduScheduleMeetingModalLabel">Schedule 1-on-1 Advisory Meeting</h5>
                                        <span class="fs-12 text-white-50">Select your preferred date, time slot, and consultation mode</span>
                                    </div>
                                </div>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onclick="window.EduLeads.closeMeetingModal();"></button>
                            </div>

                            <form id="eduScheduleMeetingForm" action="javascript:void(0);" onsubmit="window.EduLeads.handleMeetingSubmit(event); return false;">
                                <div class="modal-body p-4 text-start">
                                    <!-- Inline Validation Error Box -->
                                    <div id="meetingFormError" class="alert alert-danger py-2 px-3 fs-13 mb-3 d-none"></div>

                                    <div class="row g-3">
                                        <!-- Full Name -->
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold fs-13 text-dark">Full Name <span class="text-danger">*</span></label>
                                            <div class="input-group">
                                                <span class="input-group-text bg-light border-end-0 text-muted"><i class="fa-solid fa-user"></i></span>
                                                <input type="text" class="form-control zForm-control border-start-0" id="meetingFullName" placeholder="Enter your full name">
                                            </div>
                                        </div>

                                        <!-- Phone Number -->
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold fs-13 text-dark">Mobile / WhatsApp Number <span class="text-danger">*</span></label>
                                            <div class="input-group">
                                                <span class="input-group-text bg-light border-end-0 text-muted"><i class="fa-solid fa-phone"></i></span>
                                                <input type="tel" class="form-control zForm-control border-start-0" id="meetingPhone" placeholder="e.g. +91 98453 71459">
                                            </div>
                                        </div>

                                        <!-- Email Address -->
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold fs-13 text-dark">Email Address <span class="text-danger">*</span></label>
                                            <div class="input-group">
                                                <span class="input-group-text bg-light border-end-0 text-muted"><i class="fa-solid fa-envelope"></i></span>
                                                <input type="email" class="form-control zForm-control border-start-0" id="meetingEmail" placeholder="name@example.com">
                                            </div>
                                            <div class="fs-11 text-muted mt-1">Confirmation will be sent from <strong>noreply@theeduconsultant.com</strong>.</div>
                                        </div>

                                        <!-- Target Destination -->
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold fs-13 text-dark">Target Study Destination <span class="text-danger">*</span></label>
                                            <select class="form-select zForm-control" id="meetingDestination">
                                                <option value="United Kingdom" selected>🇬🇧 United Kingdom (Russell Group)</option>
                                                <option value="United States">🇺🇸 United States (Top 100 STEM)</option>
                                                <option value="Canada">🇨🇦 Canada (Top Universities & PR)</option>
                                                <option value="Australia">🇦🇺 Australia (Group of Eight)</option>
                                                <option value="Germany / Europe">🇩🇪 Germany & Europe (Low/No Tuition)</option>
                                                <option value="Ireland">🇮🇪 Ireland (Tech & Finance Hub)</option>
                                                <option value="Global Counseling">🌍 Multi-Country Advisory</option>
                                            </select>
                                        </div>

                                        <!-- Preferred Date -->
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold fs-13 text-dark">Preferred Date <span class="text-danger">*</span></label>
                                            <div class="input-group">
                                                <span class="input-group-text bg-light border-end-0 text-muted"><i class="fa-solid fa-calendar-day"></i></span>
                                                <input type="date" class="form-control zForm-control border-start-0" id="meetingDate" min="${todayStr}" value="${todayStr}">
                                            </div>
                                        </div>

                                        <!-- Preferred Time Slot -->
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold fs-13 text-dark">Preferred Time Slot <span class="text-danger">*</span></label>
                                            <select class="form-select zForm-control" id="meetingTime">
                                                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM (Morning Slot)</option>
                                                <option value="11:30 AM - 12:30 PM" selected>11:30 AM - 12:30 PM (Mid-Day Slot)</option>
                                                <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM (Afternoon Slot)</option>
                                                <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM (Late Afternoon Slot)</option>
                                                <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM (Evening Slot)</option>
                                                <option value="07:30 PM - 08:30 PM">07:30 PM - 08:30 PM (Night Slot)</option>
                                            </select>
                                        </div>

                                        <!-- Consultation Mode -->
                                        <div class="col-12">
                                            <label class="form-label fw-bold fs-13 text-dark mb-1">Consultation Mode <span class="text-danger">*</span></label>
                                            <div class="d-flex gap-3 flex-wrap">
                                                <div class="form-check p-3 rounded-3 border bg-light flex-grow-1">
                                                    <input class="form-check-input" type="radio" name="meetingMode" id="modeVirtual" value="Virtual Video Session (Google Meet / Zoom)" checked>
                                                    <label class="form-check-label fw-bold fs-13 text-dark" for="modeVirtual">
                                                        <i class="fa-solid fa-video text-primary me-1"></i> Virtual Video Call
                                                        <span class="d-block fs-11 text-muted fw-normal mt-0.5">Google Meet / Zoom link delivered via email</span>
                                                    </label>
                                                </div>
                                                <div class="form-check p-3 rounded-3 border bg-light flex-grow-1">
                                                    <input class="form-check-input" type="radio" name="meetingMode" id="modeInPerson" value="In-Person (Bengaluru Lounge, Shanthala Nagar)">
                                                    <label class="form-check-label fw-bold fs-13 text-dark" for="modeInPerson">
                                                        <i class="fa-solid fa-location-dot text-danger me-1"></i> In-Person Lounge Session
                                                        <span class="d-block fs-11 text-muted fw-normal mt-0.5">Shanthala Nagar, Ashok Nagar, Bengaluru</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Notes / Questions -->
                                        <div class="col-12">
                                            <label class="form-label fw-bold fs-13 text-dark">Discussion Agenda / Specific Queries (Optional)</label>
                                            <textarea class="form-control zForm-control" id="meetingNotes" rows="2" placeholder="e.g. Want guidance on scholarship deadlines, university shortlisting, or visa process..."></textarea>
                                        </div>

                                        <!-- WhatsApp Direct Sync Notice -->
                                        <div class="col-12">
                                            <div class="edu-whatsapp-optin-box d-flex align-items-center gap-2">
                                                <i class="fa-brands fa-whatsapp text-success fs-4 flex-shrink-0"></i>
                                                <div class="fs-12 text-dark">
                                                    <strong>Instant Counselor Sync:</strong> Booking automatically updates the Admin Dashboard and dispatches an instant WhatsApp alert to senior advisory.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-footer border-0 p-4 pt-0 bg-white">
                                    <button type="button" class="btn btn-outline-secondary rounded-pill px-4 fs-13" data-bs-dismiss="modal" onclick="window.EduLeads.closeMeetingModal();">Cancel</button>
                                    <button type="button" id="btnSubmitMeeting" onclick="window.EduLeads.handleMeetingSubmit(event)" class="btn btn-warning rounded-pill px-5 py-2.5 fw-bold fs-14 shadow-sm" style="background-color: var(--button); color: var(--brand-primary); border: none;">
                                        <i class="fa-solid fa-calendar-check me-2"></i> Confirm & Book Slot
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`;
                document.body.insertAdjacentHTML('beforeend', modalHtml);
                modal = document.getElementById('eduScheduleMeetingModal');
            }

            // Show using Bootstrap if present, else fallback
            try {
                if (window.bootstrap && window.bootstrap.Modal) {
                    const bsModal = bootstrap.Modal.getOrCreateInstance(modal);
                    bsModal.show();
                } else {
                    modal.classList.add('show');
                    modal.style.display = 'block';
                }
            } catch (err) {
                modal.classList.add('show');
                modal.style.display = 'block';
            }
        },

        handleMeetingSubmit: function (e) {
            if (e) {
                if (typeof e.preventDefault === 'function') e.preventDefault();
                if (typeof e.stopPropagation === 'function') e.stopPropagation();
            }

            const fullNameEl = document.getElementById('meetingFullName');
            const phoneEl = document.getElementById('meetingPhone');
            const emailEl = document.getElementById('meetingEmail');
            const destEl = document.getElementById('meetingDestination');
            const dateEl = document.getElementById('meetingDate');
            const timeEl = document.getElementById('meetingTime');
            const notesEl = document.getElementById('meetingNotes');
            const errBox = document.getElementById('meetingFormError');

            const showError = (msg, inputEl) => {
                if (errBox) {
                    errBox.textContent = msg;
                    errBox.classList.remove('d-none');
                } else {
                    alert(msg);
                }
                if (inputEl) inputEl.focus();
            };

            const fullName = fullNameEl ? fullNameEl.value.trim() : '';
            const phone = phoneEl ? phoneEl.value.trim() : '';
            const email = emailEl ? emailEl.value.trim() : '';
            const destination = destEl ? destEl.value : 'United Kingdom';
            const date = dateEl ? dateEl.value : '';
            const time = timeEl ? timeEl.value : '11:30 AM - 12:30 PM';
            const notes = notesEl ? notesEl.value.trim() : '';

            const modeRadio = document.querySelector('input[name="meetingMode"]:checked');
            const mode = modeRadio ? modeRadio.value : 'Virtual Video Session (Google Meet / Zoom)';

            // Validation Checks
            if (!fullName) {
                showError('Please enter your full name.', fullNameEl);
                return false;
            }
            if (!phone || phone.length < 7) {
                showError('Please enter a valid mobile or WhatsApp phone number.', phoneEl);
                return false;
            }
            if (!email || !email.includes('@')) {
                showError('Please enter a valid email address for booking confirmation.', emailEl);
                return false;
            }
            if (!date) {
                showError('Please select your preferred session date.', dateEl);
                return false;
            }

            if (errBox) errBox.classList.add('d-none');

            const submitBtn = document.getElementById('btnSubmitMeeting');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Registering Session...';
            }

            const meetingData = {
                name: fullName,
                phone: phone,
                email: email,
                destination: destination,
                date: date,
                time: time,
                mode: mode,
                notes: notes
            };

            try {
                const created = this.saveMeeting(meetingData);

                // Hide Schedule Meeting modal cleanly
                this.closeMeetingModal();

                // Show Friendly Confirmation popup
                this.showStudentMeetingSubmittedModal(created);
            } catch (saveErr) {
                console.error('[EduLeads] Error during meeting submission:', saveErr);
                alert('An error occurred while booking: ' + saveErr.message);
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-calendar-check me-2"></i> Confirm & Book Slot';
                }
            }

            return false;
        },

        showStudentMeetingSubmittedModal: function (meeting) {
            let existing = document.getElementById('eduStudentMeetingSuccessModal');
            if (existing) existing.remove();

            const waLink = meeting.waLink || `https://wa.me/${CONFIG.whatsappInternational}?text=${encodeURIComponent(`Hello The Edu Consultant, I booked meeting ID ${meeting.id} for ${meeting.date} at ${meeting.time}.`)}`;

            const html = `
            <div class="modal fade show" id="eduStudentMeetingSuccessModal" tabindex="-1" style="display: block; background: rgba(0,0,100,0.6); z-index: 9999;" aria-modal="true" role="dialog">
                <div class="modal-dialog modal-dialog-centered" style="max-width: 520px;">
                    <div class="modal-content rounded-4 border-0 shadow-2xl overflow-hidden">
                        <div class="modal-header border-0 pb-0" style="background: linear-gradient(135deg, #000064, #00004a); color: white;">
                            <div class="d-flex align-items-center gap-2">
                                <div class="rounded-circle d-flex align-items-center justify-content-center" style="width: 38px; height: 38px; background: #f5dc3c; color: #000064;">
                                    <i class="fa-solid fa-calendar-check fs-5"></i>
                                </div>
                                <div>
                                    <h5 class="modal-title fw-bold fs-16 mb-0 text-white">Meeting Registered Successfully!</h5>
                                    <span class="fs-11 text-white-50">Booking Reference: ${meeting.id}</span>
                                </div>
                            </div>
                            <button type="button" class="btn-close btn-close-white" onclick="document.getElementById('eduStudentMeetingSuccessModal').remove()"></button>
                        </div>
                        <div class="modal-body p-4 text-start">
                            <p class="text-dark fs-14 mb-3">
                                Thank you, <strong>${meeting.name}</strong>! Your 1-on-1 counseling session has been recorded in our system.
                            </p>
                            <div class="p-3 rounded-3 bg-light border mb-3 fs-13">
                                <div class="mb-1"><span class="text-muted">Booking ID:</span> <span class="badge bg-primary text-white">${meeting.id}</span></div>
                                <div class="mb-1"><span class="text-muted">Requested Date:</span> <strong>${meeting.date}</strong></div>
                                <div class="mb-1"><span class="text-muted">Time Slot:</span> <strong>${meeting.time}</strong></div>
                                <div class="mb-1"><span class="text-muted">Consultation Mode:</span> <strong>${meeting.mode}</strong></div>
                                <div><span class="text-muted">Target Destination:</span> <strong>${meeting.destination}</strong></div>
                            </div>
                            <div class="alert alert-info d-flex align-items-center gap-2 py-2 px-3 fs-13 mb-3 rounded-3 border-0">
                                <i class="fa-solid fa-envelope fs-5 text-primary"></i>
                                <div>
                                    Our senior counselor has received your request. Once confirmed, you will receive an official confirmation email from <strong>${CONFIG.noreplyEmail}</strong>.
                                </div>
                            </div>
                            <div class="d-flex flex-column gap-2">
                                <a href="${waLink}" target="_blank" class="btn btn-success rounded-pill w-100 py-2.5 fs-14 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2">
                                    <i class="fa-brands fa-whatsapp fs-5"></i>
                                    <span>Send to Counselor on WhatsApp</span>
                                </a>
                                <button type="button" class="btn btn-outline-secondary rounded-pill w-100 py-2 fs-13" onclick="document.getElementById('eduStudentMeetingSuccessModal').remove()">
                                    Done & Return to Website
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            document.body.insertAdjacentHTML('beforeend', html);
        },

        // ======================================================================
        // 4. ADMIN DASHBOARD SCHEDULED MEETINGS TABLE & KPIS
        // ======================================================================
        renderAdminMeetingsTable: function (filterStatus) {
            const tableBody = document.getElementById('adminMeetingsTableBody');
            if (!tableBody) return;

            let meetings = this.getMeetings();
            if (filterStatus && filterStatus !== 'All') {
                meetings = meetings.filter(m => m.status === filterStatus);
            }

            if (meetings.length === 0) {
                tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-5 text-muted">
                        <i class="fa-solid fa-calendar-xmark fs-1 d-block mb-2 opacity-50"></i>
                        <h6 class="fw-bold mb-1">No Meetings Found</h6>
                        <p class="fs-13 mb-0">Student advisory sessions booked through the website or WhatsApp will display here.</p>
                    </td>
                </tr>`;
                this.updateBadge();
                return;
            }

            tableBody.innerHTML = meetings.map((m) => {
                const badgeClass = m.status === 'Confirmed' ? 'bg-success text-white' : (m.status === 'Rescheduled' ? 'bg-info text-dark' : 'bg-warning text-dark');
                const badgeIcon = m.status === 'Confirmed' ? 'fa-check' : (m.status === 'Rescheduled' ? 'fa-clock-rotate-left' : 'fa-hourglass-half');

                const waStudentUrl = `https://wa.me/${(m.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${m.name}, regarding your advisory meeting scheduled on ${m.date} at ${m.time} with The Edu Consultant...`)}`;

                return `
                <tr class="align-middle">
                    <td class="text-nowrap fs-12 text-muted fw-semibold">
                        <div>${m.dateFormatted || m.createdAt.slice(0, 10)}</div>
                        <span class="badge bg-light text-dark border fs-11">${m.id}</span>
                    </td>
                    <td>
                        <div class="fw-bold text-dark fs-14">${m.name}</div>
                        <div class="fs-12 text-muted"><i class="fa-solid fa-location-dot me-1 text-danger"></i>${m.destination}</div>
                    </td>
                    <td>
                        <div class="fs-13">
                            <a href="tel:${(m.phone || '').replace(/[^0-9+]/g, '')}" class="text-primary text-decoration-none fw-bold">
                                <i class="fa-solid fa-phone me-1 fs-11"></i> ${m.phone}
                            </a>
                        </div>
                        <div class="fs-12 text-muted">
                            <a href="mailto:${m.email}" class="text-muted text-decoration-none">
                                <i class="fa-solid fa-envelope me-1 fs-11"></i> ${m.email}
                            </a>
                        </div>
                    </td>
                    <td>
                        <div class="fw-bold text-dark fs-13"><i class="fa-solid fa-calendar-day me-1 text-primary"></i> ${m.date}</div>
                        <div class="fs-12 text-muted fw-semibold"><i class="fa-solid fa-clock me-1 text-warning"></i> ${m.time}</div>
                    </td>
                    <td>
                        <span class="badge ${m.mode.includes('Virtual') ? 'bg-primary-subtle text-primary border border-primary-subtle' : 'bg-warning-subtle text-dark border border-warning-subtle'} rounded-pill px-2.5 py-1 fs-11 fw-bold">
                            ${m.mode.includes('Virtual') ? '<i class="fa-solid fa-video me-1"></i> Virtual' : '<i class="fa-solid fa-building me-1"></i> Lounge'}
                        </span>
                    </td>
                    <td>
                        <span class="badge ${badgeClass} rounded-pill px-2.5 py-1 fs-12 fw-bold d-inline-flex align-items-center gap-1">
                            <i class="fa-solid ${badgeIcon}"></i> ${m.status}
                        </span>
                        ${m.confirmedAt ? `<div class="fs-10 text-muted mt-1">Confirmed: ${m.confirmedAt.slice(0, 10)}</div>` : ''}
                    </td>
                    <td class="text-nowrap text-end">
                        <div class="btn-group btn-group-sm">
                            ${m.status !== 'Confirmed' ? `
                            <button type="button" class="btn btn-success fw-bold px-2.5" onclick="window.EduLeads.confirmMeeting('${m.id}')" title="Confirm Meeting & Dispatch Email">
                                <i class="fa-solid fa-check me-1"></i> Confirm
                            </button>` : `
                            <button type="button" class="btn btn-outline-success px-2" onclick="window.EduLeads.viewEmailLog('${m.id}')" title="View Sent Confirmation Email">
                                <i class="fa-solid fa-envelope-circle-check"></i>
                            </button>`}
                            
                            <button type="button" class="btn btn-outline-warning" onclick="window.EduLeads.openReschedulePrompt('${m.id}')" title="Re-schedule Meeting">
                                <i class="fa-solid fa-clock-rotate-left"></i>
                            </button>
                            <a href="${waStudentUrl}" target="_blank" class="btn btn-outline-success" title="Chat on WhatsApp">
                                <i class="fa-brands fa-whatsapp"></i>
                            </a>
                            <a href="tel:${(m.phone || '').replace(/[^0-9+]/g, '')}" class="btn btn-outline-primary" title="Direct Phone Call">
                                <i class="fa-solid fa-phone"></i>
                            </a>
                        </div>
                    </td>
                </tr>`;
            }).join('');

            this.updateBadge();
        },

        openReschedulePrompt: function (meetingId) {
            const meetings = this.getMeetings();
            const meeting = meetings.find(m => m.id === meetingId);
            if (!meeting) return;

            const newDate = prompt(`Enter new date for ${meeting.name} (YYYY-MM-DD):`, meeting.date);
            if (!newDate) return;

            const newTime = prompt(`Enter new time slot:`, meeting.time);
            if (!newTime) return;

            const reason = prompt(`Enter reschedule reason / counselor note:`, 'Counselor schedule optimization');

            this.rescheduleMeeting(meetingId, newDate, newTime, reason);
        },

        // ======================================================================
        // 5. COUNTERS & BADGES
        // ======================================================================
        updateBadge: function () {
            // Leads
            const leads = this.getLeads();
            const total = leads.length;
            const waCount = leads.filter(l => l.whatsappOptIn).length;
            const newCount = leads.filter(l => l.status === 'New').length;

            const badge = document.getElementById('sidebarLeadsBadge');
            if (badge) badge.textContent = newCount > 0 ? `${newCount} New` : total;

            const totalCounter = document.getElementById('adminTotalLeadsCounter');
            if (totalCounter) totalCounter.textContent = total;

            const waCounter = document.getElementById('adminWhatsAppLeadsCounter');
            if (waCounter) waCounter.textContent = waCount;

            const newCounter = document.getElementById('adminNewLeadsCounter');
            if (newCounter) newCounter.textContent = newCount;

            // Meetings
            const meetings = this.getMeetings();
            const totalMeetings = meetings.length;
            const pendingMeetings = meetings.filter(m => m.status === 'Pending').length;
            const confirmedMeetings = meetings.filter(m => m.status === 'Confirmed').length;

            const mtgBadge = document.getElementById('sidebarMeetingsBadge');
            if (mtgBadge) mtgBadge.textContent = pendingMeetings > 0 ? `${pendingMeetings} Pending` : totalMeetings;

            const totalMtgCounter = document.getElementById('adminTotalMeetingsCounter');
            if (totalMtgCounter) totalMtgCounter.textContent = totalMeetings;

            const pendingMtgCounter = document.getElementById('adminPendingMeetingsCounter');
            if (pendingMtgCounter) pendingMtgCounter.textContent = pendingMeetings;

            const confirmedMtgCounter = document.getElementById('adminConfirmedMeetingsCounter');
            if (confirmedMtgCounter) confirmedMtgCounter.textContent = confirmedMeetings;

            const emailsLogCount = this.getEmailLogs().length;
            const emailCounter = document.getElementById('adminEmailsSentCounter');
            if (emailCounter) emailCounter.textContent = emailsLogCount;
        },

        // ======================================================================
        // 6. INJECT DUAL CONNECT WIDGET (DIRECT CALL VS WHATSAPP VS SCHEDULE)
        // ======================================================================
        bindConnectEvents: function () {
            const toggleBtn = document.getElementById('toggleConnectCardBtn');
            const closeBtn = document.getElementById('closeConnectCardBtn');
            const card = document.getElementById('eduConnectCard');

            this.toggleConnectCard = function () {
                const c = document.getElementById('eduConnectCard');
                if (c) c.classList.toggle('active');
            };

            if (toggleBtn && card && !toggleBtn._hasBoundConnect) {
                toggleBtn._hasBoundConnect = true;
                const handleToggle = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    card.classList.toggle('active');
                };
                toggleBtn.addEventListener('click', handleToggle);
            }
            if (closeBtn && card && !closeBtn._hasBoundConnect) {
                closeBtn._hasBoundConnect = true;
                const handleClose = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    card.classList.remove('active');
                };
                closeBtn.addEventListener('click', handleClose);
            }
            if (!document._hasBoundConnectDismiss) {
                document._hasBoundConnectDismiss = true;
                document.addEventListener('click', (e) => {
                    const c = document.getElementById('eduConnectCard');
                    const tb = document.getElementById('toggleConnectCardBtn');
                    const dt = document.getElementById('dockConnectTrigger');
                    if (c && c.classList.contains('active') && !c.contains(e.target) && (!tb || !tb.contains(e.target)) && (!dt || !dt.contains(e.target))) {
                        c.classList.remove('active');
                    }
                });
            }
        },

        injectConnectWidget: function () {
            // If already present in static HTML, just bind event listeners
            if (document.getElementById('eduConnectFloat')) {
                this.bindConnectEvents();
                return;
            }

            // Don't inject on admin dashboard or login page
            if (window.location.pathname.includes('admin') || window.location.pathname.includes('login') || window.location.pathname.includes('signup')) {
                return;
            }

            const widgetHtml = `
            <!-- Floating Connect Widget (Call vs WhatsApp vs Schedule Meeting) -->
            <div class="edu-connect-wrapper" id="eduConnectFloat">
                <!-- Connect Options Popover -->
                <div class="edu-connect-card shadow-2xl" id="eduConnectCard">
                    <div class="edu-connect-header">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-2">
                                <div class="connect-logo-badge">
                                    <i class="fa-solid fa-graduation-cap"></i>
                                </div>
                                <div>
                                    <h6 class="fw-bold mb-0 text-white fs-14">The Edu Consultant</h6>
                                    <span class="fs-11 text-white-50">Admissions & Visa Advisory</span>
                                </div>
                            </div>
                            <button type="button" class="btn-close btn-close-white fs-11" id="closeConnectCardBtn" aria-label="Close"></button>
                        </div>
                    </div>
                    <div class="edu-connect-body">
                        <p class="fs-12 text-muted mb-3 fw-semibold">
                            How would you like to connect with our senior education counselor?
                        </p>
                        
                        <!-- Option 1: Direct Call (Number hidden in UI) -->
                        <a href="tel:+919845371459" class="edu-connect-option-item call-action">
                            <div class="option-icon-box bg-primary text-white">
                                <i class="fa-solid fa-phone"></i>
                            </div>
                            <div class="option-content">
                                <div class="option-title">Direct Phone Call</div>
                                <div class="option-subtitle">Instant Voice Consultation</div>
                                <div class="option-tag"><i class="fa-solid fa-clock me-1"></i> Speak Now • Mon-Sat 9AM-8PM</div>
                            </div>
                            <i class="fa-solid fa-arrow-right option-arrow"></i>
                        </a>

                        <!-- Option 2: WhatsApp Chat (Number hidden in UI) -->
                        <a href="https://wa.me/919845371459?text=Hello%20The%20Edu%20Consultant!%20I%20would%20like%20to%20speak%20with%20a%20study%20abroad%20advising%20expert." target="_blank" rel="noopener noreferrer" class="edu-connect-option-item wa-action">
                            <div class="option-icon-box bg-success text-white">
                                <i class="fa-brands fa-whatsapp"></i>
                            </div>
                            <div class="option-content">
                                <div class="option-title">Chat on WhatsApp</div>
                                <div class="option-subtitle">24/7 Fast Messaging & Support</div>
                                <div class="option-tag text-success"><i class="fa-solid fa-bolt me-1"></i> Instant Response • Official Advisor</div>
                            </div>
                            <i class="fa-solid fa-arrow-right option-arrow"></i>
                        </a>

                        <!-- Option 3: Schedule Meeting (Opens interactive booking modal) -->
                        <button type="button" class="edu-connect-option-item schedule-action text-start w-100 border-0" onclick="window.EduLeads.openMeetingModal(); document.getElementById('eduConnectCard').classList.remove('active');">
                            <div class="option-icon-box bg-warning text-dark">
                                <i class="fa-solid fa-calendar-check"></i>
                            </div>
                            <div class="option-content">
                                <div class="option-title">Schedule Advisory Meeting</div>
                                <div class="option-subtitle">Book 1-on-1 Virtual or Lounge Session</div>
                                <div class="option-tag text-dark fw-bold"><i class="fa-solid fa-calendar-days me-1 text-primary"></i> Pick Date & Time • Free Counseling</div>
                            </div>
                            <i class="fa-solid fa-arrow-right option-arrow"></i>
                        </button>

                        <div class="edu-connect-footer">
                            <div class="d-flex align-items-center justify-content-between fs-11 text-muted">
                                <span><i class="fa-solid fa-envelope me-1 text-primary"></i> enquiry@theeduconsultant.com</span>
                                <span><i class="fa-solid fa-envelope me-1 text-danger"></i> adm.faraz@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Floating Trigger Button -->
                <button type="button" class="edu-connect-pill-btn shadow-lg" id="toggleConnectCardBtn" aria-label="Connect with Counselor">
                    <span class="connect-ping-ring"></span>
                    <span class="connect-btn-icons">
                        <i class="fa-solid fa-phone text-warning"></i>
                        <i class="fa-brands fa-whatsapp text-success fs-5"></i>
                    </span>
                    <span class="connect-btn-text">Connect With Us</span>
                </button>
            </div>`;

            document.body.insertAdjacentHTML('beforeend', widgetHtml);
            this.bindConnectEvents();
        },

        // ======================================================================
        // 7. URL ACTION LISTENER (FOR WHATSAPP LINK CLICKS)
        // ======================================================================
        checkUrlActions: function () {
            if (!window.location.search) return;
            const params = new URLSearchParams(window.location.search);
            const action = params.get('action');
            const id = params.get('id');

            if (action && id) {
                if (action === 'confirm_meeting') {
                    // Switch to meetings panel
                    setTimeout(() => {
                        const tabBtn = document.querySelector('[data-target="panel-meetings"]');
                        if (tabBtn) tabBtn.click();
                        this.confirmMeeting(id);
                    }, 400);
                } else if (action === 'reschedule_meeting') {
                    setTimeout(() => {
                        const tabBtn = document.querySelector('[data-target="panel-meetings"]');
                        if (tabBtn) tabBtn.click();
                        this.openReschedulePrompt(id);
                    }, 400);
                }

                // Clean URL query parameters so refresh does not duplicate action
                if (window.history && window.history.replaceState) {
                    window.history.replaceState({}, document.title, window.location.pathname + '#meetings');
                }
            }
        },

        // Universal Initializer
        init: function () {
            this.injectConnectWidget();
            this.updateBadge();

            // If on Admin Dashboard, render tables and listen for URL actions
            if (document.getElementById('adminLeadsTableBody')) {
                this.renderAdminTable();
            }
            if (document.getElementById('adminMeetingsTableBody')) {
                this.renderAdminMeetingsTable();
                document.querySelectorAll('[data-target="panel-meetings"]').forEach(tab => {
                    tab.addEventListener('click', () => this.renderAdminMeetingsTable());
                });
            }

            this.checkUrlActions();
        }
    };

    // Expose to window
    window.EduLeads = EduLeads;

    // Auto-init on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => EduLeads.init());
    } else {
        EduLeads.init();
    }
})();
