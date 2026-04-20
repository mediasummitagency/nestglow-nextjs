import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export const metadata: Metadata = {
  title: "Move In & Move Out Cleaning Services in NJ",
  description:
    "Professional move in / move out cleaning for Monmouth, Ocean, and Middlesex County, NJ. Empty-home deep cleans for sellers, buyers, landlords, and tenants. Insured and bonded.",
  alternates: { canonical: `${BASE_URL}/services/move-in-move-out` },
};

const props = {
  slug: "move-in-move-out",
  h1: "Move In / Move Out Cleaning in NJ",
  metaTitle: "Move In & Move Out Cleaning Services in NJ",
  metaDescription:
    "Professional move in / move out cleaning for Monmouth, Ocean, and Middlesex County, NJ. Empty-home deep cleans for sellers, buyers, landlords, and tenants. Insured and bonded.",
  introParagraph:
    "A move in / move out clean is a thorough, empty-home deep clean designed to hand a property over in its best possible condition — whether you're selling, buying, renting, or ending a lease. NestGlow Co handles move in / move out cleans across Monmouth, Ocean, and Middlesex County, NJ, and our team comes prepared to tackle everything inside cabinets, behind appliances, and along the spots regular maintenance cleans never reach.",
  whatsIncluded: [
    "Inside all empty cabinets and drawers",
    "Inside refrigerator (if empty)",
    "Inside oven and under stovetop",
    "Baseboards, door frames, and light fixtures",
    "All bathrooms — deep grout scrub, polished fixtures",
    "Closets vacuumed and cleaned",
    "Windows (interior) and window sills",
    "Floors — thoroughly mopped, edges cleaned",
    "Walls spot-cleaned for scuffs and marks",
  ],
  bestFor: [
    "Home sellers preparing for listing photos or buyer walk-throughs",
    "Home buyers wanting a clean start in their new space",
    "Tenants ending a lease and wanting their full security deposit back",
    "Landlords turning over a unit between tenants",
    "Real estate agents coordinating closing-day preparation",
  ],
  priceNote:
    "Move in / move out cleans start at approximately $120 above a standard clean and scale with home size and condition. For rentals turning over between tenants, we can often coordinate timing with your move-in/move-out dates to minimize vacancy.",
  faqs: [
    {
      q: "How far in advance should I book a move out clean?",
      a: "At least 1-2 weeks in advance, and earlier if you're moving at a peak time (end of month, early summer). We often book up quickly around those windows. If you're coordinating with a closing date, let us know the timeline and we'll do our best to match it.",
    },
    {
      q: "Do you coordinate with real estate agents or property managers?",
      a: "Yes, regularly. We can work directly with your real estate agent, property manager, or landlord to time the clean around showings, closing, or lease turnover. Just share contact info when you book.",
    },
    {
      q: "Will a move out clean help me get my security deposit back?",
      a: "A professional move out clean is one of the easiest ways to avoid security deposit deductions. Landlords are typically looking for the same details we cover — inside cabinets, clean appliances, scrubbed bathrooms, and no scuffs. We can provide a receipt of service for your records.",
    },
    {
      q: "What if the home is still partially furnished?",
      a: "We can work around partial furniture, but move in / move out cleaning is designed for empty or near-empty homes. If the property is mostly furnished, a deep clean is usually a better fit. We'll help you choose during booking.",
    },
    {
      q: "Do you clean the garage, basement, or outdoor areas?",
      a: "Standard move in / move out cleaning focuses on interior living spaces. Garages, basements, and outdoor areas can be added as extras — just mention them when you book and we'll give you a quote.",
    },
  ],
  schemaServiceType: "Move-In Move-Out Cleaning Service",
};

export default function MoveInMoveOutPage() {
  return <ServicePageLayout {...props} />;
}
