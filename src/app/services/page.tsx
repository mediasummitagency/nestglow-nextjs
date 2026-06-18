import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Cleaning Services",
  description:
    "Residential, commercial, deep cleaning, and move in/out services across Monmouth, Ocean, and Middlesex County, NJ. Transparent pricing and a satisfaction guarantee.",
  alternates: { canonical: `${BASE_URL}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-charcoal-40">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">Services</span>
        </nav>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-charcoal leading-tight max-w-2xl">
            Cleaning services for homes and businesses in NJ
          </h1>
          <p className="text-base md:text-lg text-charcoal-70 max-w-2xl leading-relaxed">
            Every service is backed by a 24-hour satisfaction guarantee. Fully insured, bonded, and 10+ years strong.
          </p>
        </section>

        {/* Service cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="group bg-cream-100 rounded-2xl p-8 border border-transparent hover:border-brand transition-all hover:-translate-y-0.5 space-y-3"
                >
                  <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center">
                    <Icon size={18} className="text-brand-dark" />
                  </div>
                  <h2 className="text-xl font-bold text-charcoal group-hover:text-brand transition-colors">
                    {svc.title}
                  </h2>
                  <p className="text-sm text-charcoal-70 leading-relaxed">{svc.copy}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    Learn more <ChevronRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Comparison nudge */}
        <section className="bg-cream-100 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <h2 className="text-xl font-bold text-charcoal">
              Not sure what kind of clean you need?
            </h2>
            <p className="text-sm text-charcoal-70">
              We break down exactly what each type of cleaning covers — room by room — so you can choose with confidence.
            </p>
            <Link
              href="/general-vs-deep-cleaning"
              className="inline-flex items-center gap-2 bg-brand text-charcoal font-semibold px-6 py-3 rounded-full hover:bg-brand-dark transition-colors"
            >
              See the full comparison <ChevronRight size={14} />
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-brand py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <h2 className="text-3xl font-bold text-charcoal">Ready to book?</h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/book"
                className="bg-charcoal text-cream font-semibold px-8 py-3 rounded-full hover:bg-charcoal-70 transition-colors"
              >
                Book Your Cleaning
              </Link>
              <a href={BUSINESS.phoneHref} className="font-semibold text-charcoal hover:text-charcoal-70 transition-colors">
                Call {BUSINESS.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
