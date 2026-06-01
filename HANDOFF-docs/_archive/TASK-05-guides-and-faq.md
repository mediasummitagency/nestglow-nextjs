# TASK-05 — Guides hub, FAQ, Reviews page

**Paste this into a fresh Claude Code conversation in Antigravity.**
**Run after TASK-04 is complete.**

---

You are building the content pages that fill out the site's depth for SEO and
AEO: a guides hub with 3 starter articles, a standalone FAQ page, and a
dedicated reviews page.

Project root: `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow-nextjs/`

## Step 1 — FAQ page

Location: `src/app/faq/page.tsx`

### Metadata

```ts
export const metadata = {
  title: "Frequently Asked Questions",
  description: "Common questions about NestGlow Co cleaning services — pricing, scheduling, insurance, supplies, and more. Serving Monmouth, Ocean, and Middlesex County, NJ.",
  alternates: { canonical: `${BASE_URL}/faq` },
};
```

### Structure

1. Breadcrumb: Home / FAQ
2. Hero: "Frequently Asked Questions"
3. Search/filter (optional — skip if it adds complexity)
4. Accordion grouped by category:

**About Our Service**
- What areas do you serve? → Monmouth, Ocean, Middlesex counties. Full list at `/cleaning-services`
- What's the difference between general and deep cleaning? → Summary + link to `/general-vs-deep-cleaning`
- Do you clean both homes and businesses? → Yes, residential and commercial
- How long have you been in business? → 10+ years, founded by Caroline

**Pricing & Booking**
- How much does cleaning cost? → Range explanation, link to `/book` for quote
- How do I book a cleaning? → Booking form process
- Do you require long-term contracts? → No contracts, flexible scheduling
- How do I reschedule or cancel? → 48-hour notice, no fee
- Do you charge extra for large homes? → Pricing scales with size, transparent upfront

**On the Day**
- Do I need to be home during the cleaning? → Not required, keys/codes handled securely
- How long does a typical cleaning take? → Range by home size
- Will I always have the same cleaner? → Team rotation explained
- What do I need to do to prepare? → Link to the "How to prepare" guide
- What if I'm not satisfied? → 24-hour guarantee

**Products & Equipment**
- Do you bring your own supplies? → Yes
- Do you use eco-friendly products? → Available on request
- Can I request specific products? → Yes, leave them out

**Safety & Trust**
- Are you insured and bonded? → Yes, fully
- Are your cleaners background-checked? → Yes
- Do you have references? → Reviews page + existing clients available on request

**Special Situations**
- Do you clean homes with pets? → Yes, note preferences in booking
- Do you handle short-term rentals / Airbnbs? → Yes, turnover cleaning available
- Do you work with real estate agents for pre-listing cleans? → Yes, coordinate timing

Total: roughly 20-25 questions across categories.

### Schema

Add full FAQPage JSON-LD with every question/answer pair.

## Step 2 — Reviews page

Location: `src/app/reviews/page.tsx`

### Metadata

```ts
export const metadata = {
  title: "Client Reviews",
  description: "Reviews from NestGlow Co clients across Monmouth, Ocean, and Middlesex County, NJ. Real feedback from real homeowners.",
  alternates: { canonical: `${BASE_URL}/reviews` },
};
```

### Structure

1. Breadcrumb: Home / Reviews
2. Hero: "What our clients say"
3. Aggregate rating display: "5.0 ★ · 5 reviews" (matches the schema.org AggregateRating on the home page)
4. Full testimonials list — all 5 real reviews from TASK-01's testimonial data
   - Use the full quote (not truncated)
   - Name + date
   - No photos (we don't have them)
5. "Add yours" CTA — mailto link to `nestglowco@gmail.com?subject=Review for NestGlow Co`
6. Link to Google reviews (placeholder URL — flag in PROGRESS.md that Lucas needs to provide the live Google Business Profile URL)
7. Final CTA

### Schema

Add Review schema for each testimonial:

```ts
{
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "HouseCleaningService",
    name: "NestGlow Co",
  },
  author: { "@type": "Person", name: review.name },
  datePublished: review.date,
  reviewBody: review.quote,
  reviewRating: {
    "@type": "Rating",
    ratingValue: "5",
    bestRating: "5",
  },
}
```

## Step 3 — Guides hub

Location: `src/app/guides/page.tsx`

### Metadata

```ts
export const metadata = {
  title: "Cleaning Guides",
  description: "Practical guides on house cleaning from NestGlow Co — pricing, preparation, move-out checklists, and more. Written for NJ homeowners.",
  alternates: { canonical: `${BASE_URL}/guides` },
};
```

### Structure

1. Breadcrumb: Home / Guides
2. Hero: "Practical cleaning guides for NJ homeowners"
3. Grid of guide cards (3 to start):
   - How much does house cleaning cost in NJ?
   - What to expect from a move-out cleaning
   - How to prepare your home for a cleaner
4. Each card: title, 1-sentence description, "Read more" link
5. Final CTA

## Step 4 — Guide articles

Create three article pages. Each is a long-form article (roughly 1,200-1,800 words)
optimized for AEO (direct-answer formatting, clear subheads, pullable facts).

### Guide 1: `src/app/guides/how-much-does-house-cleaning-cost-nj/page.tsx`

**H1:** How Much Does House Cleaning Cost in New Jersey?

**Direct-answer paragraph (under H1):**
> Most professional house cleaning in New Jersey costs between $120 and $350 per visit,
> depending on home size, cleaning frequency, and whether you're booking a standard
> clean or a deep clean. Smaller apartments and recurring bi-weekly service tend to
> fall at the lower end; larger homes, deep cleans, and one-time services price higher.
> Here's a full breakdown of what drives pricing and what to expect across Monmouth,
> Ocean, and Middlesex County.

**Sections (H2s):**
- Typical NJ cleaning price ranges
- What affects the price (size, frequency, type, add-ons)
- Standard clean vs. deep clean pricing
- Move in/out cleaning pricing
- Commercial cleaning pricing
- How to get an accurate quote
- Red flags in cleaning quotes
- FAQ

**Length:** ~1,500 words.

**Schema:** FAQPage for the FAQ section, BreadcrumbList.

### Guide 2: `src/app/guides/what-to-expect-move-out-cleaning/page.tsx`

**H1:** What to Expect from a Professional Move-Out Cleaning

**Direct-answer paragraph:**
> A professional move-out cleaning is a thorough, empty-home deep clean designed
> to hand a property over in spotless condition — inside cabinets, inside the oven,
> scrubbed grout, polished fixtures, and cleaned interior windows. It typically
> takes 4-8 hours for a standard home and costs between $250 and $500 depending
> on size. For tenants, a professional move-out clean significantly improves your
> chances of getting the full security deposit back. For sellers and landlords,
> it creates a strong first impression for buyers or new tenants.

**Sections:**
- What's included in a move-out clean
- What's NOT included (furniture moving, repairs, outdoor areas)
- Timing: when to schedule
- Cost expectations
- Tenant vs. landlord vs. seller perspectives
- Preparation checklist for the client
- Working with real estate agents
- FAQ

**Length:** ~1,500 words.

**Schema:** HowTo schema for the preparation checklist, FAQPage, BreadcrumbList.

### Guide 3: `src/app/guides/how-to-prepare-home-for-cleaner/page.tsx`

**H1:** How to Prepare Your Home for a Cleaner (5-Minute Checklist)

**Direct-answer paragraph:**
> Preparing for a cleaner takes about 5 minutes and makes a meaningful difference
> in the result. Focus on putting away personal items and clutter so surfaces are
> clear, secure pets in a comfortable space, and leave a note about any specific
> areas you want prioritized. You don't need to pre-clean — that's the cleaner's job.

**Sections:**
- The 5-minute checklist (bulleted)
- What not to do (pre-cleaning, expecting housekeeping duties like organizing closets)
- How to handle pets
- What to leave out for special requests
- Payment and tipping norms
- What to expect after
- FAQ

**Length:** ~1,200 words.

**Schema:** HowTo schema for the checklist, FAQPage, BreadcrumbList.

## Step 5 — Update footer and nav

- Add "Guides" link to `SiteNav.tsx` (between "Service Areas" and "About")
- Add the 3 guide articles to the footer's resources column
- Link from relevant pages: the home page's "How it works" section can link to the preparation guide; the move-in-move-out service page links to the move-out guide; the booking page links to the pricing guide

## Verify

- `/faq`, `/reviews`, `/guides`, and all 3 guide articles render cleanly
- All schemas validate
- Each guide article is at least 1,200 words
- Each guide has a direct-answer paragraph at the top
- No Lorem Ipsum or placeholder copy

## Update PROGRESS.md

- Mark TASK-05 complete
- Flag: Google Business Profile URL needed for reviews page
- Note: 3 guides seeded; more can be added later by dropping new folders under `/guides`

## Rules

- Every guide article has a direct-answer paragraph under the H1 (AEO optimization)
- Use real pricing ranges that match what service pages say — keep everything consistent
- Link internally between guides and service pages
- Do NOT invent statistics or percentages; if unsure, use qualitative language
