# LANMItra Local Environment Setup Guide

Welcome to the LANMItra project! Since we are all developing locally, **everyone on the team** needs to follow these exact steps to set up their computer before writing any code.

This ensures our databases, ports, and environment variables match exactly what our Spring Boot application expects.

---

## 1. Prerequisites 🛠️
Before starting, ensure you have the following installed on your PC:
- **Git** (`git --version`)
- **Java 17 or higher** (`java -version`)
- **Node.js 18 or higher** (`node -v`)

---

## 2. Install Apache Maven (Backend Build Tool) 📦
If you don't have Maven installed, you need it to run the Spring Boot backend.

1. Download the **Binary zip archive** (e.g., `apache-maven-3.10.0-bin.zip`) from the [Official Maven Website](https://maven.apache.org/download.cgi).
2. Extract the downloaded folder to a permanent location, like `C:\tools\apache-maven-3.10.0`.
3. Press your Windows Key, search for **Environment Variables**, and click "Edit the system environment variables".
4. Click **Environment Variables** at the bottom.
5. In the bottom list (System variables), double-click the **`Path`** variable.
6. Click **New** and paste the path to your Maven `bin` folder:
   `C:\tools\apache-maven-3.10.0\bin`
7. Click OK on all windows. Open a **brand new** terminal and type `mvn -v` to verify it works.

---

## 3. Install & Configure MySQL (Database) 🗄️

Every developer needs their own local database. If you don't do this step, the Spring Boot backend will crash on startup!

### Part A: The Installer
1. Download the **MySQL Installer for Windows (MSI)** from [mysql.com](https://dev.mysql.com/downloads/installer/).
2. Run the installer and choose **Development Computer** (or "Developer Default" / "Server Only").
3. Leave the networking defaults: **TCP/IP checked** and **Port 3306**.
4. When prompted for Authentication Method, leave it on **Use Strong Password Encryption**.
5. When prompted for the **MySQL Root Password**, set it to something memorable (like `lanmitraRoot123`). You will need this in Part B!
6. Keep clicking Next (leave Windows Service defaults) and click **Execute** to finish the installation.

### Part B: Creating the LANMItra Database
Now we need to create the specific database our Spring Boot app is looking for.
1. Open your Windows Start Menu, search for **MySQL Command Line Client**, and open it.
2. Enter the Root Password you created in Part A.
3. Copy and paste the following 4 commands into the terminal, pressing `Enter` after each one:

```sql
CREATE DATABASE lanmitra_db;
CREATE USER 'lanmitra'@'localhost' IDENTIFIED BY 'lanmitra123';
GRANT ALL PRIVILEGES ON lanmitra_db.* TO 'lanmitra'@'localhost';
FLUSH PRIVILEGES;
```
4. Type `exit` and hit Enter to close the window. Your database is ready!

---

## 4. Run the Project Locally! 🚀

Now that your PC has the tools, you can run the LANMItra app.

### 1. Pull the Latest Code
```bash
git clone https://github.com/VaibhavS-17/LANMItra.git
cd LANMItra
git checkout main
git pull origin main
```

### 2. Start the Spring Boot Backend
Open a terminal in the `backend` folder and run:
```bash
cd backend
mvn spring-boot:run
```
*Wait until you see `Started LanmitraApplication` in the console. When this runs for the first time, Spring Boot will automatically create all the SQL tables (users, cafes, stations, bookings) inside your new database!*

### 3. Start the React Frontend
Open a **second, separate terminal** in the root project folder (`LANMItra/`) and run:
```bash
npm install
npm run dev
```
*Your React app will now be available at `http://localhost:5173`.*

---

**🎉 You are now ready to code!** Check the `TASK-ASSIGNMENT.md` doc to see which feature branch you should create next.
