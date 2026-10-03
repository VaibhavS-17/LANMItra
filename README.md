<div align="center">
  <img src="Primary Lockup.png" alt="LANMitra Logo" width="300" />
  
  # LANMitra
  **Gaming Tournament & LAN Café Booking Platform**
</div>

---

## 📖 About

LANMitra is a comprehensive web application designed to seamlessly connect gaming café owners, tournament organizers, and players. By providing a centralized platform, LANMitra eliminates the chaos of manual bookings and unorganized tournament management. 

Currently, local gaming cafés and tournament organizers rely heavily on phone calls, WhatsApp groups, and spreadsheets for slot bookings and tournament management. This leads to double-bookings, disorganized brackets, disputed match results, and an overall poor experience. LANMitra solves this by offering a robust system for conflict-free station booking and automated tournament progression.

*This project is developed as an academic requirement for the **Full Stack Java Programming (FSJP)** course at **Mumbai University (Second Year Computer Engineering)**.*

---

## ✨ Features

- 🔐 **Auth & User Management**: Secure registration, login, JWT-based authentication, and comprehensive role-based access control.
- 🎮 **Café & Station Booking**: Browse local cafés, view real-time station availability, guarantee conflict-free bookings, and manage cancellations easily.
- 🏆 **Tournament Management**: Create customized tournaments, benefit from automatic bracket generation, and seamlessly handle byes for non-power-of-2 participant counts.
- ⚔️ **Match & Result Reporting**: Dual-player result reporting with auto-confirmation for matching results and dispute flagging for discrepancies.
- 📊 **Live Leaderboard**: Real-time tracking of bracket progress and finalized tournament results.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, React Router v6, Axios |
| **Backend** | Spring Boot 3.x, Spring Security 6, Java 17+, Spring Data JPA |
| **Database** | MySQL 8.x |
| **Auth & Security** | JWT (JSON Web Tokens) + BCrypt Password Hashing |

---

## 🏗️ System Architecture

```
[React Frontend] <--REST/JSON--> [Spring Boot API Layer]
                                          |
                                  [Service Layer]
                                          |
                              [Spring Data JPA Repositories]
                                          |
                                    [MySQL Database]
```

- **Frontend (React):** Handles the booking calendar, tournament registration, bracket visualization, and leaderboard.
- **Backend (Spring Boot):** Manages REST controllers, business logic (booking conflict checks, bracket generation, dispute state machine), and Spring Security.
- **Database (MySQL):** Relational schema storing users, cafés, stations, bookings, tournaments, and matches.

---

## 📂 Project Structure

```text
LANMItra/
├── backend/                          # Spring Boot application
│   ├── src/main/java/...             # Java source code
│   └── pom.xml                       # Maven configuration
├── src/                              # React frontend
│   ├── components/                   # React components
│   ├── pages/                        # Functional pages
│   └── services/                     # API client layer
└── package.json                      # Node dependencies
```

---

## 🚀 Getting Started / Prerequisites

Ensure you have the following installed before proceeding:
- **Java 17+**
- **Maven**
- **MySQL 8.x**
- **Node.js 18+**
- **npm**

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd LANMItra
   ```

2. **Set up MySQL database:**
   - Create a database named `lanmitra_db`.
   - Create a user with necessary permissions.
   - Update `backend/src/main/resources/application.yml` with your database credentials.

3. **Backend setup:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   *The backend will start on port 8080.*

4. **Frontend setup:**
   Open a new terminal window:
   ```bash
   # from the root of the LANMItra project
   npm install
   npm run dev
   ```
   *The frontend will start on port 5173.*

5. **Access the application:**
   Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔌 API Documentation

| Module | Method | Endpoint | Auth Required | Description |
|---|---|---|---|---|
| **Auth** | POST | `/api/auth/register` | None | Register a new user |
| **Auth** | POST | `/api/auth/login` | None | Login and receive JWT |
| **Cafés** | GET | `/api/cafes` | None | List all cafés |
| **Cafés** | POST | `/api/cafes` | CAFE_OWNER | Create a new café |
| **Stations**| GET | `/api/cafes/{cafeId}/stations` | None | List stations for a café |
| **Stations**| POST | `/api/cafes/{cafeId}/stations` | CAFE_OWNER | Add a station to a café |
| **Bookings**| GET | `/api/stations/{id}/availability` | JWT | Get available time slots |
| **Bookings**| POST | `/api/bookings` | PLAYER | Book a station slot |

---

## 🗄️ Database Schema

The core database consists of four primary tables for Phase 1:

- **Users**: Stores user details (`id`, `name`, `email`, `password_hash`, `role`).
- **Cafes**: Stores café details linked to an owner (`id`, `owner_id`, `name`, `address`).
- **Stations**: Stores PC/Console details linked to a café (`id`, `cafe_id`, `label`, `type`, `hourly_rate`).
- **Bookings**: Tracks reservations (`id`, `station_id`, `player_id`, `booking_date`, `start_time`, `end_time`, `status`).

---

## 👥 User Roles

| Role | Description |
|---|---|
| **Player** | Browses/books café stations, registers for tournaments, reports match results |
| **Café Owner** | Lists café and stations, manages bookings and availability |
| **Organizer** | Creates and manages tournaments, resolves match disputes |
| **Admin** | Oversees platform, manages users, resolves escalated disputes |

---

## 🗺️ Development Roadmap

- **Phase 1: ✅ Auth + Café & Station Booking (current)**
- **Phase 2:** Tournament Management + Bracket Generation
- **Phase 3:** Match Reporting + Disputes + Leaderboard
- **Future:** Payment gateway integration, WebSockets for real-time updates, team/squad registration.

---

## 🎓 Academic Info

- **Course:** Full Stack Java Programming (FSJP)
- **Institution:** Mumbai University
- **Semester:** Second Year Computer Engineering

---

## 📄 License

This is an academic project developed for educational purposes. All rights reserved by the respective contributors and institution.
