# Interactive Timeline — Run & Deploy Guide

A Spring Boot REST API (`my-react-router-app/my-app-backend`) + Next.js frontend
(`my-react-router-app/my-app`). Data is stored in a relational database via JPA:
**H2 file-mode locally**, **PostgreSQL in production**.

---

## 1. Run locally

Open **two** terminals.

### Backend (Spring Boot, port 8080)
```powershell
cd my-react-router-app\my-app-backend
.\mvnw.cmd spring-boot:run
```
> On Windows/PowerShell use `.\mvnw.cmd` — `./mvnw` (no extension) is the Mac/Linux script.
> The app creates a local H2 database under `my-app-backend\data\` that persists between runs.
> H2 console (optional): http://localhost:8080/h2-console (JDBC URL `jdbc:h2:file:./data/timelinedb`, user `sa`, no password).

### Frontend (Next.js, port 3000)
```powershell
cd my-react-router-app\my-app
npm install        # first time only
npm run dev
```
Open http://localhost:3000.

The frontend reads the backend URL from `NEXT_PUBLIC_API_URL` and defaults to
`http://localhost:8080` if unset. Copy `my-app/.env.local.example` to
`my-app/.env.local` to override.

---

## 2. Prerequisite: one GitHub repository

Vercel and Render both deploy from a GitHub repo. **Important:** the inner
`my-react-router-app/` folder currently contains its own nested `.git`, which must be
removed so everything lives in a single top-level repo. From the project root:

```powershell
Remove-Item -Recurse -Force my-react-router-app\.git
git add -A
git commit -m "Add persistent DB + deployment config"
# create an empty repo on github.com first, then:
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

---

## 3. Deploy the backend + database to Render

1. Go to https://dashboard.render.com → **New +** → **Blueprint**.
2. Connect your GitHub repo. Render reads `render.yaml` and provisions:
   - a free **PostgreSQL** instance (`timeline-db`), and
   - the **Docker** web service `timeline-backend` (built from the backend `Dockerfile`).
   The `DB_*` env vars are wired automatically; `SPRING_PROFILES_ACTIVE=prod` selects Postgres.
3. Click **Apply**. Wait for the first build/deploy to finish.
4. Note the service URL, e.g. `https://timeline-backend.onrender.com`.
5. Verify: open `https://timeline-backend.onrender.com/api/timeline` → you should see JSON.

> Free Render web services sleep after ~15 min idle; the first request after sleeping
> takes ~30–60s to wake. Free Postgres is deleted after 30 days unless upgraded.

---

## 4. Deploy the frontend to Vercel

1. Go to https://vercel.com → **Add New** → **Project**, import the same repo.
2. Set **Root Directory** to `my-react-router-app/my-app` (Vercel auto-detects Next.js).
3. Add an environment variable:
   - `NEXT_PUBLIC_API_URL` = your Render URL (no trailing slash), e.g.
     `https://timeline-backend.onrender.com`
4. **Deploy.** Note the resulting URL, e.g. `https://your-timeline.vercel.app`.

---

## 5. Connect the two (CORS)

1. In Render → `timeline-backend` → **Environment**, set:
   - `ALLOWED_ORIGINS` = your Vercel URL, e.g. `https://your-timeline.vercel.app`
2. Save (Render redeploys). The backend now accepts requests from your frontend.
3. Open the Vercel URL, add/edit/delete events, and confirm they persist in Postgres.

---

## Environment variables reference

### Backend (Render, `prod` profile)
| Variable | Purpose |
|---|---|
| `SPRING_PROFILES_ACTIVE` | `prod` → use Postgres config |
| `DB_HOST` / `DB_PORT` / `DB_NAME` / `DB_USER` / `DB_PASSWORD` | Postgres connection (auto-wired from `timeline-db`) |
| `ALLOWED_ORIGINS` | Comma-separated frontend origins allowed by CORS |
| `PORT` | Provided by Render; Spring binds to it automatically |

### Frontend (Vercel)
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend (no `/api/timeline` suffix) |
