# TASK 23 — Fix remaining residential copy on the commercial page

## Context

`/services/commercial-cleaning` renders through `ServicePageLayout.tsx`. After TASK-22 the
page-level copy is correct, but several strings are still **hardcoded residential in the shared
layout** and leak onto the commercial page. The commercial hero image is being replaced
separately by Lucas (ChatGPT-generated, dropped at
`public/images/services/commercial-cleaning/hero.jpg`) — DO NOT touch the hero `<Image>` src.

All edits below are in `src/components/layout/ServicePageLayout.tsx` UNLESS noted. The goal is
to make the residential-specific strings vary by `serviceKind` (which already exists on props).

> Read `AGENTS.md` first (non-standard Next.js version).

---

## Edit 1 — Stat cards ("100+ Homes Cleaned" is residential)

The `statNumbers` array is hardcoded and shows on every service page. "Homes Cleaned" reads
wrong on commercial.

Current:
```ts
const statNumbers = [
  { value: "10+",  label: "Years Serving NJ" },
  { value: "100+", label: "Homes Cleaned" },
  { value: "5.0",  label: "Average Star Rating" },
  { value: "100%", label: "Satisfaction Guaranteed" },
];
```

Make it a function of `serviceKind`. Commercial (and the other non-residential kinds) should not
say "Homes Cleaned." Implement a per-kind override for the second stat only; keep the other three:

```ts
function getStatNumbers(serviceKind: ServiceKind) {
  const secondStat =
    serviceKind === "commercial"      ? { value: "100+", label: "Businesses Served" } :
    serviceKind === "airbnb"          ? { value: "100+", label: "Turnovers Completed" } :
    serviceKind === "postconstruction"? { value: "100+", label: "Projects Completed" } :
                                        { value: "100+", label: "Homes Cleaned" };
  return [
    { value: "10+",  label: "Years Serving NJ" },
    secondStat,
    { value: "5.0",  label: "Average Star Rating" },
    { value: "100%", label: "Satisfaction Guaranteed" },
  ];
}
```

Then in the component body, replace the `statNumbers.map(...)` reference with
`getStatNumbers(serviceKind).map(...)`.

> NOTE: confirm "100+" is accurate for businesses served. If NestGlow hasn't served 100+
> commercial clients, change the value (e.g. "25+") or use a non-numeric label like
> "Trusted by NJ Businesses". Flag to Lucas — do not invent a count.

---

## Edit 2 — Sticky-features section headline/subline ("Everything your home needs…")

The `StickyScrollFeatures` is rendered with hardcoded residential strings:

```tsx
<StickyScrollFeatures
  features={scrollFeatures}
  headline="Everything your home needs, nothing you don't"
  subline="Here's exactly how we work — and why clients stick around."
/>
```

Make `headline`/`subline` vary by kind. Add a map near the other per-kind maps:

```ts
const featuresHeadingByKind: Record<ServiceKind, { headline: string; subline: string }> = {
  residential:      { headline: "Everything your home needs, nothing you don't", subline: "Here's exactly how we work — and why clients stick around." },
  moveinout:        { headline: "Everything your home needs, nothing you don't", subline: "Here's exactly how we work — and why clients stick around." },
  deep:             { headline: "Everything your home needs, nothing you don't", subline: "Here's exactly how we work — and why clients stick around." },
  commercial:       { headline: "Everything your business needs, nothing it doesn't", subline: "Here's exactly how we work — and why NJ businesses keep us on schedule." },
  airbnb:           { headline: "Everything your turnover needs, nothing it doesn't", subline: "Here's exactly how we work — and why hosts rebook us every stay." },
  postconstruction: { headline: "Everything the final clean needs, nothing it doesn't", subline: "Here's exactly how we work — and why contractors hand us the punch-out." },
};
```

Then:
```tsx
<StickyScrollFeatures
  features={scrollFeatures}
  headline={featuresHeadingByKind[serviceKind].headline}
  subline={featuresHeadingByKind[serviceKind].subline}
/>
```

---

## Edit 3 — "HOW IT WORKS" card steps (residential wording)

`howItWorksVisual` is a hardcoded constant with residential step labels:
`"Tell us about your home"` and `"We clean, you relax"`.

Convert `howItWorksVisual` from a constant into a function `getHowItWorksVisual(serviceKind)`
that returns the same JSX but with kind-aware step labels and footer line. Keep the icons
(Home, FileText, Sparkles) and all styling identical — only the text strings change.

Step labels by kind (step 02 "Receive your firm quote" stays the same for all):

| kind | step 01 | step 03 | footer line |
|------|---------|---------|-------------|
| residential / moveinout / deep | Tell us about your home | We clean, you relax | No commitment needed to get your quote. |
| commercial | Tell us about your space | We clean after hours, you open to clean | No commitment needed to get your quote. |
| airbnb | Tell us about your property | We turn it over, you stay booked | No commitment needed to get your quote. |
| postconstruction | Tell us about the project | We clear the dust, you hand over the keys | No commitment needed to get your quote. |

For step 01 the `Home` icon is fine to keep for all kinds (or use `Building2` for commercial if
trivial — optional, not required).

Update `getFeatureVisuals(serviceKind)` to call `getHowItWorksVisual(serviceKind)` instead of
the old constant, so the right version flows into the visuals array.

---

## Edit 4 — Commercial final CTA (currently MISSING)

The residential final CTA section is suppressed on commercial:
```tsx
{serviceKind !== "commercial" && <section ...>Ready to come home to clean?...</section>}
```
So commercial currently ends with no closing CTA after the quote block. Add a commercial-specific
final CTA. Simplest approach: add an `else`/second block that renders when
`serviceKind === "commercial"`, mirroring the structure/styling of the residential one but with
B2B copy:

- Heading: **Ready for a space that's handled?**
- Subline: **Consistent, after-hours cleaning your team can count on — backed by full insurance and a certificate of insurance on request.**
- Primary button → `/book` : **Book a walk-through**
- Secondary → `BUSINESS.phoneHref` : **Call {BUSINESS.phone}**

Keep the same section wrapper classes (`bg-white py-16`, centered, etc.) as the residential CTA
for visual consistency.

> Optional polish (only if quick): the other non-residential kinds (airbnb, postconstruction)
> also fall through with the residential CTA currently SHOWING on them ("Ready to come home to
> clean?"). That's wrong for those too, but OUT OF SCOPE for this task — leave them. A later task
> will give airbnb/postconstruction their own CTAs. Do not change their behavior here.

---

## Out of scope

- Do NOT change the hero `<Image>` src — Lucas is replacing the image file directly.
- Do NOT touch the BridgeMarquee (reviewed — acceptable for commercial as-is).
- Do NOT change airbnb / postconstruction CTAs (separate task).
- Do NOT alter the commercial page's own `page.tsx` copy — it's already correct.

## Definition of done

- [ ] Stat cards no longer say "Homes Cleaned" on commercial (value confirmed w/ Lucas)
- [ ] Sticky-features heading reads "your business" on commercial
- [ ] "HOW IT WORKS" card steps read commercial, not "your home" / "you relax"
- [ ] Commercial page has a B2B final CTA (no longer ends on the quote block)
- [ ] `npm run build` passes; `/services/commercial-cleaning` spot-checked in dev
- [ ] Residential pages unchanged (regression check: residential strings still read as before)
