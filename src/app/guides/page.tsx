import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { BASE_URL } from "@/lib/config";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cleaning Guides for NJ Homeowners | NestGlow Co",
  description:
    "Practical cleaning guides for homeowners in New Jersey — pricing, move-out checklists, how to prepare for your cleaner, and more from NestGlow Co.",
  alternates: { canonical: `${BASE_URL}/guides` },
};

const guides = [
  {
    slug: "how-much-does-house-cleaning-cost-nj",
    title: "How Much Does House Cleaning Cost in NJ?",
    description:
      "A plain-language breakdown of what drives house cleaning prices in New Jersey — bedroom count, home size, frequency, deep cleans, and what a fair quote looks like.",
    readTime: "6 min read",
    category: "Pricing",
  },
  {
    slug: "what-to-expect-move-out-cleaning",
    title: "What to Expect from a Move-Out Cleaning",
    description:
      "What a professional move-out clean covers, how it differs from a regular cleaning, what landlords look for, and how to prepare your home before the cleaner arrives.",
    readTime: "5 min read",
    category: "Move In / Move Out",
  },
  {
    slug: "how-to-prepare-home-for-cleaner",
    title: "How to Prepare Your Home Before Your Cleaner Arrives",
    description:
      "Small steps that make a big difference — what to do (and what not to do) before your cleaning appointment so your team can focus on deep cleaning, not tidying.",
    readTime: "4 min read",
    category: "Tips",
  },
];

export default function GuidesPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-charcoal-40">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">Guides</span>
        </nav>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Resources</p>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal">
            Cleaning Guides for NJ Homeowners
          </h1>
          <p className="text-charcoal-70 max-w-2xl leading-relaxed">
            Practical answers to the questions homeowners ask most — pricing, move-out cleans, how to prepare for your first appointment, and more.
          </p>
        </section>

        {/* Guide cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-cream-100 rounded-2xl border border-charcoal/5 p-6 space-y-4 flex flex-col hover:border-gold/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                    {guide.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-charcoal-40">
                    <Clock size={11} />
                    {guide.readTime}
                  </span>
                </div>
                <h2 className="font-bold text-charcoal text-lg leading-snug group-hover:text-gold transition-colors">
                  {guide.title}
                </h2>
                <p className="text-sm text-charcoal-70 leading-relaxed flex-1">
                  {guide.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold group-hover:gap-2.5 transition-all">
                  Read guide <ChevronRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center space-y-4">
            <h2 className="text-2xl font-bold text-charcoal">
              Questions not covered here?
            </h2>
            <p className="text-charcoal/80">
              Check our FAQ or reach out directly — we respond quickly.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/faq"
                className="inline-flex items-center bg-charcoal text-cream font-semibold px-7 py-3.5 rounded-full hover:bg-charcoal/90 transition-colors text-sm"
              >
                View FAQ
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center bg-cream/30 text-charcoal font-semibold px-7 py-3.5 rounded-full hover:bg-cream/50 transition-colors text-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
