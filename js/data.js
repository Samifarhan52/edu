/**
 * The Edu Consultant - Global Educational Dataset & Content Repository
 * Enterprise Higher Education Admissions Platform
 */

window.EduData = {
    brand: {
        name: "The Edu Consultant",
        tagline: "Empowering Students to Achieve Their International Education Dreams",
        phone: "+91 9845371459",
        email: "enquiry@theeduconsultant.com",
        adminEmail: "adm.faraz@gmail.com",
        noreplyEmail: "noreply@theeduconsultant.com",
        address: "Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025",
        workingHours: "Mon - Sat: 9:00 AM - 8:00 PM IST"
    },

    stats: [
        { label: "Partnering Universities", value: "100+", raw: 100, icon: "building", desc: "Top-ranked global institutions" },
        { label: "Destination Countries", value: "20+", raw: 20, icon: "globe", desc: "Across North America, Europe & APAC" },
        { label: "Global Students Placed", value: "1,280+", raw: 1280, icon: "users", desc: "Successful academic admissions" },
        { label: "Visa Approval Rate", value: "98%", raw: 98, icon: "shield-check", desc: "Industry-leading embassy clearance" },
        { label: "Specialized Programs", value: "25+", raw: 25, icon: "book-open", desc: "Undergraduate & postgraduate pathways" }
    ],

    destinations: [
        {
            id: "australia",
            name: "Australia",
            tagline: "World-Class Living & Leading Research Hubs",
            image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
            flag: "🇦🇺",
            topUniversities: ["University of Melbourne", "University of Sydney", "Australian National University", "UNSW Sydney"],
            avgTuition: "AUD $28,000 - $48,000 / year",
            stayBack: "Up to 4-5 Years Post-Study Work Visa",
            workRights: "48 hours per fortnight during semester",
            desc: "Studying in Australia is a transformative experience. Home to 7 of the world's top 100 universities, Australia blends academic excellence with vibrant multicultural cities and unmatched career pathways."
        },
        {
            id: "united-states",
            name: "United States",
            tagline: "The Pinnacle of Global Innovation & Ivy League Excellence",
            image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1200&q=80",
            flag: "🇺🇸",
            topUniversities: ["Harvard University", "MIT", "Stanford University", "Columbia University"],
            avgTuition: "USD $32,000 - $58,000 / year",
            stayBack: "Up to 3 Years OPT for STEM programs",
            workRights: "20 hours / week on-campus",
            desc: "The United States remains the foremost destination for ambitious scholars worldwide, offering cutting-edge research facilities, expansive industry networks, and flexible degree curricula."
        },
        {
            id: "canada",
            name: "Canada",
            tagline: "High Quality of Life & Express Permanent Residency Pathways",
            image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=80",
            flag: "🇨🇦",
            topUniversities: ["University of Toronto", "McGill University", "University of British Columbia", "University of Waterloo"],
            avgTuition: "CAD $24,000 - $42,000 / year",
            stayBack: "Up to 3-year PGWP (Post-Graduation Work Permit)",
            workRights: "20 hours / week off-campus",
            desc: "Canada combines world-class academic institutions with welcoming immigration policies, affordable living standards, and diverse multinational communities."
        },
        {
            id: "united-kingdom",
            name: "United Kingdom",
            tagline: "Centuries of Heritage, 1-Year Masters & Graduate Route",
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
            flag: "🇬🇧",
            topUniversities: ["University of Oxford", "University of Cambridge", "Imperial College London", "UCL"],
            avgTuition: "GBP £18,000 - £35,000 / year",
            stayBack: "2-year Graduate Route Visa (3 years for PhD)",
            workRights: "20 hours / week during term-time",
            desc: "The UK is world-renowned for rigorous degrees, fast-track one-year Master's programs, and prestigious historic universities with unmatched global alumni networks."
        },
        {
            id: "germany",
            name: "Germany",
            tagline: "Engineering Powerhouse & Tuition-Free Public Universities",
            image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
            flag: "🇩🇪",
            topUniversities: ["Technical University of Munich", "LMU Munich", "Heidelberg University", "RWTH Aachen"],
            avgTuition: "€0 - €3,000 / year (Nominal semester fees)",
            stayBack: "18-month Job Seeker Visa post-graduation",
            workRights: "120 full days or 240 half days / year",
            desc: "Germany is Europe's economic powerhouse, offering tuition-free or nominal-fee higher education in world-leading engineering, technology, and business faculties."
        }
    ],

    services: [
        {
            id: "doc-processing",
            title: "Document Processing",
            icon: "file-text",
            brief: "Professional SOP, LOR, and academic transcript verification tailored to institutional admission rubrics.",
            desc: "Our senior admissions officers meticulously review, structure, and polish your Statement of Purpose (SOP), Letters of Recommendation (LORs), resume, and academic portfolios. We ensure every document aligns with university benchmarks to maximize acceptance probability."
        },
        {
            id: "visa-processing",
            title: "Visa Processing",
            icon: "stamp",
            brief: "Comprehensive embassy file compilation, mock interviews, and 98% visa approval track record.",
            desc: "From financial documentation verification to biometric scheduling and one-on-one consular interview simulations, our certified visa consultants guide you with absolute precision."
        },
        {
            id: "admission-counseling",
            title: "University Admission Counseling",
            icon: "compass",
            brief: "Strategic profile evaluation, course-to-career alignment, and direct institutional partnership waivers.",
            desc: "We analyze your academic history, test scores, financial profile, and career aspirations to curate a strategic shortlist of Reach, Target, and Safety universities with application fee waivers where available."
        },
        {
            id: "professor-matching",
            title: "Professor Matching Services",
            icon: "user-check",
            brief: "Specialized thesis supervisor matching and academic research reach-out for Masters and PhD scholars.",
            desc: "Connect directly with prominent research supervisors and faculty heads. We assist in crafting compelling research proposals, academic CVs, and targeted faculty outreach letters."
        },
        {
            id: "scholarship-guidance",
            title: "Scholarship Guidance",
            icon: "award",
            brief: "Need-based and merit-based financial aid identification, fee waivers, and grant application support.",
            desc: "Our scholarship desk unlocks institutional scholarships, government grants, and external fellowships, helping our students secure over $4.2M in cumulative tuition waivers."
        },
        {
            id: "pre-departure",
            title: "Pre-Departure Support",
            icon: "plane-takeoff",
            brief: "Airport pickup coordination, foreign exchange, student housing booking, and international sim support.",
            desc: "Your journey doesn't end with a visa. We organize pre-departure packing guides, flight ticketing, student accommodation booking, foreign exchange accounts, health insurance, and on-ground buddy connections."
        }
    ],

    journeySteps: [
        {
            step: "01",
            title: "Search & Discover",
            sub: "The Launchpad",
            metric: "50,000+ Programs",
            depth: "20%",
            tagline: "Explore 20K courses across 500+ world-class partner universities.",
            details: "Start by filtering universities based on your GPA, budget, preferred country, post-study work goals, and IELTS/GRE criteria. Our dynamic search platform simplifies complex admissions data into clear, actionable choices.",
            icon: "search",
            color: "from-blue-600 to-indigo-700",
            badge: "Phase 1: Exploration"
        },
        {
            step: "02",
            title: "Compare & Strategize",
            sub: "The Blueprint",
            metric: "Direct Side-by-Side ROI",
            depth: "40%",
            tagline: "Compare your academic options side-by-side all in one unified workspace.",
            details: "Evaluate tuition fees, living expenses, post-graduation stay-back laws, faculty rankings, and employment outcomes side-by-side to construct your personalized admissions roadmap.",
            icon: "git-compare",
            color: "from-cyan-500 to-blue-600",
            badge: "Phase 2: Strategy"
        },
        {
            step: "03",
            title: "Engage & Consult",
            sub: "The Mentor Link",
            metric: "1-on-1 Certified Mentors",
            depth: "60%",
            tagline: "Connect directly with The Edu Consultant senior education advisors.",
            details: "Book dedicated 1-on-1 virtual or in-person strategy sessions. Your assigned counselor refines your university shortlist, reviews eligibility, and establishes your personalized timeline.",
            icon: "users",
            color: "from-emerald-500 to-teal-600",
            badge: "Phase 3: Consultation"
        },
        {
            step: "04",
            title: "Apply & Clear Visa",
            sub: "The Gateway",
            metric: "98% Visa Success Rate",
            depth: "80%",
            tagline: "Our seasoned experts assemble your applications and student visa files.",
            details: "We oversee submission to official admissions portals, secure expedited offer letters, prepare financial sponsor affidavits, and conduct rigorous embassy interview mock rounds.",
            icon: "check-circle",
            color: "from-amber-500 to-orange-600",
            badge: "Phase 4: Execution"
        },
        {
            step: "05",
            title: "Start & Thrive",
            sub: "The Destination",
            metric: "Touchdown & Orientation",
            depth: "100%",
            tagline: "Kick off your fresh study journey abroad with total confidence.",
            details: "Board your flight with peace of mind. Receive airport assistance, settle into pre-arranged university student accommodation, and join our active global alumni community abroad.",
            icon: "plane",
            color: "from-purple-600 to-pink-600",
            badge: "Phase 5: Takeoff"
        }
    ],

    courses: [
        {
            code: "IELTS",
            title: "IELTS Academic & General Prep",
            band: "Target Band 7.5 - 8.5+",
            duration: "8 Weeks Comprehensive",
            mode: "Live Interactive & Mock Labs",
            desc: "Master all 4 modules (Listening, Reading, Writing, Speaking) with certified British Council & IDP accredited trainers, AI-powered writing evaluation, and 20+ full-length computer-delivered mock tests.",
            features: ["Personalized 1-on-1 Speaking mock rounds", "Writing task 1 & 2 band descriptor breakdowns", "Comprehensive Cambridge past paper bank"]
        },
        {
            code: "GRE",
            title: "GRE General Exam Mastery",
            band: "Target Score 320 - 335+",
            duration: "10 Weeks Intensive",
            mode: "Live Hybrid Masterclasses",
            desc: "Designed for ambitious STEM and Business postgraduates targeting top-tier global universities. Covers Quantitative reasoning tricks, Advanced Verbal vocabulary, and Analytical Writing.",
            features: ["Adaptive computer mock tests simulating official ETS interface", "700+ high-frequency vocabulary flashcard system", "Shortcut algorithms for Quant geometry and algebra"]
        },
        {
            code: "GMAT",
            title: "GMAT Focus Edition Strategy",
            band: "Target Score 685 - 735+",
            duration: "10 Weeks Rigorous",
            mode: "Executive Weekend / Evening",
            desc: "Specialized prep for elite global MBA and Master in Management (MiM) admissions at Harvard, INSEAD, London Business School, Stanford, and Oxford Saïd.",
            features: ["Data Insights deep-dive problem solving", "Critical Reasoning logic breakdown", "B-School profile alignment workshop included"]
        }
    ],

    events: [
        {
            id: "event-australia",
            title: "Explore Australia: Study and Work Opportunities",
            date: "Nov 6th, 2026",
            time: "5:00 PM - 7:30 PM",
            type: "Physical & Live Stream",
            location: "Sydney International Center & Virtual Portal",
            city: "Sydney, Australia",
            image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80",
            seats: "24 Seats Remaining",
            desc: "Meet direct university delegates from Group of Eight Australian institutions. Discover regional scholarship incentives and post-study work visa rights."
        },
        {
            id: "event-canada",
            title: "Study in Canada: Pathways to Success",
            date: "Nov 27th, 2026",
            time: "11:30 AM - 2:00 PM",
            type: "Physical Event",
            location: "Metro Convention Hall, Toronto",
            city: "Toronto, Canada",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
            seats: "18 Seats Remaining",
            desc: "Comprehensive workshop on Co-op degree programs, SDS fast-track visa processing, and long-term provincial nominee pathways for graduates."
        },
        {
            id: "event-uk",
            title: "Unlock Opportunities in the United Kingdom",
            date: "Nov 30th, 2026",
            time: "12:00 PM - 2:30 PM",
            type: "Online Global Webinar",
            location: "Zoom Interactive Stage",
            city: "Online Webinar",
            image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
            seats: "Unlimited Virtual RSVP",
            desc: "Learn about 1-year Master's degree savings, Chevening scholarship tips, and the UK 2-year Graduate Route work visa directly from British alumni."
        },
        {
            id: "event-usa",
            title: "Study in the United States: Achieve Your Academic Dreams",
            date: "Jan 23rd, 2027",
            time: "12:00 PM - 3:30 PM",
            type: "Physical Exhibition",
            location: "Grand Hyatt Educational Wing, New York",
            city: "New York, USA",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
            seats: "32 Seats Remaining",
            desc: "Direct meet-and-greet with admissions directors from 15+ US universities. Includes live F-1 visa mock interview demonstrations and funding workshops."
        }
    ],

    blogs: [
        {
            id: "blog-scholarships",
            title: "How to Secure Scholarships for International Students",
            author: "Dr. Eleanor Vance, Senior Admissions Director",
            date: "Nov 15, 2026",
            readTime: "6 min read",
            category: "Financial Aid",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
            summary: "Navigating international merit grants and need-based tuition waivers requires early planning, articulate essays, and strategic positioning.",
            content: "International education is an extraordinary investment, but tuition expenses can feel daunting. Securing scholarships is far more accessible when you understand institutional scoring criteria. Many top universities allocate dedicated endowment funding for global diversity. Here are four foundational strategies our counselors at The Edu Consultant swear by..."
        },
        {
            id: "blog-application-workshop",
            title: "Application Workshop: Ace Your Study Abroad Application",
            author: "Marcus Sterling, Head of Counseling",
            date: "Nov 18, 2026",
            readTime: "8 min read",
            category: "Admissions Strategy",
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
            summary: "A breakdown of common mistakes in Statements of Purpose (SOP) and how to highlight your extracurricular strengths effectively.",
            content: "Admissions committees spend an average of 4 to 7 minutes reviewing a candidate's file. Your Statement of Purpose cannot simply reiterate your transcripts—it must articulate your intellectual curiosity, distinct perspective, and precise career roadmap. In this workshop summary, we walk through proven templates..."
        },
        {
            id: "blog-pre-departure",
            title: "Pre-Departure Orientation: Get Ready for Life Abroad",
            author: "Sophia Chen, Student Welfare Specialist",
            date: "Nov 22, 2026",
            readTime: "5 min read",
            category: "Student Life",
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
            summary: "Essential packing checklists, student bank accounts, healthcare registration, and mental resilience abroad.",
            content: "Receiving your student visa is a monumental milestone, but the first 30 days in a foreign country can be emotionally and logistically intense. From setting up digital eSIMs before departure to navigating local health registries and understanding apartment lease deposits, here is your definitive checklist..."
        },
        {
            id: "blog-cultural-adjustment",
            title: "Cultural Adjustment: How to Thrive in a New Country",
            author: "David O'Connor, Alumni Mentorship Lead",
            date: "Dec 01, 2026",
            readTime: "7 min read",
            category: "Student Wellness",
            image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
            summary: "Overcoming culture shock, networking with local communities, and building lasting international friendships.",
            content: "The emotional curve of international study follows a predictable cadence: the initial honeymoon excitement, the subtle dissonance of unfamiliar norms, and the triumphant breakthrough into cultural fluency. Discover how The Edu Consultant peer-mentorship networks make this transition empowering..."
        }
    ],

    testimonials: [
        {
            name: "Benjamin Harris",
            program: "MSc Data Science, University of Melbourne (Australia)",
            date: "June 7, 2026",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
            text: "The Edu Consultant made my dream of studying in Australia come true with zero stress. Their counselors handled everything seamlessly, from course matching and credit evaluation to my student visa grant in just 14 days."
        },
        {
            name: "Christopher Jordan",
            program: "MEng Robotics, University of Toronto (Canada)",
            date: "June 8, 2026",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
            text: "I was completely overwhelmed by the Canadian PGWP rules and university prerequisites, but the team at The Edu Consultant guided me at every turn. Their SOP editing service alone was worth gold."
        },
        {
            name: "Ava White",
            program: "LLM International Law, King's College London (UK)",
            date: "June 6, 2026",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
            text: "Their expertise in securing scholarships is genuinely incredible. The Edu Consultant helped me win a £10,000 international merit bursary that made studying in London fully affordable."
        },
        {
            name: "Emma Thomas",
            program: "MS Computer Science, TU Munich (Germany)",
            date: "June 3, 2026",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
            text: "Applying to German universities requires meticulous document notarization and APS verification. The Edu Consultant team walked me through every deadline with flawless patience."
        },
        {
            name: "Emily Johnson",
            program: "BSc Biomedical Science, UC Berkeley (USA)",
            date: "June 1, 2026",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            text: "The Edu Consultant' guidance was invaluable. Their counselors organized mock F-1 visa interviews that completely eliminated my anxiety before visiting the US consulate."
        },
        {
            name: "Jhon Morgan",
            program: "MBA, University of Sydney (Australia)",
            date: "May 13, 2026",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
            text: "Working with The Edu Consultant was an extraordinary experience. Proactive, knowledgeable, and genuinely invested in their students' lifelong career trajectory."
        },
        {
            name: "Mera D.",
            program: "MSc Environmental Engineering, TU Delft",
            date: "May 12, 2026",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
            text: "From selecting universities to getting my visa approved, The Edu Consultant transformed a complicated process into a clear, inspiring journey. Highly recommend!"
        }
    ],

    faqs: [
        {
            q: "How can I choose the best study destination for my profile?",
            a: "At The Edu Consultant, we offer personalized diagnostic counseling based on your academic background, test scores, long-term career aspirations, preferred climate, and financial budget. We compare post-study work rights, cost of living, and job markets across Australia, the US, Canada, the UK, Germany, and Europe."
        },
        {
            q: "What services does The Edu Consultant offer to prospective students?",
            a: "The Edu Consultant provides complete end-to-end guidance: profile evaluation, university shortlisting, SOP & LOR editing, direct university application submission, scholarship matching, embassy visa file assembly, mock interviews, and post-arrival pre-departure accommodations."
        },
        {
            q: "What is the university application process like and how long does it take?",
            a: "The timeline typically spans 3 to 6 months depending on the country intake (Fall, Spring, or Summer). Our team coordinates your document verification, manages portal submissions, tracks offer letters, and ensures you meet early application deadlines to secure scholarships."
        },
        {
            q: "Are scholarships available for international students through The Edu Consultant?",
            a: "Yes! Many of our partner universities offer merit-based waivers, dean's awards, and country-specific bursaries ranging from 15% to 100% of tuition. We help you identify all scholarships you qualify for and optimize your essays."
        },
        {
            q: "What support is available after I arrive in my destination country?",
            a: "We provide comprehensive pre-departure briefings, airport arrival coordination, student housing search assistance, international SIM and bank account setup, and connect you with local alumni student networks."
        },
        {
            q: "How can I book a free consultation with The Edu Consultant?",
            a: "You can easily schedule a complimentary 1-on-1 session using the booking form on this page or clicking 'Book Consultation' in the top header. You can choose either an in-person meeting at our office or a virtual video consultation."
        }
    ],

    partnerUniversities: [
        { name: "University of Melbourne", country: "Australia", rank: "#13 Global" },
        { name: "University of Toronto", country: "Canada", rank: "#21 Global" },
        { name: "Imperial College London", country: "UK", rank: "#6 Global" },
        { name: "Technical University of Munich", country: "Germany", rank: "#37 Global" },
        { name: "University of Sydney", country: "Australia", rank: "#18 Global" },
        { name: "McGill University", country: "Canada", rank: "#30 Global" },
        { name: "Australian National University", country: "Australia", rank: "#34 Global" },
        { name: "University of British Columbia", country: "Canada", rank: "#34 Global" },
        { name: "University of Edinburgh", country: "UK", rank: "#22 Global" },
        { name: "RWTH Aachen University", country: "Germany", rank: "#90 Global" },
        { name: "UNSW Sydney", country: "Australia", rank: "#19 Global" },
        { name: "University of Manchester", country: "UK", rank: "#32 Global" }
    ]
};
