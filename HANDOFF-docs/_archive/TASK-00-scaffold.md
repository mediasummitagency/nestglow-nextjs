# TASK-00 — Scaffold Next.js project

**Paste this into a fresh Claude Code conversation in Antigravity.**
**Run first, before any other task.**

---

You are scaffolding a new Next.js 16 application for NestGlow Co, a residential
and commercial cleaning company in NJ. This task creates the project skeleton —
folder structure, dependencies, design tokens, layout shell, and configuration.
Subsequent tasks will add actual page content.

## Project context

- Reference project for architectural patterns: `/Users/lucasbarbosa/Desktop/claude-access/websites/summit-nextjs/`
  (study its `package.json`, `src/app/layout.tsx`, `src/app/globals.css`, and `src/lib/` structure before you start)
- DO NOT copy Summit's visual design. Only the structural patterns.
- Full project brief: `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/tasks/MASTER-PROMPT.md`

## Step 1 — Create the project

Create a new Next.js app at:

```
/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow-nextjs/
```

Use this command (confirm in the terminal before running):

```bash
cd /Users/lucasbarbosa/Desktop/claude-access/websites
npx create-next-app@latest nestglow-nextjs \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint
```

After creation, `cd nestglow-nextjs` and install additional dependencies:

```bash
npm install \
  framer-motion \
  lucide-react \
  @radix-ui/react-slot \
  @radix-ui/react-label \
  class-variance-authority \
  clsx \
  tailwind-merge \
  tw-animate-css
```

Then initialize shadcn:

```bash
npx shadcn@latest init
```

When prompted, use these answers:
- Style: Default
- Base color: Neutral
- CSS variables: Yes

Install these shadcn components upfront (we will use all of them):

```bash
npx shadcn@latest add button input label textarea select checkbox accordion card badge separator
```

## Step 2 — Set up `src/lib/config.ts`

Create the file with this content. Values marked `TODO` will be filled in later by Lucas.

```ts
// Single source of truth for business info, URLs, and tracking IDs.
// Update values here rather than editing strings across many pages.

export const BASE_URL = "https://nestglowco.com";

export const BUSINESS = {
  name: "NestGlow Co",
  legalName: "NestGlow Co LLC",
  tagline: "Cleaning you can trust. Homes and businesses across Monmouth, Ocean, and Middlesex County.",
  phone: "(732) 614-0192",
  phoneHref: "tel:+17326140192",
  email: "nestglowco@gmail.com",
  emailHref: "mailto:nestglowco@gmail.com",
  yearFounded: 2015, // reflects "10+ years of experience"
  address: {
    // NestGlow is home-based — no public street address for the site
    locality: "Neptune City", // serve-area anchor
    region: "NJ",
    country: "US",
  },
  areaServed: ["Monmouth County, NJ", "Ocean County, NJ", "Middlesex County, NJ"],
  socials: {
    instagram: "https://instagram.com/nestglowco",
    // Add others as they are set up
  },
} as const;

export const TRACKING = {
  // Placeholder — Lucas will populate after Ads / GA4 property is set up.
  // Leave blank strings to disable rendering of the script tag.
  gtmId: "", // e.g. "GTM-XXXXXXX"
  ga4Id: "", // e.g. "G-XXXXXXXXXX"
  googleAdsId: "", // e.g. "AW-XXXXXXXXXX"
} as const;

export const FORMS = {
  // Existing Formspree endpoint for the full booking form. Keep this value.
  booking: "https://formspree.io/f/xnngyenw",
  // Lucas will create a second Formspree form for the quick-quote hero form
  // and populate this. Leave empty for now.
  quickQuote: "",
} as const;
```

## Step 3 — Set up `src/app/globals.css`

Replace the default `globals.css` with this content. This establishes the warm
residential palette described in the master prompt.

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme {
  /* Brand palette — warm residential */
  --color-cream: #FBF8F3;
  --color-cream-50: #FDFBF7;
  --color-cream-100: #F7F2E9;
  --color-charcoal: #1F1B16;
  --color-charcoal-70: #4A443D;
  --color-charcoal-40: #8A837B;
  --color-gold: #E8B86A;
  --color-gold-dark: #C59845;
  --color-gold-light: #F4D8A6;
  --color-sage: #A8B5A0;
  --color-sage-dark: #7C8B73;
  --color-terracotta: #C0614A;
  --color-terracotta-dark: #9B4D3A;

  /* Typography */
  --font-display: var(--font-fraunces);
  --font-sans: var(--font-dm-sans);
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: var(--color-cream);
    color: var(--color-charcoal);
    font-family: var(--font-sans), system-ui, sans-serif;
    font-feature-settings: "ss01", "ss02";
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display), Georgia, serif;
    letter-spacing: -0.01em;
  }
  /* Respect reduced-motion preference */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@layer utilities {
  .container-prose {
    max-width: 72ch;
    margin-inline: auto;
  }
}
```

## Step 4 — Set up `src/app/layout.tsx`

Replace the default layout with this. It sets up fonts, metadata defaults,
and the GTM script loading pattern used in Summit.

```tsx
import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import Script from "next/script";
import { TRACKING, BASE_URL, BUSINESS } from "@/lib/config";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${BUSINESS.name} | Professional Cleaning in Monmouth, Ocean & Middlesex County, NJ`,
    template: `%s | ${BUSINESS.name}`,
  },
  description: BUSINESS.tagline,
  openGraph: {
    title: `${BUSINESS.name} | Professional Cleaning in NJ`,
    description: BUSINESS.tagline,
    url: BASE_URL,
    siteName: BUSINESS.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} | Professional Cleaning in NJ`,
    description: BUSINESS.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {TRACKING.gtmId && (
          <Script id="gtm-loader" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${TRACKING.gtmId}');
          `}</Script>
        )}
      </head>
      <body className={`${dmSans.variable} ${fraunces.variable} antialiased`}>
        {TRACKING.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${TRACKING.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
```

## Step 5 — Create placeholder page.tsx

Replace `src/app/page.tsx` with a minimal placeholder so the build works:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center p-8">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-bold mb-4">NestGlow Co</h1>
        <p className="text-charcoal-70 text-lg">
          Site scaffold complete. Pages coming in TASK-01 through TASK-06.
        </p>
      </div>
    </main>
  );
}
```

## Step 6 — Create stub files

Create these files as empty stubs so later tasks can fill them in without
worrying about imports breaking:

- `src/lib/towns.ts` — export a named const `towns = [] as const;` for now
- `src/lib/schema.ts` — export a stub function `generateLocalBusinessSchema() { return {}; }`
- `src/lib/utils.ts` — standard shadcn cn() helper (already created by shadcn init, verify)
- `src/components/layout/SiteNav.tsx` — placeholder that returns `<nav />`
- `src/components/layout/Footer.tsx` — placeholder that returns `<footer />`

## Step 7 — Create `public/` assets

Copy the existing favicon files from the old site into `public/`. The source paths are:

```
/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/favicon.ico
/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/favicon-16x16.png
/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/favicon-32x32.png
/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/apple-touch-icon.png
/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/android-chrome-192x192.png
/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/android-chrome-512x512.png
/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/site.webmanifest
```

Copy these to `nestglow-nextjs/public/`.

**Note on the logo:** The existing `logo.svg` is 192 KB, which suggests it
contains embedded raster data (defeats the purpose of SVG). Copy both
`logo.svg` and `logo.png` to `public/` for now — we will decide which to use
during TASK-01. Flag this in `PROGRESS.md`.

## Step 8 — Create `PROGRESS.md`

Create a new file at `nestglow-nextjs/PROGRESS.md` with this template:

```markdown
# NestGlow Co — Build Progress

## Completed
- [x] TASK-00: Scaffold (done [date])

## In Progress
- [ ] TASK-01: Home and core pages

## Upcoming
- [ ] TASK-02: Services
- [ ] TASK-03: Booking form
- [ ] TASK-04: Town pages
- [ ] TASK-05: Guides and FAQ
- [ ] TASK-06: SEO / AEO final
- [ ] TASK-07: Cleanup old site

## Open questions / blockers for Lucas
- [ ] GA4 measurement ID (populate `TRACKING.ga4Id` in `src/lib/config.ts`)
- [ ] Google Ads conversion ID (populate `TRACKING.googleAdsId`)
- [ ] GTM container ID (populate `TRACKING.gtmId`)
- [ ] Quick-quote Formspree endpoint (populate `FORMS.quickQuote`)
- [ ] Logo decision: the existing SVG is 192 KB with likely embedded raster.
      Need either a fresh SVG export or confirmation to use logo.png.
- [ ] Hero image: Caroline + team photo does not exist yet. Need a real
      photo for the home hero before launch.

## Deviations from master prompt
(none yet)
```

## Step 9 — Verify

Run:

```bash
npm run dev
```

Confirm:
- Page loads at `http://localhost:3000` without errors
- Cream background is visible (tokens are loading)
- Fraunces serif is visible on `h1` (fonts are loading)
- No console errors

Then run:

```bash
npm run build
```

Confirm the build completes with zero errors.

## Done when

- `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow-nextjs/` exists and builds
- `src/lib/config.ts` is populated (with TODO placeholders where appropriate)
- `src/app/globals.css` has the full warm palette
- `src/app/layout.tsx` has the font + GTM scaffold
- `public/` has all favicon files copied from the old site
- `PROGRESS.md` exists with open questions documented
- The placeholder home page renders successfully

## Rules

- Do NOT install jQuery, Bootstrap, owl-carousel, isotope, or Font Awesome.
  These were in the old site and are explicitly being left behind.
- Do NOT edit any files inside `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/`
  (the OLD site directory). That directory stays frozen until TASK-07 cleanup.
- All work in this task happens inside `nestglow-nextjs/` (the new directory).
