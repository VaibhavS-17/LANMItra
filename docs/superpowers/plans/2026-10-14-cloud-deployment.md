# LANMitra Cloud Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure LANMitra frontend and backend for deployment on Vercel, Render, and TiDB Cloud Serverless with minimal code changes.

**Architecture:** The React 18 SPA is deployed to Vercel with single-page application routing rules (`vercel.json`) communicating with a containerized Spring Boot 3 backend on Render. Spring Boot connects over TLS to a free TiDB Cloud Serverless MySQL database, with externalized credentials, flexible CORS for Vercel, and constrained JVM memory settings for Render's 512MB RAM tier.

**Tech Stack:** React 18, Vite 6, Spring Boot 3.1.5, Java 17, Docker, TiDB Cloud Serverless / MySQL 8.0, Vercel, Render.

**Spec:** `docs/superpowers/specs/2026-10-14-cloud-deployment-design.md`

## Global Constraints

- Keep changes strictly minimal — do not add unnecessary third-party libraries or refactor existing working logic.
- Preserve backward-compatibility so local development runs without requiring any new environment variables.
- Maintain Java 17 and Spring Boot 3.1.5 compatibility.
- Ensure Docker build and runtime do not exceed 512MB RAM for Render free tier.

---

### Task 1: Frontend SPA Routing and Environment Documentation

**Files:**
- Create: `vercel.json`
- Create: `.env.example`

**Interfaces:**
- Consumes: Vite client-side routing in `src/App.jsx` and Axios configuration in `src/services/api.js`.
- Produces: Vercel routing rewrites mapping all non-asset requests to `/index.html`, and environment template for `VITE_API_URL`.

- [ ] **Step 1: Create `vercel.json` for SPA route rewriting**

Create `vercel.json` at project root:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

- [ ] **Step 2: Create `.env.example` at project root**

Create `.env.example` at project root:
```env
# Frontend API base URL pointing to the Spring Boot backend
VITE_API_URL=http://localhost:8080/api
```

- [ ] **Step 3: Test frontend production build**

Run:
```powershell
npm run build
```
Expected output: Build completes successfully in `dist/` with exit code 0.

- [ ] **Step 4: Commit frontend deployment configuration**

Run:
```powershell
git add vercel.json .env.example
git commit -m "feat(frontend): add vercel.json SPA rewrite and .env.example"
```

---

### Task 2: Backend Cloud Datasource & CORS Origin Patterns

**Files:**
- Modify: `backend/src/main/resources/application.yml:5-9,25-27`
- Modify: `backend/src/main/java/com/lanmitra/config/SecurityConfig.java:73-84`

**Interfaces:**
- Consumes: Spring Boot environment variables `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, `CORS_ORIGINS`.
- Produces: Dynamic database connectivity on Render and wildcard CORS allowance for Vercel preview/production domains (`https://*.vercel.app`).

- [ ] **Step 1: Externalize datasource and expand CORS origins in `application.yml`**

Modify `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: ${SPRING_DATASOURCE_URL:jdbc:mysql://localhost:3306/lanmitra_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true}
    username: ${SPRING_DATASOURCE_USERNAME:root}
    password: ${SPRING_DATASOURCE_PASSWORD:lanmitraRoot123}
    driver-class-name: ${SPRING_DATASOURCE_DRIVER_CLASS_NAME:com.mysql.cj.jdbc.Driver}
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
  jackson:
    serialization:
      fail-on-empty-beans: false

app:
  jwt:
    secret: ${JWT_SECRET:404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970}
    expiration-ms: 86400000
  cors:
    allowed-origins: ${CORS_ORIGINS:http://localhost:5173,https://*.vercel.app}
```

- [ ] **Step 2: Update `SecurityConfig.java` to use `setAllowedOriginPatterns`**

In `backend/src/main/java/com/lanmitra/config/SecurityConfig.java`, replace `configuration.setAllowedOrigins(allowedOrigins);` with:
```java
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(allowedOrigins);
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
```

- [ ] **Step 3: Verify backend compilation and tests**

Run:
```powershell
mvn -f backend/pom.xml test-compile
```
Expected output: `BUILD SUCCESS` with exit code 0.

- [ ] **Step 4: Commit backend configuration changes**

Run:
```powershell
git add backend/src/main/resources/application.yml backend/src/main/java/com/lanmitra/config/SecurityConfig.java
git commit -m "feat(backend): externalize datasource credentials and allow vercel cors patterns"
```

---

### Task 3: Backend Docker Memory Optimization for Render Free Tier

**Files:**
- Modify: `backend/Dockerfile:1-13`

**Interfaces:**
- Consumes: Eclipse Temurin Java 17 base images.
- Produces: Memory-capped container image runnable within Render's 512MB RAM constraint.

- [ ] **Step 1: Update `backend/Dockerfile` with JVM memory caps**

Replace `backend/Dockerfile` with:
```dockerfile
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app
ENV MAVEN_OPTS="-Xmx384m -XX:+TieredCompilation -XX:TieredStopAtLevel=1"
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Xmx384m", "-jar", "app.jar"]
```

- [ ] **Step 2: Commit Dockerfile update**

Run:
```powershell
git add backend/Dockerfile
git commit -m "fix(backend): limit maven and jre heap memory for render 512mb tier"
```

---

### Task 4: Deployment Playbook Documentation

**Files:**
- Create: `docs/DEPLOYMENT-GUIDE.md`

**Interfaces:**
- Consumes: Architecture, environment variable keys, and cloud dashboard URLs.
- Produces: Step-by-step user-facing guide for TiDB Cloud Serverless, Render, and Vercel setup.

- [ ] **Step 1: Write `docs/DEPLOYMENT-GUIDE.md`**

Create `docs/DEPLOYMENT-GUIDE.md` detailing:
1. Setting up TiDB Cloud Serverless (free cluster, database name `lanmitra_db`, copying host/user/password).
2. Setting up Render Web Service (Root directory: `backend`, Runtime: `Docker`, setting env vars `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, `CORS_ORIGINS`).
3. Setting up Vercel (Importing `VaibhavS-17/LANMitra`, setting `VITE_API_URL` to the Render backend URL).
4. Verifying end-to-end communication and live login with seeded credentials (`owner.andheri@lanmitra.com` / `Password@123`).

- [ ] **Step 2: Commit deployment documentation**

Run:
```powershell
git add docs/DEPLOYMENT-GUIDE.md
git commit -m "docs: add cloud deployment guide for vercel, render, and tidb"
```
