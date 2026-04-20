import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Customer Reviews | NestGlow Co",
  description:
    "Real reviews from NestGlow Co cleaning clients across Monmouth, Ocean, and Middlesex County, NJ. See what homeowners say about Caroline and her team.",
  alternates: { canonical: `${BASE_URL}/reviews` },
};

const reviews = [
  {
    name: "Eileen S.",
    date: "2025-10-08",
    dateDisplay: "October 2025",
    rating: 5,
    body: "I'm so happy I scheduled with Caroline and her team. Caroline was so kind and very professional. She arrived promptly right on time at 9 AM. Communication and reminders were sent to keep us updated about our appointment and her arrival time. She was very detailed in cleaning our house top to bottom, and the house sparkled when she was done. I highly recommend NestGlow Co for your cleaning needs.",
    location: "Monmouth County, NJ",
  },
  {
    name: "Jeffrey R.",
    date: "2020-01-31",
    dateDisplay: "January 2020",
    rating: 5,
    body: "Caroline is extremely dependable and does a great job. She is very flexible with my schedule and always accommodates my schedule. My house is sparkling after she leaves! I would highly recommend her.",
    location: "Monmouth County, NJ",
  },
  {
    name: "Greg A.",
    date: "2020-01-31",
    dateDisplay: "January 2020",
    rating: 5,
    body: "Caroline is punctual, flexible, and dependable! I love walking into my house when she's been here!",
    location: "Monmouth County, NJ",
  },
  {
    name: "Elena H.",
    date: "2020-01-29",
    dateDisplay: "January 2020",
    rating: 5,
    body: "Caroline has been cleaning my home for 4+ years. She is professional, reliable, thorough, and always does an exceptional job. She is flexible and easy to communicate with. I look forward to coming home after she has been there. I highly recommend her services!",
    location: "Monmouth County, NJ",
  },
  {
    name: "Danny H.",
    date: "2020-01-29",
    dateDisplay: "January 2020",
    rating: 5,
    body: "Caroline is great! She cleans my house bi-weekly and I couldn't be happier. She pays attention to detail and the house is always spotless. I've tried other cleaners in the past and she is by far the best. Highly recommend!",
    location: "Monmouth County, NJ",
  },
];

const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS.name,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: reviews.length,
    bestRating: "5",
    worstRating: "1",
  },
  review: reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    datePublished: r.date,
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: "5",
    },
    reviewBody: r.body,
  })),
};

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-gold fill-gold" />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />

      <SiteNav />
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-charcoal-40">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">Reviews</span>
        </nav>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Client Reviews</p>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal">
            What Our Clients Say
          </h1>
          <div className="flex items-center gap-3">
            <StarRow count={5} />
            <span className="text-charcoal-70 text-sm">
              5.0 average · {reviews.length} reviews
            </span>
          </div>
          <p className="text-charcoal-70 max-w-2xl leading-relaxed">
            Every review below is real and unedited — from homeowners across Monmouth County, NJ who have trusted NestGlow Co with their homes.
          </p>
        </section>

        {/* Reviews grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <article
                key={review.name}
                className="bg-cream-100 rounded-2xl border border-charcoal/5 p-6 space-y-4 flex flex-col"
              >
                <StarRow count={review.rating} />
                <p className="text-charcoal-70 text-sm leading-relaxed flex-1 italic">
                  &ldquo;{review.body}&rdquo;
                </p>
                <footer className="space-y-0.5 pt-2 border-t border-charcoal/5">
                  <p className="text-sm font-semibold text-charcoal">{review.name}</p>
                  <p className="text-xs text-charcoal-40">
                    {review.location} · {review.dateDisplay}
                  </p>
                </footer>
              </article>
            ))}
          </div>
        </section>

        {/* About our guarantee */}
        <section className="bg-cream-100 border-y border-charcoal/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-4">
            <h2 className="text-xl font-bold text-charcoal">Our satisfaction guarantee</h2>
            <p className="text-charcoal-70 leading-relaxed">
              Every clean is backed by a 24-hour satisfaction guarantee. If something wasn&apos;t done to your standard, reach out within 24 hours and we&apos;ll return to address it at no additional charge. The reviews above are the result of that commitment — not a marketing line.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
            >
              Learn more about Caroline and her team
              <ChevronRight size={14} />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center space-y-4">
            <h2 className="text-2xl font-bold text-charcoal">
              Ready to add your name to the list?
            </h2>
            <p className="text-charcoal/80">
              Book a cleaning and see what the reviews are talking about.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center bg-charcoal text-cream font-semibold px-7 py-3.5 rounded-full hover:bg-charcoal/90 transition-colors text-sm mt-2"
            >
              Book a Cleaning
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
