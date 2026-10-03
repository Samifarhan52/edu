# The Edu Consultants — Global Study Abroad & Admissions Platform

> An enterprise, full-suite educational consultancy web platform built under the **The Edu Consultants** brand. Features an interactive **Mobile Scroll Journey Flow**, full 14-page university admissions directory, client portal with dynamic session management, **Interactive Admin CMS Studio** (Post New Blogs, Add Universities, Broadcast Announcements), dedicated **Mobile Bottom App Dock**, and responsive layouts across all mobile, tablet, and desktop screens.

---

## 🌟 Key Highlights & Architecture

### 1. Interactive Mobile Scroll Journey Flow
- **Fluid Visual Simulator**: As the user scrolls up or down, the journey simulator navigates through the 5 study abroad milestones:
  - `01 Search & Discover` (20,000+ courses across 500+ world-class institutions)
  - `02 Compare & Strategize` (Tuition, living expenses, post-study work rights)
  - `03 1-on-1 Mentorship` (Dedicated accredited counselor consultation)
  - `04 Application & Visa` (Application fee waivers & 98.2% visa clearance)
  - `05 Arrival & Pre-Departure` (Airport pickup, banking, housing, alumni network)
- **Telemetry HUD Dock**: Quick teleportation navigation, progress indicator, and modal exploration.

### 2. Interactive Admin CMS Studio (`js/cms.js` & `admin-dashboard.html`)
- **Post & Manage Blogs**: Rich composer with instant image preset pickers, real-time live card preview, category tagging, and published status. Posts appear immediately on [`blog-list.html`](blog-list.html) with full-text Reader Modals.
- **University Directory Manager**: Add institutions with rankings, tuition rates, acceptance rates, and country filters that synchronize with [`universities-list.html`](universities-list.html).
- **Homepage Announcement Broadcast**: Push urgent notices, intake deadlines, and fee waiver alerts to the live site header.

### 3. Distinct Mobile View vs. Desktop View
- **Dedicated Mobile Floating Bottom Dock** (`.mobile-bottom-dock`): Sleek frosted glass navigation docked on mobile screens (`Home`, `Universities`, `Journey` trigger, `Articles`, `Admin`).
- **Horizontal Swipeable Chips**: Category and country filters switch into smooth native horizontal scrollbars on mobile.
- **Responsive Media Query Scaling**: Custom typography and button geometry fine-tuned across 1200px, 1024px, 768px, and 480px viewports.

### 4. Complete 14-Page Admissions Suite
- **Home**: [`index.html`](index.html) — Live 2-column hero showcase with 4K campus tour video modal, interactive search filter, and destinations.
- **About Us Details**: [`about-us-details.html`](about-us-details.html)
- **Universities Directory**: [`universities-list.html`](universities-list.html)
- **Degree Programs / Subjects**: [`subject-list.html`](subject-list.html)
- **Scholarship Finder**: [`scholarship-list.html`](scholarship-list.html)
- **Test Preparation**:
  - IELTS: [`courses-programs-IELTS.html`](courses-programs-IELTS.html)
  - GRE: [`courses-programs-GRE.html`](courses-programs-GRE.html)
  - GMAT: [`courses-programs-GMAT.html`](courses-programs-GMAT.html)
- **Insights & Editorial**: [`blog-list.html`](blog-list.html)
- **Global Education Events**: [`event-list.html`](event-list.html)
- **Contact Us**: [`contact-us.html`](contact-us.html)
- **Sign In / Portal**: [`login.html`](login.html)
- **Sign Up / Register**: [`signup.html`](signup.html)
- **Admissions Dashboard & CMS Studio**: [`admin-dashboard.html`](admin-dashboard.html)

### 5. Dynamic Authentication & Session Flow (`js/auth.js`)
- Persistent sessions via `localStorage`.
- Dynamic navbar header rendering (User profile avatar and role badge vs Sign In / Sign Up).
- Functional logout across all 14 pages.
- Demo role quick-fill on login.

---

## 🛠️ Tech Stack
- **HTML5 & Vanilla JavaScript (ES6+)**: Zero bulky framework dependencies; blazing fast load times.
- **Bootstrap 5.3.2 & FontAwesome 6.5.1**: Modern grid system and tactile icons.
- **Dynamic LocalStorage CMS Engine**: Zero-backend serverless persistence for blogs, universities, and alerts.
- **CSS3 Luxury System**: Custom design tokens, glassmorphism, responsive typography, and mobile-dock mechanics.

---

## 🚀 Live Preview & Deployment
```bash
# Run local preview server
python3 -m http.server 8080
```
Open `http://localhost:8080` in your web browser.
