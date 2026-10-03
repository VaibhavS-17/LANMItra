# Module III: Servlets, JSP & JDBC vs. Modern Spring Boot

According to your syllabus, Module III covers JDBC, Servlets, and JSP. Since LANMItra is built with modern Spring Boot and React, we handle these concepts in a more advanced, automated way. Here is how your syllabus translates to our actual project code!

## 1. JDBC (Java Database Connectivity)
**In the Syllabus:** You learn to load a driver (`Class.forName()`), create a `Connection`, write raw SQL Strings, and loop through a `ResultSet`.
**In LANMItra:** We use **Spring Data JPA** (which uses JDBC under the hood).
Instead of writing 20 lines of JDBC code to find a user by email, we just do this:
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // JDBC SQL is generated automatically!
}
```
*Behind the scenes, Spring Boot is still using JDBC to connect to MySQL on port 3306, just like you learned!*

## 2. Servlets (Server-side Programming)
**In the Syllabus:** You learn to create classes that extend `HttpServlet` and override `doGet(HttpServletRequest req, HttpServletResponse res)`.
**In LANMItra:** We use **Spring Web**.
Spring Boot actually runs on an embedded Tomcat server which uses a massive master Servlet called the **`DispatcherServlet`**. This master Servlet listens to all incoming traffic and routes it to our specific Java methods using annotations:
```java
@RestController // Tells the DispatcherServlet to send HTTP traffic here
@RequestMapping("/api/auth")
public class AuthController {
    
    @PostMapping("/login") // This replaces the old doPost() method!
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) { ... }
}
```

## 3. JSP (Java Server Pages)
**In the Syllabus:** You learn JSP, where you write HTML inside Java files (`<% out.println(user.getName()); %>`).
**In LANMItra:** We **do not** use JSP. JSP is considered older technology. Instead, we completely separated our frontend and backend. We send raw JSON data from Spring Boot, and our **React** application (Module V) handles the UI. This is called a **Single Page Application (SPA)**.
