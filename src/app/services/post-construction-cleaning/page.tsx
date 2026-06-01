import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export const metadata: Metadata = {
  title: "Post-Construction Cleaning in NJ — Fine Dust Removal Specialists",
  description:
    "Post-construction cleaning for Monmouth, Ocean, and Middlesex County, NJ. Multi-pass fine dust removal, HVAC vent cleaning, and contractor-friendly scheduling. Premium service.",
  alternates: { canonical: `${BASE_URL}/services/post-construction-cleaning` },
  openGraph: {
    title: "Post-Construction Cleaning in NJ — Fine Dust Removal Specialists",
    description:
      "Post-construction cleaning for Monmouth, Ocean, and Middlesex County, NJ. Multi-pass fine dust removal, HVAC vent cleaning, contractor-friendly scheduling. 100% satisfaction guarantee.",
    url: `${BASE_URL}/services/post-construction-cleaning`,
  },
};

const props = {
  slug: "post-construction-cleaning",
  h1: "Post-Construction Cleaning in Monmouth, Ocean & Middlesex County",
  metaTitle: "Post-Construction Cleaning in NJ — Fine Dust Removal Specialists",
  metaDescription:
    "Post-construction cleaning for Monmouth, Ocean, and Middlesex County, NJ. Multi-pass fine dust removal, HVAC vent cleaning, and contractor-friendly scheduling. Premium service.",
  introParagraph:
    "Construction dust doesn't behave like regular dust. It settles in layers, embeds in surfaces, clogs HVAC vents, and reappears days after a single pass. NestGlow Co provides professional post-construction cleaning across Monmouth, Ocean, and Middlesex County, NJ — a multi-pass process designed specifically for the aftermath of renovation and new construction. This is a premium service, priced accordingly, and built for homeowners and contractors who need a property clean enough to occupy, photograph, or hand off.",
  checklist: [
    "Fine construction dust removed — all surfaces, multiple passes",
    "HVAC vents and return registers vacuumed",
    "Window tracks and sills detail-cleaned",
    "Inside all cabinets and drawers",
    "Baseboards and trim — paint overspray and caulk residue removed",
    "Bathroom fixtures polished and grout cleaned",
    "Kitchen appliances and surfaces wiped",
    "Hard floors cleaned — wet and dry multi-pass",
    "Grout and tile scrubbed",
    "Stickers and labels removed from fixtures and glass",
    "Debris and packaging removed",
    "Final walk-through quality check",
  ],
  features: [
    {
      badge: "MULTI-PASS APPROACH",
      headline: "One pass isn't enough after construction",
      subhead: "Construction dust resettles. We account for that.",
      body: "After any renovation — even a minor one — fine particulate settles on every surface, often in quantities that aren't visible until the light hits it differently. A single cleaning pass disturbs the dust and temporarily clears it, but it resettles within hours. Our post-construction process uses multiple passes: a dry pass to remove bulk debris and surface dust, an HVAC vent clean to stop recirculation, and a final wet pass to capture what's still on surfaces. The result holds because we addressed the source, not just the symptom.",
    },
    {
      badge: "HVAC PROTECTION",
      headline: "Clean the vents before the system runs",
      subhead: "Construction dust in your HVAC circulates through the whole house.",
      body: "One of the most commonly skipped steps in post-construction cleaning is the HVAC system. Duct openings pull in construction debris during a remodel, and if the system runs before the vents are cleaned, it redistributes that dust through every room. We vacuum all accessible return registers and supply vents as part of every post-construction clean. For larger systems with significant accumulation, we may recommend professional duct cleaning as a follow-up — we'll let you know what we find.",
    },
    {
      badge: "CONTRACTOR-FRIENDLY",
      headline: "Flexible scheduling around your build timeline",
      subhead: "Pre-punch-list, post-final, or anytime you need it.",
      body: "We work with contractors, developers, and homeowners on timelines that match the build — not a rigid cleaning schedule. Whether you need a clean before the final punch-list walk, after the last subcontractor leaves, or the day before a real estate shoot, we accommodate it. Contractors can establish an ongoing relationship with us for consistent end-of-project cleaning across multiple jobs. Just contact us to discuss your schedule and we'll make it work.",
    },
  ],
  faqs: [
    {
      q: "What does 'multi-pass' actually mean for post-construction cleaning?",
      a: "It means we clean the property in multiple passes rather than one sweep. The first pass removes bulk debris and surface dust. We then clean the HVAC vents to stop dust recirculation. The final pass uses damp methods to capture remaining particulate. Because construction dust resettles, doing it in sequence produces a significantly better result than a single cleaning.",
    },
    {
      q: "Do you clean HVAC vents as part of the service?",
      a: "Yes — vacuuming all accessible return registers and supply vents is included in every post-construction clean. This is critical because a running HVAC system after construction will circulate fine dust through every room. For heavily contaminated duct systems, we may recommend professional duct cleaning as a follow-up step.",
    },
    {
      q: "When should I schedule the post-construction clean?",
      a: "Ideally after all construction activity is complete and before the property is occupied or listed. If you're coordinating with a punch-list walk or a real estate photographer, schedule us at least 48 hours before — this gives the multi-pass process time to settle and allows us to return if needed.",
    },
    {
      q: "Is post-construction cleaning priced differently than a standard clean?",
      a: "Yes. Post-construction cleaning is a premium service that takes significantly longer than a standard or deep clean. Pricing is based on property size, the extent of the work done, and the condition of the space. We provide a quote during booking — there are no hidden fees, and the final price is confirmed before we start.",
    },
    {
      q: "How long does a post-construction clean take?",
      a: "Most post-construction cleans take 4–8 hours depending on property size and the amount of construction residue. New construction or major renovations on larger homes can take a full day. We'll estimate the time when we quote the job so you can plan accordingly.",
    },
  ],
  schemaServiceType: "Post-Construction Cleaning Service",
};

export default function PostConstructionCleaningPage() {
  return <ServicePageLayout {...props} />;
}
