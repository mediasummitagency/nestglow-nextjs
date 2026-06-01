# TASK-01 — Home, About, Contact, 404

**Paste this into a fresh Claude Code conversation in Antigravity.**
**Run after TASK-00 (scaffold) is complete and verified.**

---

You are building the four core pages of the NestGlow Co site: home, about,
contact, and the 404 page. You are also building the shared layout components
(SiteNav, Footer, MobileNav) that every page will use.

Project root: `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow-nextjs/`

## Step 1 — Build `SiteNav` and `Footer`

Replace the stub files from TASK-00 with real components.

### `src/components/layout/SiteNav.tsx`

- Fixed header, 72px tall, cream background with `border-b border-charcoal/10`
- Left: logo (use `/logo.svg` from `public/` — if it looks broken because of the
  embedded raster issue, swap to `/logo.png` and note in `PROGRESS.md`)
- Center: nav items (hidden below `md:` breakpoint)
  - Home → `/`
  - Services (dropdown) → Residential, Commercial, Deep Cleaning, Move In/Out
  - Service Areas (dropdown) → Monmouth County, Ocean County, Middlesex County
  - Guides → `/guides`
  - About → `/about`
- Right: phone number + "Book Cleaning" CTA button (gold background, charcoal text)
- Mobile: hamburger trigger opening `MobileNav` drawer

Dropdowns should use hover-open on desktop, click-open on mobile touch. Use
Radix primitives from shadcn (`NavigationMenu` if helpful, or build simple
disclosure-style dropdowns with useState).

### `src/components/layout/MobileNav.tsx`

- Full-screen overlay that slides in from the right
- Same nav items as desktop, stacked vertically
- Phone + Book Cleaning CTA at the bottom
- Close button top-right
- Lock body scroll when open

### `src/components/layout/Footer.tsx`

Five-column footer on desktop, single column on mobile:

1. **Brand column**
   - Logo
   - `{BUSINESS.tagline}` from config
   - Social links (Instagram)

2. **Services column**
   - Residential Cleaning
   - Commercial Cleaning
   - Deep Cleaning
   - Move In/Move Out
   - General vs. Deep Clean (comparison page)

3. **Service Areas column**
   - Monmouth County, NJ
   - Ocean County, NJ
   - Middlesex County, NJ
   - (Linked to county hub pages; sub-links to individual towns will be added in TASK-04)

4. **Company column**
   - About
   - Guides
   - FAQ
   - Reviews
   - Contact
   - Book Cleaning

5. **Contact column**
   - Phone (tel: link)
   - Email (mailto: link)
   - Service area list (text, not links)

Bottom bar:
- `© {year} NestGlow Co. All rights reserved.`
- Privacy Policy, Terms of Service (links)
- Use warm charcoal background `bg-charcoal text-cream` with gold accents on hover

## Step 2 — Build home page `src/app/page.tsx`

The home page has these sections in order:

### 2.1 Hero

Two-column on desktop, stacked on mobile.

**Left column (copy):**
- Eyebrow: "Cleaning services in NJ"
- H1: "Clean homes. Calm days. Count on our team."
- Subhead: "Professional residential and commercial cleaning across Monmouth, Ocean, and Middlesex County. 10+ years, insured, bonded, and guaranteed."
- Primary CTA: "Book Your Cleaning" → `/book`
- Secondary CTA: "See what's included" → `/general-vs-deep-cleaning`
- Trust line below CTAs: "⭐️⭐️⭐️⭐️⭐️ Rated by homeowners across Monmouth County"
  (No emoji — use a small star icon from lucide-react, `Star` with `fill-gold stroke-gold`)

**Right column (visual):**
- Placeholder: a warm interior image. Suggested Unsplash photo (import as a static file
  into `public/hero/home.jpg`): search for "bright airy living room sunlight" on Unsplash
  and pick one that is not overly staged. Flag in `PROGRESS.md` that this needs a
  real Caroline/team photo before launch.
- `next/image` with `priority` prop, width/height matching the natural aspect
- Soft rounded corners (`rounded-2xl`)

### 2.2 Quick Quote form (below hero, full-width, cream-100 background)

A compact form that captures basic info without requiring the full booking flow.
Uses the same `Formspree` pattern but sends to `FORMS.quickQuote` (currently empty —
the form should gracefully show a "Please call us" message if the endpoint is empty).

Fields:
- First name (required)
- Phone (required)
- Zip code (required)
- Property type (select: Apartment, House, Townhouse, Office)
- Cleaning frequency (select: One-time, Weekly, Bi-weekly, Monthly)
- Submit: "Get a Quick Quote"

On success, replace the form with a thank-you message and a "Book full appointment" CTA to `/book`.

Put this in `src/components/forms/QuickQuoteForm.tsx`.

### 2.3 Services grid

Four cards in a 2x2 grid on desktop, stacked on mobile:

1. **Residential Cleaning** → `/services/residential-cleaning`
   - Icon: `Home` from lucide-react
   - Copy: "Regular maintenance, deep cleans, and special requests for the homes you live in and love."

2. **Commercial Cleaning** → `/services/commercial-cleaning`
   - Icon: `Briefcase`
   - Copy: "Offices, storefronts, and professional suites. Schedules built around your business hours."

3. **Deep Cleaning** → `/services/deep-cleaning`
   - Icon: `Sparkles`
   - Copy: "Top-to-bottom detailing for first-time cleans, seasonal resets, and pre-guest refreshes."

4. **Move In / Move Out** → `/services/move-in-move-out`
   - Icon: `Truck`
   - Copy: "Empty-home deep cleans that make the next chapter simpler — for sellers, buyers, and renters."

Cards: cream-100 background, gold hover border, subtle lift on hover.

### 2.4 Trust bar

Horizontal strip with 4 trust pillars (icons + text):

- `ShieldCheck` → "Fully insured & bonded"
- `Award` → "10+ years of experience"
- `ThumbsUp` → "Satisfaction guaranteed"
- `Clock` → "On-time, every time"

Cream background, charcoal text, small icons in gold.

### 2.5 How It Works (3 steps)

Numbered horizontal sequence (stacked on mobile):

1. **Tell us about your space.** Share the basics in our quick form.
2. **We confirm your clean.** Within 24 hours, a real person from our team gets back to you.
3. **Your home glows.** Our insured, background-checked team arrives on time and leaves your space spotless.

### 2.6 General vs. Deep Clean teaser

Short section with:
- H2: "Not sure what kind of clean you need?"
- Two-column mini-comparison (use the `ComparisonTable` component, truncated to 6 rows)
- CTA: "See the full comparison" → `/general-vs-deep-cleaning`

### 2.7 Testimonials (use all 5 real reviews)

Use these exact reviews (do not invent new ones):

```ts
const testimonials = [
  {
    name: "Eileen S.",
    date: "2025-10-08",
    quote: "I'm so happy I scheduled with Caroline and her team. Caroline was so kind and very professional. She arrived promptly right on time at 9 AM. Communication and reminders were sent to keep us updated about our appointment and her arrival time.",
  },
  {
    name: "Jeffrey R.",
    date: "2020-01-31",
    quote: "Caroline is extremely dependable and does a great job. She is very flexible with my schedule and always accommodates my schedule. My house is sparkling after she leaves! I would highly recommend her.",
  },
  {
    name: "Greg A.",
    date: "2020-01-31",
    quote: "Caroline is punctual, flexible, and dependable! I love walking into my house when she's been here!",
  },
  {
    name: "Elena H.",
    date: "2020-01-29",
    quote: "We hired Caroline over three years ago. She comes to our house every other week and does a fabulous job. Caroline is very dependable and trustworthy and I would recommend her to anyone.",
  },
  {
    name: "Danny H.",
    date: "2020-01-29",
    quote: "Caroline has worked with us for over a year. She is conscientious, hard working and flexible. Caroline always asks for feedback — 'how does it look', 'what else can I do', 'anything you want me to focus on this week', 'anything I should do better' — she listens, incorporates the feedback and grows. We are super happy with the work Caroline does.",
  },
];
```

Horizontal carousel on mobile (swipe), 3-up grid on desktop.

Note in PROGRESS.md: we are using the existing testimonials but need to ask
these 5 clients to leave Google reviews so they show up in search and local
pack results.

### 2.8 Service Areas

H2: "Serving the NJ Shore and inland Monmouth, Ocean, and Middlesex."

Three county badges with summary counts (e.g. "Monmouth County — 10 towns served").
Each badge links to the county hub (to be built in TASK-04).

### 2.9 Final CTA

Large centered section, gold background, charcoal text:
- H2: "Ready to come home to clean?"
- CTA: "Book Your Cleaning"
- Secondary: "Call (732) 614-0192"

### 2.10 LocalBusiness JSON-LD

Add this structured data inline at the top of the home page:

```tsx
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HouseCleaningService",
  name: BUSINESS.name,
  image: `${BASE_URL}/logo.png`,
  "@id": BASE_URL,
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
  foundingDate: "2015",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "5",
  },
};
```

Render via `<script type="application/ld+json" dangerouslySetInnerHTML={...} />`.

## Step 3 — About page `src/app/about/page.tsx`

Single-column layout, narrow prose width (max-w-prose):

### Metadata

```tsx
export const metadata = {
  title: "About NestGlow Co",
  description: "Family-run, 10+ years strong. Meet the team behind NestGlow Co, serving Monmouth, Ocean, and Middlesex County, NJ.",
  alternates: { canonical: `${BASE_URL}/about` },
};
```

### Sections

1. **Hero section** — H1: "Treating your home like our own." Subhead about the team's mission.

2. **Meet Caroline**
   - Short bio paragraph (written in third person, warm but professional):
     > "Caroline started NestGlow Co because she believed that cleaning
     > should never feel like another thing on a homeowner's to-do list.
     > After more than a decade of helping Jersey Shore families keep
     > their homes feeling calm and cared for, she built a team that
     > shares the same standard: show up on time, notice the details,
     > and leave every home better than we found it."
   - Placeholder for Caroline photo — flag in PROGRESS.md

3. **Why you can trust us** (4-item list)
   - 10+ years of experience
   - Fully insured & bonded
   - Reliable & professional
   - 24-hour satisfaction guarantee

4. **What we believe in** (4-item list)
   - Transparency — no hidden fees
   - Convenience — book in a tap
   - Care — your home, your schedule, your trust
   - Consistency — same standard on the first clean and the fiftieth

5. **Service area** — brief paragraph + links to county hubs

6. **Final CTA** — same gold section as home page

## Step 4 — Contact page `src/app/contact/page.tsx`

Single-column, centered layout. Do NOT duplicate the booking form here —
this page is for quick contact only.

### Metadata

```tsx
export const metadata = {
  title: "Contact NestGlow Co",
  description: "Get in touch with NestGlow Co — book a cleaning, ask a question, or request a custom quote. Serving Monmouth, Ocean, and Middlesex County, NJ.",
  alternates: { canonical: `${BASE_URL}/contact` },
};
```

### Sections

1. **Hero** — H1: "Let's get in touch."

2. **Contact methods** (three cards or a row)
   - Call us: `(732) 614-0192` with tel: link
   - Text us: same number
   - Email us: `nestglowco@gmail.com` with mailto:

3. **Service area** — brief statement + county links

4. **"Ready to book?" CTA** → `/book`

5. **Speakable JSON-LD** for the contact info section:

```tsx
const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#contact-methods"],
  },
  url: `${BASE_URL}/contact`,
};
```

## Step 5 — 404 page `src/app/not-found.tsx`

Simple centered message:
- H1: "That page got lost in the laundry."
- Paragraph: "The page you're looking for does not exist, but your clean home does. Let's get you back on track."
- Two CTAs: "Back to Home" and "Book a Cleaning"

## Step 6 — Verify

- `npm run build` completes with zero errors
- Visit `/`, `/about`, `/contact`, and a made-up route `/nonexistent` — all render correctly
- Schema validator (use https://validator.schema.org/) passes on home page
- Mobile nav drawer opens, closes, and locks body scroll
- All phone numbers are tel: links, all emails are mailto: links

## Step 7 — Update PROGRESS.md

Mark TASK-01 complete. Add these flags:

- [ ] Home hero image: need real photo of Caroline or team before launch
- [ ] Caroline About photo: needed before launch
- [ ] Ask 5 existing testimonial clients to leave Google reviews
- [ ] Quick-quote Formspree endpoint: waiting on Lucas to create

## Rules

- No inline `<style>` tags. All styling via Tailwind utilities.
- Use `next/image` for all images, never `<img>`.
- Every page must have `generateMetadata` or static `metadata` export.
- Every page must export a default function.
- Use server components by default; only mark `"use client"` when truly needed
  (forms, interactive menus, framer-motion).
- Framer Motion animations: keep subtle (fade-in, slight y-offset). No bouncy
  springs, no card flips, no loud reveals. This is a trust-oriented brand.
- Do NOT use emoji anywhere in the visible copy. Use lucide-react icons instead.
- Do NOT edit files in `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/`
  (the OLD site). That stays frozen until TASK-07.
