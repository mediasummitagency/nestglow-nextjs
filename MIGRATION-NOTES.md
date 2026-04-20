# NestGlow Co — Migration Notes

## Current status
- Old site: archived at `/Users/lucasbarbosa/Desktop/claude-access/archives/nestglow-old-site-archive-2026-04-20.tar.gz`
- New site: this repo (`websites/nestglow-nextjs/`)
- Production domain: nestglowco.com (currently still pointing to Hostinger old site)

## Hosting migration checklist (for Lucas)

### Before switching DNS

- [ ] Deploy new site to Vercel
- [ ] Populate `src/lib/config.ts` with real values:
  - `TRACKING.gtmId` (GTM container ID)
  - `TRACKING.ga4Id` (GA4 measurement ID)
  - `TRACKING.googleAdsId` (Google Ads conversion ID)
  - `FORMS.quickQuote` (quick-quote Formspree endpoint, once created)
- [ ] Verify `FORMS.booking` is still set to `https://formspree.io/f/xnngyenw`
- [ ] Replace placeholder hero image with real Caroline/team photo
- [ ] Add real Google Business Profile URL to reviews page

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

## Keep/Remove summary

| Kept | Rebuilt | Removed |
|------|---------|---------|
| Formspree endpoint `xnngyenw` | Booking form (React) | 4 MB of Gemini images |
| Phone (732) 614-0192 | Hero / sections | TemplateMo HTML template |
| Email nestglowco@gmail.com | Navigation | jQuery, Bootstrap 4 |
| 5 real testimonials | Review display | owl-carousel, isotope, animation.js |
| General-vs-Deep comparison content | Comparison page `/general-vs-deep-cleaning` | Dead Login/Register modal |
| Favicons | Regenerated via Next.js | test.html, book-cleaning.html, cleaning-calculator.html |
