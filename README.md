# Delhi Casting Agency (Way to Bollywood)

India's premier casting agency platform connecting actors, models, dancers, child artists, influencers, and voice artists with Bollywood film directors, OTT productions, and commercial brands.

## Architecture

This repository is structured as a fullstack production monorepo:

- `frontend/` — Next.js 16 (App Router), React 19, Tailwind CSS, Turbopack, Framer Motion (Deployed on **Vercel**).
- `backend/` — Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, PayU Gateway, Cloudinary, Gmail SMTP (Nodemailer) (Deployed on **Render**).

## Deployment

### Frontend (Vercel)
- **Framework**: Next.js
- **Root Directory**: `frontend` (Set in Vercel Settings > General > Root Directory)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### Backend (Render)
- **Environment**: Node
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start` (auto-applies Prisma migrations and starts server)

## Required Environment Variables

Configure these variables in your deployment dashboard (e.g. Vercel & Render) or private local environment files.

> **Security Notice**: Environment files (`.env*`) and templates are strictly excluded from version control. Never commit secrets to Git.

### Frontend Environment Variables (Vercel)
- `NEXT_PUBLIC_API_URL` — Public URL of the backend API

### Backend Environment Variables (Render)
- `PORT` — Server listening port
- `NODE_ENV` — Runtime environment (`development` / `production`)
- `DATABASE_URL` — PostgreSQL database connection string
- `DIRECT_URL` — Direct PostgreSQL connection string (for migrations if using connection pooler)
- `JWT_SECRET` — Secret key for signing and verifying JSON Web Tokens
- `FRONTEND_URL` — Allowed origin URL for CORS and frontend redirects
- `BACKEND_URL` — Public URL of the backend API (used for PayU payment callbacks)
- `SMTP_HOST` — SMTP server hostname (e.g., `smtp.gmail.com`)
- `SMTP_PORT` — SMTP server port (e.g., `587` or `465`)
- `SMTP_SECURE` — SMTP SSL/TLS connection flag (`true` or `false`)
- `SMTP_USER` — Gmail SMTP username / email address
- `SMTP_PASS` — Gmail SMTP 16-character App Password
- `EMAIL_FROM` — Sender display name and email address
- `CLOUDINARY_CLOUD_NAME` — Cloudinary account cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret
- `PAYU_MERCHANT_KEY` — PayU merchant key
- `PAYU_MERCHANT_SALT` — PayU merchant salt
- `PAYU_MODE` — PayU environment (`TEST` / `LIVE`)
