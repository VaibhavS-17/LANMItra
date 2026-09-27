# Static Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a clean, responsive, standalone static homepage in `static-homepage/` using pure semantic HTML5 and CSS3 for practical/academic submission.

**Architecture:** A lightweight standalone static directory containing `index.html`, `style.css`, and an `assets/` subfolder. No JavaScript, no npm packages, no build steps — fully operable by opening `index.html` directly in any web browser.

**Tech Stack:** HTML5, CSS3 (CSS Variables, Flexbox, CSS Grid, Media Queries).

**Spec:** [`docs/superpowers/specs/2026-09-27-static-homepage-design.md`](file:///c:/Users/USER/LANMItra/docs/superpowers/specs/2026-09-27-static-homepage-design.md)

## Global Constraints

- **Directory:** All code and assets must reside inside `static-homepage/`.
- **Zero JavaScript:** Pure HTML and CSS only.
- **Theme:** Clean modern light theme (white `#ffffff` / light gray `#f8fafc`, slate text `#0f172a`, deep gaming blue `#1d4ed8` and royal purple `#7c3aed` accents).
- **Academic Standard:** Clean indentation, readable class names, and educational comments suitable for practical exam evaluation.
- **Asset Portability:** All file paths (CSS, images) must use relative paths (`./style.css`, `./assets/...`) so opening `index.html` directly in a browser functions without an HTTP server.

---

### Task 1: Scaffolding and Asset Setup

**Files:**
- Create: `static-homepage/assets/logo.png`
- Create: `static-homepage/assets/icon.png`

**Interfaces:**
- Produces: `static-homepage/assets/logo.png` and `static-homepage/assets/icon.png` for use in `index.html`.

- [ ] **Step 1: Create directory structure**

Run command to create `static-homepage/assets`:
```powershell
New-Item -ItemType Directory -Force -Path "static-homepage/assets"
```

- [ ] **Step 2: Copy brand assets from src/assets**

Copy `src/assets/logo.png` and `src/assets/icon.png` into `static-homepage/assets/`:
```powershell
Copy-Item "src/assets/logo.png" -Destination "static-homepage/assets/logo.png"
Copy-Item "src/assets/icon.png" -Destination "static-homepage/assets/icon.png"
```

- [ ] **Step 3: Verify assets exist**

Run:
```powershell
Get-ChildItem -Path "static-homepage/assets"
```
Expected: `logo.png` and `icon.png` present with non-zero size.

- [ ] **Step 4: Commit asset setup**

```bash
git add static-homepage/assets
git commit -m "feat(static-homepage): scaffold folder and copy brand assets"
```

---

### Task 2: Build Semantic HTML Structure (`index.html`)

**Files:**
- Create: `static-homepage/index.html`

**Interfaces:**
- Consumes: `./assets/logo.png`, `./assets/icon.png`, `./style.css`
- Produces: Complete semantic HTML5 structure with sections: `#hero`, `#about`, `#features`, `#contact`, and `footer`.

- [ ] **Step 1: Write `static-homepage/index.html`**

Create `static-homepage/index.html` containing:
- Semantic `<head>` with viewport meta, charset UTF-8, title `"LANMitra — Gaming Tournament & Café Booking Platform"`, and `<link rel="stylesheet" href="style.css">`.
- `<header>` with `.navbar`:
  - Brand logo (`<img src="assets/logo.png" alt="LANMitra Logo">`) and title `"LANMitra"`
  - Navigation menu `<nav>` with anchor links (`#hero`, `#about`, `#features`, `#contact`)
  - Header CTA button `"Book Station"` linking to `#features`
- `<main>` container:
  - `<section id="hero" class="hero">`:
    - Project badge: `"Academic Practical Project • FSJP 2026"`
    - Headline `<h1>`: `"Connect, Compete & Book Gaming Stations"`
    - Subtitle `<p>`: `"LANMitra is a centralized platform connecting gaming café owners, tournament organizers, and players for seamless station booking and automated tournaments."`
    - Hero buttons: `"Explore Features"` (primary) and `"Contact Us"` (secondary)
    - Hero stats preview card: 3 stat counters (50+ Stations, 12+ Tournaments, 100% Conflict-Free)
  - `<section id="about" class="about">`:
    - Section header: `"About LANMitra"` and mission explanation
    - 3 role cards:
      - **Player Card**: Real-time slot booking, live tournament brackets, verified standings
      - **Café Owner Card**: Station hardware management, hourly pricing, conflict prevention
      - **Organizer Card**: Single-elimination bracket generation, automated results, dispute management
  - `<section id="features" class="features">`:
    - Section header: `"Core Features"`
    - 4 feature cards in CSS grid:
      1. *Station Booking Engine* (Real-time PC/Console reservation with instant slot locks)
      2. *Automated Brackets* (Auto-seeded single-elimination tournament trees with bye logic)
      3. *Result Tracking & Disputes* (Dual-reported match verification and organizer arbitration)
      4. *Live Leaderboards* (Real-time tournament progression and standings)
  - `<section id="contact" class="contact">`:
    - Section header: `"Contact & Submission Details"`
    - 2-column layout:
      - Project Details info card (Course: FSJP, University: Mumbai University, Department: Computer Engineering, Email, City: Mumbai)
      - Semantic `<form>` with `Name`, `Email`, `Role` dropdown, `Message` textarea, and `"Send Message"` submit button
- `<footer>`:
  - Brand logo/tagline, quick links, and copyright notice: `"© 2026 LANMitra. Full Stack Java Programming (FSJP) Course Submission."`

- [ ] **Step 2: Verify HTML file structure**

Check that file was written and syntax tags are properly closed:
```powershell
Get-Content -Path "static-homepage/index.html" -TotalCount 40
```
Expected: Clean HTML5 document starting with `<!DOCTYPE html>`.

- [ ] **Step 3: Commit HTML file**

```bash
git add static-homepage/index.html
git commit -m "feat(static-homepage): add semantic HTML5 structure"
```

---

### Task 3: Build CSS3 Stylesheet (`style.css`)

**Files:**
- Create: `static-homepage/style.css`

**Interfaces:**
- Consumes: Classes and IDs defined in `static-homepage/index.html`
- Produces: Complete light-theme styling, CSS variables, layout grids/flexbox, typography, and responsive media queries.

- [ ] **Step 1: Write `static-homepage/style.css`**

Create `static-homepage/style.css` with:
- **CSS Variables `:root`**:
  - `--primary: #1d4ed8;` (deep blue)
  - `--primary-hover: #1e40af;`
  - `--secondary: #7c3aed;` (purple)
  - `--accent-gradient: linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%);`
  - `--bg-page: #f8fafc;`
  - `--bg-card: #ffffff;`
  - `--bg-subtle: #f1f5f9;`
  - `--text-heading: #0f172a;`
  - `--text-body: #334155;`
  - `--text-muted: #64748b;`
  - `--border: #e2e8f0;`
  - `--radius: 12px;`
  - `--shadow: 0 4px 14px rgba(0, 0, 0, 0.06);`
- **Global Reset & Typography**:
  - `* { margin: 0; padding: 0; box-sizing: border-box; }`
  - `html { scroll-behavior: smooth; }`
  - `body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: var(--bg-page); color: var(--text-body); line-height: 1.6; }`
- **Navbar Styling**:
  - Sticky header (`position: sticky; top: 0; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); z-index: 100;`)
  - Flexbox distribution with brand on left, navigation links centered, and CTA on right.
  - Active/hover state with color transition to `--primary`.
- **Hero Section Styling**:
  - Padding `80px 20px`, centered container with maximum width `1100px`.
  - Academic badge styled with subtle blue background and bold text.
  - Dynamic gradient text for keywords (`background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`).
  - Button styling with solid gradient primary and clean bordered secondary.
  - Stats highlight row: 3 white cards with bold metric numbers and muted labels.
- **About Section Styling**:
  - Grid or Flex layout for the 3 user role cards with light borders, icons, and structured lists.
- **Features Section Styling**:
  - CSS Grid: `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;`.
  - Feature cards with icon badge, title, descriptive text, and a subtle accent bottom-border or hover translateY effect.
- **Contact Section Styling**:
  - 2-column grid (`1fr 1.2fr` on desktop) for project info and form.
  - Form controls with consistent padding, rounded corners, clean border, focus outline in `--primary`.
- **Footer Styling**:
  - Darker contrast or clean slate background (`#0f172a` with white text or clean bordered light footer).
- **Responsive Media Queries (`@media (max-width: 768px)`)**:
  - Navigation links flex-wrap or collapse neatly.
  - Hero stats stack or become 2-columns.
  - Contact grid collapses to single column.
  - Appropriate padding adjustments for mobile screens.

- [ ] **Step 2: Verify CSS stylesheet syntax**

Check that file was written properly:
```powershell
Get-Content -Path "static-homepage/style.css" -TotalCount 40
```
Expected: Valid CSS starting with `:root` variables.

- [ ] **Step 3: Commit CSS stylesheet**

```bash
git add static-homepage/style.css
git commit -m "feat(static-homepage): add light-theme responsive CSS stylesheet"
```

---

### Task 4: End-to-End Verification & Browser Testing

**Files:**
- Verify: `static-homepage/index.html`
- Verify: `static-homepage/style.css`
- Verify: `static-homepage/assets/logo.png`

**Interfaces:**
- Produces: Verified working static site ready for submission.

- [ ] **Step 1: Check HTML/CSS linking and asset references**

Verify that all relative paths match:
```powershell
Test-Path "static-homepage/index.html"
Test-Path "static-homepage/style.css"
Test-Path "static-homepage/assets/logo.png"
Test-Path "static-homepage/assets/icon.png"
```
Expected: All output `True`.

- [ ] **Step 2: Verify file contents for missing links or unresolved tags**

Scan `index.html` for unresolved placeholders:
```powershell
Select-String -Path "static-homepage/index.html" -Pattern "TODO|TBD|undefined|NaN"
```
Expected: No matches found.

- [ ] **Step 3: Test local rendering via browser or headless check**

Open the file in browser or run a lightweight test to verify layout and image loading:
```powershell
Get-Item "static-homepage/index.html"
```
Verify size and completeness.

- [ ] **Step 4: Final commit and summary**

```bash
git status
```
Confirm clean git tree.
