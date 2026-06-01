# NestGlow Next.js — Repo Map

Bird's-eye view of the repo. For any deeper context, follow the links into the actual files.

---

## What this is

NestGlow Co marketing + booking site. Next.js 15/16, React 19, Tailwind 4, shadcn/ui. Booking submits to Formspree (`xnngyenw`). Hosted on Vercel (deploy pending DNS switch).

## Live URL

`nestglowco.com` — **pre-launch.** DNS still points to old Hostinger site. New site is deployed to Vercel but not yet live at the domain. See `MIGRATION-NOTES.md`.

---

## Top-level files

| File | Purpose |
|------|---------|
| `AGENTS.md` | **Read first.** Next.js version warning — APIs may differ from training data. |
| `CLAUDE.md` | Re-exports `AGENTS.md` for Claude tooling. |
| `TASKS.md` | Current open items only — P2 code tasks + human actions pending. |
| `MIGRATION-NOTES.md` | Hostinger → Vercel migration checklist. Not yet executed. |
| `README.md` | Next.js boilerplate. Low value. |
| `MAP.md` | This file. |
| `package.json` | Deps: Next.js, React 19, Tailwind 4, Framer Motion, Lucide. |
| `next.config.ts` | Default Next.js config (no overrides). |
| `tsconfig.json` | Strict mode TypeScript. |
| `components.json` | shadcn/ui config. |
| `postcss.config.mjs` | PostCSS for Tailwind 4. |

---

## Application code

### `src/app/` — Routes

**Conversion surfaces** (primary funnel entry points):

| Route | File | Notes |
|-------|------|-------|
| `/` | `app/page.tsx` | Homepage. ZipRouter in hero + full marketing content. |
| `/book-now` | `app/book-now/page.tsx` | Ad landing page. `noindex`. ZipRouter hero → county pages → `/book`. |
| `/book` | `app/book/page.tsx` | Full multi-step booking wizard. Submits to Formspree. |
| `/cleaning-services/[county]` | `app/cleaning-services/[county]/page.tsx` | Dynamic. `[county]` = `monmouth-county` / `ocean-county` / `middlesex-county`. Receives `?zip=` and `?town=` params from ZipRouter. Has QuickQuoteForm. |

**Static county hubs** (also serve SEO):

| Route | File |
|-------|------|
| `/cleaning-services/monmouth-county` | `app/cleaning-services/monmouth-county/page.tsx` |
| `/cleaning-services/ocean-county` | `app/cleaning-services/ocean-county/page.tsx` |
| `/cleaning-services/middlesex-county` | `app/cleaning-services/middlesex-county/page.tsx` |

**Service pages** (SEO content):

| Route | File |
|-------|------|
| `/services` | `app/services/page.tsx` |
| `/services/residential-cleaning` | `app/services/residential-cleaning/page.tsx` |
| `/services/deep-cleaning` | `app/services/deep-cleaning/page.tsx` |
| `/services/move-in-cleaning` | `app/services/move-in-cleaning/page.tsx` |
| `/services/move-out-cleaning` | `app/services/move-out-cleaning/page.tsx` |
| `/services/move-in-move-out` | `app/services/move-in-move-out/page.tsx` |
| `/services/airbnb-cleaning` | `app/services/airbnb-cleaning/page.tsx` |
| `/services/commercial-cleaning` | `app/services/commercial-cleaning/page.tsx` |
| `/services/post-construction-cleaning` | `app/services/post-construction-cleaning/page.tsx` |
| `/cleaning-services` | `app/cleaning-services/page.tsx` |
| `/general-vs-deep-cleaning` | `app/general-vs-deep-cleaning/page.tsx` |

**Content / guides** (SEO content):

| Route | File |
|-------|------|
| `/guides` | `app/guides/page.tsx` |
| `/guides/how-much-does-house-cleaning-cost-nj` | `app/guides/how-much-.../page.tsx` |
| `/guides/how-to-prepare-home-for-cleaner` | `app/guides/how-to-.../page.tsx` |
| `/guides/what-to-expect-move-out-cleaning` | `app/guides/what-to-.../page.tsx` |
| `/faq` | `app/faq/page.tsx` |

**Supporting pages:**

| Route | File |
|-------|------|
| `/about` | `app/about/page.tsx` |
| `/contact` | `app/contact/page.tsx` |
| `/reviews` | `app/reviews/page.tsx` |
| `/privacy-policy` | `app/privacy-policy/page.tsx` |
| `/terms-of-service` | `app/terms-of-service/page.tsx` |

**Utility / system:**

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout — mounts `SiteNav`, `Footer`, `MobileStickyBar`, `OfferBanner`. |
| `app/globals.css` | Tailwind 4 base + CSS custom properties (color tokens). |
| `app/not-found.tsx` | 404 page. |
| `app/robots.ts` | `/robots.txt` generator. |
| `app/sitemap.ts` | `/sitemap.xml` generator. |
| `app/opengraph-image.tsx` | OG image generator (Next.js ImageResponse). |

---

### `src/components/` — UI

**Forms** (`components/forms/`):

| Component | Purpose |
|-----------|---------|
| `BookingForm.tsx` | Multi-step booking wizard. Tier select, add-ons, date/time, contact info. POSTs to `FORMS.booking` (Formspree `xnngyenw`). |
| `QuickQuoteForm.tsx` | Lightweight lead form. `FORMS.quickQuote` endpoint not yet populated — currently falls back. |
| `ZipRouter.tsx` | ZIP input → `lookupZip()` → redirect to county page. Fires GTM events. Three variants: `hero`, `inline`, `compact`. |

**Layout** (`components/layout/`):

| Component | Purpose |
|-----------|---------|
| `SiteNav.tsx` | Top navigation bar. |
| `MobileNav.tsx` | Mobile slide-out nav. |
| `Footer.tsx` | Site footer with nav columns and legal links. |
| `MobileStickyBar.tsx` | Bottom-fixed Phone + Book bar, mobile only. Suppressed on `/book`. |
| `OfferBanner.tsx` | Top banner for `ACTIVE_OFFER`. Currently: "$25 off first clean." |
| `ServicePageLayout.tsx` | Shared wrapper used by all `/services/[slug]` pages. |
| `AlternatingFeatureSection.tsx` | Left/right alternating image + text rows. |
| `StickyFeatureSection.tsx` | Sticky-scroll feature section (desktop). |
| `StickyScrollFeatures.tsx` | Variant of sticky scroll layout. |

**Sections** (`components/sections/`):

| Component | Purpose |
|-----------|---------|
| `TrustBadges.tsx` | "Insured & Bonded / 10+ Years / 5.0 Stars / Family-Owned" bar. |
| `TrustPillars.tsx` | Expanded trust narrative section. |
| `StatCards.tsx` | Big-number social proof row (10+ years, 500+ homes, etc.). |
| `SignatureProcess.tsx` | "How it works" step section. Data from `src/lib/process.ts`. |
| `Testimonials.tsx` | Review cards. Data from `src/lib/reviews.ts`. |
| `Tiers.tsx` | Three-tier pricing cards (Glow / Signature Glow / Full Glow). Data from `src/lib/tiers.ts`. |
| `MarketplaceComparison.tsx` | NestGlow vs. marketplace apps comparison table. |
| `ComparisonTable.tsx` | General vs. deep cleaning comparison. |
| `ServiceAreasTabs.tsx` | County/town tab grid for service area pages. |
| `FAQ.tsx` | Full FAQ page layout. |
| `FAQAccordion.tsx` | Reusable accordion — used on homepage, `/faq`, `/book-now`. |
| `CtaBlock.tsx` | Inline CTA block. Variants: `phone`, `zip`, `book`. |

**UI primitives** (`components/ui/`) — shadcn/ui components:
`accordion`, `badge`, `button`, `card`, `checkbox`, `input`, `label`, `select`, `separator`, `textarea`, `GuaranteeBadge`

**Root:**
`PhoneLink.tsx` — `<a href="tel:...">` wrapper, fires GTM phone click event.

---

### `src/lib/` — Data + utilities

| File | Exports | Consumed by |
|------|---------|-------------|
| `config.ts` | `BASE_URL`, `BUSINESS`, `TRACKING`, `FORMS` | Site-wide. Single source of truth for all IDs and endpoints. |
| `tiers.ts` | `TIERS`, `getTierById()`, `recommendTierBySqft()` | `BookingForm`, `Tiers` section, `/book-now`. |
| `offer.ts` | `ACTIVE_OFFER`, `isOfferActive()` | `OfferBanner`. Current offer: "$25 off first clean," no expiry. |
| `towns.ts` | Town/service area data | County pages, `ServiceAreasTabs`, sitemap. |
| `zipToCounty.ts` | `lookupZip(zip)` → `{county, town}` or `null` | `ZipRouter`. Maps NJ ZIP codes to county slug + town name. |
| `reviews.ts` | Testimonial data array | `Testimonials` section. |
| `process.ts` | Process step data | `SignatureProcess` section. |
| `utils.ts` | `cn()` (clsx + tailwind-merge) | All components. |

---

### `public/` — Static assets

| Path | Contents |
|------|---------|
| `logo.png`, `logo-white.png`, `logo.svg` | Brand logo (dark bg and light bg variants). |
| `favicon.ico`, `favicon-*.png`, `apple-touch-icon.png`, `android-chrome-*.png` | Full favicon set. |
| `site.webmanifest` | PWA manifest. |
| `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | Default Next.js placeholder SVGs. Can be deleted. |

No `/assets/img/` folder exists yet. Hero photo and process photos are still placeholders — see open items.

---

## Conversion architecture

### Funnel flow

```
Paid ad
  └─▶ /book-now  (noindex ad landing page)
        └─▶ ZipRouter → lookupZip(zip)
              ├─ Match  → /cleaning-services/[county]?zip=ZIP&town=TOWN
              │              └─▶ QuickQuoteForm (no endpoint yet)  ─▶ /book
              └─ No match → "out of area" → /contact?reason=waitlist&zip=ZIP
                                              (partial lead capture)

Organic / homepage
  └─▶ / (homepage)
        └─▶ ZipRouter (same flow as above)
              or
            CTA button → /book (direct)

/book  (full wizard)
  ├─ Step 1: Residential vs Commercial
  ├─ Step 2: Tier select (Glow / Signature Glow / Full Glow)
  ├─ Step 3: Add-ons (fridge, oven, cabinets, laundry, windows, same-day, etc.)
  ├─ Step 4: Date + time preferences (primary + 2 alternates)
  └─ Step 5: Contact info → POST to Formspree xnngyenw → success screen
```

### Tier structure

| Tier | Rooms | Best for | Sqft cap |
|------|-------|----------|----------|
| Glow | 3 rooms | Condos, smaller homes | ≤1,500 sqft |
| Signature Glow *(popular)* | 5 rooms | Most homes | ≤2,800 sqft |
| Full Glow | All rooms + extras | Large homes, pre-event, pets | No limit |

`recommendTierBySqft()` in `src/lib/tiers.ts` auto-selects based on home size input.

### Standing offer

`ACTIVE_OFFER` in `src/lib/offer.ts`: **"$25 off your first clean"** — enabled, no expiry date set. Rendered in `OfferBanner` (top of every page via `layout.tsx`).

### Out-of-area leads

ZIP misses fire `zip_router_miss` and route to `/contact?reason=waitlist&zip=XXX` for waitlist capture.

---

## Tracking

**Current state: all IDs unpopulated.** Tracking scripts will not render until `src/lib/config.ts` is updated.

```ts
TRACKING.gtmId      = ""   // GTM container — blank = no GTM script
TRACKING.ga4Id      = ""   // GA4 measurement ID
TRACKING.googleAdsId = ""  // Google Ads conversion ID
```

**GTM dataLayer events already wired in code:**

| Event | Where fired | Data |
|-------|------------|------|
| `zip_router_match` | `ZipRouter.tsx` on successful ZIP lookup | `{ zip, county, town }` |
| `zip_router_miss` | `ZipRouter.tsx` on out-of-area ZIP | `{ zip }` |

**Conversion goals to wire once GTM is live:**

- Form submission (Formspree `/book` success)
- Phone click (`PhoneLink.tsx`)
- Quick-quote form submission
- ZIP router match (already firing, just needs a GTM trigger)

---

## Open items (operational)

- [ ] Populate `TRACKING.gtmId`, `ga4Id`, `googleAdsId` in `src/lib/config.ts`
- [ ] Create Formspree quick-quote form + populate `FORMS.quickQuote`
- [ ] Hero photo — real Caroline/team shot (homepage + `/book-now`)
- [ ] Caroline portrait photo (about page)
- [ ] SignatureProcess photos — 5 category shots (Kitchen, Bathroom, Bedroom, Living Room, Floor)
- [ ] Google Business Profile URL (reviews page)
- [ ] Deploy to Vercel + DNS switch (Hostinger → Vercel) — see `MIGRATION-NOTES.md`
- [ ] Submit sitemap to Google Search Console + Bing Webmaster Tools
- [ ] Visual audit pass — see `HANDOFF-docs/TASK-09-visual-audit-checklist.md`

Full task list: `TASKS.md`

---

## Archive

`HANDOFF-docs/_archive/` contains build-time briefs (TASK-00 through TASK-07 + MASTER-PROMPT + README) that shipped and are no longer load-bearing. Safe to delete after Lucas reviews. Kept temporarily for historical reference.

`HANDOFF-docs/TASK-09-visual-audit-checklist.md` remains active — not archived.
