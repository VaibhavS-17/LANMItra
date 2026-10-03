# Module VI: Applications of Spring Framework

This module covers the exact technologies powering the LANMItra backend! Here is where you can find these concepts in our codebase.

## 1. Dependency Injection (DI) and Inversion of Control (IoC)
**In the Syllabus:** These are core Spring concepts.
**In LANMItra:** Look at `AuthController.java`:
```java
@RestController
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
}
```
**IoC (Inversion of Control):** Instead of *us* calling `new AuthService()`, we give control to Spring Boot.
**DI (Dependency Injection):** When Spring Boot creates the `AuthController`, it automatically *injects* the `AuthService` into the constructor for us!

## 2. Spring Annotations
Annotations (`@`) are everywhere in our code:
*   `@SpringBootApplication`: Boots up the embedded Tomcat server.
*   `@RestController`: Marks a class as an HTTP endpoint handler.
*   `@Service`: Marks a class containing business logic.
*   `@Entity`: Tells Hibernate this class is a MySQL table.
*   `@Autowired`: (Implicit in our constructors) injects dependencies.

## 3. Database Integration (Spring Data JPA)
Instead of raw JDBC, we integrate with MySQL using Spring Data JPA. By extending `JpaRepository`, Spring automatically provides us with methods like `.save()`, `.findAll()`, and `.findById()` without writing a single line of SQL.

## 4. Building RESTful APIs
A REST API is a standard way for systems to communicate over the web using HTTP methods (GET, POST, PUT, DELETE).
In LANMItra, we built RESTful endpoints:
*   `POST /api/auth/register` -> Creates a new user.
*   `POST /api/auth/login` -> Authenticates a user.
*   `GET /api/auth/me` -> Fetches the current logged-in user profile.
These endpoints return **JSON**, completely separating our backend logic from our React frontend view!
