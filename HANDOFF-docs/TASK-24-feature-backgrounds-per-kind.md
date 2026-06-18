# TASK 24 — Per-kind background images for the sticky-features section

## Context

In `src/components/layout/ServicePageLayout.tsx`, the sticky scroll-features section
(`StickyScrollFeatures`) uses three hardcoded background images, shared by EVERY service page:

```ts
const scrollBgImages = [
  "/images/home/why-owner.png",
  "/images/home/why-guarantee.png",
  "/images/home/why-team.png",
];
```

These are residential cleaning scenes (reused from the homepage "why" section). They show
behind the three feature panels and crossfade as the user scrolls. On the commercial page they
read residential.

We want **commercial to use its own three backgrounds** without changing what residential (or
the other kinds) show. Lucas is generating the three commercial images via ChatGPT and will
place them at:

```
public/images/services/commercial-cleaning/feature-1.jpg
public/images/services/commercial-cleaning/feature-2.jpg
public/images/services/commercial-cleaning/feature-3.jpg
```

> Read `AGENTS.md` first (non-standard Next.js version).

---

## Edit — make `scrollBgImages` kind-aware

Replace the single hardcoded `scrollBgImages` array with a per-kind lookup that falls back to
the existing residential images for any kind without a custom set. This keeps residential,
moveinout, deep, airbnb, and postconstruction visually unchanged for now — only commercial gets
new backgrounds in this task.

```ts
const defaultScrollBgImages = [
  "/images/home/why-owner.png",
  "/images/home/why-guarantee.png",
  "/images/home/why-team.png",
];

const scrollBgImagesByKind: Partial<Record<ServiceKind, string[]>> = {
  commercial: [
    "/images/services/commercial-cleaning/feature-1.jpg",
    "/images/services/commercial-cleaning/feature-2.jpg",
    "/images/services/commercial-cleaning/feature-3.jpg",
  ],
  // airbnb / postconstruction can be added in a later task
};
```

Then in the component body, replace the old reference:

```ts
const scrollBgImages = scrollBgImagesByKind[serviceKind] ?? defaultScrollBgImages;
```

The existing `scrollFeatures` mapping already does:
```ts
bgImage: scrollBgImages[i] ?? scrollBgImages[scrollBgImages.length - 1],
```
so no other change is needed — it will pick up the per-kind array automatically.

---

## Verify

- [ ] `npm run build` passes.
- [ ] `/services/commercial-cleaning` shows the three new commercial backgrounds crossfading
      behind the feature panels.
- [ ] `/services/residential-cleaning` (and deep, move-in-out) backgrounds UNCHANGED — still the
      `/images/home/why-*.png` set.
- [ ] If a commercial `feature-N.jpg` file is missing at build time, Next will error on the
      Image — confirm all three files exist in `public/images/services/commercial-cleaning/`
      before building. If Lucas hasn't dropped them yet, hold this task until he has.

## Out of scope
- Do NOT change the residential/home background files.
- Do NOT add airbnb/postconstruction custom backgrounds yet (later task).
- Do NOT touch the overlay gradient or StickyScrollFeatures component itself.
