/**
 * The Edu Consultants - Leads, WhatsApp, Direct Call & Communications Engine
 * Manages Lead Generation, WhatsApp Direct Inquiries, Admin Dashboard Lead Sync,
 * and the Dual Connect Options Widget (Direct Call vs WhatsApp).
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
        brandName: 'The Edu Consultants',
        storageKey: 'theeduconsultants_leads',
        address: 'Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025'
    };

    // Default Seed Inquiries for Admin Dashboard
    const SEED_LEADS = [
        {
            id: 'lead-1791001',
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
            dateFormatted: new Date(Date.now() - 3600000 * 2).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
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
            dateFormatted: new Date(Date.now() - 3600000 * 7).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
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
            dateFormatted: new Date(Date.now() - 86400000 * 1.5).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
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

    const EduLeads = {
        config: CONFIG,

        // Retrieve all leads from LocalStorage
        getLeads: function () {
            try {
                const stored = localStorage.getItem(CONFIG.storageKey);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
                }
                // Seed initial data if empty
                localStorage.setItem(CONFIG.storageKey, JSON.stringify(SEED_LEADS));
                return SEED_LEADS;
            } catch (e) {
                console.error('[EduLeads] Error retrieving leads:', e);
                return SEED_LEADS;
            }
        },

        // Save a new lead
        saveLead: function (lead) {
            const leads = this.getLeads();
            const newLead = Object.assign({
                id: 'lead-' + Date.now(),
                createdAt: new Date().toISOString(),
                dateFormatted: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
                status: 'New'
            }, lead);

            leads.unshift(newLead);
            try {
                localStorage.setItem(CONFIG.storageKey, JSON.stringify(leads));
            } catch (e) {
                console.error('[EduLeads] Error saving lead:', e);
            }

            // Sync with admin dashboard badge if open
            this.updateBadge();
            return newLead;
        },

        // Update lead status
        updateLeadStatus: function (id, newStatus) {
            const leads = this.getLeads();
            const idx = leads.findIndex(l => l.id === id);
            if (idx !== -1) {
                leads[idx].status = newStatus;
                localStorage.setItem(CONFIG.storageKey, JSON.stringify(leads));
                return true;
            }
            return false;
        },

        // Delete a lead
        deleteLead: function (id) {
            let leads = this.getLeads();
            leads = leads.filter(l => l.id !== id);
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(leads));
            this.updateBadge();
            return leads;
        },

        // Export Leads as CSV
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
            link.setAttribute('download', `the-edu-consultants-leads-${new Date().toISOString().slice(0, 10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        // Generate WhatsApp URL with prefilled lead message
        getWhatsAppUrl: function (lead) {
            const lines = [
                `*New Student Inquiry - The Edu Consultants*`,
                `👤 *Name:* ${lead.name || 'Student'}`,
                `📞 *Phone:* ${lead.phone || 'N/A'}`,
                `✉️ *Email:* ${lead.email || 'N/A'}`,
                `🎯 *Program / Country:* ${lead.destination || 'Study Abroad Counseling'}`,
                `💬 *Query:* ${lead.message || 'I would like to speak with a senior admissions counselor.'}`,
                `\n_Sent via The Edu Consultants Portal (${lead.source || 'Website'})_`
            ];
            const msg = encodeURIComponent(lines.join('\n'));
            return `https://wa.me/${CONFIG.whatsappInternational}?text=${msg}`;
        },

        // Universal Form Submission Handler
        handleFormSubmit: function (e, sourceName) {
            if (e && e.preventDefault) e.preventDefault();
            const form = e.target || e;

            // Security Rate Limit Check (if loaded)
            if (window.EduSecurity && window.EduSecurity.rateLimiter) {
                const rate = window.EduSecurity.rateLimiter.check('lead_form', 3, 60000);
                if (!rate.allowed) {
                    alert(rate.message);
                    return false;
                }
                window.EduSecurity.rateLimiter.record('lead_form');
            }

            // Extract form values safely
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

            // WhatsApp Checkbox
            const waCheckbox = form.querySelector('input[type="checkbox"][name="whatsappOptIn"], input[type="checkbox"][id*="whatsApp"], input[type="checkbox"][id*="whatsapp"]');
            const whatsappOptIn = waCheckbox ? waCheckbox.checked : true; // Default true as requested

            if (!phone && !email) {
                alert('Please provide at least a phone number or email address so our counselors can reach you.');
                return false;
            }

            // Create lead object
            const leadData = {
                name: fullName,
                phone: phone || 'Not provided',
                email: email || 'Not provided',
                source: sourceName || 'Website Lead Form',
                destination: destination,
                message: message,
                whatsappOptIn: whatsappOptIn
            };

            // 1. Save in Admin Dashboard Storage
            this.saveLead(leadData);

            // 2. Dispatch Email Routing (Notification to adm.faraz@gmail.com & enquiry@theeduconsultant.com)
            this.logEmailNotification(leadData);

            // 3. Trigger WhatsApp if opted in
            if (whatsappOptIn) {
                const waUrl = this.getWhatsAppUrl(leadData);
                // Prompt and open WhatsApp window
                window.open(waUrl, '_blank');
            }

            // 4. Show friendly confirmation modal/alert
            this.showSuccessModal(leadData, whatsappOptIn);

            // Reset form
            if (form && typeof form.reset === 'function') form.reset();
            return false;
        },

        // Log and simulate email notification routing
        logEmailNotification: function (lead) {
            console.log(`%c[Lead Notification Sent]%c 
To: ${CONFIG.enquiryEmail}, ${CONFIG.adminEmail}
From: ${CONFIG.noreplyEmail}
Subject: [New Student Lead] ${lead.name} - ${lead.destination}
Phone: ${lead.phone}
Email: ${lead.email}
WhatsApp Opt-In: ${lead.whatsappOptIn ? 'YES' : 'NO'}
Message: ${lead.message}`, 'color: #000064; font-weight: bold;', 'color: #333;');
        },

        // Success Confirmation Feedback
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
                                <div>WhatsApp conversation opened! You can now chat directly with our counselors at <strong>${CONFIG.phoneFormatted}</strong>.</div>
                            </div>` : ''}
                            <div class="d-flex gap-2">
                                <a href="tel:+919845371459" class="btn btn-outline-primary rounded-pill w-50 py-2 fs-13 fw-bold">
                                    <i class="fa-solid fa-phone me-1"></i> Direct Call
                                </a>
                                <a href="${this.getWhatsAppUrl(lead)}" target="_blank" class="btn btn-success rounded-pill w-50 py-2 fs-13 fw-bold">
                                    <i class="fa-brands fa-whatsapp me-1"></i> Chat on WhatsApp
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

        // Render Admin Leads Management Table in Admin Dashboard
        renderAdminTable: function (filterStatus) {
            const tableBody = document.getElementById('adminLeadsTableBody');
            if (!tableBody) return;

            let leads = this.getLeads();
            if (filterStatus && filterStatus !== 'All') {
                leads = leads.filter(l => l.status === filterStatus);
            }

            if (leads.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center py-5 text-muted">
                            <i class="fa-solid fa-inbox fs-1 d-block mb-2 opacity-50"></i>
                            <h6 class="fw-bold mb-1">No Leads Found</h6>
                            <p class="fs-13 mb-0">Student inquiries from consultation and contact forms will appear here in real time.</p>
                        </td>
                    </tr>`;
                return;
            }

            tableBody.innerHTML = leads.map((lead, idx) => {
                const statusBadge = {
                    'New': 'bg-danger text-white',
                    'In Review': 'bg-warning text-dark',
                    'Contacted': 'bg-info text-dark',
                    'Converted': 'bg-success text-white'
                }[lead.status] || 'bg-secondary text-white';

                const waBtn = `https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '') || CONFIG.whatsappInternational}?text=${encodeURIComponent(`Hello ${lead.name}, this is The Edu Consultants following up regarding your study abroad inquiry for ${lead.destination}.`)}`;

                return `
                <tr class="align-middle">
                    <td class="text-nowrap fs-12 text-muted fw-semibold">
                        <div>${lead.dateFormatted || lead.createdAt.slice(0, 10)}</div>
                        <span class="badge bg-light text-dark border fs-11">${lead.id}</span>
                    </td>
                    <td>
                        <div class="fw-bold text-dark fs-14">${lead.name}</div>
                        <div class="fs-12 text-muted text-truncate" style="max-width: 200px;">${lead.message || 'No query note'}</div>
                    </td>
                    <td>
                        <div class="fs-13">
                            <a href="tel:${(lead.phone || '').replace(/[^0-9+]/g, '')}" class="text-primary text-decoration-none fw-bold">
                                <i class="fa-solid fa-phone me-1 fs-11"></i> ${lead.phone || 'N/A'}
                            </a>
                        </div>
                        <div class="fs-12 text-muted">
                            <a href="mailto:${lead.email}" class="text-muted text-decoration-none">
                                <i class="fa-solid fa-envelope me-1 fs-11"></i> ${lead.email || 'N/A'}
                            </a>
                        </div>
                    </td>
                    <td>
                        <span class="badge bg-primary-subtle text-primary border border-primary-subtle fs-12 fw-semibold px-2.5 py-1 rounded-pill">
                            ${lead.source || 'Website Form'}
                        </span>
                        <div class="fs-12 text-muted mt-1 fw-bold">${lead.destination || 'General'}</div>
                    </td>
                    <td class="text-center">
                        ${lead.whatsappOptIn ? `
                            <span class="badge bg-success text-white px-2.5 py-1 rounded-pill fs-11 fw-bold" title="Forwarded to WhatsApp (+91 9845371459)">
                                <i class="fa-brands fa-whatsapp me-1"></i> Opted In
                            </span>
                        ` : `
                            <span class="badge bg-light text-muted border px-2 py-1 rounded-pill fs-11">
                                Call / Email
                            </span>
                        `}
                    </td>
                    <td>
                        <select class="form-select form-select-sm rounded-pill fs-12 fw-bold ${statusBadge}" 
                                onchange="window.EduLeads.updateLeadStatus('${lead.id}', this.value); window.EduLeads.renderAdminTable();"
                                style="width: 120px; border: none; cursor: pointer;">
                            <option value="New" ${lead.status === 'New' ? 'selected' : ''}>🔴 New</option>
                            <option value="In Review" ${lead.status === 'In Review' ? 'selected' : ''}>🟡 In Review</option>
                            <option value="Contacted" ${lead.status === 'Contacted' ? 'selected' : ''}>🔵 Contacted</option>
                            <option value="Converted" ${lead.status === 'Converted' ? 'selected' : ''}>🟢 Converted</option>
                        </select>
                    </td>
                    <td class="text-nowrap text-end">
                        <div class="btn-group btn-group-sm">
                            <a href="${waBtn}" target="_blank" class="btn btn-outline-success" title="Chat with Lead on WhatsApp">
                                <i class="fa-brands fa-whatsapp"></i>
                            </a>
                            <a href="tel:${(lead.phone || '').replace(/[^0-9+]/g, '')}" class="btn btn-outline-primary" title="Call Lead Directly">
                                <i class="fa-solid fa-phone"></i>
                            </a>
                            <a href="mailto:${lead.email}?subject=The%20Edu%20Consultants%20Admissions%20Follow-up" class="btn btn-outline-secondary" title="Email Lead">
                                <i class="fa-solid fa-envelope"></i>
                            </a>
                            <button type="button" class="btn btn-outline-danger" onclick="if(confirm('Delete lead for ${lead.name}?')) { window.EduLeads.deleteLead('${lead.id}'); window.EduLeads.renderAdminTable(); }" title="Delete Lead">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </td>
                </tr>`;
            }).join('');

            this.updateBadge();
        },

        // Update counters on Admin Dashboard
        updateBadge: function () {
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
        },

        // Inject Floating Dual Connect Widget (Direct Call vs WhatsApp)
        injectConnectWidget: function () {
            if (document.getElementById('eduConnectFloat')) return;
            // Don't inject on admin dashboard or login page
            if (window.location.pathname.includes('admin') || window.location.pathname.includes('login') || window.location.pathname.includes('signup')) {
                return;
            }

            const widgetHtml = `
            <!-- Floating Dual Connect Widget (Call vs WhatsApp) -->
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
                                    <h6 class="fw-bold mb-0 text-white fs-14">The Edu Consultants</h6>
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
                        
                        <!-- Option 1: Direct Call -->
                        <a href="tel:+919845371459" class="edu-connect-option-item call-action">
                            <div class="option-icon-box bg-primary text-white">
                                <i class="fa-solid fa-phone"></i>
                            </div>
                            <div class="option-content">
                                <div class="option-title">Direct Phone Call</div>
                                <div class="option-subtitle">+91 9845371459</div>
                                <div class="option-tag"><i class="fa-solid fa-clock me-1"></i> Speak Now • Mon-Sat 9AM-8PM</div>
                            </div>
                            <i class="fa-solid fa-arrow-right option-arrow"></i>
                        </a>

                        <!-- Option 2: WhatsApp Chat -->
                        <a href="https://wa.me/919845371459?text=Hello%20The%20Edu%20Consultants!%20I%20would%20like%20to%20speak%20with%20a%20study%20abroad%20advising%20expert." target="_blank" rel="noopener noreferrer" class="edu-connect-option-item wa-action">
                            <div class="option-icon-box bg-success text-white">
                                <i class="fa-brands fa-whatsapp"></i>
                            </div>
                            <div class="option-content">
                                <div class="option-title">Chat on WhatsApp</div>
                                <div class="option-subtitle">+91 9845371459</div>
                                <div class="option-tag text-success"><i class="fa-solid fa-bolt me-1"></i> Instant Response • 24/7 Chat</div>
                            </div>
                            <i class="fa-solid fa-arrow-right option-arrow"></i>
                        </a>

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

            // Bind toggle
            const toggleBtn = document.getElementById('toggleConnectCardBtn');
            const closeBtn = document.getElementById('closeConnectCardBtn');
            const card = document.getElementById('eduConnectCard');

            if (toggleBtn && card) {
                toggleBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    card.classList.toggle('active');
                });
            }
            if (closeBtn && card) {
                closeBtn.addEventListener('click', () => {
                    card.classList.remove('active');
                });
            }
            document.addEventListener('click', (e) => {
                if (card && !card.contains(e.target) && e.target !== toggleBtn) {
                    card.classList.remove('active');
                }
            });
        },

        // Initialize on page load
        init: function () {
            this.injectConnectWidget();
            this.updateBadge();

            // If on Admin Dashboard, render table
            if (document.getElementById('adminLeadsTableBody')) {
                this.renderAdminTable();
            }
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
