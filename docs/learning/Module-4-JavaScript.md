# Module IV: JavaScript Fundamentals & DOM (From Scratch)

If you only know Java, JavaScript might look similar, but it behaves very differently! Here are the core concepts you need to know from your syllabus.

---

## 1. The DOM (Document Object Model)
**What is it?**
When your browser loads an HTML file, it reads all the tags (`<body>`, `<div>`, `<h1>`) and turns them into a massive "Tree" of objects in the computer's memory. This tree is called the DOM.

**How does JavaScript use it?**
JavaScript has the power to reach into this tree and change it while the user is looking at the page!
If you write `document.getElementById("title").innerText = "Hello!";`, JavaScript finds that specific HTML node in the tree and changes the text on the screen instantly, without reloading the page.

*Note: In modern development (like LANMItra), we use React, which manages this tree for us so we don't have to write `document.getElementById` anymore!*

## 2. Events and Callbacks
**What are they?**
An "Event" is anything the user does: clicking a mouse, typing on a keyboard, or scrolling.
A "Callback" is a function you write that says *"Hey browser, when the user clicks this button, please run my function."*

**Example:**
```javascript
let myButton = document.getElementById("loginBtn");
myButton.addEventListener("click", function() {
    alert("You clicked log in!");
});
```

## 3. Fetch, HTTP Responses, and JSON
**What is it?**
If you want to load new data into a webpage without refreshing the screen, JavaScript has to talk to a backend server (like our Spring Boot app) in the background.

**How does it work?**
JavaScript uses a function called `fetch()` to send an HTTP request to a URL. 
Because Java and JavaScript are totally different languages, they communicate using **JSON (JavaScript Object Notation)**—a simple text format that looks like this:
```json
{
  "name": "Vaibhav",
  "role": "CAFE_OWNER"
}
```

---
### Summary for your Viva/Exams:
*   *"What is the DOM?"* -> It is an object-oriented representation of the HTML web page, allowing JavaScript to dynamically change the page content.
*   *"What is an Event Listener?"* -> It is a JavaScript function that waits for a specific user action (like a click) and then executes code in response.
*   *"What is JSON used for?"* -> It is a lightweight data-interchange format used to transmit data between a web browser and a backend server.
