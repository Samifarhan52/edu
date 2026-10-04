/**
 * ElevateX - Official Developer Signature & Digital Engineering Modal
 * Powers:
 * 1. Global "Developer: ElevateX" interactive footer trigger
 * 2. Enterprise Developer Showcase & Direct Client Ingestion Modal
 * 3. Inquiry handling for Custom Websites, Mobile Applications & Platform Management
 * 4. Direct WhatsApp, Voice Call & Lead Routing to Faraz (+91 9845371459)
 */

(function (window, document) {
    'use strict';

    const ELEVATEX_CONFIG = {
        name: 'ElevateX',
        tagline: 'Digital Product Engineering & Cloud Architecture',
        phone: '9845371459',
        phoneFormatted: '+91 9845371459',
        whatsappInternational: '919845371459',
        email: 'adm.faraz@gmail.com',
        services: [
            { icon: 'fa-globe', title: 'High-Performance Websites', desc: 'Custom responsive web portals, high-speed landing pages, Next.js, and headless CMS architectures.' },
            { icon: 'fa-mobile-screen-button', title: 'Mobile & Custom Apps', desc: 'Cross-platform iOS & Android mobile apps, robust web applications, and intuitive student/client portals.' },
            { icon: 'fa-server', title: 'Platform Management & Cloud', desc: '24/7 security hardening, database management, cloud hosting optimization, and SEO performance.' }
        ]
    };

    const EduElevateX = {
        config: ELEVATEX_CONFIG,

        openModal: function () {
            let modal = document.getElementById('elevatexDevModal');
            if (!modal) {
                this.renderModal();
                modal = document.getElementById('elevatexDevModal');
            }
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        },

        closeModal: function () {
            const modal = document.getElementById('elevatexDevModal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        },

        renderModal: function () {
            let existing = document.getElementById('elevatexDevModal');
            if (existing) existing.remove();

            const modalHtml = `
            <div id="elevatexDevModal" class="elevatex-modal-backdrop" onclick="if(event.target === this) window.EduElevateX.closeModal();">
                <div class="elevatex-modal-card" role="dialog" aria-modal="true" aria-labelledby="elevatexTitle">
                    <!-- Tech Header Bar -->
                    <div class="elevatex-card-header">
                        <div class="d-flex align-items-center gap-3">
                            <div class="elevatex-logo-badge">
                                <span class="elevatex-x-symbol">EX</span>
                            </div>
                            <div>
                                <div class="d-flex align-items-center gap-2">
                                    <h4 class="fw-bold mb-0 text-white" id="elevatexTitle">ElevateX</h4>
                                    <span class="elevatex-verified-pill"><i class="fa-solid fa-circle-check"></i> Official Developer</span>
                                </div>
                                <span class="elevatex-header-tagline">Architecting High-Speed Websites, Apps & Software Platforms</span>
                            </div>
                        </div>
                        <button type="button" class="elevatex-close-btn" onclick="window.EduElevateX.closeModal();" aria-label="Close Modal">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <!-- Modal Body Container -->
                    <div class="elevatex-card-body">
                        <!-- Pitch & Overview -->
                        <div class="elevatex-intro-box">
                            <p class="mb-0 fs-14 text-slate-300">
                                Looking to build a world-class website, custom mobile app, or need comprehensive technical management like <strong>The Edu Consultant</strong>? ElevateX builds reliable, lightning-fast digital solutions tailored for your business.
                            </p>
                        </div>

                        <!-- Core Capabilities -->
                        <div class="row g-2 mb-4">
                            <div class="col-md-4 col-12">
                                <div class="elevatex-capability-pill">
                                    <i class="fa-solid fa-globe text-cyan"></i>
                                    <div>
                                        <div class="fw-bold text-white fs-13">Custom Websites</div>
                                        <div class="fs-11 text-slate-400">High-speed, SEO-first & Responsive</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-12">
                                <div class="elevatex-capability-pill">
                                    <i class="fa-solid fa-mobile-screen-button text-warning"></i>
                                    <div>
                                        <div class="fw-bold text-white fs-13">Mobile & Web Apps</div>
                                        <div class="fs-11 text-slate-400">iOS, Android, SaaS & Portals</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-12">
                                <div class="elevatex-capability-pill">
                                    <i class="fa-solid fa-shield-halved text-emerald"></i>
                                    <div>
                                        <div class="fw-bold text-white fs-13">Platform Managing</div>
                                        <div class="fs-11 text-slate-400">Hosting, 24/7 Security & Maintenance</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Action Contacts -->
                        <div class="elevatex-quick-actions mb-4">
                            <a href="https://wa.me/${ELEVATEX_CONFIG.whatsappInternational}?text=${encodeURIComponent('Hello ElevateX! I saw your work on The Edu Consultant website. I would like to discuss building a website / application / system management.')}" 
                               target="_blank" rel="noopener noreferrer" class="btn-elevatex-contact wa-glow">
                                <i class="fa-brands fa-whatsapp fs-5"></i>
                                <div class="text-start">
                                    <span class="d-block fs-11 text-uppercase tracking-wider">Instant Chat</span>
                                    <span class="d-block fw-bold fs-13">WhatsApp Direct</span>
                                </div>
                            </a>
                            <a href="tel:+91${ELEVATEX_CONFIG.phone}" class="btn-elevatex-contact call-glow">
                                <i class="fa-solid fa-phone fs-5"></i>
                                <div class="text-start">
                                    <span class="d-block fs-11 text-uppercase tracking-wider">Direct Hotline</span>
                                    <span class="d-block fw-bold fs-13">+91 9845371459</span>
                                </div>
                            </a>
                            <a href="mailto:${ELEVATEX_CONFIG.email}?subject=Project%20Inquiry%20via%20ElevateX" class="btn-elevatex-contact mail-glow">
                                <i class="fa-solid fa-envelope fs-5"></i>
                                <div class="text-start">
                                    <span class="d-block fs-11 text-uppercase tracking-wider">Direct Email</span>
                                    <span class="d-block fw-bold fs-13">${ELEVATEX_CONFIG.email}</span>
                                </div>
                            </a>
                        </div>

                        <!-- Instant Project Inquiry Form -->
                        <div class="elevatex-form-wrapper">
                            <h6 class="fw-bold text-white mb-2 fs-14 d-flex align-items-center gap-2">
                                <i class="fa-solid fa-paper-plane text-cyan"></i>
                                <span>Request a Quote or Consultation with the Developer</span>
                            </h6>
                            <form id="elevatexInquiryForm" onsubmit="window.EduElevateX.handleInquirySubmit(event); return false;">
                                <div class="row g-2 mb-2">
                                    <div class="col-md-6">
                                        <input type="text" id="exClientName" class="form-control elevatex-input" placeholder="Your Name or Business *" required/>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="tel" id="exClientPhone" class="form-control elevatex-input" placeholder="WhatsApp / Phone Number *" required/>
                                    </div>
                                </div>
                                <div class="row g-2 mb-2">
                                    <div class="col-md-6">
                                        <input type="email" id="exClientEmail" class="form-control elevatex-input" placeholder="Email Address (Optional)"/>
                                    </div>
                                    <div class="col-md-6">
                                        <select id="exProjectType" class="form-select elevatex-input" required>
                                            <option value="" disabled selected>Select Requirement *</option>
                                            <option value="New Website Development">New Website Development</option>
                                            <option value="Mobile App (iOS / Android)">Mobile App (iOS / Android)</option>
                                            <option value="Web Application & Portal">Web Application & Portal</option>
                                            <option value="Website Redesign & Speed Optimization">Website Redesign & Speed</option>
                                            <option value="Platform Management & Maintenance">Platform Management & Maintenance</option>
                                            <option value="Custom Software / Other">Custom Software / Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <textarea id="exProjectNotes" class="form-control elevatex-input" rows="2" placeholder="Briefly describe your project or feature requirements..."></textarea>
                                </div>
                                <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                    <div class="fs-12 text-slate-400">
                                        <i class="fa-solid fa-lock me-1 text-emerald"></i> Confidential • Direct response from Faraz Ahamed
                                    </div>
                                    <button type="submit" id="btnSubmitElevateX" class="btn-elevatex-submit">
                                        <span>Submit to Developer</span>
                                        <i class="fa-solid fa-arrow-right ms-2"></i>
                                    </button>
                                </div>
                            </form>
                            <div id="elevatexSuccessFeedback" class="d-none mt-3 p-3 rounded-3 bg-emerald-900 border border-emerald-500 text-emerald-100 fs-13">
                                <div class="d-flex align-items-center gap-2 mb-1">
                                    <i class="fa-solid fa-circle-check fs-5 text-emerald-400"></i>
                                    <strong>Inquiry Received by ElevateX!</strong>
                                </div>
                                <span>Thank you! Your requirements have been routed directly to the development lead. We will reach out to your WhatsApp/Phone shortly.</span>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Note -->
                    <div class="elevatex-card-footer">
                        <span class="fs-11 text-slate-400">
                            © 2026 ElevateX Digital Systems. Crafted for high-growth enterprises worldwide.
                        </span>
                        <a href="https://wa.me/${ELEVATEX_CONFIG.whatsappInternational}" target="_blank" class="fs-12 text-cyan fw-semibold text-decoration-none">
                            Chat with Founder <i class="fa-solid fa-arrow-up-right-from-square ms-1"></i>
                        </a>
                    </div>
                </div>
            </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);
        },

        handleInquirySubmit: function (e) {
            e.preventDefault();
            const nameEl = document.getElementById('exClientName');
            const phoneEl = document.getElementById('exClientPhone');
            const emailEl = document.getElementById('exClientEmail');
            const typeEl = document.getElementById('exProjectType');
            const notesEl = document.getElementById('exProjectNotes');
            const btn = document.getElementById('btnSubmitElevateX');
            const feedback = document.getElementById('elevatexSuccessFeedback');

            const name = nameEl ? nameEl.value.trim() : '';
            const phone = phoneEl ? phoneEl.value.trim() : '';
            const email = emailEl ? emailEl.value.trim() : '';
            const type = typeEl ? typeEl.value : 'General Development';
            const notes = notesEl ? notesEl.value.trim() : '';

            if (!name || !phone) {
                alert('Please provide your name and contact phone number.');
                return;
            }

            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Forwarding...';
            }

            const leadRecord = {
                name: name,
                phone: phone,
                email: email || 'Not provided',
                source: 'ElevateX Developer Signature Ingestion',
                destination: `Service: ${type}`,
                message: `ElevateX Project Inquiry for [${type}]. Notes: ${notes || 'No notes provided'}`,
                whatsappOptIn: true
            };

            // 1. Save in leads pipeline if EduLeads is available
            if (window.EduLeads && typeof window.EduLeads.saveLead === 'function') {
                window.EduLeads.saveLead(leadRecord);
            }

            // 2. Dispatch to Hostinger PHP backend if available
            try {
                if (typeof fetch === 'function') {
                    fetch('api/lead-handler.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(Object.assign({ type: 'elevatex_lead' }, leadRecord))
                    }).catch(function () {});
                }
            } catch (err) {}

            // 3. Open pre-formatted WhatsApp chat to developer
            const waMsg = [
                `⚡ *NEW ELEVATEX INQUIRY*`,
                `---------------------------------`,
                `👤 *Client / Business:* ${name}`,
                `📞 *Phone / WhatsApp:* ${phone}`,
                `✉️ *Email:* ${email || 'N/A'}`,
                `🎯 *Project Category:* ${type}`,
                `📝 *Details:* ${notes || 'Looking for development / application / management quote.'}`,
                `---------------------------------`,
                `_Sent via The Edu Consultant Developer Signature_`
            ].join('\n');

            const waUrl = `https://wa.me/${ELEVATEX_CONFIG.whatsappInternational}?text=${encodeURIComponent(waMsg)}`;
            try {
                window.open(waUrl, '_blank');
            } catch (openErr) {}

            // 4. Show success in modal
            if (feedback) feedback.classList.remove('d-none');
            const form = document.getElementById('elevatexInquiryForm');
            if (form) form.classList.add('d-none');
        }
    };

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            EduElevateX.closeModal();
        }
    });

    window.EduElevateX = EduElevateX;

})(window, document);
