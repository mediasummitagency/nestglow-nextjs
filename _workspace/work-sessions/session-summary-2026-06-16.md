# Session Summary

**Date:** 2026-06-16
**Focus:** TASK 21 — Consolidate three move-cleaning pages into one canonical route. TASK 22 — Lock service set to 6, fix hub, and de-residential-ify the shared service layout.

---

## What Got Done

### TASK 21 — Consolidate Move-Cleaning Pages

**Problem:** Three near-duplicate pages (`move-in-cleaning`, `move-out-cleaning`, `move-in-move-out`) were splitting keyword authority across the same intent.

**Goal:** One canonical page, two 308 redirects, zero orphaned refs.

**Changes:**

| Step | File / Action |
|------|---------------|
| Deleted orphan routes | `src/app/services/move-in-cleaning/` and `src/app/services/move-out-cleaning/` removed entirely |
| 308 redirects | `next.config.ts` — both old URLs redirect permanently → `/services/move-in-move-out` |
| Intent-anchor copy | Appended to `move-in-move-out` `introParagraph`: *"Whether you searched for move-in cleaning or move-out cleaning, this is the page — we handle both, and the checklist below covers everything either one requires."* |
| On-ramp copy | Appended to `residential-cleaning` `introParagraph`: *"First-time client or haven't had a professional clean in a while? Most clients start with a one-time deep clean to reset the baseline, then move into a recurring schedule."* |

**Verified:**
- `grep` returned zero orphaned references to deleted slugs in `src/`
- `curl -I /services/move-in-cleaning` → `308` → `/services/move-in-move-out`
- `curl -I /services/move-out-cleaning` → `308` → `/services/move-in-move-out`

---

### TASK 22 — Lock to 6 Services + Service-Aware Layout

#### Phase 1 — Lock the set to 6

**Problem:** `/services` hub was only showing 4 of 6 services (missing Airbnb and Post-Construction). Sitemap also missing both.

| Change | File |
|--------|------|
| Hub now imports `services` from `lib/services.ts` — all 6 cards displayed | `src/app/services/page.tsx` |
| Removed local `services` array; removed unused icon imports | `src/app/services/page.tsx` |
| Sitemap adds `airbnb-cleaning` and `post-construction-cleaning` (priority 0.9, monthly) | `src/app/sitemap.ts` |

#### Phase 2 — Service-Aware Layout

**Problem:** `ServicePageLayout.tsx` unconditionally rendered residential sections (RoomCarousel, Glow pricing tiers, homeowner testimonials, residential "AREAS WE COVER") on all 6 pages — including commercial and post-construction.

**Solution:** `serviceKind` discriminator drives section visibility per page.

**`serviceKind` set on all 6 pages:**

| Page | serviceKind |
|------|-------------|
| `residential-cleaning` | `"residential"` |
| `move-in-move-out` | `"moveinout"` |
| `deep-cleaning` | `"deep"` |
| `commercial-cleaning` | `"commercial"` |
| `airbnb-cleaning` | `"airbnb"` |
| `post-construction-cleaning` | `"postconstruction"` |

**Conditional sections:**

| Section | residential / moveinout / deep | commercial | airbnb | postconstruction |
|---------|-------------------------------|------------|--------|-----------------|
| RoomCarousel | ✅ shown | ❌ hidden | ❌ hidden | ❌ hidden |
| Glow Tiers | ✅ shown | ❌ → custom quote CTA | ❌ → custom quote CTA | ❌ → custom quote CTA |
| Homeowner Testimonials | ✅ shown | ❌ hidden | ✅ shown | ✅ shown |

**Custom quote CTA copy (replaces Glow tiers on non-residential pages):**

- **commercial:** "Every space is quoted on a walk-through. Tell us your square footage and schedule and we'll send a firm number." → Book a walk-through
- **airbnb:** "Turnover pricing depends on unit size and frequency. Set up your season schedule and we'll lock in your per-turn rate." → Book your turnover schedule
- **postconstruction:** "Post-construction is quoted per project based on size and condition. Send the details and we'll price it." → Get a project quote

**"AREAS WE COVER" visual — now kind-aware:**

| Kind | Areas shown |
|------|-------------|
| residential / moveinout / deep | Kitchen, Bathrooms, Bedrooms, Living Areas, Hallways, Entryways |
| commercial | Reception, Restrooms, Break Room, Workstations, Conference Rooms, Common Areas |
| airbnb | Bedrooms, Bathrooms, Kitchen, Living Areas, Linens, Restock Check |
| postconstruction | Fine Dust, HVAC Vents, Windows & Tracks, Cabinets, Floors, Fixtures |

**Badge copy de-duplicated (residential/deep/commercial were reusing the same three badges):**

| Page | Badge 1 | Badge 2 | Badge 3 |
|------|---------|---------|---------|
| residential | TRANSPARENT PRICING | WHAT EVERY CLEAN INCLUDES | WHO THIS IS FOR |
| deep-cleaning | PRICED FOR THE WORK | WHAT A DEEP CLEAN REACHES | THE RIGHT STARTING POINT |
| commercial | CUSTOM QUOTES | WHAT WE COVER EACH VISIT | BUILT FOR YOUR BUSINESS |

---

## Pages Changed This Session

- `src/app/services/residential-cleaning/page.tsx`
- `src/app/services/move-in-move-out/page.tsx`
- `src/app/services/deep-cleaning/page.tsx`
- `src/app/services/commercial-cleaning/page.tsx`
- `src/app/services/airbnb-cleaning/page.tsx`
- `src/app/services/post-construction-cleaning/page.tsx`
- `src/app/services/page.tsx`
- `src/app/sitemap.ts`
- `src/components/layout/ServicePageLayout.tsx`
- `next.config.ts`
- ~~`src/app/services/move-in-cleaning/`~~ — deleted
- ~~`src/app/services/move-out-cleaning/`~~ — deleted

## Pages Not Changed This Session

All non-service pages (home, about, contact, book, FAQ, county pages, town pages) — untouched.

---

## Build Status

`npm run build` — passes. All 6 service routes present. Deleted routes absent. Both 308 redirects confirmed live.

---

## Session 2 — UI Polish on StickyScrollFeatures + Service Pages

**Date:** 2026-06-16 (same day, follow-on session)
**Focus:** Visual and UX fixes to the scroll-driven section on service pages, plus commercial page cleanup.

---

### StickyScrollFeatures — Text Readability

**Problem:** Left-side text (subhead + body) blended into the background image; uniform dark overlay gave no contrast advantage to the text column.

**Fix:** Replaced flat `bg-black/65` overlay with a left-biased gradient (`rgba(0,0,0,0.85)` left → `rgba(0,0,0,0.40)` right). Bumped subhead from `text-white/60` → `text-white/80` and body from `text-white/80` → `text-white`. Mobile overlay also bumped to `bg-black/75`.

**File:** `src/components/layout/StickyScrollFeatures.tsx`

---

### StickyScrollFeatures — Full-Viewport Background

**Problem:** Sticky div used `top-[72px]` and `h-[calc(100vh-72px)]`, leaving a white gap at the top. The nav is `position: absolute` and scrolls away with the hero, so the offset was unnecessary.

**Fix:** Changed sticky div to `top-0 h-screen` — background image now fills the full viewport with no gap.

**File:** `src/components/layout/StickyScrollFeatures.tsx`

---

### StickyScrollFeatures — Card Width + Height

**Problem:** Right-side card column was `w-[40%]` — grid cells ~105px wide, causing "Living Areas", "Conference Rooms" etc. to wrap and overlap icons.

**Fix:**
- Right column: `w-[40%]` → `w-[46%]`, `max-w-[520px]` → `max-w-[560px]`
- Left column: `w-[45%]` → `w-[42%]` (rebalanced)
- Areas card inner padding: `p-8` → `p-6`
- Card container height: `h-[400px]` → `h-[480px]` (prevents bottom clipping on AREAS WE COVER card)
- Left column min-height: `min-h-[360px]` → `min-h-[420px]`

**Files:** `src/components/layout/StickyScrollFeatures.tsx`, `src/components/layout/ServicePageLayout.tsx`

---

### StickyScrollFeatures — Scroll Sensitivity

**Problem:** Section felt unresponsive — too much dead scrolling before animation started.

**Fix:** Reduced `PANEL_VH` from 120 → 85 and `LEAD_IN_VH` from 15 → 5. Total section height drops from 375vh → 260vh.

**File:** `src/components/layout/StickyScrollFeatures.tsx`

---

### StickyScrollFeatures — Background Image Quality

**Problem:** Background images defaulting to Next.js quality 75.

**Fix:** Added `quality={90}` to background Image components.

**File:** `src/components/layout/StickyScrollFeatures.tsx`

---

### RoomCarousel — Bedroom/Living Areas Sharpness

**Problem:** `bedrooms.png` and `living-areas.png` are landscape (1536×1024) displayed in a `aspect-[3/4]` portrait slot — less effective pixel density vs kitchen/bathrooms (portrait 1086×1448). Also defaulting to quality 75 and sizes hint undersized.

**Fix:** Bumped `quality={90}` and `sizes` from `288px` → `400px` for large screens.

**Root cause note:** Real fix requires regenerating bedrooms/living-areas as portrait images (same orientation as kitchen/bathrooms).

**File:** `src/components/sections/RoomCarousel.tsx`

---

### Commercial Page — Section Cleanup

**Changes:**

| What | How |
|------|-----|
| Removed "Book a cleaning" CTA below hero | Wrapped in `{isResidentialStyle && ...}` — commercial/airbnb/postconstruction skip it |
| Removed "Ready to come home to clean?" final CTA | Wrapped in `{serviceKind !== "commercial" && ...}` |
| Swapped Towns We Serve and pricing CTA order | ServiceAreasTabs now renders before the dark quote CTA section |

**File:** `src/components/layout/ServicePageLayout.tsx`

---

## Files Changed This Session (Session 2)

- `src/components/layout/StickyScrollFeatures.tsx`
- `src/components/layout/ServicePageLayout.tsx`
- `src/components/sections/RoomCarousel.tsx`
