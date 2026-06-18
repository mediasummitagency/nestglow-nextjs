import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export const metadata: Metadata = {
  title: "Airbnb & Short-Term Rental Cleaning in Ocean & Monmouth County NJ",
  description:
    "Fast, reliable Airbnb and STR turnover cleaning for Ocean County and Monmouth County, NJ — Long Beach Island, Point Pleasant, Lavallette, and surrounding shore towns. Same-day available.",
  alternates: { canonical: `${BASE_URL}/services/airbnb-cleaning` },
  openGraph: {
    title: "Airbnb & Short-Term Rental Cleaning in Ocean & Monmouth County NJ",
    description:
      "Fast, reliable Airbnb and STR turnover cleaning for LBI, Point Pleasant, Lavallette, and the NJ Shore. Same-day between-guest turnovers. 100% satisfaction guarantee.",
    url: `${BASE_URL}/services/airbnb-cleaning`,
  },
};

const props = {
  slug: "airbnb-cleaning",
  serviceKind: "airbnb" as const,
  h1: "Airbnb & Short-Term Rental Cleaning in Ocean & Monmouth County",
  metaTitle: "Airbnb & Short-Term Rental Cleaning in Ocean & Monmouth County NJ",
  metaDescription:
    "Fast, reliable Airbnb and STR turnover cleaning for Ocean County and Monmouth County, NJ — Long Beach Island, Point Pleasant, Lavallette, and surrounding shore towns. Same-day available.",
  introParagraph:
    "Shore season doesn't slow down for a dirty rental. NestGlow Co provides fast, thorough Airbnb and short-term rental turnover cleaning across Ocean County and Monmouth County, NJ — including Long Beach Island, Point Pleasant Beach, Lavallette, Seaside Heights, and surrounding towns. We understand the turnaround pressure between guests, and we're built for it: same-day scheduling, linen handling, restock checks, and a hotel-standard clean every time.",
  checklist: [
    "All rooms refreshed to hotel standard",
    "Linens stripped and remade (or staged for host's laundry service)",
    "Towels replaced and folded",
    "Kitchen fully reset — dishes, appliances, surfaces",
    "Bathroom restocked and sanitized",
    "Garbage emptied and bins cleaned",
    "All floors swept and mopped",
    "All high-touch surfaces disinfected",
    "Guest supplies checked and restocked (host-provided)",
    "Outdoor areas tidied — deck, entry, patio furniture",
    "Same-day turnover scheduling available",
    "Welcome staging available on request",
  ],
  features: [
    {
      badge: "TURNOVER SPEED",
      headline: "Between guests in time for the next check-in",
      subhead: "Same-day turnovers available when you need them.",
      body: "The window between a check-out and a check-in is tight — sometimes just a few hours. Our team is accustomed to STR turnaround timing and works efficiently without cutting corners. We can schedule same-day turnovers when our calendar allows, and we communicate in real time so you know where we are. If you host on Airbnb, VRBO, or any other platform, we can sync our schedule to your booking calendar. Just contact us to set up your turnover cadence.",
    },
    {
      badge: "SHORE SEASON READY",
      headline: "Built for the NJ Shore rental market",
      subhead: "Serving Long Beach Island, Point Pleasant, Lavallette, and more.",
      body: "Ocean County's rental season is one of the most compressed in the state. From Memorial Day through Labor Day, properties turn over weekly — sometimes faster. We know the shore market and serve it directly: Long Beach Island (Ship Bottom, Surf City, Barnegat Light), Point Pleasant Beach, Lavallette, Seaside Heights, Mantoloking, Bay Head, and surrounding towns. If your rental is on or near the shore, we can cover it consistently through the season.",
    },
    {
      badge: "FULL RESTOCK CHECK",
      headline: "Linen handling and supply replenishment built in",
      subhead: "Guests notice when the details are right.",
      body: "A great short-term rental isn't just clean — it's set up correctly for the next guest. Our turnover clean includes a restock check against a checklist you provide: paper goods, toiletries, kitchen supplies, welcome items. We can strip and restage linens or leave them for your laundry service. We'll flag anything that's running low so you can restock before the next guest arrives. The goal is a property that looks and feels like no one was ever there.",
    },
  ],
  faqs: [
    {
      q: "How fast can you turn over a rental between guests?",
      a: "Typical turnaround time depends on property size, but most shore rentals are cleaned within 2–4 hours. A studio or one-bedroom can often be turned in under 2 hours. For larger properties, plan for 3–5 hours. We'll give you a time estimate during booking based on your square footage and unit count.",
    },
    {
      q: "How do I schedule turnovers around my booking calendar?",
      a: "We can set up a recurring turnover schedule aligned with your check-out and check-in days. Many shore hosts use Saturday-to-Saturday or Friday-to-Friday weekly cycles — we'll work within your calendar. Contact us directly to set up your season schedule before demand fills up.",
    },
    {
      q: "Do you handle laundry or just stage the linens?",
      a: "We strip the beds and restage with clean linens you provide. We don't currently offer an in-house laundry service, but we can bag and stage dirty linens for your laundry provider. If you have a specific protocol, just include it in your turnover notes and we'll follow it.",
    },
    {
      q: "Can you restock guest supplies?",
      a: "Yes — against a checklist you provide. We'll check your supply levels (paper goods, toiletries, kitchen basics, welcome items) and flag anything running low after each turnover. Restocking itself is on the host; we provide the eyes and the report.",
    },
    {
      q: "Do you serve Long Beach Island specifically?",
      a: "Yes. We serve LBI communities including Ship Bottom, Surf City, Barnegat Light, Beach Haven, and surrounding areas. We also cover Point Pleasant Beach, Lavallette, Seaside Heights, Bay Head, and other Ocean County shore towns. Contact us for availability in your specific area.",
    },
  ],
  schemaServiceType: "Short-Term Rental Cleaning Service",
};

export default function AirbnbCleaningPage() {
  return <ServicePageLayout {...props} />;
}
