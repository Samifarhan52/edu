/**
 * The Edu Consultants - Advanced Dynamic CMS Engine & Viewport Controller
 * Powers:
 * 1. Blog & Article CMS (Create, Edit, Delete, Draft/Publish, Reader Modal, Live Search)
 * 2. University Directory CMS (Add, Manage, Search, Country Filter)
 * 3. Dynamic Site Announcements & Hero Broadcasts
 * 4. Dedicated Mobile Bottom Dock & Viewport Adaptation
 */

(function (window, document) {
    'use strict';

    const STORAGE_BLOGS = 'the_edu_custom_blogs';
    const STORAGE_UNIS = 'the_edu_custom_unis';
    const STORAGE_ANNOUNCEMENT = 'the_edu_site_announcement';

    // Seed Default Curated Articles
    const DEFAULT_BLOGS = [
        {
            id: 'blog-seed-1',
            title: 'How to Secure Scholarships for International Students',
            category: 'Scholarships',
            readTime: '4 min read',
            date: 'Nov 15th 2026',
            author: 'Alexander Morgan',
            authorRole: 'Admissions Director',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
            summary: 'Strategic insights on demonstrating academic merit, writing persuasive statement of purpose letters, and meeting early grant deadlines.',
            content: `Securing an international scholarship is one of the highest-leverage steps in your global education pathway. Top universities in the US, UK, Australia, Canada, and Europe allocate millions in dedicated endowment and diversity funds each intake.

### 1. Differentiate Academic Merit from Financial Need
Many universities operate merit-first evaluation rubrics. Highlight your class rank, extracurricular leadership, and specialized research milestones alongside your academic transcripts.

### 2. Tailor Your Statement of Purpose (SOP)
Avoid generic essays. Address the specific department faculty, mention lab facilities or research centers at the target university, and explain how their curriculum aligns with your 5-year post-graduation career roadmap.

### 3. Early Filing is Non-Negotiable
Scholarship committees evaluate applications on rolling admission cycles. Submitting your file 3 to 4 months prior to standard deadlines increases your grant probability by up to 60%.

Connect with The Edu Consultants advisors today to review institutional scholarship waivers for the upcoming 2026 intake.`,
            status: 'published',
            isCustom: false
        },
        {
            id: 'blog-seed-2',
            title: 'Application Masterclass: Ace Your Study Abroad File',
            category: 'Admissions',
            readTime: '6 min read',
            date: 'Nov 18th 2026',
            author: 'Dr. Eleanor Vance',
            authorRole: 'Senior Academic Counselor',
            image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
            summary: 'A step-by-step masterclass on avoiding critical SOP errors, securing compelling letters of recommendation, and transcript notarization.',
            content: `Admissions committees at competitive institutions review thousands of international files. Standing out requires an airtight, compelling dossier that highlights your trajectory.

### The Anatomy of a Winning File:
1. **Letters of Recommendation (LOR):** Request recommendations from professors or mentors who can comment specifically on your problem-solving resilience, not just your test scores.
2. **Credential Evaluation & Notarization:** Check whether your target institution requires WES or APS verification early to prevent administrative processing delays.
3. **Quantified Resume:** Highlight impact metrics in your resume—such as projects led, teams managed, and technical proficiencies mastered.

At The Edu Consultants, our advisors conduct complete diagnostic profile evaluations to maximize admissions success.`,
            status: 'published',
            isCustom: false
        },
        {
            id: 'blog-seed-3',
            title: 'Pre-Departure Orientation: Essential Guide for Life Abroad',
            category: 'Pre-Departure',
            readTime: '5 min read',
            date: 'Nov 22nd 2026',
            author: 'Sophia Patel',
            authorRole: 'Student Welfare Lead',
            image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
            summary: 'Crucial packing checklists, setting up international student bank accounts, foreign SIM activation, and health coverage registration.',
            content: `Stepping onto campus abroad is exhilarating, but initial logistics can feel daunting without proper preparation.

### Essential Pre-Departure Milestones:
- **Banking & Currency:** Open a digital student bank account or multi-currency forex card with zero international wire transfer charges.
- **Health Coverage & Insurance:** Ensure your mandatory student health insurance (such as OSHC in Australia or NHS surcharge in the UK) is fully active before landing.
- **Housing Verification:** Never wire deposits to unverified private listings. Utilize university-affiliated residential portals or vetted partner accommodations.

Our pre-departure webinars connect incoming scholars with current university students to ensure a seamless landing.`,
            status: 'published',
            isCustom: false
        },
        {
            id: 'blog-seed-4',
            title: 'Cultural Adjustment: How to Thrive in a New Global Campus',
            category: 'Culture',
            readTime: '4 min read',
            date: 'Dec 1st 2026',
            author: 'Marcus Chen',
            authorRole: 'Global Alumni Mentor',
            image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
            summary: 'Navigating the cultural adaptation curve, joining campus societies, building global professional networks, and securing part-time roles.',
            content: `The international student experience extends far beyond the lecture hall. Cultivating cultural intelligence is a vital asset for global careers.

### Proven Strategies:
1. **Engage with Student Societies:** Join both cultural associations and academic societies related to your major in your first month.
2. **Understand Work Rights:** Familiarize yourself with campus work hour regulations (e.g., 20 to 24 hours per week during term time) and build early relationships with campus career centers.
3. **Embrace Peer Mentorship:** Connecting with senior international scholars helps you navigate local transportation, winter gear, and exam formats effortlessly.`,
            status: 'published',
            isCustom: false
        }
    ];

    // Seed Default Universities
    const DEFAULT_UNIS = [
        {
            id: 'uni-seed-1',
            name: 'University of Melbourne',
            country: 'Australia',
            ranking: '#14 QS World Ranking',
            tuition: '$32,000 / year',
            acceptance: '70% Acceptance Rate',
            image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
            programs: 'Business, Computer Science, Engineering, Medicine',
            tag: 'Top Partner',
            status: 'published',
            isCustom: false
        },
        {
            id: 'uni-seed-2',
            name: 'University of British Columbia',
            country: 'Canada',
            ranking: '#34 QS World Ranking',
            tuition: '$28,500 / year',
            acceptance: '52% Acceptance Rate',
            image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80',
            programs: 'Data Science, Environmental Science, MBA, AI',
            tag: 'Fast-Track',
            status: 'published',
            isCustom: false
        },
        {
            id: 'uni-seed-3',
            name: 'University of Manchester',
            country: 'United Kingdom',
            ranking: '#32 QS World Ranking',
            tuition: '£24,000 / year',
            acceptance: '56% Acceptance Rate',
            image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
            programs: 'Finance, International Relations, Law, Robotics',
            tag: 'Fee Waiver',
            status: 'published',
            isCustom: false
        },
        {
            id: 'uni-seed-4',
            name: 'University of California, Berkeley',
            country: 'United States',
            ranking: '#10 QS World Ranking',
            tuition: '$44,000 / year',
            acceptance: '14% Acceptance Rate',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
            programs: 'Computer Science, Economics, Bioengineering, Business',
            tag: 'Ivy & Elite',
            status: 'published',
            isCustom: false
        },
        {
            id: 'uni-seed-5',
            name: 'Technical University of Munich',
            country: 'Germany',
            ranking: '#37 QS World Ranking',
            tuition: '€0 - €6,000 / year',
            acceptance: '28% Acceptance Rate',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
            programs: 'Mechanical Engineering, Automotive, Informatics',
            tag: 'Zero Tuition Option',
            status: 'published',
            isCustom: false
        },
        {
            id: 'uni-seed-6',
            name: 'University of Sydney',
            country: 'Australia',
            ranking: '#19 QS World Ranking',
            tuition: '$34,500 / year',
            acceptance: '30% Acceptance Rate',
            image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
            programs: 'Architecture, Health Sciences, Business Analytics',
            tag: 'Top Partner',
            status: 'published',
            isCustom: false
        }
    ];

    // Default Site Announcement
    const DEFAULT_ANNOUNCEMENT = {
        enabled: true,
        urgency: 'gold', // 'info', 'gold', 'urgent'
        title: 'Fall 2026 Admissions Now Open!',
        badge: 'Priority Intake',
        message: '100% Free Counseling & Official University Application Fee Waivers available this week.',
        ctaText: 'Claim Your Waiver',
        ctaLink: 'contact-us.html'
    };

    // CMS Engine Object
    const EduCMS = {
        // --- STORAGE RETRIEVAL & PERSISTENCE ---
        getCustomBlogs: function () {
            try {
                const data = localStorage.getItem(STORAGE_BLOGS);
                return data ? JSON.parse(data) : [];
            } catch (e) {
                return [];
            }
        },

        saveCustomBlogs: function (blogs) {
            localStorage.setItem(STORAGE_BLOGS, JSON.stringify(blogs));
        },

        getAllBlogs: function () {
            const custom = this.getCustomBlogs();
            return [...custom, ...DEFAULT_BLOGS];
        },

        saveBlog: function (blogData) {
            // 1. Authorization Guard (AuthZ != AuthN)
            const user = (window.edAuth && window.edAuth.getUser) ? window.edAuth.getUser() : null;
            if (window.EduSecurity && !window.EduSecurity.hasPermission(user, 'create_blog')) {
                this.showToast('Authorization Denied (403)', 'Only Admissions Directors and Staff may publish articles.', 'danger');
                return null;
            }

            // 2. Image Source Security Check
            if (window.EduSecurity && blogData.image) {
                const imgCheck = window.EduSecurity.validateImageSource(blogData.image);
                if (!imgCheck.valid) {
                    this.showToast('Security Alert', imgCheck.message, 'danger');
                    return null;
                }
            }

            // 3. Input Sanitization
            const safeTitle = window.EduSecurity ? window.EduSecurity.sanitizeText(blogData.title) : blogData.title.trim();
            const safeCategory = window.EduSecurity ? window.EduSecurity.sanitizeText(blogData.category) : (blogData.category || 'General');
            const safeSummary = window.EduSecurity ? window.EduSecurity.sanitizeText(blogData.summary) : blogData.summary.trim();
            const safeContent = window.EduSecurity ? window.EduSecurity.sanitizeHTML(blogData.content) : blogData.content.trim();
            const safeAuthor = window.EduSecurity ? window.EduSecurity.sanitizeText(blogData.author) : (blogData.author || 'Advisor');

            const custom = this.getCustomBlogs();
            const newBlog = {
                id: 'blog-custom-' + Date.now(),
                title: safeTitle,
                category: safeCategory,
                readTime: blogData.readTime || '4 min read',
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                author: safeAuthor,
                authorRole: blogData.authorRole || 'The Edu Consultants Staff',
                image: blogData.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
                summary: safeSummary,
                content: safeContent,
                status: blogData.status || 'published',
                isCustom: true,
                createdAt: Date.now()
            };
            custom.unshift(newBlog);
            this.saveCustomBlogs(custom);
            return newBlog;
        },

        deleteBlog: function (blogId) {
            const user = (window.edAuth && window.edAuth.getUser) ? window.edAuth.getUser() : null;
            if (window.EduSecurity && !window.EduSecurity.hasPermission(user, 'delete_blog')) {
                this.showToast('Authorization Denied (403)', 'Administrative privileges required to delete content.', 'danger');
                return;
            }
            let custom = this.getCustomBlogs();
            custom = custom.filter(b => b.id !== blogId);
            this.saveCustomBlogs(custom);
        },

        // --- UNIVERSITIES RETRIEVAL & PERSISTENCE ---
        getCustomUnis: function () {
            try {
                const data = localStorage.getItem(STORAGE_UNIS);
                return data ? JSON.parse(data) : [];
            } catch (e) {
                return [];
            }
        },

        saveCustomUnis: function (unis) {
            localStorage.setItem(STORAGE_UNIS, JSON.stringify(unis));
        },

        getAllUnis: function () {
            const custom = this.getCustomUnis();
            return [...custom, ...DEFAULT_UNIS];
        },

        saveUni: function (uniData) {
            const user = (window.edAuth && window.edAuth.getUser) ? window.edAuth.getUser() : null;
            if (window.EduSecurity && !window.EduSecurity.hasPermission(user, 'manage_universities')) {
                this.showToast('Authorization Denied (403)', 'Administrative privileges required to modify directory.', 'danger');
                return null;
            }

            if (window.EduSecurity && uniData.image) {
                const imgCheck = window.EduSecurity.validateImageSource(uniData.image);
                if (!imgCheck.valid) {
                    this.showToast('Security Alert', imgCheck.message, 'danger');
                    return null;
                }
            }

            const safeName = window.EduSecurity ? window.EduSecurity.sanitizeText(uniData.name) : uniData.name.trim();
            const safeCountry = window.EduSecurity ? window.EduSecurity.sanitizeText(uniData.country) : (uniData.country || 'Global');
            const safeTuition = window.EduSecurity ? window.EduSecurity.sanitizeText(uniData.tuition) : (uniData.tuition || 'Inquire');
            const safeAcceptance = window.EduSecurity ? window.EduSecurity.sanitizeText(uniData.acceptance) : (uniData.acceptance || 'Rolling');
            const safePrograms = window.EduSecurity ? window.EduSecurity.sanitizeText(uniData.programs) : (uniData.programs || 'Diverse Programs');

            const custom = this.getCustomUnis();
            const newUni = {
                id: 'uni-custom-' + Date.now(),
                name: safeName,
                country: safeCountry,
                ranking: uniData.ranking || 'Top 100 Global',
                tuition: safeTuition,
                acceptance: safeAcceptance,
                image: uniData.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
                programs: safePrograms,
                tag: uniData.tag || 'New Partner',
                status: 'published',
                isCustom: true,
                createdAt: Date.now()
            };
            custom.unshift(newUni);
            this.saveCustomUnis(custom);
            return newUni;
        },

        deleteUni: function (uniId) {
            let custom = this.getCustomUnis();
            custom = custom.filter(u => u.id !== uniId);
            this.saveCustomUnis(custom);
        },

        // --- ANNOUNCEMENTS ---
        getAnnouncement: function () {
            try {
                const data = localStorage.getItem(STORAGE_ANNOUNCEMENT);
                return data ? JSON.parse(data) : DEFAULT_ANNOUNCEMENT;
            } catch (e) {
                return DEFAULT_ANNOUNCEMENT;
            }
        },

        saveAnnouncement: function (announcementData) {
            localStorage.setItem(STORAGE_ANNOUNCEMENT, JSON.stringify(announcementData));
        },

        // --- TOAST NOTIFICATIONS ---
        showToast: function (title, message, type = 'success') {
            let container = document.getElementById('eduToastContainer');
            if (!container) {
                container = document.createElement('div');
                container.id = 'eduToastContainer';
                container.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 10050; display: flex; flex-direction: column; gap: 10px; max-width: 380px; width: calc(100% - 48px); pointer-events: none;';
                document.body.appendChild(container);
            }

            const toast = document.createElement('div');
            const bgClass = type === 'success' ? '#000064' : (type === 'danger' ? '#dc3545' : '#fb5421');
            const iconClass = type === 'success' ? 'fa-circle-check text-warning' : (type === 'danger' ? 'fa-triangle-exclamation text-white' : 'fa-bell text-white');
            
            toast.style.cssText = `background: ${bgClass}; color: white; padding: 14px 18px; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); display: flex; align-items: start; gap: 12px; pointer-events: auto; animation: toastSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1); border-left: 4px solid var(--button);`;
            toast.innerHTML = `
                <i class="fa-solid ${iconClass} fs-5 mt-1"></i>
                <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 14px; letter-spacing: -0.2px;">${title}</div>
                    <div style="font-size: 13px; opacity: 0.9; line-height: 1.4; margin-top: 2px;">${message}</div>
                </div>
                <button type="button" style="background: none; border: none; color: white; opacity: 0.6; cursor: pointer; padding: 0;" onclick="this.parentElement.remove()">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;

            container.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(10px)';
                toast.style.transition = 'all 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 4200);
        },

        // --- PUBLIC SITE: DYNAMIC ANNOUNCEMENT BANNER ---
        renderAnnouncementBanner: function () {
            const bannerData = this.getAnnouncement();
            if (!bannerData || !bannerData.enabled) return;

            // Only render once at top of body if not already present
            if (document.querySelector('.edu-dynamic-announcement-bar')) return;

            const bar = document.createElement('div');
            bar.className = 'edu-dynamic-announcement-bar';
            
            const isGold = bannerData.urgency === 'gold';
            bar.innerHTML = `
                <div class="container d-flex align-items-center justify-content-between flex-wrap gap-2 py-2">
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                        <span class="badge ${isGold ? 'bg-warning text-dark' : 'bg-danger text-white'} fw-bold px-2 py-1 rounded-pill" style="font-size: 11px;">
                            <i class="fa-solid fa-bolt me-1"></i> ${bannerData.badge || 'Update'}
                        </span>
                        <span class="fw-semibold text-white fs-13">
                            <b>${bannerData.title}</b> ${bannerData.message}
                        </span>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <a href="${bannerData.ctaLink || 'contact-us.html'}" class="btn btn-sm btn-warning rounded-pill px-3 py-1 fw-bold fs-12 text-decoration-none" style="background-color: var(--button); color: var(--brand-primary); border: none;">
                            ${bannerData.ctaText || 'Learn More'} <i class="fa-solid fa-arrow-right ms-1"></i>
                        </a>
                        <button type="button" class="btn btn-sm text-white-50 p-0 border-0 ms-2" onclick="this.closest('.edu-dynamic-announcement-bar').remove()" title="Dismiss">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
            `;
            document.body.prepend(bar);
        },

        // --- PUBLIC SITE: MOBILE FLOATING BOTTOM DOCK ---
        renderMobileBottomDock: function () {
            // Check if already injected
            if (document.querySelector('.mobile-bottom-dock')) return;

            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            // Do not render on auth pages
            if (currentPage === 'login.html' || currentPage === 'signup.html') return;

            const dock = document.createElement('nav');
            dock.className = 'mobile-bottom-dock';
            dock.setAttribute('aria-label', 'Mobile Navigation Bar');

            const isHome = currentPage === '' || currentPage === 'index.html';
            const isUnis = currentPage === 'universities-list.html';
            const isBlogs = currentPage === 'blog-list.html';
            const isAdmin = currentPage === 'admin-dashboard.html';

            dock.innerHTML = `
                <a href="index.html" class="dock-item ${isHome ? 'active' : ''}">
                    <i class="fa-solid fa-house"></i>
                    <span>Home</span>
                </a>
                <a href="universities-list.html" class="dock-item ${isUnis ? 'active' : ''}">
                    <i class="fa-solid fa-building-columns"></i>
                    <span>Universities</span>
                </a>
                <button type="button" class="dock-item dock-item-highlight" id="dockJourneyTrigger" title="Interactive Journey Flow">
                    <div class="dock-highlight-circle">
                        <i class="fa-solid fa-compass"></i>
                    </div>
                    <span>Journey</span>
                </button>
                <a href="blog-list.html" class="dock-item ${isBlogs ? 'active' : ''}">
                    <div class="position-relative">
                        <i class="fa-solid fa-newspaper"></i>
                        <span class="dock-badge-dot"></span>
                    </div>
                    <span>Articles</span>
                </a>
                <a href="admin-dashboard.html" class="dock-item ${isAdmin ? 'active' : ''}">
                    <i class="fa-solid fa-sliders"></i>
                    <span>Admin</span>
                </a>
            `;

            document.body.appendChild(dock);

            // Connect Journey Trigger in Dock
            const dockJourney = document.getElementById('dockJourneyTrigger');
            if (dockJourney) {
                dockJourney.addEventListener('click', () => {
                    if (window.MobileJourneyFlow && typeof window.MobileJourneyFlow.open === 'function') {
                        window.MobileJourneyFlow.open();
                    } else if (document.getElementById('journeySection')) {
                        document.getElementById('journeySection').scrollIntoView({ behavior: 'smooth' });
                    } else {
                        window.location.href = 'index.html#journeySection';
                    }
                });
            }
        },

        // --- BLOG LIST PAGE CONTROLLER ---
        initBlogListPage: function () {
            const container = document.getElementById('dynamicBlogGrid');
            if (!container) return;

            const searchInput = document.getElementById('blogSearchInput');
            const categoryFilterContainer = document.getElementById('blogCategoryPills');
            const countLabel = document.getElementById('blogCountDisplay');

            let currentCategory = 'All';
            let searchQuery = '';

            const render = () => {
                const allBlogs = this.getAllBlogs();
                const filtered = allBlogs.filter(blog => {
                    const matchesCategory = currentCategory === 'All' || (blog.category && blog.category.toLowerCase() === currentCategory.toLowerCase());
                    const matchesSearch = !searchQuery || 
                        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (blog.summary && blog.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (blog.author && blog.author.toLowerCase().includes(searchQuery.toLowerCase()));
                    return matchesCategory && matchesSearch;
                });

                if (countLabel) {
                    countLabel.textContent = `Showing ${filtered.length} of ${allBlogs.length} Articles`;
                }

                if (filtered.length === 0) {
                    container.innerHTML = `
                        <div class="col-12 py-5 text-center">
                            <div class="bg-light d-inline-flex p-4 rounded-circle mb-3 text-muted">
                                <i class="fa-solid fa-magnifying-glass fs-2"></i>
                            </div>
                            <h4 class="fw-bold text-dark">No Articles Found</h4>
                            <p class="text-muted fs-15">Try adjusting your search query or select another category.</p>
                            <button type="button" class="btn btn-warning rounded-pill px-4 fw-bold" onclick="document.getElementById('blogSearchInput').value=''; document.querySelectorAll('.category-pill').forEach(p=>p.classList.remove('active')); document.querySelector('[data-category=All]').classList.add('active'); window.EduCMS.initBlogListPage();">
                                Reset Filters
                            </button>
                        </div>
                    `;
                    return;
                }

                container.innerHTML = filtered.map(blog => {
                    const isNewBadge = blog.isCustom ? `<span class="badge bg-danger text-white fw-bold me-1 animate-pulse"><i class="fa-solid fa-sparkles me-1"></i>NEW POST</span>` : '';
                    return `
                        <div class="col-lg-4 col-md-6" data-aos="fade-up">
                            <article class="card h-100 border rounded-4 overflow-hidden shadow-sm blog-item-card transition-hover">
                                <div class="position-relative overflow-hidden" style="height: 220px; background-color: #f1f3f5;">
                                    <img src="${blog.image}" class="w-100 h-100 object-fit-cover blog-card-img" alt="${blog.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80'"/>
                                    <div class="position-absolute top-0 start-0 p-3 d-flex gap-1 flex-wrap">
                                        ${isNewBadge}
                                        <span class="badge bg-warning text-dark fw-bold">${blog.category}</span>
                                    </div>
                                    <div class="position-absolute bottom-0 end-0 m-3 px-2 py-1 rounded-pill bg-dark bg-opacity-75 text-white fs-12 fw-semibold">
                                        <i class="fa-regular fa-clock me-1"></i> ${blog.readTime}
                                    </div>
                                </div>
                                <div class="card-body p-4 d-flex flex-column justify-content-between">
                                    <div>
                                        <div class="text-muted fs-13 mb-2 d-flex align-items-center gap-2">
                                            <i class="fa-regular fa-calendar"></i> ${blog.date}
                                        </div>
                                        <h5 class="card-title fw-bold text-dark mb-2 blog-card-title">${blog.title}</h5>
                                        <p class="card-text fs-14 text-muted mb-3">${blog.summary}</p>
                                    </div>
                                    <div class="pt-3 border-top mt-2 d-flex justify-content-between align-items-center">
                                        <div class="d-flex align-items-center gap-2">
                                            <div class="rounded-circle bg-primary-subtle text-brand-primary fw-bold d-flex align-items-center justify-content-center" style="width: 30px; height: 30px; font-size: 12px;">
                                                ${(blog.author || 'AD').substring(0, 2).toUpperCase()}
                                            </div>
                                            <span class="fs-13 fw-semibold text-dark">${blog.author}</span>
                                        </div>
                                        <button type="button" class="btn btn-sm btn-link p-0 text-decoration-none fw-bold text-brand-primary read-article-btn" data-id="${blog.id}">
                                            Read Article <i class="fa-solid fa-arrow-right ms-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </div>
                    `;
                }).join('');

                // Attach modal reader handlers
                container.querySelectorAll('.read-article-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-id');
                        const item = allBlogs.find(b => b.id === id);
                        if (item) {
                            EduCMS.openBlogReaderModal(item);
                        }
                    });
                });
            };

            // Setup Search listener
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    searchQuery = e.target.value.trim();
                    render();
                });
            }

            // Setup Category Pills listener
            if (categoryFilterContainer) {
                categoryFilterContainer.querySelectorAll('.category-pill').forEach(pill => {
                    pill.addEventListener('click', () => {
                        categoryFilterContainer.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
                        pill.classList.add('active');
                        currentCategory = pill.getAttribute('data-category') || 'All';
                        render();
                    });
                });
            }

            // Initial render
            render();
        },

        // --- BLOG READER MODAL ---
        openBlogReaderModal: function (blog) {
            let modalEl = document.getElementById('eduBlogReaderModal');
            if (!modalEl) {
                const modalDiv = document.createElement('div');
                modalDiv.className = 'modal fade';
                modalDiv.id = 'eduBlogReaderModal';
                modalDiv.setAttribute('tabindex', '-1');
                modalDiv.setAttribute('aria-hidden', 'true');
                modalDiv.innerHTML = `
                    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                        <div class="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
                            <div class="modal-header border-0 bg-brand-primary text-white p-4">
                                <div>
                                    <span class="badge bg-warning text-dark fw-bold mb-2" id="modalBlogCategory">Scholarships</span>
                                    <h4 class="modal-title fw-800 text-white" id="modalBlogTitle">Article Title</h4>
                                    <div class="d-flex align-items-center gap-3 mt-2 text-white-50 fs-13">
                                        <span id="modalBlogAuthor"><i class="fa-regular fa-user me-1"></i> Author</span>
                                        <span id="modalBlogDate"><i class="fa-regular fa-calendar me-1"></i> Date</span>
                                        <span id="modalBlogReadTime"><i class="fa-regular fa-clock me-1"></i> Read Time</span>
                                    </div>
                                </div>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4 p-md-5">
                                <div class="mb-4 rounded-3 overflow-hidden" style="max-height: 340px;">
                                    <img src="" id="modalBlogImage" class="w-100 h-100 object-fit-cover" alt="Article Cover"/>
                                </div>
                                <div id="modalBlogSummary" class="fs-16 fw-semibold text-dark p-3 rounded-3 bg-light border-start border-warning border-4 mb-4">
                                </div>
                                <div id="modalBlogContent" class="blog-formatted-content fs-15 text-para-text" style="line-height: 1.8;">
                                </div>
                            </div>
                            <div class="modal-footer bg-light border-0 p-3 d-flex justify-content-between">
                                <div class="d-flex align-items-center gap-2">
                                    <span class="fs-13 text-muted">Share:</span>
                                    <button class="btn btn-sm btn-outline-secondary rounded-circle" style="width: 32px; height: 32px;" onclick="navigator.clipboard.writeText(window.location.href); EduCMS.showToast('Copied', 'Article link copied to clipboard!');"><i class="fa-solid fa-link"></i></button>
                                </div>
                                <a href="contact-us.html" class="btn btn-warning rounded-pill px-4 fw-bold" style="background-color: var(--button); color: var(--brand-primary); border: none;">
                                    <i class="fa-solid fa-graduation-cap me-1"></i> Book Free Consultation
                                </a>
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(modalDiv);
                modalEl = modalDiv;
            }

            document.getElementById('modalBlogCategory').textContent = blog.category;
            document.getElementById('modalBlogTitle').textContent = blog.title;
            document.getElementById('modalBlogAuthor').innerHTML = `<i class="fa-regular fa-user me-1"></i> ${blog.author} (${blog.authorRole || 'Advisor'})`;
            document.getElementById('modalBlogDate').innerHTML = `<i class="fa-regular fa-calendar me-1"></i> ${blog.date}`;
            document.getElementById('modalBlogReadTime').innerHTML = `<i class="fa-regular fa-clock me-1"></i> ${blog.readTime}`;
            document.getElementById('modalBlogImage').src = blog.image;
            document.getElementById('modalBlogSummary').textContent = blog.summary;
            
            // Format content paragraphs
            const paragraphs = (blog.content || blog.summary)
                .split('\n\n')
                .map(p => {
                    if (p.startsWith('### ')) {
                        return `<h4 class="fw-bold text-dark mt-4 mb-2">${p.replace('### ', '')}</h4>`;
                    }
                    if (p.startsWith('1. ') || p.startsWith('- ')) {
                        return `<div class="p-2 ps-3 border-start border-2 border-primary my-1">${p}</div>`;
                    }
                    return `<p class="mb-3">${p}</p>`;
                })
                .join('');
            
            document.getElementById('modalBlogContent').innerHTML = paragraphs;

            const bsModal = new bootstrap.Modal(modalEl);
            bsModal.show();
        },

        // --- UNIVERSITIES LIST PAGE CONTROLLER ---
        initUniListPage: function () {
            const container = document.getElementById('dynamicUniGrid');
            if (!container) return;

            const searchInput = document.getElementById('uniSearchInput');
            const countryFilterContainer = document.getElementById('uniCountryPills');
            const countLabel = document.getElementById('uniCountDisplay');

            let currentCountry = 'All';
            let searchQuery = '';

            const render = () => {
                const allUnis = this.getAllUnis();
                const filtered = allUnis.filter(uni => {
                    const matchesCountry = currentCountry === 'All' || (uni.country && uni.country.toLowerCase() === currentCountry.toLowerCase());
                    const matchesSearch = !searchQuery || 
                        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (uni.programs && uni.programs.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (uni.ranking && uni.ranking.toLowerCase().includes(searchQuery.toLowerCase()));
                    return matchesCountry && matchesSearch;
                });

                if (countLabel) {
                    countLabel.textContent = `Showing ${filtered.length} of ${allUnis.length} Partner Universities`;
                }

                if (filtered.length === 0) {
                    container.innerHTML = `
                        <div class="col-12 py-5 text-center">
                            <div class="bg-light d-inline-flex p-4 rounded-circle mb-3 text-muted">
                                <i class="fa-solid fa-building-columns fs-2"></i>
                            </div>
                            <h4 class="fw-bold text-dark">No Universities Found</h4>
                            <p class="text-muted fs-15">Try adjusting your filters or country selection.</p>
                            <button type="button" class="btn btn-warning rounded-pill px-4 fw-bold" onclick="document.getElementById('uniSearchInput').value=''; document.querySelectorAll('.country-pill').forEach(p=>p.classList.remove('active')); document.querySelector('[data-country=All]').classList.add('active'); window.EduCMS.initUniListPage();">
                                Reset Filters
                            </button>
                        </div>
                    `;
                    return;
                }

                container.innerHTML = filtered.map(uni => {
                    const isNewBadge = uni.isCustom ? `<span class="badge bg-success text-white fw-bold me-1"><i class="fa-solid fa-plus me-1"></i>NEW ADDITION</span>` : '';
                    return `
                        <div class="col-md-6" data-aos="fade-up">
                            <div class="card h-100 border rounded-4 overflow-hidden shadow-sm uni-card-luxury transition-hover">
                                <div class="position-relative" style="height: 190px;">
                                    <img src="${uni.image}" class="card-img-top object-fit-cover w-100 h-100" alt="${uni.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80'"/>
                                    <div class="position-absolute top-0 start-0 p-3 d-flex gap-1 flex-wrap">
                                        ${isNewBadge}
                                        <span class="badge bg-warning text-dark fw-bold">${uni.country}</span>
                                    </div>
                                    <div class="position-absolute top-0 end-0 p-3">
                                        <span class="badge bg-primary text-white fw-semibold">${uni.tag || 'Official Partner'}</span>
                                    </div>
                                </div>
                                <div class="card-body p-4 d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 class="card-title fw-bold text-dark mb-1">${uni.name}</h5>
                                        <div class="d-flex align-items-center gap-2 text-muted fs-13 mb-3">
                                            <i class="fa-solid fa-award text-warning"></i>
                                            <span class="fw-semibold text-primary">${uni.ranking}</span>
                                        </div>
                                        <div class="bg-light p-3 rounded-3 mb-3 fs-13">
                                            <div class="d-flex justify-content-between mb-1">
                                                <span class="text-muted">Estimated Tuition:</span>
                                                <span class="fw-bold text-dark">${uni.tuition}</span>
                                            </div>
                                            <div class="d-flex justify-content-between mb-1">
                                                <span class="text-muted">Acceptance Rate:</span>
                                                <span class="fw-bold text-success">${uni.acceptance}</span>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <span class="text-muted">Programs:</span>
                                                <span class="fw-bold text-truncate ms-2" style="max-width: 160px;">${uni.programs}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <a href="contact-us.html" class="btn btn-warning flex-grow-1 rounded-pill fw-bold fs-13 py-2" style="background-color: var(--button); color: var(--brand-primary); border: none;">
                                            Apply with Waiver
                                        </a>
                                        <a href="contact-us.html" class="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" style="width: 38px; height: 38px;" title="Details">
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
            };

            // Setup Search listener
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    searchQuery = e.target.value.trim();
                    render();
                });
            }

            // Setup Country Pills listener
            if (countryFilterContainer) {
                countryFilterContainer.querySelectorAll('.country-pill').forEach(pill => {
                    pill.addEventListener('click', () => {
                        countryFilterContainer.querySelectorAll('.country-pill').forEach(p => p.classList.remove('active'));
                        pill.classList.add('active');
                        currentCountry = pill.getAttribute('data-country') || 'All';
                        render();
                    });
                });
            }

            render();
        },

        // --- ADMIN DASHBOARD CMS CONTROLLER ---
        initAdminCMS: function () {
            // 1. Navigation Tabs Switcher
            const navLinks = document.querySelectorAll('.admin-nav-tab');
            const sections = document.querySelectorAll('.admin-view-panel');

            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('data-target');
                    
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');

                    sections.forEach(s => {
                        s.classList.remove('active');
                        if (s.id === targetId) {
                            s.classList.add('active');
                        }
                    });

                    // Update URL hash for bookmarking
                    if (history.pushState) {
                        history.pushState(null, null, '#' + targetId.replace('panel-', ''));
                    }
                });
            });

            // Check if page opened with hash e.g. #blogs or #universities
            const hash = window.location.hash.replace('#', '');
            if (hash) {
                const targetLink = document.querySelector(`.admin-nav-tab[data-target="panel-${hash}"]`);
                if (targetLink) targetLink.click();
            }

            // 2. Render Admin Blogs Table
            this.renderAdminBlogTable();

            // 3. Render Admin Universities Table
            this.renderAdminUniTable();

            // 4. Bind "Create New Blog" Form
            const blogForm = document.getElementById('adminNewBlogForm');
            if (blogForm) {
                // Live preview updates
                const titleInput = document.getElementById('blogTitleInput');
                const categoryInput = document.getElementById('blogCategoryInput');
                const summaryInput = document.getElementById('blogSummaryInput');
                const imageInput = document.getElementById('blogImageInput');

                const updatePreview = () => {
                    const prevTitle = document.getElementById('livePreviewBlogTitle');
                    const prevCategory = document.getElementById('livePreviewBlogCategory');
                    const prevSummary = document.getElementById('livePreviewBlogSummary');
                    const prevImage = document.getElementById('livePreviewBlogImage');

                    if (prevTitle) prevTitle.textContent = titleInput.value.trim() || 'Your Compelling Blog Title Here...';
                    if (prevCategory) prevCategory.textContent = categoryInput.value || 'Admissions';
                    if (prevSummary) prevSummary.textContent = summaryInput.value.trim() || 'A short, engaging teaser of your article will appear here...';
                    if (prevImage && imageInput.value) prevImage.src = imageInput.value;
                };

                [titleInput, categoryInput, summaryInput, imageInput].forEach(inp => {
                    if (inp) inp.addEventListener('input', updatePreview);
                });

                // Image preset buttons
                document.querySelectorAll('.image-preset-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const url = btn.getAttribute('data-url');
                        if (url && imageInput) {
                            imageInput.value = url;
                            updatePreview();
                        }
                    });
                });

                blogForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const newPost = {
                        title: titleInput.value,
                        category: categoryInput.value,
                        author: document.getElementById('blogAuthorInput').value || 'Alexander Morgan',
                        authorRole: document.getElementById('blogAuthorRoleInput').value || 'Admissions Director',
                        readTime: document.getElementById('blogReadTimeInput').value || '5 min read',
                        image: imageInput.value || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
                        summary: summaryInput.value,
                        content: document.getElementById('blogContentInput').value || summaryInput.value,
                        status: document.getElementById('blogStatusInput').value || 'published'
                    };

                    this.saveBlog(newPost);
                    this.showToast('Article Published!', `"${newPost.title}" is now live on the website.`);
                    blogForm.reset();
                    updatePreview();
                    this.renderAdminBlogTable();
                    this.updateAdminDashboardCounters();
                });
            }

            // 5. Bind "Create New University" Form
            const uniForm = document.getElementById('adminNewUniForm');
            if (uniForm) {
                uniForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const newUni = {
                        name: document.getElementById('uniNameInput').value,
                        country: document.getElementById('uniCountryInput').value,
                        ranking: document.getElementById('uniRankingInput').value || 'Top Global Tier',
                        tuition: document.getElementById('uniTuitionInput').value || 'Inquire',
                        acceptance: document.getElementById('uniAcceptanceInput').value || 'Rolling',
                        image: document.getElementById('uniImageInput').value || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
                        programs: document.getElementById('uniProgramsInput').value || 'Comprehensive Degrees',
                        tag: document.getElementById('uniTagInput').value || 'New Partner'
                    };

                    this.saveUni(newUni);
                    this.showToast('University Added!', `"${newUni.name}" added to the international directory.`);
                    uniForm.reset();
                    this.renderAdminUniTable();
                    this.updateAdminDashboardCounters();
                });
            }

            // 6. Bind Announcement Form
            const annForm = document.getElementById('adminAnnouncementForm');
            if (annForm) {
                const current = this.getAnnouncement();
                if (document.getElementById('annTitleInput')) document.getElementById('annTitleInput').value = current.title;
                if (document.getElementById('annBadgeInput')) document.getElementById('annBadgeInput').value = current.badge;
                if (document.getElementById('annMessageInput')) document.getElementById('annMessageInput').value = current.message;
                if (document.getElementById('annCtaTextInput')) document.getElementById('annCtaTextInput').value = current.ctaText;
                if (document.getElementById('annUrgencyInput')) document.getElementById('annUrgencyInput').value = current.urgency;
                if (document.getElementById('annEnabledInput')) document.getElementById('annEnabledInput').checked = current.enabled;

                annForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const updated = {
                        enabled: document.getElementById('annEnabledInput').checked,
                        urgency: document.getElementById('annUrgencyInput').value,
                        title: document.getElementById('annTitleInput').value,
                        badge: document.getElementById('annBadgeInput').value,
                        message: document.getElementById('annMessageInput').value,
                        ctaText: document.getElementById('annCtaTextInput').value,
                        ctaLink: document.getElementById('annCtaLinkInput').value || 'contact-us.html'
                    };
                    this.saveAnnouncement(updated);
                    this.showToast('Announcement Saved!', 'Live broadcast updated for visitors.');
                });
            }

            // 7. Update Dashboard KPI Badges
            this.updateAdminDashboardCounters();
        },

        renderAdminBlogTable: function () {
            const tableBody = document.getElementById('adminBlogsTableBody');
            if (!tableBody) return;

            const allBlogs = this.getAllBlogs();
            if (allBlogs.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No articles found. Click "Post New Blog" to create your first article.</td></tr>`;
                return;
            }

            tableBody.innerHTML = allBlogs.map(b => {
                const badgeClass = b.status === 'published' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-muted';
                const customLabel = b.isCustom ? `<span class="badge bg-primary text-white ms-1" style="font-size: 10px;">Custom</span>` : `<span class="badge bg-light text-muted ms-1" style="font-size: 10px;">Default</span>`;
                
                return `
                    <tr>
                        <td class="ps-4">
                            <div class="d-flex align-items-center gap-3">
                                <img src="${b.image}" width="44" height="44" class="rounded-3 object-fit-cover shadow-xs" alt="thumb" onerror="this.src='https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=100&q=80'"/>
                                <div>
                                    <div class="fw-bold text-dark text-truncate" style="max-width: 260px;">${b.title} ${customLabel}</div>
                                    <div class="text-muted fs-12">${b.date} • ${b.readTime}</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge bg-warning-subtle text-dark fw-bold">${b.category}</span></td>
                        <td>
                            <div class="fs-13 fw-semibold text-dark">${b.author}</div>
                            <div class="fs-11 text-muted">${b.authorRole || 'Author'}</div>
                        </td>
                        <td><span class="badge ${badgeClass} text-capitalize">${b.status}</span></td>
                        <td class="pe-4 text-end">
                            <div class="btn-group btn-group-sm">
                                <a href="blog-list.html" target="_blank" class="btn btn-outline-secondary" title="View on website">
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                </a>
                                ${b.isCustom ? `
                                    <button type="button" class="btn btn-outline-danger" onclick="if(confirm('Delete article: \\'${b.title}\\'?')){ window.EduCMS.deleteBlog('${b.id}'); window.EduCMS.renderAdminBlogTable(); window.EduCMS.updateAdminDashboardCounters(); window.EduCMS.showToast('Article Deleted', 'The post was removed.'); }" title="Delete post">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                ` : `
                                    <button type="button" class="btn btn-outline-secondary opacity-50" disabled title="Seed articles are protected">
                                        <i class="fa-solid fa-lock"></i>
                                    </button>
                                `}
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        },

        renderAdminUniTable: function () {
            const tableBody = document.getElementById('adminUniTableBody');
            if (!tableBody) return;

            const allUnis = this.getAllUnis();
            tableBody.innerHTML = allUnis.map(u => {
                const customLabel = u.isCustom ? `<span class="badge bg-primary text-white ms-1" style="font-size: 10px;">Custom</span>` : `<span class="badge bg-light text-muted ms-1" style="font-size: 10px;">Default</span>`;
                return `
                    <tr>
                        <td class="ps-4">
                            <div class="d-flex align-items-center gap-3">
                                <img src="${u.image}" width="44" height="44" class="rounded-3 object-fit-cover shadow-xs" alt="thumb" onerror="this.src='https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=100&q=80'"/>
                                <div>
                                    <div class="fw-bold text-dark text-truncate" style="max-width: 240px;">${u.name} ${customLabel}</div>
                                    <div class="text-muted fs-12">${u.country} • ${u.ranking}</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge bg-primary-subtle text-primary">${u.country}</span></td>
                        <td><div class="fs-13 fw-semibold text-dark">${u.tuition}</div></td>
                        <td><span class="badge bg-success-subtle text-success">${u.acceptance}</span></td>
                        <td class="pe-4 text-end">
                            <div class="btn-group btn-group-sm">
                                <a href="universities-list.html" target="_blank" class="btn btn-outline-secondary" title="View on website">
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                </a>
                                ${u.isCustom ? `
                                    <button type="button" class="btn btn-outline-danger" onclick="if(confirm('Delete university: \\'${u.name}\\'?')){ window.EduCMS.deleteUni('${u.id}'); window.EduCMS.renderAdminUniTable(); window.EduCMS.updateAdminDashboardCounters(); window.EduCMS.showToast('University Removed', 'The institution was removed.'); }" title="Delete university">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                ` : `
                                    <button type="button" class="btn btn-outline-secondary opacity-50" disabled title="Seed universities are protected">
                                        <i class="fa-solid fa-lock"></i>
                                    </button>
                                `}
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        },

        updateAdminDashboardCounters: function () {
            const blogCountEl = document.getElementById('adminTotalBlogsCounter');
            const uniCountEl = document.getElementById('adminTotalUnisCounter');
            
            if (blogCountEl) blogCountEl.textContent = this.getAllBlogs().length;
            if (uniCountEl) uniCountEl.textContent = this.getAllUnis().length;
        }
    };

    // Auto-initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // 1. Render Floating Mobile Bottom Dock on all pages
        EduCMS.renderMobileBottomDock();

        // 2. Render Top Announcement Banner on public pages
        EduCMS.renderAnnouncementBanner();

        // 3. Auto-detect page type
        const path = window.location.pathname.toLowerCase();
        if (path.includes('blog-list') || document.getElementById('dynamicBlogGrid')) {
            EduCMS.initBlogListPage();
        } else if (path.includes('universities-list') || document.getElementById('dynamicUniGrid')) {
            EduCMS.initUniListPage();
        } else if (path.includes('admin') || document.getElementById('adminBlogsTableBody')) {
            EduCMS.initAdminCMS();
        }
    });

    window.EduCMS = EduCMS;

})(window, document);
