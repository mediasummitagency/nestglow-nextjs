import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export const metadata: Metadata = {
  title: "Move-In Cleaning in NJ — Start Fresh from Day One",
  description:
    "Move-in cleaning for Monmouth, Ocean, and Middlesex County, NJ. Deep clean before your furniture arrives. Insured, bonded, and 100% satisfaction guaranteed.",
  alternates: { canonical: `${BASE_URL}/services/move-in-cleaning` },
  openGraph: {
    title: "Move-In Cleaning in NJ — Start Fresh from Day One",
    description:
      "Move-in cleaning for Monmouth, Ocean, and Middlesex County, NJ. Deep clean before your furniture arrives. 100% satisfaction guarantee.",
    url: `${BASE_URL}/services/move-in-cleaning`,
  },
};

const props = {
  slug: "move-in-cleaning",
  h1: "Move-In Cleaning in Monmouth, Ocean & Middlesex County",
  metaTitle: "Move-In Cleaning in NJ — Start Fresh from Day One",
  metaDescription:
    "Move-in cleaning for Monmouth, Ocean, and Middlesex County, NJ. Deep clean before your furniture arrives. Insured, bonded, and 100% satisfaction guaranteed.",
  introParagraph:
    "Moving into a new home means starting fresh — but you don't know who lived there before or what they left behind. A move-in clean gives you the peace of mind that every surface, cabinet, and corner has been properly cleaned before your furniture, your family, and your life move in. NestGlow Co performs thorough move-in cleans across Monmouth, Ocean, and Middlesex County, NJ. Moving out too? See our move-out cleaning page.",
  checklist: [
    "Inside all cabinets and drawers — wiped clean",
    "Refrigerator interior (if empty)",
    "All bathrooms sanitized from scratch — grout, fixtures, tile",
    "Kitchen appliances inside and out",
    "Floors deep-cleaned before furniture arrives",
    "Inside all closets vacuumed and wiped",
    "Window sills and tracks",
    "Baseboards throughout",
    "Light fixtures and ceiling fans",
    "Walls spot-wiped — marks, residue, scuffs",
  ],
  features: [
    {
      badge: "START CLEAN",
      headline: "You don't know what the last tenant left behind",
      subhead: "A move-in clean means you know exactly what you're living in.",
      body: "Even a property that looks clean often isn't — not at the level you'd expect for a space you're moving your family into. Cabinets have residue. Bathroom grout has buildup. Refrigerators haven't been properly wiped. We go room by room on an empty property before your things arrive, cleaning every surface you'd expect and every one you'd miss. It's the most efficient time to deep-clean a home, and we make the most of it.",
    },
    {
      badge: "BEFORE FURNITURE ARRIVES",
      headline: "The best time to clean is before you move in",
      subhead: "An empty home means every corner is accessible.",
      body: "Once furniture is in, getting to baseboards, floor edges, behind appliances, and inside closets gets harder. We schedule move-in cleans for empty properties specifically so we can access every surface without obstacles. The result is a level of clean that's nearly impossible to achieve once you're living in the space. If you need a same-day-of-move clean, we can often accommodate — just let us know your timeline when you book.",
    },
    {
      badge: "PEACE OF MIND",
      headline: "One less thing to worry about on moving day",
      subhead: "We handle the clean so you can focus on everything else.",
      body: "Moving day already has too many moving parts. We arrive, handle the clean thoroughly, and leave before your movers show up — or coordinate around whatever schedule works for you. Our team is background-checked, fully insured, and familiar with the properties in Monmouth, Ocean, and Middlesex County. You can focus on the move. We'll make sure the home is ready for it.",
    },
  ],
  faqs: [
    {
      q: "When should I schedule a move-in clean?",
      a: "Ideally the day before or morning of your move — after the previous occupant has fully vacated but before your furniture arrives. An empty property gives us full access to every surface. If timing is tight, we can work around your movers with enough advance notice.",
    },
    {
      q: "How is a move-in clean different from a regular cleaning?",
      a: "A move-in clean is designed for an empty property where the history is unknown. We go inside cabinets, drawers, and closets, clean appliance interiors, scrub bathroom grout, and cover every floor edge and surface — things a regular maintenance clean doesn't reach. It's a full reset.",
    },
    {
      q: "Do I need to be at the property during the clean?",
      a: "Not at all. Many clients give us a key or code and we take care of the rest. We'll confirm arrival time in advance and let you know when we're done. The property is ready for your furniture when you arrive.",
    },
    {
      q: "Do you bring your own supplies?",
      a: "Yes — we bring all equipment and supplies. If you have specific products you want us to use (fragrance-free, green cleaners, etc.), just let us know when you book and we'll accommodate.",
    },
  ],
  schemaServiceType: "Move-In Cleaning Service",
};

export default function MoveInCleaningPage() {
  return <ServicePageLayout {...props} />;
}
