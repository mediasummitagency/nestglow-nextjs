// Single source of truth for business info, URLs, and tracking IDs.
// Update values here rather than editing strings across many pages.

/**
 * WITH the www — that is what Vercel actually serves. The apex 308s to it
 * (Vercel's "Redirect apex domains to www", set when the domain was added
 * 2026-08-23), so an apex canonical points every page at a URL that redirects,
 * and every sitemap entry becomes a "Page with redirect" in Search Console.
 *
 * Caught right after the DNS cutover the same day: canonicals and the sitemap
 * were emitting the apex while the site served on www. BDF has the same
 * www-serving shape and the same rule.
 *
 * If the apex is ever made the serving host instead, change this too — nothing
 * derives it from Vercel.
 */
export const BASE_URL = "https://www.nestglowco.com";

export const BUSINESS = {
  name: "NestGlow Co",
  legalName: "NestGlow Co LLC",
  // "Homes and businesses" until 2026-08-22 — changed because Caroline does not sell
  // commercial cleaning. Short-term rentals are the second real service, not offices.
  tagline: "Cleaning you can trust. Homes and short-term rentals across Monmouth, Ocean, and Middlesex County.",
  phone: "(732) 614-0192",
  phoneHref: "tel:+17326140192",
  smsHref: "sms:+17326140192",
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
  // ONE id, on purpose. GA4 and Google Ads conversions are configured as tags
  // INSIDE the GTM container on every Summit Media build — they are never loaded
  // from the site directly, so there is no ga4Id / googleAdsId here to fill in.
  // Every event on this site pushes to `dataLayer` and GTM routes it onward.
  //
  // ⚠️ DO NOT PASTE GTM'S INSTALL SNIPPET ANYWHERE. `layout.tsx` already
  // renders both halves of it — the loader script and the <noscript> iframe —
  // gated on this value. Setting the ID here IS the install. Adding the snippet
  // on top loads the container twice, which double-counts every conversion.
  // Same rule and the same warning as BDF.
  //
  // Container added 2026-08-27 (Lucas). Blank would mean tracking off entirely.
  gtmId: "GTM-K85T24PZ",
} as const;

export const FORMS = {
  // Existing Formspree endpoint for the full booking form. Keep this value.
  booking: "https://formspree.io/f/xnngyenw",
  // Lucas will create a second Formspree form for the quick-quote hero form
  // and populate this. Leave empty for now.
  quickQuote: "",
} as const;
