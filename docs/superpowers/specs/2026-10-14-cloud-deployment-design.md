# LANMitra Cloud Deployment Design (Vercel + Render + TiDB Cloud)

**Date:** 2026-10-14  
**Status:** Approved  
**Author:** Pair Programming Agent  

---

## 1. Goal & Context

Deploy the LANMitra full-stack application (React 18 frontend, Spring Boot 3 backend, and MySQL 8 relational database) to the cloud using a 100% free-tier, production-ready managed stack:
* **Frontend:** Hosted on **Vercel** with global CDN caching and Single-Page Application (SPA) routing.
* **Backend:** Hosted on **Render** as a lightweight containerized Docker Web Service with dynamic port binding.
* **Database:** Hosted on **TiDB Cloud Serverless** (fully MySQL 8.0 wire-protocol compatible) with automated schema generation and data seeding.

The codebase modifications must remain **strictly minimal**, preserving all existing local development workflows while adding zero-downtime cloud configurability.

---

## 2. Architecture & Communication Flow

```
                      [ User Browser ]
                             │
            HTTPS Request    │    REST API Calls (JWT Bearer)
                             ▼                 │
     ┌────────────────────────────────┐        │
     │      Frontend: Vercel CDN      │        │
     │   (React 18 + Vite 6 + SPA)    │        │
     │    https://lanmitra.vercel.app │        │
     └────────────────────────────────┘        │
                                               ▼
                              ┌──────────────────────────────────┐
                              │     Backend: Render Web Service  │
                              │  (Spring Boot 3 + Docker JRE 17) │
                              │   https://lanmitra-api.onrender  │
                              └────────────────┬─────────────────┘
                                               │
                                    MySQL JDBC │ (TLS / SSL Port 4000)
                                               ▼
                              ┌──────────────────────────────────┐
                              │  Database: TiDB Cloud Serverless │
                              │      (MySQL 8.0 Compatible)      │
                              │     gateway01.us-east-1.prod...  │
                              └──────────────────────────────────┘
```

### Communication Rules:
1. **Frontend $\to$ Backend:** Client Axios instance in `src/services/api.js` points to `VITE_API_URL` (`https://lanmitra-api.onrender.com/api`).
2. **CORS Security:** Spring Boot allows incoming cross-origin requests matching `CORS_ORIGINS` (including `https://*.vercel.app` and `http://localhost:5173`).
3. **Backend $\to$ Database:** Hibernate connects to TiDB Cloud over encrypted TLS (`useSSL=true`) using standard MySQL JDBC driver.
4. **Data Seeding:** On startup, Spring Boot runs `DataSeeder.java`. When `cafeRepository.count() == 0`, it automatically seeds default owner, player, and 4 gaming cafes with 16 stations.

---

## 3. Minimal Code Changes

### A. Frontend
1. **`vercel.json` (New File)**
   * Configures root URL rewrites to `/index.html` to eliminate 404 errors when refreshing client routes (`/cafes`, `/tournaments`, `/login`).
2. **`.env.example` (New File)**
   * Documents `VITE_API_URL` for local dev and cloud builds.

### B. Backend
1. **`backend/src/main/resources/application.yml` (Modify)**
   * Externalize `spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password`, and `spring.datasource.driver-class-name` via environment variables with fallback to local defaults.
   * Expand default `app.cors.allowed-origins` to include `https://*.vercel.app`.
2. **`backend/src/main/java/com/lanmitra/config/SecurityConfig.java` (Modify)**
   * Change `configuration.setAllowedOrigins(allowedOrigins)` to `configuration.setAllowedOriginPatterns(allowedOrigins)` to support wildcard subdomain matching while keeping `allowCredentials = true`.
3. **`backend/Dockerfile` (Modify)**
   * Set `MAVEN_OPTS="-Xmx384m -XX:+TieredCompilation -XX:TieredStopAtLevel=1"` during build stage.
   * Add `-Xmx384m` JVM flag to JRE entrypoint to prevent memory crashes on Render's 512MB RAM ceiling.

---

## 4. Environment Variables Specification

### Backend (Render Web Service)
| Variable Name | Example Value | Description |
| :--- | :--- | :--- |
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://<host>:4000/lanmitra_db?useSSL=true&sslMode=VERIFY_IDENTITY&serverTimezone=UTC&allowPublicKeyRetrieval=true` | JDBC connection string |
| `SPRING_DATASOURCE_USERNAME` | `<cluster-id>.root` | TiDB / MySQL username |
| `SPRING_DATASOURCE_PASSWORD` | `<secure-password>` | TiDB / MySQL password |
| `CORS_ORIGINS` | `https://*.vercel.app,http://localhost:5173` | Allowed origin patterns |
| `JWT_SECRET` | `404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970` | 256-bit signing secret |

### Frontend (Vercel)
| Variable Name | Example Value | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | `https://lanmitra-api.onrender.com/api` | Full URL to Spring Boot backend API |

---

## 5. Verification & Testing Criteria
1. Frontend passes `npm run build` without warning or syntax error.
2. Backend passes `mvn test` and `mvn package -DskipTests`.
3. Local development continues to run seamlessly with zero configuration when environment variables are omitted.
