# Software Requirements Specification (SRS)
## LANMitra — Gaming Tournament & LAN Café Booking Platform

**Course:** Full Stack Java Programming (FSJP)
**Institution:** Mumbai University — Second Year Computer Engineering
**Tech Stack:** React (Frontend), Spring Boot (Backend), MySQL via Spring Data JPA

---

## 1. Introduction

### 1.1 Purpose
LANMitra is a web application that connects gaming café owners, tournament organizers, and players. It allows café owners to list PC/console stations for real-time booking, and enables organizers to run tournaments with automatic bracket generation, live leaderboards, and match result tracking.

### 1.2 Problem Statement
Local gaming cafés and tournament organizers currently rely on manual processes — phone calls, WhatsApp groups, spreadsheets — for slot bookings and tournament management. This leads to double-bookings, disorganized brackets, disputed match results, and a poor experience for both café owners and players.

### 1.3 Objectives
- Provide a centralized platform for café station booking with conflict prevention
- Automate tournament bracket generation and progression
- Provide transparent match result tracking with dispute resolution
- Provide a live leaderboard/standings view for ongoing tournaments

### 1.4 Scope
The system covers two core workflows: (1) café station booking, and (2) tournament management (registration, brackets, results, leaderboards). Payment gateway integration, real-time WebSocket updates, and double-elimination brackets are considered future scope, out of the MVP.

---

## 2. User Roles

| Role | Description |
|---|---|
| **Player** | Browses/books café stations, registers for tournaments, reports match results |
| **Café Owner** | Lists café and stations, manages bookings and availability |
| **Organizer** | Creates and manages tournaments, resolves match disputes |
| **Admin** | Oversees platform, manages users, resolves escalated disputes |

*Note: A single user account may hold multiple roles (e.g., a Café Owner can also be a Player).*

---

## 3. Functional Requirements

### 3.1 Authentication & User Management
- FR1.1: Users can register with name, email, password, and select a role
- FR1.2: Users can log in and receive a session/JWT token
- FR1.3: Users can view and edit their profile

### 3.2 Café & Station Booking Module
- FR2.1: Café Owners can register a café with name, address, and contact details
- FR2.2: Café Owners can add stations (PC/console) with specifications and hourly rate
- FR2.3: Players can browse cafés and view station availability by date/time
- FR2.4: Players can book an available slot for a station
- FR2.5: System must prevent double-booking of the same station for overlapping time slots
- FR2.6: Players can cancel a booking within a defined cancellation window
- FR2.7: Café Owners can view/manage bookings for their stations

### 3.3 Tournament Management Module
- FR3.1: Organizers can create a tournament (game, format, entry fee, max participants, registration deadline)
- FR3.2: Players can register for an open tournament
- FR3.3: System auto-generates a single-elimination bracket once registration closes (random or seeded)
- FR3.4: System handles byes when participant count is not a power of 2
- FR3.5: Winner of a match automatically advances to the next round's slot

### 3.4 Match & Result Module
- FR4.1: Players can report the result of their match
- FR4.2: If both players' reported results match, the system auto-confirms and advances the bracket
- FR4.3: If reported results conflict, the match is flagged as "Disputed" for Organizer/Admin review
- FR4.4: Organizer/Admin can manually resolve a disputed match

### 3.5 Leaderboard Module
- FR5.1: System displays live tournament standings (bracket progress or points table)
- FR5.2: System displays final tournament results after completion

---

## 4. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Usability** | Simple, mobile-responsive UI usable without training |
| **Performance** | Booking and bracket queries should respond within 2 seconds under normal load |
| **Reliability** | No double-booking of stations under concurrent requests |
| **Security** | Passwords hashed (BCrypt); role-based access control on all endpoints |
| **Maintainability** | Modular Spring Boot service structure to allow independent module development by team members |
| **Scalability** | Schema designed to support multiple cafés and simultaneous tournaments |

---

## 5. System Architecture (Overview)

```
[React Frontend] <--REST/JSON--> [Spring Boot API Layer]
                                          |
                                  [Service Layer]
                                          |
                              [Spring Data JPA Repositories]
                                          |
                                    [MySQL Database]
```

- **Frontend (React):** Booking calendar, tournament registration, bracket visualization, leaderboard
- **Backend (Spring Boot):** REST controllers, business logic (booking conflict checks, bracket generation, dispute state machine), Spring Security for auth
- **Database (MySQL):** Relational schema for users, cafés, stations, bookings, tournaments, matches

---

## 6. Data Requirements (Core Entities)

- **User** (id, name, email, password, role)
- **Cafe** (id, ownerId, name, address, contact)
- **Station** (id, cafeId, type, specs, hourlyRate)
- **Booking** (id, stationId, userId, startTime, endTime, status)
- **Tournament** (id, organizerId, game, format, entryFee, maxParticipants, status)
- **Registration** (id, tournamentId, userId, registeredAt)
- **Match** (id, tournamentId, round, player1Id, player2Id, status, winnerId)

---

## 7. Constraints

- Project timeline limited to one academic semester
- Team size of 3 — MVP scope prioritized over stretch features
- No real payment gateway in MVP (simulated wallet/ledger only)
- Real-time updates via polling, not WebSockets, for MVP

---

## 8. Assumptions

- Users have a stable internet connection to access the web app
- Café Owners will manually input accurate station availability
- Tournament organizers will resolve disputes within a reasonable time window
- Single-elimination format is sufficient for MVP; double-elimination is future scope

---

## 9. Future Scope

- Double-elimination and round-robin tournament formats
- Real payment gateway integration (Razorpay)
- WebSocket-based real-time bracket/leaderboard updates
- Team/squad registration with roster management
- SMS/push notifications for match schedules
