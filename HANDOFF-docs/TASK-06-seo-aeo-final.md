# TASK-06 — SEO / AEO final pass (sitemap, robots, OG, schema audit)

**Paste this into a fresh Claude Code conversation in Antigravity.**
**Run after TASK-00 through TASK-05 are all complete.**

---

You are doing the final SEO and AEO pass: building the dynamic sitemap,
robots.txt, the Open Graph image generator, auditing every page for
canonical URLs and schema, and verifying Lighthouse scores.

Project root: `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow-nextjs/`

## Step 1 — Build `src/app/sitemap.ts`

Reference: `/Users/lucasbarbosa/Desktop/claude-access/websites/summit-nextjs/src/app/sitemap.ts`
(study this first — the pattern of spreading `towns.map(...)` is what you want)

```ts
import type { MetadataRoute } from "next";
import { towns } from "@/lib/towns";
import { BASE_URL } from "@/lib/config";

// Use realistic dates rather than new Date() so Google does not see every
// page as "modified today" on every crawl — that hurts crawl prioritization.
const D = (iso: string) => new Date(iso);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core
    { url: BASE_URL, lastModified: D("2026-04-16"), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: D("2026-04-16"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: D("2026-04-16"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/book`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/reviews`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.7 },

    // Services hub + 4 service pages + comparison page
    { url: `${BASE_URL}/services`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/residential-cleaning`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/commercial-cleaning`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/deep-cleaning`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/move-in-move-out`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/general-vs-deep-cleaning`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.8 },

    // Cleaning services hub + county hubs
    { url: `${BASE_URL}/cleaning-services`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cleaning-services/monmouth-county`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cleaning-services/ocean-county`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cleaning-services/middlesex-county`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.8 },

    // Guides
    { url: `${BASE_URL}/guides`, lastModified: D("2026-04-16"), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/guides/how-much-does-house-cleaning-cost-nj`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guides/what-to-expect-move-out-cleaning`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guides/how-to-prepare-home-for-cleaner`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.7 },

    // Legal
    { url: `${BASE_URL}/privacy-policy`, lastModified: D("2026-04-16"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: D("2026-04-16"), changeFrequency: "yearly", priority: 0.2 },

    // All 20 town pages (spread from towns.ts)
    ...towns.map((town) => ({
      url: `${BASE_URL}/cleaning-services/${town.slug}`,
      lastModified: D("2026-04-16"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
```

## Step 2 — Build `src/app/robots.ts`

```ts
import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
```

## Step 3 — Build `src/app/opengraph-image.tsx`

Create a dynamic OG image for the home page (and fallback for pages without
their own). Reference Summit's opengraph-image.tsx if present.

Design:
- 1200x630 pixels
- Cream background (`#FBF8F3`)
- Large "NestGlow Co" wordmark in Fraunces (or closest serif that renders in `ImageResponse`)
- Tagline below: "Cleaning you can trust. NJ."
- Gold accent bar or element
- Small text in corner: "nestglowco.com"

Use Next.js `ImageResponse` from `next/og`. Keep it simple — edge runtime has font limitations.

For service pages, the root layout's default OG image will fall back to this one.
If time permits, build per-section OG images (one for services, one for each county hub,
one for guides) — but this is a nice-to-have, not required.

## Step 4 — Build `src/lib/schema.ts`

Consolidate all the JSON-LD generators into one file so every page imports from the same source.

Export these functions:

```ts
import { BUSINESS, BASE_URL } from "./config";
import type { TownData } from "./towns";

// Home page
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HouseCleaningService",
    "@id": BASE_URL,
    name: BUSINESS.name,
    image: `${BASE_URL}/logo.png`,
    url: BASE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      addressCountry: BUSINESS.address.country,
    },
    areaServed: BUSINESS.areaServed.map((a) => ({ "@type": "Place", name: a })),
    priceRange: "$$",
    foundingDate: String(BUSINESS.yearFounded),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "5",
    },
  };
}

// Service pages
export function generateServiceSchema(params: {
  slug: string;
  name: string;
  description: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: params.serviceType,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      url: BASE_URL,
    },
    areaServed: BUSINESS.areaServed,
    name: params.name,
    description: params.description,
    url: `${BASE_URL}/services/${params.slug}`,
  };
}

// FAQ sections — accepts any FAQ array
export function generateFAQSchema(faqs: Array<{ question?: string; q?: string; answer?: string; a?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question ?? f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer ?? f.a,
      },
    })),
  };
}

// Town pages
export function generateTownSchemas(town: TownData) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "House Cleaning Service",
      provider: { "@type": "LocalBusiness", name: BUSINESS.name, telephone: BUSINESS.phone, url: BASE_URL },
      areaServed: { "@type": "Place", name: `${town.name}, ${town.state}` },
      name: town.h1,
      description: town.metaDescription,
      url: `${BASE_URL}/cleaning-services/${town.slug}`,
    },
    generateFAQSchema(town.faqs),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Cleaning Services", item: `${BASE_URL}/cleaning-services` },
        { "@type": "ListItem", position: 3, name: `${town.county} County`, item: `${BASE_URL}/cleaning-services/${town.county.toLowerCase()}-county` },
        { "@type": "ListItem", position: 4, name: `${town.name}, NJ` },
      ],
    },
  ];
}

// Reviews
export function generateReviewSchema(review: { name: string; date: string; quote: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "HouseCleaningService", name: BUSINESS.name },
    author: { "@type": "Person", name: review.name },
    datePublished: review.date,
    reviewBody: review.quote,
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
  };
}
```

If earlier tasks defined schema inline on the page, refactor those pages to
import from `@/lib/schema` instead. One source of truth.

## Step 5 — Canonical URL audit

Walk through every page in `src/app/` and verify:

- [ ] `metadata.alternates.canonical` is set on every page
- [ ] The canonical URL uses `BASE_URL` from config (never hardcoded)
- [ ] No trailing slashes inconsistencies (either all have or all don't — pick one)
- [ ] Town pages set canonical via `generateMetadata` (not static export)
- [ ] No page uses `noindex` unexpectedly (only privacy and terms should)

## Step 6 — Open Graph audit

Every page must have, via `metadata.openGraph`:
- `title` (or inherits from `title.template`)
- `description` (specific to the page)
- `url` (canonical URL of this page)
- `type: "website"` for marketing pages, `"article"` for guide posts

Verify guide articles set `type: "article"` and add `publishedTime` / `modifiedTime`.

## Step 7 — Privacy policy + terms of service

If these were not already built in earlier tasks, create them now:

### `src/app/privacy-policy/page.tsx`

Standard privacy policy content covering:
- What we collect (contact form data, analytics)
- How we use it (to contact you about your request, service delivery, analytics)
- Third parties (Formspree, Google Analytics, GTM)
- Cookies
- Your rights
- NJ-specific privacy notice
- Contact info

Set `robots: { index: false, follow: true }` so it's not indexed but is crawlable.

### `src/app/terms-of-service/page.tsx`

Standard terms covering:
- Acceptance of terms
- Services described (informational — booking is separate)
- Accuracy of information
- Intellectual property
- Limitation of liability
- Governing law (New Jersey)
- Contact info

Same `noindex, follow` setup.

Last updated: April 2026 on both.

## Step 8 — Lighthouse and Rich Results verification

Build and test:

```bash
npm run build
npm run start
```

Then in the browser:
- Open Chrome DevTools → Lighthouse
- Run for mobile, Performance + Accessibility + Best Practices + SEO
- Target: SEO = 100, Performance > 90, Accessibility > 95

Also validate schema:
- Paste the homepage URL into Google's Rich Results Test (https://search.google.com/test/rich-results)
- Paste a town page URL
- Paste the FAQ page URL
- Paste a guide article URL
- Confirm each detects the expected schema types with zero errors

Document scores and any warnings in PROGRESS.md.

## Step 9 — Production build verification

```bash
npm run build
```

Confirm:
- Zero errors
- Zero warnings about missing metadata
- All 20 town pages generated as static HTML
- `/sitemap.xml` generated
- `/robots.txt` generated

Visit `/sitemap.xml` locally and confirm all URLs are listed.

## Step 10 — Update PROGRESS.md

- Mark TASK-06 complete
- Include Lighthouse scores for home, one service page, one town page, one guide
- List any schema warnings that remain
- Flag any pages that didn't hit SEO = 100 and why

## Rules

- Use `BASE_URL` from config everywhere — never hardcode `https://nestglowco.com`
- Every page exports metadata (no exceptions)
- All JSON-LD comes from `src/lib/schema.ts` (one source of truth)
- `sitemap.ts` uses dated `lastModified` values — do NOT use `new Date()` (it makes every page look "modified today" every build, which hurts crawl prioritization)
- If you find pages missing canonicals, fix them — don't leave TODOs
