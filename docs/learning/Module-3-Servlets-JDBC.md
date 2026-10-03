# Module III: Servlets, JSP & JDBC (From Scratch)

If you haven't learned this in college yet, don't worry! These are the older, foundational technologies that built the Java web. Before Spring Boot existed, you *had* to write raw JDBC, Servlets, and JSP to make a website. 

Here is what they actually are in plain English.

---

## 1. JDBC (Java Database Connectivity)
**What is it?** 
JDBC is the official Java tool that allows your Java code to talk to a database (like MySQL). 

**How does it work?**
If you want to save a user to a database using raw JDBC, you have to do everything manually:
1. Load the database driver.
2. Open a network connection to MySQL (`jdbc:mysql://localhost:3306/...`).
3. Write a raw String of SQL: `String sql = "INSERT INTO users VALUES ('Vaibhav')";`
4. Send it to the database using a `Statement`.
5. Close the connection so it doesn't crash your computer.

**In LANMItra:** Writing that for every single database operation takes hundreds of lines of code. Instead, we use **Spring Data JPA**. Under the hood, Spring still uses JDBC, but it writes the SQL strings and opens/closes the connections for us automatically!

---

## 2. Servlets
**What is it?**
A Servlet is simply a Java class that lives on a Web Server (like Apache Tomcat). Its only job is to listen for internet traffic, process it, and send a response back.

**How does it work?**
You create a class and make it `extend HttpServlet`. Then you write methods like `doGet()` (when a user visits a webpage) or `doPost()` (when a user submits a form).

```java
public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse res) {
        res.getWriter().println("Hello World from Java!");
    }
}
```

**In LANMItra:** If you have 50 web pages, you don't want to write 50 Servlet classes. So, Spring Boot uses **one massive Master Servlet** called the `DispatcherServlet`. It catches *all* internet traffic and automatically routes it to our `@RestController` methods!

---

## 3. JSP (Java Server Pages)
**What is it?**
Before React or modern frontend frameworks existed, programmers needed a way to make HTML websites dynamic. JSP allows you to write normal HTML, but you can inject Java code directly inside it using `<% %>` brackets.

**How does it work?**
```jsp
<html>
<body>
    <h1>Welcome, <% out.print(user.getName()); %>!</h1>
</body>
</html>
```
When a user requests this webpage, the server runs the Java code, converts it into pure text HTML, and sends it to the browser. 

**In LANMItra:** We **do not** use JSP. Mixing Java and HTML together gets very messy in large projects. Instead, we use **React**. Our Java backend simply sends plain JSON data (`{"name": "Vaibhav"}`), and our React frontend handles all the HTML and UI. 

---
### Summary for your Viva/Exams:
If a professor asks:
*   *"What is JDBC?"* -> It's the API Java uses to execute SQL queries on a database.
*   *"What is a Servlet?"* -> It's a Java class that handles HTTP requests (GET/POST) on a web server.
*   *"What is JSP?"* -> It's a technology that lets you embed Java code inside HTML to create dynamic web pages.
