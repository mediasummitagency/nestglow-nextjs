# TASK 21 & 22 — Completion Summary
**Date:** 2026-06-16

---

## TASK 21 — Consolidate move-cleaning pages

**Goal:** Eliminate keyword cannibalization from three near-duplicate move pages down to one canonical route.

### What was done

| Step | Change |
|------|--------|
| Delete orphan routes | Removed `src/app/services/move-in-cleaning/` and `src/app/services/move-out-cleaning/` |
| 308 redirects | `next.config.ts` now redirects both old URLs → `/services/move-in-move-out` permanently |
| Intent-anchor copy | Appended to `move-in-move-out` intro: *"Whether you searched for move-in cleaning or move-out cleaning, this is the page…"* |
| On-ramp copy | Appended to `residential-cleaning` intro: *"First-time client or haven't had a professional clean in a while? Most clients start with a one-time deep clean…"* |
| Orphan check | `grep` confirmed zero remaining references to the deleted slugs in `src/` |

### Verified
- `npm run build` passes; deleted routes absent from build output
- `curl -I /services/move-in-cleaning` → `308` → `/services/move-in-move-out`
- `curl -I /services/move-out-cleaning` → `308` → `/services/move-in-move-out`

---

## TASK 22 — Lock service set to 6 + de-residential-ify shared layout

**Goal:** Surface all 6 services site-wide and stop forcing residential UI sections onto non-residential pages.

### Phase 1 — Lock the set to 6

| Change | File |
|--------|------|
| Hub imports `services` from `lib/services.ts` — all 6 cards now shown | `src/app/services/page.tsx` |
| Sitemap adds `airbnb-cleaning` and `post-construction-cleaning` (priority 0.9) | `src/app/sitemap.ts` |

### Phase 2 — Service-aware layout

**`serviceKind` discriminator added to `ServicePageProps`:**

| Page | serviceKind |
|------|-------------|
| residential-cleaning | `"residential"` |
| move-in-move-out | `"moveinout"` |
| deep-cleaning | `"deep"` |
| commercial-cleaning | `"commercial"` |
| airbnb-cleaning | `"airbnb"` |
| post-construction-cleaning | `"postconstruction"` |

**Conditional sections:**

| Section | residential / moveinout / deep | commercial | airbnb | postconstruction |
|---------|-------------------------------|------------|--------|-----------------|
| RoomCarousel | ✅ | ❌ | ❌ | ❌ |
| Glow Tiers | ✅ | ❌ custom CTA | ❌ custom CTA | ❌ custom CTA |
| Homeowner Testimonials | ✅ | ❌ (TODO: B2B set) | ✅ | ✅ |

**"AREAS WE COVER" visual — now kind-aware:**

| Kind | Areas shown |
|------|-------------|
| residential / moveinout / deep | Kitchen, Bathrooms, Bedrooms, Living Areas, Hallways, Entryways |
| commercial | Reception, Restrooms, Break Room, Workstations, Conference Rooms, Common Areas |
| airbnb | Bedrooms, Bathrooms, Kitchen, Living Areas, Linens, Restock Check |
| postconstruction | Fine Dust, HVAC Vents, Windows & Tracks, Cabinets, Floors, Fixtures |

**Custom-quote CTA copy (replaces Glow tiers on non-residential pages):**

- **commercial:** "Every space is quoted on a walk-through. Tell us your square footage and schedule and we'll send a firm number."
- **airbnb:** "Turnover pricing depends on unit size and frequency. Set up your season schedule and we'll lock in your per-turn rate."
- **postconstruction:** "Post-construction is quoted per project based on size and condition. Send the details and we'll price it."

**Badge copy de-duplicated:**

| Page | Badge 1 | Badge 2 | Badge 3 |
|------|---------|---------|---------|
| residential | TRANSPARENT PRICING | WHAT EVERY CLEAN INCLUDES | WHO THIS IS FOR |
| deep-cleaning | PRICED FOR THE WORK | WHAT A DEEP CLEAN REACHES | THE RIGHT STARTING POINT |
| commercial | CUSTOM QUOTES | WHAT WE COVER EACH VISIT | BUILT FOR YOUR BUSINESS |

### Verified
- `npm run build` passes; all 6 service routes present; deleted routes absent
- Both 308 redirects confirmed live in dev
- `ServicePageLayout.tsx` is the single source of truth for section visibility

---

## Files changed

- `next.config.ts`
- `src/app/services/page.tsx`
- `src/app/sitemap.ts`
- `src/components/layout/ServicePageLayout.tsx`
- `src/app/services/residential-cleaning/page.tsx`
- `src/app/services/move-in-move-out/page.tsx`
- `src/app/services/deep-cleaning/page.tsx`
- `src/app/services/commercial-cleaning/page.tsx`
- `src/app/services/airbnb-cleaning/page.tsx`
- `src/app/services/post-construction-cleaning/page.tsx`
- ~~`src/app/services/move-in-cleaning/`~~ — deleted
- ~~`src/app/services/move-out-cleaning/`~~ — deleted
