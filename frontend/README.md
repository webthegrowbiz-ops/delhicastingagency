# Way to Bollywood — Delhi Casting Agency

Cinematic membership landing page built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 (CSS-based theme in `src/app/globals.css`) |
| Animation | Framer Motion, Lenis (smooth scroll) |
| Icons | Lucide React |
| Fonts | `next/font/google` — Cormorant Garamond (display) + Inter (body/UI) |
| Components | class-variance-authority, clsx, tailwind-merge |
| Forms | React Hook Form + Zod (`@hookform/resolvers`) |
| Payments | Razorpay Checkout |
| Analytics | GA4, Google Tag Manager, Meta Pixel, Google Ads conversion tracking |

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in your real keys
npm run dev
```

Open http://localhost:3000.

## Environment variables

See `.env.local.example`. Every script (Razorpay, GA4, GTM, Meta Pixel, Google Ads) is
gated behind its env var — leave one blank and it simply won't load, so it's safe to
deploy before every key is ready.

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay Dashboard -> Settings -> API Keys (the Key ID, not the secret) |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics -> Admin -> Data Streams -> Measurement ID (G-...) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager -> Container ID (GTM-...) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Events Manager -> Data Sources -> your Pixel |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` / `..._CONVERSION_LABEL` | Google Ads -> Tools -> Conversions |

## Wiring up real payments

`src/lib/razorpay.ts` currently opens Razorpay Checkout directly from the browser using
just the public Key ID. That's enough to see the full flow end-to-end, but before you
take real payments, add a server route that creates the order with your Key Secret:

1. Create `src/app/api/razorpay/order/route.ts` that calls Razorpay's Orders API using
   `RAZORPAY_KEY_SECRET` (server-only env var, no `NEXT_PUBLIC_` prefix).
2. In `src/components/sections/registration-form.tsx`, fetch that route for an `order_id`
   before calling `launchRazorpayCheckout`, and pass it through as `order_id`.
3. Verify the payment signature server-side (Razorpay's `crypto` HMAC check) before
   marking a member as paid — never trust the client-side `handler` callback alone.

## Where things live

```
src/
  app/
    layout.tsx        # fonts, metadata, analytics scripts, Lenis provider
    page.tsx           # assembles all sections
    globals.css         # design tokens (@theme) - colors, fonts, keyframes
  components/
    layout/             # Navbar, Footer
    sections/            # Hero, ProofStrip, WhatYouGet, HowItWorks, Pricing,
                          # RegistrationForm, Testimonials, FAQ, Closing
    ui/                  # Button (CVA), Reveal (scroll animation), Counter
    analytics.tsx        # GA4 / GTM / Meta Pixel / Google Ads, env-gated
    success-modal.tsx    # shown after a successful payment
    sticky-cta.tsx        # mobile-only sticky "Join Now" bar
  lib/
    constants.ts         # price, stats, tracking IDs, WhatsApp link
    validation.ts         # Zod schema for the registration form
    razorpay.ts             # Checkout loader/launcher
    utils.ts                 # cn() helper
```

## Adding real photos

Hero and section backgrounds are color/gradient only right now, by design, so the page
works without any images yet. Once you have real photography:

- Drop files in `public/` and use `next/image` where you want them (hero backdrop,
  testimonial avatars, etc.).
- Keep hero text contrast in mind: the current gold-on-black palette is tuned for a dark
  backdrop. A busy photo behind the hero headline will need a stronger dark overlay.

## Deploying

Any Next.js host works (Vercel is the simplest - connect the repo, add the env vars in
the dashboard, done). Static export is not used here because the future Razorpay order
API route needs a server runtime.
