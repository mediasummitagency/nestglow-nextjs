# Visual & Hierarchy Audit Checklist

Work through this page by page after Briefs 1–9 ship. Mark each item as you go. Open issues go into a separate fix list.

---

## 1. Type hierarchy

For each page (homepage, /book-now, each county, each service, each town):

- [ ] Only one H1 per page
- [ ] H1 > H2 > H3 size ratio feels deliberate (not too close, not jarring)
- [ ] Body copy line-height ≥ 1.5
- [ ] Fraunces (display) used only for H1/H2 and brand moments, not body
- [ ] DM Sans used consistently for body and UI
- [ ] No more than 3 type sizes within a single section

---

## 2. Spacing rhythm

- [ ] Vertical section padding consistent across pages (py-16 md:py-24 or whatever the established token is — pick one, enforce one)
- [ ] Card internal padding consistent (p-6 or p-8 — not mixed)
- [ ] Gap between hero and first section feels intentional, not arbitrary
- [ ] Mobile spacing tightened proportionally (py-12 mobile vs py-24 desktop, or similar ratio)

---

## 3. Color & contrast

- [ ] Brand gold (#E8B86A) used only for primary CTAs and accent moments, not body links or secondary buttons
- [ ] Cream (#FBF8F3) is the dominant background, white is the contrast surface
- [ ] All text passes WCAG AA contrast on its background
- [ ] Hover states on every interactive element

---

## 4. CTA density & placement

- [ ] No page goes longer than ~600px without a CTA in view
- [ ] CTA variety across the page (mix of ZIP entry, phone, book button)
- [ ] Primary CTA on every page leads to the wizard or ZIP router
- [ ] Phone CTA visible on every page (header on desktop, sticky bar on mobile)
- [ ] Final CTA before footer on every conversion page

---

## 5. Image placement

- [ ] No placeholder boxes remain in production (especially SignatureProcess)
- [ ] All hero images optimized (Next.js Image with priority on above-fold)
- [ ] Aspect ratios consistent within a section (don't mix 4:3 and 16:9 in the same row)
- [ ] Alt text on every image, descriptive not generic

---

## 6. Tier card emphasis

- [ ] Signature Glow visibly larger / more prominent than Glow and Full Glow
- [ ] "Most Popular" badge readable at a glance
- [ ] All three CTAs visually weighted to feel comparable, with Signature slightly stronger

---

## 7. Wizard polish

- [ ] Step indicator clear about current/done/upcoming state
- [ ] Form field labels above inputs, not placeholder-only
- [ ] Error states styled, not browser default
- [ ] Soft-upgrade nudge feels suggestive, not aggressive
- [ ] Step 3 has a final reassurance moment (guarantee badge, "we'll confirm within 24 hours" copy)

---

## 8. Mobile parity

- [ ] Every page tested at 375px width (iPhone SE baseline)
- [ ] No horizontal scroll anywhere
- [ ] Tap targets ≥ 44px
- [ ] MobileStickyBar doesn't cover form inputs or critical content
- [ ] Hero ZIP input is large and thumb-friendly

---

## 9. Cross-page consistency

- [ ] Footer identical across all pages (except minimal variant on /book-now)
- [ ] Header identical across all pages (except minimal variant on /book-now)
- [ ] OfferBanner appears on every page
- [ ] Guarantee microcopy appears in the same spots on every comparable section
- [ ] Phone number format identical everywhere

---

## 10. Brand voice

- [ ] No franchise-feeling copy ("our trained professionals will...")
- [ ] First-person plural where Caroline-led ("we'll arrive...")
- [ ] Warmth preserved — no language drift toward The Maids' clinical tone
- [ ] Local references on county and town pages (real town names, not generic "your area")
