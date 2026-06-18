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
  serviceKind: "commercial" as const,
  h1: "Commercial Cleaning for NJ Offices, Retail, and Professional Suites",
  metaTitle: "Commercial Cleaning Services in NJ",
  metaDescription:
    "Office, retail, and professional suite cleaning across Monmouth, Ocean, and Middlesex County, NJ. After-hours and recurring schedules available. Insured and bonded.",
  introParagraph:
    "NestGlow Co provides commercial cleaning services for offices, retail storefronts, and professional suites in Monmouth, Ocean, and Middlesex County, NJ. We build cleaning schedules around your business hours, including after-hours and weekend service, and deliver consistent cleaning backed by full insurance and bonding.",
  features: [
    {
      badge: "CUSTOM QUOTES",
      headline: "Custom quotes, not guesswork",
      subhead: "No ballpark numbers. No per-hour estimates that drift.",
      body: "Every commercial space is different, and we price each one on its own terms. Your quote depends on square footage, schedule, and what's in scope: reception areas, restrooms, break rooms, workstations, or some combination. We walk through your space first, then give you a firm number. No surprises when the month closes.",
    },
    {
      badge: "WHAT WE COVER EACH VISIT",
      headline: "Every area that matters to your clients",
      subhead: "Shared spaces, restrooms, break rooms — covered every visit.",
      body: "Every commercial clean covers the areas your clients and staff actually see: reception, conference rooms, and shared spaces get cleaned and straightened. Restrooms are deep-cleaned and sanitized. Floors get swept, mopped, and vacuumed throughout. Trash and recycling are pulled. And because we work after hours, your team walks into a ready space every morning without any disruption to the workday.",
    },
    {
      badge: "BUILT FOR YOUR BUSINESS",
      headline: "For businesses where the space makes an impression",
      subhead: "Weekly, bi-weekly, or a custom schedule that fits your operation.",
      body: "For most businesses, a clean space is part of the first impression a client or customer forms. Whether you run a professional suite, a retail storefront, or a small office with a high-traffic break room, the standard stays the same. Our commercial clients book recurring service so the space is handled on a schedule and they don't have to think about it.",
    },
  ],
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
  heroImage: "/images/services/commercial-cleaning/hero.png",
};

export default function CommercialCleaningPage() {
  return <ServicePageLayout {...props} />;
}
