/**
 * The Edu Consultants - Enterprise Security & Reliability Module
 * Implements:
 * 1. Client-Side & Action Rate Limiting (Brute force & spam defense)
 * 2. Strict Input Validation & XSS Sanitization
 * 3. Separation of Authentication (AuthN) from Authorization (AuthZ) via RBAC
 * 4. Secrets Management & Ephemeral Token Handling
 * 5. Safe File Upload & Image URL Validation
 * 6. Global Error Boundary & Graceful Degradation
 * 7. Information Leakage Prevention
 */

(function (window, document) {
    'use strict';

    // 1. RBAC PERMISSION MATRIX (AuthN != AuthZ)
    const ROLE_PERMISSIONS = {
        'Guest': [
            'read_public_pages',
            'read_blogs',
            'search_universities',
            'view_scholarships'
        ],
        'Student': [
            'read_public_pages',
            'read_blogs',
            'search_universities',
            'view_scholarships',
            'book_consultation',
            'apply_programs',
            'view_student_profile'
        ],
        'Counselor': [
            'read_public_pages',
            'read_blogs',
            'search_universities',
            'view_scholarships',
            'view_student_profile',
            'access_admin_dashboard',
            'view_pipeline',
            'review_applications',
            'schedule_sessions'
        ],
        'Admin': [
            'read_public_pages',
            'read_blogs',
            'search_universities',
            'view_scholarships',
            'access_admin_dashboard',
            'view_pipeline',
            'review_applications',
            'schedule_sessions',
            'create_blog',
            'edit_blog',
            'delete_blog',
            'manage_universities',
            'broadcast_announcement',
            'export_data'
        ]
    };

    // Rate Limiting In-Memory Store
    const RATE_LIMIT_STORE = {};

    const EduSecurity = {
        // --- RATE LIMITING ---
        rateLimiter: {
            check: function (actionKey, maxAttempts = 5, windowMs = 60000) {
                const now = Date.now();
                if (!RATE_LIMIT_STORE[actionKey]) {
                    RATE_LIMIT_STORE[actionKey] = [];
                }
                // Filter out timestamps outside current sliding window
                RATE_LIMIT_STORE[actionKey] = RATE_LIMIT_STORE[actionKey].filter(ts => (now - ts) < windowMs);

                if (RATE_LIMIT_STORE[actionKey].length >= maxAttempts) {
                    const oldest = RATE_LIMIT_STORE[actionKey][0];
                    const remainingSeconds = Math.ceil((windowMs - (now - oldest)) / 1000);
                    return {
                        allowed: false,
                        remainingSeconds: Math.max(1, remainingSeconds),
                        message: `Security Rate Limit: Too many requests. Please wait ${Math.max(1, remainingSeconds)} seconds.`
                    };
                }

                return { allowed: true, remainingSeconds: 0 };
            },

            record: function (actionKey) {
                if (!RATE_LIMIT_STORE[actionKey]) {
                    RATE_LIMIT_STORE[actionKey] = [];
                }
                RATE_LIMIT_STORE[actionKey].push(Date.now());
            },

            reset: function (actionKey) {
                delete RATE_LIMIT_STORE[actionKey];
            }
        },

        // --- INPUT VALIDATION & XSS SANITIZATION ---
        sanitizeText: function (str) {
            if (typeof str !== 'string') return '';
            return str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;')
                .replace(/\//g, '&#x2F;')
                .trim();
        },

        sanitizeHTML: function (dirtyHTML) {
            if (typeof dirtyHTML !== 'string') return '';
            // Strip script tags, onload, onerror, javascript: protocols
            let cleaned = dirtyHTML
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
                .replace(/on\w+\s*=\s*[^>\s]+/gi, '')
                .replace(/javascript:/gi, 'blocked:');
            return cleaned.trim();
        },

        validateEmail: function (email) {
            if (!email || typeof email !== 'string') return false;
            const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
            return re.test(email.trim()) && email.length <= 254;
        },

        validatePassword: function (password) {
            if (!password || typeof password !== 'string') return { valid: false, message: 'Password is required' };
            if (password.length < 6) return { valid: false, message: 'Password must be at least 6 characters' };
            if (password.length > 128) return { valid: false, message: 'Password exceeds maximum length' };
            return { valid: true };
        },

        validateURL: function (url) {
            if (!url || typeof url !== 'string') return false;
            try {
                const parsed = new URL(url.trim());
                return parsed.protocol === 'http:' || parsed.protocol === 'https:';
            } catch (e) {
                return false;
            }
        },

        // --- FILE UPLOAD & IMAGE URL SECURITY ---
        validateImageSource: function (src) {
            if (!src || typeof src !== 'string') {
                return { valid: false, message: 'Image source is required' };
            }
            const clean = src.trim().toLowerCase();

            // Check for unsafe protocols
            if (clean.startsWith('javascript:') || clean.startsWith('vbscript:') || clean.startsWith('data:text/html')) {
                return { valid: false, message: 'Blocked unsafe URI scheme' };
            }

            // Check for dangerous file extensions
            const dangerousExtensions = ['.exe', '.bat', '.sh', '.php', '.py', '.js', '.vbs', '.scr', '.svg'];
            for (const ext of dangerousExtensions) {
                if (clean.includes(ext)) {
                    return { valid: false, message: `Disallowed extension (${ext}) for image upload` };
                }
            }

            // Must be https or valid image data uri
            if (clean.startsWith('https://') || clean.startsWith('http://') || clean.startsWith('data:image/')) {
                return { valid: true };
            }

            return { valid: false, message: 'Image must use secure HTTPS protocol or valid image data format' };
        },

        // --- AUTHENTICATION != AUTHORIZATION (AuthN vs AuthZ) ---
        hasPermission: function (user, permission) {
            const role = (user && user.role) ? user.role : 'Guest';
            const permissions = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS['Guest'];
            return permissions.includes(permission);
        },

        enforceRouteAuth: function (requiredPermission, targetElementId = null) {
            let currentUser = null;
            try {
                const stored = localStorage.getItem('ed_user');
                if (stored) currentUser = JSON.parse(stored);
            } catch (e) {
                currentUser = null;
            }

            // 1. Authentication Check (Is user logged in?)
            if (!currentUser) {
                if (window.location.pathname.includes('admin')) {
                    // Redirect unauthenticated visitors to login
                    const returnUrl = encodeURIComponent(window.location.href);
                    window.location.href = `login.html?returnUrl=${returnUrl}&authReason=unauthenticated`;
                    return false;
                }
                return false;
            }

            // 2. Authorization Check (Does user's role permit this action/route?)
            if (!this.hasPermission(currentUser, requiredPermission)) {
                // If on admin page and user is Student, block access with 403 Forbidden UI
                if (window.location.pathname.includes('admin')) {
                    this.renderAccessDeniedScreen(currentUser, requiredPermission);
                    return false;
                }
                return false;
            }

            return true;
        },

        renderAccessDeniedScreen: function (user, requiredPermission) {
            document.body.innerHTML = `
                <div style="min-height: 100vh; background-color: #f8fafc; display: flex; align-items: center; justify-content: center; padding: 24px; font-family: 'Poppins', sans-serif;">
                    <div style="max-width: 540px; background: white; border-radius: 24px; padding: 42px 32px; box-shadow: 0 20px 40px rgba(0,0,100,0.1); text-align: center; border-top: 6px solid #fb5421;">
                        <div style="width: 72px; height: 72px; background: #fff1f1; color: #fb5421; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 32px;">
                            <i class="fa-solid fa-shield-halved"></i>
                        </div>
                        <h3 style="font-weight: 800; color: #000064; margin-bottom: 8px;">Access Denied (403 Forbidden)</h3>
                        <p style="color: #64748b; font-size: 14.5px; line-height: 1.6; margin-bottom: 24px;">
                            You are signed in as <b>${this.sanitizeText(user.name)}</b> with the role <b>"${this.sanitizeText(user.role)}"</b>.
                            This role does not have administrative privileges (<code>${requiredPermission}</code>).
                        </p>
                        <div style="background: #f1f5f9; padding: 14px; border-radius: 12px; font-size: 13px; color: #475569; margin-bottom: 24px; text-align: left;">
                            <b>Security Notice:</b> Authentication (AuthN) verified your student account, but Authorization (AuthZ) restricts access to Admissions Directors and Staff.
                        </div>
                        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                            <a href="index.html" style="background: #000064; color: white; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 14px;">
                                <i class="fa-solid fa-house me-1"></i> Return to Homepage
                            </a>
                            <button onclick="edAuth.logout(); window.location.href='login.html';" style="background: #f5dc3c; color: #000064; border: none; padding: 12px 24px; border-radius: 50px; font-weight: 700; font-size: 14px; cursor: pointer;">
                                Sign in as Staff / Admin
                            </button>
                        </div>
                    </div>
                </div>
            `;
        },

        // --- SECRETS MANAGEMENT & TOKEN SIMULATION ---
        generateSessionToken: function (user) {
            // Generates an ephemeral cryptographic-like token payload (no plaintext raw passwords)
            const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
            const payload = btoa(JSON.stringify({
                sub: user.email,
                role: user.role,
                iat: Date.now(),
                exp: Date.now() + (12 * 60 * 60 * 1000) // 12 hours expiry
            }));
            const signature = btoa('the_edu_hmac_sig_' + user.email.length);
            return `${header}.${payload}.${signature}`;
        },

        // --- ERROR HANDLING & INFORMATION LEAKAGE PREVENTION ---
        initErrorCatchers: function () {
            // Global unhandled runtime error catcher
            window.addEventListener('error', (event) => {
                // Prevent verbose internal stack traces from leaking to visitors
                this.logSafely('Global Error captured cleanly without leaking details:', event.message);
            });

            window.addEventListener('unhandledrejection', (event) => {
                this.logSafely('Unhandled Promise Rejection handled safely:', event.reason);
            });
        },

        logSafely: function (message, context = null) {
            // Disables sensitive debug dumps in public production
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.warn(`[EduSecurity] ${message}`, context ? '(details suppressed for security)' : '');
            }
        },

        getSafeErrorMessage: function (rawError) {
            // Transform internal or database error strings into safe user-friendly messages
            return 'An issue occurred while processing your request. Please check your network connection and try again.';
        }
    };

    // Auto-initialize Security Engine
    document.addEventListener('DOMContentLoaded', () => {
        EduSecurity.initErrorCatchers();

        // If on admin dashboard, enforce route authorization
        if (window.location.pathname.includes('admin')) {
            EduSecurity.enforceRouteAuth('access_admin_dashboard');
        }
    });

    window.EduSecurity = EduSecurity;

})(window, document);
