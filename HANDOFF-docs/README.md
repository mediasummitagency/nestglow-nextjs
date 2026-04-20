# NestGlow Co — Next.js Rebuild

Handoff package for Claude Code to rebuild the NestGlow Co website from the current
TemplateMo "chain-app-dev" theme into a clean, SEO/AEO-optimized Next.js application
mirroring the Summit Home Services architecture.

---

## Project context

- **Current live site:** https://nestglowco.com (TemplateMo theme, static HTML,
  Bootstrap 4 + jQuery, hosted on Hostinger)
- **Current repo location:** `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/`
- **NEW project location:** `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow-nextjs/`
  (sibling folder — we are NOT editing the current site in place)
- **Business:** NestGlow Co — residential & commercial cleaning, NJ
- **Owner:** Caroline (business owner) — team-first language throughout ("we / our team")
- **Service area:** Monmouth, Ocean, and Middlesex Counties, NJ
- **Stack target:** Next.js 16 + React 19 + Tailwind 4 + shadcn/ui (same as Summit)
- **Form backend:** Formspree `https://formspree.io/f/xnngyenw` (already set up, keep)
- **Phone:** (732) 614-0192
- **Email:** nestglowco@gmail.com

---

## Why Next.js (not vanilla HTML)

Nestglow is committing to 20+ town pages for local SEO. Hand-authoring 20 HTML
files means 20 places to update the phone number, 20 places to fix header typos,
20 places where copy drifts out of sync. A `[town]/page.tsx` dynamic route with
a `towns.ts` data file = one template, one data source.

This is the same trade-off we made on Summit, and we know it works.

---

## How to use these task files

Each task file is a self-contained prompt. Paste it into Claude Code
(in Google Antigravity IDE) as a new conversation. Run them in order.

**Task 00** must run first (scaffold).
**Tasks 01–06** can run sequentially. Task 04 (town pages) depends on Task 02 (services).
**Task 07** is cleanup — run last, after everything else is verified working.

---

## Task file order

1. **MASTER-PROMPT.md** — Full project context + architecture decisions. Read this first
   (it is the "why" document, not a prompt to paste).
2. **TASK-00-scaffold.md** — Create the Next.js project, install deps, set up layout,
   folder structure, design tokens, globals.css, fonts, Formspree env, GTM placeholder.
3. **TASK-01-home-and-core-pages.md** — Home page, About, Contact, 404.
4. **TASK-02-services.md** — Residential / Commercial / Deep Cleaning / Move In-Out,
   plus the General vs. Deep Clean comparison page (AEO anchor).
5. **TASK-03-booking-form.md** — Migrate the existing Formspree booking form to
   `/book` as a dedicated page, add conversion tracking, add a lightweight
   quick-quote form for the home hero.
6. **TASK-04-town-pages.md** — `lib/towns.ts`, `[town]/page.tsx` dynamic route,
   county hubs. All 20 towns seeded.
7. **TASK-05-guides-and-faq.md** — FAQ page with FAQPage schema, guides hub,
   3 starter guide articles.
8. **TASK-06-seo-aeo-final.md** — sitemap.ts, robots.ts, LocalBusiness + Service
   schema, Open Graph, canonicals, review the full site.
9. **TASK-07-cleanup-old-site.md** — Archive the old TemplateMo site, delete the
   4 MB of unused Gemini images, document the Hostinger → new-host migration steps.

---

## Design direction

The current site leans "generic blue tech template." We are moving it toward
"warm, residential, trustworthy" — more in the spirit of a high-end residential
brand than the Summit masculine dark/amber look.

Exact tokens are in **TASK-00-scaffold.md**.

---

## What is staying, what is changing

**Staying:**
- Formspree endpoint `xnngyenw`
- Phone, email, business name
- Caroline's 5 existing testimonials (with real names/dates)
- The General vs. Deep Clean comparison table content
- The detailed booking form structure (it is actually good)

**Changing:**
- Framework: TemplateMo HTML to Next.js
- Design: generic blue tech to warm residential
- Navigation: hash anchors (`#services`) to real URLs (`/services/residential`)
- SEO: empty meta tags to full schema + OG + canonicals + sitemap
- Reach: one page, no town targeting to 20+ town pages + county hubs

**Removing:**
- The dead Login/Register modal (template leftover)
- `test.html` (dev leftover)
- All 4 MB of unused Gemini-generated images in root
- jQuery, Bootstrap, owl-carousel, isotope, animation.js
- The 192 KB `logo.svg` (likely has embedded raster — needs to be exported fresh)

---

## Unknowns to resolve during the build

- **Logo:** The existing `logo.svg` is 192 KB which suggests it has embedded raster
  image data inside the SVG (defeats the point). TASK-00 calls for regenerating
  a clean SVG. If no cleaner version exists, fall back to `logo.png` and defer.
- **Hero image:** A Caroline + team photo does not exist yet. Use a neutral
  placeholder (light airy interior, no staged models) and flag in PROGRESS.md
  that it needs a real photo shoot before launch.
- **Google Business Profile:** Being handled separately by Lucas (per brief). No
  action on this in the website build.
- **Domain / hosting:** Lucas is handling hosting. Build assumes `nestglowco.com`
  as canonical. Flag any hosting-specific config questions in PROGRESS.md.
