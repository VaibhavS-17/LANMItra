# Module V: Web Programming using React & MVC

This module bridges the gap between traditional architecture and modern frontend frameworks.

## 1. MVC Architecture (Model-View-Controller)
The syllabus asks for MVC understanding. LANMItra implements a strictly decoupled MVC pattern!
*   **Model:** Our Spring Boot JPA Entities (`User.java`, `Cafe.java`). This represents our data layer.
*   **View:** Our React Frontend. This is strictly the UI.
*   **Controller:** Our Spring Boot `@RestController`s (`AuthController.java`). This handles the logic between the View and the Model.

## 2. React Components & Elements
In our upcoming React tasks, you will build pages using **Functional Components**.
A component is just a JavaScript function that returns HTML (specifically, JSX).
```jsx
function Login() {
    return <h1>Welcome to LANMItra</h1>;
}
```

## 3. React State, Props, and Hooks
**In the Syllabus:** You must understand State and Hooks.
**In LANMItra:** We will use the `useState` hook to manage form inputs.
```jsx
// Keeping track of what the user types in the email box
const [email, setEmail] = useState("");

return <input value={email} onChange={(e) => setEmail(e.target.value)} />
```

## 4. Routing & SPA
**In the Syllabus:** Creating a Single Page Application (SPA).
**In LANMItra:** We will use `react-router-dom`. When a user clicks "Go to Cafes", the browser *does not reload the page*. Instead, React simply swaps out the current component for the Cafe component instantly, making the website feel like a fast mobile app!
