Executive Summary & Key Audit Findings
1. Technology Stack
Framework: Next.js 16.3.0 (App Router, Turbopack, React Server Components, 153 Static & SSG Routes).
React: 19.2.8.
TypeScript: 5.x with path alias @/* -> ./src/*.
Styling: Tailwind CSS v4 (@theme inline in src/app/globals.css).
Animation: Framer Motion 13.0.0 & Lenis 1.3.26 smooth scroll.
Form & Validation: React Hook Form 7.84.0 with Zod 4.4.3 resolvers.
Payment Engine: Razorpay Client Checkout (src/lib/razorpay.ts) with local simulated payment fallback (WTB-DEMO-...).
2. Business Model & Role Breakdown
ARTIST / TALENT ROLE:

Route: /profile/setup
Registration: 100% FREE (localStorage.setItem("dca_artist_profile", ...)).
4-Angle Photos: Front View, Left Side Profile, Right Side Profile, Back View.
Optional Upgrade: ₹3,999 Lifetime Premium Membership (Unlocks priority WhatsApp casting alerts, verified gold badge, and priority listing).
Dismiss Behavior: If the artist closes or dismisses the ₹3,999 payment popup, their free artist profile registration remains 100% complete and active.
BRAND / CLIENT / CASTING ROLE:

Route: /register/brand
Registration: ₹9,999 Mandatory Casting Account Fee.
Fields: Contact Person Name, Email, Phone, Company Name, Designation, Category (Production House, Casting Director, Brand Agency, Modeling Agency, OTT Team, Other), City, State, Website, Bio.
Flow: Submitting the form saves the profile in localStorage (dca_brand_profile) and automatically opens the ₹9,999 Razorpay checkout window.
3. Current Session & LocalStorage Key Map
Storage Key	Code File	Current Stored Data	Future Database Replacement
dca_user	src/lib/auth.ts, src/app/login/page.tsx	{ identifier, email, isLoggedIn, role, isPremium, loginTime }	Server HTTP-only JWT Cookie / Redis Session
dca_artist_profile	src/app/profile/setup/page.tsx	{ formData, photoFiles, savedAt, completionPercentage }	PostgreSQL artists & artist_photos tables
dca_brand_profile	src/app/register/brand/page.tsx	{ formData, savedAt, completionPercentage }	PostgreSQL brands table
artist-registration-complete	src/app/register/success/page.tsx	{ formData, savedAt }	Server Database Record
4. Premium Guard & Security Rule
Logged-out Users: Any logged-out user clicking "BECOME PREMIUM" or "REGISTER NOW" is prevented from reaching payment directly and is routed to registration (/profile/setup for Artists or /register/brand for Brands).
Logged-in Artists: Triggering "BECOME PREMIUM" opens the ₹3,999 Artist Checkout.
Logged-in Brands: Triggering "BECOME PREMIUM" opens the ₹9,999 Brand Checkout.
5. Future Backend Architecture Overview (When Ready)


                       ┌────────────────────────┐
                       │         users          │
                       ├────────────────────────┤
                       │ id (UUID, PK)          │
                       │ email (VARCHAR, UNIQUE)│
                       │ phone (VARCHAR, UNIQUE)│
                       │ password_hash (TEXT)   │
                       │ role (ENUM)            │
                       │ is_premium (BOOLEAN)   │
                       └───────────┬────────────┘
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         │ 1:1                                               │ 1:1
┌────────▼───────────────┐                         ┌─────────▼──────────────┐
│    artist_profiles     │                         │     brand_profiles     │
├────────────────────────┤                         ├────────────────────────┤
│ id (UUID, PK)          │                         │ id (UUID, PK)          │
│ full_name, age, gender │                         │ company_name, category │
│ city, state, skills    │                         │ city, state, website   │
└──────────┬─────────────┘                         └───────────┬────────────┘
           │                                                   │
     ┌─────┴───────────┐                                 ┌─────┴────────────┐
     │ 1:N             │ 1:N                             │ 1:N              │
┌────▼───────────┐ ┌───▼──────────────┐            ┌─────▼──────────────┐   │
│ artist_photos  │ │  applications    │◄───────────┤   casting_calls    │◄──┘
├────────────────┤ ├──────────────────┤            ├────────────────────┤
│ photo_angle    │ │ casting_call_id  │            │ title, category    │
│ cdn_url (TEXT) │ │ artist_id (FK)   │            │ location, deadline │
└────────────────┘ └──────────────────┘            └────────────────────┘
Automatic Website Publishing Flow (Future Backend Requirement):


Artist Registers at /profile/setup 
   └─> POST /api/v1/artists/me
          └─> Photos uploaded to Cloud Storage Bucket (S3/R2)
                 └─> CDN URLs saved in `artist_photos` database table
                        └─> Database record set to `status = PUBLISHED`
                               └─> API returns artist in GET /api/v1/artists
                                      └─> Artist automatically appears on /actors, /models, etc.!
Master Specification Artifact
Please review the complete 35-part technical documentation generated in the artifact: 👉 
dca_master_documentation.md

Whenever you are ready to proceed with backend implementation, database setup, or API integration, let me know!

Dca Master Documentation

======================================================================================================================================================

DCA / WAY TO BOLLYWOOD — FRONTEND SYSTEM & BACKEND REQUIREMENTS DOCUMENT
Project Directory: C:\way-to-bollywood - Copy (2)
Platform Name: Way to Bollywood / Delhi Casting Agency (DCA)
Document Type: Forensic Audit, Technical Architecture & Backend Specification
Audit Date: August 27, 2026

1. Project Overview & Business Model
1.1 Platform Purpose
Delhi Casting Agency (DCA) / Way to Bollywood is an online casting and talent management platform serving artists and commercial recruiters across India. The platform bridges the gap between aspiring performers and casting entities across Bollywood feature films, OTT web series, television serials, commercial print ads, brand campaigns, fashion shows, and voice-over projects.

1.2 Dual Role Architecture
The platform operates on a strict two-tier role system:

ARTIST / TALENT ROLE:

Target Audience: Actors, Models, Dancers, Influencers, Child Artists, Voice Performers, and Fresh Faces.
Registration Pricing: 100% FREE (/profile/setup).
Primary Goal: Create a verified digital comp card / casting portfolio, showcase physical attributes, skills, and 4-angle casting photographs, and explore casting calls across India.
Optional Upgrade: ₹3,999 Lifetime Premium Membership (Unlocks priority WhatsApp casting alerts, verified badge, priority listing visibility, and direct casting submissions).

BRAND / CLIENT / CASTING ROLE:

Target Audience: Production Houses, Casting Directors, Commercial Agencies, Ad Brands, OTT Web Series Teams, Modeling Agencies, and Independent Recruiter Studios.
Registration Pricing: ₹9,999 Mandatory Casting Account Fee (/register/brand).
Primary Goal: Create an official casting organization profile, post verified casting briefs/calls, browse categorized talent rosters, and directly contact verified artists.
2. Technology Stack & Environment
Layer	Framework / Library	Version / Configuration
Framework	Next.js	16.3.0 (App Router, Turbopack, React Server Components & Static Site Generation)
UI Library	React	19.2.8
Language	TypeScript	5.x (target: ES2017, strict: true, path alias @/* -> ./src/*)
Styling Engine	Tailwind CSS	v4 (@import "tailwindcss", @theme inline in src/app/globals.css)
Animation Engine	Framer Motion	^13.0.0 (motion.div, AnimatePresence, Reveal)
Smooth Scroll	Lenis	^1.3.26 (SmoothScrollProvider)
Icons	Lucide React & React Icons	lucide-react ^1.28.0, react-icons ^5.7.0
Form Validation	React Hook Form & Zod	react-hook-form ^7.84.0, zod ^4.4.3, @hookform/resolvers ^5.7.1
Payment Gateway	Razorpay Client Checkout	checkout.razorpay.com/v1/checkout.js (Simulated fallback when key ID unconfigured)
3. Project File Tree & Component Audit

C:\way-to-bollywood - Copy (2)
├── package.json                   # Project dependencies (Next 16.3.0, React 19.2.8, Tailwind 4, Zod, Razorpay)
├── tsconfig.json                   # TypeScript path aliases (@/* -> ./src/*)
├── next.config.ts                 # Next.js configuration
├── public/                        # Static media assets & actor portfolio images
│   ├── images/
│   │   ├── actors/                # Actor portfolio & section banners
│   │   └── logos/                 # DCA Agency logos
│   └── media/dca/                 # Editorial guidelines & about hero graphics
└── src/
    ├── app/                       # Next.js App Router pages (153 static & SSG routes)
    │   ├── layout.tsx             # Root layout: Manrope (sans) font, SmoothScrollProvider, Navbar, Footer
    │   ├── globals.css            # Global CSS, Tailwind v4 theme inline, --font-sans & --font-serif mappings
    │   ├── page.tsx               # Homepage / Landing page
    │   ├── about-us/page.tsx      # About DCA, mission, values, 4 numbered journey steps
    │   ├── actors/                # Actors division landing page & sub-category routes
    │   │   ├── page.tsx           # All Actors Roster & Category Grid
    │   │   ├── female/            # Female actors filter
    │   │   ├── male/              # Male actors filter
    │   │   ├── child-actors/      # Child actors filter
    │   │   ├── experienced/       # Seasoned actors filter
    │   │   ├── fresh-faces/       # Emerging talent filter
    │   │   ├── popular/           # Popular star roster
    │   │   └── profile/[id]/      # Dynamic SSG actor profile view (e.g. rahul-mehra, arjun-verma)
    │   ├── models/                # Models division & profile routes
    │   ├── dancers/               # Dancers division & profile routes
    │   ├── child-artists/         # Child artists division & profile routes
    │   ├── influencers/           # Influencers division & profile routes
    │   ├── voice-artists/         # Voice artists division & profile routes
    │   ├── casting-calls/         # Casting opportunities listing, categories & detail modals
    │   ├── profile/setup/page.tsx # Artist 2-Step Profile Setup & 4-Angle Photo Uploads
    │   ├── register/brand/page.tsx# Brand Casting Account Setup (Mandatory ₹9,999 checkout)
    │   ├── register/success/      # Artist Registration Success page & summary comp card
    │   ├── dashboard/page.tsx     # Unified Artist / Brand Client Dashboard
    │   ├── membership/page.tsx    # Membership comparison page & ₹3,999 / ₹9,999 CTAs
    │   ├── login/page.tsx         # Client-side Artist & Brand Login Portal
    │   ├── contact-us/page.tsx    # Enquiry & Contact form
    │   ├── blog/                  # Industry guides, audition tips, scam safety articles
    │   ├── how-it-works/page.tsx  # Step-by-step casting workflow guide
    │   ├── privacy-policy/        # Legal compliance
    │   ├── terms-and-conditions/  # Legal compliance
    │   └── refund-and-cancellation-policy/ # Payment refund policy
    ├── components/
    │   ├── analytics.tsx          # GA4, Meta Pixel & Google Ads tracking helpers
    │   ├── auth/
    │   │   └── AccountTypeModal.tsx # "Choose Your Account Type" modal (REGISTER AS ARTIST / BRAND)
    │   ├── casting-calls/         # CastingCallCard, CastingFilters, CastingDetailModal, CastingApplyModal
    │   ├── layout/
    │   │   ├── navbar.tsx         # Sticky navigation, desktop dropdowns, mobile drawer, REGISTER NOW CTA
    │   │   ├── footer.tsx         # Site map, legal links, company details
    │   │   └── scroll-navigation.tsx # Back to top floating button
    │   ├── premium-flow-modal.tsx # Unified ₹3,999 Artist & ₹9,999 Brand Checkout Modal
    │   ├── sections/
    │   │   ├── hero.tsx           # Homepage Hero section
    │   │   ├── pricing.tsx        # Pricing table & BECOME PREMIUM event handlers
    │   │   ├── registration-form.tsx # Multi-step artist registration form
    │   │   ├── talent-casting.tsx # Talent section grid
    │   │   └── brand-marquee.tsx  # Production brand partner logo marquee
    │   └── ui/                    # Reusable UI primitives (Button, PageHero, SectionHeading, TalentCard, etc.)
    ├── data/                      # Static JSON datasets
    │   ├── actors.ts              # Mock actor profiles & category metadata
    │   ├── models.ts              # Mock model profiles & category metadata
    │   ├── dancers.ts             # Mock dancer profiles
    │   ├── child-artists.ts       # Mock child artist profiles
    │   ├── influencers.ts         # Mock influencer profiles
    │   ├── voice-artists.ts       # Mock voice artist profiles
    │   └── casting-calls.ts       # Mock verified casting call briefs
    └── lib/
        ├── auth.ts                # Client-side localStorage session manager (`dca_user`)
        ├── razorpay.ts            # Razorpay checkout script loader & fallback demo simulator
        ├── constants.ts           # Site constants, ₹3,999 default price, tracking IDs
        ├── site-navigation.ts     # Header & footer navigation structure
        ├── tokens.ts              # Typography & color design tokens
        ├── utils.ts               # Classname merger (`clsx` + `tailwind-merge`)
        └── validation.ts          # Zod validation schemas for forms

4. Route Inventory & Access Rules

Route Path	Page Description	Access Rule	Current Data Source	Required Backend Integration

/	Homepage / Landing Page	Public	Static Components & src/data/	Dynamic Featured Talent & Active Casting Counter
/actors/	All Actors Division Roster	Public	src/data/actors.ts	GET /api/v1/artists?category=actor
/actors/female/	Female Actors Listing	Public	src/data/actors.ts	Filter Query Parameter
/actors/male/	Male Actors Listing	Public	src/data/actors.ts	Filter Query Parameter
/actors/child-actors/	Child Actors Filter	Public	src/data/actors.ts	Filter Query Parameter
/actors/experienced/	Seasoned Actors Filter	Public	src/data/actors.ts	Filter Query Parameter
/actors/fresh-faces/	Fresh Faces Filter	Public	src/data/actors.ts	Filter Query Parameter
/actors/popular/	Star Talent Filter	Public	src/data/actors.ts	Filter Query Parameter
/actors/profile/[id]	Individual Actor Comp Card	Public	src/data/actors.ts (SSG)	GET /api/v1/artists/:id
/models/	Models Division Roster	Public	src/data/models.ts	GET /api/v1/artists?category=model
/models/profile/[id]	Individual Model Comp Card	Public	src/data/models.ts	GET /api/v1/artists/:id
/dancers/	Dancers Division Roster	Public	src/data/dancers.ts	GET /api/v1/artists?category=dancer
/child-artists/	Child Artists Division	Public	src/data/child-artists.ts	GET /api/v1/artists?category=child
/influencers/	Influencers Division	Public	src/data/influencers.ts	GET /api/v1/artists?category=influencer
/voice-artists/	Voice Artists Division	Public	src/data/voice-artists.ts	GET /api/v1/artists?category=voice
/casting-calls/	All Casting Opportunities	Public	src/data/casting-calls.ts	GET /api/v1/casting-calls
/casting-calls/[category]	Casting Briefs by Sub-type	Public	src/data/casting-calls.ts	Filter Query Parameter
/profile/setup	Artist Profile Registration	Public / Artist	React State + localStorage (dca_artist_profile)	POST /api/v1/artists/register
/register/brand	Brand Account Setup	Public / Brand	React State + localStorage (dca_brand_profile) + Razorpay ₹9,999	POST /api/v1/brands/register
/register/success	Registration Completion Summary	Registered Artist	sessionStorage / localStorage	GET /api/v1/artists/me
/dashboard	Artist & Brand Client Dashboard	Authenticated	localStorage (dca_user + dca_artist_profile)	GET /api/v1/dashboard/me
/membership	Premium Plans & Benefits	Public	Static + Modal Triggers	GET /api/v1/membership/plans
/login	User Portal Sign-In	Public	localStorage.setItem("dca_user")	POST /api/v1/auth/login
/about-us	Company History & Mission	Public	Static JSX	None
/contact-us	Support & Enquiry Form	Public	React State (useState)	POST /api/v1/contact
/blog/	Industry Blog & Safety Guides	Public	Static JSON	GET /api/v1/blog
/how-it-works	Workflow Walkthrough	Public	Static JSX	None
5. Artist User Journey & 4-Angle Photo Upload Architecture
5.1 Step-by-Step Artist Journey

Visitor Page Browse 
   └─> Clicks "REGISTER NOW" / "REGISTER AS ARTIST"
          └─> Navigates to `/profile/setup`
                 ├─> STEP 1: Basic & Physical Details Form
                 │      ├─ Personal: Full Name, Display Name, DOB, Age, Gender, City, State, Mobile, Email, Languages
                 │      ├─ Talent: Primary Category (Actor/Model/etc.), Experience Level, Skills, Special Skills, Previous Work, Bio
                 │      └─ Specifications: Height, Weight, Chest, Waist, Hips, Shoe Size, Hair Color, Eye Color, Skin Tone
                 ├─> Clicks "Next: Upload Photos →" (Sets `currentStep = 2`)
                 └─> STEP 2: 4-Angle Casting Photos & Required Guidelines
                        ├─ Reference Pose Cards (Front View, Left Side Profile, Right Side Profile, Back View)
                        ├─ 4 Upload Slots:
                        │     1. FRONT PHOTO (Clear front-facing photo)
                        │     2. LEFT PHOTO (Complete left-side profile)
                        │     3. RIGHT PHOTO (Complete right-side profile)
                        │     4. BACK PHOTO (Back view showing posture/hair)
                        └─ Clicks "Save & View Profile"
                               └─> Triggers `handleSubmit()`:
                                      ├─ Stores profile state in `localStorage.setItem("dca_artist_profile", ...)`
                                      ├─ Sets user session in `localStorage.setItem("dca_user", ...)` (`role: "artist"`, `isPremium: false`)
                                      └─ Redirects to `/dashboard` (Free Artist Profile active)
5.2 Required Photo Angle Specifications
Front View: Person standing straight, facing the camera directly, neutral or smiling expression, no heavy makeup.
Left Side Profile: Turned 90° to the right (left profile to camera), hair pulled back from face.
Right Side Profile: Turned 90° to the left (right profile to camera), shoulders back.
Back View: Turned 180° away from camera, showing hair length and body posture clearly.
Validation: Accepts image/jpeg, image/jpg, image/png, image/webp. Uses URL.createObjectURL(file) for browser previews.
5.3 Required Future Image Storage Architecture

Artist Uploads File in Browser 
   └─> Multipart Form Data sent to `POST /api/v1/artists/me/photos`
          └─> Backend validates file mime type & size limit (max 5MB)
                 └─> Uploads file buffer to S3 / Cloudflare R2 Cloud Bucket
                        └─> Bucket returns CDN URL (e.g. `https://cdn.delhicastingagency.com/photos/usr_123_front.jpg`)
                               └─> Backend updates `artist_photos` DB table with URL & angle key
                                      └─> Profile listing renders CDN image URL dynamically
6. Brand / Client User Journey & ₹9,999 Payment Flow
6.1 Step-by-Step Brand Journey

Recruiter / Casting Director / Brand Visitor
   └─> Clicks "REGISTER NOW" -> "REGISTER AS BRAND"
          └─> Navigates to `/register/brand`
                 ├─> SECTION 1: Account Contact Person
                 │      └─ Full Name, Email Address, Mobile / Phone
                 ├─> SECTION 2: Company & Organization Details
                 │      └─ Company Name, Designation, Organization Category (Production House, Casting Director, Brand/Agency, Modeling Agency, OTT Team, Other), City, State, Website, Description
                 └─> Clicks "Create Casting Account"
                        └─> Triggers `handleSubmit()`:
                               ├─ Saves session in `localStorage.setItem("dca_user", ...)` (`role: "brand"`)
                               ├─ Saves brand details in `localStorage.setItem("dca_brand_profile", ...)`
                               └─ Invokes `launchRazorpayCheckout({ amount: 9999, description: "Brand Premium Casting Account — ₹9,999" })`
                                      ├─ On Payment Success:
                                      │     ├─ Sets `setUserPremiumStatus(true)` in `dca_user`
                                      │     └─ Redirects to `/dashboard`
                                      └─ On Dismiss / Local Fallback:
                                            └─ Completes registration fallback and redirects to `/dashboard`
7. Authentication & LocalStorage Audit
7.1 Current Client-Side Session Schema (src/lib/auth.ts)
Session Key: dca_user

json

{
  "identifier": "aarav.sharma@example.com",
  "email": "aarav.sharma@example.com",
  "isLoggedIn": true,
  "loginTime": "2026-08-27T14:20:00.000Z",
  "role": "artist",
  "isPremium": false
}
7.2 Complete LocalStorage & SessionStorage Key Inventory
Storage Key	Code File Location	Data Stored	Purpose & Lifecycle	Database Replacement Entity
dca_user	src/lib/auth.ts, src/app/login/page.tsx	{ identifier, email, isLoggedIn, role, isPremium, loginTime }	Client session state & role tracking	Server HTTP-only JWT Cookie / Redis Session Store
dca_artist_profile	src/app/profile/setup/page.tsx, src/app/dashboard/page.tsx	{ formData, photoFiles, savedAt, completionPercentage }	Temporary client-side artist profile & photo blob URLs	PostgreSQL artists & artist_photos tables
dca_brand_profile	src/app/register/brand/page.tsx	{ formData, savedAt, completionPercentage }	Temporary client-side brand organization details	PostgreSQL brands table
artist-registration-complete	src/app/register/success/page.tsx	{ formData, savedAt }	Session flag for registration success page display	Server database user record
8. Premium Membership Logic & Strict Security Rules
8.1 Plan Comparison & Pricing Summary
Parameter	Artist Account (Free)	Artist Premium Upgrade	Brand Casting Account
Target Role	Artist / Talent	Logged-in Artist	Production / Brand Recruiter
Pricing	₹0 (100% FREE)	₹3,999 (One-Time Lifetime)	₹9,999 (One-Time Mandatory)
Mandatory Status	Mandatory for all artists	OPTIONAL	Mandatory for recruiters
Profile Creation	Full Profile & 4 Photos	Full Profile & 4 Photos	Full Organization Profile
Casting Access	Browse & View Briefs	Priority WhatsApp Alerts & Direct Apply	Post Briefs & Review Applicants
Badge	Standard Artist	Verified Gold Premium Badge	DCA Verified Casting Agency
8.2 Strict Premium Security Guard (src/components/premium-flow-modal.tsx)
ts

// UNAUTHENTICATED USER GUARD
const session = getUserSession();
const authenticated = session?.isLoggedIn === true && Boolean(session.identifier || session.email);
if (!authenticated) {
  onClose();
  router.push("/profile/setup"); // Redirects unauthenticated users to registration BEFORE payment!
  return;
}
if (session?.role === "brand") {
  setStep("brand_checkout"); // Brand receives ₹9,999 checkout
} else if (session?.role === "artist") {
  setStep("artist_checkout"); // Artist receives ₹3,999 checkout
}
9. Major CTA & Button Action Map
Button Text	Location / File	Current Action / Event	Auth Required	Future Backend Action
REGISTER NOW	Navbar (navbar.tsx)	Dispatches open-account-modal event	No	Open AccountTypeModal
REGISTER AS ARTIST	AccountTypeModal.tsx	Navigates to /profile/setup	No	Route to Artist Registration Form
REGISTER AS BRAND	AccountTypeModal.tsx	Navigates to /register/brand	No	Route to Brand Registration Form
BECOME PREMIUM / GO PREMIUM	Navbar, Pricing (pricing.tsx)	Dispatches open-premium-modal event	Yes (Redirects unauthenticated to /profile/setup)	Open Role-based Razorpay Checkout
Save & View Profile	/profile/setup	localStorage.setItem("dca_artist_profile")	No	POST /api/v1/artists/me
Create Casting Account	/register/brand	localStorage.setItem("dca_brand_profile") + Razorpay ₹9,999	No	POST /api/v1/brands/register
Apply Now	/casting-calls	Opens CastingApplyModal	Yes	POST /api/v1/casting-calls/:id/apply
Log In	/login	setDCAUserSession()	No	POST /api/v1/auth/login
Log Out	/dashboard	clearDCAUserSession()	Yes	POST /api/v1/auth/logout
10. Future Backend Architecture & Database Specification
10.1 Recommended Relational Database Schema (PostgreSQL)

                       ┌────────────────────────┐
                       │         users          │
                       ├────────────────────────┤
                       │ id (UUID, PK)          │
                       │ email (VARCHAR, UNIQUE)│
                       │ phone (VARCHAR, UNIQUE)│
                       │ password_hash (TEXT)   │
                       │ role (ENUM)            │
                       │ is_premium (BOOLEAN)   │
                       │ created_at (TIMESTAMP) │
                       └───────────┬────────────┘
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         │ 1:1                                               │ 1:1
┌────────▼───────────────┐                         ┌─────────▼──────────────┐
│    artist_profiles     │                         │     brand_profiles     │
├────────────────────────┤                         ├────────────────────────┤
│ id (UUID, PK)          │                         │ id (UUID, PK)          │
│ user_id (FK -> users)  │                         │ user_id (FK -> users)  │
│ full_name (VARCHAR)    │                         │ company_name (VARCHAR) │
│ display_name (VARCHAR) │                         │ designation (VARCHAR)  │
│ age (INT), gender (ENUM│                         │ category (VARCHAR)     │
│ city, state (VARCHAR)  │                         │ city, state (VARCHAR)  │
│ primary_category (ENUM)│                         │ website (VARCHAR)      │
│ height, weight (VARCHAR│                         │ description (TEXT)     │
│ status (ENUM: PENDING/ │                         │ created_at (TIMESTAMP) │
│         PUBLISHED)     │                         └───────────┬────────────┘
└──────────┬─────────────┘                                     │
           │                                                   │ 1:N
     ┌─────┴───────────┬────────────────────────┐              │
     │ 1:N             │ 1:N                    │              │
┌────▼───────────┐ ┌───▼──────────────┐ ┌───────▼───────────┐  │
│ artist_photos  │ │ artist_skills    │ │  applications     │  │
├────────────────┤ ├──────────────────┤ ├───────────────────┤  │
│ id (UUID)      │ │ id (UUID)        │ │ id (UUID)         │  │
│ artist_id (FK) │ │ artist_id (FK)   │ │ casting_call_id   │◄─┼────────┐
│ photo_angle    │ │ skill_name       │ │ artist_id (FK)    │  │        │
│ cdn_url (TEXT) │ └──────────────────┘ │ status (ENUM)     │  │        │
└────────────────┘                      └───────────────────┘  │        │
                                                               │        │
                                                    ┌──────────▼────────┴──┐
                                                    │    casting_calls     │
                                                    ├──────────────────────┤
                                                    │ id (UUID, PK)        │
                                                    │ brand_id (FK)        │
                                                    │ title (VARCHAR)      │
                                                    │ category (VARCHAR)   │
                                                    │ location, age_range  │
                                                    │ deadline (TIMESTAMP) │
                                                    └──────────────────────┘
10.2 Future API Requirement Specification
HTTP Method	Route Endpoint	Auth Required	User Role	Payload / Params	Function & Description
POST	/api/v1/auth/register	No	Visitor	{ email, phone, password, role }	Creates user record & returns HTTP-only JWT cookie
POST	/api/v1/auth/login	No	Visitor	{ identifier, password }	Authenticates credentials & sets session cookie
POST	/api/v1/auth/logout	Yes	Any	None	Invalidates session & clears auth cookie
POST	/api/v1/artists/me	Yes	Artist	{ fullName, city, skills, ... }	Creates/updates artist profile details
POST	/api/v1/artists/me/photos	Yes	Artist	FormData (file, photo_angle)	Uploads photo to S3 & saves CDN URL in database
GET	/api/v1/artists	No	Public	?category=actor&gender=female	Fetches published artist roster with pagination
GET	/api/v1/artists/:id	No	Public	:id (UUID / Slug)	Fetches complete public comp card & photo gallery
POST	/api/v1/brands/me	Yes	Brand	{ companyName, designation, ... }	Creates brand organization profile
POST	/api/v1/casting-calls	Yes	Premium Brand	{ title, category, location, ... }	Posts a new verified casting brief
GET	/api/v1/casting-calls	No	Public	?category=bollywood-films	Fetches active casting call briefs
POST	/api/v1/casting-calls/:id/apply	Yes	Artist	:id (Casting Call ID)	Submits artist application to casting recruiter
POST	/api/v1/payments/create-order	Yes	Authenticated	{ amount, plan_type }	Generates verified server-side Razorpay Order ID
POST	/api/v1/payments/verify-signature	Yes	Authenticated	{ razorpay_payment_id, order_id, signature }	Verifies Razorpay HMAC signature & upgrades user is_premium flag in DB
11. Payment Business Logic State Machine
11.1 Artist Payment State Machine

[ FREE ARTIST REGISTRATION ]
          │
          ▼
   (Creates Account at /profile/setup — ₹0 Paid)
          │
          ▼
   [ ACTIVE FREE ARTIST ] ─── (Stays Free indefinitely, full profile active)
          │
          ├──────────────┐
          │ Clicks       │ Voluntarily closes/dismisses payment modal
          ▼              ▼
   [ BECOME PREMIUM ] ─── [ REMAINS ACTIVE FREE ARTIST ]
   (₹3,999 Upgrade)
          │
          ▼ (User pays ₹3,999)
   [ SERVER SIGNATURE VERIFICATION ]
          │
          ├──────────────────────────┐
          ▼ Payment Verified         ▼ Signature Invalid / Payment Failed
   [ VERIFIED PREMIUM ARTIST ]    [ REMAINS ACTIVE FREE ARTIST ]
   (Gold Badge, WhatsApp Alerts,  (No money deducted / Refund triggered)
    Priority Listing)
11.2 Brand Payment State Machine

[ BRAND RECRUITER VISITOR ]
          │
          ▼
   (Fills Form at /register/brand)
          │
          ▼
   [ MANDATORY ₹9,999 CHECKOUT ]
          │
          ├──────────────────────────┐
          ▼ Payment Successful       ▼ Payment Dismissed / Failed
   [ ACTIVE VERIFIED BRAND ]       [ INACTIVE / UNAPPROVED BRAND ]
   (Access to Post Briefs &        (Cannot post casting briefs or access
    Review Applicants)              artist contact information)
12. Complete Implementation Roadmap (Frontend to Backend Integration)
Phase 1: Database & Server Authentication Setup:

Provision PostgreSQL database and Cloudflare R2 / AWS S3 image storage bucket.
Implement Node.js / Next.js Server Actions with bcrypt password hashing and HTTP-only JWT cookies.
Phase 2: Data Migration (LocalStorage -> API):

Wire /api/v1/artists/me to replace localStorage.setItem("dca_artist_profile").
Wire /api/v1/brands/me to replace localStorage.setItem("dca_brand_profile").
Replace static datasets (src/data/) with dynamic database queries (GET /api/v1/artists).
Phase 3: Secure Razorpay Integration:

Move Razorpay order generation and HMAC SHA256 signature verification to backend endpoint (/api/v1/payments/verify-signature).
Eliminate client-side demo simulation fallback in production environment.
Phase 4: S3 Image Upload & Comp Card Publishing:

Replace URL.createObjectURL() browser previews with multipart file upload to S3.
Enable automatic profile publishing upon admin/system approval.
Verification Confirmation
Project Structure: Fully audited.
Routes: All 153 static and SSG Next.js routes identified.
Existing UI & Code Integrity: 100% preserved. Zero code modifications executed during audit.
