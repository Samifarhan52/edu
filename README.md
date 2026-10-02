# Edconsultants — Global Study Abroad & Admissions Platform

> An enterprise, full-suite educational consultancy web platform built under the **Edconsultants** brand. Features an interactive **Mobile Scroll Journey Flow**, full 14-page university admissions directory, client portal with dynamic session management, and responsive layouts across all mobile, tablet, and desktop screens.

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

### 2. Complete 14-Page Admissions Suite
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
- **Admissions Dashboard**: [`admin-dashboard.html`](admin-dashboard.html)

### 3. Dynamic Authentication & Session Flow (`js/auth.js`)
- Persistent sessions via `localStorage`.
- Dynamic navbar header rendering (User profile avatar and role badge vs Sign In / Sign Up).
- Functional logout across all 14 pages.
- Demo role quick-fill on login.

---

## 🚀 Deployment to Vercel

This repository is pre-configured with `vercel.json` for one-click deployment to [Vercel](https://vercel.com):

### Method 1: Deploy via Vercel Dashboard (Recommended)
1. Go to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and select repository: **`Samifarhan52/edu`**.
3. Keep default settings (Framework Preset: **Other**, Root Directory: **`./`**).
4. Click **Deploy**. Your site will be live instantly with a free SSL certificate!

### Method 2: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 💻 Local Development

Run with any local web server:

```bash
# Python 3
python3 -m http.server 8080

# Or Node.js serve
npx serve .
```

Open [http://localhost:8080](http://localhost:8080) in your web browser.
