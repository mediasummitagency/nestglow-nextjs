import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BASE_URL, BUSINESS } from "@/lib/config";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import ComparisonTable from "@/components/sections/ComparisonTable";

export const metadata: Metadata = {
  title: "General Cleaning vs. Deep Cleaning — What's the Difference?",
  description:
    "What's included in a general cleaning versus a deep cleaning? A full room-by-room comparison from NestGlow Co, serving Monmouth, Ocean, and Middlesex County, NJ.",
  alternates: { canonical: `${BASE_URL}/general-vs-deep-cleaning` },
};

const comparisonFaqs = [
  {
    q: "Do I need a deep cleaning before starting regular service?",
    a: "Usually yes, especially if your home hasn't been professionally cleaned in a while. A deep clean sets the baseline so recurring general cleans can stay manageable. After the first deep clean, weekly or bi-weekly general cleans are typically enough to maintain.",
  },
  {
    q: "How often should I schedule a deep cleaning?",
    a: "Most clients schedule a deep clean quarterly or seasonally — spring, end of summer, and before the holidays are common times. If you have pets or high foot traffic, every 3-4 months works well. For lower-traffic homes, twice a year is often enough.",
  },
  {
    q: "Can I mix general and deep cleans in the same schedule?",
    a: "Absolutely — that's what most of our clients do. A typical setup is bi-weekly general cleans with a deep clean every 3 months swapped in automatically. We handle the scheduling so you don't have to remember.",
  },
  {
    q: "Why does deep cleaning cost more?",
    a: "Deep cleaning adds several hours of on-site time and covers tasks that general cleaning skips entirely — inside appliances, baseboard hand-wiping, blind dusting, grout scrubbing. The price reflects the additional time and scope, not a premium on the service itself.",
  },
  {
    q: "Is a move-out clean the same as a deep clean?",
    a: "Similar, but not identical. A deep clean is designed for a furnished, occupied home. A move-out clean is designed for an empty property and includes inside cabinets, inside refrigerator, and interior windows — areas that are inaccessible in a furnished home. If you're moving, book the move in / move out clean.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: comparisonFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function GeneralVsDeepPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteNav />
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-charcoal-40">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">General vs. Deep Cleaning</span>
        </nav>

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Cleaning explained
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-charcoal leading-tight">
            General Cleaning vs. Deep Cleaning: What&apos;s the Difference?
          </h1>
          <p className="text-base md:text-lg text-charcoal-70 leading-relaxed">
            The short answer: a general cleaning keeps your home maintained week to week, while a deep cleaning is a top-to-bottom reset that hits the spots regular cleans don&apos;t cover. General cleans are for ongoing maintenance; deep cleans are for first-time service, seasonal refreshes, or any time your home needs more than surface care. Here&apos;s the full breakdown.
          </p>
        </section>

        {/* Comparison table */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <ComparisonTable />
        </section>

        {/* When to choose which */}
        <section className="bg-cream-100 py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-8 text-center">
              Which one is right for you?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-cream rounded-2xl p-8 border border-charcoal/10 space-y-4">
                <h3 className="text-lg font-bold text-charcoal">
                  Choose general cleaning when&hellip;
                </h3>
                <ul className="space-y-2">
                  {[
                    "Your home is already reasonably clean and you want to maintain it",
                    "You're starting a weekly or bi-weekly recurring schedule",
                    "You want regular upkeep without a top-to-bottom overhaul",
                    "You've recently had a deep clean and are in maintenance mode",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-charcoal-70">
                      <span className="text-sage-dark font-bold mt-0.5">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-cream rounded-2xl p-8 border border-gold/30 space-y-4">
                <h3 className="text-lg font-bold text-charcoal">
                  Choose deep cleaning when&hellip;
                </h3>
                <ul className="space-y-2">
                  {[
                    "It's your first time booking with us",
                    "You're doing a seasonal reset (spring cleaning, pre-holiday)",
                    "Guests are coming and you want the home in top shape",
                    "Your home hasn't been professionally cleaned in a while",
                    "You're preparing for a move in or move out",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-charcoal-70">
                      <span className="text-gold font-bold mt-0.5">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing transparency */}
        <section className="py-12 max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-charcoal mb-3">About pricing</h2>
          <p className="text-sm text-charcoal-70 leading-relaxed">
            General cleaning is our baseline service. Deep cleaning adds additional time on-site and covers tasks that go beyond a standard maintenance clean. We always provide a firm quote before any cleaning begins — the number you see in the booking form is what you pay.
          </p>
        </section>

        {/* FAQ */}
        <section className="bg-cream-100 py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-charcoal mb-8">
              Frequently asked questions
            </h2>
            <Accordion multiple={false} className="space-y-2">
              {comparisonFaqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-cream rounded-xl border border-charcoal/10 px-4"
                >
                  <AccordionTrigger className="text-sm font-semibold text-charcoal text-left py-4 hover:text-gold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-charcoal-70 leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <h2 className="text-3xl font-bold text-charcoal">
              Ready to book? Tell us about your home.
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/book"
                className="bg-charcoal text-cream font-semibold px-8 py-3 rounded-full hover:bg-charcoal-70 transition-colors"
              >
                Book Your Cleaning
              </Link>
              <a
                href={BUSINESS.phoneHref}
                className="font-semibold text-charcoal hover:text-charcoal-70 transition-colors"
              >
                Call {BUSINESS.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
