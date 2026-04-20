import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export const metadata: Metadata = {
  title: "Residential House Cleaning in NJ",
  description:
    "Recurring and one-time house cleaning for NJ homes. Weekly, bi-weekly, or monthly. Insured, bonded, and guaranteed. Serving Monmouth, Ocean, and Middlesex County.",
  alternates: { canonical: `${BASE_URL}/services/residential-cleaning` },
};

const props = {
  slug: "residential-cleaning",
  h1: "Residential Cleaning in Monmouth, Ocean & Middlesex County",
  metaTitle: "Residential House Cleaning in NJ",
  metaDescription:
    "Recurring and one-time house cleaning for NJ homes. Weekly, bi-weekly, or monthly. Insured, bonded, and guaranteed. Serving Monmouth, Ocean, and Middlesex County.",
  introParagraph:
    "NestGlow Co provides residential cleaning services for homes across Monmouth, Ocean, and Middlesex County, NJ. Our team handles weekly, bi-weekly, and monthly maintenance cleans, as well as one-time deep cleans, with the same care and consistency every visit. We are fully insured and bonded, and every clean is backed by a 24-hour satisfaction guarantee.",
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
  priceNote:
    "Residential cleans start around $120 for smaller spaces and scale with bedroom count, bathroom count, and square footage. Our team provides a firm quote after you submit the booking form, before any cleaning begins.",
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
};

export default function ResidentialCleaningPage() {
  return <ServicePageLayout {...props} />;
}
