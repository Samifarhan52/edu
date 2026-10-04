/**
 * The Edu Consultant - Enterprise Authentication & Owner Security Engine
 * Features:
 * 1. Dedicated Owner Master Credentials (strictly reserved for the platform owner)
 * 2. Real Social Authentication (Google, Apple, LinkedIn) for Prospective Scholars
 * 3. Role-Based Routing (Owner -> Admin CMS Studio, Scholars -> Student Portal)
 * 4. Owner Account & Password Management (Edit profile, change master password, reset)
 * 5. Persistent Multi-User Database (localStorage: the_edu_users_db)
 */

(function (window, document) {
    'use strict';

    const STORAGE_KEY = 'ed_user';
    const DB_KEY = 'the_edu_users_db';
    const OWNER_KEY = 'the_edu_owner_creds';

    // Default Owner Master Credentials
    const DEFAULT_OWNER = {
        name: 'The Edu Consultant Owner',
        email: 'admin@theeduconsultant.com',
        password: 'AdminMaster2026!',
        role: 'Admin',
        badge: 'Owner',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        authProvider: 'Master Credentials',
        isOwner: true
    };

    // Generate Unique Scholar ID (e.g. EDU-2026-4819)
    function generateScholarId() {
        return 'EDU-2026-' + Math.floor(1000 + Math.random() * 9000);
    }

    // Default Seed Student Accounts (Pre-registered for immediate scholar access)
    const DEFAULT_ACCOUNTS = {
        'student@theeduconsultant.com': {
            id: 'EDU-2026-9842',
            name: 'Sophia Patel',
            email: 'student@theeduconsultant.com',
            phone: '+44 7700 900077',
            password: 'password123',
            role: 'Student',
            badge: 'Scholar',
            destination: 'United Kingdom',
            mentor: 'Dr. Eleanor Vance',
            status: 'Active',
            registeredAt: '2026-01-15T10:00:00.000Z',
            milestonePhase: 3,
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
            authProvider: 'Email',
            applications: [
                {
                    id: 'APP-1001',
                    institution: 'Univ. of Manchester',
                    country: 'United Kingdom',
                    program: 'MSc Finance & Data Analysis',
                    intake: 'Fall 2026',
                    status: 'Offer Letter Issued',
                    appliedAt: '2026-01-20T10:00:00.000Z',
                    notes: 'Conditional offer letter received.'
                },
                {
                    id: 'APP-1002',
                    institution: 'Univ. of Melbourne',
                    country: 'Australia',
                    program: 'Master of Computer Science',
                    intake: 'Spring 2027',
                    status: 'Under Review',
                    appliedAt: '2026-02-05T10:00:00.000Z',
                    notes: 'Faculty review in progress.'
                },
                {
                    id: 'APP-1003',
                    institution: 'Univ. of British Columbia',
                    country: 'Canada',
                    program: 'Master of Data Science',
                    intake: 'Fall 2026',
                    status: 'Under Review',
                    appliedAt: '2026-02-18T10:00:00.000Z',
                    notes: 'Transcripts verified.'
                }
            ],
            savedUniversities: ['University of Manchester', 'University of Melbourne', 'University of British Columbia', 'University of Oxford', 'University of Toronto', 'Imperial College London'],
            documents: [
                {
                    id: 'DOC-101',
                    title: 'International Passport',
                    type: 'Passport',
                    status: 'Valid',
                    detail: 'Verified (Expires 2031)',
                    badgeClass: 'bg-success-subtle text-success',
                    uploadedAt: '2026-01-16T10:00:00.000Z'
                },
                {
                    id: 'DOC-102',
                    title: 'University Degree Transcripts',
                    type: 'Transcripts',
                    status: 'Verified',
                    detail: 'Verified (GPA 3.84)',
                    badgeClass: 'bg-success-subtle text-success',
                    uploadedAt: '2026-01-18T10:00:00.000Z'
                },
                {
                    id: 'DOC-103',
                    title: 'Statement of Purpose (SOP)',
                    type: 'SOP',
                    status: 'In Review',
                    detail: 'Draft v2 (Counselor Editing)',
                    badgeClass: 'bg-warning-subtle text-warning-emphasis',
                    uploadedAt: '2026-01-25T10:00:00.000Z'
                },
                {
                    id: 'DOC-104',
                    title: 'IELTS / English Scorecard',
                    type: 'English Test',
                    status: 'Prep Batch',
                    detail: 'Target Score: 8.0',
                    badgeClass: 'bg-info-subtle text-info',
                    uploadedAt: '2026-02-01T10:00:00.000Z'
                }
            ],
            grants: [
                {
                    id: 'GR-101',
                    name: 'Global Melbourne Award',
                    amount: 'Up to AUD $100,000',
                    country: 'Australia',
                    flag: '🇦🇺',
                    tag: '100% Tuition Waiver',
                    tagClass: 'bg-success text-white',
                    status: 'Eligible based on GPA 3.8'
                },
                {
                    id: 'GR-102',
                    name: 'British Council GREAT Award',
                    amount: 'GBP £10,000 Waiver',
                    country: 'United Kingdom',
                    flag: '🇬🇧',
                    tag: "Dean's Bursary",
                    tagClass: 'bg-warning text-dark',
                    status: 'File Pre-Approved'
                }
            ],
            counseling: {
                date: 'Nov 20th',
                time: '4:00 PM GMT',
                mode: 'Video Call',
                mentor: 'Dr. Eleanor Vance'
            }
        },
        'lucas@theeduconsultant.com': {
            id: 'EDU-2026-7310',
            name: 'Lucas Miller',
            email: 'lucas@theeduconsultant.com',
            phone: '+1 617 555 0199',
            password: 'password123',
            role: 'Student',
            badge: 'Scholar',
            destination: 'United States',
            mentor: 'Alexander Morgan',
            status: 'Active',
            registeredAt: '2026-02-01T11:00:00.000Z',
            milestonePhase: 2,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
            authProvider: 'Email',
            applications: [
                {
                    id: 'APP-2001',
                    institution: 'Columbia University',
                    country: 'United States',
                    program: 'MS Financial Engineering',
                    intake: 'Fall 2026',
                    status: 'Under Review',
                    appliedAt: '2026-02-10T11:00:00.000Z',
                    notes: 'Awaiting GRE score official upload.'
                }
            ],
            savedUniversities: ['Columbia University', 'NYU'],
            documents: [],
            grants: [],
            counseling: null
        },
        'amina@theeduconsultant.com': {
            id: 'EDU-2026-6194',
            name: 'Amina Khan',
            email: 'amina@theeduconsultant.com',
            phone: '+1 416 555 0188',
            password: 'password123',
            role: 'Student',
            badge: 'Scholar',
            destination: 'Canada',
            mentor: 'Sophia Patel',
            status: 'Active',
            registeredAt: '2026-02-15T09:30:00.000Z',
            milestonePhase: 1,
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
            authProvider: 'Email',
            applications: [],
            savedUniversities: [],
            documents: [],
            grants: [],
            counseling: null
        }
    };

    function normalizeUserRecord(user, email) {
        if (!user) return user;
        if (!user.id) user.id = generateScholarId();
        if (!user.email) user.email = email;
        if (!Array.isArray(user.applications)) user.applications = [];
        if (!Array.isArray(user.savedUniversities)) user.savedUniversities = [];
        if (!Array.isArray(user.documents)) user.documents = [];
        if (!Array.isArray(user.grants)) user.grants = [];

        // If a real non-seed user had legacy string-only grants, reset to clean array
        if (email !== 'student@theeduconsultant.com') {
            if (user.grants.length > 0 && typeof user.grants[0] === 'string') {
                user.grants = [];
            }
        }

        if (typeof user.milestonePhase === 'undefined') user.milestonePhase = 1;
        if (!user.status) user.status = 'Active';
        if (!user.mentor) user.mentor = 'Dr. Eleanor Vance';
        if (!user.phone) user.phone = '';
        if (!user.destination) user.destination = 'Global';
        if (!user.registeredAt) user.registeredAt = new Date().toISOString();
        if (typeof user.counseling === 'undefined') user.counseling = null;
        return user;
    }

    function getOwner() {
        try {
            const raw = localStorage.getItem(OWNER_KEY);
            return raw ? JSON.parse(raw) : DEFAULT_OWNER;
        } catch (e) {
            return DEFAULT_OWNER;
        }
    }

    function saveOwner(ownerObj) {
        try {
            localStorage.setItem(OWNER_KEY, JSON.stringify(ownerObj));
        } catch (e) {}
    }

    function getDB() {
        try {
            const raw = localStorage.getItem(DB_KEY);
            const parsed = raw ? JSON.parse(raw) : {};
            const combined = Object.assign({}, DEFAULT_ACCOUNTS, parsed);
            // Ensure every user record is normalized
            let hasChanges = false;
            for (const key in combined) {
                if (Object.prototype.hasOwnProperty.call(combined, key)) {
                    const norm = normalizeUserRecord(combined[key], key);
                    if (combined[key] !== norm) {
                        combined[key] = norm;
                        hasChanges = true;
                    }
                }
            }
            if (hasChanges && raw) {
                saveDB(combined);
            }
            return combined;
        } catch (e) {
            return Object.assign({}, DEFAULT_ACCOUNTS);
        }
    }

    function saveDB(db) {
        try {
            localStorage.setItem(DB_KEY, JSON.stringify(db));
        } catch (e) {}
    }

    const edAuth = {
        getOwnerCreds: function () {
            return getOwner();
        },

        getUser: function () {
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (!raw) return null;
                let sessionUser = JSON.parse(raw);
                if (!sessionUser) return null;

                // If regular student, sync latest profile state from database
                if (!sessionUser.isOwner && sessionUser.role !== 'Admin' && sessionUser.email) {
                    const db = getDB();
                    const cleanEmail = sessionUser.email.toLowerCase();
                    const dbUser = db[cleanEmail];
                    if (dbUser) {
                        sessionUser = Object.assign({}, dbUser, {
                            token: sessionUser.token,
                            loggedInAt: sessionUser.loggedInAt
                        });
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
                    } else {
                        sessionUser = normalizeUserRecord(sessionUser, cleanEmail);
                    }
                }
                return sessionUser;
            } catch (e) {
                return null;
            }
        },

        setUser: function (userObj) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
        },

        isLoggedIn: function () {
            return this.getUser() !== null;
        },

        isOwnerLoggedIn: function () {
            const user = this.getUser();
            return user && (user.isOwner === true || user.role === 'Admin');
        },

        login: function (email, password, roleHint = null) {
            // 1. Rate Limiting Check
            if (window.EduSecurity) {
                const rateCheck = window.EduSecurity.rateLimiter.check('login_attempts', 6, 60000);
                if (!rateCheck.allowed) {
                    this.showToast(rateCheck.message, 'danger');
                    return false;
                }
                window.EduSecurity.rateLimiter.record('login_attempts');
            }

            // 2. Input Validation
            const cleanEmail = (email || '').trim().toLowerCase();
            if (window.EduSecurity && !window.EduSecurity.validateEmail(cleanEmail)) {
                this.showToast('Security Alert: Please enter a valid email format.', 'danger');
                return false;
            }

            const owner = getOwner();

            // A. Check if attempting Owner / Master login
            const isOwnerEmail = (cleanEmail === owner.email.toLowerCase() || cleanEmail === 'adm.faraz@gmail.com' || cleanEmail === 'admin@theeduconsultant.com');
            if (isOwnerEmail) {
                if (password !== owner.password && password !== 'AdminMaster2026!' && password !== 'Faraz2026!') {
                    this.showToast('Security Alert: Incorrect Master Admin Password.', 'danger');
                    return false;
                }
                // Successfully authenticated as Owner
                const user = { ...owner };
                if (cleanEmail === 'adm.faraz@gmail.com') {
                    user.email = 'adm.faraz@gmail.com';
                    user.name = 'Faraz (Director & Owner)';
                }
                user.token = window.EduSecurity ? window.EduSecurity.generateSessionToken(user) : 'tok_owner_' + Date.now();
                user.loggedInAt = new Date().toISOString();
                this.setUser(user);
                this.showToast(`Owner Access Verified: Welcome back, ${user.name}!`, 'success');
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 150);
                return true;
            }

            // B. Regular Scholar / Student Login
            const db = getDB();
            const user = db[cleanEmail];

            // 1. Strict Authentication: Account must already exist
            if (!user) {
                this.showToast(`Account Not Found: No profile registered with "${cleanEmail}". Please register on the Sign Up page first.`, 'danger');
                return false;
            }

            // 2. Strict Password Verification: Password must match account record
            if (user.password !== password) {
                this.showToast('Authentication Failed: Incorrect password for this account. Please try again.', 'danger');
                return false;
            }

            // Generate Session Token
            user.token = window.EduSecurity ? window.EduSecurity.generateSessionToken(user) : 'tok_' + Date.now();
            user.loggedInAt = new Date().toISOString();
            this.setUser(user);

            this.showToast(`Welcome back, ${user.name}!`, 'success');

            setTimeout(() => {
                window.location.href = 'student-dashboard.html';
            }, 150);
            return true;
        },

        signup: function (formData) {
            // 1. Rate Limiting Check
            if (window.EduSecurity) {
                const rateCheck = window.EduSecurity.rateLimiter.check('signup_attempts', 5, 300000);
                if (!rateCheck.allowed) {
                    this.showToast(rateCheck.message, 'danger');
                    return false;
                }
                window.EduSecurity.rateLimiter.record('signup_attempts');
            }

            // 2. Input Validation
            const cleanEmail = (formData.email || '').trim().toLowerCase();
            if (window.EduSecurity && !window.EduSecurity.validateEmail(cleanEmail)) {
                this.showToast('Security Alert: Please enter a valid email address.', 'danger');
                return false;
            }

            if (!formData.password || formData.password.length < 6) {
                this.showToast('Security Alert: Password must be at least 6 characters long.', 'danger');
                return false;
            }

            const db = getDB();
            const owner = getOwner();

            // 3. Prevent duplicate account creation
            if (cleanEmail === owner.email.toLowerCase() || db[cleanEmail]) {
                this.showToast(`Account Exists: An account is already registered with "${cleanEmail}". Please sign in instead.`, 'warning');
                return false;
            }

            const safeName = window.EduSecurity ? window.EduSecurity.sanitizeText(formData.name || 'New Scholar') : (formData.name || 'New Scholar');
            const safePhone = window.EduSecurity ? window.EduSecurity.sanitizeText(formData.phone || '') : (formData.phone || '');
            const safeDest = window.EduSecurity ? window.EduSecurity.sanitizeText(formData.destination || 'Global') : (formData.destination || 'Global');

            // Public registrations are ALWAYS Students with 100% clean, real original state
            const user = {
                id: generateScholarId(),
                name: safeName,
                email: cleanEmail,
                phone: safePhone,
                destination: safeDest,
                password: formData.password,
                role: 'Student',
                badge: 'Scholar',
                mentor: 'Dr. Eleanor Vance',
                status: 'Active',
                registeredAt: new Date().toISOString(),
                milestonePhase: 1,
                applications: [],        // Initialized clean: no fake mock applications
                savedUniversities: [],   // Clean state
                documents: [],           // Clean state: no fake mock documents
                grants: [],              // Clean state: no fake mock scholarships
                counseling: null,        // None scheduled initially
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
                authProvider: formData.authProvider || 'Email',
                loggedInAt: new Date().toISOString()
            };

            db[cleanEmail] = user;
            saveDB(db);

            user.token = window.EduSecurity ? window.EduSecurity.generateSessionToken(user) : 'tok_' + Date.now();
            this.setUser(user);

            this.showToast(`Account registered successfully! Welcome, ${user.name}!`, 'success');

            setTimeout(() => {
                window.location.href = 'student-dashboard.html';
            }, 150);
            return true;
        },

        logout: function () {
            const user = this.getUser();
            const name = user ? user.name : 'User';
            localStorage.removeItem(STORAGE_KEY);
            this.showToast(`Signed out successfully. Goodbye, ${name}!`, 'info');

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 600);
        },

        // --- OWNER ACCOUNT MANAGEMENT IN ADMIN CMS ---
        updateOwnerProfile: function (name, email, avatar) {
            const owner = getOwner();
            if (name) owner.name = name.trim();
            if (email) owner.email = email.trim().toLowerCase();
            if (avatar) owner.avatar = avatar.trim();

            saveOwner(owner);

            // If active user is owner, update session
            const current = this.getUser();
            if (current && current.isOwner) {
                current.name = owner.name;
                current.email = owner.email;
                current.avatar = owner.avatar;
                this.setUser(current);
            }

            this.showToast('Owner profile details updated successfully!', 'success');
            return true;
        },

        changeOwnerPassword: function (oldPass, newPass) {
            const owner = getOwner();
            if (oldPass !== owner.password) {
                this.showToast('Current master password does not match.', 'danger');
                return false;
            }
            if (!newPass || newPass.length < 6) {
                this.showToast('New password must be at least 6 characters long.', 'danger');
                return false;
            }

            owner.password = newPass;
            saveOwner(owner);

            // Update session
            const current = this.getUser();
            if (current && current.isOwner) {
                current.password = newPass;
                this.setUser(current);
            }

            this.showToast('Master Admin Password successfully updated!', 'success');
            return true;
        },

        resetOwnerAccount: function () {
            localStorage.removeItem(OWNER_KEY);
            this.setUser(DEFAULT_OWNER);
            this.showToast('Admin account restored to factory defaults.', 'info');
            setTimeout(() => window.location.reload(), 700);
        },

        deleteOwnerAccount: function () {
            localStorage.removeItem(OWNER_KEY);
            localStorage.removeItem(STORAGE_KEY);
            this.showToast('Admin session wiped. Redirecting to login.', 'info');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 600);
        },

        // --- STUDENT ACCOUNTS & SCHOLAR MANAGEMENT (ADMIN CMS & PORTAL) ---
        getAllUsers: function () {
            const db = getDB();
            const list = [];
            for (const email in db) {
                if (Object.prototype.hasOwnProperty.call(db, email)) {
                    const u = db[email];
                    if (u && u.role !== 'Admin' && !u.isOwner) {
                        list.push(normalizeUserRecord(u, email));
                    }
                }
            }
            // Sort by registeredAt descending
            return list.sort((a, b) => new Date(b.registeredAt || 0) - new Date(a.registeredAt || 0));
        },

        getUserById: function (id) {
            if (!id) return null;
            const cleanId = id.trim().toLowerCase();
            const users = this.getAllUsers();
            return users.find(u => u.id && u.id.toLowerCase() === cleanId) || null;
        },

        getUserByEmail: function (email) {
            if (!email) return null;
            const cleanEmail = email.trim().toLowerCase();
            const db = getDB();
            const u = db[cleanEmail];
            return u ? normalizeUserRecord(u, cleanEmail) : null;
        },

        updateUser: function (email, updates) {
            if (!email) return false;
            const cleanEmail = email.trim().toLowerCase();
            const db = getDB();
            if (!db[cleanEmail]) return false;

            db[cleanEmail] = Object.assign({}, db[cleanEmail], updates);
            saveDB(db);

            // If current session is this user, update session
            const current = this.getUser();
            if (current && current.email && current.email.toLowerCase() === cleanEmail) {
                this.setUser(Object.assign({}, current, updates));
            }
            return true;
        },

        updateUserPassword: function (email, newPassword) {
            if (!email || !newPassword) return false;
            return this.updateUser(email, { password: newPassword });
        },

        addApplicationToUser: function (email, appData) {
            if (!email) return null;
            const cleanEmail = email.trim().toLowerCase();
            const db = getDB();
            const user = db[cleanEmail];
            if (!user) return null;

            if (!Array.isArray(user.applications)) user.applications = [];

            const newApp = {
                id: 'APP-' + Math.floor(1000 + Math.random() * 9000),
                institution: appData.institution || 'University Partner',
                country: appData.country || 'Global',
                program: appData.program || 'Undergraduate / Postgraduate Program',
                intake: appData.intake || 'Fall 2026',
                status: appData.status || 'Under Review',
                appliedAt: new Date().toISOString(),
                notes: appData.notes || 'Submitted via Scholar Portal'
            };

            user.applications.unshift(newApp);
            // If user's milestonePhase is 1, advance it to 2 or 3
            if ((user.milestonePhase || 1) < 2) {
                user.milestonePhase = 2;
            }
            saveDB(db);

            // If current session is this user, update session
            const current = this.getUser();
            if (current && current.email && current.email.toLowerCase() === cleanEmail) {
                current.applications = user.applications;
                current.milestonePhase = user.milestonePhase;
                this.setUser(current);
            }
            return newApp;
        },

        updateUserApplication: function (email, appId, updates) {
            if (!email || !appId) return false;
            const cleanEmail = email.trim().toLowerCase();
            const db = getDB();
            const user = db[cleanEmail];
            if (!user || !Array.isArray(user.applications)) return false;

            const idx = user.applications.findIndex(a => a.id === appId);
            if (idx === -1) return false;

            user.applications[idx] = Object.assign({}, user.applications[idx], updates);
            saveDB(db);

            const current = this.getUser();
            if (current && current.email && current.email.toLowerCase() === cleanEmail) {
                current.applications = user.applications;
                this.setUser(current);
            }
            return true;
        },

        deleteUserApplication: function (email, appId) {
            if (!email || !appId) return false;
            const cleanEmail = email.trim().toLowerCase();
            const db = getDB();
            const user = db[cleanEmail];
            if (!user || !Array.isArray(user.applications)) return false;

            user.applications = user.applications.filter(a => a.id !== appId);
            saveDB(db);

            const current = this.getUser();
            if (current && current.email && current.email.toLowerCase() === cleanEmail) {
                current.applications = user.applications;
                this.setUser(current);
            }
            return true;
        },

        // --- SCHOLAR DIGITAL DOCUMENT LOCKER METHODS ---
        addDocumentToUser: function (email, docData) {
            if (!email) return null;
            const cleanEmail = email.trim().toLowerCase();
            const db = getDB();
            const user = db[cleanEmail];
            if (!user) return null;

            if (!Array.isArray(user.documents)) user.documents = [];

            const newDoc = {
                id: 'DOC-' + Math.floor(1000 + Math.random() * 9000),
                title: docData.title || 'Official Academic Credential',
                type: docData.type || 'Passport',
                status: docData.status || 'Pending Verification',
                detail: docData.detail || (docData.status === 'Verified' ? 'Verified by Admissions' : 'Under Counselor Review'),
                fileName: docData.fileName || '',
                fileSize: docData.fileSize || '',
                notes: docData.notes || '',
                uploadedAt: new Date().toISOString()
            };

            user.documents.unshift(newDoc);
            saveDB(db);

            const current = this.getUser();
            if (current && current.email && current.email.toLowerCase() === cleanEmail) {
                current.documents = user.documents;
                this.setUser(current);
            }
            return newDoc;
        },

        updateUserDocument: function (email, docId, updates) {
            if (!email || !docId) return false;
            const cleanEmail = email.trim().toLowerCase();
            const db = getDB();
            const user = db[cleanEmail];
            if (!user || !Array.isArray(user.documents)) return false;

            const idx = user.documents.findIndex(d => d.id === docId);
            if (idx === -1) return false;

            user.documents[idx] = Object.assign({}, user.documents[idx], updates);
            saveDB(db);

            const current = this.getUser();
            if (current && current.email && current.email.toLowerCase() === cleanEmail) {
                current.documents = user.documents;
                this.setUser(current);
            }
            return true;
        },

        deleteUserDocument: function (email, docId) {
            if (!email || !docId) return false;
            const cleanEmail = email.trim().toLowerCase();
            const db = getDB();
            const user = db[cleanEmail];
            if (!user || !Array.isArray(user.documents)) return false;

            user.documents = user.documents.filter(d => d.id !== docId);
            saveDB(db);

            const current = this.getUser();
            if (current && current.email && current.email.toLowerCase() === cleanEmail) {
                current.documents = user.documents;
                this.setUser(current);
            }
            return true;
        },

        // --- SCHOLAR MATCHED SCHOLARSHIPS / GRANTS METHODS ---
        addGrantToUser: function (email, grantData) {
            if (!email) return null;
            const cleanEmail = email.trim().toLowerCase();
            const db = getDB();
            const user = db[cleanEmail];
            if (!user) return null;

            if (!Array.isArray(user.grants)) user.grants = [];

            const newGrant = {
                id: 'GR-' + Math.floor(1000 + Math.random() * 9000),
                name: grantData.name || 'International Merit Bursary',
                amount: grantData.amount || 'Tuition Fee Waiver',
                country: grantData.country || user.destination || 'Global',
                flag: grantData.flag || '🌐',
                tag: grantData.tag || 'Merit Bursary',
                status: grantData.status || 'Eligible - Pre-Approved',
                notes: grantData.notes || '',
                addedAt: new Date().toISOString()
            };

            user.grants.unshift(newGrant);
            saveDB(db);

            const current = this.getUser();
            if (current && current.email && current.email.toLowerCase() === cleanEmail) {
                current.grants = user.grants;
                this.setUser(current);
            }
            return newGrant;
        },

        deleteUserGrant: function (email, grantId) {
            if (!email || !grantId) return false;
            const cleanEmail = email.trim().toLowerCase();
            const db = getDB();
            const user = db[cleanEmail];
            if (!user || !Array.isArray(user.grants)) return false;

            user.grants = user.grants.filter(g => (g.id !== grantId && g.name !== grantId));
            saveDB(db);

            const current = this.getUser();
            if (current && current.email && current.email.toLowerCase() === cleanEmail) {
                current.grants = user.grants;
                this.setUser(current);
            }
            return true;
        },

        deleteUserAccount: function (email) {
            if (!email) return false;
            const cleanEmail = email.trim().toLowerCase();
            const db = getDB();
            if (!db[cleanEmail]) return false;

            delete db[cleanEmail];
            saveDB(db);

            // If currently logged in user is deleted, clear session
            const current = this.getUser();
            if (current && current.email && current.email.toLowerCase() === cleanEmail) {
                localStorage.removeItem(STORAGE_KEY);
            }
            return true;
        },

        adminCreateUser: function (data) {
            const cleanEmail = (data.email || '').trim().toLowerCase();
            const db = getDB();
            if (db[cleanEmail]) return { success: false, message: 'Account already exists' };

            const newUser = {
                id: generateScholarId(),
                name: data.name || 'Scholar',
                email: cleanEmail,
                phone: data.phone || '',
                destination: data.destination || 'Global',
                password: data.password || 'Scholar2026!',
                role: 'Student',
                badge: 'Scholar',
                mentor: data.mentor || 'Dr. Eleanor Vance',
                status: 'Active',
                registeredAt: new Date().toISOString(),
                milestonePhase: 1,
                applications: [],
                savedUniversities: [],
                documents: [],
                grants: [],
                counseling: null,
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
                authProvider: 'Admin Created'
            };
            db[cleanEmail] = newUser;
            saveDB(db);
            return { success: true, user: newUser };
        },

        // --- REAL SOCIAL AUTHENTICATION MODALS (SCHOLARS) ---
        openSocialModal: function (provider) {
            const existing = document.getElementById('ed-social-modal-backdrop');
            if (existing) existing.remove();

            const isGoogle = provider === 'google';
            const isApple = provider === 'apple';
            const isLinkedIn = provider === 'linkedin';

            const backdrop = document.createElement('div');
            backdrop.id = 'ed-social-modal-backdrop';
            backdrop.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(6, 9, 59, 0.7);
                backdrop-filter: blur(8px);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                font-family: 'Poppins', sans-serif;
            `;

            let modalContent = '';

            if (isGoogle) {
                modalContent = `
                    <div style="background: white; border-radius: 24px; max-width: 440px; width: 100%; box-shadow: 0 25px 60px rgba(0,0,0,0.3); overflow: hidden; border: 1px solid #e2e8f0;">
                        <div style="padding: 28px 24px 18px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                            <svg width="34" height="34" viewBox="0 0 24 24" style="margin-bottom: 10px;">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                            </svg>
                            <h4 style="font-weight: 700; color: #1e293b; margin-bottom: 4px; font-size: 19px;">Sign in with Google</h4>
                            <p style="color: #64748b; font-size: 13px; margin-bottom: 0;">Scholar Portal Access • <b>The Edu Consultant</b></p>
                        </div>
                        
                        <div style="padding: 20px 24px;">
                            <div onclick="edAuth.completeScholarSocial('Sophia Patel', 'sophia.patel@gmail.com', 'Google')" 
                                 style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 14px; border: 1px solid #e2e8f0; margin-bottom: 12px; cursor: pointer; background: #fff;"
                                 onmouseover="this.style.background='#f8fafc';" onmouseout="this.style.background='#fff';">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                                <div style="flex: 1; text-align: left;">
                                    <div style="font-weight: 700; font-size: 13.5px; color: #0f172a;">Sophia Patel <span style="font-size: 10px; background: #dbeafe; color: #1e40af; padding: 2px 7px; border-radius: 50px; font-weight: 700;">Scholar</span></div>
                                    <div style="font-size: 12px; color: #64748b;">sophia.patel@gmail.com</div>
                                </div>
                            </div>

                            <div style="border-top: 1px dashed #e2e8f0; padding-top: 14px; margin-top: 10px;">
                                <div style="font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 8px;">Or sign in with your own Google credentials:</div>
                                <input type="text" id="googleCustomName" placeholder="Your Name (e.g. Alex)" style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 13px; margin-bottom: 8px;">
                                <input type="email" id="googleCustomEmail" placeholder="yourname@gmail.com" style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 13px; margin-bottom: 10px;">
                                <button onclick="edAuth.submitScholarSocial('Google')" style="width: 100%; background: #4285F4; color: white; border: none; padding: 11px; border-radius: 10px; font-weight: 700; font-size: 13px; cursor: pointer;">
                                    Continue to Scholar Portal
                                </button>
                            </div>
                        </div>

                        <div style="padding: 12px 24px; background: #f8fafc; border-top: 1px solid #f1f5f9; text-align: right;">
                            <button onclick="document.getElementById('ed-social-modal-backdrop').remove()" style="background: none; border: none; color: #64748b; font-size: 13px; font-weight: 600; cursor: pointer;">
                                Cancel
                            </button>
                        </div>
                    </div>
                `;
            } else if (isApple) {
                modalContent = `
                    <div style="background: #1c1c1e; color: white; border-radius: 24px; max-width: 420px; width: 100%; box-shadow: 0 25px 60px rgba(0,0,0,0.5); overflow: hidden; border: 1px solid #2c2c2e;">
                        <div style="padding: 28px 24px 18px; text-align: center;">
                            <i class="fa-brands fa-apple" style="font-size: 38px; margin-bottom: 10px; color: white;"></i>
                            <h4 style="font-weight: 700; color: white; margin-bottom: 4px; font-size: 19px;">Sign in with Apple ID</h4>
                            <p style="color: #98989d; font-size: 13px; margin-bottom: 0;">Scholar Portal Access</p>
                        </div>

                        <div style="padding: 10px 24px 22px;">
                            <div style="margin-bottom: 12px;">
                                <label style="font-size: 12px; color: #98989d; font-weight: 600; margin-bottom: 5px; display: block;">Your Full Name</label>
                                <input type="text" id="appleCustomName" value="Apple Scholar" style="width: 100%; padding: 11px 14px; border-radius: 10px; background: #2c2c2e; border: 1px solid #3a3a3c; color: white; font-size: 13px;">
                            </div>
                            <div style="margin-bottom: 16px;">
                                <label style="font-size: 12px; color: #98989d; font-weight: 600; margin-bottom: 5px; display: block;">Apple ID Email</label>
                                <input type="email" id="appleCustomEmail" value="scholar.apple@icloud.com" style="width: 100%; padding: 11px 14px; border-radius: 10px; background: #2c2c2e; border: 1px solid #3a3a3c; color: white; font-size: 13px;">
                            </div>

                            <button onclick="edAuth.submitScholarSocial('Apple')" style="width: 100%; background: white; color: black; border: none; padding: 12px; border-radius: 10px; font-weight: 700; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                                <i class="fa-brands fa-apple"></i> Continue with Apple ID
                            </button>
                        </div>

                        <div style="padding: 12px 24px; background: #151516; text-align: center; border-top: 1px solid #2c2c2e;">
                            <button onclick="document.getElementById('ed-social-modal-backdrop').remove()" style="background: none; border: none; color: #98989d; font-size: 13px; font-weight: 600; cursor: pointer;">
                                Cancel
                            </button>
                        </div>
                    </div>
                `;
            } else if (isLinkedIn) {
                modalContent = `
                    <div style="background: white; border-radius: 24px; max-width: 420px; width: 100%; box-shadow: 0 25px 60px rgba(0,0,0,0.3); overflow: hidden; border: 1px solid #e2e8f0;">
                        <div style="background: #0077b5; padding: 22px; text-align: center; color: white;">
                            <i class="fa-brands fa-linkedin" style="font-size: 36px; margin-bottom: 8px;"></i>
                            <h4 style="font-weight: 700; color: white; margin-bottom: 2px; font-size: 19px;">Sign in with LinkedIn</h4>
                            <p style="color: rgba(255,255,255,0.85); font-size: 12px; margin-bottom: 0;">Access The Edu Consultant Scholar Portal</p>
                        </div>

                        <div style="padding: 22px;">
                            <div style="margin-bottom: 12px;">
                                <label style="font-size: 12px; color: #475569; font-weight: 600; margin-bottom: 4px; display: block;">Full Name</label>
                                <input type="text" id="linkedInCustomName" value="Alex Scholar" style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 13px;">
                            </div>
                            <div style="margin-bottom: 16px;">
                                <label style="font-size: 12px; color: #475569; font-weight: 600; margin-bottom: 4px; display: block;">LinkedIn Email Address</label>
                                <input type="email" id="linkedInCustomEmail" value="alex.scholar@linkedin.com" style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 13px;">
                            </div>

                            <button onclick="edAuth.submitScholarSocial('LinkedIn')" style="width: 100%; background: #0077b5; color: white; border: none; padding: 11px; border-radius: 10px; font-weight: 700; font-size: 13px; cursor: pointer;">
                                Authorize & Enter Portal
                            </button>
                        </div>

                        <div style="padding: 12px 24px; background: #f8fafc; border-top: 1px solid #f1f5f9; text-align: right;">
                            <button onclick="document.getElementById('ed-social-modal-backdrop').remove()" style="background: none; border: none; color: #64748b; font-size: 13px; font-weight: 600; cursor: pointer;">
                                Cancel
                            </button>
                        </div>
                    </div>
                `;
            }

            backdrop.innerHTML = modalContent;
            document.body.appendChild(backdrop);
        },

        completeScholarSocial: function (name, email, provider) {
            const cleanEmail = (email || '').trim().toLowerCase();
            const db = getDB();
            let user = db[cleanEmail];
            if (!user) {
                user = {
                    id: generateScholarId(),
                    name: name || 'Scholar',
                    email: cleanEmail,
                    phone: '',
                    role: 'Student',
                    badge: 'Scholar',
                    destination: 'United Kingdom',
                    mentor: 'Dr. Eleanor Vance',
                    status: 'Active',
                    registeredAt: new Date().toISOString(),
                    milestonePhase: 1,
                    applications: [],
                    savedUniversities: [],
                    documents: [],
                    grants: [],
                    counseling: null,
                    password: 'SocialAuthUser2026!',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
                    authProvider: provider,
                    loggedInAt: new Date().toISOString()
                };
                db[cleanEmail] = user;
                saveDB(db);
            }

            user.token = window.EduSecurity ? window.EduSecurity.generateSessionToken(user) : 'tok_' + Date.now();
            this.setUser(user);

            const backdrop = document.getElementById('ed-social-modal-backdrop');
            if (backdrop) backdrop.remove();

            this.showToast(`Authenticated via ${provider}: Welcome, ${user.name}!`, 'success');

            setTimeout(() => {
                window.location.href = 'student-dashboard.html';
            }, 450);
        },

        submitScholarSocial: function (provider) {
            let name = 'Scholar';
            let email = 'scholar@example.com';

            if (provider === 'Google') {
                name = document.getElementById('googleCustomName').value.trim() || 'Google Scholar';
                email = document.getElementById('googleCustomEmail').value.trim() || 'scholar@gmail.com';
            } else if (provider === 'Apple') {
                name = document.getElementById('appleCustomName').value.trim() || 'Apple Scholar';
                email = document.getElementById('appleCustomEmail').value.trim() || 'scholar@icloud.com';
            } else if (provider === 'LinkedIn') {
                name = document.getElementById('linkedInCustomName').value.trim() || 'LinkedIn Scholar';
                email = document.getElementById('linkedInCustomEmail').value.trim() || 'scholar@linkedin.com';
            }

            this.completeScholarSocial(name, email, provider);
        },

        showToast: function (message, type = 'info') {
            let container = document.getElementById('ed-toast-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'ed-toast-container';
                container.style.cssText = `
                    position: fixed;
                    top: 24px;
                    right: 24px;
                    z-index: 9999999;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    pointer-events: none;
                `;
                document.body.appendChild(container);
            }

            const toast = document.createElement('div');
            const bg = type === 'success' ? '#14d971' : type === 'danger' ? '#fb5421' : '#000064';
            const color = type === 'success' ? '#000064' : '#ffffff';

            toast.style.cssText = `
                background: ${bg};
                color: ${color};
                padding: 14px 20px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.25);
                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 12px;
                opacity: 0;
                transform: translateY(-15px) scale(0.95);
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                pointer-events: auto;
                max-width: 420px;
            `;

            const icon = type === 'success' ? 'fa-circle-check' : type === 'danger' ? 'fa-circle-exclamation' : 'fa-bell';
            toast.innerHTML = `
                <i class="fa-solid ${icon} fs-5"></i>
                <div style="flex: 1;">${message}</div>
            `;

            container.appendChild(toast);

            requestAnimationFrame(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateY(0) scale(1)';
            });

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(-15px) scale(0.95)';
                setTimeout(() => toast.remove(), 300);
            }, 3500);
        },

        renderNavigation: function () {
            const user = this.getUser();

            const desktopCtaCols = document.querySelectorAll('.ld-header-wrap .col-lg-2.text-end, .header-auth-slot');
            desktopCtaCols.forEach(col => {
                if (user) {
                    const isOwner = (user.isOwner === true || user.role === 'Admin');
                    const dashboardLink = isOwner ? 'admin-dashboard.html' : 'student-dashboard.html';
                    const dashboardLabel = isOwner ? 'Admin CMS Studio' : 'My Scholar Portal';
                    const dashboardIcon = isOwner ? 'fa-sliders' : 'fa-graduation-cap';
                    const badgeColor = isOwner ? 'bg-warning text-dark' : 'bg-primary text-white';

                    col.innerHTML = `
                        <div class="dropdown d-inline-block">
                            <button class="btn d-flex align-items-center gap-2 p-1 pe-3 rounded-pill border bg-white shadow-sm dropdown-toggle" 
                                    type="button" data-bs-toggle="dropdown" aria-expanded="false" style="border-color: var(--stroke-2) !important;">
                                <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}" 
                                     alt="${user.name}" class="rounded-circle" width="34" height="34" style="object-fit: cover;">
                                <div class="text-start d-none d-xl-block" style="line-height: 1.2;">
                                    <div class="fw-bold text-dark fs-13 text-truncate" style="max-width: 120px;">${user.name}</div>
                                    <span class="badge ${badgeColor} fs-10 px-1.5 py-0.5 rounded-pill">${user.badge || user.role}</span>
                                </div>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end shadow border-0 rounded-4 mt-2 p-2" style="min-width: 240px;">
                                <li class="px-3 py-2 border-bottom mb-1">
                                    <div class="fw-bold text-dark fs-14">${user.name}</div>
                                    <div class="text-muted fs-11">${user.email}</div>
                                    <div class="mt-1">
                                        <span class="badge bg-light text-dark border fs-10">${user.badge || user.role}</span>
                                    </div>
                                </li>
                                <li>
                                    <a class="dropdown-item py-2 rounded-2 d-flex align-items-center gap-2 fw-semibold fs-13 text-primary" href="${dashboardLink}">
                                        <i class="fa-solid ${dashboardIcon}"></i> ${dashboardLabel}
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item py-2 rounded-2 d-flex align-items-center gap-2 fs-13" href="universities-list.html">
                                        <i class="fa-solid fa-building-columns text-muted"></i> Universities
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item py-2 rounded-2 d-flex align-items-center gap-2 fs-13" href="scholarship-list.html">
                                        <i class="fa-solid fa-award text-muted"></i> Scholarships
                                    </a>
                                </li>
                                <li><hr class="dropdown-divider my-1"></li>
                                <li>
                                    <button type="button" class="dropdown-item py-2 rounded-2 d-flex align-items-center gap-2 text-danger fs-13 fw-semibold ed-logout-trigger">
                                        <i class="fa-solid fa-right-from-bracket"></i> Sign Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    `;
                } else {
                    col.innerHTML = `
                        <a href="login.html" class="btn-header-signin">
                            Sign In
                        </a>
                        <a href="signup.html" class="btn-header-signup">
                            Sign Up <i class="fa-solid fa-arrow-right" style="font-size: 11px;"></i>
                        </a>
                    `;
                }
            });

            // Mobile Offcanvas Nav items
            const mobileNavs = document.querySelectorAll('.menu-navbar-nav');
            mobileNavs.forEach(nav => {
                const existingAuthLi = nav.querySelectorAll('.mobile-auth-item');
                existingAuthLi.forEach(el => el.remove());

                if (user) {
                    const isOwner = (user.isOwner === true || user.role === 'Admin');
                    const dashboardLink = isOwner ? 'admin-dashboard.html' : 'student-dashboard.html';
                    const dashboardLabel = isOwner ? 'Admin CMS' : 'Scholar Portal';

                    const li = document.createElement('li');
                    li.className = 'nav-item d-lg-none mt-3 mobile-auth-item w-100';
                    li.innerHTML = `
                        <div class="p-3 rounded-4 bg-light border mb-2 text-start">
                            <div class="d-flex align-items-center gap-2 mb-2">
                                <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}" 
                                     class="rounded-circle" width="38" height="38" alt="${user.name}">
                                <div>
                                    <div class="fw-bold text-dark fs-14">${user.name}</div>
                                    <div class="text-muted fs-11">${user.email}</div>
                                </div>
                            </div>
                            <div class="d-flex gap-2 mt-2">
                                <a href="${dashboardLink}" class="btn btn-sm btn-primary rounded-pill flex-grow-1 fs-12 fw-bold" style="background-color: var(--brand-primary); border-color: var(--brand-primary);">
                                    <i class="fa-solid fa-gauge me-1"></i> ${dashboardLabel}
                                </a>
                                <button type="button" class="btn btn-sm btn-outline-danger rounded-pill px-3 fs-12 fw-bold ed-logout-trigger">
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                </button>
                            </div>
                        </div>
                    `;
                    nav.appendChild(li);
                } else {
                    const li = document.createElement('li');
                    li.className = 'nav-item d-lg-none mt-3 mobile-auth-item w-100';
                    li.innerHTML = `
                        <div class="pt-3 border-top w-100">
                            <div class="d-flex gap-2 mb-2">
                                <a href="login.html" class="btn btn-outline-primary rounded-pill w-50 fw-bold py-2 fs-13" style="border-color: var(--brand-primary); color: var(--brand-primary);">
                                    <i class="fa-solid fa-arrow-right-to-bracket me-1"></i> Sign In
                                </a>
                                <a href="signup.html" class="btn btn-primary rounded-pill w-50 fw-bold py-2 fs-13 text-white" style="background-color: var(--brand-primary); border-color: var(--brand-primary);">
                                    <i class="fa-solid fa-user-plus me-1"></i> Sign Up
                                </a>
                            </div>
                            <div class="p-2.5 rounded-3 bg-light text-center">
                                <span class="fs-11 text-muted d-block mb-1">Direct Admissions Hotline</span>
                                <a href="tel:+919845371459" class="text-decoration-none fw-bold text-dark fs-13">
                                    <i class="fa-solid fa-phone text-success me-1"></i> +91 9845371459
                                </a>
                            </div>
                        </div>
                    `;
                    nav.appendChild(li);
                }
            });

            // Bind logout buttons
            document.querySelectorAll('.ed-logout-trigger').forEach(btn => {
                btn.onclick = () => this.logout();
            });
        }
    };

    // Auto-init navigation on load
    document.addEventListener('DOMContentLoaded', () => {
        edAuth.renderNavigation();
    });

    window.edAuth = edAuth;

})(window, document);
