# NestGlow Co — Build Progress

## Build complete (2026-04-20)

All 8 tasks complete. Site ready for hosting deployment.

Open items for Lucas before launch:
- Populate tracking IDs (GTM, GA4, Google Ads) in `src/lib/config.ts`
- Create quick-quote Formspree endpoint and set `FORMS.quickQuote`
- Replace hero placeholder with real Caroline/team photo
- Add Google Business Profile URL to reviews page
- Deploy to Vercel
- Update DNS to point nestglowco.com at new deployment
- Submit sitemap to Google Search Console and Bing Webmaster Tools

See `MIGRATION-NOTES.md` for the full DNS migration checklist.

## Completed
- [x] TASK-00: Scaffold (done 2026-04-17)
- [x] TASK-01: Home, About, Contact, 404, SiteNav, Footer, MobileNav
- [x] TASK-02: Service pages (residential, commercial, deep, move in/out, general-vs-deep)
- [x] TASK-03: Booking form (/book)
- [x] TASK-04: Town pages (20 towns) + county hubs + /cleaning-services hub
- [x] TASK-05: FAQ, Reviews, Guides hub, 3 guide articles
- [x] TASK-06: Sitemap, robots.txt, OG image, privacy policy, terms, schema audit
- [x] TASK-07: Old site archived + deleted, HANDOFF-docs moved, MIGRATION-NOTES.md created

## Open questions / blockers for Lucas
- [ ] GA4 measurement ID (populate `TRACKING.ga4Id` in `src/lib/config.ts`)
- [ ] Google Ads conversion ID (populate `TRACKING.googleAdsId`)
- [ ] GTM container ID (populate `TRACKING.gtmId`)
- [ ] Quick-quote Formspree endpoint (populate `FORMS.quickQuote`)
- [ ] Logo decision: existing `logo.svg` is 192 KB with likely embedded raster. Need either a fresh SVG export or confirmation to use `logo.png`.
- [ ] Hero image: Caroline + team photo does not exist yet. Needed before launch.
- [ ] Google Business Profile URL (for reviews page)
- [ ] Vercel account setup + DNS migration from Hostinger

## Deviations from master prompt
(none)
