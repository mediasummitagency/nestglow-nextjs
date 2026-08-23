# NestGlow Co — Migration Notes

> **Recovered 2026-08-22.** This file was deleted from the repo in commit `8d89d16` along
> with `TASKS.md`. It is the actual step-by-step for the DNS cutover, so it belongs here.
> Updated below to match the four-route site (`/about` parked 2026-08-22).

## Current status
- Old site: **the archive is missing.** `MIGRATION-NOTES` used to point at
  `claude-access/archives/nestglow-old-site-archive-2026-04-20.tar.gz`; that file no longer
  exists anywhere in the vault. **Re-pull a copy from Hostinger before touching DNS** — there
  is currently nothing to roll back to.
- New site: this repo (`websites/nestglow-nextjs/`)
- Production domain: nestglowco.com (currently still pointing to Hostinger old site)

## Hosting migration checklist (for Lucas)

### Before switching DNS

- [ ] Deploy new site to Vercel
- [ ] Populate `src/lib/config.ts` with real values:
  - `TRACKING.gtmId` (GTM container ID) — **the only tracking ID this repo takes.** GA4 and
    Google Ads conversions are tags inside the container, not site-level scripts.
- [ ] Verify `FORMS.booking` is still set to `https://formspree.io/f/xnngyenw` — the
      `/contact` form posts here
- [ ] Replace placeholder hero image with real Caroline/team photo
- [ ] Add the Google Business Profile URL to `BUSINESS.socials` and into the business schema
- [ ] Send one real test submission and confirm it lands in Caroline's inbox
- [ ] Settle the guarantee wording — "100% satisfaction" vs "24-hour satisfaction" are both
      in use and mean different things

> `FORMS.quickQuote` is no longer needed. The quick-quote form was parked; `/contact` is the
> single form and it uses `FORMS.booking`.

### DNS switch

1. In Vercel, add `nestglowco.com` as a custom domain
2. In Hostinger DNS, update A / CNAME records to point to Vercel
3. Wait for SSL to provision (usually under 10 min)
4. Verify site loads at `https://nestglowco.com` with valid cert
5. Submit new sitemap to Google Search Console: `https://nestglowco.com/sitemap.xml`
6. Request recrawl of the old top-ranking URLs in Search Console

### After DNS switch

- [ ] Verify Google Analytics is firing (real-time events)
- [ ] Verify form submissions still reach Formspree inbox
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Update any social profile links that pointed to the old Hostinger site

### Note on old URL structure

The old site was single-page with hash anchors (`#services`, `#about`). There are
likely few real external links to those hash URLs. If any exist, they'll land on the
new home page — acceptable fallback behavior.

### Note on the parked routes

The new site launches with four routes. Eighteen others are parked at
`claude-access/projects/summit-media/clients/nestglow/website/parked-for-phase-2/` and now
404. **No redirects were added and none are needed** — the new site was never live, so
nothing external points at those URLs. Do not add redirects for them; if any come back, they
come back at the same paths.

## Keep/Remove summary

| Kept | Rebuilt | Removed |
|------|---------|---------|
| Formspree endpoint `xnngyenw` | Booking form (React) | 4 MB of Gemini images |
| Phone (732) 614-0192 | Hero / sections | TemplateMo HTML template |
| Email nestglowco@gmail.com | Navigation | jQuery, Bootstrap 4 |
| 5 real testimonials | Review display | owl-carousel, isotope, animation.js |
| General-vs-Deep comparison content | Comparison page `/general-vs-deep-cleaning` | Dead Login/Register modal |
| Favicons | Regenerated via Next.js | test.html, book-cleaning.html, cleaning-calculator.html |
