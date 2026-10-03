/**
 * The Edu Consultants - Core Interactive Platform Engine
 * Handles AOS Entry Reveals, Header Offcanvas, Search Filtering, FAQs, and Modals
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Entry Reveal Animations (AOS Style)
    const revealElements = document.querySelectorAll('[data-aos]');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: reveal immediately
        revealElements.forEach(el => el.classList.add('aos-animate'));
    }

    // 2. Sticky Header Elevation
    const header = document.querySelector('.ld-header-section');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('shadow-md');
            }
        }, { passive: true });
    }

    // 3. Search Filter Tab Switching (Hero)
    const tabButtons = document.querySelectorAll('.zTab-one .nav-link');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabButtons.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const targetId = e.currentTarget.getAttribute('data-bs-target') || e.currentTarget.getAttribute('data-target');
            if (targetId) {
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('show', 'active'));
                const targetPane = document.querySelector(targetId);
                if (targetPane) targetPane.classList.add('show', 'active');
            }
        });
    });

    // 4. Interactive Accordion (FAQ & Country Filters)
    const accordionHeaders = document.querySelectorAll('.accordion-header button');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const collapseTarget = header.parentElement.nextElementSibling;
            if (collapseTarget) {
                const isShown = collapseTarget.classList.contains('show');
                // Close siblings in same accordion if data-bs-parent exists
                const parent = collapseTarget.closest('.accordion');
                if (parent) {
                    parent.querySelectorAll('.accordion-collapse').forEach(c => {
                        c.classList.remove('show');
                        c.previousElementSibling?.querySelector('button')?.classList.add('collapsed');
                    });
                }
                if (!isShown) {
                    collapseTarget.classList.add('show');
                    header.classList.remove('collapsed');
                } else {
                    collapseTarget.classList.remove('show');
                    header.classList.add('collapsed');
                }
            }
        });
    });

    // 5. Password Show/Hide Toggle (Login screen)
    const togglePassBtn = document.querySelector('.toggle-password');
    if (togglePassBtn) {
        togglePassBtn.addEventListener('click', () => {
            const passInput = document.querySelector('.passShowHideInput');
            if (passInput) {
                if (passInput.type === 'password') {
                    passInput.type = 'text';
                    togglePassBtn.classList.replace('fa-eye', 'fa-eye-slash');
                } else {
                    passInput.type = 'password';
                    togglePassBtn.classList.replace('fa-eye-slash', 'fa-eye');
                }
            }
        });
    }

    // 6. Preloader removal
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.4s ease';
            setTimeout(() => { preloader.style.display = 'none'; }, 400);
        }, 300);
    }

    // 7. Video Modal Clean Lifecycle Management (Lazy Loaded on Demand)
    const videoModal = document.getElementById('campusVideoModal');
    if (videoModal) {
        const iframe = videoModal.querySelector('iframe');
        const defaultSrc = iframe ? (iframe.getAttribute('data-src') || iframe.getAttribute('src') || '') : '';
        videoModal.addEventListener('hidden.bs.modal', () => {
            if (iframe) iframe.setAttribute('src', '');
        });
        videoModal.addEventListener('show.bs.modal', () => {
            if (iframe && defaultSrc && !iframe.getAttribute('src')) {
                iframe.setAttribute('src', defaultSrc);
            }
        });
    }

    // 8. Deferred Lazy-Loading for Footer Google Maps (Zero initial page load impact)
    const mapFrames = document.querySelectorAll('.footer-map-frame iframe');
    if (mapFrames.length > 0) {
        if ('IntersectionObserver' in window) {
            const mapObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const iframe = entry.target;
                        const dataSrc = iframe.getAttribute('data-src');
                        if (dataSrc && !iframe.getAttribute('src')) {
                            iframe.setAttribute('src', dataSrc);
                        }
                        obs.unobserve(iframe);
                    }
                });
            }, { rootMargin: '300px 0px' });
            mapFrames.forEach(iframe => {
                if (iframe.getAttribute('data-src')) {
                    mapObserver.observe(iframe);
                }
            });
        } else {
            mapFrames.forEach(iframe => {
                const dataSrc = iframe.getAttribute('data-src');
                if (dataSrc) iframe.setAttribute('src', dataSrc);
            });
        }
    }
});

// Demo credential autofill helper on login screen
window.setLoginCredential = function(email, pass) {
    const emailField = document.getElementById('inputPhoneEmail');
    const passField = document.getElementById('inputPassword');
    if (emailField && passField) {
        emailField.value = email;
        passField.value = pass;
    }
};
