import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export const metadata: Metadata = {
  title: "Deep House Cleaning Services in NJ",
  description:
    "Top-to-bottom deep cleaning for NJ homes. First-time cleans, seasonal refreshes, pre-guest and post-construction. Fully insured with a 24-hour satisfaction guarantee.",
  alternates: { canonical: `${BASE_URL}/services/deep-cleaning` },
};

const props = {
  slug: "deep-cleaning",
  h1: "Deep Cleaning in Monmouth, Ocean & Middlesex County, NJ",
  metaTitle: "Deep House Cleaning Services in NJ",
  metaDescription:
    "Top-to-bottom deep cleaning for NJ homes. First-time cleans, seasonal refreshes, pre-guest and post-construction. Fully insured with a 24-hour satisfaction guarantee.",
  introParagraph:
    "Our deep cleaning service is a thorough reset of your home that reaches the spots a regular maintenance clean doesn't cover. It's the right choice for first-time cleans, seasonal refreshes, pre-guest preparation, or any time your home needs more than surface care. Our team handles everything from inside appliances to baseboards to blind slats.",
  features: [
    {
      badge: "TRANSPARENT PRICING",
      headline: "Priced on what actually needs doing",
      subhead: "Deep cleans take longer. The quote accounts for that — upfront.",
      body: "A deep clean takes more time than a standard clean and we price accordingly. The final number depends on your home's size and how long it's been since it was last cleaned by a professional. You fill out the booking form, and we give you a firm quote before anything is scheduled. The number you receive is the number you pay.",
    },
    {
      badge: "EVERY STANDARD CLEAN",
      headline: "The areas a regular clean misses",
      subhead: "Baseboards, grout, ceiling fans, cabinet exteriors — all of it.",
      body: "A deep clean reaches the places a standard clean skips over. Baseboards and door frames get hand-wiped. Ceiling fans and vents get dusted. The kitchen gets a degreased backsplash and cabinet exteriors scrubbed. Bathrooms get a real grout scrub, not just a surface wipe. Bedrooms get under-bed cleaning and furniture polish. Window sills, blinds, light switches, and doorknobs all get cleaned. It's the reset your home needs before recurring service can keep up.",
    },
    {
      badge: "WHO THIS IS FOR",
      headline: "The right starting point before regular service",
      subhead: "One deep clean changes what \"clean\" means in your home.",
      body: "Most of our long-term residential clients start with a deep clean before scheduling recurring service. It resets the baseline so every maintenance clean after that has less to catch up on. It's also the right call for seasonal refreshes, pre-holiday prep when guests are coming, or post-renovation cleanup when dust gets into everything. If your home hasn't had a professional clean in a while, this is where to start.",
    },
  ],
  faqs: [
    {
      q: "How is deep cleaning different from general cleaning?",
      a: "Deep cleaning covers everything in a general clean plus the details that usually get skipped: inside the microwave, behind and under furniture, detailed grout scrubbing, blind dusting, and more. The simplest way to think about it is that general is maintenance and deep is restoration.",
    },
    {
      q: "How long does a deep clean take?",
      a: "Most deep cleans take 4-8 hours depending on home size and condition. A 2-bedroom apartment might take 4-5 hours; a 3,000+ sq ft home can run a full day. We'll give you an accurate estimate during booking.",
    },
    {
      q: "Do I need a deep clean before starting regular service?",
      a: "Usually, yes — especially if your home hasn't been professionally cleaned recently. A deep clean sets the baseline so recurring maintenance cleans stay manageable. After the initial deep clean, general cleans are usually enough to keep things looking great.",
    },
    {
      q: "Can you do a deep clean and a regular clean on different frequencies?",
      a: "Yes. Many clients book a deep clean quarterly or seasonally, and regular cleans weekly or bi-weekly in between. We can set up a recurring schedule that automatically swaps in a deep clean at the right interval.",
    },
    {
      q: "Do you clean inside the oven and refrigerator?",
      a: "Inside microwave is included in our deep clean. Inside oven and inside refrigerator are optional add-ons — available on both deep cleans and regular cleans. Just add them during booking.",
    },
  ],
  schemaServiceType: "Deep Cleaning Service",
};

export default function DeepCleaningPage() {
  return <ServicePageLayout {...props} />;
}
