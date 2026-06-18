# TASK 25 — Deep-cleaning images (hero + per-kind feature backgrounds)

## Context

`/services/deep-cleaning` is a residential service, so the residential layout is CORRECT here
(room carousel, Glow tiers, homeowner testimonials, "areas we cover" rooms, the "Everything your
home needs" heading all stay). The page-level copy in `deep-cleaning/page.tsx` is good and needs
NO changes.

The only cleanup is imagery, which is currently generic/shared:

1. The hero (`public/images/services/deep-cleaning/hero.jpg`) is the same generic styled living
   room used on other pages — it doesn't signal "deep clean." Lucas is replacing the file
   directly with a ChatGPT-generated image. DO NOT touch the hero `<Image>` src in code.

2. The three sticky-features background images still come from the shared residential default set
   (`/images/home/why-*.png`). Deep cleaning should get its own three so the page feels distinct
   from the residential page (which uses the same defaults). Lucas will place them at:

```
public/images/services/deep-cleaning/feature-1.jpg   (kitchen detail)
public/images/services/deep-cleaning/feature-2.jpg   (bathroom / grout detail)
public/images/services/deep-cleaning/feature-3.jpg   (bedroom)
```

> Read `AGENTS.md` first (non-standard Next.js version).
> Prereq: TASK-24 added `scrollBgImagesByKind` to `ServicePageLayout.tsx`. This task just adds a
> `deep` entry to that existing map. If TASK-24 wasn't done, do it first.

---

## Edit — add a `deep` entry to `scrollBgImagesByKind`

In `src/components/layout/ServicePageLayout.tsx`, the map from TASK-24 currently looks like:

```ts
const scrollBgImagesByKind: Partial<Record<ServiceKind, string[]>> = {
  commercial: [
    "/images/services/commercial-cleaning/feature-1.jpg",
    "/images/services/commercial-cleaning/feature-2.jpg",
    "/images/services/commercial-cleaning/feature-3.jpg",
  ],
};
```

Add a `deep` entry:

```ts
  deep: [
    "/images/services/deep-cleaning/feature-1.jpg",
    "/images/services/deep-cleaning/feature-2.jpg",
    "/images/services/deep-cleaning/feature-3.jpg",
  ],
```

No other change needed — the existing
`const scrollBgImages = scrollBgImagesByKind[serviceKind] ?? defaultScrollBgImages;`
line picks it up automatically.

---

## Verify

- [ ] All three `deep-cleaning/feature-N.jpg` files exist in public/ before building (build will
      error on a missing Image src). If Lucas hasn't dropped them yet, hold this task.
- [ ] `npm run build` passes.
- [ ] `/services/deep-cleaning` shows the three new deep-clean backgrounds crossfading behind the
      feature panels, and the new hero.
- [ ] `/services/residential-cleaning` UNCHANGED — still the `/images/home/why-*.png` defaults.
- [ ] Room carousel, Glow tiers, testimonials still present on deep (regression check).

## Out of scope
- Do NOT change the hero `<Image>` src (Lucas replaces the file).
- Do NOT change deep-cleaning page copy — it's correct.
- Do NOT change residential or other kinds' backgrounds.
