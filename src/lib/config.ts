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
