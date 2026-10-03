# 2. JPA & Databases 🗄️

In the old days of Java, to save a user to a database, you had to write a massive String of SQL:
`String sql = "INSERT INTO users (name, email, password) VALUES ('" + name + "', ...";`

This was messy and unsafe. Today, we use **JPA (Java Persistence API)** and **Hibernate**.

## What is an Entity?
An Entity is just a normal Java class that is mapped to a database table. Look at our `User.java`:

```java
@Entity
@Table(name = "users")
public class User {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
}
```

- `@Entity`: Tells Hibernate "This class is a database table".
- `@Table(name = "users")`: Names the table in MySQL.
- `@Id`: Marks the Primary Key.
- `@GeneratedValue`: Tells MySQL to AUTO_INCREMENT this ID.
- `@Column`: Sets constraints (like `NOT NULL` or `UNIQUE`).

When you run `mvn spring-boot:run`, Hibernate looks at this file and automatically runs `CREATE TABLE users ...` in MySQL for you!

## Relationships
In LANMItra, a Café has many Stations. A Station belongs to one Café.
We map this using **Foreign Keys** in Java:

```java
// Inside Station.java
@ManyToOne
@JoinColumn(name = "cafe_id", nullable = false)
private Cafe cafe;
```
This tells the database to create a `cafe_id` column inside the `stations` table, linking them together perfectly.
