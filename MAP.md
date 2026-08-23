# NestGlow Next.js — Repo Map

Bird's-eye view of the repo. For any deeper context, follow the links into the actual files.

> **Rewritten 2026-08-22.** The previous version of this file documented a `/guides` section,
> two move-cleaning pages, and two markdown files that had all been deleted months earlier,
> and claimed the offer banner rendered on every page when it was mounted nowhere. Treat this
> file as load-bearing: it is what agents are told to read *instead of* exploring, so a stale
> entry here costs more than no entry.

---

## What this is

NestGlow Co marketing site. Next.js 16, React 19, Tailwind 4, shadcn/ui. The quote form
submits to Formspree (`xnngyenw`). Hosted on Vercel, **pre-launch**.

## Live URL

`nestglowco.com` — **not live yet.** DNS still points at the old Hostinger single-page site.
Cutover steps are in `MIGRATION-NOTES.md`.

---

## Four routes, on purpose

The site was cut from 22 routes to 5 on 2026-08-22 so it could launch lean, then to 4
later the same day when `/about` was parked — there is no portrait of Caroline and the
copy needed dates nobody had.

| Route | File | Notes |
|-------|------|-------|
| `/` | `app/page.tsx` | Everything: hero + ZIP box, trust, process, tiers, services grid, towns, testimonials, FAQ. ~1,630 words. |
| `/contact` | `app/contact/page.tsx` | **The only conversion surface.** Short quote form, call/text/email cards. |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | `noindex`. Real document, not a stub. |
| `/terms-of-service` | `app/terms-of-service/page.tsx` | `noindex`. Real document, not a stub. |

The other 18 routes are **parked, not deleted**, at
`claude-access/projects/summit-media/clients/nestglow/website/parked-for-phase-2/`. That
folder's `README.md` explains what's there, why, and how to bring any of it back. Read it
before rebuilding anything that sounds like it used to exist.

No redirects exist for the parked URLs. The site was never live, so nothing links to them.

**Utility routes:** `layout.tsx` (mounts `SiteNav`, `Footer`, `MobileStickyBar`),
`globals.css`, `not-found.tsx`, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `icon.svg`.

---

## The one funnel

```
Home page
  └─▶ ZIP box  ──▶ lookupZip(zip)
         ├─ in area  → /contact?zip=07753           → "we clean in Neptune City"
         └─ no match → /contact?zip=08050&reason=waitlist → "not in 08050 yet"
                                    │
Any CTA, nav, footer, mobile dock ──┴─▶ /contact
                                          └─▶ 6-field form → Formspree → inline thank-you
```

There is no `/book` and no `/thank-you`. The form confirms in place.

---

## `src/components/`

**Forms** (`components/forms/`)

| Component | Purpose |
|-----------|---------|
| `ContactForm.tsx` | The quote form. Name, phone, email, ZIP, service, message. Honeypot + consent line. Reads `?zip=` / `?reason=` **after mount from `window.location`, deliberately not with `useSearchParams()`** — that hook pushes the whole subtree behind a Suspense fallback, so the form would not be in the server HTML at all. The comment in the file explains it; don't "fix" it back. |
| `BookingForm.tsx` | The old 5-step wizard. **Not routed to any page** — kept as reference for the field set. Delete once the short form has proven itself. |
| `ZipRouter.tsx` | ZIP input → `lookupZip()` → `/contact`. Fires `zip_router_match` / `zip_router_miss`. Variants: `hero`, `inline`, `compact`. |

**Layout** (`components/layout/`)
`SiteNav` (flat: Home / Services / Areas / Contact — Services and Areas are home-page
anchors), `MobileNav` (same list, flat, no accordions), `Footer`, `MobileStickyBar`,
`PageHero`.

> `MobileStickyBar` is `fixed bottom-0`, phone only, and **renders on every page**. It used
> to `return null` on `/contact`, so tapping Quote made the bar you just used disappear —
> changed 2026-08-22.
>
> **Edge to edge as of 2026-08-22, deliberately matching `gorsegner-nextjs`'s `MobileDock`.**
> `fixed inset-x-0 bottom-0`, square corners, opaque white, hairline on top plus an upward
> shadow so it separates from a white section as well as the dark footer. It was a floating
> pill inset 48px each side, so the page ran under both edges and it read as a widget on the
> page rather than the bottom of the app. Height is
> `h-[calc(64px+env(safe-area-inset-bottom,0px))]`: the inset is baked into the HEIGHT and the
> items carry `pb-[env(safe-area-inset-bottom,0px)]` — padding on the `<nav>` would shrink its
> content box instead of extending the bar (the same trap gorsegner's dock documents).
>
> Earlier the same day the bar was `bg-white/50`, which let page text read straight through it
> and turned muddy grey over the dark footer. And
> **clearance lives on `<footer>` via the `.dock-clearance` class in `globals.css`**, not on a
> wrapper in `layout.tsx`. The old flat `pb-[88px]` sat on `{children}` only, so the bar
> covered the footer's Privacy Policy / Terms links; it was also 3px short in the browser and
> would have been ~34px short on an iPhone, where the home-indicator inset lifts the bar.
> `.dock-clearance` tracks `env(safe-area-inset-bottom)` and must stay in step with `DOCK_H`
> (now 64px + inset + 16px). It has to be *inside* the footer so the dark background runs
> behind the bar — a wrapper around it leaves a white band.

**Sections** (`components/sections/`)
`TrustBadges`, `TrustPillars`, `SignatureProcess`, `Testimonials`, `Tiers`, `FAQ`,
`FAQAccordion`, `ServiceAreasTabs`, `ServicesCarousel`, `WhyNestGlow`.

> **Both phone carousels — `ServicesCarousel` and `WhyNestGlow` — run on `lib/useSnapCarousel.ts`.**
> Native CSS scroll-snap; the hook only reports the visible slide and scrolls to a given one, so
> finger, arrows and dots all drive the same scroll position. No carousel library, no drag
> handlers: a scroll container already swipes, and hand-rolled pointer maths is what breaks
> momentum and rubber-banding.
>
> `ServicesCarousel` — four service cards. Phone: swipe carousel with dots (four stacked
> full-width cards ran ~4 screens tall). Tablet up: plain 2-up grid.
>
> `WhyNestGlow` — three rows. Phone: swipe carousel with arrows + dots. **Until 2026-08-22 this
> was a `translateX` slider that moved only on the arrow/dot buttons** — it looked swipeable and
> ignored every swipe. Desktop keeps the alternating image/text rows, unchanged.

> `ServiceAreasTabs` carries **its own plain list of town names** rather than importing
> `towns.ts`, which is parked. The names are not links. Manalapan is listed under **Monmouth**
> here, which is correct — the parked `towns.ts` has it wrong under Middlesex.

**UI primitives** (`components/ui/`) — shadcn: `accordion`, `badge`, `button`, `card`,
`checkbox`, `input`, `label`, `select`, `separator`, `textarea`, plus `GuaranteeBadge` and
`ScrollHint`.

---

## `src/lib/`

| File | Exports | Notes |
|------|---------|-------|
| `config.ts` | `BASE_URL`, `BUSINESS`, `TRACKING`, `FORMS` | Single source of truth. Never hardcode phone/email/URLs. |
| `services.ts` | `services` | The 4 service cards on the home page — Regular Home, Airbnb & Rental Turnovers, Deep, Move In/Out. **Commercial and Post-Construction were cut 2026-08-22**: Caroline sells residential (recurring) and short-term-rental turnovers, and the other two were an assumption. Do not re-add without asking her. **No `href`** — the standalone pages are parked, so each card carries a `detail` line that has to answer "do you do my job?" on its own. |
| `useSnapCarousel.ts` | `useSnapCarousel()` | Shared scroll-snap carousel plumbing for `ServicesCarousel` and `WhyNestGlow`. Reads the active slide off the DOM rather than tracking it in state, so a swipe and a button tap agree. |
| `tiers.ts` | `TIERS`, `getTierById()`, `recommendTierBySqft()` | Glow / Signature Glow / Full Glow. `photoSrc` was `undefined` on all three until 2026-08-22, which drew an empty pale-blue disc above each card on desktop and mobile — it read as a broken image. Now points at the residential-cleaning room shots: living areas / kitchen / bedrooms. |
| `zipToCounty.ts` | `lookupZip(zip)` | 115 NJ ZIPs across the 3 counties. Still live — the ZIP box depends on it. |
| `reviews.ts` | `reviews` | 5 real reviews, all Monmouth, 4 from 2020. Carries a standing note: **do not fabricate more.** |
| `process.ts` | Process step data | Feeds `SignatureProcess`. |
| `utils.ts` | `cn()` | clsx + tailwind-merge. |

---

## Tracking

**There is one ID, and it is blank**, so no measurement script renders at all.

```ts
TRACKING.gtmId = ""   // GTM container — no container for NestGlow yet
```

GA4 and Google Ads conversions are **tags inside the GTM container**, the way every Summit
Media build does it. They are never loaded from the site directly, so there is no `ga4Id` or
`googleAdsId` to fill in — the two placeholder fields were removed 2026-08-22 because they
were dead and made this look like three separate jobs instead of one.

Events already wired and firing into nothing until the container exists:
`zip_router_match`, `zip_router_miss`, `form_submit` (with `form_type`, `zip`, `service`).

---

## Open before launch

- [ ] Create the GTM container and put its ID in `TRACKING.gtmId` (`src/lib/config.ts`).
      GA4 and Ads conversions get configured as tags inside it, not in this repo.
- [ ] Send one real test submission and confirm it reaches Caroline's inbox.
- [ ] **Google Search Console:** `public/googlee73f89249fc839fc.html` is in the repo and serves
      at `/googlee73f89249fc839fc.html`. **It only verifies once this build is live at
      nestglowco.com** — the domain still resolves to the old Hostinger site, so a verification
      attempt today checks that server, not this one. Either deploy first, or drop the same file
      at the Hostinger web root to verify now. **Never delete it afterwards** — removing it
      silently unverifies the property.
- [ ] Google Business Profile URL — nothing on the site links to it, and the business schema
      has no `sameAs`, `openingHours` or `geo`. **In progress as of 2026-08-22** (Lucas is
      working the profile itself); wire the URL in when it is settled.
- [ ] Pick one guarantee. "100% satisfaction" and "24-hour satisfaction" are both used across
      the site and they promise different things.
- [ ] Re-pull a backup of the old Hostinger site. The archive
      `archives/nestglow-old-site-archive-2026-04-20.tar.gz` referenced in `MIGRATION-NOTES.md`
      no longer exists anywhere in the vault, so there is currently nothing to roll back to.
- [ ] Real photos: hero, Caroline portrait, 5 process shots.
- [ ] DNS cutover, then submit the sitemap to Search Console and Bing.

## Known, not blocking

- `public/` is **56 MB**, 25 files over 1.5 MB, including 4 exact duplicates (same file in
  both `public/` and `public/images/…`) and heroes for two long-deleted routes.
- Several sections (`FAQ`, `FAQAccordion`, `StatCards`) start at `opacity: 0` and only appear
  once an `IntersectionObserver` fires. On a slow phone this reads as a blank gap.

Full audit: `claude-access/projects/summit-media/clients/nestglow/website/` work sessions.
