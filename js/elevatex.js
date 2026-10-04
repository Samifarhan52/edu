/**
 * ElevateX - Official Developer Signature & Digital Engineering Modal
 * Powers:
 * 1. Global "Developer: ElevateX" interactive footer trigger (Light-mode executive styling)
 * 2. Enterprise Developer Showcase & Direct Client Ingestion Modal
 * 3. Direct WhatsApp routing to Farhan (+91 7676808068)
 * 4. Official Agency Portal integration (elevatex.com) & Post-Submission Visit Site Pop-up
 */

(function (window, document) {
    'use strict';

    const ELEVATEX_CONFIG = {
        name: 'ElevateX',
        tagline: 'Architecting High-Speed Websites, Apps & Software Platforms',
        leadName: 'Farhan',
        phone: '7676808068',
        phoneFormatted: '+91 7676808068',
        whatsappInternational: '917676808068',
        website: 'https://elevatex.com',
        websiteDisplay: 'elevatex.com',
        email: 'contact@elevatex.com',
        services: [
            { icon: 'fa-globe', title: 'Custom Websites', desc: 'High-speed, SEO-first & Responsive' },
            { icon: 'fa-mobile-screen-button', title: 'Mobile & Web Apps', desc: 'iOS, Android, SaaS & Portals' },
            { icon: 'fa-shield-halved', title: 'Platform Managing', desc: 'Hosting, 24/7 Security & Maintenance' }
        ]
    };

    // Inject self-contained, cache-immune styles directly to ensure instant executive rendering
    function injectElevateXStyles() {
        if (document.getElementById('elevatexCoreStyles')) return;
        const style = document.createElement('style');
        style.id = 'elevatexCoreStyles';
        style.textContent = `
            /* ==========================================================================
               ELEVATEX DEVELOPER BUTTON (Ultra-Clean Executive White Footer Match)
               ========================================================================== */
            .btn-elevatex-developer {
                display: inline-flex !important;
                align-items: center !important;
                gap: 8px !important;
                padding: 7px 18px !important;
                border-radius: 50px !important;
                background: #ffffff !important;
                border: 1.5px solid #e2e8f0 !important;
                color: #1e293b !important;
                font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                font-size: 12px !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
                box-shadow: 0 2px 8px rgba(0, 0, 100, 0.04) !important;
                outline: none !important;
                text-decoration: none !important;
                line-height: 1 !important;
            }

            .btn-elevatex-developer:hover {
                background: #f8fafc !important;
                border-color: #000064 !important;
                box-shadow: 0 4px 18px rgba(0, 0, 100, 0.12) !important;
                transform: translateY(-2px) !important;
            }

            .elevatex-pulse-indicator {
                width: 8px !important;
                height: 8px !important;
                border-radius: 50% !important;
                background: #10b981 !important;
                box-shadow: 0 0 8px rgba(16, 185, 129, 0.6) !important;
                display: inline-block !important;
                animation: elevatexPulseDot 2s infinite ease-in-out !important;
            }

            .elevatex-dev-label {
                color: #64748b !important;
                font-weight: 600 !important;
                font-size: 11px !important;
                text-transform: uppercase !important;
                letter-spacing: 0.6px !important;
            }

            .elevatex-brand-title {
                color: #000064 !important;
                font-weight: 800 !important;
                font-size: 13px !important;
                letter-spacing: 0.3px !important;
                transition: color 0.2s ease !important;
            }

            .btn-elevatex-developer:hover .elevatex-brand-title {
                color: #2563eb !important;
            }

            .elevatex-dev-arrow {
                color: #2563eb !important;
                font-size: 11px !important;
                display: inline-flex !important;
                align-items: center !important;
                transition: transform 0.2s ease !important;
            }

            .btn-elevatex-developer:hover .elevatex-dev-arrow {
                transform: translate(2px, -2px) !important;
                color: #1d4ed8 !important;
            }

            @keyframes elevatexPulseDot {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.35); opacity: 0.55; }
            }

            /* ==========================================================================
               ELEVATEX MODAL & SHOWCASE
               ========================================================================== */
            .elevatex-modal-backdrop {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                background: rgba(3, 7, 18, 0.82) !important;
                backdrop-filter: blur(12px) !important;
                -webkit-backdrop-filter: blur(12px) !important;
                z-index: 2147483646 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 16px !important;
                opacity: 0 !important;
                pointer-events: none !important;
                transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
                box-sizing: border-box !important;
                font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            }

            .elevatex-modal-backdrop.active {
                opacity: 1 !important;
                pointer-events: auto !important;
            }

            .elevatex-modal-card {
                background: #0b1120 !important;
                border: 1px solid rgba(255, 255, 255, 0.14) !important;
                border-radius: 22px !important;
                width: 100% !important;
                max-width: 650px !important;
                max-height: 92vh !important;
                overflow-y: auto !important;
                box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(37, 99, 235, 0.25) !important;
                color: #f1f5f9 !important;
                transform: scale(0.95) translateY(12px) !important;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
                position: relative !important;
            }

            .elevatex-modal-backdrop.active .elevatex-modal-card {
                transform: scale(1) translateY(0) !important;
            }

            .elevatex-card-header {
                background: linear-gradient(135deg, #070d19 0%, #0f172a 100%) !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
                padding: 20px 24px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                gap: 12px !important;
            }

            .elevatex-logo-badge {
                width: 44px !important;
                height: 44px !important;
                border-radius: 12px !important;
                background: linear-gradient(135deg, #2563eb, #00f0ff) !important;
                color: #070d19 !important;
                font-weight: 900 !important;
                font-size: 17px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                box-shadow: 0 0 16px rgba(37, 99, 235, 0.5) !important;
                letter-spacing: -0.5px !important;
                flex-shrink: 0 !important;
            }

            .elevatex-verified-pill {
                background: rgba(16, 185, 129, 0.15) !important;
                border: 1px solid rgba(16, 185, 129, 0.35) !important;
                color: #34d399 !important;
                font-size: 11px !important;
                font-weight: 700 !important;
                padding: 3px 9px !important;
                border-radius: 50px !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 5px !important;
            }

            .elevatex-header-site-btn {
                background: rgba(37, 99, 235, 0.16) !important;
                border: 1px solid rgba(59, 130, 246, 0.35) !important;
                color: #60a5fa !important;
                font-size: 11.5px !important;
                font-weight: 700 !important;
                padding: 4px 12px !important;
                border-radius: 50px !important;
                text-decoration: none !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 5px !important;
                transition: all 0.2s ease !important;
            }
            .elevatex-header-site-btn:hover {
                background: #2563eb !important;
                color: #ffffff !important;
                border-color: #3b82f6 !important;
                transform: translateY(-1px) !important;
            }

            .elevatex-header-tagline {
                font-size: 12px !important;
                color: #94a3b8 !important;
                display: block !important;
                margin-top: 2px !important;
            }

            .elevatex-close-btn {
                background: rgba(255, 255, 255, 0.08) !important;
                border: 1px solid rgba(255, 255, 255, 0.14) !important;
                color: #94a3b8 !important;
                width: 34px !important;
                height: 34px !important;
                border-radius: 50% !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                flex-shrink: 0 !important;
            }
            .elevatex-close-btn:hover {
                background: rgba(255, 255, 255, 0.22) !important;
                color: #ffffff !important;
            }

            .elevatex-card-body {
                padding: 24px !important;
            }

            .elevatex-intro-box {
                background: rgba(255, 255, 255, 0.03) !important;
                border-left: 3px solid #2563eb !important;
                border-radius: 8px !important;
                padding: 14px 18px !important;
                margin-bottom: 20px !important;
            }

            .elevatex-capability-pill {
                background: rgba(255, 255, 255, 0.03) !important;
                border: 1px solid rgba(255, 255, 255, 0.08) !important;
                border-radius: 12px !important;
                padding: 12px !important;
                display: flex !important;
                align-items: center !important;
                gap: 12px !important;
                height: 100% !important;
            }

            .elevatex-quick-actions {
                display: grid !important;
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 10px !important;
            }
            @media (max-width: 576px) {
                .elevatex-quick-actions {
                    grid-template-columns: 1fr !important;
                }
            }

            .btn-elevatex-contact {
                display: flex !important;
                align-items: center !important;
                gap: 12px !important;
                padding: 12px 14px !important;
                border-radius: 12px !important;
                text-decoration: none !important;
                color: #ffffff !important;
                transition: all 0.2s ease !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
            }
            .btn-elevatex-contact.wa-glow {
                background: rgba(16, 185, 129, 0.1) !important;
                border-color: rgba(16, 185, 129, 0.28) !important;
                color: #34d399 !important;
            }
            .btn-elevatex-contact.wa-glow:hover {
                background: #10b981 !important;
                color: #070d19 !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 4px 18px rgba(16, 185, 129, 0.45) !important;
            }

            .btn-elevatex-contact.call-glow {
                background: rgba(245, 158, 11, 0.1) !important;
                border-color: rgba(245, 158, 11, 0.28) !important;
                color: #fbbf24 !important;
            }
            .btn-elevatex-contact.call-glow:hover {
                background: #f59e0b !important;
                color: #070d19 !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 4px 18px rgba(245, 158, 11, 0.45) !important;
            }

            .btn-elevatex-contact.web-glow {
                background: rgba(37, 99, 235, 0.1) !important;
                border-color: rgba(37, 99, 235, 0.3) !important;
                color: #60a5fa !important;
            }
            .btn-elevatex-contact.web-glow:hover {
                background: #2563eb !important;
                color: #ffffff !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 4px 18px rgba(37, 99, 235, 0.45) !important;
            }

            /* Form Area */
            .elevatex-form-wrapper {
                background: rgba(255, 255, 255, 0.02) !important;
                border: 1px solid rgba(255, 255, 255, 0.09) !important;
                border-radius: 16px !important;
                padding: 20px !important;
            }

            .elevatex-site-banner {
                background: rgba(37, 99, 235, 0.1) !important;
                border: 1px solid rgba(59, 130, 246, 0.25) !important;
                border-radius: 10px !important;
                padding: 9px 14px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                margin-bottom: 14px !important;
                font-size: 12.5px !important;
                color: #93c5fd !important;
            }
            .elevatex-site-banner a {
                color: #38bdf8 !important;
                font-weight: 700 !important;
                text-decoration: none !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 5px !important;
            }
            .elevatex-site-banner a:hover {
                text-decoration: underline !important;
            }

            .elevatex-input {
                background: rgba(15, 23, 42, 0.85) !important;
                border: 1px solid rgba(255, 255, 255, 0.15) !important;
                color: #ffffff !important;
                font-size: 13.5px !important;
                border-radius: 10px !important;
                padding: 10px 14px !important;
            }
            .elevatex-input:focus {
                border-color: #2563eb !important;
                box-shadow: 0 0 12px rgba(37, 99, 235, 0.35) !important;
                background: rgba(15, 23, 42, 0.95) !important;
            }
            .elevatex-input::placeholder {
                color: #64748b !important;
            }

            .btn-elevatex-submit {
                background: linear-gradient(135deg, #2563eb 0%, #00f0ff 100%) !important;
                color: #070d19 !important;
                font-weight: 800 !important;
                font-size: 13.5px !important;
                border: none !important;
                border-radius: 50px !important;
                padding: 10px 24px !important;
                cursor: pointer !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 8px !important;
                transition: all 0.25s ease !important;
            }
            .btn-elevatex-submit:hover {
                box-shadow: 0 0 22px rgba(0, 240, 255, 0.55) !important;
                transform: translateY(-2px) !important;
            }

            .elevatex-card-footer {
                background: #070d19 !important;
                border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
                padding: 14px 24px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                flex-wrap: wrap !important;
                gap: 8px !important;
            }

            /* ==========================================================================
               POST-SUBMIT "VISIT SITE ELEVATEX.COM" POPUP OVERLAY
               ========================================================================== */
            .elevatex-submission-dialog {
                background: linear-gradient(145deg, #0f172a 0%, #070d19 100%) !important;
                border: 1px solid rgba(59, 130, 246, 0.35) !important;
                border-radius: 18px !important;
                padding: 28px 24px !important;
                text-align: center !important;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(37, 99, 235, 0.25) !important;
                animation: elevatexDialogEntrance 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
            }

            @keyframes elevatexDialogEntrance {
                0% { transform: scale(0.9); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }

            .elevatex-dialog-icon {
                width: 68px !important;
                height: 68px !important;
                border-radius: 50% !important;
                background: rgba(16, 185, 129, 0.15) !important;
                border: 2px solid #10b981 !important;
                color: #10b981 !important;
                font-size: 32px !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin-bottom: 16px !important;
                box-shadow: 0 0 24px rgba(16, 185, 129, 0.4) !important;
            }

            .elevatex-site-promo-card {
                background: rgba(255, 255, 255, 0.04) !important;
                border: 1px solid rgba(255, 255, 255, 0.12) !important;
                border-radius: 14px !important;
                padding: 16px !important;
                margin: 20px 0 !important;
            }

            .btn-elevatex-visit-site {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 8px !important;
                width: 100% !important;
                background: linear-gradient(135deg, #2563eb, #00f0ff) !important;
                color: #070d19 !important;
                font-weight: 800 !important;
                font-size: 14.5px !important;
                padding: 12px 20px !important;
                border-radius: 50px !important;
                text-decoration: none !important;
                transition: all 0.25s ease !important;
                box-shadow: 0 0 20px rgba(0, 240, 255, 0.45) !important;
                border: none !important;
            }
            .btn-elevatex-visit-site:hover {
                transform: translateY(-2px) !important;
                box-shadow: 0 0 28px rgba(0, 240, 255, 0.7) !important;
                color: #070d19 !important;
            }

            .btn-elevatex-wa-reopen {
                background: rgba(16, 185, 129, 0.15) !important;
                border: 1px solid rgba(16, 185, 129, 0.35) !important;
                color: #34d399 !important;
                border-radius: 50px !important;
                padding: 8px 18px !important;
                font-size: 13px !important;
                font-weight: 700 !important;
                text-decoration: none !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 6px !important;
                transition: all 0.2s ease !important;
            }
            .btn-elevatex-wa-reopen:hover {
                background: #10b981 !important;
                color: #070d19 !important;
            }

            .btn-elevatex-modal-close {
                background: rgba(255, 255, 255, 0.08) !important;
                border: 1px solid rgba(255, 255, 255, 0.14) !important;
                color: #cbd5e1 !important;
                border-radius: 50px !important;
                padding: 8px 20px !important;
                font-size: 13px !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
            }
            .btn-elevatex-modal-close:hover {
                background: rgba(255, 255, 255, 0.2) !important;
                color: #ffffff !important;
            }
        `;
        document.head.appendChild(style);
    }

    const EduElevateX = {
        config: ELEVATEX_CONFIG,

        init: function () {
            injectElevateXStyles();
        },

        openModal: function () {
            injectElevateXStyles();
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
                                <span>EX</span>
                            </div>
                            <div>
                                <div class="d-flex align-items-center gap-2 flex-wrap">
                                    <h4 class="fw-bold mb-0 text-white" id="elevatexTitle">${ELEVATEX_CONFIG.name}</h4>
                                    <span class="elevatex-verified-pill"><i class="fa-solid fa-circle-check"></i> Official Developer</span>
                                    <a href="${ELEVATEX_CONFIG.website}" target="_blank" rel="noopener noreferrer" class="elevatex-header-site-btn" title="Visit ElevateX Official Website">
                                        <i class="fa-solid fa-globe"></i> ${ELEVATEX_CONFIG.websiteDisplay} <i class="fa-solid fa-arrow-up-right-from-square fs-10"></i>
                                    </a>
                                </div>
                                <span class="elevatex-header-tagline">${ELEVATEX_CONFIG.tagline}</span>
                            </div>
                        </div>
                        <button type="button" class="elevatex-close-btn" onclick="window.EduElevateX.closeModal();" aria-label="Close Modal">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <!-- Modal Body Container -->
                    <div class="elevatex-card-body" id="elevatexModalMainBody">
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
                                    <i class="fa-solid fa-globe text-cyan fs-5"></i>
                                    <div>
                                        <div class="fw-bold text-white fs-13">Custom Websites</div>
                                        <div class="fs-11 text-slate-400">High-speed, SEO-first & Responsive</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-12">
                                <div class="elevatex-capability-pill">
                                    <i class="fa-solid fa-mobile-screen-button text-warning fs-5"></i>
                                    <div>
                                        <div class="fw-bold text-white fs-13">Mobile & Web Apps</div>
                                        <div class="fs-11 text-slate-400">iOS, Android, SaaS & Portals</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-12">
                                <div class="elevatex-capability-pill">
                                    <i class="fa-solid fa-shield-halved text-emerald fs-5"></i>
                                    <div>
                                        <div class="fw-bold text-white fs-13">Platform Managing</div>
                                        <div class="fs-11 text-slate-400">Hosting, 24/7 Security & Care</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Action Contacts -->
                        <div class="elevatex-quick-actions mb-4">
                            <!-- Action 1: Instant WhatsApp to Farhan -->
                            <a href="https://wa.me/${ELEVATEX_CONFIG.whatsappInternational}?text=${encodeURIComponent('Hello Farhan! I saw ElevateX on The Edu Consultant website. I would like to discuss building a website / mobile app / platform management.')}" 
                               target="_blank" rel="noopener noreferrer" class="btn-elevatex-contact wa-glow" title="Chat directly with Farhan on WhatsApp">
                                <i class="fa-brands fa-whatsapp fs-4"></i>
                                <div class="text-start">
                                    <span class="d-block fs-10 text-uppercase tracking-wider">Instant WhatsApp</span>
                                    <span class="d-block fw-bold fs-13">Chat with Farhan</span>
                                </div>
                            </a>

                            <!-- Action 2: Direct Hotline -->
                            <a href="tel:+91${ELEVATEX_CONFIG.phone}" class="btn-elevatex-contact call-glow" title="Call Direct Hotline">
                                <i class="fa-solid fa-phone fs-5"></i>
                                <div class="text-start">
                                    <span class="d-block fs-10 text-uppercase tracking-wider">Direct Hotline</span>
                                    <span class="d-block fw-bold fs-13">${ELEVATEX_CONFIG.phoneFormatted}</span>
                                </div>
                            </a>

                            <!-- Action 3: Official Agency Website -->
                            <a href="${ELEVATEX_CONFIG.website}" target="_blank" rel="noopener noreferrer" class="btn-elevatex-contact web-glow" title="Visit ElevateX Official Website">
                                <i class="fa-solid fa-arrow-up-right-from-square fs-5"></i>
                                <div class="text-start">
                                    <span class="d-block fs-10 text-uppercase tracking-wider">Official Agency</span>
                                    <span class="d-block fw-bold fs-13">${ELEVATEX_CONFIG.websiteDisplay}</span>
                                </div>
                            </a>
                        </div>

                        <!-- Instant Project Inquiry Form -->
                        <div class="elevatex-form-wrapper" id="elevatexFormContainer">
                            <div class="elevatex-site-banner">
                                <span><i class="fa-solid fa-globe me-1"></i> Official Developer Portal:</span>
                                <a href="${ELEVATEX_CONFIG.website}" target="_blank" rel="noopener noreferrer">
                                    ${ELEVATEX_CONFIG.websiteDisplay} <i class="fa-solid fa-arrow-up-right-from-square fs-11"></i>
                                </a>
                            </div>

                            <h6 class="fw-bold text-white mb-2 fs-14 d-flex align-items-center gap-2">
                                <i class="fa-solid fa-paper-plane text-cyan"></i>
                                <span>Request a Quote or Consultation with Farhan</span>
                            </h6>
                            <p class="text-slate-400 fs-12 mb-3">
                                Fill out your project requirements below. On submit, this will connect directly to Farhan's WhatsApp for an immediate quote and timeline.
                            </p>

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
                                        <i class="fa-solid fa-lock me-1 text-emerald"></i> Confidential • Direct response from Farhan
                                    </div>
                                    <button type="submit" id="btnSubmitElevateX" class="btn-elevatex-submit">
                                        <span>Submit to Developer</span>
                                        <i class="fa-brands fa-whatsapp fs-5"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- Footer Note -->
                    <div class="elevatex-card-footer">
                        <span class="fs-11 text-slate-400">
                            © 2026 ElevateX Digital Systems. Crafted for high-growth enterprises worldwide.
                        </span>
                        <a href="${ELEVATEX_CONFIG.website}" target="_blank" rel="noopener noreferrer" class="fs-12 text-cyan fw-semibold text-decoration-none">
                            Visit ${ELEVATEX_CONFIG.websiteDisplay} <i class="fa-solid fa-arrow-up-right-from-square ms-1"></i>
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
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Connecting to WhatsApp...';
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

            // 1. Save lead in local pipeline if available
            try {
                if (window.EduLeads && typeof window.EduLeads.saveLead === 'function') {
                    window.EduLeads.saveLead(leadRecord);
                }
            } catch (err) {}

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

            // 3. Construct WhatsApp Message to Farhan (7676808068)
            const waMsg = [
                `🚀 *NEW PROJECT INQUIRY | ELEVATEX*`,
                `━━━━━━━━━━━━━━━━━━━━━━━━━`,
                `👤 *Client / Name:* ${name}`,
                `📱 *WhatsApp / Phone:* ${phone}`,
                `✉️ *Email:* ${email || 'Not provided'}`,
                `🎯 *Requirement:* ${type}`,
                `📝 *Project Scope:* ${notes || 'Looking for website / application / platform management quote.'}`,
                `━━━━━━━━━━━━━━━━━━━━━━━━━`,
                `🌐 *Source:* The Edu Consultant (Official Site)`
            ].join('\n');

            const waUrl = `https://wa.me/${ELEVATEX_CONFIG.whatsappInternational}?text=${encodeURIComponent(waMsg)}`;

            // 4. Open WhatsApp directly to Farhan
            try {
                window.open(waUrl, '_blank');
            } catch (openErr) {
                window.location.href = waUrl;
            }

            // 5. Display Dedicated "Visit Site ElevateX.com" Completion Pop-up Dialog
            const container = document.getElementById('elevatexFormContainer');
            if (container) {
                container.innerHTML = `
                    <div class="elevatex-submission-dialog">
                        <div class="elevatex-dialog-icon">
                            <i class="fa-brands fa-whatsapp"></i>
                        </div>
                        <h4 class="fw-bold text-white mb-2">Inquiry Forwarded to Farhan!</h4>
                        <p class="text-slate-300 fs-13 mb-3">
                            Your project requirements have been prepared and sent directly to Farhan's WhatsApp (<strong>${ELEVATEX_CONFIG.phoneFormatted}</strong>).
                        </p>

                        <!-- High-Visibility ElevateX.com Visit Site Card -->
                        <div class="elevatex-site-promo-card">
                            <div class="d-flex align-items-center justify-content-center gap-2 mb-2">
                                <span class="badge bg-primary text-white px-2 py-1 fs-11">Official Agency</span>
                                <strong class="text-white fs-15">ElevateX Digital Systems</strong>
                            </div>
                            <p class="text-slate-400 fs-12 mb-3">
                                Explore our live portfolios, custom apps, platform management and full software architecture services.
                            </p>
                            <a href="${ELEVATEX_CONFIG.website}" target="_blank" rel="noopener noreferrer" class="btn-elevatex-visit-site">
                                <i class="fa-solid fa-globe"></i>
                                <span>Visit ElevateX Official Site (${ELEVATEX_CONFIG.websiteDisplay})</span>
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                        </div>

                        <div class="d-flex align-items-center justify-content-center gap-2 flex-wrap mt-3">
                            <a href="${waUrl}" target="_blank" class="btn-elevatex-wa-reopen">
                                <i class="fa-brands fa-whatsapp"></i> Re-open WhatsApp
                            </a>
                            <button type="button" class="btn-elevatex-modal-close" onclick="window.EduElevateX.closeModal();">
                                Close Window
                            </button>
                        </div>
                    </div>
                `;
            }
        }
    };

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            EduElevateX.closeModal();
        }
    });

    // Auto-inject styles on DOMContentLoaded or immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', EduElevateX.init);
    } else {
        EduElevateX.init();
    }

    window.EduElevateX = EduElevateX;

})(window, document);
