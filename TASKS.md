# NestGlow Co — Open Items

P0 / P1 work is complete. This file tracks what's actually still open.

---

## Code tasks (P2 — post-launch polish)

### TASK-13: Services hub expansion
- [ ] Per-service detail blocks (photo + description + "what's included" bullets) replacing flat card grid
- [ ] Pricing range callout band

### TASK-14: Footer expansion
- [ ] Expand service areas column from 4 county links → all 22 towns

### TASK-15: Reviews page enhancements
- [ ] Add platform badges (Verified Google, etc.)
- [ ] Reframe "5 reviews" count to tenure-based framing
- [ ] Add Google Business Profile link (Lucas to provide URL)

### TASK-16: Contact page expansion
- [ ] Add hours of operation (Lucas to provide)
- [ ] Add embedded contact form (Formspree)

### TASK-17: FAQ internal links
- [ ] Add links from FAQ answers to relevant detail pages

### TASK-18: Verify unread pages
- [ ] Commercial cleaning service page
- [ ] Deep cleaning service page
- [ ] Move in/out service page
- [ ] `/cleaning-services` hub page
- [ ] County hub pages (Monmouth, Ocean, Middlesex)
- [ ] General vs Deep page
- [ ] Guides hub + 3 articles
- [ ] 404, privacy policy, terms of service

---

## Human actions (Lucas — required before / after deploy)

- [ ] Populate `TRACKING.gtmId` in `src/lib/config.ts` (e.g. "GTM-XXXXXXX")
- [ ] Populate `TRACKING.ga4Id` in `src/lib/config.ts` (e.g. "G-XXXXXXXXXX")
- [ ] Populate `TRACKING.googleAdsId` in `src/lib/config.ts` (e.g. "AW-XXXXXXXXXX")
- [ ] Create Formspree quick-quote form and populate `FORMS.quickQuote` in `src/lib/config.ts`
- [ ] Replace hero placeholder with real Caroline/team photo
- [ ] Add Caroline portrait photo (about page)
- [ ] Provide Google Business Profile URL (reviews page)
- [ ] Deploy to Vercel + switch DNS (see `MIGRATION-NOTES.md`)
- [ ] Submit sitemap to Google Search Console + Bing Webmaster Tools

---

## Visual audit

See `HANDOFF-docs/TASK-09-visual-audit-checklist.md` — not yet started.

---

*Completed work: TASK-08 through TASK-12 done. Build-time briefs (TASK-00 through TASK-07) archived in `HANDOFF-docs/_archive/`.*
