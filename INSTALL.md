# INSTALL.md

# SalonFlow Installation Guide

This guide explains how to install and run SalonFlow locally.

---

## Requirements

Install the following before starting:

* Python 3.14+
* Node.js 20+
* PostgreSQL 17+
* Git

---

# 1. Clone the Repository

```bash
git clone <repository-url>
cd SalonFlow-v1
```

---

# 2. Backend Setup

Go to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python3 -m venv .venv
```

Activate it.

macOS/Linux:

```bash
source .venv/bin/activate
```

Windows:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# 3. Configure Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
APP_NAME=SalonFlow
DATABASE_URL=postgresql+asyncpg://username:password@localhost/salonflow
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Replace the values with your own configuration.

---

# 4. Run Database Migrations

```bash
alembic upgrade head
```

---

# 5. Start the Backend

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://localhost:8000
```

Swagger API documentation:

```text
http://localhost:8000/docs
```

---

# 6. Frontend Setup

Open another terminal.

Go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# 7. Configure Frontend API

Edit:

```text
frontend/src/config/api.ts
```

For local development:

```ts
export const API_BASE_URL = "http://localhost:8000";
```

For production:

```ts
export const API_BASE_URL = "https://your-render-backend-url";
```

---

# 8. Start the Frontend

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

# 9. Production Deployment

Backend:

* Render

Frontend:

* Vercel

Push changes to GitHub to trigger automatic deployments.

---

# Troubleshooting

## CORS Error

Verify that the backend allows the frontend origin in the CORS configuration.

## Database Connection Error

Check:

* PostgreSQL is running
* DATABASE_URL is correct
* Database exists

## Frontend Cannot Login

Verify that `frontend/src/config/api.ts` points to the correct backend URL.

## Missing Python Packages

Install dependencies again:

```bash
pip install -r requirements.txt
```

---

# Support

For questions or issues, refer to the project documentation or repository.

