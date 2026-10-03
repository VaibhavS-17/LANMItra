# LANMItra Phase 1 — Task Assignment

**Project:** LANMItra — Gaming Tournament & LAN Café Booking Platform
**Phase:** Phase 1 — Auth + Café & Station Booking
**Plan:** [`docs/superpowers/plans/2026-10-03-phase1-auth-booking.md`](docs/superpowers/plans/2026-10-03-phase1-auth-booking.md)
**Spec:** [`docs/superpowers/specs/2026-10-03-phase1-auth-booking-design.md`](docs/superpowers/specs/2026-10-03-phase1-auth-booking-design.md)

---

## Team Members

| Member | Role | Focus Area |
|---|---|---|
| **Vaibhav** | Lead / Full Stack | Foundation, Security & Authentication |
| **Vedant** | Backend + Frontend | Café & Station Module |
| **Ayush** | Backend + Frontend | Booking Module & Integration |

---

## Task Assignment Overview

```
Phase 1 Timeline
═══════════════════════════════════════════════════════════════

Week 1 — Foundation (Vaibhav)
  ├── Task 1: Environment Setup & Scaffolding
  ├── Task 2: JPA Entities & Enums
  ├── Task 4: JWT Security Infrastructure
  └── Task 5: Auth Service & Controller
        ↓
Week 2 — Backend Modules (Vedant + Ayush in parallel)
  ├── [Ayush]  Task 3: DTOs & Exception Handling
  ├── [Vedant] Task 6: Café Service & Controller
  ├── [Vedant] Task 7: Station Service & Controller
  └── [Ayush]  Task 8: Booking Service & Controller
        ↓
Week 3 — Frontend (All three in parallel)
  ├── [Vaibhav] Task 9:  Frontend Setup (Router, Auth Context, API Layer)
  ├── [Vaibhav] Task 10: Login & Register Pages
  ├── [Vedant]  Task 11: Café Browse & Detail Pages
  ├── [Ayush]   Task 12: Booking Flow Pages
  ├── [Vedant]  Task 13: Owner Dashboard & Station Management
  └── [All]     Task 14: End-to-End Integration Verification
```

---

## 🔵 Vaibhav — Foundation, Security & Auth

> **Why this assignment:** These tasks form the project's backbone. Every other module depends on the entities, security config, and auth system. As the lead, Vaibhav builds the foundation that Vedant and Ayush build on top of.

### Backend Tasks

#### Task 1: Environment Setup & Spring Boot Scaffolding
- [ ] Install Maven on Windows (download, extract, set `MAVEN_HOME` + `PATH`)
- [ ] Install MySQL Community Server
- [ ] Create `lanmitra_db` database and user:
  ```sql
  CREATE DATABASE lanmitra_db;
  CREATE USER 'lanmitra'@'localhost' IDENTIFIED BY 'lanmitra123';
  GRANT ALL PRIVILEGES ON lanmitra_db.* TO 'lanmitra'@'localhost';
  FLUSH PRIVILEGES;
  ```
- [ ] Create `backend/pom.xml` with all dependencies (Spring Boot 3.x, Security, JPA, MySQL, jjwt, Lombok, Validation)
- [ ] Create `backend/src/main/resources/application.yml`
- [ ] Create `LanmitraApplication.java` main class
- [ ] Verify app starts with `mvn spring-boot:run`
- [ ] Commit: `feat: scaffold Spring Boot backend project`

#### Task 2: JPA Entities & Enums
- [ ] Create enums: `UserRole`, `StationType`, `BookingStatus`
- [ ] Create `User` entity (id, name, email, passwordHash, role, phone, avatarUrl, timestamps)
- [ ] Create `Cafe` entity (id, owner FK, name, address, city, description, imageUrl, phone, openingTime, closingTime, isActive, timestamps)
- [ ] Create `Station` entity (id, cafe FK, label, type, specs, hourlyRate, isActive) with unique constraint `(cafe_id, label)`
- [ ] Create `Booking` entity (id, station FK, player FK, bookingDate, startTime, endTime, totalPrice, status, createdAt)
- [ ] Create all 4 repositories:
  - `UserRepository` — `findByEmail()`
  - `CafeRepository` — `findByCityOrName()`, `findByOwnerId()`
  - `StationRepository` — `findByCafeId()`, `existsByCafeIdAndLabel()`
  - `BookingRepository` — `findByPlayerId()`, `findByCafeIdAndDate()`, `findConfirmedByStationIdAndDate()`, `countConflictingBookings()`
- [ ] Verify app starts and tables are auto-created in MySQL
- [ ] Commit: `feat: add JPA entities, enums, and repositories`

#### Task 4: JWT Security Infrastructure
- [ ] Create `JwtConfig` with `@ConfigurationProperties` (secret, expirationMs)
- [ ] Create `JwtTokenProvider` with `generateToken()`, `getUserIdFromToken()`, `validateToken()`
- [ ] Create `CustomUserDetailsService` implementing `UserDetailsService`
- [ ] Create `JwtAuthenticationFilter` extending `OncePerRequestFilter`
- [ ] Create `SecurityConfig` with filter chain:
  - Public: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/cafes/**`
  - Authenticated: all other `/api/**`
  - CORS: allow `http://localhost:5173`
- [ ] Write unit tests for `JwtTokenProvider`
- [ ] Commit: `feat: add JWT security infrastructure`

#### Task 5: Auth Service & Controller
- [ ] Write tests for `AuthService` (register success, duplicate email, login success, wrong password)
- [ ] Implement `AuthService` with `register()` and `login()` methods
- [ ] Create `AuthController`:
  - `POST /api/auth/register` → register with role
  - `POST /api/auth/login` → login, return JWT
  - `GET /api/auth/me` → current user profile
  - `PUT /api/auth/profile` → update profile
- [ ] Test with curl/Postman
- [ ] Commit: `feat: add auth service and controller`

### Frontend Tasks

#### Task 9: Frontend Setup — React Router, Auth Context, API Layer
- [ ] Install dependencies: `npm install axios react-router-dom`
- [ ] Create `src/services/api.js` — Axios instance with JWT interceptor, base URL `http://localhost:8080/api`
- [ ] Create `src/context/AuthContext.jsx` — login(), logout(), user state, token in localStorage
- [ ] Create `src/hooks/useAuth.js` hook
- [ ] Create `src/router/AppRouter.jsx` with all routes (see spec section 6.1)
- [ ] Create `ProtectedRoute` component (redirects to `/login` if no token)
- [ ] Update `App.jsx` to use `BrowserRouter` + `AppRouter` (keep landing page as `/` route)
- [ ] Commit: `feat: add React Router, auth context, and API layer`

#### Task 10: Frontend Auth Pages — Login & Register
- [ ] Create `src/services/authService.js` with `login()`, `register()` API calls
- [ ] Create `src/pages/LoginPage.jsx` — email/password form, redirect on success
- [ ] Create `src/pages/RegisterPage.jsx` — name/email/password/role picker
- [ ] Update `Navbar.jsx` — show Login/Register when logged out, username + Logout when logged in
- [ ] Test full auth flow in browser
- [ ] Commit: `feat: add login and register pages`

### Deliverables
| Deliverable | Files |
|---|---|
| Spring Boot project scaffold | `backend/pom.xml`, `application.yml`, `LanmitraApplication.java` |
| Entity layer | `entity/User.java`, `Cafe.java`, `Station.java`, `Booking.java` |
| Enums | `enums/UserRole.java`, `StationType.java`, `BookingStatus.java` |
| Repositories | `repository/UserRepository.java`, `CafeRepository.java`, `StationRepository.java`, `BookingRepository.java` |
| Security | `security/JwtTokenProvider.java`, `JwtAuthenticationFilter.java`, `CustomUserDetailsService.java`, `config/SecurityConfig.java` |
| Auth API | `service/AuthService.java`, `controller/AuthController.java` |
| Frontend foundation | `services/api.js`, `context/AuthContext.jsx`, `router/AppRouter.jsx` |
| Auth pages | `pages/LoginPage.jsx`, `RegisterPage.jsx` |

---

## 🟢 Vedant — Café & Station Module

> **Why this assignment:** Vedant owns the full café and station vertical — from backend APIs to frontend UI. This includes café CRUD for owners, station management, and the browse/detail pages for players.

> **Depends on:** Vaibhav's Tasks 1, 2, 4, 5 must be complete (entities, security, auth working). Ayush's Task 3 (DTOs) should be complete or coordinated.

### Backend Tasks

#### Task 6: Café Service & Controller
- [ ] Create `CafeRequest` DTO (name, address, city, description, imageUrl, phone, openingTime, closingTime) with validation
- [ ] Create `CafeResponse` DTO
- [ ] Write tests for `CafeService`:
  - Create café (success)
  - Create café (non-owner role → 403)
  - List all cafés
  - Search cafés by city/name
  - Get café by ID
  - Get owner's cafés
  - Update café (own café vs. someone else's)
- [ ] Implement `CafeService` with `create()`, `findAll()`, `search()`, `findById()`, `findByOwner()`, `update()`
- [ ] Create `CafeController`:
  - `GET /api/cafes` — list/search cafés (public)
  - `GET /api/cafes/{id}` — café detail with stations (public)
  - `POST /api/cafes` — create café (`@PreAuthorize CAFE_OWNER`)
  - `PUT /api/cafes/{id}` — update own café (`@PreAuthorize CAFE_OWNER`)
  - `GET /api/cafes/my` — owner's cafés (`@PreAuthorize CAFE_OWNER`)
- [ ] Test with curl/Postman
- [ ] Commit: `feat: add café service and controller`

#### Task 7: Station Service & Controller
- [ ] Create `StationRequest` DTO (label, type, specs, hourlyRate) with validation
- [ ] Create `StationResponse` DTO
- [ ] Write tests for `StationService`:
  - Add station (success)
  - Duplicate label in same café → reject
  - List stations for café
  - Update station
  - Deactivate station
- [ ] Implement `StationService`
- [ ] Create `StationController`:
  - `GET /api/cafes/{cafeId}/stations` — list stations (public)
  - `POST /api/cafes/{cafeId}/stations` — add station (`@PreAuthorize CAFE_OWNER`, must own café)
  - `PUT /api/stations/{id}` — update station (`@PreAuthorize CAFE_OWNER`)
  - `DELETE /api/stations/{id}` — deactivate station (`@PreAuthorize CAFE_OWNER`)
- [ ] Commit: `feat: add station service and controller`

### Frontend Tasks

#### Task 11: Frontend Café Pages — Browse & Detail
- [ ] Create `src/services/cafeService.js` — `getAll()`, `search()`, `getById()`, `create()`, `getMyCafes()`
- [ ] Create `src/pages/CafeListPage.jsx`:
  - Grid of café cards (name, city, image, rating)
  - City filter dropdown
  - Search by name
- [ ] Create `src/pages/CafeDetailPage.jsx`:
  - Café info (name, address, hours, description)
  - Station list with specs and hourly rate
  - "Book" button per station (links to booking page)
- [ ] Commit: `feat: add café list and detail pages`

#### Task 13: Frontend Owner Dashboard
- [ ] Create `src/pages/OwnerDashboard.jsx`:
  - List owner's cafés
  - "Create New Café" form/modal
  - Quick stats per café
- [ ] Create `src/pages/ManageStationsPage.jsx`:
  - Add new station form (label, type, specs, hourly rate)
  - Edit/deactivate existing stations
  - View today's bookings for this café
- [ ] Commit: `feat: add owner dashboard and station management`

### Deliverables
| Deliverable | Files |
|---|---|
| Café API | `dto/request/CafeRequest.java`, `dto/response/CafeResponse.java`, `service/CafeService.java`, `controller/CafeController.java` |
| Station API | `dto/request/StationRequest.java`, `dto/response/StationResponse.java`, `service/StationService.java`, `controller/StationController.java` |
| Café pages | `pages/CafeListPage.jsx`, `pages/CafeDetailPage.jsx` |
| Owner pages | `pages/OwnerDashboard.jsx`, `pages/ManageStationsPage.jsx` |

---

## 🟠 Ayush — DTOs, Booking Module & Integration

> **Why this assignment:** Ayush handles the cross-cutting DTOs/exception handling (needed by everyone), then owns the most critical business logic — the booking system with double-booking prevention. He also drives the final integration verification.

> **Depends on:** Vaibhav's Tasks 1, 2, 4, 5 must be complete (entities, security, auth working). Task 3 (DTOs) should be done early so Vedant can use them too.

### Backend Tasks

#### Task 3: DTOs & Exception Handling ⚡ Do this first!
- [ ] Create request DTOs with Jakarta validation:
  - `RegisterRequest` (name @NotBlank, email @Email, password @Size(min=8), role @NotNull)
  - `LoginRequest` (email @NotBlank, password @NotBlank)
  - `BookingRequest` (stationId @NotNull, date @NotNull, startTime @NotNull, endTime @NotNull)
- [ ] Create response DTOs:
  - `AuthResponse` (token, user)
  - `UserResponse` (id, name, email, role, phone, avatarUrl)
  - `BookingResponse` (id, stationId, stationLabel, cafeName, date, startTime, endTime, totalPrice, status)
- [ ] Create custom exceptions:
  - `ResourceNotFoundException` (extends RuntimeException)
  - `DuplicateResourceException` (extends RuntimeException)
  - `BookingConflictException` (extends RuntimeException)
- [ ] Create `GlobalExceptionHandler` with `@ControllerAdvice`:
  ```java
  // Returns consistent error JSON:
  // { "status": 409, "error": "Conflict", "message": "...", "timestamp": "..." }
  ```
  - Handle `ResourceNotFoundException` → 404
  - Handle `DuplicateResourceException` → 409
  - Handle `BookingConflictException` → 409
  - Handle `AccessDeniedException` → 403
  - Handle `MethodArgumentNotValidException` → 400
- [ ] Commit: `feat: add DTOs, exceptions, and global error handler`

#### Task 8: Booking Service & Controller (with Conflict Detection) ⭐ Core feature!
- [ ] Write tests for `BookingService`:
  - Book a slot successfully
  - **Double-booking same slot → reject** (exact overlap)
  - **Partially overlapping slot → reject** (e.g., 10:00-12:00 vs 11:00-13:00)
  - **Adjacent non-overlapping slot → allow** (e.g., 10:00-11:00 and 11:00-12:00)
  - **Cancelled booking's slot → allow rebooking**
  - Calculate availability for a date
  - Cancel booking
  - Player can only cancel own bookings
- [ ] Implement `BookingService`:
  - `createBooking()` — check conflicts using `countConflictingBookings()` query, calculate price
  - `getAvailability()` — generate 1-hour slots from café opening to closing, mark booked ones
  - `getMyBookings()` — player's bookings
  - `cancelBooking()` — set status to CANCELLED (only own bookings)
  - `getCafeBookings()` — owner views bookings for their café
- [ ] Create `BookingController`:
  - `GET /api/stations/{id}/availability?date=YYYY-MM-DD` — available slots
  - `POST /api/bookings` — book a slot (`@PreAuthorize PLAYER`)
  - `GET /api/bookings/my` — player's bookings
  - `PUT /api/bookings/{id}/cancel` — cancel own booking
  - `GET /api/cafes/{id}/bookings?date=YYYY-MM-DD` — café owner's booking view
- [ ] Test complete booking flow with curl/Postman
- [ ] Commit: `feat: add booking service with conflict detection`

### Frontend Tasks

#### Task 12: Frontend Booking Flow
- [ ] Create `src/services/bookingService.js` — `getAvailability()`, `createBooking()`, `getMyBookings()`, `cancelBooking()`
- [ ] Create `src/pages/BookingPage.jsx`:
  - Date picker (select a date)
  - Time slot grid showing available/booked 1-hour slots
  - Click available slot → confirmation dialog with price
  - Submit → booking confirmed → success message
- [ ] Create `src/pages/MyBookingsPage.jsx`:
  - List of all bookings (upcoming + past)
  - Status badges (Confirmed / Cancelled / Completed)
  - Cancel button for upcoming confirmed bookings
- [ ] Commit: `feat: add booking flow and my bookings page`

#### Task 14: End-to-End Integration Verification 🔍
- [ ] Coordinate with Vaibhav and Vedant — ensure all tasks are merged
- [ ] Start MySQL → backend → frontend
- [ ] Test **Player flow**: Register → Browse cafés → Select station → Book slot → View My Bookings → Cancel booking
- [ ] Test **Café Owner flow**: Register as CAFE_OWNER → Create café → Add stations → View bookings
- [ ] Test **Conflict detection**: Book a slot → try booking same slot again → verify rejection
- [ ] Test **Auth**: Access protected route without token → verify redirect to login
- [ ] Fix any integration issues
- [ ] Commit: `fix: resolve integration issues`

### Deliverables
| Deliverable | Files |
|---|---|
| DTOs | `dto/request/RegisterRequest.java`, `LoginRequest.java`, `BookingRequest.java` + all response DTOs |
| Exception handling | `exception/GlobalExceptionHandler.java`, `ResourceNotFoundException.java`, `DuplicateResourceException.java`, `BookingConflictException.java` |
| Booking API | `service/BookingService.java`, `controller/BookingController.java` |
| Booking pages | `pages/BookingPage.jsx`, `pages/MyBookingsPage.jsx` |

---

## Dependencies & Execution Order

```
Week 1 (Vaibhav works alone — foundation)
════════════════════════════════════════════
  Vaibhav: Task 1 → Task 2 → Task 4 → Task 5
                                              ↓
Week 2 (Vedant + Ayush start — parallel backend work)
════════════════════════════════════════════════════════
  Ayush:  Task 3 (DTOs — needed by everyone) → Task 8 (Booking)
  Vedant: Task 6 (Café) → Task 7 (Station)
                                              ↓
Week 3 (All three — parallel frontend work)
════════════════════════════════════════════
  Vaibhav: Task 9 → Task 10
  Vedant:  Task 11 → Task 13
  Ayush:   Task 12 → Task 14 (integration — all together)
```

> **⚠️ Important:** Vedant and Ayush MUST wait for Vaibhav to complete Tasks 1–5 before starting their backend tasks. The entities, repositories, and security config are prerequisites for all other modules.

---

## Git Workflow

1. **Branch naming**: `feat/<name>-<module>` (e.g., `feat/vaibhav-auth`, `feat/vedant-cafe`, `feat/ayush-booking`)
2. **Each member works on their own branch** and creates a Pull Request to `main` when their tasks are done.
3. **Merge order**: Vaibhav's foundation first → Ayush's DTOs → Vedant's café module and Ayush's booking module → Frontend branches → Integration.
4. **Commit messages**: Use conventional commits (`feat:`, `fix:`, `test:`, `docs:`).

---

## Setup Checklist (Everyone)

Before starting any task, every team member must set up their local environment:

- [ ] Clone the repo: `git clone https://github.com/VaibhavS-17/LANMItra.git`
- [ ] Install **Java 17+** (verify with `java --version`)
- [ ] Install **Maven** (download from https://maven.apache.org/download.cgi, add `bin/` to PATH, verify with `mvn --version`)
- [ ] Install **MySQL 8.x** (download MySQL Community Server from https://dev.mysql.com/downloads/mysql/)
- [ ] Install **Node.js 18+** (verify with `node --version`)
- [ ] Run the SQL setup commands to create the database and user
- [ ] Run `npm install` in the project root for the frontend
