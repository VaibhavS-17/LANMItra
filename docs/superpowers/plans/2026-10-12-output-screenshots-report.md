# Output Screenshots & Academic Report Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Capture high-resolution output screenshots across all user personas and workflows in the LANMitra platform, save them in `docs/screenshots/`, and integrate them into Chapter 7 of `docs/LANMitra-Project-Report.md` to complete the academic project report.

**Architecture:** Launch the Spring Boot 3 backend (port 8080) with MySQL database (`lanmitra_db`) and Vite frontend dev server (port 5173). Use Chrome DevTools / browser automation to log in across personas (Guest, Player, Café Owner), navigate each view, capture standardized desktop screenshots (1440x900 / 1920x1080), and embed the resulting images into the academic project report document with formal figure numbers, captions, and UI workflow explanations.

**Tech Stack:** React 18, Vite, Spring Boot 3, Spring Security 6, MySQL 8, Chrome DevTools MCP / Node.js, Markdown.

**Spec:** `docs/LANMitra-Project-Report.md` (Chapter 7: Results & Screenshots) & `docs/superpowers/specs/2026-10-03-phase1-auth-booking-design.md`

## Global Constraints
- All screenshots saved to `docs/screenshots/` with numbered filenames (e.g., `01-landing-page.png`, `02-login-page.png`).
- Standard desktop viewport width (1440px or 1920px) ensuring crisp, readable typography and desktop navigation.
- Use seeded demo accounts:
  - Café Owner: `owner.andheri@lanmitra.com` / `Password@123`
  - Player: `player.mumbai@lanmitra.com` / `Password@123`
- Update `docs/LANMitra-Project-Report.md` Chapter 7 with markdown figures and academic descriptions replacing the placeholder `*[Screenshot to be added]*`.

---

### Task 1: Environment Readiness & Screenshot Automation Setup

**Files:**
- Create: `scripts/capture-screenshots.js`
- Create: `docs/screenshots/.gitkeep`

**Interfaces:**
- Consumes: Running Spring Boot backend (`http://localhost:8080`), Vite frontend (`http://localhost:5173`), MySQL `lanmitra_db`.
- Produces: `docs/screenshots/` directory and automated capture script or verified Chrome DevTools pipeline.

- [ ] **Step 1: Create screenshots directory**

Run in PowerShell:
```powershell
New-Item -ItemType Directory -Force -Path docs/screenshots
```

- [ ] **Step 2: Start Spring Boot backend in background and verify health**

Run in PowerShell:
```powershell
# Verify backend builds and start via background process or task
Start-Process -FilePath "mvn" -ArgumentList "spring-boot:run" -WorkingDirectory "backend" -WindowStyle Hidden
```
Verify port 8080 is listening:
```powershell
Test-NetConnection -ComputerName localhost -Port 8080
```
Expected: `TcpTestSucceeded : True`

- [ ] **Step 3: Start Vite frontend server in background and verify health**

Run in PowerShell:
```powershell
Start-Process -FilePath "npm" -ArgumentList "run dev" -WindowStyle Hidden
```
Verify port 5173 is listening:
```powershell
Test-NetConnection -ComputerName localhost -Port 5173
```
Expected: `TcpTestSucceeded : True`

- [ ] **Step 4: Create standalone Node.js screenshot runner script**

Write `scripts/capture-screenshots.js` using Chrome automation / Puppeteer or create browser automation runner:
```javascript
// scripts/capture-screenshots.js
import fs from 'fs';
import path from 'path';

console.log('Screenshot capture runner initialized.');
```

- [ ] **Step 5: Verify target directory and ports are ready**

Run:
```powershell
Get-ChildItem docs/screenshots
```
Expected: Directory exists and is ready to receive `.png` output files.

---

### Task 2: Capture Public & Authentication Screens (Guest Persona)

**Files:**
- Create: `docs/screenshots/01-landing-page.png`
- Create: `docs/screenshots/02-login-page.png`
- Create: `docs/screenshots/03-register-page.png`

**Interfaces:**
- Consumes: Frontend routes `/`, `/login`, `/register`.
- Produces: Three high-resolution PNG screenshots of public entry points.

- [ ] **Step 1: Capture Landing Page (`http://localhost:5173/`)**

Use Chrome DevTools MCP or browser automation to navigate to `http://localhost:5173/`, resize viewport to 1440x900, wait for images and animations to stabilize, and take screenshot:
- Output: `docs/screenshots/01-landing-page.png`
- View: Hero banner, headline "Level Up Your LAN Experience", quick action CTA buttons, featured gaming lounges, upcoming tournaments feed, and community statistics counter.

- [ ] **Step 2: Capture Login Page (`http://localhost:5173/login`)**

Navigate to `http://localhost:5173/login`:
- Output: `docs/screenshots/02-login-page.png`
- View: Sleek authentication card, email and password inputs, role badge indicators, "Remember me", and quick-login helpers.

- [ ] **Step 3: Capture Register Page (`http://localhost:5173/register`)**

Navigate to `http://localhost:5173/register`:
- Output: `docs/screenshots/03-register-page.png`
- View: Full registration modal displaying Account Role selection (Player vs. Café Owner), gamer tag / full name fields, contact number, and password strength requirements.

- [ ] **Step 4: Verify generated images exist and are non-empty**

Run in PowerShell:
```powershell
Get-ChildItem docs/screenshots/0[1-3]*.png | Select-Object Name, Length
```
Expected: 3 PNG files with size > 20 KB.

---

### Task 3: Capture Café Exploration & Station Booking Flow (Player Persona)

**Files:**
- Create: `docs/screenshots/04-cafe-browse.png`
- Create: `docs/screenshots/05-cafe-detail-stations.png`
- Create: `docs/screenshots/06-booking-flow.png`
- Create: `docs/screenshots/07-my-bookings.png`

**Interfaces:**
- Consumes: Logged-in session for `player.mumbai@lanmitra.com`, routes `/cafes`, `/cafes/1`, `/bookings/new`, `/bookings/my`.
- Produces: Four PNG screenshots documenting the core booking user journey.

- [ ] **Step 1: Authenticate as Player**

Log in via `http://localhost:5173/login` using credentials:
- Email: `player.mumbai@lanmitra.com`
- Password: `Password@123`
Ensure JWT token is stored and Navbar reflects user status "Aman Sharma" (PLAYER).

- [ ] **Step 2: Capture Café Discovery Page (`http://localhost:5173/cafes`)**

Navigate to `http://localhost:5173/cafes`:
- Output: `docs/screenshots/04-cafe-browse.png`
- View: Grid of gaming cafés (Respawn Gaming Lounge Versova, Matrix Esports Arena Lokhandwala, Glitch Gaming Haven 4 Bungalows, Velocity Esports Hub), search filter by area/city, station counts, hourly rate badges.

- [ ] **Step 3: Capture Café Detail & Stations View (`http://localhost:5173/cafes/1`)**

Navigate to `http://localhost:5173/cafes/1`:
- Output: `docs/screenshots/05-cafe-detail-stations.png`
- View: Café banner, amenities, operational hours (9:00 AM - 11:59 PM), full inventory of stations (PC-01, PC-02, PS5-01) with hardware specifications (RTX 4080, 240Hz BenQ Zowie, PS5 4K OLED) and "Book Slot" buttons.

- [ ] **Step 4: Capture Station Booking Calendar & Slot Selection (`http://localhost:5173/bookings/new`)**

Click "Book Slot" on a station or navigate to `/bookings/new?stationId=1`:
- Output: `docs/screenshots/06-booking-flow.png`
- View: Date picker, dynamic 1-hour time slot grid displaying Available vs. Reserved slots, price calculation summary, conflict prevention indicator, and "Confirm Reservation" button.

- [ ] **Step 5: Capture Player My Bookings Dashboard (`http://localhost:5173/bookings/my`)**

Navigate to `http://localhost:5173/bookings/my`:
- Output: `docs/screenshots/07-my-bookings.png`
- View: Active and historical reservations list showing Booking ID, Café name, Station Label, Date, Time Slot, CONFIRMED status badge, and "Cancel Booking" action button.

- [ ] **Step 6: Verify images exist and are non-empty**

Run in PowerShell:
```powershell
Get-ChildItem docs/screenshots/0[4-7]*.png | Select-Object Name, Length
```
Expected: 4 PNG files with size > 20 KB.

---

### Task 4: Capture Café Owner Dashboard & Station Management (Owner Persona)

**Files:**
- Create: `docs/screenshots/08-owner-dashboard.png`
- Create: `docs/screenshots/09-owner-station-management.png`

**Interfaces:**
- Consumes: Logged-in session for `owner.andheri@lanmitra.com`, route `/dashboard`.
- Produces: Two PNG screenshots demonstrating Owner Role-Based Access Control and venue management features.

- [ ] **Step 1: Authenticate as Café Owner**

Log out and log in via `http://localhost:5173/login` using credentials:
- Email: `owner.andheri@lanmitra.com`
- Password: `Password@123`
Ensure Navbar indicates "Sameer Kulkarni (Andheri Lounge Ops)" with CAFE_OWNER badge and Dashboard navigation link.

- [ ] **Step 2: Capture Owner Dashboard Overview (`http://localhost:5173/dashboard`)**

Navigate to `http://localhost:5173/dashboard`:
- Output: `docs/screenshots/08-owner-dashboard.png`
- View: Top analytics summary cards (Total Venues, Total Gaming Stations, Active Reservations, Estimated Revenue), upcoming player reservations list with station tags.

- [ ] **Step 3: Capture Station Inventory & Management Controls**

Scroll down or toggle the Station Management panel on `/dashboard`:
- Output: `docs/screenshots/09-owner-station-management.png`
- View: Station inventory table with hardware specs, hourly rates in ₹, active status toggle switches, and the "Add New Gaming Station" form modal.

- [ ] **Step 4: Verify images exist and are non-empty**

Run in PowerShell:
```powershell
Get-ChildItem docs/screenshots/0[8-9]*.png | Select-Object Name, Length
```
Expected: 2 PNG files with size > 20 KB.

---

### Task 5: Capture Tournaments, Bracket & Leaderboard Screens

**Files:**
- Create: `docs/screenshots/10-tournaments-feed.png`
- Create: `docs/screenshots/11-tournament-bracket.png`
- Create: `docs/screenshots/12-live-leaderboards.png`
- Create: `docs/screenshots/13-player-profile.png`

**Interfaces:**
- Consumes: Routes `/tournaments`, `/tournaments/1`, `/leaderboards`, `/profile`.
- Produces: Four PNG screenshots documenting the esports competition and standings system.

- [ ] **Step 1: Capture Tournaments Feed (`http://localhost:5173/tournaments`)**

Navigate to `http://localhost:5173/tournaments`:
- Output: `docs/screenshots/10-tournaments-feed.png`
- View: Tournaments directory featuring Valorant Mumbai Open, CS2 Campus Cup, and EA FC 25 Showdown, with prize pool badges, registration dates, max participants, and "View Bracket" CTAs.

- [ ] **Step 2: Capture Tournament Details & Interactive Bracket (`http://localhost:5173/tournaments/1`)**

Navigate to `http://localhost:5173/tournaments/1`:
- Output: `docs/screenshots/11-tournament-bracket.png`
- View: Tournament rules, game details, and the single-elimination bracket tree showing round progression (Quarterfinals, Semifinals, Finals) with player matchups and winner advancement.

- [ ] **Step 3: Capture Live Leaderboards (`http://localhost:5173/leaderboards`)**

Navigate to `http://localhost:5173/leaderboards`:
- Output: `docs/screenshots/12-live-leaderboards.png`
- View: Global and collegiate player rankings table displaying Rank (#1, #2, #3 podium icons), Player Tag, Win Rate %, Total Matches, Points, and Recent Form.

- [ ] **Step 4: Capture Player Profile (`http://localhost:5173/profile`)**

Navigate to `http://localhost:5173/profile`:
- Output: `docs/screenshots/13-player-profile.png`
- View: Player gamer card, avatar, contact details, competitive ranking badge, match statistics, and quick history of registered tournaments and café bookings.

- [ ] **Step 5: Verify all screenshots are generated**

Run in PowerShell:
```powershell
Get-ChildItem docs/screenshots/*.png | Select-Object Name, Length
```
Expected: All 13 PNG files present in `docs/screenshots/` with size > 20 KB each.

---

### Task 6: Integrate Output Screenshots into Academic Project Report

**Files:**
- Modify: `docs/LANMitra-Project-Report.md:196-208`

**Interfaces:**
- Consumes: 13 PNG files in `docs/screenshots/`.
- Produces: Completed Chapter 7 in `docs/LANMitra-Project-Report.md` with structured figures, captions, and analytical commentary.

- [ ] **Step 1: Review current Chapter 7 content in `docs/LANMitra-Project-Report.md`**

Lines 196-208 currently contain:
```markdown
## Chapter 7: Results & Screenshots

### 7.1 Screen Descriptions
- **Landing Page:** Introduces the platform to users, highlighting features for players and café owners.
- **Login/Register:** Form with client-side validation and role selection for new accounts.
- **Café List:** A grid view of registered cafés with search and filter capabilities.
- **Booking Flow:** A detailed view of a selected café, listing its stations. Users select a date and are presented with available 1-hour slots.
- **Owner Dashboard:** A secure area where café owners can add new stations, update rates, and view upcoming reservations.

*[Screenshot to be added]*
```

- [ ] **Step 2: Replace placeholder with formatted figures and analytical text**

Update Chapter 7 to include:
- `### 7.1 Overview of Platform Deliverables`
- `### 7.2 Public Discovery & User Onboarding`
  - Figure 7.1: Landing Page (`screenshots/01-landing-page.png`)
  - Figure 7.2: Login Page (`screenshots/02-login-page.png`)
  - Figure 7.3: Registration with Role Selection (`screenshots/03-register-page.png`)
- `### 7.3 Café Discovery & Conflict-Free Station Booking Flow`
  - Figure 7.4: Café Discovery & Search Filter (`screenshots/04-cafe-browse.png`)
  - Figure 7.5: Café Details & Hardware Specifications (`screenshots/05-cafe-detail-stations.png`)
  - Figure 7.6: Interactive Time Slot Reservation (`screenshots/06-booking-flow.png`)
  - Figure 7.7: Player Booking Dashboard (`screenshots/07-my-bookings.png`)
- `### 7.4 Café Owner Administration & Station Management`
  - Figure 7.8: Owner Operational Dashboard (`screenshots/08-owner-dashboard.png`)
  - Figure 7.9: Station Inventory & Pricing Controls (`screenshots/09-owner-station-management.png`)
- `### 7.5 Esports Tournaments, Bracket Engine & Leaderboards`
  - Figure 7.10: Tournaments Directory (`screenshots/10-tournaments-feed.png`)
  - Figure 7.11: Automated Single-Elimination Bracket (`screenshots/11-tournament-bracket.png`)
  - Figure 7.12: Live Player Leaderboard & Rankings (`screenshots/12-live-leaderboards.png`)
  - Figure 7.13: Gamer Profile & Match Analytics (`screenshots/13-player-profile.png`)
- `### 7.6 Verification of Core Functional Requirements`
  - Summary table linking FR IDs to verified UI output figures.

- [ ] **Step 3: Verify document rendering and image links**

Run verification check to ensure every referenced screenshot file exists on disk:
```powershell
Get-Content docs/LANMitra-Project-Report.md | Select-String "screenshots/"
```
Confirm all 13 image paths match the files generated in `docs/screenshots/`.

- [ ] **Step 4: Commit all screenshots and updated documentation**

Run:
```bash
git add docs/screenshots/ docs/LANMitra-Project-Report.md docs/superpowers/plans/2026-10-12-output-screenshots-report.md
git commit -m "docs: add platform output screenshots and complete Chapter 7 of project report"
```
Verify commit succeeded:
```bash
git log -1 --oneline
```
Expected: Clean commit with all screenshot assets and report updates.
