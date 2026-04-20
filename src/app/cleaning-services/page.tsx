import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Award, ThumbsUp, Clock } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";
import { getTownsByCounty } from "@/lib/towns";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import PhoneLink from "@/components/PhoneLink";

export const metadata: Metadata = {
  title: "House Cleaning Services in NJ | NestGlow Co",
  description:
    "NestGlow Co provides house cleaning across Monmouth, Ocean, and Middlesex County, NJ. 22 towns served. Insured, bonded, and guaranteed. Get a free quote today.",
  alternates: { canonical: `${BASE_URL}/cleaning-services` },
};

const counties = [
  {
    name: "Monmouth County",
    slug: "monmouth-county",
    towns: getTownsByCounty("Monmouth"),
    description:
      "Shore towns, large colonials, and historic homes from the coast to Marlboro and Freehold.",
  },
  {
    name: "Ocean County",
    slug: "ocean-county",
    towns: getTownsByCounty("Ocean"),
    description:
      "Rental turnovers near the shore and recurring family home cleaning from Point Pleasant to Jackson.",
  },
  {
    name: "Middlesex County",
    slug: "middlesex-county",
    towns: getTownsByCounty("Middlesex"),
    description:
      "Established suburbs from Old Bridge and Manalapan through Edison and Woodbridge.",
  },
];

const trustPoints = [
  { icon: ShieldCheck, label: "Fully insured & bonded" },
  { icon: Award, label: "10+ years of experience" },
  { icon: ThumbsUp, label: "24-hour satisfaction guarantee" },
  { icon: Clock, label: "Confirmed within 24 hours" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Cleaning Services", item: `${BASE_URL}/cleaning-services` },
  ],
};

export default function CleaningServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SiteNav />
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-charcoal-40">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">Cleaning Services</span>
        </nav>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Service Areas</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
            House Cleaning Services Across Central New Jersey
          </h1>
          <p className="text-charcoal-70 text-lg max-w-3xl leading-relaxed">
            {BUSINESS.name} provides residential and commercial cleaning across Monmouth, Ocean, and Middlesex County, NJ. Our insured, bonded team serves {counties.reduce((acc, c) => acc + c.towns.length, 0)} towns — from the shore to the suburbs.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/book"
              className="inline-flex items-center bg-gold text-charcoal font-semibold px-7 py-3.5 rounded-full hover:bg-gold-dark transition-colors text-sm"
            >
              Book a Cleaning
            </Link>
            <PhoneLink className="inline-flex items-center border border-charcoal/20 text-charcoal font-semibold px-7 py-3.5 rounded-full hover:border-gold hover:text-gold transition-colors text-sm" />
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-cream-100 border-y border-charcoal/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustPoints.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.label} className="flex items-center gap-3">
                  <Icon size={20} className="text-gold shrink-0" />
                  <span className="text-sm font-medium text-charcoal">{p.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* County sections */}
        {counties.map((county, i) => (
          <section
            key={county.slug}
            className={i % 2 === 1 ? "bg-cream-100 border-y border-charcoal/5" : ""}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-gold mb-2">
                    {county.name}
                  </p>
                  <h2 className="text-2xl font-bold text-charcoal">
                    Cleaning in {county.name}
                  </h2>
                  <p className="text-charcoal-70 mt-2 max-w-xl">{county.description}</p>
                </div>
                <Link
                  href={`/cleaning-services/${county.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-dark transition-colors shrink-0"
                >
                  View all {county.name} towns
                  <ChevronRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {county.towns.map((town) => (
                  <Link
                    key={town.slug}
                    href={`/cleaning-services/${town.slug}`}
                    className="group flex items-center justify-between bg-cream rounded-lg border border-charcoal/5 px-4 py-3 hover:border-gold/30 hover:shadow-sm transition-all"
                  >
                    <span className="text-sm font-medium text-charcoal group-hover:text-gold transition-colors">
                      {town.name}
                    </span>
                    <ChevronRight size={12} className="text-charcoal-40 group-hover:text-gold transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="bg-gold">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
              Don&apos;t see your town listed?
            </h2>
            <p className="text-charcoal/80 max-w-xl mx-auto">
              We may still serve your area. Give us a call or submit a booking request with your ZIP code — our team will let you know if we can schedule a clean.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/book"
                className="inline-flex items-center bg-charcoal text-cream font-semibold px-7 py-3.5 rounded-full hover:bg-charcoal/90 transition-colors text-sm"
              >
                Book a Cleaning
              </Link>
              <PhoneLink className="inline-flex items-center bg-cream/30 text-charcoal font-semibold px-7 py-3.5 rounded-full hover:bg-cream/50 transition-colors text-sm" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
