/**
 * The Edu Consultant - Advanced Dynamic CMS Engine & Viewport Controller
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
    const STORAGE_PAGES = 'the_edu_custom_pages';
    const STORAGE_NAV = 'the_edu_custom_nav';
    const STORAGE_SETTINGS = 'the_edu_site_settings';

    // Seed Default Curated Articles
    const DEFAULT_BLOGS = [
        {
            id: 'blog-seed-1',
            title: 'How to Secure Scholarships for International Students',
            category: 'Scholarships',
            readTime: '4 min read',
            date: 'Nov 15th 2026',
            author: 'Faraz Ahamed',
            authorRole: 'Founder & Principal Consultant',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
            summary: 'Strategic insights on demonstrating academic merit, writing persuasive statement of purpose letters, and meeting early grant deadlines.',
            content: `Securing an international scholarship is one of the highest-leverage steps in your global education pathway. Top universities in the US, UK, Australia, Canada, and Europe allocate millions in dedicated endowment and diversity funds each intake.

### 1. Differentiate Academic Merit from Financial Need
Many universities operate merit-first evaluation rubrics. Highlight your class rank, extracurricular leadership, and specialized research milestones alongside your academic transcripts.

### 2. Tailor Your Statement of Purpose (SOP)
Avoid generic essays. Address the specific department faculty, mention lab facilities or research centers at the target university, and explain how their curriculum aligns with your 5-year post-graduation career roadmap.

### 3. Early Filing is Non-Negotiable
Scholarship committees evaluate applications on rolling admission cycles. Submitting your file 3 to 4 months prior to standard deadlines increases your grant probability by up to 60%.

Connect with The Edu Consultant advisors today to review institutional scholarship waivers for the upcoming 2026 intake.`,
            status: 'published',
            isCustom: false
        },
        {
            id: 'blog-seed-2',
            title: 'Application Masterclass: Ace Your Study Abroad File',
            category: 'Admissions',
            readTime: '6 min read',
            date: 'Nov 18th 2026',
            author: 'Faraz Ahamed',
            authorRole: 'Founder & Principal Consultant',
            image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
            summary: 'A step-by-step masterclass on avoiding critical SOP errors, securing compelling letters of recommendation, and transcript notarization.',
            content: `Admissions committees at competitive institutions review thousands of international files. Standing out requires an airtight, compelling dossier that highlights your trajectory.

### The Anatomy of a Winning File:
1. **Letters of Recommendation (LOR):** Request recommendations from professors or mentors who can comment specifically on your problem-solving resilience, not just your test scores.
2. **Credential Evaluation & Notarization:** Check whether your target institution requires WES or APS verification early to prevent administrative processing delays.
3. **Quantified Resume:** Highlight impact metrics in your resume—such as projects led, teams managed, and technical proficiencies mastered.

At The Edu Consultant, our advisors conduct complete diagnostic profile evaluations to maximize admissions success.`,
            status: 'published',
            isCustom: false
        },
        {
            id: 'blog-seed-3',
            title: 'Pre-Departure Orientation: Essential Guide for Life Abroad',
            category: 'Pre-Departure',
            readTime: '5 min read',
            date: 'Nov 22nd 2026',
            author: 'Faraz Ahamed',
            authorRole: 'Founder & Principal Consultant',
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
            author: 'Faraz Ahamed',
            authorRole: 'Founder & Principal Consultant',
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

    // Seed Default Curated Pages
    const DEFAULT_PAGES = [
        {
            id: 'page-seed-visa',
            slug: 'visa-guide',
            title: 'Complete Student Visa & Financial Proof Guide 2026',
            category: 'Visa Guidance',
            heroTitle: 'Comprehensive Student Visa Documentation & Embassy Masterclass',
            heroSubtitle: 'A definitive roadmap for navigating financial sponsorship, statement of purpose for embassy interviews, and biometric protocols for USA, UK, Canada, Australia, and Germany.',
            coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
            author: 'Faraz Ahamed',
            authorRole: 'Founder & Principal Consultant',
            updatedAt: 'October 2026',
            status: 'published',
            isCustom: false,
            content: `International student visa compliance requires precision, meticulous documentation, and strategic clarity. Top destination embassies continue to raise scrutiny on genuine student intentions and financial liquidity.

### 1. Proof of Financial Capability (Funds & Solvency)
Embassy adjudicators require verifiable proof that tuition and living expenses for at least the first 12 to 24 months are readily accessible in liquid or approved educational loan accounts.
- **Bank Statements:** Ensure funds are seasoned for the required minimum duration (typically 28 days for UK Tier 4, 3 to 6 months for US and Canada).
- **Sponsorship Letters:** Formal affidavits of support accompanied by tax returns and employment verification from primary sponsors.

### 2. Crafting a Genuine Student Statement
Whether drafting the Australian Genuine Student (GS) submission or the UK CAS statement, clearly articulate:
- Why this specific curriculum cannot be replicated in your home country.
- The precise economic ROI and projected career salary upon return.
- Thorough knowledge of the target university's research faculty, campus location, and graduation outcomes.

### 3. Embassy Interview Preparation
Practice concise, honest, and proactive answers. Demonstrate deep familiarity with your course modules and future employer targets.

Connect with The Edu Consultant authorized visa counselors to conduct mock visa interviews and dossier verifications.`
        },
        {
            id: 'page-seed-scholarships',
            slug: 'scholarship-handbook',
            title: '2026 Global Merit & Diversity Scholarship Handbook',
            category: 'Funding & Grants',
            heroTitle: 'Institutional Waivers & Full-Ride Scholarship Directory',
            heroSubtitle: 'Unlock fully-funded government awards, university endowment stipends, and graduate assistantships across leading world universities.',
            coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
            author: 'Faraz Ahamed',
            authorRole: 'Founder & Principal Consultant',
            updatedAt: 'October 2026',
            status: 'published',
            isCustom: false,
            content: `Securing external and institutional scholarships can reduce the net financial commitment of your overseas degree by 30% to 100%.

### 1. Types of International Scholarships Available:
- **Government Prestigious Awards:** Fulbright (USA), Chevening & Commonwealth (UK), Australia Awards, DAAD (Germany).
- **University Merit Waivers:** Automatic fee discounts ranging from $5,000 to full tuition based on GPA and standardized testing.
- **Graduate Assistantships (RA/TA):** Tuition waivers combined with monthly living stipends in exchange for departmental research or tutoring.

### 2. Strategic Timeline:
Scholarship filing deadlines typically close 4 to 8 months earlier than standard intake deadlines. Filing during September to December for Fall admissions yields the highest consideration rate.

Our advisory team assists students in mapping and submitting eligible institutional grant applications with verified fee waivers.`
        },
        {
            id: 'page-seed-career',
            slug: 'post-study-work-visas',
            title: 'Post-Study Work Visas & Global Career Pathways',
            category: 'Career Pathways',
            heroTitle: 'Post-Study Work Rights, STEM Extensions & Global Employment',
            heroSubtitle: 'Comparative analysis of post-study graduate employment visas, STEM extensions, and permanent residency options across Australia, the UK, Canada, and the United States.',
            coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
            author: 'Faraz Ahamed',
            authorRole: 'Founder & Principal Consultant',
            updatedAt: 'October 2026',
            status: 'published',
            isCustom: false,
            content: `A foreign degree is an international career accelerator. Understanding local work rights after graduation allows you to maximize your global return on investment.

### 1. Key Country Post-Study Work Frameworks:
- **United Kingdom (Graduate Route):** 2 years for Bachelor's/Master's; 3 years for Doctoral degrees without sponsor requirement.
- **United States (OPT / STEM OPT):** 12 months standard Optional Practical Training, extendable by 24 additional months for STEM designated degree programs (36 months total).
- **Canada (PGWP):** Up to 3 years Post-Graduation Work Permit for full-time degree programs at designated learning institutions.
- **Australia (Subclass 485):** Graduate work authorization with regional study bonuses offering extra post-study years.

### 2. Proactive Career Planning:
Start internship networking during your second semester. Utilize university career fairs, alumni networks on LinkedIn, and campus industry liaisons to secure qualifying corporate roles.`
        }
    ];

    // Seed Default Nav Items (Custom dropdowns created by owner in Admin CMS)
    const DEFAULT_NAV = [];

    // Default Global Site Settings
    const DEFAULT_SETTINGS = {
        brandName: 'The Edu Consultant',
        tagline: 'Premier Global University Admissions & Visa Advisory',
        supportEmail: 'enquiry@theeduconsultant.com',
        adminEmail: 'adm.faraz@gmail.com',
        noreplyEmail: 'noreply@theeduconsultant.com',
        supportPhone: '+91 9845371459',
        whatsappNumber: '+91 9845371459',
        officeAddress: 'Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025',
        workingHours: 'Mon - Sat: 9:00 AM - 8:00 PM IST',
        socialTwitter: 'https://twitter.com',
        socialLinkedin: 'https://linkedin.com',
        socialInstagram: 'https://instagram.com',
        socialFacebook: 'https://facebook.com',
        copyrightNotice: '© 2026 The Edu Consultant. All rights reserved.'
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
            let needsResave = false;
            custom.forEach(b => {
                const a = (b.author || '').toLowerCase();
                if (!a.includes('faraz')) {
                    b.author = 'Faraz Ahamed';
                    b.authorRole = 'Founder & Principal Consultant';
                    needsResave = true;
                }
            });
            if (needsResave) {
                this.saveCustomBlogs(custom);
            }

            const all = [...custom, ...DEFAULT_BLOGS];
            all.forEach(b => {
                const a = (b.author || '').toLowerCase();
                if (!a.includes('faraz')) {
                    b.author = 'Faraz Ahamed';
                    b.authorRole = 'Founder & Principal Consultant';
                }
            });
            return all;
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
            const safeAuthor = window.EduSecurity ? window.EduSecurity.sanitizeText(blogData.author) : (blogData.author || 'Faraz Ahamed');

            const custom = this.getCustomBlogs();
            const newBlog = {
                id: 'blog-custom-' + Date.now(),
                title: safeTitle,
                category: safeCategory,
                readTime: blogData.readTime || '4 min read',
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                author: safeAuthor,
                authorRole: blogData.authorRole || 'Founder & Principal Consultant',
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

        // --- CUSTOM PAGES CMS ---
        getCustomPages: function () {
            try {
                const data = localStorage.getItem(STORAGE_PAGES);
                return data ? JSON.parse(data) : [];
            } catch (e) {
                return [];
            }
        },

        saveCustomPages: function (pages) {
            localStorage.setItem(STORAGE_PAGES, JSON.stringify(pages));
        },

        getPages: function () {
            const custom = this.getCustomPages();
            let needsResave = false;
            custom.forEach(p => {
                const a = (p.author || '').toLowerCase();
                if (!a.includes('faraz')) {
                    p.author = 'Faraz Ahamed';
                    p.authorRole = 'Founder & Principal Consultant';
                    needsResave = true;
                }
            });
            if (needsResave) {
                this.saveCustomPages(custom);
            }

            const all = [...custom, ...DEFAULT_PAGES];
            all.forEach(p => {
                const a = (p.author || '').toLowerCase();
                if (!a.includes('faraz')) {
                    p.author = 'Faraz Ahamed';
                    p.authorRole = 'Founder & Principal Consultant';
                }
            });
            return all;
        },

        savePage: function (pageData) {
            const user = (window.edAuth && window.edAuth.getUser) ? window.edAuth.getUser() : null;
            if (window.EduSecurity && !window.EduSecurity.hasPermission(user, 'create_blog')) {
                this.showToast('Authorization Denied (403)', 'Only Admissions Directors and Site Owners may create pages.', 'danger');
                return null;
            }

            // Image Source Security Check
            if (window.EduSecurity && pageData.coverImage) {
                const imgCheck = window.EduSecurity.validateImageSource(pageData.coverImage);
                if (!imgCheck.valid) {
                    this.showToast('Security Alert', imgCheck.message, 'danger');
                    return null;
                }
            }

            // Generate clean slug
            let cleanSlug = (pageData.slug || pageData.title || 'custom-page')
                .toLowerCase()
                .replace(/[^a-z0-9\- ]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            if (!cleanSlug) cleanSlug = 'custom-page-' + Date.now();

            const safeTitle = window.EduSecurity ? window.EduSecurity.sanitizeText(pageData.title) : pageData.title.trim();
            const safeCategory = window.EduSecurity ? window.EduSecurity.sanitizeText(pageData.category || 'General') : (pageData.category || 'General');
            const safeHeroTitle = window.EduSecurity ? window.EduSecurity.sanitizeText(pageData.heroTitle || safeTitle) : (pageData.heroTitle || safeTitle);
            const safeHeroSubtitle = window.EduSecurity ? window.EduSecurity.sanitizeText(pageData.heroSubtitle || '') : (pageData.heroSubtitle || '');
            const safeAuthor = window.EduSecurity ? window.EduSecurity.sanitizeText(pageData.author || (user ? user.name : 'The Edu Consultant Editorial')) : (pageData.author || 'The Edu Consultant Editorial');
            const safeContent = window.EduSecurity ? window.EduSecurity.sanitizeHTML(pageData.content) : pageData.content.trim();

            const custom = this.getCustomPages();
            const newPage = {
                id: 'page-custom-' + Date.now(),
                slug: cleanSlug,
                title: safeTitle,
                category: safeCategory,
                heroTitle: safeHeroTitle,
                heroSubtitle: safeHeroSubtitle,
                coverImage: pageData.coverImage || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
                author: safeAuthor,
                updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                status: pageData.status || 'published',
                content: safeContent,
                isCustom: true,
                createdAt: Date.now()
            };

            const existingIdx = custom.findIndex(p => p.slug === cleanSlug);
            if (existingIdx >= 0) {
                custom[existingIdx] = newPage;
            } else {
                custom.unshift(newPage);
            }

            this.saveCustomPages(custom);
            return newPage;
        },

        deletePage: function (pageId) {
            let custom = this.getCustomPages();
            custom = custom.filter(p => p.id !== pageId);
            this.saveCustomPages(custom);
        },

        // --- DYNAMIC NAVBAR & DROPDOWNS CMS ---
        getCustomNav: function () {
            try {
                const data = localStorage.getItem(STORAGE_NAV);
                return data ? JSON.parse(data) : [];
            } catch (e) {
                return [];
            }
        },

        saveCustomNav: function (items) {
            localStorage.setItem(STORAGE_NAV, JSON.stringify(items));
        },

        getNavItems: function () {
            const custom = this.getCustomNav();
            return [...custom, ...DEFAULT_NAV];
        },

        addNavDropdown: function (label, icon) {
            const safeLabel = window.EduSecurity ? window.EduSecurity.sanitizeText(label) : label.trim();
            const safeIcon = (icon || 'fa-folder-open').trim();

            const custom = this.getCustomNav();
            const newDropdown = {
                id: 'nav-drop-' + Date.now(),
                label: safeLabel,
                icon: safeIcon,
                type: 'dropdown',
                isCustom: true,
                items: []
            };
            custom.push(newDropdown);
            this.saveCustomNav(custom);
            return newDropdown;
        },

        addNavLinkToDropdown: function (dropdownId, label, url) {
            const safeLabel = window.EduSecurity ? window.EduSecurity.sanitizeText(label) : label.trim();
            const safeUrl = (url || '#').trim();

            let custom = this.getCustomNav();
            const target = custom.find(d => d.id === dropdownId);
            if (target) {
                if (!target.items) target.items = [];
                target.items.push({ label: safeLabel, url: safeUrl });
                this.saveCustomNav(custom);
                return true;
            }
            return false;
        },

        deleteNavItem: function (navId) {
            let custom = this.getCustomNav();
            custom = custom.filter(i => i.id !== navId);
            this.saveCustomNav(custom);
        },

        deleteNavSubLink: function (dropdownId, subIndex) {
            let custom = this.getCustomNav();
            const target = custom.find(d => d.id === dropdownId);
            if (target && target.items && target.items[subIndex] !== undefined) {
                target.items.splice(subIndex, 1);
                this.saveCustomNav(custom);
                return true;
            }
            return false;
        },

        renderCustomNavbar: function () {
            // A. Dynamically append any custom CMS pages created by Owner into the native Resources dropdown
            const customPages = this.getCustomPages ? this.getCustomPages() : [];
            const resDropdowns = document.querySelectorAll('#navResourcesDropdown, #mobileResourcesDropdown');
            if (customPages.length > 0 && resDropdowns.length > 0) {
                resDropdowns.forEach(menu => {
                    menu.querySelectorAll('.cms-injected-page').forEach(el => el.remove());
                    customPages.forEach(p => {
                        const li = document.createElement('li');
                        li.className = 'cms-injected-page';
                        li.innerHTML = `<a class="dropdown-item py-2" href="page.html?slug=${encodeURIComponent(p.slug)}"><i class="fa-solid fa-file-lines me-2 text-primary fs-12"></i> ${p.title}</a>`;
                        menu.appendChild(li);
                    });
                });
            }

            const navItems = this.getNavItems();
            if (!navItems || navItems.length === 0) return;

            // 1. Desktop Header
            const desktopNav = document.querySelector('header .navbar-nav');
            if (desktopNav) {
                desktopNav.querySelectorAll('.custom-nav-item').forEach(el => el.remove());

                let contactItem = null;
                desktopNav.querySelectorAll('li.nav-item').forEach(li => {
                    const txt = li.textContent ? li.textContent.trim().toLowerCase() : '';
                    if (txt.includes('contact')) {
                        contactItem = li;
                    }
                });

                navItems.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'nav-item dropdown custom-nav-item';

                    if (item.type === 'dropdown' && item.items && item.items.length > 0) {
                        const sublinksHtml = item.items.map(sub => 
                            `<li><a class="dropdown-item py-2" href="${sub.url}"><i class="fa-solid fa-chevron-right me-2 text-warning fs-11"></i> ${sub.label}</a></li>`
                        ).join('');

                        li.innerHTML = `
                            <a class="nav-link dropdown-toggle fw-semibold" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid ${item.icon || 'fa-folder-open'} me-1 text-primary"></i> ${item.label}
                            </a>
                            <ul class="dropdown-menu shadow border-0 rounded-3 mt-1 py-2" style="min-width: 220px;">
                                ${sublinksHtml}
                            </ul>
                        `;
                    } else {
                        li.innerHTML = `
                            <a class="nav-link fw-semibold" href="${item.url || '#'}">
                                <i class="fa-solid ${item.icon || 'fa-link'} me-1 text-primary"></i> ${item.label}
                            </a>
                        `;
                    }

                    if (contactItem) {
                        desktopNav.insertBefore(li, contactItem);
                    } else {
                        desktopNav.appendChild(li);
                    }
                });
            }

            // 2. Mobile Offcanvas Menu
            const mobileNav = document.querySelector('.offcanvas .menu-navbar-nav');
            if (mobileNav) {
                mobileNav.querySelectorAll('.custom-nav-item').forEach(el => el.remove());

                let contactItem = null;
                mobileNav.querySelectorAll('li.nav-item').forEach(li => {
                    const txt = li.textContent ? li.textContent.trim().toLowerCase() : '';
                    if (txt.includes('contact')) {
                        contactItem = li;
                    }
                });

                navItems.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'nav-item dropdown custom-nav-item';

                    if (item.type === 'dropdown' && item.items && item.items.length > 0) {
                        const sublinksHtml = item.items.map(sub => 
                            `<li><a class="dropdown-item py-1.5 text-dark fs-14" href="${sub.url}"><i class="fa-solid fa-arrow-right fs-10 text-warning me-2"></i> ${sub.label}</a></li>`
                        ).join('');

                        li.innerHTML = `
                            <a class="nav-link dropdown-toggle fw-semibold" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid ${item.icon || 'fa-folder-open'} me-2 text-warning"></i> ${item.label}
                            </a>
                            <ul class="dropdown-menu border-0 bg-light rounded-3 ms-3 py-1">
                                ${sublinksHtml}
                            </ul>
                        `;
                    } else {
                        li.innerHTML = `
                            <a class="nav-link fw-semibold" href="${item.url || '#'}">
                                <i class="fa-solid ${item.icon || 'fa-link'} me-2 text-warning"></i> ${item.label}
                            </a>
                        `;
                    }

                    if (contactItem) {
                        mobileNav.insertBefore(li, contactItem);
                    } else {
                        mobileNav.appendChild(li);
                    }
                });
            }
        },

        // --- GLOBAL WEBSITE SETTINGS ---
        getSettings: function () {
            try {
                const data = localStorage.getItem(STORAGE_SETTINGS);
                return data ? Object.assign({}, DEFAULT_SETTINGS, JSON.parse(data)) : DEFAULT_SETTINGS;
            } catch (e) {
                return DEFAULT_SETTINGS;
            }
        },

        saveSettings: function (newSettings) {
            const merged = Object.assign({}, this.getSettings(), newSettings);
            localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(merged));
            this.applyGlobalSettings();
            return merged;
        },

        applyGlobalSettings: function () {
            const s = this.getSettings();
            if (!s) return;

            // Brand name
            if (s.brandName) {
                document.querySelectorAll('.global-brand-name').forEach(el => el.textContent = s.brandName);
            }

            // Support Phone
            if (s.supportPhone) {
                document.querySelectorAll('.global-phone-val').forEach(el => el.textContent = s.supportPhone);
                const pDisp = document.getElementById('sidebarPhoneDisplay');
                if (pDisp) pDisp.textContent = s.supportPhone;
                document.querySelectorAll('a[href^="tel:"]').forEach(a => a.href = 'tel:' + s.supportPhone.replace(/[^0-9+]/g, ''));
            }

            // Support Email
            if (s.supportEmail) {
                document.querySelectorAll('.global-email-val').forEach(el => el.textContent = s.supportEmail);
                const eDisp = document.getElementById('sidebarEmailDisplay');
                if (eDisp) eDisp.textContent = s.supportEmail;
                document.querySelectorAll('a[href^="mailto:"]').forEach(a => a.href = 'mailto:' + s.supportEmail);
            }

            // Office Address
            if (s.officeAddress) {
                document.querySelectorAll('.global-address-val').forEach(el => el.textContent = s.officeAddress);
            }

            // Copyright notice
            if (s.copyrightNotice) {
                document.querySelectorAll('.copyright-text, .footer-copywrite').forEach(el => el.textContent = s.copyrightNotice);
            }

            // Social media links
            if (s.socialTwitter) {
                document.querySelectorAll('a[href*="twitter.com"], a.social-twitter').forEach(a => a.href = s.socialTwitter);
            }
            if (s.socialLinkedin) {
                document.querySelectorAll('a[href*="linkedin.com"], a.social-linkedin').forEach(a => a.href = s.socialLinkedin);
            }
            if (s.socialInstagram) {
                document.querySelectorAll('a[href*="instagram.com"], a.social-instagram').forEach(a => a.href = s.socialInstagram);
            }
            if (s.socialFacebook) {
                document.querySelectorAll('a[href*="facebook.com"], a.social-facebook').forEach(a => a.href = s.socialFacebook);
            }
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
            const user = (window.edAuth && window.edAuth.getUser) ? window.edAuth.getUser() : null;
            const isStaff = user && (user.role === 'Admin' || user.role === 'Counselor' || (user.role && user.role.toLowerCase().includes('director')));
            const fifthHref = isStaff ? 'admin-dashboard.html' : 'student-dashboard.html';
            const fifthLabel = isStaff ? 'Admin' : 'Portal';
            const fifthIcon = isStaff ? 'fa-sliders' : 'fa-graduation-cap';
            const isFifthActive = currentPage === fifthHref;

            dock.innerHTML = `
                <a href="index.html" class="dock-item ${isHome ? 'active' : ''}">
                    <i class="fa-solid fa-house"></i>
                    <span>Home</span>
                </a>
                <a href="universities-list.html" class="dock-item ${isUnis ? 'active' : ''}">
                    <i class="fa-solid fa-building-columns"></i>
                    <span>Universities</span>
                </a>
                <button type="button" class="dock-item dock-item-highlight" id="dockConnectTrigger" title="Connect With Us (Call & WhatsApp)">
                    <div class="dock-highlight-circle" style="background: linear-gradient(135deg, #25d366 0%, #128c7e 100%); box-shadow: 0 4px 14px rgba(37, 211, 102, 0.45);">
                        <i class="fa-solid fa-phone-volume text-white" style="font-size: 15px;"></i>
                    </div>
                    <span style="font-weight: 800; color: #15803d;">Connect</span>
                </button>
                <a href="blog-list.html" class="dock-item ${isBlogs ? 'active' : ''}">
                    <div class="position-relative">
                        <i class="fa-solid fa-newspaper"></i>
                        <span class="dock-badge-dot"></span>
                    </div>
                    <span>Articles</span>
                </a>
                <a href="${fifthHref}" class="dock-item ${isFifthActive ? 'active' : ''}">
                    <i class="fa-solid ${fifthIcon}"></i>
                    <span>${fifthLabel}</span>
                </a>
            `;

            document.body.appendChild(dock);

            // Connect Trigger in Mobile Dock (Toggles native bottom sheet action drawer)
            const dockConnect = document.getElementById('dockConnectTrigger');
            if (dockConnect) {
                const handleConnect = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.EduLeads && typeof window.EduLeads.toggleConnectCard === 'function') {
                        window.EduLeads.toggleConnectCard();
                    } else {
                        const card = document.getElementById('eduConnectCard');
                        if (card) {
                            card.classList.toggle('active');
                        } else if (window.EduLeads && typeof window.EduLeads.openMeetingModal === 'function') {
                            window.EduLeads.openMeetingModal();
                        }
                    }
                };
                dockConnect.addEventListener('click', handleConnect);
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
                    const authorName = 'Faraz Ahamed';
                    const authorInitials = 'FA';
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
                                                ${authorInitials}
                                            </div>
                                            <span class="fs-13 fw-semibold text-dark">${authorName}</span>
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
            };

            // Event delegation for opening articles (works with pre-rendered and dynamic cards)
            container.addEventListener('click', (e) => {
                const btn = e.target.closest('.read-article-btn');
                if (btn) {
                    const id = btn.getAttribute('data-id');
                    const allBlogs = this.getAllBlogs();
                    const item = allBlogs.find(b => b.id === id);
                    if (item) {
                        this.openBlogReaderModal(item);
                    }
                }
            });

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
            document.getElementById('modalBlogAuthor').innerHTML = `<i class="fa-regular fa-user me-1"></i> Faraz Ahamed (Founder & Principal Consultant)`;
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

            // 4. Render Admin Student & Scholar Accounts Hub Table
            this.renderAdminUsersTable();
            this.updateAdminDashboardCounters();

            // 5. Bind "Create New Blog" Form
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
                        author: (document.getElementById('blogAuthorInput') && document.getElementById('blogAuthorInput').value.trim()) || 'Faraz Ahamed',
                        authorRole: (document.getElementById('blogAuthorRoleInput') && document.getElementById('blogAuthorRoleInput').value.trim()) || 'Founder & Principal Consultant',
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

            // 7. Bind "Page Builder Studio" Form
            const pageForm = document.getElementById('adminNewPageForm');
            if (pageForm) {
                const titleInput = document.getElementById('pageTitleInput');
                const slugInput = document.getElementById('pageSlugInput');
                const catInput = document.getElementById('pageCategoryInput');
                const heroTitleInput = document.getElementById('pageHeroTitleInput');
                const heroSubInput = document.getElementById('pageHeroSubtitleInput');
                const coverInput = document.getElementById('pageCoverImageInput');
                const authorInput = document.getElementById('pageAuthorInput');
                const statusInput = document.getElementById('pageStatusInput');
                const contentInput = document.getElementById('pageContentInput');

                let userSlugEdited = false;
                if (slugInput) {
                    slugInput.addEventListener('input', () => { userSlugEdited = true; });
                }

                const generateSlug = (val) => {
                    return val.toLowerCase()
                        .replace(/[^a-z0-9\- ]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/-+/g, '-')
                        .trim();
                };

                const updatePagePreview = () => {
                    const prevTitle = document.getElementById('livePreviewPageTitle');
                    const prevSlug = document.getElementById('livePreviewPageSlug');
                    const prevCat = document.getElementById('livePreviewPageCategory');
                    const prevHero = document.getElementById('livePreviewPageHero');
                    const prevContent = document.getElementById('livePreviewPageContent');
                    const prevImage = document.getElementById('livePreviewPageImage');

                    const titleVal = titleInput ? titleInput.value.trim() : '';
                    if (!userSlugEdited && titleInput && slugInput && titleVal) {
                        slugInput.value = generateSlug(titleVal);
                    }

                    if (prevTitle) prevTitle.textContent = titleVal || 'Your Webpage Title';
                    if (prevSlug && slugInput) prevSlug.textContent = 'page.html?slug=' + (slugInput.value || 'custom-page');
                    if (prevCat && catInput) prevCat.textContent = catInput.value || 'Admissions';
                    if (prevHero && heroTitleInput) prevHero.textContent = heroTitleInput.value.trim() || titleVal || 'Page Hero Headline';
                    if (prevContent && contentInput) {
                        const snippet = contentInput.value.trim().substring(0, 180);
                        prevContent.textContent = snippet ? snippet + '...' : 'Your comprehensive page content, guidance paragraphs, and advisory roadmap will appear here...';
                    }
                    if (prevImage && coverInput && coverInput.value) prevImage.src = coverInput.value;
                };

                [titleInput, slugInput, catInput, heroTitleInput, heroSubInput, coverInput, contentInput].forEach(inp => {
                    if (inp) inp.addEventListener('input', updatePagePreview);
                });

                const autoSlugBtn = document.getElementById('autoGenerateSlugBtn');
                if (autoSlugBtn && titleInput && slugInput) {
                    autoSlugBtn.addEventListener('click', () => {
                        slugInput.value = generateSlug(titleInput.value.trim() || 'page-' + Date.now());
                        userSlugEdited = true;
                        updatePagePreview();
                    });
                }

                document.querySelectorAll('.page-image-preset-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const url = btn.getAttribute('data-url');
                        if (url && coverInput) {
                            coverInput.value = url;
                            updatePagePreview();
                        }
                    });
                });

                pageForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const newPage = {
                        title: titleInput.value,
                        slug: slugInput ? slugInput.value : '',
                        category: catInput ? catInput.value : 'Admissions',
                        heroTitle: heroTitleInput ? heroTitleInput.value : titleInput.value,
                        heroSubtitle: heroSubInput ? heroSubInput.value : '',
                        coverImage: coverInput ? coverInput.value : '',
                        author: authorInput ? authorInput.value : 'The Edu Consultant Editorial',
                        status: statusInput ? statusInput.value : 'published',
                        content: contentInput ? contentInput.value : ''
                    };

                    const saved = this.savePage(newPage);
                    if (saved) {
                        this.showToast('Page Published & Live!', `"${saved.title}" is now active at page.html?slug=${saved.slug}`);
                        pageForm.reset();
                        userSlugEdited = false;
                        updatePagePreview();
                        this.renderAdminPagesTable();
                        this.renderAdminNavManager();
                        this.updateAdminDashboardCounters();
                    }
                });
            }

            // 8. Bind "Dynamic Navbar Manager" Forms
            const dropdownForm = document.getElementById('adminNewDropdownForm');
            if (dropdownForm) {
                dropdownForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const labelInput = document.getElementById('navDropdownLabelInput');
                    const iconInput = document.getElementById('navDropdownIconInput');

                    if (!labelInput || !labelInput.value.trim()) return;

                    const added = this.addNavDropdown(labelInput.value, iconInput ? iconInput.value : 'fa-folder-open');
                    this.showToast('Dropdown Menu Created!', `"${added.label}" added to the global website navbar.`);
                    dropdownForm.reset();
                    this.renderAdminNavManager();
                    this.renderCustomNavbar();
                    this.updateAdminDashboardCounters();
                });
            }

            const addSublinkForm = document.getElementById('adminAddSublinkForm');
            if (addSublinkForm) {
                const presetSelect = document.getElementById('adminSublinkPagePresetSelect');
                const titleInput = document.getElementById('adminSublinkTitleInput');
                const urlInput = document.getElementById('adminSublinkUrlInput');

                if (presetSelect) {
                    presetSelect.addEventListener('change', () => {
                        const selectedOpt = presetSelect.options[presetSelect.selectedIndex];
                        if (selectedOpt && selectedOpt.value) {
                            if (urlInput) urlInput.value = selectedOpt.value;
                            if (titleInput && selectedOpt.getAttribute('data-title')) {
                                titleInput.value = selectedOpt.getAttribute('data-title');
                            }
                        }
                    });
                }

                addSublinkForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const dropSelect = document.getElementById('adminSublinkDropdownSelect');
                    if (!dropSelect || !dropSelect.value) {
                        this.showToast('Select Dropdown', 'Please choose a target dropdown menu.', 'danger');
                        return;
                    }
                    if (!titleInput || !titleInput.value.trim()) {
                        this.showToast('Missing Title', 'Please enter a title for the link.', 'danger');
                        return;
                    }

                    const targetDropId = dropSelect.value;
                    const linkLabel = titleInput.value;
                    const linkUrl = urlInput ? urlInput.value : '#';

                    this.addNavLinkToDropdown(targetDropId, linkLabel, linkUrl);
                    this.showToast('Link Linked to Menu!', `"${linkLabel}" successfully linked to navbar dropdown.`);
                    if (titleInput) titleInput.value = '';
                    if (urlInput) urlInput.value = '';
                    if (presetSelect) presetSelect.value = '';
                    this.renderAdminNavManager();
                    this.renderCustomNavbar();
                });
            }

            // 9. Bind "Global Website Settings" Form
            const settingsForm = document.getElementById('adminGlobalSettingsForm');
            if (settingsForm) {
                const s = this.getSettings();
                const bNameInp = document.getElementById('settingBrandNameInput');
                const tagInp = document.getElementById('settingTaglineInput');
                const phoneInp = document.getElementById('settingPhoneInput');
                const emailInp = document.getElementById('settingEmailInput');
                const waInp = document.getElementById('settingWhatsappInput');
                const addrInp = document.getElementById('settingAddressInput');
                const hrsInp = document.getElementById('settingHoursInput');
                const twInp = document.getElementById('settingTwitterInput');
                const liInp = document.getElementById('settingLinkedinInput');
                const igInp = document.getElementById('settingInstagramInput');
                const fbInp = document.getElementById('settingFacebookInput');
                const copyInp = document.getElementById('settingCopyrightInput');

                if (bNameInp) bNameInp.value = s.brandName || '';
                if (tagInp) tagInp.value = s.tagline || '';
                if (phoneInp) phoneInp.value = s.supportPhone || '';
                if (emailInp) emailInp.value = s.supportEmail || '';
                if (waInp) waInp.value = s.whatsappNumber || '';
                if (addrInp) addrInp.value = s.officeAddress || '';
                if (hrsInp) hrsInp.value = s.workingHours || '';
                if (twInp) twInp.value = s.socialTwitter || '';
                if (liInp) liInp.value = s.socialLinkedin || '';
                if (igInp) igInp.value = s.socialInstagram || '';
                if (fbInp) fbInp.value = s.socialFacebook || '';
                if (copyInp) copyInp.value = s.copyrightNotice || '';

                settingsForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const updatedSettings = {
                        brandName: bNameInp ? bNameInp.value.trim() : s.brandName,
                        tagline: tagInp ? tagInp.value.trim() : s.tagline,
                        supportPhone: phoneInp ? phoneInp.value.trim() : s.supportPhone,
                        supportEmail: emailInp ? emailInp.value.trim() : s.supportEmail,
                        whatsappNumber: waInp ? waInp.value.trim() : s.whatsappNumber,
                        officeAddress: addrInp ? addrInp.value.trim() : s.officeAddress,
                        workingHours: hrsInp ? hrsInp.value.trim() : s.workingHours,
                        socialTwitter: twInp ? twInp.value.trim() : s.socialTwitter,
                        socialLinkedin: liInp ? liInp.value.trim() : s.socialLinkedin,
                        socialInstagram: igInp ? igInp.value.trim() : s.socialInstagram,
                        socialFacebook: fbInp ? fbInp.value.trim() : s.socialFacebook,
                        copyrightNotice: copyInp ? copyInp.value.trim() : s.copyrightNotice
                    };

                    this.saveSettings(updatedSettings);
                    this.showToast('Global Settings Saved!', 'Brand details, contact info, and footers updated across all pages.');
                });
            }

            // 10. Bind Owner Profile & Password Form
            this.initAdminOwnerPanel();

            // 11. Initial Render of Pages & Nav Tables
            this.renderAdminPagesTable();
            this.renderAdminNavManager();

            // 12. Update Dashboard KPI Badges
            this.updateAdminDashboardCounters();
        },

        initAdminOwnerPanel: function () {
            const owner = window.edAuth && window.edAuth.getOwnerCreds ? window.edAuth.getOwnerCreds() : null;
            if (!owner) return;

            const nameInput = document.getElementById('ownerNameInput');
            const emailInput = document.getElementById('ownerEmailInput');
            const avatarInput = document.getElementById('ownerAvatarInput');
            const previewAvatar = document.getElementById('ownerAvatarPreview');

            if (nameInput) nameInput.value = owner.name || 'The Edu Consultant Owner';
            if (emailInput) emailInput.value = owner.email || 'admin@theeduconsultant.com';
            if (avatarInput) avatarInput.value = owner.avatar || '';
            if (previewAvatar && owner.avatar) previewAvatar.src = owner.avatar;

            // Avatar preset buttons
            document.querySelectorAll('.owner-avatar-preset-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const url = btn.getAttribute('data-url');
                    if (url && avatarInput) {
                        avatarInput.value = url;
                        if (previewAvatar) previewAvatar.src = url;
                    }
                });
            });

            if (avatarInput && previewAvatar) {
                avatarInput.addEventListener('input', () => {
                    previewAvatar.src = avatarInput.value;
                });
            }

            // Owner Profile Form submit
            const profileForm = document.getElementById('adminOwnerProfileForm');
            if (profileForm) {
                profileForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const newName = nameInput ? nameInput.value : '';
                    const newEmail = emailInput ? emailInput.value : '';
                    const newAvatar = avatarInput ? avatarInput.value : '';

                    if (window.edAuth && window.edAuth.updateOwnerProfile) {
                        window.edAuth.updateOwnerProfile(newName, newEmail, newAvatar);
                        document.querySelectorAll('.dashboard-admin-name').forEach(el => el.textContent = newName);
                        document.querySelectorAll('.dashboard-admin-avatar').forEach(el => {
                            if (newAvatar) el.src = newAvatar;
                        });
                        const topLabel = document.getElementById('topRoleSwitcherLabel');
                        if (topLabel) topLabel.textContent = newName;
                    }
                });
            }

            // Owner Password Form submit
            const passForm = document.getElementById('adminOwnerPasswordForm');
            if (passForm) {
                passForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const currentPass = document.getElementById('ownerCurrentPassInput') ? document.getElementById('ownerCurrentPassInput').value : '';
                    const newPass = document.getElementById('ownerNewPassInput') ? document.getElementById('ownerNewPassInput').value : '';
                    const confirmPass = document.getElementById('ownerConfirmPassInput') ? document.getElementById('ownerConfirmPassInput').value : '';

                    if (newPass !== confirmPass) {
                        this.showToast('Password Mismatch', 'New password and confirmation do not match.', 'danger');
                        return;
                    }

                    if (window.edAuth && window.edAuth.changeOwnerPassword) {
                        const success = window.edAuth.changeOwnerPassword(currentPass, newPass);
                        if (success) {
                            passForm.reset();
                        }
                    }
                });
            }

            // Danger Zone: Reset to Factory Defaults
            const resetBtn = document.getElementById('adminResetOwnerBtn');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    if (confirm('Are you sure you want to restore the Master Owner credentials back to factory defaults (admin@theeduconsultant.com / AdminMaster2026!)?')) {
                        if (window.edAuth && window.edAuth.resetOwnerAccount) {
                            window.edAuth.resetOwnerAccount();
                        }
                    }
                });
            }

            // Danger Zone: Delete Session
            const deleteBtn = document.getElementById('adminDeleteOwnerBtn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => {
                    if (confirm('Are you sure you want to delete and wipe your owner admin session from this browser? You will need to log back in with master credentials.')) {
                        if (window.edAuth && window.edAuth.deleteOwnerAccount) {
                            window.edAuth.deleteOwnerAccount();
                        }
                    }
                });
            }
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

        renderAdminPagesTable: function () {
            const tableBody = document.getElementById('adminPagesTableBody');
            if (!tableBody) return;

            const allPages = this.getPages();
            if (allPages.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No custom pages yet. Use the Page Builder Studio to create your first page!</td></tr>`;
                return;
            }

            tableBody.innerHTML = allPages.map(p => {
                const badgeClass = p.status === 'published' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-muted';
                const customLabel = p.isCustom ? `<span class="badge bg-primary text-white ms-1" style="font-size: 10px;">Custom</span>` : `<span class="badge bg-light text-muted ms-1" style="font-size: 10px;">Curated</span>`;

                return `
                    <tr>
                        <td class="ps-4">
                            <div class="d-flex align-items-center gap-3">
                                <img src="${p.coverImage || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=100&q=80'}" width="44" height="44" class="rounded-3 object-fit-cover shadow-xs" alt="thumb"/>
                                <div>
                                    <div class="fw-bold text-dark text-truncate" style="max-width: 260px;">${p.title} ${customLabel}</div>
                                    <div class="text-muted fs-12 font-monospace">page.html?slug=${p.slug}</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge bg-warning-subtle text-dark fw-bold">${p.category || 'General'}</span></td>
                        <td><div class="fs-13 fw-semibold text-dark">${p.author || 'Editorial'}</div></td>
                        <td><span class="badge ${badgeClass} text-capitalize">${p.status}</span></td>
                        <td class="pe-4 text-end">
                            <div class="btn-group btn-group-sm">
                                <a href="page.html?slug=${p.slug}" target="_blank" class="btn btn-outline-secondary" title="View Live Webpage">
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                </a>
                                ${p.isCustom ? `
                                    <button type="button" class="btn btn-outline-danger" onclick="if(confirm('Delete page: \\'${p.title}\\'?')){ window.EduCMS.deletePage('${p.id}'); window.EduCMS.renderAdminPagesTable(); window.EduCMS.renderAdminNavManager(); window.EduCMS.updateAdminDashboardCounters(); window.EduCMS.showToast('Page Deleted', 'Page removed successfully.'); }" title="Delete Page">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                ` : `
                                    <button type="button" class="btn btn-outline-secondary opacity-50" disabled title="Curated system pages are protected">
                                        <i class="fa-solid fa-lock"></i>
                                    </button>
                                `}
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        },

        renderAdminNavManager: function () {
            const container = document.getElementById('adminNavItemsContainer');
            const selectEl = document.getElementById('adminSublinkDropdownSelect');
            const pagePresetSelect = document.getElementById('adminSublinkPagePresetSelect');

            const allNav = this.getNavItems();

            // Populate dropdown select options
            if (selectEl) {
                selectEl.innerHTML = '<option value="">-- Choose Dropdown Menu --</option>' + 
                    allNav.filter(n => n.type === 'dropdown').map(n => `<option value="${n.id}">${n.label} ${n.isCustom ? '(Custom)' : '(Default)'}</option>`).join('');
            }

            // Populate page preset options
            if (pagePresetSelect) {
                const pages = this.getPages();
                let html = '<option value="">-- Or Select Created Webpage --</option>';
                html += '<optgroup label="Custom & Curated Pages">';
                pages.forEach(p => {
                    html += `<option value="page.html?slug=${p.slug}" data-title="${p.title}">📄 ${p.title} (${p.slug})</option>`;
                });
                html += '</optgroup>';
                html += '<optgroup label="Main Site Portals">';
                html += '<option value="universities-list.html" data-title="Universities Directory">🏛 Universities Directory</option>';
                html += '<option value="blog-list.html" data-title="Admissions Blogs">📰 Admissions Blogs</option>';
                html += '<option value="scholarship-list.html" data-title="Scholarships">🎓 Scholarships Directory</option>';
                html += '<option value="subject-list.html" data-title="Explore Subjects">📚 Subject Pathways</option>';
                html += '<option value="courses-programs-IELTS.html" data-title="IELTS Coaching">🗣 IELTS Preparation</option>';
                html += '<option value="contact-us.html" data-title="Book Consultation">📅 Book Consultation</option>';
                html += '</optgroup>';
                pagePresetSelect.innerHTML = html;
            }

            if (!container) return;

            if (allNav.length === 0) {
                container.innerHTML = `<div class="p-4 text-center text-muted">No custom navbar dropdowns configured yet.</div>`;
                return;
            }

            container.innerHTML = allNav.map(nav => {
                const sublinks = nav.items || [];
                const sublinksHtml = sublinks.length === 0 
                    ? `<div class="text-muted fs-13 py-2 italic ps-4">No sub-links added yet. Use "Add Link to Dropdown" below.</div>`
                    : sublinks.map((sub, idx) => `
                        <div class="d-flex align-items-center justify-content-between p-2 rounded bg-white border mb-2 fs-13">
                            <div class="d-flex align-items-center gap-2">
                                <i class="fa-solid fa-arrow-turn-down-right text-warning ms-2"></i>
                                <span class="fw-bold text-dark">${sub.label}</span>
                                <span class="text-muted fs-12 font-monospace">(${sub.url})</span>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <a href="${sub.url}" target="_blank" class="btn btn-sm btn-outline-secondary py-0 px-2" title="Test link">
                                    <i class="fa-solid fa-arrow-up-right-from-square fs-11"></i>
                                </a>
                                ${nav.isCustom ? `
                                    <button type="button" class="btn btn-sm btn-outline-danger py-0 px-2" onclick="window.EduCMS.deleteNavSubLink('${nav.id}', ${idx}); window.EduCMS.renderAdminNavManager(); window.EduCMS.renderCustomNavbar(); window.EduCMS.showToast('Link Removed', 'Sub-link removed from dropdown.');">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    `).join('');

                return `
                    <div class="card border rounded-3 p-3 mb-3 shadow-xs">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <div class="d-flex align-items-center gap-2">
                                <div class="rounded bg-primary-subtle text-primary p-2 fs-14">
                                    <i class="fa-solid ${nav.icon || 'fa-folder-open'}"></i>
                                </div>
                                <div>
                                    <h6 class="fw-bold text-dark mb-0">${nav.label} ${nav.isCustom ? '<span class="badge bg-primary text-white ms-1" style="font-size:10px;">Custom Dropdown</span>' : '<span class="badge bg-light text-muted ms-1" style="font-size:10px;">Default</span>'}</h6>
                                    <span class="fs-12 text-muted">${sublinks.length} destination link(s) active</span>
                                </div>
                            </div>
                            <div>
                                ${nav.isCustom ? `
                                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="if(confirm('Delete dropdown menu \\'${nav.label}\\' and all its child links?')){ window.EduCMS.deleteNavItem('${nav.id}'); window.EduCMS.renderAdminNavManager(); window.EduCMS.renderCustomNavbar(); window.EduCMS.showToast('Dropdown Deleted', 'Dropdown menu removed.'); }">
                                        <i class="fa-solid fa-trash-can me-1"></i> Delete Menu
                                    </button>
                                ` : `
                                    <span class="badge bg-secondary-subtle text-muted fs-11">System Protected</span>
                                `}
                            </div>
                        </div>
                        <div class="bg-light p-2 rounded-2 mt-2">
                            ${sublinksHtml}
                        </div>
                    </div>
                `;
            }).join('');
        },

        // --- STUDENT & SCHOLAR ACCOUNTS MANAGEMENT HUB ---
        renderAdminUsersTable: function (customList = null) {
            const tableBody = document.getElementById('adminUsersTableBody');
            const totalScholarsBadge = document.getElementById('adminUsersCountBadge');
            const sidebarBadge = document.getElementById('sidebarUsersCountBadge');
            const overviewScholarsCount = document.getElementById('adminTotalScholarsCounter');
            const overviewAppsCount = document.getElementById('adminTotalAppsCounter');

            if (!window.edAuth) return;

            const allUsers = window.edAuth.getAllUsers();
            const list = customList !== null ? customList : allUsers;

            // Update counter badges
            if (totalScholarsBadge) totalScholarsBadge.textContent = `Total: ${allUsers.length} Scholar${allUsers.length === 1 ? '' : 's'}`;
            if (sidebarBadge) sidebarBadge.textContent = allUsers.length;
            if (overviewScholarsCount) overviewScholarsCount.textContent = allUsers.length;

            const totalApps = allUsers.reduce((sum, u) => sum + (Array.isArray(u.applications) ? u.applications.length : 0), 0);
            if (overviewAppsCount) overviewAppsCount.textContent = totalApps;

            if (!tableBody) return;

            if (list.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center py-5 text-muted">
                            <i class="fa-solid fa-user-xmark fs-2 d-block mb-2 text-secondary"></i>
                            <div class="fw-bold fs-14 text-dark mb-1">No Scholar Accounts Found</div>
                            <span class="fs-12">No profiles matched your filter criteria or search query.</span>
                        </td>
                    </tr>
                `;
                return;
            }

            tableBody.innerHTML = list.map(user => {
                const appsCount = Array.isArray(user.applications) ? user.applications.length : 0;
                const phase = parseInt(user.milestonePhase, 10) || 1;
                const statusBadge = user.status === 'Suspended' ? 'bg-danger text-white' : 'bg-success text-white';
                
                const phoneDisplay = user.phone ? `<span class="font-monospace fs-12 text-muted">${user.phone}</span>` : '<span class="text-muted fs-11 italic">No phone</span>';
                const appBadgeColor = appsCount > 0 ? 'bg-primary-subtle text-primary border border-primary' : 'bg-light text-muted border';

                return `
                    <tr>
                        <td class="ps-4">
                            <span class="badge bg-dark text-warning font-monospace px-2.5 py-1.5 fs-12 fw-bold">
                                ${user.id || 'EDU-2026-9842'}
                            </span>
                        </td>
                        <td>
                            <div class="d-flex align-items-center gap-2.5">
                                <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}" 
                                     class="rounded-circle border" width="36" height="36" style="object-fit: cover;" alt="${user.name}">
                                <div>
                                    <div class="fw-bold text-dark fs-14">${user.name}</div>
                                    <div class="text-muted fs-12">${user.email}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div>
                                <span class="badge bg-light text-dark border mb-1 fs-11">${user.destination || 'Global'}</span>
                                <div>${phoneDisplay}</div>
                            </div>
                        </td>
                        <td>
                            <span class="badge ${appBadgeColor} fw-bold px-2.5 py-1 fs-11 rounded-pill">
                                ${appsCount} File${appsCount === 1 ? '' : 's'}
                            </span>
                        </td>
                        <td>
                            <span class="badge bg-info-subtle text-info fw-bold px-2.5 py-1 fs-11 rounded-pill">
                                Phase ${phase} of 5
                            </span>
                        </td>
                        <td>
                            <span class="badge ${statusBadge} px-2 py-1 fs-11 rounded-pill">
                                ${user.status || 'Active'}
                            </span>
                        </td>
                        <td class="pe-4 text-end">
                            <button type="button" class="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 fw-bold fs-12" onclick="window.EduCMS.openManageUserModal('${user.email}')">
                                <i class="fa-solid fa-user-gear me-1"></i> Manage Scholar
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
        },

        filterAdminUsers: function () {
            if (!window.edAuth) return;
            const searchInput = document.getElementById('adminUserSearchInput');
            const destFilter = document.getElementById('adminUserDestFilter');
            const phaseFilter = document.getElementById('adminUserMilestoneFilter');

            const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
            const dest = (destFilter ? destFilter.value : '').trim();
            const phase = (phaseFilter ? phaseFilter.value : '').trim();

            const allUsers = window.edAuth.getAllUsers();
            const filtered = allUsers.filter(u => {
                const idMatch = (u.id || '').toLowerCase().includes(query);
                const emailMatch = (u.email || '').toLowerCase().includes(query);
                const nameMatch = (u.name || '').toLowerCase().includes(query);
                const matchesQuery = !query || idMatch || emailMatch || nameMatch;

                const matchesDest = !dest || (u.destination || '').toLowerCase() === dest.toLowerCase();
                const matchesPhase = !phase || String(u.milestonePhase || 1) === phase;

                return matchesQuery && matchesDest && matchesPhase;
            });

            this.renderAdminUsersTable(filtered);
        },

        openManageUserModal: function (email) {
            if (!window.edAuth) return;
            const user = window.edAuth.getUserByEmail(email);
            if (!user) {
                alert(`Scholar profile not found for email: ${email}`);
                return;
            }

            const modalName = document.getElementById('manageUserModalName');
            const modalId = document.getElementById('manageUserModalId');
            const modalEmail = document.getElementById('manageUserModalEmail');
            const modalAvatar = document.getElementById('manageUserModalAvatar');

            if (modalName) modalName.textContent = user.name || 'Scholar';
            if (modalId) modalId.textContent = user.id || 'EDU-2026-9842';
            if (modalEmail) modalEmail.textContent = user.email || '';
            if (modalAvatar) modalAvatar.src = user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80';

            const origEmail = document.getElementById('manageUserOriginalEmail');
            const nameInput = document.getElementById('manageUserNameInput');
            const emailInput = document.getElementById('manageUserEmailInput');
            const phoneInput = document.getElementById('manageUserPhoneInput');
            const destSelect = document.getElementById('manageUserDestSelect');
            const mentorSelect = document.getElementById('manageUserMentorSelect');
            const statusSelect = document.getElementById('manageUserStatusSelect');
            const idInput = document.getElementById('manageUserIdInput');
            const passInput = document.getElementById('manageUserPasswordInput');

            if (origEmail) origEmail.value = user.email;
            if (nameInput) nameInput.value = user.name || '';
            if (emailInput) emailInput.value = user.email || '';
            if (phoneInput) phoneInput.value = user.phone || '';
            if (destSelect) destSelect.value = user.destination || 'United Kingdom';
            if (mentorSelect) mentorSelect.value = user.mentor || 'Dr. Eleanor Vance';
            if (statusSelect) statusSelect.value = user.status || 'Active';
            if (idInput) idInput.value = user.id || 'EDU-2026-9842';
            if (passInput) passInput.value = user.password || '';

            this.renderManageUserApps(user);
            this.renderManageUserDocs(user);
            this.renderManageUserGrants(user);

            const phase = user.milestonePhase || 1;
            const radios = document.querySelectorAll('input[name="milestonePhaseRadio"]');
            radios.forEach(r => {
                r.checked = (r.value === String(phase));
            });

            const tab1Btn = document.getElementById('tab-manage-profile-btn');
            if (tab1Btn) {
                const tab1 = new bootstrap.Tab(tab1Btn);
                tab1.show();
            }

            const modalEl = document.getElementById('adminManageUserModal');
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                modal.show();
            }
        },

        renderManageUserApps: function (user) {
            const container = document.getElementById('manageUserAppsContainer');
            const countBadge = document.getElementById('manageModalAppsCountBadge');
            const apps = Array.isArray(user.applications) ? user.applications : [];

            if (countBadge) countBadge.textContent = apps.length;
            if (!container) return;

            if (apps.length === 0) {
                container.innerHTML = `
                    <div class="p-4 rounded-3 border bg-light text-center text-muted">
                        <i class="fa-solid fa-folder-open fs-3 d-block mb-2 text-secondary"></i>
                        <b class="text-dark d-block mb-1">No Applications Filed Yet</b>
                        <span class="fs-12">This scholar currently has no university applications. You can add one below on their behalf.</span>
                    </div>
                `;
                return;
            }

            container.innerHTML = apps.map(app => {
                const appliedDate = app.appliedAt ? new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently';
                
                return `
                    <div class="card border rounded-3 p-3 mb-3 shadow-xs bg-white">
                        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2 pb-2 border-bottom">
                            <div>
                                <h6 class="fw-bold text-dark mb-0">${app.institution}</h6>
                                <span class="fs-12 text-muted">${app.country || 'Global'} • ${app.intake || 'Fall 2026'}</span>
                            </div>
                            <span class="badge bg-light text-muted font-monospace fs-11">App ID: ${app.id}</span>
                        </div>
                        <div class="row align-items-center g-2 mb-2">
                            <div class="col-md-5">
                                <span class="fs-13 fw-semibold text-dark d-block text-truncate">${app.program}</span>
                                <span class="fs-11 text-muted">Date Filed: ${appliedDate}</span>
                            </div>
                            <div class="col-md-4">
                                <select class="form-select form-select-sm fs-12 py-1" id="appStatusSelect_${app.id}">
                                    <option value="Under Review" ${app.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
                                    <option value="Conditional Offer" ${app.status === 'Conditional Offer' ? 'selected' : ''}>Conditional Offer</option>
                                    <option value="Offer Letter Issued" ${app.status === 'Offer Letter Issued' ? 'selected' : ''}>Offer Letter Issued 🎉</option>
                                    <option value="CAS / I-20 Issued" ${app.status === 'CAS / I-20 Issued' ? 'selected' : ''}>CAS / I-20 Issued</option>
                                    <option value="Visa Approved" ${app.status === 'Visa Approved' ? 'selected' : ''}>Visa Approved ✓</option>
                                    <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Application Rejected</option>
                                </select>
                            </div>
                            <div class="col-md-3 text-end">
                                <button type="button" class="btn btn-sm btn-primary rounded-pill px-2.5 py-1 fs-12 fw-bold" onclick="window.EduCMS.updateAppStatusFromAdmin('${user.email}', '${app.id}')">
                                    <i class="fa-solid fa-floppy-disk me-1"></i> Update Status
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger rounded-circle p-1 ms-1" title="Delete application" onclick="window.EduCMS.deleteAppFromAdmin('${user.email}', '${app.id}')">
                                    <i class="fa-solid fa-trash-can" style="font-size: 11px;"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        },

        renderManageUserDocs: function (user) {
            const container = document.getElementById('manageUserDocsContainer');
            const countBadge = document.getElementById('manageModalDocsCountBadge');
            const docs = Array.isArray(user.documents) ? user.documents : [];

            if (countBadge) countBadge.textContent = docs.length;
            if (!container) return;

            if (docs.length === 0) {
                container.innerHTML = `
                    <div class="p-4 rounded-3 border bg-light text-center text-muted">
                        <i class="fa-solid fa-folder-open fs-3 d-block mb-2 text-secondary"></i>
                        <b class="text-dark d-block mb-1">No Verification Documents Uploaded Yet</b>
                        <span class="fs-12">The scholar has not uploaded any credentials yet. You can attach a document on their behalf below.</span>
                    </div>
                `;
                return;
            }

            container.innerHTML = docs.map(doc => {
                const uploadedDate = doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'On file';
                
                return `
                    <div class="card border rounded-3 p-3 mb-3 shadow-xs bg-white">
                        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2 pb-2 border-bottom">
                            <div>
                                <h6 class="fw-bold text-dark mb-0">${doc.title}</h6>
                                <span class="fs-12 text-muted">Category: ${doc.type || 'Document'} • Uploaded: ${uploadedDate}</span>
                            </div>
                            <span class="badge bg-light text-muted font-monospace fs-11">Doc ID: ${doc.id}</span>
                        </div>
                        <div class="row align-items-center g-2 mb-2">
                            <div class="col-md-5">
                                <input type="text" class="form-control form-control-sm fs-12 py-1" id="docDetailInput_${doc.id}" value="${doc.detail || doc.fileName || ''}" placeholder="Counselor verification notes">
                            </div>
                            <div class="col-md-4">
                                <select class="form-select form-select-sm fs-12 py-1" id="docStatusSelect_${doc.id}">
                                    <option value="Verified" ${doc.status === 'Verified' || doc.status === 'Valid' ? 'selected' : ''}>Verified ✓</option>
                                    <option value="Under Review" ${doc.status === 'Under Review' || doc.status === 'In Review' ? 'selected' : ''}>Under Review 🟡</option>
                                    <option value="Pending Verification" ${doc.status === 'Pending Verification' ? 'selected' : ''}>Pending Verification ⏳</option>
                                    <option value="Needs Re-upload" ${doc.status === 'Needs Re-upload' ? 'selected' : ''}>Needs Re-upload ❌</option>
                                </select>
                            </div>
                            <div class="col-md-3 text-end">
                                <button type="button" class="btn btn-sm btn-primary rounded-pill px-2.5 py-1 fs-12 fw-bold" onclick="window.EduCMS.updateDocStatusFromAdmin('${user.email}', '${doc.id}')">
                                    <i class="fa-solid fa-check me-1"></i> Save
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger rounded-circle p-1 ms-1" title="Delete document" onclick="window.EduCMS.deleteDocFromAdmin('${user.email}', '${doc.id}')">
                                    <i class="fa-solid fa-trash-can" style="font-size: 11px;"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        },

        updateDocStatusFromAdmin: function (email, docId) {
            const selectEl = document.getElementById(`docStatusSelect_${docId}`);
            const detailEl = document.getElementById(`docDetailInput_${docId}`);
            if (!selectEl) return;

            const newStatus = selectEl.value;
            const newDetail = detailEl ? detailEl.value.trim() : '';

            window.edAuth.updateUserDocument(email, docId, { status: newStatus, detail: newDetail });
            this.showToast('Document Status Updated', `Document marked as "${newStatus}".`);

            const updatedUser = window.edAuth.getUserByEmail(email);
            this.renderManageUserDocs(updatedUser);
        },

        deleteDocFromAdmin: function (email, docId) {
            if (!confirm('Are you sure you want to delete this document from the scholar locker?')) return;

            window.edAuth.deleteUserDocument(email, docId);
            this.showToast('Document Removed', 'Document deleted from scholar locker.');

            const updatedUser = window.edAuth.getUserByEmail(email);
            this.renderManageUserDocs(updatedUser);
        },

        addDocToUserFromAdmin: function (e) {
            if (e) e.preventDefault();
            const email = document.getElementById('manageUserOriginalEmail').value;
            const title = document.getElementById('adminAddDocTitleInput').value.trim();
            const type = document.getElementById('adminAddDocTypeSelect').value;
            const detail = document.getElementById('adminAddDocDetailInput').value.trim();
            const status = document.getElementById('adminAddDocStatusSelect').value;

            if (!title) {
                alert('Please enter a document title.');
                return;
            }

            window.edAuth.addDocumentToUser(email, {
                title,
                type,
                detail: detail || (status === 'Verified' ? 'Verified by Counselor' : 'Under Review'),
                status
            });

            this.showToast('Document Attached', `Added "${title}" to scholar locker.`);
            document.getElementById('adminAddUserDocForm').reset();

            const updatedUser = window.edAuth.getUserByEmail(email);
            this.renderManageUserDocs(updatedUser);
        },

        renderManageUserGrants: function (user) {
            const container = document.getElementById('manageUserGrantsContainer');
            const countBadge = document.getElementById('manageModalGrantsCountBadge');
            const grants = Array.isArray(user.grants) ? user.grants : [];

            if (countBadge) countBadge.textContent = grants.length;
            if (!container) return;

            if (grants.length === 0) {
                container.innerHTML = `
                    <div class="p-4 rounded-3 border bg-light text-center text-muted">
                        <i class="fa-solid fa-award fs-3 d-block mb-2 text-warning"></i>
                        <b class="text-dark d-block mb-1">No Matched Scholarships Assigned</b>
                        <span class="fs-12">This scholar currently has no scholarships on file. You can assign eligible grants below.</span>
                    </div>
                `;
                return;
            }

            container.innerHTML = grants.map(grant => {
                const name = grant.name || grant.title || grant;
                const amount = grant.amount || 'Tuition Waiver';
                const country = grant.country || 'Global';
                const tag = grant.tag || 'Merit Bursary';
                const status = grant.status || 'Eligible - Pre-Approved';
                const gid = grant.id || name;

                return `
                    <div class="card border rounded-3 p-3 mb-2 shadow-xs bg-white">
                        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <div>
                                <span class="badge bg-warning-subtle text-warning-emphasis fw-bold fs-11">${tag}</span>
                                <h6 class="fw-bold text-dark mb-0 mt-1">${name}</h6>
                                <span class="fs-12 text-success fw-bold">${amount}</span>
                                <span class="fs-12 text-muted ms-2">• ${country} • ${status}</span>
                            </div>
                            <button type="button" class="btn btn-sm btn-outline-danger rounded-pill px-2.5 py-1 fs-12 fw-bold" onclick="window.EduCMS.deleteGrantFromAdmin('${user.email}', '${gid}')">
                                <i class="fa-solid fa-trash-can me-1"></i> Remove Grant
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        },

        deleteGrantFromAdmin: function (email, grantId) {
            if (!confirm('Are you sure you want to remove this scholarship from the scholar record?')) return;

            window.edAuth.deleteUserGrant(email, grantId);
            this.showToast('Scholarship Removed', 'Scholarship removed from scholar profile.');

            const updatedUser = window.edAuth.getUserByEmail(email);
            this.renderManageUserGrants(updatedUser);
        },

        addGrantToUserFromAdmin: function (e) {
            if (e) e.preventDefault();
            const email = document.getElementById('manageUserOriginalEmail').value;
            const name = document.getElementById('adminAddGrantNameInput').value.trim();
            const amount = document.getElementById('adminAddGrantAmountInput').value.trim();
            const country = document.getElementById('adminAddGrantCountrySelect').value;
            const tag = document.getElementById('adminAddGrantTagInput').value.trim() || 'Merit Bursary';
            const status = document.getElementById('adminAddGrantStatusSelect').value;

            if (!name || !amount) {
                alert('Please enter Scholarship Name and Award Amount.');
                return;
            }

            window.edAuth.addGrantToUser(email, {
                name,
                amount,
                country,
                tag,
                status
            });

            this.showToast('Scholarship Assigned', `Assigned "${name}" to scholar.`);
            document.getElementById('adminAddUserGrantForm').reset();

            const updatedUser = window.edAuth.getUserByEmail(email);
            this.renderManageUserGrants(updatedUser);
        },

        saveUserManageProfile: function (e) {
            if (e) e.preventDefault();
            const email = document.getElementById('manageUserOriginalEmail').value;
            const name = document.getElementById('manageUserNameInput').value.trim();
            const phone = document.getElementById('manageUserPhoneInput').value.trim();
            const destination = document.getElementById('manageUserDestSelect').value;
            const mentor = document.getElementById('manageUserMentorSelect').value;
            const status = document.getElementById('manageUserStatusSelect').value;
            const password = document.getElementById('manageUserPasswordInput').value.trim();

            if (!name || !password) {
                alert('Scholar name and password cannot be empty.');
                return;
            }

            window.edAuth.updateUser(email, {
                name,
                phone,
                destination,
                mentor,
                status,
                password
            });

            this.showToast('Scholar Profile Saved', `Profile and password for ${name} updated successfully!`);
            this.renderAdminUsersTable();
            this.openManageUserModal(email);
        },

        generateUserRandomPass: function () {
            const passInput = document.getElementById('manageUserPasswordInput');
            if (passInput) {
                passInput.value = 'ScholarPass' + Math.floor(1000 + Math.random() * 9000) + '!';
                this.showToast('Generated', 'New temporary password generated.');
            }
        },

        addAppToUserFromAdmin: function (e) {
            if (e) e.preventDefault();
            const email = document.getElementById('manageUserOriginalEmail').value;
            const institution = document.getElementById('adminAddAppInstInput').value.trim();
            const country = document.getElementById('adminAddAppCountrySelect').value;
            const program = document.getElementById('adminAddAppProgInput').value.trim();
            const intake = document.getElementById('adminAddAppIntakeSelect').value;
            const status = document.getElementById('adminAddAppStatusSelect').value;

            if (!institution || !program) {
                alert('Please enter Institution and Program.');
                return;
            }

            window.edAuth.addApplicationToUser(email, {
                institution,
                country,
                program,
                intake,
                status
            });

            this.showToast('Application Added', `Added ${institution} application to scholar record.`);
            document.getElementById('adminAddUserAppForm').reset();

            const updatedUser = window.edAuth.getUserByEmail(email);
            this.renderManageUserApps(updatedUser);
            this.renderAdminUsersTable();
        },

        updateAppStatusFromAdmin: function (email, appId) {
            const selectEl = document.getElementById(`appStatusSelect_${appId}`);
            if (!selectEl) return;
            const newStatus = selectEl.value;

            window.edAuth.updateUserApplication(email, appId, { status: newStatus });
            this.showToast('Status Updated', `Application status changed to "${newStatus}".`);

            const updatedUser = window.edAuth.getUserByEmail(email);
            this.renderManageUserApps(updatedUser);
            this.renderAdminUsersTable();
        },

        deleteAppFromAdmin: function (email, appId) {
            if (!confirm('Are you sure you want to delete this application record?')) return;

            window.edAuth.deleteUserApplication(email, appId);
            this.showToast('Application Removed', 'Application record was deleted.');

            const updatedUser = window.edAuth.getUserByEmail(email);
            this.renderManageUserApps(updatedUser);
            this.renderAdminUsersTable();
        },

        saveUserMilestoneFromAdmin: function (e) {
            if (e) e.preventDefault();
            const email = document.getElementById('manageUserOriginalEmail').value;
            const selectedRadio = document.querySelector('input[name="milestonePhaseRadio"]:checked');
            if (!selectedRadio) return;

            const newPhase = parseInt(selectedRadio.value, 10);
            window.edAuth.updateUser(email, { milestonePhase: newPhase });

            this.showToast('Milestone Updated', `Journey milestone set to Phase ${newPhase} of 5.`);
            this.renderAdminUsersTable();
        },

        deleteUserFromAdmin: function () {
            const email = document.getElementById('manageUserOriginalEmail').value;
            if (!confirm(`Warning: Are you sure you want to permanently delete account: "${email}"? This action cannot be undone.`)) return;

            window.edAuth.deleteUserAccount(email);
            this.showToast('Account Deleted', 'Scholar profile removed from database.');

            const modalEl = document.getElementById('adminManageUserModal');
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
            }

            this.renderAdminUsersTable();
        },

        createScholarFromAdmin: function (e) {
            if (e) e.preventDefault();
            const name = document.getElementById('newScholarNameInput').value.trim();
            const email = document.getElementById('newScholarEmailInput').value.trim().toLowerCase();
            const phone = document.getElementById('newScholarPhoneInput').value.trim();
            const password = document.getElementById('newScholarPassInput').value.trim();
            const destination = document.getElementById('newScholarDestSelect').value;

            if (!name || !email || !password) {
                alert('Please fill in Name, Email, and Password.');
                return;
            }

            const existing = window.edAuth.getUserByEmail(email);
            if (existing) {
                alert(`An account already exists with email: ${email}`);
                return;
            }

            const res = window.edAuth.adminCreateUser({
                name,
                email,
                phone,
                password,
                destination,
                mentor: 'Dr. Eleanor Vance'
            });

            if (res && res.success) {
                this.showToast('Scholar Onboarded', `Account created for ${name} (${res.user.id}).`);
                const modalEl = document.getElementById('adminCreateScholarModal');
                if (modalEl) {
                    const modal = bootstrap.Modal.getInstance(modalEl);
                    if (modal) modal.hide();
                }
                document.getElementById('adminCreateScholarForm').reset();
                this.renderAdminUsersTable();
            } else {
                alert((res && res.message) || 'Error creating account.');
            }
        },

        updateAdminDashboardCounters: function () {
            const blogCountEl = document.getElementById('adminTotalBlogsCounter');
            const uniCountEl = document.getElementById('adminTotalUnisCounter');
            const pageCountEl = document.getElementById('adminTotalPagesCounter');
            const navCountEl = document.getElementById('adminTotalNavCounter');
            const scholarCountEl = document.getElementById('adminTotalScholarsCounter');
            const appCountEl = document.getElementById('adminTotalAppsCounter');
            const sidebarBadge = document.getElementById('sidebarUsersCountBadge');
            const usersBadge = document.getElementById('adminUsersCountBadge');
            
            if (blogCountEl) blogCountEl.textContent = this.getAllBlogs().length;
            if (uniCountEl) uniCountEl.textContent = this.getAllUnis().length;
            if (pageCountEl) pageCountEl.textContent = this.getPages().length;
            if (navCountEl) navCountEl.textContent = this.getNavItems().length;

            if (window.edAuth) {
                const users = window.edAuth.getAllUsers();
                if (scholarCountEl) scholarCountEl.textContent = users.length;
                if (sidebarBadge) sidebarBadge.textContent = users.length;
                if (usersBadge) usersBadge.textContent = `Total: ${users.length} Scholar${users.length === 1 ? '' : 's'}`;

                const totalApps = users.reduce((sum, u) => sum + (Array.isArray(u.applications) ? u.applications.length : 0), 0);
                if (appCountEl) appCountEl.textContent = totalApps;
            }
        }
    };

    // Auto-initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // 1. Render Floating Mobile Bottom Dock on all pages
        EduCMS.renderMobileBottomDock();

        // 2. Render Top Announcement Banner on public pages
        EduCMS.renderAnnouncementBanner();

        // 3. Render Dynamic Navbar Menus across all pages
        EduCMS.renderCustomNavbar();

        // 4. Apply Global Site Settings across all pages
        EduCMS.applyGlobalSettings();

        // 5. Auto-detect page type
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
