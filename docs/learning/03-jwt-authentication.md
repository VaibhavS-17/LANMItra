# 3. JWT Authentication 🔐

Authentication in modern web apps is usually "Stateless" using JSON Web Tokens (JWT).

## The Problem
HTTP is stateless. When you load `google.com`, Google forgets who you are the second the page finishes loading. If you click a link, how does it remember you are logged in?

## The JWT Solution
1. **Login:** You send your Email + Password to `/api/auth/login`.
2. **Verification:** Spring Security checks the database to see if the password matches.
3. **The Token:** If it matches, the backend creates a randomized, cryptographically signed string of text (the JWT Token) and sends it back to React.
   * *Example Token:* `eyJhbGciOiJIUzI1NiIsInR5c...`
4. **Storage:** React saves this token in the browser's `localStorage`.
5. **Future Requests:** Every time React wants to fetch private data (like "My Bookings"), it attaches this Token to the HTTP "Header". 
6. **The Filter:** In Spring Boot, our `JwtAuthenticationFilter.java` intercepts every incoming request. It checks if the token is valid and hasn't expired. If it's valid, it lets the request through!

## Role Based Access Control (RBAC)
We have different roles: `PLAYER`, `CAFE_OWNER`, and `ADMIN`.

In our controllers, we can lock down endpoints using `@PreAuthorize`:

```java
@PreAuthorize("hasRole('CAFE_OWNER')")
@PostMapping("/api/cafes")
public Cafe createCafe(...) {
    // Only cafe owners can run this code!
}
```
If a Player tries to trigger this endpoint, Spring Security will automatically reject them with a `403 Forbidden` error.
