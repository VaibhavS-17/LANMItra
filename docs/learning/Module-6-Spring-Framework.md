# Module VI: Applications of Spring Framework (From Scratch)

Spring Framework is the absolute industry standard for building Java backends. Here is what makes it so powerful.

---

## 1. Dependency Injection (DI) and Inversion of Control (IoC)
**The Problem:**
In standard Java, if a `Car` class needs an `Engine` class to work, you write: `Engine myEngine = new Engine();`. 
But what if the Engine needs a SparkPlug? You have to build the SparkPlug, pass it to the Engine, and pass the Engine to the Car. This becomes a massive headache.

**The Spring Solution (IoC / DI):**
*   **Inversion of Control (IoC):** We hand over control of creating objects to Spring. We tell Spring: *"You are in charge of building the Engine."*
*   **Dependency Injection (DI):** When we create our `Car` class, we just put `Engine` in the constructor. Spring looks at it, says *"Ah, you need an Engine!"*, builds it for us, and magically injects it into our Car. 

In LANMItra, you'll see this everywhere. Our `AuthController` needs an `AuthService`. We don't use `new AuthService()`, Spring injects it for us!

## 2. Spring Annotations
Annotations are the `@` symbols above Java classes and methods. They are basically "sticky notes" that give instructions to the Spring Framework.
*   `@RestController`: Tells Spring "This class is going to handle internet traffic (HTTP requests)."
*   `@Service`: Tells Spring "This class contains my business logic (math, calculations, rules)."
*   `@Entity`: Tells Spring "Turn this Java class into a MySQL Database Table."

## 3. Building RESTful APIs
**What is an API?**
An API (Application Programming Interface) is a way for two computers to talk to each other. 
In LANMItra, our React frontend is one computer, and our Spring Boot backend is the other. 

**What makes it RESTful?**
REST is a set of rules for how to build APIs over HTTP. It uses standard "Verbs":
*   **GET** - "Give me data" (e.g., `GET /api/cafes` gets a list of cafes).
*   **POST** - "Create new data" (e.g., `POST /api/auth/register` creates a new user).
*   **PUT** - "Update data" (e.g., `PUT /api/users/1` updates user 1's profile).
*   **DELETE** - "Delete data" (e.g., `DELETE /api/bookings/5` deletes a booking).

Instead of returning HTML web pages, RESTful APIs return **JSON** text data, which React then reads and turns into a beautiful UI.

---
### Summary for your Viva/Exams:
*   *"What is Dependency Injection?"* -> It is a design pattern where an object receives other objects that it depends on from an external framework (like Spring), rather than creating them itself.
*   *"What does @RestController do?"* -> It marks the class as a web controller capable of handling HTTP requests and automatically converting responses into JSON.
*   *"What is a RESTful API?"* -> An architectural style for an API that uses standard HTTP requests (GET, POST, PUT, DELETE) to access and manipulate data as JSON.
