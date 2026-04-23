import type { Metadata } from "next";
import Link from "next/link";
import { Home, Briefcase, Sparkles, Truck, ChevronRight } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cleaning Services",
  description:
    "Residential, commercial, deep cleaning, and move in/out services across Monmouth, Ocean, and Middlesex County, NJ. Transparent pricing and a satisfaction guarantee.",
  alternates: { canonical: `${BASE_URL}/services` },
};

const services = [
  {
    href: "/services/residential-cleaning",
    icon: Home,
    title: "Residential Cleaning",
    copy: "Regular maintenance cleans, one-time deep cleans, and special add-ons for the homes you live in and love. Weekly, bi-weekly, and monthly schedules available.",
  },
  {
    href: "/services/commercial-cleaning",
    icon: Briefcase,
    title: "Commercial Cleaning",
    copy: "Offices, storefronts, and professional suites. After-hours and weekend service available. Schedules built around your business, not ours.",
  },
  {
    href: "/services/deep-cleaning",
    icon: Sparkles,
    title: "Deep Cleaning",
    copy: "Top-to-bottom detailing that covers what regular cleans miss — inside appliances, ceiling fans, baseboards, grout, and more. Right for first-time clients and seasonal resets.",
  },
  {
    href: "/services/move-in-move-out",
    icon: Truck,
    title: "Move In / Move Out",
    copy: "Empty-home deep cleans for sellers, buyers, landlords, and tenants. We cover inside cabinets, appliances, and all the spots that matter for inspections and handovers.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-charcoal-40">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
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
                  className="group bg-cream-100 rounded-2xl p-8 border border-transparent hover:border-gold transition-all hover:-translate-y-0.5 space-y-3"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <Icon size={18} className="text-gold-dark" />
                  </div>
                  <h2 className="text-xl font-bold text-charcoal group-hover:text-gold transition-colors">
                    {svc.title}
                  </h2>
                  <p className="text-sm text-charcoal-70 leading-relaxed">{svc.copy}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
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
              className="inline-flex items-center gap-2 bg-gold text-charcoal font-semibold px-6 py-3 rounded-full hover:bg-gold-dark transition-colors"
            >
              See the full comparison <ChevronRight size={14} />
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gold py-16">
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
