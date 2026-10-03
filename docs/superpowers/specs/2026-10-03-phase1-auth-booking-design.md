# LANMItra Phase 1 Design Spec — Auth + Café & Station Booking

**Date:** 2026-10-03
**Status:** Approved
**Scope:** Backend foundation (Spring Boot + MySQL) and functional React frontend for authentication, café management, and station booking.

---

## 1. Overview

Phase 1 delivers the foundational full-stack platform: user registration and login with role-based access, café and station CRUD for owners, and a complete booking flow for players with conflict-free slot reservation. The existing React landing page is preserved and extended with functional screens via React Router.

### 1.1 Tech Stack (per SRS)

| Layer | Technology |
|---|---|
| Frontend | React 18 (Vite), React Router v6 |
| Backend | Spring Boot 3.x, Java 17+ |
| Security | Spring Security 6, JWT (jjwt library), BCrypt |
| Database | MySQL 8.x, Spring Data JPA / Hibernate |
| Build | Maven (backend), npm/Vite (frontend) |

### 1.2 Monorepo Structure

```
LANMItra/
├── backend/                          # Spring Boot application
│   ├── pom.xml
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/lanmitra/
│   │   │   │   ├── LanmitraApplication.java
│   │   │   │   ├── config/
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   ├── CorsConfig.java
│   │   │   │   │   └── JwtConfig.java
│   │   │   │   ├── security/
│   │   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   │   └── CustomUserDetailsService.java
│   │   │   │   ├── entity/
│   │   │   │   │   ├── User.java
│   │   │   │   │   ├── Cafe.java
│   │   │   │   │   ├── Station.java
│   │   │   │   │   └── Booking.java
│   │   │   │   ├── enums/
│   │   │   │   │   ├── UserRole.java
│   │   │   │   │   ├── StationType.java
│   │   │   │   │   └── BookingStatus.java
│   │   │   │   ├── repository/
│   │   │   │   │   ├── UserRepository.java
│   │   │   │   │   ├── CafeRepository.java
│   │   │   │   │   ├── StationRepository.java
│   │   │   │   │   └── BookingRepository.java
│   │   │   │   ├── dto/
│   │   │   │   │   ├── request/
│   │   │   │   │   │   ├── RegisterRequest.java
│   │   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   │   ├── CafeRequest.java
│   │   │   │   │   │   ├── StationRequest.java
│   │   │   │   │   │   └── BookingRequest.java
│   │   │   │   │   └── response/
│   │   │   │   │       ├── AuthResponse.java
│   │   │   │   │       ├── UserResponse.java
│   │   │   │   │       ├── CafeResponse.java
│   │   │   │   │       ├── StationResponse.java
│   │   │   │   │       └── BookingResponse.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── AuthService.java
│   │   │   │   │   ├── CafeService.java
│   │   │   │   │   ├── StationService.java
│   │   │   │   │   └── BookingService.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── CafeController.java
│   │   │   │   │   ├── StationController.java
│   │   │   │   │   └── BookingController.java
│   │   │   │   └── exception/
│   │   │   │       ├── GlobalExceptionHandler.java
│   │   │   │       ├── ResourceNotFoundException.java
│   │   │   │       ├── DuplicateResourceException.java
│   │   │   │       └── BookingConflictException.java
│   │   │   └── resources/
│   │   │       └── application.yml
│   │   └── test/java/com/lanmitra/
│   │       ├── service/
│   │       │   ├── AuthServiceTest.java
│   │       │   ├── BookingServiceTest.java
│   │       │   └── CafeServiceTest.java
│   │       └── controller/
│   │           ├── AuthControllerTest.java
│   │           └── BookingControllerTest.java
├── src/                              # React frontend (existing + new)
│   ├── components/                   # Existing landing page components
│   ├── pages/                        # New functional pages
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── CafeListPage.jsx
│   │   ├── CafeDetailPage.jsx
│   │   ├── BookingPage.jsx
│   │   ├── MyBookingsPage.jsx
│   │   ├── OwnerDashboard.jsx
│   │   └── ManageStationsPage.jsx
│   ├── services/                     # API client layer
│   │   ├── api.js                    # Axios instance with JWT interceptor
│   │   ├── authService.js
│   │   ├── cafeService.js
│   │   └── bookingService.js
│   ├── context/
│   │   └── AuthContext.jsx           # React Context for auth state
│   ├── hooks/
│   │   └── useAuth.js
│   └── router/
│       └── AppRouter.jsx             # React Router setup
├── static-homepage/                  # Assignment submission (unchanged)
└── package.json
```

---

## 2. Database Schema

### 2.1 Entity-Relationship Diagram

```
users 1───∞ cafes 1───∞ stations 1───∞ bookings ∞───1 users
 (owner_id)            (cafe_id)             (station_id)    (player_id)
```

### 2.2 Table Definitions

#### `users`
| Column | Type | Constraints |
|---|---|---|
| `id` | BIGINT | PK, AUTO_INCREMENT |
| `name` | VARCHAR(100) | NOT NULL |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE |
| `password_hash` | VARCHAR(255) | NOT NULL |
| `role` | ENUM('PLAYER','CAFE_OWNER','ORGANIZER','ADMIN') | NOT NULL |
| `phone` | VARCHAR(20) | NULLABLE |
| `avatar_url` | VARCHAR(500) | NULLABLE |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | NOT NULL, ON UPDATE CURRENT_TIMESTAMP |

#### `cafes`
| Column | Type | Constraints |
|---|---|---|
| `id` | BIGINT | PK, AUTO_INCREMENT |
| `owner_id` | BIGINT | FK→users(id), NOT NULL |
| `name` | VARCHAR(200) | NOT NULL |
| `address` | VARCHAR(500) | NOT NULL |
| `city` | VARCHAR(100) | NOT NULL |
| `description` | TEXT | NULLABLE |
| `image_url` | VARCHAR(500) | NULLABLE |
| `phone` | VARCHAR(20) | NULLABLE |
| `opening_time` | TIME | NOT NULL, DEFAULT '10:00' |
| `closing_time` | TIME | NOT NULL, DEFAULT '23:00' |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT TRUE |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | NOT NULL, ON UPDATE CURRENT_TIMESTAMP |

#### `stations`
| Column | Type | Constraints |
|---|---|---|
| `id` | BIGINT | PK, AUTO_INCREMENT |
| `cafe_id` | BIGINT | FK→cafes(id), NOT NULL |
| `label` | VARCHAR(50) | NOT NULL |
| `type` | ENUM('PC','CONSOLE') | NOT NULL |
| `specs` | VARCHAR(500) | NULLABLE (e.g., "RTX 4070, 32GB RAM, 240Hz") |
| `hourly_rate` | DECIMAL(10,2) | NOT NULL |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT TRUE |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

**Unique constraint:** `(cafe_id, label)` — no two stations in the same café can have the same label.

#### `bookings`
| Column | Type | Constraints |
|---|---|---|
| `id` | BIGINT | PK, AUTO_INCREMENT |
| `station_id` | BIGINT | FK→stations(id), NOT NULL |
| `player_id` | BIGINT | FK→users(id), NOT NULL |
| `booking_date` | DATE | NOT NULL |
| `start_time` | TIME | NOT NULL |
| `end_time` | TIME | NOT NULL |
| `total_price` | DECIMAL(10,2) | NOT NULL |
| `status` | ENUM('CONFIRMED','CANCELLED','COMPLETED') | NOT NULL, DEFAULT 'CONFIRMED' |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

**Critical constraint — double-booking prevention:**
A CHECK/application-level constraint ensures no two CONFIRMED bookings for the same station overlap on the same date. The service layer enforces this with a query:

```sql
SELECT COUNT(*) FROM bookings
WHERE station_id = :stationId
  AND booking_date = :date
  AND status = 'CONFIRMED'
  AND start_time < :endTime
  AND end_time > :startTime
```

If count > 0, the booking is rejected with `BookingConflictException`.

### 2.3 Indexing Strategy

- `users(email)` — unique index (login lookups)
- `cafes(city)` — index (city-based search)
- `cafes(owner_id)` — index (owner's cafés)
- `bookings(station_id, booking_date, status)` — composite index (conflict detection and availability queries)
- `bookings(player_id, status)` — index (player's bookings)

---

## 3. Authentication & Security

### 3.1 Registration Flow

1. User submits `{name, email, password, role}`.
2. Validate: email not already registered, password ≥ 8 chars.
3. Hash password with BCrypt (strength 10).
4. Save user entity.
5. Return JWT token + user profile (no password hash).

### 3.2 Login Flow

1. User submits `{email, password}`.
2. Load user by email.
3. Verify password against BCrypt hash.
4. Generate JWT token (24-hour expiry) containing `{userId, email, role}`.
5. Return JWT token + user profile.

### 3.3 JWT Structure

```json
{
  "sub": "user@email.com",
  "userId": 1,
  "role": "PLAYER",
  "iat": 1727955173,
  "exp": 1728041573
}
```

### 3.4 Spring Security Filter Chain

```
Request → CorsFilter → JwtAuthenticationFilter → SecurityContext → Controller
```

- **Public endpoints** (no auth required):
  `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/cafes/**`
- **Authenticated endpoints** (valid JWT required):
  All other `/api/**` endpoints.
- **Role-based access** (enforced via `@PreAuthorize`):
  - `CAFE_OWNER`: Create/edit cafés and stations.
  - `PLAYER`: Create/cancel bookings.
  - `ADMIN`: All operations.

### 3.5 CORS Configuration

During development, the React dev server (Vite on port 5173) and Spring Boot (port 8080) run on different ports. CORS is configured to allow `http://localhost:5173` with credentials.

---

## 4. API Design

### 4.1 Auth Endpoints

| Method | Endpoint | Auth | Request Body | Response |
|---|---|---|---|---|
| POST | `/api/auth/register` | None | `{name, email, password, role}` | `{token, user}` |
| POST | `/api/auth/login` | None | `{email, password}` | `{token, user}` |
| GET | `/api/auth/me` | JWT | — | `{user}` |
| PUT | `/api/auth/profile` | JWT | `{name, phone, avatarUrl}` | `{user}` |

### 4.2 Café Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/cafes` | None | List cafés (filterable by `city`, searchable by `name`) |
| GET | `/api/cafes/{id}` | None | Café detail with station list |
| POST | `/api/cafes` | CAFE_OWNER | Create café |
| PUT | `/api/cafes/{id}` | CAFE_OWNER (own) | Update café |
| GET | `/api/cafes/my` | CAFE_OWNER | List owner's cafés |

### 4.3 Station Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/cafes/{cafeId}/stations` | None | List stations for a café |
| POST | `/api/cafes/{cafeId}/stations` | CAFE_OWNER (own) | Add station |
| PUT | `/api/stations/{id}` | CAFE_OWNER (own) | Update station |
| DELETE | `/api/stations/{id}` | CAFE_OWNER (own) | Deactivate station |

### 4.4 Booking Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/stations/{id}/availability?date=YYYY-MM-DD` | JWT | Get available time slots for a date |
| POST | `/api/bookings` | PLAYER | Book a slot `{stationId, date, startTime, endTime}` |
| GET | `/api/bookings/my` | JWT | Current user's bookings |
| PUT | `/api/bookings/{id}/cancel` | JWT (own) | Cancel a booking |
| GET | `/api/cafes/{id}/bookings?date=YYYY-MM-DD` | CAFE_OWNER (own) | View bookings for owner's café |

### 4.5 Availability Calculation

The `/api/stations/{id}/availability?date=YYYY-MM-DD` endpoint returns 1-hour time slots for the given date, based on the café's operating hours, with booked slots marked:

```json
{
  "stationId": 5,
  "date": "2026-10-05",
  "slots": [
    { "startTime": "10:00", "endTime": "11:00", "available": true },
    { "startTime": "11:00", "endTime": "12:00", "available": false },
    { "startTime": "12:00", "endTime": "13:00", "available": true }
  ]
}
```

---

## 5. Error Handling

All errors follow a consistent JSON structure:

```json
{
  "status": 409,
  "error": "Conflict",
  "message": "This station is already booked for the selected time slot.",
  "timestamp": "2026-10-03T14:30:00"
}
```

| Exception | HTTP Status | When |
|---|---|---|
| `ResourceNotFoundException` | 404 | Entity not found by ID |
| `DuplicateResourceException` | 409 | Email already registered, duplicate station label |
| `BookingConflictException` | 409 | Time slot already booked |
| `AccessDeniedException` | 403 | Wrong role or not the resource owner |
| `BadCredentialsException` | 401 | Wrong email/password |
| Validation errors | 400 | Jakarta Bean Validation failures |

---

## 6. Frontend Pages (Phase 1)

### 6.1 Routing Structure

| Path | Page | Auth Required |
|---|---|---|
| `/` | Landing page (existing) | No |
| `/login` | Login form | No |
| `/register` | Registration form with role picker | No |
| `/cafes` | Browse/search cafés | No |
| `/cafes/:id` | Café detail + station list + booking | JWT |
| `/bookings` | Player's booking history | PLAYER |
| `/owner/dashboard` | Café owner dashboard | CAFE_OWNER |
| `/owner/cafes/:id/stations` | Manage stations | CAFE_OWNER |

### 6.2 Auth Flow (Frontend)

1. On login/register, store JWT in `localStorage`.
2. `AuthContext` provides `{user, token, login(), logout(), isAuthenticated}` to the app.
3. Axios interceptor attaches `Authorization: Bearer <token>` to all API requests.
4. Protected routes redirect to `/login` if no token.
5. On 401 response, clear token and redirect to `/login`.

### 6.3 Booking Flow (UI)

1. Player browses cafés → selects a café → sees station list.
2. Player selects a station → picks a date → sees available 1-hour time slots.
3. Player selects a time slot → confirms booking → sees confirmation with price.
4. Player can view and cancel bookings from "My Bookings" page.

### 6.4 Café Owner Flow (UI)

1. Owner logs in → sees dashboard with their cafés.
2. Owner can create a new café or manage existing ones.
3. Owner can add/edit/deactivate stations for each café.
4. Owner can view today's bookings for their cafés.

---

## 7. Testing Strategy

### 7.1 Backend

- **Unit tests**: Service layer — auth logic, booking conflict detection, authorization checks.
- **Integration tests**: Controller layer with `@SpringBootTest` + `MockMvc` — full request/response cycle including security.
- **Key test cases for booking conflicts:**
  - Exact same time slot → reject.
  - Partially overlapping slot → reject.
  - Adjacent non-overlapping slot → allow.
  - Cancelled booking's slot → allow rebooking.

### 7.2 Frontend

- Manual testing during development.
- Verify all pages render, auth flow works, booking flow completes end-to-end.

---

## 8. Development Environment Setup

### 8.1 Prerequisites to Install

1. **Maven**: Required for building the Spring Boot backend. Download from https://maven.apache.org/ and add to PATH.
2. **MySQL 8.x**: Install MySQL Community Server. Create database `lanmitra_db` with a dedicated user.

### 8.2 Configuration (`application.yml`)

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/lanmitra_db?useSSL=false&serverTimezone=Asia/Kolkata
    username: lanmitra
    password: lanmitra123
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect

app:
  jwt:
    secret: <base64-encoded-256-bit-secret>
    expiration-ms: 86400000  # 24 hours
```

### 8.3 Development Workflow

1. Start MySQL.
2. Run backend: `cd backend && mvn spring-boot:run` (port 8080).
3. Run frontend: `npm run dev` (port 5173).
4. Frontend proxies API calls to `http://localhost:8080`.

---

## 9. What's Explicitly Out of Scope (Phase 2+)

- Tournament management, bracket generation.
- Match result reporting and disputes.
- Leaderboard.
- Admin panel.
- Real payment processing (SRS says simulated).
- WebSockets / real-time updates (SRS says polling for MVP).
- Image upload (using URL strings for now).
