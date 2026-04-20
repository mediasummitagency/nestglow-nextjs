import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export const metadata: Metadata = {
  title: "Commercial Cleaning Services in NJ",
  description:
    "Office, retail, and professional suite cleaning across Monmouth, Ocean, and Middlesex County, NJ. After-hours and recurring schedules available. Insured and bonded.",
  alternates: { canonical: `${BASE_URL}/services/commercial-cleaning` },
};

const props = {
  slug: "commercial-cleaning",
  h1: "Commercial Cleaning for NJ Offices, Retail, and Professional Suites",
  metaTitle: "Commercial Cleaning Services in NJ",
  metaDescription:
    "Office, retail, and professional suite cleaning across Monmouth, Ocean, and Middlesex County, NJ. After-hours and recurring schedules available. Insured and bonded.",
  introParagraph:
    "NestGlow Co provides commercial cleaning services for offices, retail storefronts, and professional suites in Monmouth, Ocean, and Middlesex County, NJ. We build cleaning schedules around your business hours — including after-hours and weekend service — and provide consistent, professional-grade cleaning backed by full insurance and bonding.",
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
  priceNote:
    "Commercial pricing depends on square footage, frequency, and scope. We provide custom quotes after a brief walk-through of your space — not over the phone.",
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
};

export default function CommercialCleaningPage() {
  return <ServicePageLayout {...props} />;
}
