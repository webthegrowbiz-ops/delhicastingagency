DCA / Way to Bollywood — Backend Master Architecture & Security Report

Note on scope: No project source files, route list, or "existing audit documentation" were actually attached to this conversation — only this specification prompt. Everything below is built from the business rules stated in the prompt. Anywhere the actual frontend codebase would normally override an assumption (exact route names, exact localStorage shapes, exact form field names), it is flagged DECISION REQUIRED. If you attach the real repo/audit doc, I can revise this against the actual code instead of the described behavior.

A. What I understood about DCA

Way to Bollywood is a two-sided casting marketplace:

Artists (actors, models, dancers, child artists, influencers, voice artists) create free profiles with biometric/physical data and four mandatory photos, then are reviewed and published so brands can discover them. They may optionally pay a one-time ₹3,999 fee for lifetime "Premium" status (priority alerts, badge, priority listing).
Brands (production houses, casting directors, agencies, OTT teams) must pay a mandatory one-time ₹9,999 activation fee before their account is usable — this is not an upsell, it's a gate. Only paid, verified brands can post casting calls.
Admin moderates artists (approve/publish/suspend), verifies brands, oversees payments, and manages casting calls/applications.

The two payment flows are architecturally different even though both go through Razorpay:

Artist premium is an optional upgrade on top of an already-usable account. Failure must never touch the free account.
Brand payment is a precondition for account usability. Failure must never grant brand capabilities, but the user record (login credentials) can still exist in an INACTIVE state so they can retry payment without re-registering.

The single most important rule threading through the whole system: the browser is a UI, never a source of truth. Every entitlement (is_premium, brand_verified, amount_paid) must be derived server-side from a verified payment record, never accepted as a claim from the client.

B. Current frontend architecture (as described)
Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4
├── ~153 routes: homepage, category listings, artist profiles, casting calls,
│                registration (artist/brand), login, dashboard, membership,
│                contact, blog, legal
├── React Hook Form + Zod        → client-side form validation
├── Razorpay client checkout     → opens payment modal directly from browser
├── localStorage                 → dca_user, dca_artist_profile,
│                                   dca_brand_profile, artist-registration-complete
└── Static JSON / mock datasets  → artist directory, casting calls

This is a fully client-rendered prototype: there is no server-side source of truth, no real authentication, and (implicitly, since nothing else is mentioned) payment success is likely being trusted directly from the Razorpay client SDK callback — which is the core vulnerability this whole redesign exists to close.

DECISION REQUIRED: I don't have the actual component tree or API-calling conventions (fetch vs. server actions) used today, so the migration plan below (Section O) proposes an additive, route-preserving approach rather than assuming specific component internals.

C. Backend architecture recommendation

Modular monolith, not microservices — team size and current scale don't justify distributed-systems overhead yet.

                        ┌─────────────────────────┐
                        │   Next.js Frontend       │
                        │  (existing 153 routes)   │
                        └───────────┬─────────────┘
                                    │ HTTPS (cookies, JSON)
                        ┌───────────▼─────────────┐
                        │  API Layer (Route         │
                        │  Handlers / thin server)  │
                        │  - authn/authz middleware │
                        │  - zod validation          │
                        │  - rate limiting           │
                        └───────────┬─────────────┘
             ┌──────────────────────┼───────────────────────┐
             ▼                      ▼                        ▼
    ┌────────────────┐   ┌────────────────────┐   ┌────────────────────┐
    │  Domain modules  │   │  Payments module    │   │  Admin module       │
    │  (artists, brands,│   │  (Razorpay orders,  │   │  (moderation,       │
    │   casting-calls,  │   │   verification,      │   │   audit, RBAC)      │
    │   applications)   │   │   webhooks)          │   │                     │
    └────────┬─────────┘   └──────────┬──────────┘   └──────────┬──────────┘
             │                        │                          │
             └───────────┬────────────┴────────────┬─────────────┘
                          ▼                         ▼
                 ┌─────────────────┐      ┌──────────────────┐
                 │   PostgreSQL     │      │  S3 / R2 (photos) │
                 │  (source of truth)│      │  + CDN            │
                 └─────────────────┘      └──────────────────┘
                          │
                 ┌────────▼────────┐
                 │  Redis (sessions, │
                 │  rate limit, jobs)│
                 └───────────────────┘
                          │
                 ┌────────▼────────┐
                 │  Razorpay API /   │
                 │  Webhooks         │
                 └───────────────────┘
                          │
                 ┌────────▼────────┐
                 │ Email/WhatsApp    │
                 │ notification queue│
                 └───────────────────┘

Everything above the PostgreSQL line is stateless and horizontally scalable; PostgreSQL and Redis are the only stateful pieces to operate carefully.

D. Recommended technology stack

Final recommendation: Option A — Next.js Route Handlers, kept in the same repo, backed by PostgreSQL + Prisma.

Layer	Choice	Why
API surface	Next.js Route Handlers (app/api/**/route.ts)	Zero extra deployment, reuses existing hosting/CI, avoids CORS complexity of a separate service. A 150-route consumer app with one small team does not need a separate backend service yet.
ORM	Prisma	Strong TypeScript types matching the existing TS frontend, migration tooling, good Postgres support. Drizzle is a fine alternative if the team prefers SQL-like query building, but Prisma's migration story is more turnkey for a first production backend.
Database	PostgreSQL (managed — RDS/Supabase/Neon)	Relational integrity for payments, unique constraints for idempotency, strong ecosystem.
Cache/session/queue	Redis	Session store, login rate-limiting counters, and a lightweight job queue (BullMQ) for email/WhatsApp/webhook retries.
Object storage	Cloudflare R2	S3-compatible API, no egress fees (important for a photo-heavy directory site), pairs with Cloudflare CDN. AWS S3 + CloudFront is an equally valid fallback if the team is already on AWS.
Auth	Custom session-based auth with httpOnly, Secure, SameSite=Lax cookies, passwords hashed with Argon2id (bcrypt acceptable fallback)	Avoids the common JWT-in-localStorage mistake; sessions are revocable server-side, which JWTs are not without an extra denylist layer.
Payments	Razorpay Orders API + Webhooks	Already chosen by the product; the redesign is about where verification happens, not swapping providers.
Validation	Zod, shared between client and server where useful	Already in use on the frontend; reusing schemas server-side keeps rules consistent.
Background jobs	BullMQ on Redis	Webhook retries, email/WhatsApp sending, image post-processing.
Monitoring	Sentry (errors) + structured logs (Pino) shipped to a log sink (e.g. Axiom/Better Stack)	Lightweight, fast to set up, doesn't require standing up an observability stack.

Why not Option B (separate Node backend): it adds a second deployable, a second auth boundary, CORS handling, and doubled DevOps overhead for no benefit at this scale. Revisit only if the API needs to be consumed by something other than this Next.js app (e.g. a future native mobile app) or the team grows enough to want an independent release cadence for backend vs. frontend.

E. Database schema

All monetary values stored in paise (integer) to avoid floating-point errors. All tables have created_at/updated_at (timestamptz) unless noted.

users
Field	Type	Notes
id	uuid PK	
email	citext UNIQUE	
phone	text UNIQUE NULLABLE	
password_hash	text	Argon2id
role	enum(ARTIST,BRAND,ADMIN)	one role per account
status	enum(ACTIVE,INACTIVE,SUSPENDED,DELETED)	brand starts INACTIVE until paid
email_verified_at	timestamptz NULL	
phone_verified_at	timestamptz NULL	
failed_login_count	int default 0	for lockout
locked_until	timestamptz NULL	
artist_profiles
Field	Type	Notes
id	uuid PK	
user_id	uuid FK → users.id UNIQUE	1:1
full_name, display_name	text	
dob	date	age computed at query time, not stored
gender	enum	
city, state	text	indexed for filtering
languages	text[]	
primary_category	enum(ACTOR,MODEL,DANCER,CHILD_ARTIST,INFLUENCER,VOICE_ARTIST)	indexed
experience_level	enum	
bio, previous_work	text	
height_cm, weight_kg, chest_in, waist_in, hips_in, shoe_size	numeric NULL	
hair_color, eye_color, skin_tone	text NULL	
profile_status	enum(DRAFT,PENDING_REVIEW,APPROVED,PUBLISHED,REJECTED,SUSPENDED)	see §17
rejection_reason	text NULL	
Index: (primary_category, city, state, profile_status) for public directory filtering.
artist_photos
Field	Type	Notes
id	uuid PK	
artist_id	uuid FK → artist_profiles.id	
angle	enum(FRONT,LEFT,RIGHT,BACK)	
storage_key	text	server-generated, never user-supplied
cdn_url	text	
mime_type	text	
file_size_bytes	int	≤ 5MB enforced server-side
status	enum(PENDING,ACTIVE,REJECTED)	
Unique partial index: UNIQUE(artist_id, angle) WHERE status = 'ACTIVE' — one active photo per angle; older ones are superseded, not deleted (supports moderation history).
artist_skills (optional normalized table)

id, artist_id FK, skill text — only needed if skills need independent search/autocomplete; otherwise keep as text[] on artist_profiles.

brand_profiles
Field	Type	Notes
id	uuid PK	
user_id	uuid FK → users.id UNIQUE	
contact_person_name, designation	text	
company_name	text	
organization_category	enum	
city, state, website, description	text	
verification_status	enum(PENDING_PAYMENT,ACTIVE,SUSPENDED)	derived-and-cached from memberships, see §33
membership_plans
Field	Type	Notes
id	text PK	e.g. ARTIST_PREMIUM, BRAND_ACCOUNT
name	text	
price_paise	int	source of truth for pricing, never the client
duration	enum(LIFETIME,DAYS_N) + duration_days NULL	supports future non-lifetime plans
applies_to_role	enum(ARTIST,BRAND)	
active	boolean	allows retiring a plan without deleting history
memberships
Field	Type	Notes
id	uuid PK	
user_id	uuid FK	
plan_id	text FK → membership_plans.id	
status	enum(ACTIVE,EXPIRED,REVOKED)	
activated_at	timestamptz	
expires_at	timestamptz NULL	null = lifetime
source_payment_id	uuid FK → payments.id	every membership must trace to a verified payment
Unique partial index: UNIQUE(user_id, plan_id) WHERE status='ACTIVE' → idempotency guard against double-activation.
payment_orders
Field	Type	Notes
id	uuid PK	internal order id
user_id	uuid FK	
plan_id	text FK → membership_plans.id	
provider	text default razorpay	
provider_order_id	text UNIQUE	Razorpay order_id
amount_paise	int	copied from plan at creation time, never from client
currency	text default INR	
status	enum(CREATED,ATTEMPTED,PAID,FAILED,CANCELLED,EXPIRED)	
payments
Field	Type	Notes
id	uuid PK	
payment_order_id	uuid FK → payment_orders.id	
user_id	uuid FK	denormalized for query convenience
provider_payment_id	text UNIQUE	Razorpay payment_id — natural idempotency key
provider_signature	text	stored for audit, never trusted after the fact without re-verify
amount_paise	int	
status	enum(CAPTURED,FAILED,REFUNDED,PARTIALLY_REFUNDED)	
failure_reason	text NULL	
metadata	jsonb	raw webhook/verify payload for forensic replay
paid_at	timestamptz NULL	

Why both payment_orders and payments: an order can be created and abandoned (browser closed, never paid) many times; a payment only exists once money actually moves. Separating them keeps the payments table clean for financial reconciliation while payment_orders captures full funnel/drop-off data (useful for conversion analytics and support: "I paid but nothing happened" cases are diagnosed by joining the two).

casting_calls

id, brand_id FK, title, category, description, location, age_min, age_max, gender_requirement, skills text[], compensation, deadline, status enum(DRAFT,PENDING_REVIEW,ACTIVE,CLOSED,REJECTED) — indexed on (status, category, deadline).

applications

id, casting_call_id FK, artist_id FK, status enum(APPLIED,SHORTLISTED,REJECTED,SELECTED,WITHDRAWN), applied_at

UNIQUE(casting_call_id, artist_id) — prevents duplicate applications.
State transitions: artist can set APPLIED → WITHDRAWN only; brand can set APPLIED → SHORTLISTED/REJECTED/SELECTED only for calls they own; admin can override any transition.
contact_messages

id, name, email, phone, message, ip_address, status enum(NEW,HANDLED,SPAM), created_at

audit_logs

id, actor_user_id FK NULL (null = system), actor_role, action text, target_type text, target_id uuid, before_state jsonb, after_state jsonb, reason text, ip_address, created_at — append-only, never updated/deleted. No secrets ever stored here.

sessions

id, user_id FK, session_token_hash, user_agent, ip_address, created_at, expires_at, revoked_at NULL — enables per-device logout and "logout everywhere."

webhook_events (recommended addition not in the original list)

id, provider, provider_event_id UNIQUE, event_type, payload jsonb, processed_at NULL, created_at — records every inbound webhook before processing, so replay protection and debugging don't depend on payments table state alone.

F. Authentication architecture
Registration: password hashed with Argon2id (memory-hard, GPU-resistant — preferred over bcrypt for new systems); email verification link sent via queued email job; account usable (for artists) before verification but flagged, or DECISION REQUIRED: whether email verification is mandatory before profile submission.
Login: server checks credentials, issues a random 256-bit session token, stores only its hash in sessions, sets it as an httpOnly, Secure, SameSite=Lax cookie. Nothing about identity or role is stored client-side in a way JS can read or forge.
CSRF: since auth is cookie-based, all state-changing routes require either (a) a custom header (X-Requested-With) that simple cross-site forms can't set, or (b) a double-submit CSRF token issued on session creation. SameSite=Lax already blocks most cross-site POST abuse; treat the token as defense-in-depth.
Rate limiting & lockout: Redis-backed counter per (ip, email); exponential backoff after 5 failed attempts, hard lock after 10 with email-based unlock.
Password reset: single-use, time-limited (15 min) token, invalidated after use or after a new one is issued.
Session expiration/refresh: sliding expiration (e.g., 14 days from last activity), refreshed on use; "logout" revokes the current session row; "logout everywhere" revokes all sessions for the user.
Authorization: every route handler resolves the user from the session server-side — role and user_id are never read from the request body. Ownership checks (resource.user_id === session.user_id) are mandatory on every me-scoped or resource-mutating endpoint.
G. Role & permission matrix
Action	Visitor	Artist	Premium Artist	Brand (active)	Admin
Browse published artists/casting calls	✅	✅	✅	✅	✅
Register free artist account	✅	–	–	–	–
Edit own artist profile/photos	❌	✅	✅	❌	✅
Purchase artist premium	❌	✅	(already active)	❌	–
Get priority WhatsApp alerts / badge	❌	❌	✅	❌	–
Register brand account	✅	–	–	–	–
Pay ₹9,999 brand activation	❌	❌	❌	✅ (before this, PENDING_PAYMENT)	–
Create/edit casting calls	❌	❌	❌	✅ (only if ACTIVE)	✅
Apply to casting calls	❌	✅	✅	❌	❌
View own applications	❌	✅	✅	❌	✅
View applicants to own casting call	❌	❌	❌	✅ (own only)	✅
Approve/publish/suspend artist profiles	❌	❌	❌	❌	✅
Verify/suspend brand accounts	❌	❌	❌	❌	✅
View payment records	own only via receipts	own only	own only	own only	✅ all
Manually grant premium/activation	❌	❌	❌	❌	✅ (audited, see §10)
H. Artist lifecycle
Visitor
  → Registers (email/phone + password) → users.status=ACTIVE, role=ARTIST
  → Fills profile form                  → artist_profiles.status=DRAFT
  → Uploads 4 photos (front/left/right/back) → artist_photos rows, status=PENDING
  → Submits for review                  → artist_profiles.status=PENDING_REVIEW
  → Admin reviews photos + data
        → approve  → status=APPROVED → auto or admin-triggered PUBLISHED
        → reject   → status=REJECTED (artist can edit and resubmit)
  → PUBLISHED → visible on /actors, /models, etc.
  → (any time after account creation, independent of publish state)
     Optionally purchases ₹3,999 → PREMIUM membership row created on verified payment

Premium and publication are independent axes — an artist can be free+published, premium+not-yet-published (payment doesn't skip moderation), etc. DECISION REQUIRED: whether PUBLISHED requires admin approval always, or auto-publishes after a delay if not reviewed (recommend: always require approval given photo-moderation/safety needs for a platform that includes child artists).

I. Brand lifecycle
Visitor
  → Registers → users.status=INACTIVE, role=BRAND, brand_profiles.verification_status=PENDING_PAYMENT
  → Redirected to payment: POST /payments/create-order {planType: BRAND_ACCOUNT}
  → Backend creates Razorpay order for ₹9,999 (server-priced)
  → Razorpay Checkout in browser
      → success → frontend calls /payments/verify with razorpay_order_id/payment_id/signature
      → backend verifies signature + amount + order ownership
      → payments row CAPTURED, memberships row created, users.status=ACTIVE,
        brand_profiles.verification_status=ACTIVE
      → cancel/close/fail → users.status remains INACTIVE, brand_profiles stays PENDING_PAYMENT,
        user can log back in and retry payment (order recreated)
  → Active brand can create casting calls, view applicants
J. Payment architecture

Order creation: Backend only. Frontend sends { planType: "ARTIST_PREMIUM" | "BRAND_ACCOUNT" }. Backend looks up membership_plans.price_paise, creates a payment_orders row (status=CREATED) and a Razorpay order via server-side API key, returns order_id + amount to the frontend to open Checkout. The frontend never sends or chooses an amount.

Verification — who does it: Backend, on the /payments/verify callback from the frontend AND independently via the /payments/webhook endpoint. Verification = recompute HMAC-SHA256 of order_id|payment_id using RAZORPAY_KEY_SECRET and compare to the provided signature. Only a match, checked against the order's expected amount_paise and user_id ownership, is trusted.

Who activates entitlements: Only the backend, only inside a DB transaction, only after signature verification succeeds, and only if no ACTIVE membership for that (user_id, plan_id) already exists (idempotency).

Payment fails / user closes checkout: payment_orders.status = FAILED/CANCELLED. No membership created. Artist stays free-active; brand stays INACTIVE/PENDING_PAYMENT. Nothing is deleted.

Webhook vs. frontend callback race: Whichever arrives first performs activation inside a transaction using INSERT ... ON CONFLICT DO NOTHING on provider_payment_id (unique) and the partial-unique index on active memberships; the second arrival finds the row already exists and short-circuits — no duplicate membership, no duplicate email/WhatsApp send (guard the notification job the same way, keyed by payment_id).

Webhook arrives twice: webhook_events.provider_event_id is unique; a duplicate event is recorded as a no-op duplicate and never reprocessed (log and 200 OK back to Razorpay so it stops retrying).

Refunds: Razorpay sends a refund.processed webhook. Backend sets payments.status = REFUNDED, and — this is a business decision, not a technical default — DECISION REQUIRED: does a refund automatically revoke PREMIUM/ACTIVE brand status, or is that always a manual admin decision? Recommend: refund does not auto-revoke; it flags the membership NEEDS_REVIEW and creates an audit log + admin notification, because revocation is a business/goodwill decision (e.g. was it a duplicate charge vs. a chargeback for abuse) not a purely technical one.

Duplicate payment prevention: provider_payment_id UNIQUE on payments; partial unique index (user_id, plan_id) WHERE status='ACTIVE' on memberships; the verify/webhook handlers run inside a single serializable-ish transaction (SELECT ... FOR UPDATE on the payment_orders row) so two near-simultaneous requests can't both pass the "does membership exist yet?" check.

Admin manual grant: exists for support cases (e.g., payment succeeded at Razorpay but webhook+callback both failed to reach the app — rare but real). Always requires: admin auth, a mandatory reason field, writes an audit_logs row, and still creates a synthetic payments record marked metadata.manual=true referencing the admin — never a bare is_premium=true flip with no trail.

K. Security architecture (Threat → Attack → Protection)
Risk	Attack example	Protection
SQL injection	Raw string concatenation in a search filter	Prisma parameterized queries everywhere; no raw SQL with string interpolation
XSS	Bio/description field renders user HTML unescaped	React escapes by default; sanitize any field ever rendered via dangerouslySetInnerHTML; CSP header
CSRF	Hidden form on attacker site submits to /api/v1/artists/me using victim's cookie	SameSite=Lax cookies + custom header/CSRF token on mutating routes
SSRF	Website field used to trigger a server-side fetch (e.g. link preview)	Never fetch arbitrary user-supplied URLs server-side; if ever needed, allow-list schemes/hosts and block internal IP ranges
IDOR/BOLA	Artist changes /api/v1/artists/me/photos/{id} id to another artist's photo id	Every mutation checks resource.owner_id === session.user_id before acting, never trusts the URL id alone
Brute-force login	Scripted password guessing	Redis rate limit per IP+email, exponential lockout, CAPTCHA after N failures
Credential stuffing	Leaked-password lists tried across accounts	Rate limiting + optional breached-password check (e.g. HaveIBeenPwned k-anonymity API) at signup
Session hijacking	Stolen cookie reused from another device	Secure+httpOnly cookies (JS can't read them), session binds to hashed token only, "logout everywhere" available
File upload attack	Uploading a .php/.svg-with-script disguised as .jpg	Validate real MIME via file signature (not extension), re-encode images server-side, store under server-generated keys in a non-executable bucket, serve via CDN not app server
Payment manipulation	Client sends amount: 1 instead of 399900 paise	Amount always derived from membership_plans server-side; client never sends amount
Replay attack	Reusing a captured valid webhook payload later	provider_event_id/provider_payment_id uniqueness + signature includes payment id already bound to a specific captured payment
Webhook forgery	POST to /payments/webhook claiming success without Razorpay	Verify X-Razorpay-Signature HMAC using RAZORPAY_WEBHOOK_SECRET before trusting any payload
Race condition / duplicate payment	Two simultaneous verify calls both pass a naive "not yet active" check	Row-level lock (FOR UPDATE) on the order during activation + unique constraints as a second line of defense
Privilege escalation	Artist edits their own role field in a profile PATCH request	Mass-assignment prevention: PATCH schemas explicitly whitelist editable fields; role/status/verification_status are never client-writable
Mass assignment	Brand PATCH includes verification_status: "ACTIVE"	Same as above — Zod schemas per-role define allowed fields, extras are stripped/rejected, not silently accepted

Additional coverage: rate limiting on /contact and /auth/*, payload size limits on JSON bodies and uploads, consistent non-leaky error responses (Section 27 style), and admin sessions requiring re-auth/MFA for sensitive actions.

L. API documentation (representative — extend per module)

Format: METHOD /route — auth — role — request → response — business rules

POST /api/v1/auth/register — none — public — {email,password,phone,role} → {userId} — password hashed server-side; role fixed at signup and never changeable by the user afterward.
POST /api/v1/auth/login — none — public — {email,password} → sets session cookie, {user:{id,role,status}} — rate-limited.
POST /api/v1/auth/logout — session — self — → 204 — revokes current session row.
GET /api/v1/me — session — self — → profile summary derived server-side from users+role profile+active memberships.
GET /api/v1/artists — none — public — query: category/gender/city/state/experience/page/sort — only rows where profile_status='PUBLISHED' are returned; never exposes phone/email/password_hash.
GET /api/v1/artists/:id — none — public — same visibility rule.
POST /api/v1/artists/me — session — ARTIST — creates/updates own artist_profiles row; whitelisted fields only; sets status=DRAFT or PENDING_REVIEW depending on submit action.
PATCH /api/v1/artists/me — session — ARTIST(owner) — partial update; resets to PENDING_REVIEW if previously PUBLISHED/REJECTED and material fields changed — DECISION REQUIRED: which fields count as "material" enough to force re-review.
POST /api/v1/artists/me/photos — session — ARTIST(owner) — returns a signed upload URL for R2/S3 after validating angle/size/mime; confirms metadata row after upload completes.
DELETE /api/v1/artists/me/photos/:id — session — ARTIST(owner) — ownership check on artist_id.
GET /api/v1/brands/:id — none — public — limited public fields only (company name, category, city) unless the request is from the brand owner or admin.
POST /api/v1/brands/me / PATCH /api/v1/brands/me — session — BRAND(owner) — as above; verification_status never accepted from client.
GET /api/v1/casting-calls / :id — none — public — only status='ACTIVE' shown publicly.
POST /api/v1/casting-calls — session — BRAND, and server checks brand_profiles.verification_status==='ACTIVE' — else 403 BRAND_NOT_VERIFIED.
PATCH /api/v1/casting-calls/:id — session — BRAND(owner) or ADMIN.
POST /api/v1/casting-calls/:id/apply — session — ARTIST — enforces unique (casting_call_id, artist_id), casting call must be ACTIVE and before deadline.
GET /api/v1/applications/me — session — ARTIST — own rows only.
GET /api/v1/membership/plans — none — public — returns plan names/prices for display (read-only, price is informational; actual charge still computed server-side at order creation).
POST /api/v1/payments/create-order — session — self — {planType} → {razorpayOrderId, amountPaise, keyId} — plan/price resolved server-side, ownership tied to session user.
POST /api/v1/payments/verify — session — self — {razorpay_order_id, razorpay_payment_id, razorpay_signature} → {success, membershipStatus} — signature+amount+ownership verified, idempotent activation.
POST /api/v1/payments/webhook — Razorpay signature (no session) — n/a — raw payload → 200 — verifies X-Razorpay-Signature, records to webhook_events, idempotently applies activation/refund logic.
POST /api/v1/contact — none — public — rate-limited + CAPTCHA/Turnstile, persisted + queued email notification.

Admin module (all require role=ADMIN + audit logging on write actions): GET/PATCH /api/v1/admin/artists/:id, GET/PATCH /api/v1/admin/brands/:id, GET /api/v1/admin/payments, POST /api/v1/admin/payments/:id/manual-grant, GET /api/v1/admin/audit-logs, PATCH /api/v1/admin/casting-calls/:id.

M. Database ERD (relationship summary)
users 1─1 artist_profiles 1─* artist_photos
users 1─1 brand_profiles
users 1─* memberships *─1 membership_plans
memberships *─1 payments (source_payment_id)
payments *─1 payment_orders
brand_profiles (via user) 1─* casting_calls
casting_calls 1─* applications *─1 artist_profiles (via user)
users 1─* sessions
users 1─* audit_logs (as actor, nullable)
(standalone) contact_messages
(standalone) webhook_events
N. File/folder architecture
/app
  /api/v1
    /auth/{register,login,logout}/route.ts
    /me/route.ts
    /artists/route.ts
    /artists/[id]/route.ts
    /artists/me/route.ts
    /artists/me/photos/route.ts
    /artists/me/photos/[id]/route.ts
    /brands/[id]/route.ts
    /brands/me/route.ts
    /casting-calls/route.ts
    /casting-calls/[id]/route.ts
    /casting-calls/[id]/apply/route.ts
    /applications/me/route.ts
    /membership/plans/route.ts
    /payments/{create-order,verify,webhook}/route.ts
    /contact/route.ts
    /admin/**
/lib
  /auth        (session creation/validation, password hashing)
  /db          (Prisma client singleton)
  /payments    (razorpay client wrapper, plan pricing, verify/activate logic)
  /storage     (signed URL generation, key naming)
  /validation  (Zod schemas, one per resource, per-role variants)
  /rbac        (role/ownership guard helpers)
  /audit       (log helper)
/prisma
  schema.prisma
  /migrations
/jobs           (BullMQ workers: email, whatsapp, webhook-retry)
O. Frontend migration plan

Goal: replace localStorage reads/writes with API calls without changing route structure or UI.

Introduce a thin data-access layer (e.g. lib/client/api.ts) with the same function signatures the components already call for reading dca_user/dca_artist_profile/dca_brand_profile — internally switch these from localStorage.getItem to fetch('/api/v1/me') etc. Components don't need to change if the interface shape is preserved.
Ship auth endpoints + cookie sessions first; keep writing a mirrored, non-authoritative copy to localStorage temporarily for any UI code that isn't yet migrated, clearly marked as read-only cache, not truth.
Migrate registration forms to POST to the new endpoints instead of localStorage.setItem; artist-registration-complete becomes a derived value (artist_profiles.status !== null) rather than a stored flag.
Migrate the artist/casting-call listing pages from static JSON imports to GET /api/v1/artists / /casting-calls with the same filter param names already used in the UI.
Migrate payment flow last (highest risk): keep Razorpay Checkout client-side (that's fine — Razorpay's SDK is designed to run in-browser), but change what happens around it — order creation and verification move to the new endpoints described in Section J.
Once every read path is confirmed hitting the API, delete the localStorage fallback and static mock datasets.

DECISION REQUIRED: exact rollout order per route group should be adjusted once the real component code is available — this order minimizes risk (auth → read-only data → forms → payments) but the real dependency graph might justify reordering.

P. Admin architecture
Separate login surface (/admin/login) using the same users table but role=ADMIN, with mandatory MFA (TOTP) before session issuance.
Every state-changing admin action (approve/reject/suspend/publish/manual payment grant/refund handling) requires a reason field and writes to audit_logs with before/after state.
Read views: payments (filterable by status), artists pending review (with photo viewer), brands pending/active, casting calls pending moderation, audit log search.
Admin sessions expire faster than regular user sessions (e.g. 2 hours idle) and are IP-logged for anomaly review.
Q. Failure and edge-case handling
Scenario	Resulting state
Artist closes checkout	payment_orders.status=CANCELLED; artist stays free-active
Payment fails at Razorpay	payments.status=FAILED; no membership created
Payment succeeds, frontend crashes before calling /verify	Webhook independently activates the membership — frontend callback is not the only path
/verify call itself fails (network) after real success	Webhook still arrives and activates; user can also click "check payment status" which re-queries Razorpay by order_id
/verify called twice for same payment	Second call finds existing ACTIVE membership, returns success idempotently, no duplicate row
Webhook before frontend callback	Webhook activates first; frontend verify call becomes a no-op confirmation
Webhook arrives twice	webhook_events.provider_event_id unique constraint rejects the duplicate insert; handler exits early
Refund processed later	payments.status=REFUNDED; membership flagged NEEDS_REVIEW, not auto-revoked (see §J)
User logs in from another device	New session row created; existing sessions remain valid unless user explicitly logs out everywhere
Upload fails mid-transfer	Photo row stays PENDING; retried upload overwrites the pending slot, never silently leaves two active photos for one angle
Database unavailable during payment verification	Return 503 to Razorpay so it retries the webhook per its own retry schedule; never acknowledge success without a committed transaction
R. Deployment architecture
Frontend + API (Next.js)  → Vercel or a Node host (single deploy, since Option A merges them)
PostgreSQL                → managed (Neon/Supabase/RDS) with automated backups + PITR
Redis                     → managed (Upstash/Redis Cloud)
R2/S3                     → Cloudflare R2 + CDN in front of it
Razorpay                  → hosted, webhook URL points to /api/v1/payments/webhook
Email/WhatsApp            → transactional email API (e.g. Resend/SES) + WhatsApp Business API,
                             both invoked via the background job queue, not inline in request handlers
Monitoring                → Sentry (errors) + Pino structured logs → log sink + uptime checks
S. Security checklist (production readiness)
 All passwords hashed with Argon2id, never logged
 Cookies: httpOnly, Secure, SameSite=Lax
 CSRF protection on all mutating routes
 Rate limiting on auth, contact, and payment endpoints
 Razorpay webhook signature verified before any DB write
 RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET, JWT_SECRET/session secret, DB credentials, S3/R2 keys — all server-only env vars, never NEXT_PUBLIC_*
 Pricing sourced from membership_plans, never accepted from client
 Unique constraints on provider_payment_id, active-membership-per-plan, casting-call-application pair
 File uploads validated by content signature, size-capped, stored under server-generated keys
 Public artist/brand APIs never return password hashes, payment secrets, or internal notes
 All admin mutations write an audit log entry with a reason
 Error responses never leak stack traces or DB errors
 Backups tested with an actual restore drill, not just "backups run"
T. Implementation roadmap
Phase	Scope	Key risks
1. Database	Prisma schema, migrations for all tables in §E	Getting the membership/payment split right early avoids painful re-migration later
2. Authentication	Register/login/logout, sessions, password reset, rate limiting	Cookie/CSRF misconfiguration is the most common launch-day bug
3. Artist backend	Profile CRUD, ownership checks, status lifecycle	Enforcing "own profile only" correctly (IDOR)
4. Brand backend	Profile CRUD, PENDING_PAYMENT gating	Must not accidentally let unpaid brands post casting calls
5. Storage	Signed upload URLs, photo metadata, angle constraints	MIME/size validation must happen server-side, not just client
6. Payments	Order creation, verify, webhook, idempotency, refund handling	Highest-risk phase — test race conditions and duplicate webhook delivery explicitly
7. Casting calls	CRUD, verified-brand gate	
8. Applications	Apply flow, uniqueness constraint, status transitions	
9. Admin	Moderation UI + audit logging + MFA	Admin auth must be hardened before any manual-grant tooling ships
10. Frontend migration	Swap localStorage/static data for API calls per §O	Do incrementally, keep both paths working until fully cut over
11. Security testing	Pen-test focus: payment tampering, IDOR, webhook forgery, upload bypass	
12. Production deployment	Cutover, monitoring, backup verification	
Summary of open decisions requiring your approval
Whether email/phone verification blocks profile submission or just publication.
Whether editing a published artist profile forces re-review for all fields or only a defined "material" subset.
Whether a Razorpay refund should ever auto-revoke premium/brand-active status, or always route to manual admin review (recommended: manual review).
Exact route-by-route migration order in Section O, once the real frontend code is available.

I have not modified any files — this is the architecture proposal for review before implementation begins.