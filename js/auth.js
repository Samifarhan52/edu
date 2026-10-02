/**
 * The Edu Consultants - Centralized Authentication & Session Management
 * Handles login, signup, persistent sessions (localStorage), dynamic navbar states, and logout across all pages.
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'ed_user';

    // Demo user database
    const DEMO_USERS = {
        'admin@theeduconsultants.org': {
            name: 'Alexander Morgan',
            email: 'admin@theeduconsultants.org',
            role: 'Admissions Director',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
            badge: 'Admin'
        },
        'counselor@theeduconsultants.org': {
            name: 'Dr. Eleanor Vance',
            email: 'counselor@theeduconsultants.org',
            role: 'Senior Academic Counselor',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
            badge: 'Staff'
        },
        'student@theeduconsultants.org': {
            name: 'Sophia Patel',
            email: 'student@theeduconsultants.org',
            role: 'Prospective Scholar',
            destination: 'United Kingdom',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
            badge: 'Student'
        }
    };

    // Legacy aliases for backward compatibility
    DEMO_USERS['admin@edconsultants.org'] = DEMO_USERS['admin@theeduconsultants.org'];
    DEMO_USERS['counselor@edconsultants.org'] = DEMO_USERS['counselor@theeduconsultants.org'];
    DEMO_USERS['student@edconsultants.org'] = DEMO_USERS['student@theeduconsultants.org'];

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

        login: function (email, password, roleHint = 'Student') {
            const cleanEmail = (email || '').trim().toLowerCase();
            let user = DEMO_USERS[cleanEmail];

            if (!user) {
                // Allow custom email sign in dynamically
                const namePart = email.split('@')[0] || 'Member';
                const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
                user = {
                    name: formattedName,
                    email: cleanEmail,
                    role: roleHint,
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
                    badge: roleHint
                };
            }

            user.loggedInAt = new Date().toISOString();
            this.setUser(user);
            this.showToast(`Welcome back, ${user.name}! Redirecting...`, 'success');

            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 800);
            return true;
        },

        signup: function (formData) {
            const user = {
                name: formData.name || 'New Scholar',
                email: (formData.email || '').trim().toLowerCase(),
                phone: formData.phone || '',
                destination: formData.destination || 'Global',
                role: 'Student',
                badge: 'Scholar',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
                loggedInAt: new Date().toISOString()
            };

            this.setUser(user);
            this.showToast(`Account created successfully! Welcome, ${user.name}!`, 'success');

            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 900);
            return true;
        },

        logout: function () {
            const user = this.getUser();
            const name = user ? user.name : 'User';
            localStorage.removeItem(STORAGE_KEY);
            this.showToast(`Goodbye, ${name}. You have signed out.`, 'info');

            // If on dashboard, go to login.html; otherwise re-render nav
            if (window.location.pathname.includes('admin') || window.location.pathname.includes('dashboard')) {
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 800);
            } else {
                setTimeout(() => {
                    this.renderNavigation();
                }, 400);
            }
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
                    z-index: 99999;
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
                max-width: 380px;
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

            // 1. Desktop Nav CTA container (.ld-header-wrap .col-lg-2 or similar)
            const desktopCtaCols = document.querySelectorAll('.ld-header-wrap .col-lg-2.text-end, .header-auth-slot');
            desktopCtaCols.forEach(col => {
                if (user) {
                    col.innerHTML = `
                        <div class="dropdown d-inline-block">
                            <button class="btn d-flex align-items-center gap-2 p-1 pe-3 rounded-pill border bg-white shadow-sm dropdown-toggle" 
                                    type="button" data-bs-toggle="dropdown" aria-expanded="false" style="border-color: var(--stroke-2) !important;">
                                <img src="${user.avatar}" alt="${user.name}" class="rounded-circle" width="34" height="34" style="object-fit: cover;">
                                <div class="text-start d-none d-xl-block" style="line-height: 1.2;">
                                    <div class="fw-bold text-dark fs-13">${user.name}</div>
                                    <div class="text-muted fs-11">${user.badge || 'Member'}</div>
                                </div>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 mt-2" style="min-width: 210px;">
                                <li class="px-3 py-2 border-bottom">
                                    <div class="fw-bold text-dark fs-14">${user.name}</div>
                                    <div class="text-muted fs-12">${user.email}</div>
                                </li>
                                <li>
                                    <a class="dropdown-item py-2 d-flex align-items-center gap-2" href="admin-dashboard.html">
                                        <i class="fa-solid fa-chart-pie text-primary"></i> Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item py-2 d-flex align-items-center gap-2" href="universities-list.html">
                                        <i class="fa-solid fa-building-columns text-primary"></i> Universities
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item py-2 d-flex align-items-center gap-2" href="scholarship-list.html">
                                        <i class="fa-solid fa-award text-warning"></i> Scholarships
                                    </a>
                                </li>
                                <li><hr class="dropdown-divider my-1"></li>
                                <li>
                                    <button type="button" class="dropdown-item py-2 d-flex align-items-center gap-2 text-danger ed-logout-trigger">
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

            // 2. Mobile Offcanvas Nav items (.menu-navbar-nav)
            const mobileNavs = document.querySelectorAll('.menu-navbar-nav');
            mobileNavs.forEach(nav => {
                // Find existing auth li items or remove old ones
                const existingAuthLi = nav.querySelectorAll('.mobile-auth-item');
                existingAuthLi.forEach(el => el.remove());

                if (user) {
                    const li = document.createElement('li');
                    li.className = 'nav-item d-lg-none mt-3 mobile-auth-item w-100';
                    li.innerHTML = `
                        <div class="p-3 rounded-3 bg-light border mb-2 text-start">
                            <div class="d-flex align-items-center gap-2 mb-2">
                                <img src="${user.avatar}" class="rounded-circle" width="36" height="36" alt="${user.name}">
                                <div>
                                    <div class="fw-bold text-dark fs-14">${user.name}</div>
                                    <div class="text-muted fs-11">${user.email}</div>
                                </div>
                            </div>
                            <div class="d-flex gap-2 mt-2">
                                <a href="admin-dashboard.html" class="btn btn-sm btn-primary rounded-pill flex-grow-1 fs-12 fw-bold" style="background-color: var(--brand-primary); border-color: var(--brand-primary);">
                                    <i class="fa-solid fa-chart-pie me-1"></i> Dashboard
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
                        <div class="d-flex flex-column gap-2 w-100 pt-2 border-top">
                            <a href="login.html" class="btn btn-outline-secondary w-100 rounded-pill py-2 fw-bold fs-14" style="color: var(--brand-primary); border-color: var(--brand-primary);">
                                <i class="fa-solid fa-right-to-bracket me-2"></i> Sign In
                            </a>
                            <a href="signup.html" class="btn btn-warning w-100 rounded-pill py-2 fw-bold fs-14 shadow-sm" style="background-color: var(--button); color: var(--brand-primary); border: none;">
                                <i class="fa-solid fa-user-plus me-2"></i> Sign Up
                            </a>
                        </div>
                    `;
                    nav.appendChild(li);
                }
            });

            // 3. Attach logout listeners
            document.querySelectorAll('.ed-logout-trigger').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    edAuth.logout();
                });
            });

            // 4. Update Admin Dashboard User Profile if on dashboard
            const dashboardAdminName = document.querySelector('.dashboard-admin-name');
            const dashboardAdminRole = document.querySelector('.dashboard-admin-role');
            const dashboardAdminAvatar = document.querySelector('.dashboard-admin-avatar');
            if (user && dashboardAdminName) {
                dashboardAdminName.textContent = user.name;
                if (dashboardAdminRole) dashboardAdminRole.textContent = user.role;
                if (dashboardAdminAvatar) dashboardAdminAvatar.src = user.avatar;
            }
        }
    };

    window.edAuth = edAuth;

    document.addEventListener('DOMContentLoaded', () => {
        edAuth.renderNavigation();
    });
})();
