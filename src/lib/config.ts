// Single source of truth for business info, URLs, and tracking IDs.
// Update values here rather than editing strings across many pages.

export const BASE_URL = "https://nestglowco.com";

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
  // No container for NestGlow yet (Lucas, 2026-08-22), so this stays blank and
  // the loader in layout.tsx renders nothing. Blank = tracking is off entirely.
  gtmId: "", // e.g. "GTM-XXXXXXX"
} as const;

export const FORMS = {
  // Existing Formspree endpoint for the full booking form. Keep this value.
  booking: "https://formspree.io/f/xnngyenw",
  // Lucas will create a second Formspree form for the quick-quote hero form
  // and populate this. Leave empty for now.
  quickQuote: "",
} as const;
