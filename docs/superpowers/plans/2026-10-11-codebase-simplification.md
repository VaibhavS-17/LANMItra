# LANMitra Codebase Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Radically simplify the backend codebase by removing DTOs and custom exceptions so it is easier to explain for a college mini-project, and connect it to a real MySQL database.

**Architecture:** We will strip away "enterprise" patterns (DTOs, explicit mappers, custom exceptions) and use Entities directly in Controllers and Services. We will replace the H2 in-memory DB configuration with a real MySQL connection. 

**Tech Stack:** Java, Spring Boot, MySQL

**Spec:** Simplification request for a college mini-project presentation.

## Global Constraints

- Must retain existing core functionality (Auth, Cafe, Station, Tournaments)
- The application must continue compiling and running without errors
- Maintain `com.lanmitra` package root

---

### Task 1: Connect Database (Switch from H2 to MySQL)

**Files:**
- Modify: `backend/src/main/resources/application.yml`
- Modify: `backend/pom.xml` (Verify MySQL connector exists)

**Interfaces:**
- Consumes: N/A
- Produces: MySQL connection properties

- [ ] **Step 1: Update application.yml to use MySQL**

Replace the H2 configuration with a standard MySQL configuration.

```yaml
server:
  port: ${PORT:8080}

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/lanmitra_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
    username: root
    password: password
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
    secret: ${JWT_SECRET:404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970}
    expiration-ms: 86400000
  cors:
    allowed-origins: ${CORS_ORIGINS:http://localhost:5173}
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/main/resources/application.yml
git commit -m "chore: switch database from H2 to MySQL"
```

### Task 2: Simplify User Entity for Direct Exposure

**Files:**
- Modify: `backend/src/main/java/com/lanmitra/entity/User.java`

**Interfaces:**
- Consumes: N/A
- Produces: `User` entity with hidden password

- [ ] **Step 1: Add JsonIgnore to passwordHash in User.java**
Add `@JsonIgnore` from `com.fasterxml.jackson.annotation.JsonIgnore` to the `passwordHash` field so it is not leaked when returning the `User` object directly in HTTP responses.

```java
import com.fasterxml.jackson.annotation.JsonIgnore;
// ... (imports)

// inside User class
    @JsonIgnore
    @Column(nullable = false)
    private String passwordHash;
```

- [ ] **Step 2: Commit**

```bash
git add backend/src/main/java/com/lanmitra/entity/User.java
git commit -m "refactor: hide passwordHash from JSON serialization"
```

### Task 3: Remove Custom Exceptions (Simplify Error Handling)

**Files:**
- Modify: Controllers and Services in `backend/src/main/java/com/lanmitra/`
- Delete: `backend/src/main/java/com/lanmitra/exception/` package

**Interfaces:**
- Consumes: N/A
- Produces: Simplified error handling using Spring's `ResponseStatusException`

- [ ] **Step 1: Replace custom exceptions with ResponseStatusException globally**
Search the entire backend for `ResourceNotFoundException`, `BookingConflictException`, and `DuplicateResourceException`. Replace them with `throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "message");` (or `CONFLICT` / `BAD_REQUEST`).

- [ ] **Step 2: Delete exception package**

```bash
rm -rf backend/src/main/java/com/lanmitra/exception
```

- [ ] **Step 3: Commit**

```bash
git add backend/src/main/java/com/lanmitra
git commit -m "refactor: remove custom exceptions and use ResponseStatusException"
```

### Task 4: Remove DTOs (Radical Simplification)

**Files:**
- Delete: `backend/src/main/java/com/lanmitra/dto/` package
- Modify: Controllers and Services to use Entities directly.

**Interfaces:**
- Consumes: Simplified Entities
- Produces: API that accepts and returns Entities

- [ ] **Step 1: Refactor all Controllers and Services to use Entities instead of DTOs**
For example, instead of `CafeRequest` and `CafeResponse`, `CafeController` and `CafeService` will take `Cafe` as a parameter and return `Cafe` as the response. 
Note: For Authentication, accept a generic `Map<String, String>` or create an extremely lightweight embedded record/class in the Auth controller itself.

- [ ] **Step 2: Delete DTO package**

```bash
rm -rf backend/src/main/java/com/lanmitra/dto
```

- [ ] **Step 3: Fix compilation errors**
Run `mvn clean compile` inside the `backend` folder and fix any remaining mapping issues. Ensure the project compiles successfully.

- [ ] **Step 4: Commit**

```bash
git add backend/src/main/java/com/lanmitra
git commit -m "refactor: remove all DTOs and use Entities directly to simplify code"
```

### Task 5: Database Setup Verification

**Files:**
- N/A

**Interfaces:**
- Consumes: N/A
- Produces: Verified working application

- [ ] **Step 1: Verify Spring Boot starts successfully with MySQL**
Provide the SQL commands to create the local database (`CREATE DATABASE lanmitra_db;`), then run the Spring Boot application and ensure it connects to the database successfully and creates the tables.
