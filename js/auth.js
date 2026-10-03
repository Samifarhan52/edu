/**
 * The Edu Consultants - Centralized Authentication, Social OAuth & Session Management
 * Features:
 * 1. Persistent User Database (localStorage: the_edu_users_db)
 * 2. Realistic Social Authentication Modals (Google, Apple, LinkedIn)
 * 3. Role-Based Routing & Authorization (Student Portal vs Admin CMS Studio)
 * 4. 1-Click Fast Role Switcher & Live Navbar Integration
 * 5. Rate Limiting & Input Sanitization
 */

(function (window, document) {
    'use strict';

    const STORAGE_KEY = 'ed_user';
    const DB_KEY = 'the_edu_users_db';

    // Default Seed Accounts
    const DEFAULT_ACCOUNTS = {
        'admin@theeduconsultants.org': {
            name: 'Alexander Morgan',
            email: 'admin@theeduconsultants.org',
            password: 'password123',
            role: 'Admin',
            badge: 'Admin',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
            authProvider: 'System'
        },
        'counselor@theeduconsultants.org': {
            name: 'Dr. Eleanor Vance',
            email: 'counselor@theeduconsultants.org',
            password: 'password123',
            role: 'Counselor',
            badge: 'Staff',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
            authProvider: 'System'
        },
        'student@theeduconsultants.org': {
            name: 'Sophia Patel',
            email: 'student@theeduconsultants.org',
            password: 'password123',
            role: 'Student',
            badge: 'Scholar',
            destination: 'United Kingdom',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
            authProvider: 'Email'
        }
    };

    // Ensure Persistent DB exists
    function getDB() {
        try {
            const raw = localStorage.getItem(DB_KEY);
            return raw ? JSON.parse(raw) : DEFAULT_ACCOUNTS;
        } catch (e) {
            return DEFAULT_ACCOUNTS;
        }
    }

    function saveDB(db) {
        try {
            localStorage.setItem(DB_KEY, JSON.stringify(db));
        } catch (e) {}
    }

    const edAuth = {
        getUser: function () {
            try {
                const data = localStorage.getItem(STORAGE_KEY);
                return data ? JSON.parse(data) : null;
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

            const db = getDB();
            let user = db[cleanEmail];

            if (!user) {
                // Dynamically register new account in DB
                const rawNamePart = email.split('@')[0] || 'Member';
                const safeName = window.EduSecurity ? window.EduSecurity.sanitizeText(rawNamePart) : rawNamePart;
                const formattedName = safeName.charAt(0).toUpperCase() + safeName.slice(1);
                const assignedRole = roleHint || (cleanEmail.includes('admin') ? 'Admin' : 'Student');

                user = {
                    name: formattedName,
                    email: cleanEmail,
                    password: password || '123456',
                    role: assignedRole,
                    badge: assignedRole === 'Admin' ? 'Admin' : assignedRole === 'Counselor' ? 'Staff' : 'Scholar',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
                    authProvider: 'Email'
                };
                db[cleanEmail] = user;
                saveDB(db);
            }

            // If roleHint passed explicitly, update role
            if (roleHint && user.role !== roleHint) {
                user.role = roleHint;
                user.badge = roleHint === 'Admin' ? 'Admin' : roleHint === 'Counselor' ? 'Staff' : 'Scholar';
            }

            // Generate Ephemeral Token
            user.token = window.EduSecurity ? window.EduSecurity.generateSessionToken(user) : 'tok_' + Date.now();
            user.loggedInAt = new Date().toISOString();
            this.setUser(user);

            // Role-Based Redirection:
            // Admin & Counselor -> admin-dashboard.html
            // Student & Scholar -> student-dashboard.html
            const isStaff = (user.role === 'Admin' || user.role === 'Counselor' || (user.role && user.role.toLowerCase().includes('director')));
            const destinationPage = isStaff ? 'admin-dashboard.html' : 'student-dashboard.html';

            this.showToast(`Authenticated as ${user.role}: Welcome back, ${user.name}!`, 'success');

            setTimeout(() => {
                window.location.href = destinationPage;
            }, 750);
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

            const safeName = window.EduSecurity ? window.EduSecurity.sanitizeText(formData.name || 'New Scholar') : (formData.name || 'New Scholar');
            const safePhone = window.EduSecurity ? window.EduSecurity.sanitizeText(formData.phone || '') : (formData.phone || '');
            const safeDest = window.EduSecurity ? window.EduSecurity.sanitizeText(formData.destination || 'Global') : (formData.destination || 'Global');
            const assignedRole = formData.role || 'Student';

            const user = {
                name: safeName,
                email: cleanEmail,
                phone: safePhone,
                destination: safeDest,
                password: formData.password || 'password123',
                role: assignedRole,
                badge: assignedRole === 'Admin' ? 'Admin' : assignedRole === 'Counselor' ? 'Staff' : 'Scholar',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
                authProvider: formData.authProvider || 'Email',
                loggedInAt: new Date().toISOString()
            };

            // Save to persistent user database
            const db = getDB();
            db[cleanEmail] = user;
            saveDB(db);

            user.token = window.EduSecurity ? window.EduSecurity.generateSessionToken(user) : 'tok_' + Date.now();
            this.setUser(user);

            this.showToast(`Account registered successfully! Welcome, ${user.name}!`, 'success');

            const destination = (assignedRole === 'Admin' || assignedRole === 'Counselor') ? 'admin-dashboard.html' : 'student-dashboard.html';
            setTimeout(() => {
                window.location.href = destination;
            }, 850);
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

        quickLogin: function (roleType) {
            if (roleType === 'admin') {
                this.login('admin@theeduconsultants.org', 'password123', 'Admin');
            } else if (roleType === 'counselor') {
                this.login('counselor@theeduconsultants.org', 'password123', 'Counselor');
            } else {
                this.login('student@theeduconsultants.org', 'password123', 'Student');
            }
        },

        // --- REALISTIC SOCIAL AUTHENTICATION MODAL ENGINE ---
        openSocialModal: function (provider) {
            // Remove existing modal if open
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
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                animation: fadeInModal 0.25s ease;
                font-family: 'Poppins', sans-serif;
            `;

            let modalContent = '';

            if (isGoogle) {
                modalContent = `
                    <div style="background: white; border-radius: 24px; max-width: 460px; width: 100%; box-shadow: 0 25px 60px rgba(0,0,0,0.3); overflow: hidden; border: 1px solid #e2e8f0;">
                        <div style="padding: 28px 28px 20px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                            <svg width="36" height="36" viewBox="0 0 24 24" style="margin-bottom: 12px;">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                            </svg>
                            <h4 style="font-weight: 700; color: #1e293b; margin-bottom: 4px; font-size: 20px;">Sign in with Google</h4>
                            <p style="color: #64748b; font-size: 13.5px; margin-bottom: 0;">to continue to <b>The Edu Consultants</b></p>
                        </div>
                        
                        <div style="padding: 20px 24px;">
                            <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.5px;">Choose an account</div>
                            
                            <div onclick="edAuth.completeSocialLogin('Alexander Morgan', 'alexander.morgan@gmail.com', 'Admin', 'Google')" 
                                 style="display: flex; align-items: center; gap: 14px; padding: 12px 14px; border-radius: 14px; border: 1px solid #e2e8f0; margin-bottom: 10px; cursor: pointer; transition: all 0.2s ease; background: #fff;"
                                 onmouseover="this.style.background='#f8fafc'; this.style.borderColor='#cbd5e1';"
                                 onmouseout="this.style.background='#fff'; this.style.borderColor='#e2e8f0';">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover;">
                                <div style="flex: 1; text-align: left;">
                                    <div style="font-weight: 700; font-size: 14px; color: #0f172a;">Alexander Morgan <span style="font-size: 11px; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 50px; font-weight: 700;">Director (Admin)</span></div>
                                    <div style="font-size: 12.5px; color: #64748b;">alexander.morgan@gmail.com</div>
                                </div>
                            </div>

                            <div onclick="edAuth.completeSocialLogin('Sophia Patel', 'sophia.patel@gmail.com', 'Student', 'Google')" 
                                 style="display: flex; align-items: center; gap: 14px; padding: 12px 14px; border-radius: 14px; border: 1px solid #e2e8f0; margin-bottom: 14px; cursor: pointer; transition: all 0.2s ease; background: #fff;"
                                 onmouseover="this.style.background='#f8fafc'; this.style.borderColor='#cbd5e1';"
                                 onmouseout="this.style.background='#fff'; this.style.borderColor='#e2e8f0';">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover;">
                                <div style="flex: 1; text-align: left;">
                                    <div style="font-weight: 700; font-size: 14px; color: #0f172a;">Sophia Patel <span style="font-size: 11px; background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 50px; font-weight: 700;">Scholar (Student)</span></div>
                                    <div style="font-size: 12.5px; color: #64748b;">sophia.patel@gmail.com</div>
                                </div>
                            </div>

                            <!-- Custom Google Account Input -->
                            <div style="border-top: 1px dashed #e2e8f0; padding-top: 14px; margin-top: 10px;">
                                <div style="font-size: 12.5px; font-weight: 600; color: #475569; margin-bottom: 8px;">Or sign in with your own Google Account:</div>
                                <input type="text" id="googleCustomName" placeholder="Your Full Name (e.g. Sami Farhan)" style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 13px; margin-bottom: 8px;">
                                <input type="email" id="googleCustomEmail" placeholder="yourname@gmail.com" style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 13px; margin-bottom: 8px;">
                                <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                                    <select id="googleCustomRole" style="flex: 1; padding: 10px 12px; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 13px;">
                                        <option value="Student">Role: Prospective Scholar (Student)</option>
                                        <option value="Admin">Role: Admissions Director (Admin)</option>
                                    </select>
                                    <button onclick="edAuth.submitCustomSocial('Google')" style="background: #4285F4; color: white; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 700; font-size: 13px; cursor: pointer;">
                                        Continue
                                    </button>
                                </div>
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
                    <div style="background: #1c1c1e; color: white; border-radius: 24px; max-width: 440px; width: 100%; box-shadow: 0 25px 60px rgba(0,0,0,0.5); overflow: hidden; border: 1px solid #2c2c2e;">
                        <div style="padding: 30px 28px 20px; text-align: center;">
                            <i class="fa-brands fa-apple" style="font-size: 42px; margin-bottom: 12px; color: white;"></i>
                            <h4 style="font-weight: 700; color: white; margin-bottom: 4px; font-size: 20px;">Sign in with Apple ID</h4>
                            <p style="color: #98989d; font-size: 13px; margin-bottom: 0;">Use your Apple ID for <b>The Edu Consultants</b></p>
                        </div>

                        <div style="padding: 10px 28px 24px;">
                            <div style="margin-bottom: 14px;">
                                <label style="font-size: 12px; color: #98989d; font-weight: 600; margin-bottom: 6px; display: block;">Apple ID Name</label>
                                <input type="text" id="appleCustomName" value="Apple Scholar" style="width: 100%; padding: 12px 14px; border-radius: 12px; background: #2c2c2e; border: 1px solid #3a3a3c; color: white; font-size: 14px;">
                            </div>
                            <div style="margin-bottom: 14px;">
                                <label style="font-size: 12px; color: #98989d; font-weight: 600; margin-bottom: 6px; display: block;">Apple ID Email</label>
                                <input type="email" id="appleCustomEmail" value="scholar.apple@icloud.com" style="width: 100%; padding: 12px 14px; border-radius: 12px; background: #2c2c2e; border: 1px solid #3a3a3c; color: white; font-size: 14px;">
                            </div>
                            <div style="margin-bottom: 20px;">
                                <label style="font-size: 12px; color: #98989d; font-weight: 600; margin-bottom: 6px; display: block;">Select Workspace Role</label>
                                <select id="appleCustomRole" style="width: 100%; padding: 12px 14px; border-radius: 12px; background: #2c2c2e; border: 1px solid #3a3a3c; color: white; font-size: 14px;">
                                    <option value="Student" selected>Scholar (Student Portal)</option>
                                    <option value="Admin">Director (Admin CMS Studio)</option>
                                </select>
                            </div>

                            <button onclick="edAuth.submitCustomSocial('Apple')" style="width: 100%; background: white; color: black; border: none; padding: 14px; border-radius: 12px; font-weight: 700; font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                                <i class="fa-brands fa-apple"></i> Continue with Apple Passkey
                            </button>
                        </div>

                        <div style="padding: 14px 28px; background: #151516; text-align: center; border-top: 1px solid #2c2c2e;">
                            <button onclick="document.getElementById('ed-social-modal-backdrop').remove()" style="background: none; border: none; color: #98989d; font-size: 13px; font-weight: 600; cursor: pointer;">
                                Cancel
                            </button>
                        </div>
                    </div>
                `;
            } else if (isLinkedIn) {
                modalContent = `
                    <div style="background: white; border-radius: 24px; max-width: 440px; width: 100%; box-shadow: 0 25px 60px rgba(0,0,0,0.3); overflow: hidden; border: 1px solid #e2e8f0;">
                        <div style="background: #0077b5; padding: 24px; text-align: center; color: white;">
                            <i class="fa-brands fa-linkedin" style="font-size: 40px; margin-bottom: 8px;"></i>
                            <h4 style="font-weight: 700; color: white; margin-bottom: 4px; font-size: 20px;">Sign in with LinkedIn</h4>
                            <p style="color: rgba(255,255,255,0.85); font-size: 13px; margin-bottom: 0;">The Edu Consultants is requesting access to your profile</p>
                        </div>

                        <div style="padding: 24px;">
                            <div style="background: #f8fafc; border-radius: 12px; padding: 12px; font-size: 12.5px; color: #64748b; margin-bottom: 16px;">
                                ✓ Use your name and photo<br>
                                ✓ Use primary email address for admissions updates
                            </div>
                            <div style="margin-bottom: 12px;">
                                <label style="font-size: 12px; color: #475569; font-weight: 600; margin-bottom: 4px; display: block;">Full Name</label>
                                <input type="text" id="linkedInCustomName" value="Alex LinkedIn" style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 13px;">
                            </div>
                            <div style="margin-bottom: 12px;">
                                <label style="font-size: 12px; color: #475569; font-weight: 600; margin-bottom: 4px; display: block;">Email Address</label>
                                <input type="email" id="linkedInCustomEmail" value="alex.scholar@linkedin.com" style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 13px;">
                            </div>
                            <div style="margin-bottom: 18px;">
                                <label style="font-size: 12px; color: #475569; font-weight: 600; margin-bottom: 4px; display: block;">Select Role</label>
                                <select id="linkedInCustomRole" style="width: 100%; padding: 10px 14px; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 13px;">
                                    <option value="Student">Prospective Scholar (Student)</option>
                                    <option value="Admin">Admissions Director (Admin)</option>
                                </select>
                            </div>

                            <button onclick="edAuth.submitCustomSocial('LinkedIn')" style="width: 100%; background: #0077b5; color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 700; font-size: 14px; cursor: pointer;">
                                Authorize & Sign In
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

        completeSocialLogin: function (name, email, role, provider) {
            const avatarMap = {
                'Alexander Morgan': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                'Sophia Patel': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
            };

            const user = {
                name: name,
                email: email,
                role: role,
                badge: role === 'Admin' ? 'Admin' : 'Scholar',
                avatar: avatarMap[name] || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
                authProvider: provider,
                destination: 'United Kingdom',
                loggedInAt: new Date().toISOString()
            };

            user.token = window.EduSecurity ? window.EduSecurity.generateSessionToken(user) : 'tok_' + Date.now();
            this.setUser(user);

            const db = getDB();
            db[email] = user;
            saveDB(db);

            const backdrop = document.getElementById('ed-social-modal-backdrop');
            if (backdrop) backdrop.remove();

            this.showToast(`Authenticated via ${provider}: Welcome, ${name}!`, 'success');

            const dest = (role === 'Admin' || role === 'Counselor') ? 'admin-dashboard.html' : 'student-dashboard.html';
            setTimeout(() => {
                window.location.href = dest;
            }, 700);
        },

        submitCustomSocial: function (provider) {
            let name = 'Member';
            let email = 'user@example.com';
            let role = 'Student';

            if (provider === 'Google') {
                name = document.getElementById('googleCustomName').value.trim() || 'Google User';
                email = document.getElementById('googleCustomEmail').value.trim() || 'user@gmail.com';
                role = document.getElementById('googleCustomRole').value;
            } else if (provider === 'Apple') {
                name = document.getElementById('appleCustomName').value.trim() || 'Apple User';
                email = document.getElementById('appleCustomEmail').value.trim() || 'scholar.apple@icloud.com';
                role = document.getElementById('appleCustomRole').value;
            } else if (provider === 'LinkedIn') {
                name = document.getElementById('linkedInCustomName').value.trim() || 'LinkedIn User';
                email = document.getElementById('linkedInCustomEmail').value.trim() || 'user@linkedin.com';
                role = document.getElementById('linkedInCustomRole').value;
            }

            this.completeSocialLogin(name, email, role, provider);
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
                    z-index: 999999;
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

            // 1. Desktop Nav CTA container
            const desktopCtaCols = document.querySelectorAll('.ld-header-wrap .col-lg-2.text-end, .header-auth-slot');
            desktopCtaCols.forEach(col => {
                if (user) {
                    const isStaff = (user.role === 'Admin' || user.role === 'Counselor' || (user.role && user.role.toLowerCase().includes('director')));
                    const dashboardLink = isStaff ? 'admin-dashboard.html' : 'student-dashboard.html';
                    const dashboardLabel = isStaff ? 'Admin CMS Studio' : 'My Scholar Portal';
                    const dashboardIcon = isStaff ? 'fa-chart-pie' : 'fa-graduation-cap';
                    const badgeColor = isStaff ? 'bg-warning text-dark' : 'bg-primary text-white';

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
                                        <span class="badge bg-light text-dark border fs-10">${user.authProvider || 'Account'}</span>
                                    </div>
                                </li>
                                <li>
                                    <a class="dropdown-item py-2 rounded-2 d-flex align-items-center gap-2 fw-semibold fs-13 text-primary" href="${dashboardLink}">
                                        <i class="fa-solid ${dashboardIcon}"></i> ${dashboardLabel}
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item py-2 rounded-2 d-flex align-items-center gap-2 fs-13" href="universities-list.html">
                                        <i class="fa-solid fa-building-columns text-muted"></i> Explore Universities
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item py-2 rounded-2 d-flex align-items-center gap-2 fs-13" href="scholarship-list.html">
                                        <i class="fa-solid fa-award text-muted"></i> Scholarships
                                    </a>
                                </li>
                                <li><hr class="dropdown-divider my-1"></li>
                                <li>
                                    ${isStaff ? 
                                        `<a class="dropdown-item py-2 rounded-2 d-flex align-items-center gap-2 fs-12 text-muted" href="student-dashboard.html">
                                            <i class="fa-solid fa-repeat"></i> View Scholar Portal
                                        </a>` :
                                        `<button type="button" class="dropdown-item py-2 rounded-2 d-flex align-items-center gap-2 fs-12 text-muted" onclick="edAuth.login('admin@theeduconsultants.org', '123456', 'Admin')">
                                            <i class="fa-solid fa-shield-halved"></i> Switch to Admin Mode
                                        </button>`
                                    }
                                </li>
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

            // 2. Mobile Offcanvas Nav items
            const mobileNavs = document.querySelectorAll('.menu-navbar-nav');
            mobileNavs.forEach(nav => {
                const existingAuthLi = nav.querySelectorAll('.mobile-auth-item');
                existingAuthLi.forEach(el => el.remove());

                if (user) {
                    const isStaff = (user.role === 'Admin' || user.role === 'Counselor');
                    const dashboardLink = isStaff ? 'admin-dashboard.html' : 'student-dashboard.html';
                    const dashboardLabel = isStaff ? 'Admin CMS' : 'Scholar Portal';

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
