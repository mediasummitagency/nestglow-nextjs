# TASK 26 — Commercial "What we clean" section: qualify line + soft CTA

## Context

Claude Code is reintroducing the `RoomCarousel` ("What we clean") section on the commercial page
to smooth the transition from the hero into the rest of the page. The component already supports
this:

- `RoomCarousel` accepts `rooms` and `title` props.
- `COMMERCIAL_SPACES` is already defined in `RoomCarousel.tsx` with 4 cards:
  Reception, Conference Rooms, Workstations, Break Room — pointing at
  `/images/services/commercial-cleaning/{reception,conference-room,workstations,break-room}.png`.
- Lucas is generating those 4 card images via ChatGPT and dropping them at those paths.

What's MISSING: the carousel renders only a title + 4-card grid. There's no sub-text under the
grid and no CTA. Lucas wants a short "what we cover / find out if you qualify" line plus a SOFT
CTA below the cards.

> Read `AGENTS.md` first (non-standard Next.js version).

---

## Edit 1 — Add optional footer copy + soft CTA to `RoomCarousel`

In `src/components/sections/RoomCarousel.tsx`, extend the props so a footer line and soft CTA can
be passed in (keep them optional so the residential usage is unaffected):

```ts
export function RoomCarousel({
  rooms = RESIDENTIAL_ROOMS,
  title = "What we clean",
  footerText,
  ctaLabel,
  ctaHref,
}: {
  rooms?: RoomItem[];
  title?: string;
  footerText?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
```

After the closing `</div>` of the grid (still inside the `max-w-7xl` container), add:

```tsx
{(footerText || ctaLabel) && (
  <div className="mt-10 text-center">
    {footerText && (
      <p className="text-base md:text-lg text-charcoal/70 max-w-2xl mx-auto">
        {footerText}
      </p>
    )}
    {ctaLabel && ctaHref && (
      <a
        href={ctaHref}
        className="inline-flex items-center gap-2 mt-5 text-brand font-semibold hover:underline underline-offset-4"
      >
        {ctaLabel}
        <span aria-hidden>→</span>
      </a>
    )}
  </div>
)}
```

This is a SOFT CTA (text link, not a big button) per Lucas's ask — it shouldn't compete with the
primary "Book a walk-through" CTA elsewhere on the page.

---

## Edit 2 — Wire it up where the commercial carousel is rendered

In `ServicePageLayout.tsx`, where the carousel renders for commercial (it should be passing
`rooms={COMMERCIAL_SPACES}` and a commercial `title`), add the new props. Recommended copy:

```tsx
<RoomCarousel
  rooms={COMMERCIAL_SPACES}
  title="What we clean"
  footerText="Offices, retail, medical suites, fitness studios, and more — if it's a space your clients see, we keep it ready."
  ctaLabel="Not sure if we cover your type of space? Let's talk"
  ctaHref="/book"
/>
```

Notes:
- Keep `title="What we clean"` (matches residential phrasing; fine for commercial).
- `ctaHref` → `/book` (the booking/walk-through flow). If there's a dedicated contact anchor on
  the page, use that instead — confirm with Lucas which target he wants.
- Lucas may swap the `footerText` wording; the alternative he's considering is:
  "From reception areas to back-of-house, we cover the whole footprint — offices, studios,
  showrooms, clinics, and more." Use the first one unless told otherwise.

---

## Card images (Lucas providing — for reference only)

The 4 commercial card images are 3:4 portrait, saved at the paths already in `COMMERCIAL_SPACES`:
```
/images/services/commercial-cleaning/reception.png
/images/services/commercial-cleaning/conference-room.png
/images/services/commercial-cleaning/workstations.png
/images/services/commercial-cleaning/break-room.png
```
`RoomCard` already has an `onError` fallback (gradient) so a missing image won't break the build —
but the cards look best once all 4 are in place.

---

## Verify

- [ ] `npm run build` passes.
- [ ] Commercial page: "What we clean" section shows 4 office-area cards, a footer line, and a
      soft text-link CTA below.
- [ ] Residential page: RoomCarousel UNCHANGED (no footer/CTA — those props aren't passed there).
- [ ] Soft CTA links to the intended target and is visually secondary to the main page CTA.

## Out of scope
- Do NOT add the footer/CTA to residential or other kinds.
- Do NOT change the card labels or image paths in `COMMERCIAL_SPACES`.
- Do NOT convert the soft CTA into a primary button.
