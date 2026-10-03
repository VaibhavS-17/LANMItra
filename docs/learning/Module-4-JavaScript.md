# Module IV: JavaScript Fundamentals & DOM

Your syllabus covers core JavaScript, DOM Manipulation, and Fetching data. Here is how that relates to LANMItra's frontend.

## 1. DOM Manipulation
**In the Syllabus:** You learn to use things like `document.getElementById("btn")`, create nodes manually, and traverse the DOM Tree.
**In LANMItra:** We use **React**. React uses a **Virtual DOM**.
Instead of manually grabbing HTML elements and injecting text, we declare what we want the UI to look like using variables, and React updates the real DOM for us automatically.
*You won't see `document.getElementById` anywhere in our React code!*

## 2. Events & Callbacks
**In the Syllabus:** You attach event listeners like `button.addEventListener('click', myFunction)`.
**In LANMItra (React):** We attach events directly to the components using camelCase properties:
```jsx
<button onClick={handleLogin}>Log In</button>
```

## 3. Fetch, HTTP Responses, and JSON
**In the Syllabus:** You learn to make network requests to get JSON data from a server.
**In LANMItra:** When a user logs in, our React frontend sends a network request to our Spring Boot backend. Instead of using the raw JavaScript `fetch()` API, we use a library called **Axios** (which makes handling JSON much easier).
```javascript
// This replaces raw AJAX/fetch
const response = await axios.post('http://localhost:8080/api/auth/login', {
    email: "test@test.com",
    password: "password123"
});
```
