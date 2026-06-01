# MASTER PROMPT — NestGlow Co Next.js Rebuild

> **Read this file first. Do NOT paste this entire file into Claude Code.**
> This is the project brief. The actual Claude Code prompts live in the
> `TASK-*.md` files and are designed to be pasted one at a time.

---

## Business brief

**NestGlow Co** is a residential and commercial cleaning company owned by Caroline,
serving Monmouth, Ocean, and Middlesex Counties in New Jersey. The business has a
team of cleaners — Caroline is the business owner, not the sole operator.

**Use "we" / "our team" throughout.** Caroline appears as the founder/owner in the
About section but the voice of the site is team-first, not first-person-solo.

The current site at `nestglowco.com` is a single-page TemplateMo theme with
hash-anchor navigation. It has:
- Empty `<meta name="description">` (Google literally cannot describe the page)
- No schema markup
- No sitemap
- No town-specific content
- One page pretending to be five (all sections on `index.html` under `#services`, `#about`, etc.)
- A working Formspree booking form at endpoint `xnngyenw`
- 5 real testimonials (Eileen S., Jeffrey R., Greg A., Elena H., Danny H.) spanning 2020-2025
- A very solid "General vs. Deep Clean" comparison table — this is AEO gold and we keep it
- 4 MB of unused Gemini-generated images in the root folder (dead weight)
- A dead Login/Register modal from the template (removed)
- 790 KB of unused jQuery/Bootstrap/owl-carousel/isotope JavaScript (removed)

---

## Architecture decisions

### Stack

- **Next.js 16** (app router) — same version as Summit
- **React 19** with React Compiler enabled
- **Tailwind CSS 4** with shadcn/ui component primitives
- **TypeScript** strict mode
- **Framer Motion** for tasteful animations (used sparingly — not every element needs to fade in)
- **Lucide React** for icons (NOT Font Awesome)
- **next/font** for Google Fonts (no CDN link tags)
- **Formspree** for the booking form (existing endpoint: `xnngyenw`)
- **Vercel** for hosting (same pattern as Summit / Gorsegner Next.js setups)

### Folder structure (mirrors Summit)

```
nestglow-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx                          # Root layout, fonts, GTM
│   │   ├── page.tsx                            # Home
│   │   ├── globals.css                         # Tailwind + design tokens
│   │   ├── sitemap.ts                          # Dynamic sitemap (all towns)
│   │   ├── robots.ts                           # robots.txt
│   │   ├── opengraph-image.tsx                 # Dynamic OG image
│   │   ├── not-found.tsx                       # 404 page
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── book/page.tsx                       # Dedicated booking page (form)
│   │   ├── services/
│   │   │   ├── page.tsx                        # Services hub
│   │   │   ├── residential-cleaning/page.tsx
│   │   │   ├── commercial-cleaning/page.tsx
│   │   │   ├── deep-cleaning/page.tsx
│   │   │   └── move-in-move-out/page.tsx
│   │   ├── general-vs-deep-cleaning/page.tsx   # AEO comparison page
│   │   ├── cleaning-services/
│   │   │   ├── page.tsx                        # County + town hub (like Summit's /flooring)
│   │   │   ├── monmouth-county/page.tsx
│   │   │   ├── ocean-county/page.tsx
│   │   │   ├── middlesex-county/page.tsx
│   │   │   └── [town]/page.tsx                 # Dynamic town pages
│   │   ├── guides/
│   │   │   ├── page.tsx                        # Guides hub
│   │   │   ├── how-much-does-house-cleaning-cost-nj/page.tsx
│   │   │   ├── what-to-expect-move-out-cleaning/page.tsx
│   │   │   └── how-to-prepare-home-for-cleaner/page.tsx
│   │   ├── faq/page.tsx                        # FAQPage schema
│   │   ├── reviews/page.tsx                    # Testimonials + link to Google reviews
│   │   ├── privacy-policy/page.tsx
│   │   └── terms-of-service/page.tsx
│   ├── components/
│   │   ├── ui/                                 # shadcn primitives (button, input, etc.)
│   │   ├── layout/
│   │   │   ├── SiteNav.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── TrustBar.tsx                    # Insured, bonded, 10+ years
│   │   │   ├── ComparisonTable.tsx             # General vs Deep
│   │   │   ├── Testimonials.tsx
│   │   │   ├── HowItWorks.tsx                  # 3-step process
│   │   │   ├── FAQAccordion.tsx
│   │   │   ├── ServiceAreas.tsx
│   │   │   └── CTA.tsx
│   │   ├── forms/
│   │   │   ├── QuickQuoteForm.tsx              # Small home-hero form
│   │   │   └── BookingForm.tsx                 # Full /book page form
│   │   └── local/
│   │       ├── TownHero.tsx
│   │       ├── TownFAQ.tsx
│   │       └── TownCTA.tsx
│   └── lib/
│       ├── config.ts                           # Phone, email, URLs, brand
│       ├── towns.ts                            # All 20 town data objects
│       ├── schema.ts                           # JSON-LD generators
│       └── utils.ts                            # cn() helper
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   └── site.webmanifest
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── components.json                             # shadcn config
```

### Design tokens

The existing site uses a cyan/blue gradient (`#4facfe` → `#00f2fe`) that reads
"generic tech SaaS." We are moving NestGlow toward a warmer residential palette
that matches the business name (glow, nest, home). Exact tokens in TASK-00.

**Palette direction (to be refined in TASK-00):**
- Primary warm accent: a soft gold/amber `#E8B86A` (think candlelight, not Summit's harder amber)
- Deep charcoal text: `#1F1B16` (warm black, not pure `#000`)
- Cream background: `#FBF8F3` (off-white, not stark)
- Sage or mauve secondary accent: `#A8B5A0` (trust, calm)
- Error/CTA: `#C0614A` (warm terracotta for urgency)

**Fonts:**
- Display: `Fraunces` or `Playfair Display` (warm serif for headings)
- Body: `DM Sans` (same as Summit — clean geometric sans)

### Routing and navigation

**Primary nav:**
- Home
- Services (dropdown: Residential, Commercial, Deep Cleaning, Move In/Out)
- Service Areas (dropdown: Monmouth, Ocean, Middlesex County hubs)
- About
- Guides
- Book Cleaning (CTA button)

**Mobile nav:** Drawer pattern, same as Summit.

**Footer:** Full site map including all town pages, FAQ, reviews, guides.

### SEO/AEO foundation

Every page needs:
- Unique `<title>` under 60 characters
- Unique meta description 140-155 characters
- Canonical URL
- Open Graph tags (title, description, image, url, type)
- Twitter card tags
- Appropriate robots directive
- Schema.org JSON-LD (LocalBusiness on home, Service on service pages, FAQPage on FAQ, etc.)

Sitemap and robots are generated dynamically via `sitemap.ts` and `robots.ts` (not static XML).

---

## Voice and tone

**Do:**
- Write team-first: "we bring", "our team", "our cleaners"
- Keep it warm and residential — this is someone's home, not a server rack
- Use concrete details: "10+ years", "insured and bonded", "satisfaction guarantee"
- Lead with trust signals in every section
- Reference towns and neighborhoods by name

**Do not:**
- Overpromise pricing (we have pricing ranges, not flat rates)
- Use corporate-speak ("synergize", "solutions", "best-in-class")
- Use generic cleaning stock imagery descriptions
- Write in first person singular ("I will clean your home") — Caroline has a team
- Add emoji anywhere in the actual copy

---

## Tracking setup (per Lucas)

- **Separate GA4 + Google Ads property for NestGlow** (not unified with Summit)
- Placeholder IDs in `src/lib/config.ts` — Lucas will populate after Google Ads account setup
- Use the Summit GTM pattern: two containers loaded via `next/script`, one `afterInteractive`, one `lazyOnload`
- Conversion events: `form_submit`, `phone_click`, `book_cleaning_click`, `quick_quote_submit`

---

## Success criteria

The site is ready to hand off to Lucas for hosting when:

- [ ] All 10+ static routes render without errors
- [ ] All 20 town pages render via `[town]/page.tsx` dynamic route
- [ ] Sitemap at `/sitemap.xml` includes every page
- [ ] robots.txt at `/robots.txt` points to sitemap
- [ ] Lighthouse Performance > 90 on mobile for home page
- [ ] Lighthouse SEO = 100 on every page
- [ ] All images use `next/image` with proper width/height
- [ ] Booking form submits successfully to Formspree `xnngyenw` endpoint
- [ ] Quick quote form submits successfully to Formspree (new endpoint — TBD by Lucas)
- [ ] All phone numbers are `tel:` links
- [ ] All email addresses are `mailto:` links
- [ ] No console errors in dev or production build
- [ ] Schema validator passes on home, service pages, FAQ, and one town page

---

## PROGRESS.md convention

Claude Code should create and maintain a `PROGRESS.md` file in the project root
that tracks:
- Which tasks have been completed
- Any decisions deviated from this master prompt (with reason)
- Any blockers waiting on Lucas (logo files, photos, analytics IDs, etc.)
- Any TODOs for later

Same pattern as Summit's `PROGRESS.md`.

---

## Reference projects in the same repo

- **Summit Next.js:** `/Users/lucasbarbosa/Desktop/claude-access/websites/summit-nextjs/`
  — use as the architectural reference. Do NOT copy Summit's design or copy. Only the
  structural patterns (`lib/towns.ts` shape, `[town]/page.tsx` layout, `sitemap.ts`
  pattern, GTM script loading, schema generators).
- **Gorsegner:** `/Users/lucasbarbosa/Desktop/claude-access/websites/gorsegner/`
  — vanilla HTML reference for comparison. Not relevant to this rebuild.

When in doubt on a pattern, check Summit's implementation first.
