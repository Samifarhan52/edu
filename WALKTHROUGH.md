# The Edu Consultant — Complete 14-Page Ecosystem & Dynamic CMS Engine

All requested pages have been elevated for **The Edu Consultant** with authentic colors (`#000064`, `#f5dc3c`, `#fb5421`), robust mobile-first responsiveness, an interactive **Mobile Scroll Journey Flow**, an enterprise **Dynamic CMS Content Studio** in the Admin Dashboard, and a native **Mobile Bottom Dock** navigation experience.

---

### Complete Page Directory (14 Pages):
1. **`index.html`** — Home (Hero banner, dynamic live announcement broadcast, stacked filters, services, **Mobile Journey Flow**, destinations, consultation booking, events, FAQ, mobile dock).
2. **`about-us-details.html`** — About Us Details (Mission, values, image gallery, trust metrics).
3. **`universities-list.html`** — Universities List (**Dynamic CMS Integrated**: Live instant search, horizontal country filter chips, interactive directory, partner badges).
4. **`subject-list.html`** — Subject List (Disciplines, degree levels, durations, starting salaries).
5. **`scholarship-list.html`** — Scholarship List (100% tuition waivers, government bursaries, deadlines).
6. **`courses-programs-IELTS.html`** — IELTS Prep (Band 7.5–8.5+ roadmap, syllabus, test booking).
7. **`courses-programs-GRE.html`** — GRE Prep (Quant, Verbal, AWA, 320–335+ cohort).
8. **`courses-programs-GMAT.html`** — GMAT Prep (Focus Edition, Data Insights, MBA strategy).
9. **`blog-list.html`** — Blogs & Articles (**Dynamic CMS Integrated**: Category filter pills, instant title/author search, interactive full-text Reader Modal, live admin publish sync).
10. **`event-list.html`** — Global Events (Expos, webinars, ticket booking modal).
11. **`contact-us.html`** — Contact Us (Inquiry form, HQ coordinates, interactive map).
12. **`login.html`** — Sign In Portal (**Professional interface**: Social login with Google/Apple/LinkedIn, email/password validation, show/hide password toggle, remember me, quick demo profiles — **NO journey flow**).
13. **`signup.html`** — Registration Portal (**Clean Registration**: Full name, email, phone, study destination, password strength meter, terms acceptance, social registration — **NO journey flow**).
14. **`admin-dashboard.html` / `admin/dashboard.html`** — Management & CMS Studio (**Full Interactive Content Management System**: Post New Blogs with live card preview, Add Partner Universities, Broadcast Site Announcements, Manage Applications Pipeline).

---

### 🚀 Key New Advanced Features:

#### 1. Interactive Admin CMS Studio (`admin-dashboard.html` & `js/cms.js`):
- **✍️ Blog & Article Publisher**:
  - Full article creator with Title, Category, Author, Read Time, Preset Image Selectors (Campus, Library, Graduation, Travel, Scholarship), Summary, and Multi-Paragraph Article Body.
  - **Live Card Preview**: Real-time rendering of what the blog card will look like on the live site as you type.
  - **Draft vs. Published** toggle with instant `localStorage` persistence.
  - **Manage Published Blogs Table**: Displays all articles with live status, thumbnail, "View on Website" shortcut, and custom article deletion.
- **🏛️ University Directory Manager**:
  - Add new institutions with name, country, world ranking, tuition, acceptance rate, and programs.
  - Live table to inspect and delete partner institutions.
- **📢 Homepage Announcement Broadcast**:
  - Control the live broadcast alert banner displayed at the top of the visitor website.
  - Customize headline, badge, message, urgency theme (Gold / Urgent / Info), and CTA button.

#### 2. Distinct Mobile View vs. Desktop View:
- **📱 Mobile App Experience (`<= 768px`)**:
  - **Floating Bottom App Dock**: Sleek frosted glass bar (`backdrop-filter: blur(20px)`) with 5 touch-friendly controls (`Home`, `Universities`, `Journey` with pulsating trigger, `Articles` with unread dot, `Admin`).
  - **Horizontal Momentum-Scroll Chips**: Category and country filter lists transform into smooth horizontal swipeable pills without vertical clutter.
  - **Compact Sticky Top Bar**: Branded logo, phone contact button, and 44px tactile offcanvas menu toggle.
  - **Automatic Padding Guard**: `padding-bottom: 78px` applied automatically so content is never hidden behind the dock.
- **💻 Desktop Experience (`>= 992px`)**:
  - **Dual-Pane CMS**: Form editor on the left and live card preview on the right.
  - **Expansive Luxury Grids**: 3-column article cards with hover elevations and 3D micro-interactions.
  - **Multi-Tier Navigation**: Full desktop menu with dropdown catalogs and top alert bar.

#### 3. Public Dynamic Integration:
- Newly published articles in the Admin Dashboard immediately show up on `blog-list.html` with a distinctive `NEW POST` badge.
- Clicking "Read Article" opens an interactive **Reader Modal** displaying formatted sections, author bio, social share copy, and consultation booking CTAs.

---

### How to Preview:
```bash
# Open index.html directly
open index.html

# Or run local web server
python3 -m http.server 8080
```
Visit `http://localhost:8080` in your web browser.
