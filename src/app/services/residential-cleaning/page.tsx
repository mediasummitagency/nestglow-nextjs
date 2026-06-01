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
  features: [
    {
      badge: "TRANSPARENT PRICING",
      headline: "Know what you're paying before we show up",
      subhead: "No hourly estimates. No surprise invoices at the door.",
      body: "Most cleaning companies give you a ballpark and figure out the rest when they get there. We don't work that way. You tell us about your home — square footage, bedrooms, bathrooms, any specific priorities — and we give you a firm price before a single thing is scheduled. What you're quoted is what you pay. That's it.",
    },
    {
      badge: "EVERY STANDARD CLEAN",
      headline: "A full clean, not a quick pass",
      subhead: "Every room. Every visit. No exceptions.",
      body: "We don't skip the parts that require effort. Your kitchen gets countertops, appliance exteriors, the sink, and the floor — not just a wipe-down. Bathrooms get the tub, shower, toilet, mirrors, and sink scrubbed properly. Every bedroom is dusted and vacuumed, every floor gets swept and mopped, and trash gets pulled and bins wiped before we leave. The same checklist, the same standard, every single time we come through.",
    },
    {
      badge: "WHO THIS IS FOR",
      headline: "Built for people who actually have lives",
      subhead: "Flexible scheduling that fits around you, not the other way around.",
      body: "Our residential clients aren't people with nothing going on — they're busy families, working professionals, hosts, people who just want one less thing to manage. Whether you need weekly maintenance, a bi-weekly rhythm, or a one-time reset before guests arrive, the schedule bends to you. And because we're consistent about who shows up and how we clean, you stop thinking about it after the first visit.",
    },
  ],
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
