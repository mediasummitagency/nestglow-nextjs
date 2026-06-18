import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export const metadata: Metadata = {
  title: "Move In / Move Out Cleaning in NJ — Deposit-Ready & Day-One Fresh",
  description:
    "Move-in and move-out cleaning for Monmouth, Ocean, and Middlesex County, NJ. Landlord-ready standard, same-day scheduling available. Insured, bonded, and 100% satisfaction guaranteed.",
  alternates: { canonical: `${BASE_URL}/services/move-in-move-out` },
  openGraph: {
    title: "Move In / Move Out Cleaning in NJ — Deposit-Ready & Day-One Fresh",
    description:
      "Move-in and move-out cleaning for Monmouth, Ocean, and Middlesex County, NJ. Landlord-ready standard, same-day scheduling available. 100% satisfaction guarantee.",
    url: `${BASE_URL}/services/move-in-move-out`,
  },
};

const props = {
  slug: "move-in-move-out",
  serviceKind: "moveinout" as const,
  h1: "Move In / Move Out Cleaning in Monmouth, Ocean & Middlesex County",
  metaTitle: "Move In / Move Out Cleaning in NJ — Deposit-Ready & Day-One Fresh",
  metaDescription:
    "Move-in and move-out cleaning for Monmouth, Ocean, and Middlesex County, NJ. Landlord-ready standard, same-day scheduling available. Insured, bonded, and 100% satisfaction guaranteed.",
  introParagraph:
    "Whether you're handing back the keys or picking them up, the clean matters. Moving out means your security deposit is on the line — landlords check inside cabinets, appliance interiors, and bathroom grout. Moving in means you're trusting that the previous occupant left things right, and they usually didn't. NestGlow Co handles both: thorough, empty-home deep cleans for buyers, sellers, and renters across Monmouth, Ocean, and Middlesex County, NJ. Whether you searched for move-in cleaning or move-out cleaning, this is the page — we handle both, and the checklist below covers everything either one requires.",
  checklist: [
    "Inside all cabinets and drawers — wiped clean",
    "Refrigerator interior (if empty)",
    "All bathrooms sanitized — grout, fixtures, and tile scrubbed",
    "Kitchen appliances inside and out (oven, microwave, range hood)",
    "Floors deep-cleaned throughout — vacuumed and mopped to edges",
    "Inside all closets vacuumed and wiped",
    "Window sills and tracks cleaned",
    "Baseboards and trim hand-wiped throughout",
    "Ceiling fans and light fixtures dusted",
    "Walls spot-wiped — marks, residue, and scuffs",
    "Blinds wiped or dusted",
    "Garbage removed and bins wiped clean",
  ],
  features: [
    {
      badge: "DEPOSIT ON THE LINE",
      headline: "We clean to the standard landlords actually inspect",
      subhead: "Inside cabinets. Appliance interiors. Bathroom grout. Every item.",
      body: "Security deposit disputes almost always come down to cleanliness — and landlords know exactly where to look. We've done enough move-out cleans to know the difference between a clean that passes and one that costs you. Our team works empty properties room by room, covering every surface a walkthrough inspection will catch: oven interior, cabinet shelves, bathroom grout lines, baseboards, and floor edges. We can provide a receipt of service for your records if you need documentation for a dispute.",
    },
    {
      badge: "MOVING IN",
      headline: "You don't know what the last tenant left behind",
      subhead: "A move-in clean means you know exactly what you're living in.",
      body: "Even a property that looks clean often isn't — not at the level you'd expect for a home your family is moving into. Cabinets have residue. Bathroom grout has buildup. Refrigerators haven't been properly wiped. We go room by room on an empty property before your furniture arrives, cleaning every surface you'd expect and every one you'd miss. An empty home is the best time to deep-clean, and we make the most of it.",
    },
    {
      badge: "FLEXIBLE SCHEDULING",
      headline: "We work around your move date, not the other way around",
      subhead: "Same-day appointments available. Landlord coordination handled.",
      body: "Moves rarely go exactly to plan. We offer flexible scheduling — including same-day when our team is available — and can coordinate directly with your landlord or property manager if needed. If you're timing around a closing date, lease end, or showing, share the timeline when you book and we'll fit around it. We also offer optional photo documentation of the clean, giving you timestamped evidence of the property's condition if a deposit dispute ever comes up.",
    },
  ],
  faqs: [
    {
      q: "Will a move-out clean help me get my security deposit back?",
      a: "In most cases, yes. Landlords deduct deposits for the same things we clean: inside cabinets, appliance interiors, bathroom grout, baseboards, and floor edges. A professional move-out clean covers all of it. We also offer a receipt of service for your records if you need to dispute a deduction.",
    },
    {
      q: "When should I schedule a move-in clean?",
      a: "Ideally the day before or morning of your move — after the previous occupant has fully vacated but before your furniture arrives. An empty property gives us full access to every surface. If timing is tight, we can often work around your movers with enough advance notice.",
    },
    {
      q: "How is a move-in or move-out clean different from a regular cleaning?",
      a: "These cleans are designed for empty properties where we go inside cabinets, drawers, and closets, clean appliance interiors, scrub bathroom grout, and cover every floor edge — things a regular maintenance clean doesn't reach. It's a full reset, done when the property is fully vacated for maximum access.",
    },
    {
      q: "Can you schedule on the same day I move out?",
      a: "Same-day appointments are available when our schedule allows. We recommend booking at least a week in advance, especially at month-end or in summer when demand is high. If you're in a pinch, call or text us directly and we'll see what we can do.",
    },
    {
      q: "Do you offer photo documentation of the clean?",
      a: "Yes. If you want timestamped photos of the property after the clean for your records, just request it during booking. We'll photograph the kitchen, bathrooms, closets, and floors before we leave — useful protection if a deposit dispute comes up later.",
    },
  ],
  schemaServiceType: "Move-In Move-Out Cleaning Service",
};

export default function MoveInMoveOutPage() {
  return <ServicePageLayout {...props} />;
}
