# TASK-02 — Service pages + General vs. Deep Clean comparison page

**Paste this into a fresh Claude Code conversation in Antigravity.**
**Run after TASK-01 is complete.**

---

You are building five content pages:
1. `/services` (services hub)
2. `/services/residential-cleaning`
3. `/services/commercial-cleaning`
4. `/services/deep-cleaning`
5. `/services/move-in-move-out`
6. `/general-vs-deep-cleaning` (AEO-optimized comparison page, its own top-level route)

Project root: `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow-nextjs/`

## Shared page structure

Every service page follows the same skeleton. Build a reusable `ServicePageLayout`
component at `src/components/layout/ServicePageLayout.tsx` that takes these props:

```tsx
type ServicePageProps = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  introParagraph: string;       // first paragraph, answer-ready for AEO
  whatsIncluded: string[];      // bullet list
  bestFor: string[];            // bullet list ("best for [scenario]")
  priceNote: string;            // e.g. "Pricing varies by property size"
  faqs: Array<{ q: string; a: string }>;
  schemaServiceType: string;    // e.g. "Residential Cleaning Service"
};
```

The layout renders:

1. **Breadcrumb** (Home / Services / [current])
2. **Hero section** — eyebrow + H1 + intro + primary CTA (Book Cleaning) + secondary (Quick Quote)
3. **What's included** — two-column checklist
4. **Best for** — scenarios this service suits
5. **Pricing transparency block** — explains general price ranges
6. **Trust bar** (re-use from home)
7. **Mini testimonials** — 2-3 reviews (reuse from home)
8. **FAQ accordion** — service-specific Q&A
9. **Final CTA**
10. **Schema.org Service + FAQPage JSON-LD**

Every service page needs these schema blocks:

```ts
// Service schema
{
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: schemaServiceType,
  provider: {
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    telephone: BUSINESS.phone,
    url: BASE_URL,
  },
  areaServed: BUSINESS.areaServed,
  name: h1,
  description: metaDescription,
  url: `${BASE_URL}/services/${slug}`,
}

// FAQPage schema (separate JSON-LD block)
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
}
```

## Page 1: `/services` (hub)

`src/app/services/page.tsx`

### Metadata

```ts
export const metadata = {
  title: "Cleaning Services",
  description: "Residential, commercial, deep cleaning, and move in/out services across Monmouth, Ocean, and Middlesex County, NJ. Transparent pricing and a satisfaction guarantee.",
  alternates: { canonical: `${BASE_URL}/services` },
};
```

### Structure

1. Breadcrumb: Home / Services
2. Hero: H1 "Cleaning services for homes and businesses in NJ"
3. Four-card grid (same as home's services grid, but with longer descriptions)
4. "Not sure what you need?" row → links to `/general-vs-deep-cleaning`
5. Final CTA

## Page 2: Residential Cleaning

`src/app/services/residential-cleaning/page.tsx`

Call `ServicePageLayout` with these props:

```ts
{
  slug: "residential-cleaning",
  h1: "Residential Cleaning in Monmouth, Ocean & Middlesex County",
  metaTitle: "Residential House Cleaning in NJ",
  metaDescription: "Recurring and one-time house cleaning for NJ homes. Weekly, bi-weekly, or monthly. Insured, bonded, and guaranteed. Serving Monmouth, Ocean, and Middlesex County.",
  introParagraph: "NestGlow Co provides residential cleaning services for homes across Monmouth, Ocean, and Middlesex County, NJ. Our team handles weekly, bi-weekly, and monthly maintenance cleans, as well as one-time deep cleans, with the same care and consistency every visit. We are fully insured and bonded, and every clean is backed by a 24-hour satisfaction guarantee.",
  whatsIncluded: [
    "Dusting of all surfaces, including baseboards and door frames",
    "Kitchen — countertops, appliance exteriors, sink, and floor",
    "Bathrooms — tub, shower, toilet, sink, and mirrors",
    "Bedrooms — dusting, vacuuming, and surface polish",
    "Floors — swept, mopped, and vacuumed throughout",
    "Trash removed and bins wiped",
  ],
  bestFor: [
    "Busy families who want to reclaim their weekends",
    "Working professionals who value a clean, consistent home",
    "Hosts preparing for guests or events",
    "Anyone who wants cleaning off their to-do list for good",
  ],
  priceNote: "Residential cleans start around $120 for smaller spaces and scale with bedroom count, bathroom count, and square footage. Our team provides a firm quote after you submit the booking form, before any cleaning begins.",
  faqs: [
    {
      q: "How often should I schedule a cleaning?",
      a: "Most of our residential clients book weekly or bi-weekly cleans. Weekly works well for homes with kids or pets; bi-weekly is a good fit for smaller households or couples. Monthly is available for lighter maintenance needs. You can adjust frequency any time.",
    },
    {
      q: "Do you bring your own cleaning supplies?",
      a: "Yes. Our team arrives with all the supplies and equipment needed for a full clean. If you have specific products you prefer — green cleaners, fragrance-free formulas, or anything else — let us know and we'll use yours instead.",
    },
    {
      q: "Do I need to be home during the cleaning?",
      a: "Not at all. Many of our regular clients provide a key or garage code, and our team is background-checked and fully insured. We'll send arrival reminders before each clean so you always know when to expect us.",
    },
    {
      q: "What if I'm not satisfied with a cleaning?",
      a: "Let us know within 24 hours and our team will come back to make it right. We stand behind every visit — our goal is to give you a clean space you can actually relax in, not a surface-level touch-up.",
    },
    {
      q: "Can I request specific areas to focus on?",
      a: "Absolutely. When you book, there's a notes section to flag priorities — baseboards, windows, inside-cabinets, upholstery, anything specific. Our team reviews your notes before every visit.",
    },
  ],
  schemaServiceType: "Residential House Cleaning Service",
}
```

## Page 3: Commercial Cleaning

`src/app/services/commercial-cleaning/page.tsx`

```ts
{
  slug: "commercial-cleaning",
  h1: "Commercial Cleaning for NJ Offices, Retail, and Professional Suites",
  metaTitle: "Commercial Cleaning Services in NJ",
  metaDescription: "Office, retail, and professional suite cleaning across Monmouth, Ocean, and Middlesex County, NJ. After-hours and recurring schedules available. Insured and bonded.",
  introParagraph: "NestGlow Co provides commercial cleaning services for offices, retail storefronts, and professional suites in Monmouth, Ocean, and Middlesex County, NJ. We build cleaning schedules around your business hours — including after-hours and weekend service — and provide consistent, professional-grade cleaning backed by full insurance and bonding.",
  whatsIncluded: [
    "Shared areas — reception, breakrooms, conference rooms",
    "Desk and workstation cleaning (as requested)",
    "Restroom deep cleaning and sanitization",
    "Kitchen and break-room maintenance",
    "Floor care — sweeping, mopping, vacuuming",
    "Trash and recycling removal",
  ],
  bestFor: [
    "Small to mid-sized offices needing weekly or bi-weekly service",
    "Retail storefronts wanting a customer-ready space every morning",
    "Professional suites where cleanliness signals professionalism",
    "Businesses that need after-hours cleaning to avoid disrupting staff",
  ],
  priceNote: "Commercial pricing depends on square footage, frequency, and scope. We provide custom quotes after a brief walk-through of your space — not over the phone.",
  faqs: [
    {
      q: "Do you offer after-hours or weekend cleaning?",
      a: "Yes. Most of our commercial clients prefer after-hours or weekend service to avoid disrupting their staff. We build the schedule around your operating hours and provide secure key/code handling for access.",
    },
    {
      q: "How do you handle confidential workspaces?",
      a: "Our team is background-checked and fully insured. For sensitive environments — law firms, healthcare offices, financial suites — we can sign confidentiality agreements and restrict which team members have access to your space.",
    },
    {
      q: "What's the minimum commercial contract?",
      a: "We don't require long-term contracts. You can start with a one-time deep clean, then decide whether to move into a recurring weekly or monthly schedule. Most of our commercial clients start with a trial clean to see if we're the right fit.",
    },
    {
      q: "Are you insured for commercial properties?",
      a: "Yes. NestGlow Co carries full general liability insurance and is bonded, which is standard for commercial cleaning contracts. We can provide a certificate of insurance naming your business or property manager as an additional insured.",
    },
    {
      q: "Do you clean carpets, windows, or floors as separate services?",
      a: "Yes. We offer carpet cleaning, window cleaning, and specialized floor care as add-ons to recurring commercial service, or as standalone one-time services. Mention what you're interested in during your walk-through and we'll include it in the custom quote.",
    },
  ],
  schemaServiceType: "Commercial Cleaning Service",
}
```

## Page 4: Deep Cleaning

`src/app/services/deep-cleaning/page.tsx`

```ts
{
  slug: "deep-cleaning",
  h1: "Deep Cleaning in Monmouth, Ocean & Middlesex County, NJ",
  metaTitle: "Deep House Cleaning Services in NJ",
  metaDescription: "Top-to-bottom deep cleaning for NJ homes. First-time cleans, seasonal refreshes, pre-guest and post-construction. Fully insured with a 24-hour satisfaction guarantee.",
  introParagraph: "Our deep cleaning service is a thorough, top-to-bottom reset of your home — the kind of clean that hits the spots a regular maintenance clean doesn't cover. It's the right choice for first-time cleans, seasonal refreshes, pre-guest preparation, or any time your home needs more than surface care. Our team handles everything from inside appliances to baseboards to blind slats.",
  whatsIncluded: [
    "All surfaces dusted in detail, including ceiling fans and vents",
    "Baseboards, door frames, and woodwork hand-wiped",
    "Light switches and doorknobs cleaned and disinfected",
    "Kitchen — interior microwave, degreased backsplash, cabinet exteriors",
    "Bathrooms — deep grout scrub, polished fixtures, detailed toilet cleaning",
    "Bedrooms — under-bed cleaning, closet vacuuming, furniture polish",
    "Blinds dusted, window sills hand-wiped",
    "Floors — detailed mopping, edge cleaning",
  ],
  bestFor: [
    "First-time clients who want a full reset before starting regular service",
    "Seasonal refreshes (spring cleaning, end-of-summer)",
    "Pre-holiday prep when guests are coming",
    "Post-renovation or post-construction cleanup",
    "Homes that haven't been professionally cleaned in a while",
  ],
  priceNote: "Deep cleaning adds approximately $150 to a standard clean and takes longer on-site. Final pricing scales with home size and condition — we'll give you the exact number after you submit the booking form.",
  faqs: [
    {
      q: "How is deep cleaning different from general cleaning?",
      a: "Deep cleaning covers everything in a general clean plus the details that usually get skipped — inside microwave, behind and under furniture, detailed grout scrubbing, blind dusting, and more. The easiest way to think about it: general is maintenance, deep is restoration. See our full comparison at /general-vs-deep-cleaning.",
    },
    {
      q: "How long does a deep clean take?",
      a: "Most deep cleans take 4-8 hours depending on home size and condition. A 2-bedroom apartment might take 4-5 hours; a 3,000+ sq ft home can run a full day. We'll give you an accurate estimate during booking.",
    },
    {
      q: "Do I need a deep clean before starting regular service?",
      a: "Usually, yes — especially if your home hasn't been professionally cleaned recently. A deep clean sets the baseline so recurring maintenance cleans stay manageable. After the initial deep clean, general cleans are usually enough to keep things looking great.",
    },
    {
      q: "Can you do a deep clean and a regular clean on different frequencies?",
      a: "Yes. Many clients book a deep clean quarterly or seasonally, and regular cleans weekly or bi-weekly in between. We can set up a recurring schedule that automatically swaps in a deep clean at the right interval.",
    },
    {
      q: "Do you clean inside the oven and refrigerator?",
      a: "Inside microwave is included in our deep clean. Inside oven and inside refrigerator are optional add-ons ($30 each) — available on both deep cleans and regular cleans.",
    },
  ],
  schemaServiceType: "Deep Cleaning Service",
}
```

## Page 5: Move In / Move Out

`src/app/services/move-in-move-out/page.tsx`

```ts
{
  slug: "move-in-move-out",
  h1: "Move In / Move Out Cleaning in NJ",
  metaTitle: "Move In & Move Out Cleaning Services in NJ",
  metaDescription: "Professional move in / move out cleaning for Monmouth, Ocean, and Middlesex County, NJ. Empty-home deep cleans for sellers, buyers, landlords, and tenants. Insured and bonded.",
  introParagraph: "A move in / move out clean is a thorough, empty-home deep clean designed to hand a property over in its best possible condition — whether you're selling, buying, renting, or ending a lease. NestGlow Co handles move in / move out cleans across Monmouth, Ocean, and Middlesex County, NJ, and our team comes prepared to tackle everything inside cabinets, behind appliances, and along the spots regular maintenance cleans never reach.",
  whatsIncluded: [
    "Inside all empty cabinets and drawers",
    "Inside refrigerator (if empty)",
    "Inside oven and under stovetop",
    "Baseboards, door frames, and light fixtures",
    "All bathrooms — deep grout scrub, polished fixtures",
    "Closets vacuumed and cleaned",
    "Windows (interior) and window sills",
    "Floors — thoroughly mopped, edges cleaned",
    "Walls spot-cleaned for scuffs and marks",
  ],
  bestFor: [
    "Home sellers preparing for listing photos or buyer walk-throughs",
    "Home buyers wanting a clean start in their new space",
    "Tenants ending a lease and wanting their full security deposit back",
    "Landlords turning over a unit between tenants",
    "Real estate agents coordinating closing-day preparation",
  ],
  priceNote: "Move in / move out cleans start at approximately $120 above a standard clean and scale with home size and condition. For rentals turning over between tenants, we can often coordinate timing with your move-in/move-out dates to minimize vacancy.",
  faqs: [
    {
      q: "How far in advance should I book a move out clean?",
      a: "At least 1-2 weeks in advance, and earlier if you're moving at a peak time (end of month, early summer). We often book up quickly around those windows. If you're coordinating with a closing date, let us know the timeline and we'll do our best to match it.",
    },
    {
      q: "Do you coordinate with real estate agents or property managers?",
      a: "Yes, regularly. We can work directly with your real estate agent, property manager, or landlord to time the clean around showings, closing, or lease turnover. Just share contact info when you book.",
    },
    {
      q: "Will a move out clean help me get my security deposit back?",
      a: "A professional move out clean is one of the easiest ways to avoid security deposit deductions. Landlords are typically looking for the same details we cover — inside cabinets, clean appliances, scrubbed bathrooms, and no scuffs. We can provide a receipt of service for your records.",
    },
    {
      q: "What if the home is still partially furnished?",
      a: "We can work around partial furniture, but move in / move out cleaning is designed for empty or near-empty homes. If the property is mostly furnished, a deep clean is usually a better fit. We'll help you choose during booking.",
    },
    {
      q: "Do you clean the garage, basement, or outdoor areas?",
      a: "Standard move in / move out cleaning focuses on interior living spaces. Garages, basements, and outdoor areas can be added as extras — just mention them when you book and we'll give you a quote.",
    },
  ],
  schemaServiceType: "Move-In Move-Out Cleaning Service",
}
```

## Page 6: General vs. Deep Clean comparison

`src/app/general-vs-deep-cleaning/page.tsx`

This is a standalone top-level URL (not `/services/general-vs-deep-cleaning`)
because it targets the specific search query "general vs deep clean" and
comparisons like this rank best as their own page. It's also a prime AEO
citation target.

### Metadata

```ts
export const metadata = {
  title: "General Cleaning vs. Deep Cleaning — What's the Difference?",
  description: "What's included in a general cleaning versus a deep cleaning? A full room-by-room comparison from NestGlow Co, serving Monmouth, Ocean, and Middlesex County, NJ.",
  alternates: { canonical: `${BASE_URL}/general-vs-deep-cleaning` },
};
```

### Structure

1. **Breadcrumb**: Home / General vs. Deep Cleaning

2. **Hero section**
   - Eyebrow: "Cleaning explained"
   - H1: "General Cleaning vs. Deep Cleaning: What's the Difference?"
   - AEO-optimized intro (2-3 sentences that directly answer the question):
     > "The short answer: a general cleaning keeps your home maintained
     > week to week, while a deep cleaning is a top-to-bottom reset that
     > hits the spots regular cleans don't cover. General cleans are for
     > ongoing maintenance; deep cleans are for first-time service,
     > seasonal refreshes, or any time your home needs more than surface
     > care. Here's the full breakdown."

3. **Full comparison table** — reuse the existing content from the old site.
   Build this as a `ComparisonTable` component at `src/components/sections/ComparisonTable.tsx`.

   Content (use this exact data):

   ```ts
   const comparisonData = {
     categories: [
       {
         name: "All Rooms",
         rows: [
           { task: "Dust all surfaces", general: "✓", deep: "✓ Thorough dusting, including detailed areas" },
           { task: "Mirrors cleaned", general: "✓", deep: "✓ Polished streak-free finish" },
           { task: "Cobwebs removed", general: "✓", deep: "✓" },
           { task: "Ceiling fans & vents", general: "—", deep: "✓ Fully dusted" },
           { task: "Light switches & doorknobs", general: "—", deep: "✓ Cleaned & disinfected" },
           { task: "Baseboards", general: "✓ Dusted", deep: "✓ Hand-wiped & detailed" },
           { task: "Door frames & trim", general: "✓ Dusted", deep: "✓ Cleaned & polished" },
           { task: "Woodwork", general: "✓ Dusted", deep: "✓ Cleaned & polished" },
           { task: "Window sills & ledges", general: "—", deep: "✓ Hand-wiped" },
           { task: "Floors", general: "✓ Swept & mopped", deep: "✓ Swept & detailed mopping" },
           { task: "Wastebaskets", general: "✓ Emptied", deep: "✓ Emptied & wiped inside/out" },
           { task: "Blind cleaning", general: "—", deep: "✓ Dusted" },
         ],
       },
       {
         name: "Bedrooms",
         rows: [
           { task: "Beds made (with linens provided)", general: "—", deep: "✓" },
           { task: "Furniture (dressers, nightstands)", general: "✓ Dusted", deep: "✓ Polished" },
           { task: "Under bed", general: "—", deep: "✓ Cleaned/vacuumed" },
           { task: "Inside closets", general: "—", deep: "✓ Vacuumed & lightly organized" },
         ],
       },
       {
         name: "Bathrooms",
         rows: [
           { task: "Tub & shower", general: "✓ Cleaned", deep: "✓ Deep scrub of grout, tile & glass" },
           { task: "Toilet", general: "✓ Inside/out", deep: "✓ Detailed, including base" },
           { task: "Sink & faucet", general: "✓ Cleaned", deep: "✓ Polished to shine" },
           { task: "Backsplash", general: "✓ Wiped", deep: "✓ Detailed scrub" },
           { task: "Cabinets", general: "✓ Exterior only", deep: "✓ Exterior & interior (if empty)" },
           { task: "Fixtures & mirrors", general: "✓ Cleaned", deep: "✓ Extra polishing" },
         ],
       },
       {
         name: "Kitchen",
         rows: [
           { task: "Microwave", general: "✓ Inside cleaned", deep: "✓ Deep cleaned" },
           { task: "Backsplash", general: "✓ Wiped", deep: "✓ Detailed & degreased" },
           { task: "Range hood & appliances", general: "✓ Exterior wiped", deep: "✓ Exterior detailed" },
           { task: "Cabinets", general: "✓ Exterior wiped", deep: "✓ Exterior polished & interior (if empty)" },
           { task: "Refrigerator", general: "✓ Exterior", deep: "✓ Exterior + top cleaned" },
           { task: "Sink & faucet", general: "✓ Cleaned", deep: "✓ Deep cleaned & polished" },
           { task: "Furniture & tables", general: "✓ Wiped", deep: "✓ Detailed cleaning" },
         ],
       },
     ],
   };
   ```

   Design: alternating row colors, gold column headers for "General Cleaning"
   and "Deep Cleaning", category subheaders in a warm sage or cream accent.
   Mobile: horizontal scroll within the table container, or collapse to
   accordion per category.

4. **When to choose which** (two-column section)
   - Left: "Choose general cleaning when..." (ongoing maintenance, weekly/bi-weekly routine, already in rotation)
   - Right: "Choose deep cleaning when..." (first clean, seasonal refresh, pre-guest, move in/out, hasn't been cleaned professionally in a while)

5. **Pricing transparency block** — explain that general is baseline and deep adds ~$150 plus longer on-site time

6. **FAQ accordion** with these Q&As:

```ts
const comparisonFaqs = [
  {
    q: "Do I need a deep cleaning before starting regular service?",
    a: "Usually yes, especially if your home hasn't been professionally cleaned in a while. A deep clean sets the baseline so recurring general cleans can stay manageable. After the first deep clean, weekly or bi-weekly general cleans are typically enough to maintain.",
  },
  {
    q: "How often should I schedule a deep cleaning?",
    a: "Most clients schedule a deep clean quarterly or seasonally — spring, end of summer, and before the holidays are common times. If you have pets or high foot traffic, every 3-4 months works well. For lower-traffic homes, twice a year is often enough.",
  },
  {
    q: "Can I mix general and deep cleans in the same schedule?",
    a: "Absolutely — that's what most of our clients do. A typical setup is bi-weekly general cleans with a deep clean every 3 months swapped in automatically. We handle the scheduling so you don't have to remember.",
  },
  {
    q: "Why does deep cleaning cost more?",
    a: "Deep cleaning adds several hours of on-site time and covers tasks that general cleaning skips entirely — inside appliances, baseboard hand-wiping, blind dusting, grout scrubbing. The price reflects the additional time and scope, not a premium on the service itself.",
  },
  {
    q: "Is a move-out clean the same as a deep clean?",
    a: "Similar, but not identical. A deep clean is designed for a furnished, occupied home. A move-out clean is designed for an empty property and includes inside cabinets, inside refrigerator, and interior windows — areas that are inaccessible in a furnished home. If you're moving, book the move in / move out clean.",
  },
];
```

7. **Final CTA** — gold background, "Ready to book? Tell us about your home."

8. **FAQPage schema JSON-LD** for all the comparison FAQs above.

## Verify

- All 6 pages render and build cleanly
- Breadcrumbs link correctly
- Schema validator passes on each service page
- Mobile: comparison table is readable (either scrolls or collapses cleanly)
- All FAQs are in an accordion (collapsed by default)
- All CTAs link to `/book`

## Update PROGRESS.md

- Mark TASK-02 complete
- Note any copy decisions that deviated from this brief

## Rules

- Same rules as TASK-01.
- The comparison page is a top-level route (`/general-vs-deep-cleaning`), NOT under `/services`.
- Do NOT show prices as firm numbers anywhere. Use ranges or "starting at" language.
- Every service page MUST have Service schema + FAQPage schema.
- FAQ answers should start with a direct answer in the first sentence (AEO optimization).
