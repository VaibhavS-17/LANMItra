# LANMitra Cloud Deployment Guide

A step-by-step walkthrough to deploy **LANMitra** (Frontend + Backend + Database) 100% free with continuous deployment from GitHub.

```
                      [ User Browser ]
                             │
            HTTPS Request    │    REST API Calls (JWT Bearer)
                             ▼                 │
     ┌────────────────────────────────┐        │
     │      Frontend: Vercel CDN      │        │
     │   (React 18 + Vite 6 + SPA)    │        │
     │    https://lanmitra.vercel.app │        │
     └────────────────────────────────┘        │
                                               ▼
                              ┌──────────────────────────────────┐
                              │     Backend: Render Web Service  │
                              │  (Spring Boot 3 + Docker JRE 17) │
                              │   https://lanmitra-api.onrender  │
                              └────────────────┬─────────────────┘
                                               │
                                    MySQL JDBC │ (TLS / SSL Port 4000)
                                               ▼
                              ┌──────────────────────────────────┐
                              │  Database: TiDB Cloud Serverless │
                              │      (MySQL 8.0 Compatible)      │
                              │     gateway01.us-east-1.prod...  │
                              └──────────────────────────────────┘
```

---

## Step 1: Push Changes to GitHub

Run the following in your terminal to ensure all deployment files are on GitHub:

```powershell
git push origin main
```

---

## Step 2: Provision Cloud MySQL Database (TiDB Cloud Serverless)

TiDB Cloud Serverless provides a free, perpetual MySQL 8.0 compatible database (5GB storage, 50M Request Units/month, no credit card required).

1. Go to [tidbcloud.com](https://tidbcloud.com) and sign up / log in with GitHub or Google.
2. Click **Create Cluster** and select **Serverless (Free)**.
3. Select your cloud provider and region (e.g., `AWS / us-east-1` or nearest region) and click **Create**.
4. Once the cluster is created, click **Connect**:
   * Change connection type to **General** or **Java (JDBC)**.
   * Note down:
     * **Host:** (e.g. `gateway01.us-east-1.prod.aws.tidbcloud.com`)
     * **Port:** `4000`
     * **User:** (e.g. `<cluster-id>.root`)
     * **Password:** *(Click Generate Password and copy it)*
     * **Database Name:** `lanmitra_db` (or create database via Web SQL console: `CREATE DATABASE lanmitra_db;`)
5. Your Spring Boot JDBC URL will look like:
   ```text
   jdbc:mysql://<HOST>:4000/lanmitra_db?useSSL=true&sslMode=VERIFY_IDENTITY&serverTimezone=UTC&allowPublicKeyRetrieval=true
   ```

---

## Step 3: Deploy Backend on Render

1. Log into your [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** $\to$ **Web Service**.
3. Select **Build and deploy from a Git repository** and connect your repository: `VaibhavS-17/LANMitra`.
4. Configure the service:
   * **Name:** `lanmitra-api`
   * **Region:** Singapore or Frankfurt
   * **Branch:** `main`
   * **Root Directory:** `backend`
   * **Runtime:** `Docker`
   * **Instance Type:** `Free`
5. Scroll down to **Environment Variables** and add the following keys:
   | Key | Value |
   | :--- | :--- |
   | `SPRING_DATASOURCE_URL` | `jdbc:mysql://<HOST>:4000/lanmitra_db?useSSL=true&sslMode=VERIFY_IDENTITY&serverTimezone=UTC&allowPublicKeyRetrieval=true` |
   | `SPRING_DATASOURCE_USERNAME` | *(Your TiDB Username)* |
   | `SPRING_DATASOURCE_PASSWORD` | *(Your TiDB Password)* |
   | `CORS_ORIGINS` | `https://*.vercel.app,http://localhost:5173` |
   | `JWT_SECRET` | `404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970` |
6. Click **Create Web Service**.
7. Wait ~2-3 minutes for the build to finish. Once live, copy your backend URL:
   * Example: `https://lanmitra-api.onrender.com`
   * Test in browser: visiting `https://lanmitra-api.onrender.com/api/cafes` should return seeded JSON cafes!

---

## Step 4: Deploy Frontend on Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Under **Import Git Repository**, find **LANMitra** (or `VaibhavS-17/LANMitra`) and click **Import**.
3. In the project setup screen:
   * **Framework Preset:** `Vite` (auto-detected)
   * **Root Directory:** `./`
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
4. Expand **Environment Variables** and add:
   | Key | Value |
   | :--- | :--- |
   | `VITE_API_URL` | `https://<YOUR-RENDER-BACKEND-URL>/api` (e.g. `https://lanmitra-api.onrender.com/api`) |
5. Click **Deploy**.
6. Within 1 minute, your site will be live at `https://lanmitra.vercel.app` (or your assigned Vercel URL).

---

## Step 5: Test the Live Deployment

Visit your live Vercel frontend URL:
1. **Browse Cafes:** Navigate to `/cafes` to see the seeded gaming lounges in Mumbai.
2. **Login as Cafe Owner:**
   * **Email:** `owner.andheri@lanmitra.com`
   * **Password:** `Password@123`
   * You will be taken to the Owner Dashboard where you can manage stations and bookings.
3. **Login as Student Player:**
   * **Email:** `player.mumbai@lanmitra.com`
   * **Password:** `Password@123`
   * Test booking a station slot or viewing leaderboard stats!

---

## Maintenance & Free Tier Notes

* **Render Free Web Services Sleep:** After 15 minutes of inactivity, Render puts the container to sleep. The first request after sleep takes 30-45 seconds to spin up. Subsequent requests are instant.
* **Continuous Updates:** Every time you push commits to GitHub `main`, both Render and Vercel will automatically rebuild and deploy your changes.
