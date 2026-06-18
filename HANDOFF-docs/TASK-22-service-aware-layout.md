# TASK 22 — Lock service set to 6 + de-residential-ify the shared layout

## Context

Prereq: TASK-21 (move-page consolidation) should be done first. After it, the intended
service set is exactly **6 pages**, all separate:

1. `residential-cleaning`
2. `move-in-move-out`
3. `deep-cleaning`
4. `post-construction-cleaning`
5. `airbnb-cleaning`
6. `commercial-cleaning`

**The core problem this task fixes:** every service page renders through
`src/components/layout/ServicePageLayout.tsx`, which unconditionally injects
*residential-specific* sections onto ALL six pages:

- `RoomCarousel` — hardcoded to Kitchen / Bathrooms / Bedrooms / Living Areas, with
  `/images/services/residential-cleaning/*` image paths. Wrong on commercial & post-construction.
- `Tiers` — the residential Glow / Signature Glow / Full Glow pricing cards. Commercial,
  Airbnb, and post-construction pages' own copy says "custom quote" / "premium pricing,"
  which directly contradicts these consumer tiers sitting right below.
- The "AREAS WE COVER" visual inside `featureVisuals` — hardcoded Kitchen/Bath/Bedroom/
  Living/Hallway/Entryway. Wrong for commercial (should be reception/restrooms/breakroom/
  workstations) and post-construction.
- `Testimonials` — homeowner reviews shown on B2B/commercial and STR pages.

The result: a business owner on the commercial page sees a room-by-room residential carousel,
homeowner testimonials, and consumer pricing tiers. That's the "reads like residential" feeling.

This task makes those blocks **conditional per service type** so each of the six pages shows
only what's appropriate, then does a copy pass so the pages stop echoing each other.

Do this in two phases. **Phase 1 first, verify build, then Phase 2.**

---

## PHASE 1 — Lock the set to exactly 6

### 1.1 Confirm the six service directories exist and no others

```bash
ls src/app/services/
```

Expected: `page.tsx` (the hub) plus exactly these 6 dirs:
`residential-cleaning  move-in-move-out  deep-cleaning  post-construction-cleaning  airbnb-cleaning  commercial-cleaning`

If `move-in-cleaning/` or `move-out-cleaning/` still exist, TASK-21 wasn't completed — stop
and finish TASK-21 first.

### 1.2 Fix the `/services` hub — it only lists 4 of the 6

`src/app/services/page.tsx` has a local `services` array with only 4 entries (Residential,
Commercial, Deep, Move In/Out). Airbnb and Post-Construction are missing from the hub.

**Fix:** delete the local `services` array in `page.tsx` and import the canonical one from
`src/lib/services.ts` instead (which already has all 6). Update the card grid to map over the
imported `services`. The lib version uses `{ href, icon, title, copy }` — same shape the page
already renders, so the JSX map needs only minor field-name alignment if any.

After the change, the hub must show all 6 cards. The `sm:grid-cols-2` grid handles 6 fine.

### 1.3 Confirm sitemap lists all 6

`src/app/sitemap.ts` currently lists residential, commercial, deep, move-in-move-out — but
**not** airbnb-cleaning or post-construction-cleaning. Add those two entries (priority 0.9,
monthly, same shape as the others).

### 1.4 Verify

```bash
npm run build
```
Build passes; hub renders 6 cards; sitemap has 6 service URLs.

---

## PHASE 2 — Make the shared layout service-aware

Goal: stop forcing residential sections onto non-residential pages. Drive section visibility
from a single per-page "service kind" instead of hardcoding.

### 2.1 Introduce a `serviceKind` discriminator

Add to `ServicePageProps` in `ServicePageLayout.tsx`:

```ts
serviceKind: "residential" | "moveinout" | "deep" | "commercial" | "airbnb" | "postconstruction";
```

Then set it in each page's `props` object:

| File | serviceKind |
|------|-------------|
| `residential-cleaning/page.tsx` | `"residential"` |
| `move-in-move-out/page.tsx` | `"moveinout"` |
| `deep-cleaning/page.tsx` | `"deep"` |
| `commercial-cleaning/page.tsx` | `"commercial"` |
| `airbnb-cleaning/page.tsx` | `"airbnb"` |
| `post-construction-cleaning/page.tsx` | `"postconstruction"` |

Derive booleans inside the layout for readability:
```ts
const isResidentialStyle = ["residential", "moveinout", "deep"].includes(serviceKind);
const showResidentialTiers = isResidentialStyle; // Glow tiers only make sense for these
const showRoomCarousel = isResidentialStyle;      // room-by-room only for home interiors
const showHomeownerTestimonials = serviceKind !== "commercial"; // commercial gets B2B proof or none
```

> Rationale for groupings: residential / move-in-out / deep are all whole-home interior cleans
> priced by the Glow tiers and shown room-by-room — those sections fit. Commercial, airbnb, and
> post-construction price by custom quote and aren't a "Kitchen/Bath/Bedroom" story.
>
> JUDGMENT CALL TO CONFIRM: move-in-out is grouped WITH residential (gets Glow tiers + room
> carousel). If move jobs are actually quoted custom rather than by tier, move "moveinout" out
> of `isResidentialStyle` and into the quote-CTA group in 2.3.

### 2.2 RoomCarousel — make it conditional

In `ServicePageLayout.tsx`, gate the carousel:
```tsx
{showRoomCarousel && <RoomCarousel />}
```

`RoomCarousel` is fine as-is for the three residential-style pages. **Do NOT** show it on
commercial / airbnb / post-construction. (Optional future enhancement: make `RoomCarousel`
accept a `rooms` prop so airbnb could show its own set — out of scope here; just hide it.)

### 2.3 Tiers — conditional, with a quote-based alternative

Replace the unconditional Tiers `<section>` with a branch:

- If `showResidentialTiers` → render the existing `<Tiers …>` section exactly as now.
- Else (commercial / airbnb / postconstruction) → render a **custom-quote CTA block** instead
  of consumer pricing. Build a small inline section (or reuse `CtaBlock variant="phone"`/`"book"`)
  with copy appropriate to the kind:
  - commercial: "Every space is quoted on a walk-through. Tell us your square footage and
    schedule and we'll send a firm number." → CTA: call/text + Book a walk-through.
  - airbnb: "Turnover pricing depends on unit size and frequency. Set up your season schedule
    and we'll lock in your per-turn rate." → CTA: call/text + Book.
  - postconstruction: "Post-construction is quoted per project based on size and condition.
    Send the details and we'll price it." → CTA: call/text + Book.

This removes the contradiction where the page copy says "custom quote" while Glow tiers sit
right below it.

### 2.4 "AREAS WE COVER" feature visual — make it kind-aware

In `featureVisuals` (Visual index 1), the hardcoded Kitchen/Bath/Bedroom/Living/Hallway/Entryway
list is residential. Turn that visual into a function of `serviceKind` so the labels match:

- residential / moveinout / deep: Kitchen, Bathrooms, Bedrooms, Living Areas, Hallways, Entryways (current)
- commercial: Reception, Restrooms, Break Room, Workstations, Conference Rooms, Common Areas
- airbnb: Bedrooms, Bathrooms, Kitchen, Living Areas, Linens, Restock Check
- postconstruction: Fine Dust, HVAC Vents, Windows & Tracks, Cabinets, Floors, Fixtures

Implement as a small map keyed by `serviceKind` that returns the `{icon,label}[]` array the
visual renders. Pick reasonable existing lucide icons (e.g. Briefcase, Building2, etc. — import
what's needed). Keep the "HOW IT WORKS" and "WHY CLIENTS TRUST US" visuals as-is.

### 2.5 Testimonials — gate on commercial

```tsx
{showHomeownerTestimonials && <Testimonials />}
```
The homeowner reviews (Linda Cohen et al.) read wrong on the commercial page. Simplest correct
move now: hide on commercial. (Leaving them on airbnb is acceptable — hosts are still
residential-adjacent buyers — but hide on commercial.) Leave a `TODO` to add a B2B testimonial
set later.

### 2.6 Copy pass — stop the three core pages echoing each other

Residential, deep, and commercial currently reuse the SAME three badges in the same order:
`TRANSPARENT PRICING` / `EVERY STANDARD CLEAN` / `WHO THIS IS FOR`. Side by side they read
templated, and "EVERY STANDARD CLEAN" is residential vocabulary on the commercial page.

Edit the `features[].badge` values (badge text only — leave headline/subhead/body unless they
reference the badge wording):

- **residential**: keep `TRANSPARENT PRICING`; change `EVERY STANDARD CLEAN` → `WHAT EVERY CLEAN INCLUDES`; keep `WHO THIS IS FOR`.
- **deep-cleaning**: change to `PRICED FOR THE WORK` / `WHAT A DEEP CLEAN REACHES` / `THE RIGHT STARTING POINT`.
- **commercial**: change to `CUSTOM QUOTES` / `WHAT WE COVER EACH VISIT` / `BUILT FOR YOUR BUSINESS`.

Leave move-in-move-out, airbnb, and post-construction badges as-is — they're already distinct.

### 2.7 Verify

```bash
npm run build && npm run dev
```
Manually check each of the 6 pages:
- [ ] residential / move-in-out / deep: room carousel present, Glow tiers present, homeowner testimonials present, "AREAS WE COVER" = rooms.
- [ ] commercial: NO room carousel, NO Glow tiers (custom-quote CTA instead), NO homeowner testimonials, "AREAS WE COVER" = commercial areas, badges updated.
- [ ] airbnb: NO Glow tiers (quote CTA), NO room carousel, "AREAS WE COVER" = STR set; testimonials OK to keep.
- [ ] post-construction: NO room carousel, NO Glow tiers (quote CTA), "AREAS WE COVER" = post-construction set.

---

## Out of scope

- Do NOT merge any of the 6 pages together.
- Do NOT rewrite feature `body` copy wholesale — badge text + the two appended sentences from
  TASK-21 are the only copy changes. Deeper copy rewrites can be a later task.
- Do NOT build a real B2B testimonial dataset now (leave a TODO).
- Do NOT touch the booking wizard, towns pages, or tracking.

## Definition of done

- [ ] `/services` hub shows all 6 services (imports from `lib/services.ts`)
- [ ] sitemap lists all 6 service URLs
- [ ] `serviceKind` added to props + set on all 6 pages
- [ ] RoomCarousel, Tiers, Testimonials conditional per kind
- [ ] "AREAS WE COVER" visual matches each service kind
- [ ] commercial/airbnb/post-construction show a custom-quote CTA instead of Glow tiers
- [ ] badge copy de-duplicated on residential/deep/commercial
- [ ] `npm run build` passes; all 6 pages spot-checked in dev
