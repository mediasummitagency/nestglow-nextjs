import { Suspense } from "react";
import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";
import { ZipRouter } from "@/components/forms/ZipRouter";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { SignatureProcess } from "@/components/sections/SignatureProcess";
import Tiers from "@/components/sections/Tiers";
import CtaBlock from "@/components/sections/CtaBlock";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

export const metadata: Metadata = {
  title: "Book a Cleaning in NJ — NestGlow Co",
  description:
    "100% satisfaction guarantee — we'll make it right or it's free. Enter your ZIP for an instant quote. No contract. Serving Monmouth, Ocean & Middlesex County, NJ.",
  alternates: { canonical: `${BASE_URL}/book-now` },
  openGraph: {
    title: "Book a Cleaning in NJ — NestGlow Co",
    description:
      "100% satisfaction guarantee — we'll make it right or it's free. Enter your ZIP for an instant quote. No contract. Serving Monmouth, Ocean & Middlesex County, NJ.",
    url: `${BASE_URL}/book-now`,
  },
  robots: { index: false, follow: false },
};

const bookNowFaqs = [
  {
    question: "What's included in every NestGlow cleaning?",
    answer:
      "Every visit follows our Signature Clean checklist — kitchen surfaces, appliances (exterior), bathrooms, bedrooms, living areas, floors, and more. You can see the full room-by-room breakdown on our process page. Higher tiers add extras like baseboards, interior windows, and full-detail work.",
  },
  {
    question: "How much does house cleaning cost in NJ?",
    answer:
      "Most homes in Monmouth, Ocean, and Middlesex County fall between $140 and $400 per clean depending on home size, tier, and frequency. We give you a firm quote before any work begins — no surprises.",
  },
  {
    question: "How do I book — is there a contract?",
    answer:
      "No contract, no commitment. Enter your ZIP above to see your options, pick a tier, and submit your booking request. We confirm within 24 hours. You can cancel or adjust at any time.",
  },
  {
    question: "When can you start?",
    answer:
      "Most new clients get scheduled within 3–5 business days. Same-day cleaning is available for an additional fee when our schedule allows. Once you submit your request, we'll reach out to confirm your first date.",
  },
  {
    question: "What if I'm not satisfied with the clean?",
    answer:
      "We come back. Our 100% satisfaction guarantee means if anything wasn't done to your standard, we return within 24 hours and make it right — at no extra charge.",
  },
  {
    question: "What's your satisfaction guarantee?",
    answer:
      "If you're not happy with any part of your clean, let us know within 24 hours and we'll come back to make it right — at no charge. Every booking is covered, every time. No fine print, no arguing about it.",
  },
];

export default function BookNowPage() {
  return (
    <main className="pt-[72px]">

      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
            Professional home cleaning, ready when you are.
          </h1>
          <p className="text-lg text-charcoal-70 leading-relaxed">
            Serving Monmouth, Ocean &amp; Middlesex County, NJ — insured, bonded, 100% satisfaction guaranteed.
          </p>
          <ZipRouter variant="hero" className="max-w-lg mx-auto mt-8" />
        </div>
        <TrustBadges />
      </section>

      {/* Signature Process */}
      <SignatureProcess />

      {/* Tiers */}
      <section id="plans" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Suspense fallback={null}>
            <Tiers />
          </Suspense>
        </div>
      </section>

      {/* Phone CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <CtaBlock variant="phone" />
      </div>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl font-bold text-charcoal mb-8">Quick answers</h2>
        <FAQAccordion namespace="book-now-faq" items={bookNowFaqs} />
      </section>

      {/* ZIP CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-16">
        <CtaBlock variant="zip" heading="See if we serve your area" />
      </div>

    </main>
  );
}
