import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export const metadata: Metadata = {
  title: "Move-Out Cleaning in NJ: Security Deposit Ready",
  description:
    "Professional move-out cleaning for Monmouth, Ocean, and Middlesex County, NJ. Landlord-ready standard, same-day scheduling available. Get your deposit back.",
  alternates: { canonical: `${BASE_URL}/services/move-out-cleaning` },
  openGraph: {
    title: "Move-Out Cleaning in NJ: Security Deposit Ready",
    description:
      "Professional move-out cleaning for Monmouth, Ocean, and Middlesex County, NJ. Landlord-ready standard, same-day scheduling available. 100% satisfaction guarantee.",
    url: `${BASE_URL}/services/move-out-cleaning`,
  },
};

const props = {
  slug: "move-out-cleaning",
  h1: "Move-Out Cleaning in Monmouth, Ocean & Middlesex County",
  metaTitle: "Move-Out Cleaning in NJ: Security Deposit Ready",
  metaDescription:
    "Professional move-out cleaning for Monmouth, Ocean, and Middlesex County, NJ. Landlord-ready standard, same-day scheduling available. Get your deposit back.",
  introParagraph:
    "A move-out clean is one of the highest-stakes cleaning appointments you'll make, because your security deposit depends on it. NestGlow Co performs thorough, landlord-ready move-out cleans across Monmouth, Ocean, and Middlesex County, NJ. We know what landlords check and we hit every item: inside cabinets, appliance interiors, grout lines, baseboards, and every surface a walkthrough inspection will catch. Need a move-in clean for your new place? See our move-in cleaning page.",
  checklist: [
    "Full kitchen deep clean — appliances inside and out",
    "Cabinets and drawers wiped inside",
    "All bathrooms scrubbed — grout, tile, and fixtures",
    "Walls and doors spot-cleaned",
    "Baseboards and trim detail-cleaned by hand",
    "Inside all closets and pantry",
    "Ceiling fans and light fixtures dusted",
    "Window sills and tracks cleaned",
    "Blinds wiped or dusted",
    "All floors vacuumed and mopped (including edges)",
    "Garbage removed and bins wiped",
    "Refrigerator interior cleaned (if empty)",
  ],
  features: [
    {
      badge: "DEPOSIT ON THE LINE",
      headline: "The clean that gets your money back",
      subhead: "We know what landlords look for, and we cover every item.",
      body: "Security deposit disputes almost always come down to cleanliness. Landlords look inside cabinets, check the oven, run a finger along baseboards, and inspect the bathroom grout. That's exactly our checklist. We've performed hundreds of move-out cleans and know the difference between a clean that passes and one that doesn't. Our team works empty spaces room by room, covering every surface, corner, and detail a landlord will document. We can provide a receipt of service for your records if you need documentation.",
    },
    {
      badge: "FLEXIBLE SCHEDULING",
      headline: "We work around your move-out date",
      subhead: "Same-day scheduling available when our calendar allows.",
      body: "Moves rarely go exactly to plan. We understand that and offer flexible scheduling — including same-day appointments when our team is available. If you're coordinating with a closing date, lease end, or real estate showing, give us the timeline and we'll fit around it. Landlords and property managers can also contact us directly to schedule between tenants and minimize vacancy time. Just note it when you book and we'll follow up to confirm.",
    },
    {
      badge: "PHOTO DOCUMENTATION",
      headline: "Optional walkthrough photos for your records",
      subhead: "Protect yourself in case of a deposit dispute.",
      body: "If you want documentation that the property was left in clean condition, our team can perform a photo walkthrough at the end of the clean. This gives you timestamped evidence of the property's state when you handed it back — useful if a landlord later claims damage or uncleanliness. Just request it during booking. We'll photograph key areas: kitchen, bathrooms, floors, closets, and any areas of concern. The photos are yours to keep.",
    },
  ],
  faqs: [
    {
      q: "Will a move-out clean help me get my security deposit back?",
      a: "In most cases, yes. Landlords deduct deposits for the same reasons we clean: inside cabinets, appliance interiors, bathroom grout, baseboards, and floor edges. A professional move-out clean covers all of it. We also offer a receipt of service for your records in case you need to dispute a deduction.",
    },
    {
      q: "Can you schedule a move-out clean the same day I move out?",
      a: "Same-day appointments are available when our schedule allows. We recommend booking at least a week in advance, especially at month-end or in summer when demand is high. If you're in a pinch, call or text us directly and we'll see what we can do.",
    },
    {
      q: "What does 'landlord-ready standard' actually mean?",
      a: "It means we clean to the level a property manager or landlord expects during a move-out inspection: appliances inside and out, cabinets cleaned inside, bathroom grout scrubbed, baseboards hand-wiped, windows and sills, and no visible scuffs, stains, or buildup. The same standard that gets a deposit back.",
    },
    {
      q: "Do you offer photo documentation of the clean?",
      a: "Yes. If you want timestamped photos of the property after the clean for your records, just request it during booking. We'll photograph the kitchen, bathrooms, closets, and floors before we leave.",
    },
    {
      q: "Can you coordinate directly with my landlord or property manager?",
      a: "Absolutely. We work with property managers and landlords regularly to time the clean around showings, tenant turnovers, and lease end dates. Share the contact details when you book and we'll take it from there.",
    },
  ],
  schemaServiceType: "Move-Out Cleaning Service",
};

export default function MoveOutCleaningPage() {
  return <ServicePageLayout {...props} />;
}
