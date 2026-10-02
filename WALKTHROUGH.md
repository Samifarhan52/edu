# Edconsultants — Complete 14-Page Ecosystem & Mobile Journey Engine

All requested pages have been cloned and elevated for **Edconsultants** with authentic colors (`#000064`, `#f5dc3c`, `#fb5421`), robust mobile-first responsiveness, an interactive **Mobile Scroll Journey Flow**, and an enterprise-grade authentication system with persistent session states.

---

### Complete Page Directory (14 Pages):
1. **`index.html`** — Home (Hero banner, stacked responsive search filters, services, **Mobile Journey Flow**, destinations, consultation booking, events, FAQ, footer).
2. **`about-us-details.html`** — About Us Details (Mission, values, image gallery, trust metrics).
3. **`universities-list.html`** — Universities List (Search, destination filter, ranking cards).
4. **`subject-list.html`** — Subject List (Disciplines, degree levels, durations, starting salaries).
5. **`scholarship-list.html`** — Scholarship List (100% tuition waivers, government bursaries, deadlines).
6. **`courses-programs-IELTS.html`** — IELTS Prep (Band 7.5–8.5+ roadmap, syllabus, test booking).
7. **`courses-programs-GRE.html`** — GRE Prep (Quant, Verbal, AWA, 320–335+ cohort).
8. **`courses-programs-GMAT.html`** — GMAT Prep (Focus Edition, Data Insights, MBA strategy).
9. **`blog-list.html`** — Blogs & Articles (Admissions guides, authors, publishing dates).
10. **`event-list.html`** — Global Events (Expos, webinars, ticket booking modal).
11. **`contact-us.html`** — Contact Us (Inquiry form, HQ coordinates, interactive map).
12. **`login.html`** — Sign In Portal (**Professional interface**: Social login with Google/Apple/LinkedIn, email/password validation, show/hide password toggle, remember me, quick demo profiles — **NO journey flow**).
13. **`signup.html`** — Registration Portal (**New Dedicated Page**: Full name, email, phone, study destination, password strength meter, terms acceptance, social registration, session generation — **NO journey flow**).
14. **`admin-dashboard.html` / `admin/dashboard.html`** — Management Console (Mobile toggle bar, dynamic user greeting, metrics, candidate pipeline table, functional log out).

---

### Key Improvements & Fixes in This Release:

#### 1. 100% Mobile Viewport Compatibility:
- **Zero Horizontal Overflow**: Added strict `overflow-x: hidden` and `max-width: 100vw` protection on `html`, `body`, and container wrappers.
- **Responsive Mobile Navigation**: Engineered offcanvas drawer with branded header logo, close button, touch-friendly tap targets, and nested dropdown expansion.
- **Adaptive Hero Filter System**: Stacked filter grid automatically collapses from multi-column grid into single-column touch inputs on screens `< 768px`.
- **Responsive Mobile Journey Simulator**: Phone mockup dynamically scales down to 100% width on smaller screens (< 576px) with adaptive bezels, 560px screen height, and touch bullet dock navigation.

#### 2. Enterprise Authentication & Session Management (`js/auth.js`):
- **Removed Raw Credentials Dump**: Replaced the amateur test credentials table with an authentic, sleek portal interface.
- **Persistent Sessions**: State is automatically preserved via `localStorage`.
- **Dynamic Header & Offcanvas State**:
  - **When Logged Out**: Displays clean `Sign In` link and `Sign Up` button.
  - **When Logged In**: Displays user avatar pill with role badge and dropdown menu (`Dashboard`, `My Applications`, `Scholarships`, `Log Out`). Mobile offcanvas also shows personal greeting and log out trigger.
- **Functional Logout Everywhere**: Clicking "Log Out" in header or dashboard clears user session, triggers a toast notification, and gracefully updates the UI.
- **Quick Demo Access**: Discreet one-click demo profile pills (`Admin`, `Student`, `Counselor`) allow instant testing without manual typing.

---

### How to Preview:
```bash
# Option 1: Open index.html directly
open index.html

# Option 2: Run local web server
python3 -m http.server 8080
```
Then visit `http://localhost:8080` in your web browser.
