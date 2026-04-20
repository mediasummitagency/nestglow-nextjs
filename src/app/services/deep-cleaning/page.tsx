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
    "Our deep cleaning service is a thorough, top-to-bottom reset of your home — the kind of clean that hits the spots a regular maintenance clean doesn't cover. It's the right choice for first-time cleans, seasonal refreshes, pre-guest preparation, or any time your home needs more than surface care. Our team handles everything from inside appliances to baseboards to blind slats.",
  whatsIncluded: [
    "All surfaces dusted in detail, including ceiling fans and vents",
    "Baseboards, door frames, and woodwork hand-wiped",
    "Light switches and doorknobs cleaned and disinfected",
    "Kitchen — interior microwave, degreased backsplash, cabinet exteriors",
    "Bathrooms — deep grout scrub, polished fixtures, detailed toilet cleaning",
    "Bedrooms — under-bed cleaning, closet vacuuming, furniture polish",
    "Blinds dusted, window sills hand-wiped",
    "Floors — detailed mopping, edge cleaning",
  ],
  bestFor: [
    "First-time clients who want a full reset before starting regular service",
    "Seasonal refreshes (spring cleaning, end-of-summer)",
    "Pre-holiday prep when guests are coming",
    "Post-renovation or post-construction cleanup",
    "Homes that haven't been professionally cleaned in a while",
  ],
  priceNote:
    "Deep cleaning adds approximately $150 to a standard clean and takes longer on-site. Final pricing scales with home size and condition — we'll give you the exact number after you submit the booking form.",
  faqs: [
    {
      q: "How is deep cleaning different from general cleaning?",
      a: "Deep cleaning covers everything in a general clean plus the details that usually get skipped — inside microwave, behind and under furniture, detailed grout scrubbing, blind dusting, and more. The easiest way to think about it: general is maintenance, deep is restoration.",
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
