# TASK-20 — SEO Skeleton Port (MaidPro-modeled)

**Goal:** Close the on-page SEO gaps between our service/town pages and the
best-ranking competitor pattern (MaidPro town pages). We are NOT rebuilding —
our town template already matches or beats theirs on most beats (schema, hero,
Pro-vs-Independent comparison, town link grid). This task only ADDS the few
high-value beats we're missing, as reusable components shared by both
`/services/*` pages and `/cleaning-services/[town]` pages.

> Read `AGENTS.md` first. This is a non-standard Next.js version — check
> `node_modules/next/dist/docs/` before writing code.

---

## Context

- **Tokens:** `brand`, `brand-dark`, `charcoal`, `charcoal-70`, `charcoal-40`,
  `cream`, `cream-50`, `cream-100`. Reuse only these — no new colors.
- **Single source of truth:** `src/lib/config.ts` (`BUSINESS`, `BASE_URL`).
  Never hardcode phone/email/URLs.
- **Town data:** `src/lib/towns.ts` (`TownData` type). All town content lives here.
- **Existing layout we extend:** `src/components/layout/ServicePageLayout.tsx`
  (already has hero, intro, sticky features, FAQ, tiers, areas tabs, related
  services). It already accepts an optional flat `checklist?: string[]`.
- **Existing town page:** `src/app/cleaning-services/[town]/page.tsx`
  (already has breadcrumb + 3x schema, trust badges, local hook, tiers,
  signature process, Pro-vs-Independent, town-tagged testimonials, FAQ,
  nearby-towns grid).

### Nothing is locked
Entire site is in development. You may edit any file. Be conservative: reuse
existing components and token classes; do not introduce new dependencies, new
color values, or `<style>` blocks.

---

## What we are adding (and ONLY this)

### 1. `<RoomChecklist />` — room-by-room tabbed checklist  *(highest priority)*
The single biggest gap. Competitor's room-segmented checklist drives dwell time
and long-tail keywords. We currently only have a flat bullet list / static icon
grid.

- New file: `src/components/sections/RoomChecklist.tsx`
- Client component (tabs need state). Tabs: **Kitchen · Bathrooms · Bedrooms ·
  Living Areas**. Default to Kitchen.
- Data comes from a new export `roomChecklist` in `src/lib/checklist.ts`
  (see COPY block below — paste verbatim, it's already written).
- Each tab renders its bullet list with the existing `CheckCircle` lucide icon
  + `text-brand-dark`, matching the current checklist styling in
  `ServicePageLayout`.
- Accessible: tab buttons with `aria-selected`, panel with `role="tabpanel"`.
- Mobile: tabs scroll horizontally or wrap; never break layout < 380px.

**Wiring:**
- In `ServicePageLayout.tsx`, replace the optional flat-`checklist` block with
  `<RoomChecklist />` (keep the surrounding `CtaBlock`). The `checklist?` prop
  on `ServicePageProps` can stay for back-compat but is no longer the primary
  surface.
- On the town page (`cleaning-services/[town]/page.tsx`): DECISION PENDING —
  the town page already has `<SignatureProcess />` ("what's included"). Adding
  RoomChecklist directly after it may be redundant. Lucas to confirm whether
  RoomChecklist goes on town pages too, or service pages only. If yes, insert
  after `<SignatureProcess />` and before the Book CTA.

### 2. Services cross-link block on town pages  *(internal-linking gap)*
Town pages currently link to other TOWNS but not to SERVICES. Competitor's town
pages hyperlink every service type — that's their internal-linking density play.

- New file: `src/components/sections/ServicesOfferedBlock.tsx`
- A short intro paragraph (see COPY) + a tidy grid of links to all
  `/services/*` pages. Reuse the `services` array shape already present in
  `ServicePageLayout.tsx` (lift it into `src/lib/services.ts` as a shared export
  so both files import it instead of duplicating — there are currently TWO
  copies of this array, in `app/page.tsx` and `ServicePageLayout.tsx`;
  consolidate).
- Insert on the town page between the Pro-vs-Independent section and Testimonials.
- Town name interpolated into the intro line for local relevance.

### 3. Add-on services beat
Competitor breaks oven / fridge / interior-window cleaning into their own
scannable cards. We bury these in deep-clean copy.

- New file: `src/components/sections/AddOnServices.tsx`
- Three cards (Oven · Fridge · Interior Windows) from `addOns` data (see COPY).
- Use on `ServicePageLayout` (deep-cleaning + residential pages benefit most)
  and optionally on town pages. Render only when an `addOns` prop / flag is set
  so it doesn't appear where irrelevant.

### 4. Fold extra differentiators into Pro-vs-Independent
Our comparison is already strong. Just ADD three pro-side bullets we're missing
(see COPY): pet-safe products, contract-free, same-day-response promise. Edit the
`proPoints` array in `cleaning-services/[town]/page.tsx`. Keep the indie side
balanced (don't add unfair negatives).

---

## Build order
1. `src/lib/services.ts` — consolidate the duplicated services array.
2. `src/lib/checklist.ts` — paste `roomChecklist` + `addOns` data.
3. `RoomChecklist.tsx` → wire into ServicePageLayout (+ town page if Lucas confirms).
4. `ServicesOfferedBlock.tsx` → wire into town page.
5. `AddOnServices.tsx` → wire into ServicePageLayout (gated by prop).
6. Edit `proPoints` differentiators.
7. Build, lint, visual check at the URLs below.

## Acceptance criteria
- `npm run build` clean, no type errors, no new lint warnings.
- `/services/residential-cleaning`, `/services/deep-cleaning`, and
  `/cleaning-services/neptune-city-nj` all render the new beats correctly.
- RoomChecklist tabs switch with keyboard + screen-reader labels.
- No duplicated `services` array remains (single import from `lib/services.ts`).
- No new colors, no `<style>` blocks, no new npm packages.
- Existing schema (Service / FAQ / Breadcrumb) untouched and still valid.
- Mobile layout intact at 380px.

---

## COPY — paste verbatim (original NestGlow copy, reviewed by Lucas)

> NOTE: This is original copy written for NestGlow. It is modeled on the
> *structure* of competitor checklists, NOT copied from them.

### `src/lib/checklist.ts`

```ts
export type RoomChecklist = {
  room: string;
  items: string[];
};

export const roomChecklist: RoomChecklist[] = [
  {
    room: "Kitchen",
    items: [
      "Countertops and backsplash cleaned and disinfected",
      "Appliance exteriors wiped down (interiors on request)",
      "Microwave cleaned inside and out",
      "Sink scrubbed, disinfected, and shined",
      "Cabinet fronts wiped",
      "Stovetop degreased",
      "Table and chairs cleaned",
      "Floor vacuumed and mopped",
      "Trash emptied and bin wiped",
    ],
  },
  {
    room: "Bathrooms",
    items: [
      "Tub and shower scrubbed, disinfected, and rinsed",
      "Toilet disinfected inside and out",
      "Sink and vanity cleaned and disinfected",
      "Mirrors cleaned streak-free",
      "Chrome fixtures shined",
      "Countertops cleared, wiped, and reset",
      "Floor vacuumed and mopped",
      "Towels folded and straightened",
      "Trash emptied",
    ],
  },
  {
    room: "Bedrooms",
    items: [
      "Beds made (linens changed on request)",
      "Furniture dusted — tops, fronts, and surfaces",
      "Mirrors and glass cleaned",
      "Floors vacuumed and/or mopped, under bed where reachable",
      "Windowsills wiped",
      "Baseboards dusted",
      "Switch plates and door frames wiped",
      "Trash emptied",
      "General tidy and straighten",
    ],
  },
  {
    room: "Living Areas",
    items: [
      "Upholstered furniture vacuumed",
      "Cushions fluffed and straightened",
      "Surfaces and shelves dusted",
      "Picture frames and decor dusted",
      "Floors vacuumed and/or mopped",
      "Hallways and stairs vacuumed",
      "Baseboards dusted",
      "Fingerprints removed from woodwork and switch plates",
      "Trash emptied and general tidy",
    ],
  },
];

export type AddOn = {
  title: string;
  body: string;
};

export const addOns: AddOn[] = [
  {
    title: "Inside-Oven Cleaning",
    body: "Skip the scrubbing on hands and knees. We clean the inside of your oven down to the racks so it's ready for your next meal — just add it to your booking notes.",
  },
  {
    title: "Inside-Fridge Cleaning",
    body: "Shelves, drawers, and seals wiped and sanitized so the place that holds your food is actually clean. A great add-on before a big grocery run or after the holidays.",
  },
  {
    title: "Interior Window Cleaning",
    body: "Glass, sills, and tracks cleaned so more light gets in. Add interior windows to any deep clean for a noticeably brighter space.",
  },
];
```

### ServicesOfferedBlock intro copy (interpolate `{town}`)

> Heading: **Every cleaning service {town} needs, in one place**
>
> Body: From recurring upkeep to one-time resets, NestGlow Co covers the full
> range of home and business cleaning in {town} and the surrounding area. Every
> service is fully insured, bonded, and backed by our 24-hour satisfaction
> guarantee.

(On `/services/*` pages where there's no town, use heading
**Every cleaning service, in one place** and replace "{town} and the surrounding area"
→ "Monmouth, Ocean, and Middlesex County.")

### Differentiator bullets to ADD to `proPoints`

```
"Pet- and kid-safe products on request",
"No contracts — cancel or adjust anytime",
"Same-day response to every inquiry",
```
