# 4. React + Spring Integration 🤝

How does our React Frontend (running on Port 5173) talk to our Spring Boot Backend (running on Port 8080)?

We use a library called **Axios** to make HTTP requests.

## Example: Logging In

### 1. In React (Frontend)
```javascript
import axios from 'axios';

const loginUser = async (email, password) => {
    try {
        // Send a POST request to Spring Boot
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            email: email,
            password: password
        });
        
        // Save the JWT token we get back!
        localStorage.setItem('token', response.data.token);
        console.log("Logged in successfully!");
        
    } catch (error) {
        console.error("Login failed", error);
    }
}
```

### 2. In Spring Boot (Backend)
```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    // React's JSON automatically converts into our Java LoginRequest object!
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        
        // Check password and generate token
        AuthResponse response = authService.login(request);
        
        // Send it back to React!
        return ResponseEntity.ok(response);
    }
}
```

## What is CORS?
Because React is on port `5173` and Spring is on `8080`, browsers will block them from talking to each other for security reasons. This is called a **CORS (Cross-Origin Resource Sharing)** error.

To fix this, we added CORS configuration inside `SecurityConfig.java` to explicitly tell Spring Boot: *"It is okay to accept requests coming from localhost:5173"*.
