# 0. From Core Java to Spring Boot (The Missing Link)  پلی

If you just finished learning Core Java in college, jumping into Spring Boot can feel incredibly confusing. You are probably used to writing a `public static void main(String[] args)` method, running it in your IDE, typing something into the console, and seeing the program end. 

Spring Boot is very different. Here is the "missing link" between what you learned in college and what we are doing now.

## 1. Where is the `main` method?
We actually *do* have a main method! Look inside `LanmitraApplication.java`:

```java
@SpringBootApplication
public class LanmitraApplication {
    public static void main(String[] args) {
        SpringApplication.run(LanmitraApplication.class, args);
    }
}
```
But instead of printing `System.out.println("Hello");` and closing, `SpringApplication.run` starts a **Web Server** (Tomcat). 
A web server is basically a Java program with a `while(true)` loop that runs forever on Port 8080, listening for internet traffic instead of keyboard input!

## 2. What are all these `@` symbols? (Annotations)
In college, you might have seen `@Override`. In Spring Boot, annotations are *everywhere* (`@RestController`, `@Entity`, `@Service`).

Think of Annotations as **sticky notes** you put on your Java classes to tell Spring Boot what to do with them.
- If you put a `@RestController` sticky note on a class, Spring Boot says: *"Ah! I should route internet HTTP traffic to this class."*
- If you put an `@Entity` sticky note on a class, Hibernate says: *"Ah! I should convert this class into a MySQL Database Table."*

Instead of you having to write 100 lines of setup code, the `@` sticky note does it for you in the background.

## 3. What is Maven and `pom.xml`?
In college, if you wanted to use a 3rd party library (like a MySQL connector), you probably had to download a `.jar` file from the internet and manually attach it to your Eclipse or IntelliJ project.

**Maven** automates this. The `pom.xml` file is literally just a **grocery list**. 
When we run `mvn compile`, Maven looks at our `pom.xml`, goes to the internet, downloads all the `.jar` files we need, and puts them in our project automatically.

## 4. How does Java talk to React? (JSON)
Java uses **Objects** and **Variables**. React uses **JavaScript** and **Text**. 
They don't speak the same language. The universal translator they use is called **JSON (JavaScript Object Notation)**.

If you have a Java Object that looks like this:
```java
User u = new User();
u.setName("Vaibhav");
u.setEmail("v@gmail.com");
```

When Spring Boot sends this back to React, it automatically translates it into JSON text that looks like this:
```json
{
  "name": "Vaibhav",
  "email": "v@gmail.com"
}
```
React reads that JSON text easily! This translation process happens completely automatically because of Spring Boot.

## Summary: The Mindset Shift
- **College Java:** You control the exact flow of the program from line 1 to line 100.
- **Spring Boot Java:** You write "handlers" (Controllers/Services). Spring Boot runs the main loop, and it only calls *your* code when someone clicks a button on the React website. This is called the "Hollywood Principle": *Don't call us, we'll call you.*
