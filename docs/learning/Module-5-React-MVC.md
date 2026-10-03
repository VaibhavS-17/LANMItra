# Module V: Web Programming using React & MVC (From Scratch)

This module introduces you to modern web development architectures.

---

## 1. MVC Architecture (Model-View-Controller)
**What is it?**
MVC is a design pattern used to keep your code organized. If you put your database code, your HTML code, and your logic all in one file, it becomes a nightmare to fix bugs. MVC splits it into three clean parts:

1.  **Model:** The Data. (In LANMItra, this is our `User.java` and `Cafe.java` entities mapping to the database).
2.  **View:** What the user actually sees. (In LANMItra, this is our React HTML).
3.  **Controller:** The brain. It takes input from the View, updates the Model, and returns a response. (In LANMItra, this is our `@RestController`).

## 2. React: Components and Elements
**What is React?**
React is a JavaScript library built by Facebook. It allows you to create your own custom HTML tags called **Components**.

Instead of writing a massive 10,000 line HTML file, you can break your website into small, reusable pieces:
```jsx
// This is a React Component
function Navbar() {
    return <nav> LANMItra Logo </nav>;
}

function App() {
    // We can use our custom tag anywhere!
    return (
        <div>
            <Navbar />
            <h1>Welcome to the Dashboard</h1>
        </div>
    );
}
```

## 3. React State and Props
*   **State:** This is the "memory" of a component. If a user is typing their email into a text box, React needs to remember what they typed. We use a "Hook" called `useState` to store this memory. If the state changes, React instantly updates the screen!
*   **Props:** This is how you pass data from a parent component down to a child component (like passing a variable into a function).

## 4. Single Page Applications (SPA) and Routing
**What is an SPA?**
In old websites, clicking a link meant the browser downloaded an entirely new HTML page, giving you a white flash screen while it loaded. 
A **Single Page Application** only ever loads *one* HTML file. When you click a link, React instantly swaps out the old components for new components using JavaScript. It feels as fast as an app on your phone.

**Routing:** We use a tool called `react-router` so that when a user goes to `/login`, React knows to show the `LoginComponent` without actually refreshing the browser page!

---
### Summary for your Viva/Exams:
*   *"What is MVC?"* -> An architectural pattern that separates an application into three logical components: the Model (data), the View (UI), and the Controller (logic).
*   *"What is a React Component?"* -> A reusable, independent piece of UI built with a JavaScript function that returns HTML.
*   *"What is a Single Page Application?"* -> A web application that dynamically updates the current web page with new data from the web server, instead of the default method of loading entire new pages.
