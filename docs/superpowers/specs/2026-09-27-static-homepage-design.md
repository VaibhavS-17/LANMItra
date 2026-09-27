# Design Specification: Static Homepage for Practical Submission

**Date:** 2026-09-27  
**Project:** LANMitra — Gaming Tournament & LAN Café Booking Platform  
**Target Folder:** `static-homepage/`  
**Purpose:** Standalone, clean static website for academic/practical submission (Full Stack Java Programming - FSJP).

---

## 1. Overview & Goals

The goal is to create an accessible, standalone static homepage for the LANMitra platform using pure **HTML5** and **CSS3**.
The page serves as a clear, presentable showcase for practical course evaluation. It requires zero build tooling, zero external runtime dependencies, and can be viewed directly in any web browser by opening `index.html`.

### Key Constraints & Requirements:
- **Zero JavaScript:** Pure HTML and CSS only.
- **Light Modern Theme:** Clean white and light-gray background with deep gaming blue and purple accents.
- **Isolated Folder:** Built in `static-homepage/` with self-contained assets.
- **Readable & Well-Commented:** Code must be cleanly indented and clearly commented for academic review.
- **Fully Responsive:** Uses CSS Flexbox, Grid, and standard `@media` queries for desktop, tablet, and mobile devices.

---

## 2. Directory Structure

```text
LANMitra/
└── static-homepage/
    ├── index.html       # Semantic HTML5 document
    ├── style.css        # Modular, commented CSS3 stylesheet
    └── assets/          # Static branding and icons
        ├── logo.png     # LANMitra brand logo
        └── icon.png     # Brand favicon / icon mark
```

---

## 3. Page Architecture & Section Specifications

### 3.1 Header & Navigation (`<header>`, `<nav>`)
- **Branding:** Left-aligned LANMitra logo and text mark linking to top (`#`).
- **Navigation Links:** Horizontal link list:
  - Home (`#hero`)
  - About (`#about`)
  - Features (`#features`)
  - Contact (`#contact`)
- **Call-to-Action:** "Book Station" button styled as an accent button jumping to `#features` or `#contact`.
- **Responsive behavior:** Clean wrapping or stack on mobile devices.

### 3.2 Hero Banner (`<section id="hero">`)
- **Badge:** "Practical Project Showcase • FSJP 2026" or "Gaming Café & Tournament Platform".
- **Headline:** Clear, punchy title: *"Connect, Compete & Book Gaming Stations"*.
- **Sub-headline:** Explaining the platform purpose: connecting gaming café owners, tournament organizers, and players in one unified portal.
- **Action Buttons:**
  - Primary CTA: *"Explore Features"* (links to `#features`).
  - Secondary CTA: *"Get in Touch"* (links to `#contact`).
- **Hero Visual / Stats Card:** Clean summary card displaying key metrics: "50+ Stations", "12+ Tournaments", "100% Conflict-Free Booking".

### 3.3 About Section (`<section id="about">`)
- **Section Heading:** *"About LANMitra"*.
- **Narrative:** Explains the real-world problem solved — replacing phone calls, spreadsheets, and manual bracket tracking with an automated booking and tournament platform.
- **Three User-Role Cards:**
  1. **Players:** Browse local gaming cafés, check real-time PC/console availability, and compete in tournaments.
  2. **Café Owners:** Register gaming lounges, configure station hardware specs/hourly rates, and prevent schedule clashes.
  3. **Organizers:** Create single-elimination brackets with automatic progression, track results, and resolve disputes.

### 3.4 Key Features Grid (`<section id="features">`)
- **Section Heading:** *"Core Features"*.
- **Grid Layout:** 4 responsive feature cards (2x2 on desktop, 1-column on mobile):
  1. **Station Booking Engine:** Real-time slot booking with double-booking prevention.
  2. **Automated Brackets:** Single-elimination tournament generator with bye handling.
  3. **Result Tracking & Disputes:** Dual-confirmation match reporting with organizer dispute resolution.
  4. **Live Leaderboards:** Real-time tournament progression and standings tables.
- **Card Design:** White surface with subtle border, soft drop-shadow, accent badge, and hover lift effect (`transform: translateY(-4px)`).

### 3.5 Contact & Inquiries (`<section id="contact">`)
- **Section Heading:** *"Contact & Submission Details"*.
- **Two-Column Layout:**
  - **Left Column (Project Details):**
    - Course: Full Stack Java Programming (FSJP)
    - Institution: Mumbai University — Second Year Computer Engineering
    - Email: `support@lanmitra.local`
    - Location: Mumbai, Maharashtra
  - **Right Column (Contact Form):**
    - Semantic `<form action="#" method="post">`
    - Form fields:
      - Full Name (`<input type="text" required>`)
      - Email Address (`<input type="email" required>`)
      - User Role (`<select>`: Player, Café Owner, Organizer)
      - Message (`<textarea rows="4" required>`)
      - Submit Button: *"Send Message"*

### 3.6 Footer (`<footer>`)
- **Footer Content:**
  - Brand name and brief motto.
  - Quick links repeated.
  - Copyright: `© 2026 LANMitra. FSJP Academic Project.`

---

## 4. Visual Design & Theme System

```css
:root {
  /* Brand Accents */
  --primary-color: #1d4ed8;       /* Deep gaming blue */
  --primary-hover: #1e40af;
  --secondary-color: #7c3aed;     /* Royal purple accent */
  --accent-gradient: linear-gradient(135deg, #1d4ed8, #7c3aed);

  /* Backgrounds & Surfaces */
  --bg-main: #f8fafc;             /* Light gray page background */
  --bg-card: #ffffff;             /* Pure white card surface */
  --bg-subtle: #f1f5f9;           /* Secondary card / input background */

  /* Text & Borders */
  --text-dark: #0f172a;           /* Slate heading text */
  --text-body: #334155;           /* Body readable slate */
  --text-muted: #64748b;          /* Light gray subtext */
  --border-color: #e2e8f0;        /* Subtle divider borders */

  /* Shadows & Radius */
  --card-radius: 12px;
  --btn-radius: 8px;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 14px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 8px 24px rgba(29, 78, 216, 0.12);
}
```

---

## 5. Verification & Acceptance Criteria

1. **Independent Running:** Opening `static-homepage/index.html` directly in Chrome/Edge/Firefox renders without console errors or missing styles.
2. **Asset Resolution:** Logo and icons in `static-homepage/assets/` display properly via relative file paths.
3. **Anchor Navigation:** Clicking nav links smoothly scrolls to their corresponding sections (`#hero`, `#about`, `#features`, `#contact`).
4. **Form Semantics:** Contact form inputs have proper labels, placeholders, and validation attributes (`type="email"`, `required`).
5. **Responsiveness:** Layout reflows gracefully on mobile screen widths (375px - 768px) and desktop screens (1024px+).
