# 1. Spring Boot & Architecture Basics 🏗️

Spring Boot uses a very specific 3-layer architecture. If you look at our `backend/src/main/java/com/lanmitra/` folder, you'll see folders for `controller`, `service`, and `repository`.

Here is how data flows when a user clicks something in the browser:

```
[React Browser] 
      ↓ (HTTP Request like POST /api/auth/login)
[1. Controller] 
      ↓ (Calls a method like authService.login())
[2. Service] 
      ↓ (Calls a method like userRepository.findByEmail())
[3. Repository] 
      ↓ (Runs SQL)
[MySQL Database]
```

## The 3 Layers Explained

### 1. The Controller Layer (`@RestController`)
Think of the Controller as the "Waiter" at a restaurant. 
- It takes the order (HTTP request) from the customer (React).
- It checks if the order is formatted correctly (e.g., using `@Valid` to ensure the email looks like an email).
- It hands the order to the kitchen (Service).
- When the kitchen is done, it brings the food (JSON response) back to the customer.
- **Rule:** Never put complex business logic here! Just take the request and return the response.

### 2. The Service Layer (`@Service`)
Think of the Service as the "Chef" in the kitchen.
- This is where the actual brain of our app lives. 
- If a user tries to book a PC, the Service layer checks if the PC is already booked, calculates the total price, and prepares the data.
- **Rule:** The service does the heavy lifting, then asks the Repository to save it.

### 3. The Repository Layer (`@Repository`)
Think of the Repository as the "Pantry".
- It handles all the talking to MySQL.
- Spring Boot is so smart that if you name a method `findByEmail(String email)`, Spring will automatically generate the SQL `SELECT * FROM users WHERE email = ?` for you! You don't have to write the SQL yourself.

## What is Dependency Injection?
You will see code like this a lot:

```java
@RestController
public class AuthController {
    private final AuthService authService;

    // Constructor
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
}
```

Instead of using `AuthService service = new AuthService()`, we let Spring Boot create the `AuthService` once when the app starts, and it "injects" it into our Controller. This saves memory and makes testing much easier!
