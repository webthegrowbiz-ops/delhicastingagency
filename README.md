# Delhi Casting Agency (Way to Bollywood)

India's premier casting agency platform connecting actors, models, dancers, child artists, influencers, and voice artists with Bollywood film directors, OTT productions, and commercial brands.

## Architecture

This repository is structured as a fullstack production monorepo:

- `frontend/` — Next.js 16 (App Router), React 19, Tailwind CSS, Turbopack, Framer Motion (Deployed on **Vercel**).
- `backend/` — Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, PayU Gateway, Cloudinary, Gmail SMTP / Resend (Deployed on **Render**).

## Deployment

### Frontend (Vercel)
- **Framework**: Next.js
- **Root Directory**: `frontend` (or leave as root `./` with automated `vercel.json`)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### Backend (Render)
- **Environment**: Node
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start` (auto-applies Prisma migrations and starts server)
