/**
 * EduConsultants - Core Application & Interactive Systems
 * Handles forms, modals, search filtering, accordions, counters, and responsive UI
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons if loaded
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Mobile Menu Drawer
    const mobileMenuBtn = document.getElementById('mobileMenuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const closeDrawerBtn = document.getElementById('closeMobileDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');

    function openMobileMenu() {
        if (!mobileDrawer) return;
        mobileDrawer.classList.remove('translate-x-full');
        if (drawerBackdrop) drawerBackdrop.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    function closeMobileMenu() {
        if (!mobileDrawer) return;
        mobileDrawer.classList.add('translate-x-full');
        if (drawerBackdrop) drawerBackdrop.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeMobileMenu);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileMenu);

    // 3. Search Filter Tabs
    const filterTabs = document.querySelectorAll('.hero-filter-tab');
    let currentTab = 'universities';

    filterTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            filterTabs.forEach(t => {
                t.classList.remove('active', 'bg-amber-400', 'text-slate-950');
                t.classList.add('text-slate-300', 'hover:text-white');
            });
            e.currentTarget.classList.add('active', 'bg-amber-400', 'text-slate-950');
            e.currentTarget.classList.remove('text-slate-300');
            currentTab = e.currentTarget.getAttribute('data-tab');

            // Update dynamic input fields based on tab
            updateSearchFormFields(currentTab);
        });
    });

    function updateSearchFormFields(tab) {
        const dynamicSlot = document.getElementById('dynamicFilterSlot');
        if (!dynamicSlot) return;

        if (tab === 'universities') {
            dynamicSlot.innerHTML = `
                <div>
                    <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Select University</label>
                    <select id="filterUniSelect" class="form-input-luxury">
                        <option value="">All Partner Universities</option>
                        <option value="melbourne">University of Melbourne (Australia)</option>
                        <option value="toronto">University of Toronto (Canada)</option>
                        <option value="imperial">Imperial College London (UK)</option>
                        <option value="munich">Technical University of Munich (Germany)</option>
                        <option value="harvard">Harvard University (USA)</option>
                    </select>
                </div>
            `;
        } else if (tab === 'subject') {
            dynamicSlot.innerHTML = `
                <div>
                    <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Study Discipline</label>
                    <select id="filterDisciplineSelect" class="form-input-luxury">
                        <option value="">All Disciplines</option>
                        <option value="cs">Computer Science & AI</option>
                        <option value="business">Business Analytics & MBA</option>
                        <option value="engineering">Mechanical & Aerospace</option>
                        <option value="biomed">Biomedical & Life Sciences</option>
                        <option value="law">International Law & Public Policy</option>
                    </select>
                </div>
            `;
        } else if (tab === 'scholarships') {
            dynamicSlot.innerHTML = `
                <div>
                    <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Funding / Grant Type</label>
                    <select id="filterGrantSelect" class="form-input-luxury">
                        <option value="">All Scholarships (Up to 100%)</option>
                        <option value="merit">Merit-Based Academic Grant</option>
                        <option value="need">Need-Based Global Fellowship</option>
                        <option value="government">Government & Foreign Ministry</option>
                        <option value="deans">Dean's Excellence Waiver</option>
                    </select>
                </div>
            `;
        } else if (tab === 'events') {
            dynamicSlot.innerHTML = `
                <div>
                    <label class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Event Format</label>
                    <select id="filterEventFormat" class="form-input-luxury">
                        <option value="">All Formats (In-Person & Virtual)</option>
                        <option value="inperson">In-Person Exhibition</option>
                        <option value="webinar">Live Interactive Webinar</option>
                        <option value="interview">1-on-1 Visa Mock Workshop</option>
                    </select>
                </div>
            `;
        }
    }

    // 4. Hero Search Submission -> Results Modal
    const heroSearchForm = document.getElementById('heroSearchForm');
    if (heroSearchForm) {
        heroSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const country = document.getElementById('filterCountrySelect')?.value || 'All Countries';
            const studyLevel = document.getElementById('filterLevelSelect')?.value || 'All Degrees';

            openSearchResultsModal(currentTab, country, studyLevel);
        });
    }

    function openSearchResultsModal(tab, country, studyLevel) {
        const modal = document.getElementById('globalModal');
        const modalContent = document.getElementById('globalModalContent');
        if (!modal || !modalContent) return;

        let title = `Matching Programs: ${country.toUpperCase()}`;
        let bodyHtml = `
            <div class="space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                        <span class="text-xs uppercase font-mono tracking-wider text-cyan-400">Database Search Result</span>
                        <h4 class="text-xl font-bold text-white">${country} • ${studyLevel}</h4>
                    </div>
                    <span class="px-3 py-1 bg-amber-400/20 text-amber-400 border border-amber-400/30 rounded-full text-xs font-semibold">
                        Found 24+ Verified Options
                    </span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[55vh] overflow-y-auto pr-2">
                    <div class="glass-card p-4 rounded-xl border border-white/10 hover:border-amber-400/50 transition">
                        <div class="flex items-center gap-3 mb-2">
                            <span class="text-2xl">🏛️</span>
                            <div>
                                <h5 class="font-bold text-white text-base">Top Tier University Placement</h5>
                                <p class="text-xs text-slate-400">${country} • Intake: Fall 2026 & Spring 2027</p>
                            </div>
                        </div>
                        <p class="text-xs text-slate-300 mb-3">Accepting international applications now with accelerated EduConsultants fast-track evaluation and application fee waivers.</p>
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-emerald-400 font-medium">98% Visa Clear Rate</span>
                            <button onclick="window.EduApp.openConsultationModalWithContext('${country}')" class="text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1.5 rounded-lg transition">Apply With Advisor</button>
                        </div>
                    </div>
                    <div class="glass-card p-4 rounded-xl border border-white/10 hover:border-cyan-400/50 transition">
                        <div class="flex items-center gap-3 mb-2">
                            <span class="text-2xl">🎓</span>
                            <div>
                                <h5 class="font-bold text-white text-base">Merit & Diversity Scholarships</h5>
                                <p class="text-xs text-slate-400">Up to $25,000 / Year Tuition Waiver</p>
                            </div>
                        </div>
                        <p class="text-xs text-slate-300 mb-3">Institutional grants available for qualified applicants with GPA 3.0+ or IELTS 6.5+. Dedicated essay polishing included.</p>
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-cyan-400 font-medium">Deadline: Dec 15, 2026</span>
                            <button onclick="window.EduApp.openConsultationModalWithContext('Scholarship for ${country}')" class="text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-3 py-1.5 rounded-lg transition">Check Eligibility</button>
                        </div>
                    </div>
                </div>
                <div class="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span class="text-xs text-slate-400">Need specific university cutoffs and credit transfers?</span>
                    <button onclick="window.EduApp.openConsultationModal()" class="btn-primary-glow text-xs py-2 px-4">
                        Book Diagnostic Counseling
                    </button>
                </div>
            </div>
        `;

        modalContent.innerHTML = bodyHtml;
        modal.classList.remove('hidden');
    }

    // 5. Free Consultation Booking Form Handler
    const consultationForm = document.getElementById('freeConsultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const firstName = document.getElementById('consultFirstName')?.value.trim();
            const lastName = document.getElementById('consultLastName')?.value.trim();
            const email = document.getElementById('consultEmail')?.value.trim();
            const mobile = document.getElementById('consultMobile')?.value.trim();
            const destination = document.getElementById('consultDestination')?.value;
            const method = document.getElementById('consultMethod')?.value;

            if (!firstName || !lastName || !email || !mobile) {
                alert('Please complete all required fields.');
                return;
            }

            // Submit Button Spinner
            const submitBtn = consultationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Booking Your Session...
            `;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                consultationForm.reset();

                // Open Confirmation Celebration Modal
                showBookingSuccessModal(firstName, lastName, email, destination, method);
            }, 900);
        });
    }

    function showBookingSuccessModal(firstName, lastName, email, destination, method) {
        const modal = document.getElementById('globalModal');
        const modalContent = document.getElementById('globalModalContent');
        if (!modal || !modalContent) return;

        modalContent.innerHTML = `
            <div class="text-center py-6 space-y-4">
                <div class="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 rounded-full flex items-center justify-center mx-auto text-3xl">
                    ✓
                </div>
                <div>
                    <span class="text-xs uppercase tracking-widest text-emerald-400 font-mono font-bold">Booking Confirmed</span>
                    <h3 class="text-2xl font-bold text-white mt-1">Thank You, ${firstName} ${lastName}!</h3>
                    <p class="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                        Your free 1-on-1 strategy session with an EduConsultants Senior Admissions Director has been scheduled.
                    </p>
                </div>
                <div class="glass-card p-4 rounded-xl text-left max-w-md mx-auto border border-white/10 space-y-2 text-xs text-slate-300">
                    <div class="flex justify-between">
                        <span class="text-slate-400">Counseling Format:</span>
                        <span class="font-semibold text-white">${method === '1' ? 'In-Person (Headquarters)' : 'Virtual (Interactive Video Stage)'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">Target Region:</span>
                        <span class="font-semibold text-amber-400">${destination || 'Global Multiple Options'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">Confirmation Sent To:</span>
                        <span class="font-semibold text-white">${email}</span>
                    </div>
                </div>
                <div class="pt-4">
                    <button onclick="window.EduApp.closeModal()" class="btn-primary-glow px-6 py-2.5 text-xs font-bold">
                        Return to Exploration
                    </button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
    }

    // 6. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-accordion-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close others
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 7. Video Showcase Modal
    const playVideoBtn = document.getElementById('playShowcaseVideo');
    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', () => {
            const modal = document.getElementById('globalModal');
            const modalContent = document.getElementById('globalModalContent');
            if (!modal || !modalContent) return;

            modalContent.innerHTML = `
                <div class="space-y-4">
                    <div class="flex items-center justify-between pb-2 border-b border-white/10">
                        <h4 class="text-lg font-bold text-white">EduConsultants — Student Journey Documentary</h4>
                        <span class="text-xs text-amber-400 font-mono">HD 1080P</span>
                    </div>
                    <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center">
                        <iframe class="w-full h-full" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0" title="EduConsultants Overview" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <p class="text-xs text-slate-400 text-center">
                        Discover how our five-step milestone journey empowers students worldwide to secure top offers and navigate visa clearance with complete confidence.
                    </p>
                </div>
            `;
            modal.classList.remove('hidden');
        });
    }

    // 8. Global Modal Close Buttons
    const modal = document.getElementById('globalModal');
    const closeGlobalModalBtn = document.getElementById('closeGlobalModal');
    if (closeGlobalModalBtn && modal) {
        closeGlobalModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // Close on clicking backdrop
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    // 9. Animated Counter on Viewport Intersection
    const counterElements = document.querySelectorAll('.stat-counter-number');
    let countersStarted = false;

    function runCounters() {
        if (countersStarted) return;
        countersStarted = true;

        counterElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const duration = 1600;
            const start = 0;
            const stepTime = 25;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current).toLocaleString();
                }
            }, stepTime);
        });
    }

    const statsSection = document.getElementById('statsSection');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                runCounters();
            }
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }
});

// Window helper functions for inline card clicks
window.EduApp = {
    closeModal: function () {
        const modal = document.getElementById('globalModal');
        if (modal) modal.classList.add('hidden');
    },

    openConsultationModal: function () {
        const consultSection = document.getElementById('freeConsultation');
        if (consultSection) {
            consultSection.scrollIntoView({ behavior: 'smooth' });
        }
    },

    openConsultationModalWithContext: function (topic) {
        window.EduApp.closeModal();
        const consultSection = document.getElementById('freeConsultation');
        if (consultSection) {
            consultSection.scrollIntoView({ behavior: 'smooth' });
            const noteInput = document.getElementById('consultFirstName');
            if (noteInput) {
                noteInput.focus();
            }
        }
    },

    openDestinationDetails: function (destId) {
        const dest = (window.EduData?.destinations || []).find(d => d.id === destId);
        if (!dest) return;

        const modal = document.getElementById('globalModal');
        const modalContent = document.getElementById('globalModalContent');
        if (!modal || !modalContent) return;

        modalContent.innerHTML = `
            <div class="space-y-4">
                <div class="relative h-48 rounded-xl overflow-hidden">
                    <img src="${dest.image}" alt="${dest.name}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                            <span class="text-2xl">${dest.flag}</span>
                            <h3 class="text-2xl font-bold text-white">${dest.name}</h3>
                            <p class="text-xs text-amber-300 font-medium">${dest.tagline}</p>
                        </div>
                    </div>
                </div>
                <p class="text-sm text-slate-300">${dest.desc}</p>
                <div class="grid grid-cols-2 gap-3 text-xs">
                    <div class="glass-card p-3 rounded-lg border border-white/10">
                        <span class="text-slate-400 block mb-1">Average Tuition</span>
                        <span class="font-bold text-amber-400">${dest.avgTuition}</span>
                    </div>
                    <div class="glass-card p-3 rounded-lg border border-white/10">
                        <span class="text-slate-400 block mb-1">Stay-Back Work Rights</span>
                        <span class="font-bold text-emerald-400">${dest.stayBack}</span>
                    </div>
                </div>
                <div>
                    <h5 class="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">Top Institutions</h5>
                    <div class="flex flex-wrap gap-2">
                        ${dest.topUniversities.map(u => `<span class="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-200">${u}</span>`).join('')}
                    </div>
                </div>
                <div class="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button onclick="window.EduApp.closeModal()" class="text-xs text-slate-400 hover:text-white">Close</button>
                    <button onclick="window.EduApp.openConsultationModalWithContext('${dest.name}')" class="btn-primary-glow text-xs py-2 px-4">
                        Plan My Studies in ${dest.name}
                    </button>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    openServiceDetails: function (serviceId) {
        const s = (window.EduData?.services || []).find(item => item.id === serviceId);
        if (!s) return;

        const modal = document.getElementById('globalModal');
        const modalContent = document.getElementById('globalModalContent');
        if (!modal || !modalContent) return;

        modalContent.innerHTML = `
            <div class="space-y-4">
                <div class="pb-3 border-b border-white/10">
                    <span class="text-xs uppercase font-mono tracking-wider text-amber-400">EduConsultants Core Service</span>
                    <h3 class="text-xl font-bold text-white mt-1">${s.title}</h3>
                </div>
                <p class="text-sm text-slate-300 leading-relaxed">${s.desc}</p>
                <div class="glass-card p-4 rounded-xl border border-white/10 space-y-2 text-xs text-slate-300">
                    <div class="flex items-center gap-2 text-emerald-400 font-semibold">
                        <span>✓</span> 100% Tailored to Your Specific Target Universities
                    </div>
                    <div class="flex items-center gap-2 text-emerald-400 font-semibold">
                        <span>✓</span> Direct Oversight by Senior Education Officers
                    </div>
                    <div class="flex items-center gap-2 text-emerald-400 font-semibold">
                        <span>✓</span> Turnaround Time Under 48 Hours
                    </div>
                </div>
                <div class="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button onclick="window.EduApp.closeModal()" class="text-xs text-slate-400 hover:text-white">Close</button>
                    <button onclick="window.EduApp.openConsultationModalWithContext('${s.title}')" class="btn-primary-glow text-xs py-2 px-4">
                        Request Service Support
                    </button>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    openCourseDetails: function (courseCode) {
        const c = (window.EduData?.courses || []).find(item => item.code === courseCode);
        if (!c) return;

        const modal = document.getElementById('globalModal');
        const modalContent = document.getElementById('globalModalContent');
        if (!modal || !modalContent) return;

        modalContent.innerHTML = `
            <div class="space-y-4">
                <div class="pb-3 border-b border-white/10 flex items-center justify-between">
                    <div>
                        <span class="text-xs uppercase font-mono tracking-wider text-cyan-400">${c.code} Test Preparation</span>
                        <h3 class="text-xl font-bold text-white mt-0.5">${c.title}</h3>
                    </div>
                    <span class="px-3 py-1 bg-amber-400/20 text-amber-400 border border-amber-400/30 rounded-full text-xs font-bold">
                        ${c.band}
                    </span>
                </div>
                <p class="text-sm text-slate-300 leading-relaxed">${c.desc}</p>
                <div class="grid grid-cols-2 gap-3 text-xs">
                    <div class="glass-card p-3 rounded-lg border border-white/10">
                        <span class="text-slate-400 block mb-1">Duration</span>
                        <span class="font-bold text-white">${c.duration}</span>
                    </div>
                    <div class="glass-card p-3 rounded-lg border border-white/10">
                        <span class="text-slate-400 block mb-1">Learning Mode</span>
                        <span class="font-bold text-white">${c.mode}</span>
                    </div>
                </div>
                <div>
                    <h5 class="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">Curriculum Highlights</h5>
                    <ul class="space-y-1.5 text-xs text-slate-300">
                        ${c.features.map(f => `<li class="flex items-center gap-2"><span class="text-amber-400">•</span> ${f}</li>`).join('')}
                    </ul>
                </div>
                <div class="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button onclick="window.EduApp.closeModal()" class="text-xs text-slate-400 hover:text-white">Close</button>
                    <button onclick="window.EduApp.openConsultationModalWithContext('${c.code} Prep Batch')" class="btn-primary-glow text-xs py-2 px-4">
                        Enroll in Upcoming Batch
                    </button>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    openEventDetails: function (eventId) {
        const ev = (window.EduData?.events || []).find(item => item.id === eventId);
        if (!ev) return;

        const modal = document.getElementById('globalModal');
        const modalContent = document.getElementById('globalModalContent');
        if (!modal || !modalContent) return;

        modalContent.innerHTML = `
            <div class="space-y-4">
                <div class="relative h-44 rounded-xl overflow-hidden">
                    <img src="${ev.image}" alt="${ev.title}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    <div class="absolute top-3 right-3 px-3 py-1 bg-amber-400 text-slate-950 font-bold rounded-full text-xs">
                        ${ev.type}
                    </div>
                    <div class="absolute bottom-3 left-4 right-4">
                        <span class="text-xs text-cyan-300 font-mono">${ev.date} • ${ev.time}</span>
                        <h3 class="text-lg font-bold text-white leading-snug">${ev.title}</h3>
                    </div>
                </div>
                <div class="text-xs text-slate-300 space-y-1">
                    <div class="flex items-center gap-2">
                        <span class="text-slate-400">Location:</span>
                        <span class="font-semibold text-white">${ev.location}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-slate-400">Availability:</span>
                        <span class="font-semibold text-emerald-400">${ev.seats}</span>
                    </div>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">${ev.desc}</p>
                <div class="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button onclick="window.EduApp.closeModal()" class="text-xs text-slate-400 hover:text-white">Close</button>
                    <button onclick="window.EduApp.confirmEventRsvp('${ev.title}')" class="btn-primary-glow text-xs py-2 px-4">
                        Claim My Free Ticket
                    </button>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    confirmEventRsvp: function (eventTitle) {
        const modal = document.getElementById('globalModal');
        const modalContent = document.getElementById('globalModalContent');
        if (!modal || !modalContent) return;

        modalContent.innerHTML = `
            <div class="text-center py-6 space-y-4">
                <div class="w-16 h-16 bg-amber-400/20 text-amber-400 border border-amber-400/40 rounded-full flex items-center justify-center mx-auto text-3xl">
                    🎟️
                </div>
                <div>
                    <span class="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">Ticket Issued</span>
                    <h3 class="text-xl font-bold text-white mt-1">RSVP Confirmed!</h3>
                    <p class="text-xs text-slate-300 mt-2 max-w-sm mx-auto">
                        Your pass for <strong>${eventTitle}</strong> is secured. An entry barcode and calendar invite have been registered.
                    </p>
                </div>
                <div class="bg-white/5 border border-white/10 p-3 rounded-xl max-w-xs mx-auto font-mono text-xs text-slate-400">
                    PASS-ID: EDU-2026-${Math.floor(100000 + Math.random() * 900000)}
                </div>
                <div class="pt-3">
                    <button onclick="window.EduApp.closeModal()" class="btn-primary-glow px-5 py-2 text-xs font-bold">
                        Great, Thanks!
                    </button>
                </div>
            </div>
        `;
    },

    openBlogDetails: function (blogId) {
        const b = (window.EduData?.blogs || []).find(item => item.id === blogId);
        if (!b) return;

        const modal = document.getElementById('globalModal');
        const modalContent = document.getElementById('globalModalContent');
        if (!modal || !modalContent) return;

        modalContent.innerHTML = `
            <div class="space-y-4">
                <div class="relative h-48 rounded-xl overflow-hidden">
                    <img src="${b.image}" alt="${b.title}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    <div class="absolute bottom-3 left-4 right-4">
                        <span class="text-xs text-amber-400 font-mono">${b.category} • ${b.readTime}</span>
                        <h3 class="text-xl font-bold text-white leading-snug">${b.title}</h3>
                    </div>
                </div>
                <div class="flex items-center gap-3 text-xs text-slate-400 pb-2 border-b border-white/10">
                    <span>By ${b.author}</span>
                    <span>•</span>
                    <span>${b.date}</span>
                </div>
                <div class="text-xs text-slate-300 leading-relaxed space-y-3 max-h-60 overflow-y-auto pr-2">
                    <p class="font-medium text-slate-200">${b.summary}</p>
                    <p>${b.content}</p>
                    <p>Our counselors are available Monday through Saturday to review student portfolios and structure scholarship-ready submission packages.</p>
                </div>
                <div class="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button onclick="window.EduApp.closeModal()" class="text-xs text-slate-400 hover:text-white">Close Article</button>
                    <button onclick="window.EduApp.openConsultationModal()" class="btn-primary-glow text-xs py-2 px-4">
                        Discuss With an Advisor
                    </button>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    openAuthModal: function () {
        const modal = document.getElementById('globalModal');
        const modalContent = document.getElementById('globalModalContent');
        if (!modal || !modalContent) return;

        modalContent.innerHTML = `
            <div class="space-y-4 max-w-sm mx-auto">
                <div class="text-center pb-2 border-b border-white/10">
                    <span class="text-xs uppercase font-mono tracking-wider text-amber-400">EduConsultants Portal</span>
                    <h3 class="text-xl font-bold text-white mt-1">Student Account Sign In</h3>
                </div>
                <form onsubmit="event.preventDefault(); alert('Authentication demo: Welcome to your EduConsultants portal!'); window.EduApp.closeModal();" class="space-y-3">
                    <div>
                        <label class="block text-xs text-slate-300 mb-1">Email or Student ID</label>
                        <input type="email" required placeholder="student@example.com" class="form-input-luxury">
                    </div>
                    <div>
                        <label class="block text-xs text-slate-300 mb-1">Password</label>
                        <input type="password" required placeholder="••••••••" class="form-input-luxury">
                    </div>
                    <div class="flex items-center justify-between text-xs text-slate-400">
                        <label class="flex items-center gap-1.5 cursor-pointer">
                            <input type="checkbox" class="rounded bg-slate-800 border-white/20">
                            Remember me
                        </label>
                        <a href="#" class="text-amber-400 hover:underline">Forgot password?</a>
                    </div>
                    <button type="submit" class="w-full btn-primary-glow justify-center text-xs py-2.5 font-bold">
                        Access My Portal
                    </button>
                </form>
                <div class="text-center text-xs text-slate-400 pt-2 border-t border-white/10">
                    Don't have a profile yet? <a href="#freeConsultation" onclick="window.EduApp.closeModal()" class="text-amber-400 font-bold hover:underline">Register for Free</a>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
    },

    openPolicyModal: function (policyType) {
        const modal = document.getElementById('globalModal');
        const modalContent = document.getElementById('globalModalContent');
        if (!modal || !modalContent) return;

        let title = "Terms & Conditions";
        let body = "EduConsultants is committed to total transparency, data security, and ethical counseling standards.";

        if (policyType === 'privacy') {
            title = "Privacy Policy";
            body = "Your personal academic records, passport information, and contact details are encrypted and utilized strictly for university admissions and visa processing in compliance with international privacy protocols.";
        } else if (policyType === 'refund') {
            title = "Refund Policy";
            body = "We uphold transparent refund policies. In the event of university program cancellation or verified visa denials with all prescribed documentation, applicable advisory service fee waivers apply.";
        }

        modalContent.innerHTML = `
            <div class="space-y-4">
                <div class="pb-2 border-b border-white/10">
                    <span class="text-xs uppercase font-mono tracking-wider text-amber-400">EduConsultants Legal</span>
                    <h3 class="text-xl font-bold text-white mt-1">${title}</h3>
                </div>
                <div class="text-xs text-slate-300 leading-relaxed max-h-56 overflow-y-auto space-y-2 pr-2">
                    <p>${body}</p>
                    <p>For inquiries regarding our policies or data management, contact legal@educonsultants.org or visit our central office.</p>
                </div>
                <div class="pt-3 border-t border-white/10 text-right">
                    <button onclick="window.EduApp.closeModal()" class="btn-primary-glow text-xs py-2 px-5">
                        Close
                    </button>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
    }
};
