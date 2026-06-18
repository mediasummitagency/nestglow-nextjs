# TASK 21 — Consolidate the three move-cleaning pages into one

## Context

The repo currently has **three** near-duplicate move-cleaning service pages:

- `src/app/services/move-in-cleaning/page.tsx`
- `src/app/services/move-out-cleaning/page.tsx`
- `src/app/services/move-in-move-out/page.tsx`  ← **canonical, keep this one**

They target overlapping keywords and ~80% of the copy is duplicated across them. This is
keyword cannibalization. The fix: keep **`move-in-move-out`** as the single combined page,
delete the other two, and 301-redirect their URLs to the survivor.

This is already half-done in the data layer:
- `src/lib/services.ts` already lists ONLY `move-in-move-out` (the two standalone pages are
  not in the registry, so nothing in the UI links to them).
- `src/app/sitemap.ts` already lists ONLY `move-in-move-out`.

So the standalone pages are effectively orphaned routes. No internal links point to them.
The remaining work is: delete them, add redirects, and tighten the survivor's copy so it
fully owns BOTH the move-in and move-out intent.

**Final service page set after this task (6 pages):**
residential · move-in-move-out · deep · commercial · post-construction · airbnb

---

## Step 1 — Delete the two standalone move pages

Delete these two directories entirely:

```
src/app/services/move-in-cleaning/
src/app/services/move-out-cleaning/
```

Leave `src/app/services/move-in-move-out/` untouched for now (copy edits come in Step 3).

---

## Step 2 — Add 301 redirects for the deleted URLs

The two old URLs may be indexed, linked from Google Business Profile, or referenced in ads.
Redirect them permanently to the combined page so we keep any SEO equity and don't serve 404s.

Edit `next.config.ts`. It's currently empty (`const nextConfig: NextConfig = {};`). Replace with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/move-in-cleaning",
        destination: "/services/move-in-move-out",
        permanent: true, // 308/301
      },
      {
        source: "/services/move-out-cleaning",
        destination: "/services/move-in-move-out",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

Note: Next.js `permanent: true` emits a 308. That is fine for SEO — Google treats 308 as a
permanent redirect equivalent to 301 and passes equity. Do not change to a custom 301 handler.

---

## Step 3 — Tighten the survivor's copy to own both intents

Open `src/app/services/move-in-move-out/page.tsx`. The page already covers both directions,
but make these specific edits so a searcher arriving from either "move in cleaning" OR
"move out cleaning" immediately sees their exact need named.

**3a. Keep the existing `h1`, `metaTitle`, `metaDescription` as-is** — they already name both.

**3b. Confirm the intro paragraph names both intents in the first two sentences.** It currently
does ("handing back the keys or picking them up"). Leave it.

**3c. Add an intent-anchor line** near the top of the intro so both search phrases appear in
body copy. Append this sentence to the END of the existing `introParagraph` string:

> " Whether you searched for move-in cleaning or move-out cleaning, this is the page — we
> handle both, and the checklist below covers everything either one requires."

**3d. Leave the three feature sections and checklist as-is.** They already cover deposit
(move-out) + unknown-history (move-in) + flexible scheduling. No change needed.

**3e. FAQs** — the existing FAQs already mix move-in and move-out questions. Leave them.

Do NOT expand the copy further. The goal is consolidation, not growth.

---

## Step 4 — Cross-linking copy (relationship acknowledgment)

To get the "bundled clarity" benefit without merging unrelated services, add light cross-links
in the copy of two OTHER pages. These reinforce how services relate:

**4a. `src/app/services/deep-cleaning/page.tsx`** — the "WHO THIS IS FOR" feature body already
says most clients start with a deep clean before recurring service. No change needed; it's good.

**4b. `src/app/services/residential-cleaning/page.tsx`** — in the `introParagraph`, after the
existing first sentence, the page should point to deep cleaning as the on-ramp. Append to the
END of the existing `introParagraph`:

> " First-time client or haven't had a professional clean in a while? Most clients start with a
> one-time deep clean to reset the baseline, then move into a recurring schedule."

(Note: do not add a hardcoded `<Link>` in the data props — `ServicePageLayout` already renders
an "Other services" grid that links to deep cleaning. This is a copy mention only.)

---

## Step 5 — Verify nothing else references the deleted slugs

Search the repo for any lingering references to the two deleted slugs and fix any you find:

```bash
grep -rn "move-in-cleaning" src/ --include="*.ts" --include="*.tsx"
grep -rn "move-out-cleaning" src/ --include="*.ts" --include="*.tsx"
```

Expected matches: only inside `next.config.ts` (the redirect `source` lines from Step 2).
If `grep` returns matches in `towns.ts`, any `[town]/page.tsx`, components, or other service
pages, update those links to point to `/services/move-in-move-out`.

Note: `src/lib/services.ts` and `src/app/sitemap.ts` should already be clean (verified during
planning) — but re-grep to be safe in case they changed.

---

## Step 6 — Build + sanity check

```bash
npm run build
```

Confirm:
- Build succeeds with no broken-import or missing-route errors.
- `move-in-cleaning/` and `move-out-cleaning/` no longer appear in the build's route list.
- `/services/move-in-move-out` still builds as a static route.

Then run locally and manually verify the redirects:
```bash
npm run dev
# visit http://localhost:3000/services/move-in-cleaning  → should 308 to /services/move-in-move-out
# visit http://localhost:3000/services/move-out-cleaning → should 308 to /services/move-in-move-out
```

---

## Out of scope (do NOT do in this task)

- Do NOT merge commercial, post-construction, deep, or airbnb into anything. They stay separate.
- Do NOT touch `ServicePageLayout.tsx` (the residential-bias layout fix is a SEPARATE task, TASK-22).
- Do NOT change tier/pricing components.
- Do NOT edit the `/services` hub card list beyond what `services.ts` already provides.

---

## Definition of done

- [ ] `move-in-cleaning/` and `move-out-cleaning/` directories deleted
- [ ] 308 redirects live in `next.config.ts` for both old URLs
- [ ] `move-in-move-out` intro updated with the intent-anchor sentence (Step 3c)
- [ ] residential intro updated with the deep-clean on-ramp sentence (Step 4b)
- [ ] `grep` confirms no orphaned references to the deleted slugs
- [ ] `npm run build` passes; redirects verified in `npm run dev`
