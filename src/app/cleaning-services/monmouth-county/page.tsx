import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Award, ThumbsUp, Clock } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";
import { getTownsByCounty } from "@/lib/towns";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import PhoneLink from "@/components/PhoneLink";

export const metadata: Metadata = {
  title: "House Cleaning in Monmouth County, NJ | NestGlow Co",
  description:
    "Professional house cleaning throughout Monmouth County, NJ. Serving Neptune, Red Bank, Middletown, Holmdel, Colts Neck, Marlboro, Freehold, and more. Insured, bonded. Free quote.",
  alternates: { canonical: `${BASE_URL}/cleaning-services/monmouth-county` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Cleaning Services", item: `${BASE_URL}/cleaning-services` },
    { "@type": "ListItem", position: 3, name: "Monmouth County", item: `${BASE_URL}/cleaning-services/monmouth-county` },
  ],
};

const trustPoints = [
  { icon: ShieldCheck, label: "Fully insured & bonded" },
  { icon: Award, label: "10+ years of experience" },
  { icon: ThumbsUp, label: "24-hour satisfaction guarantee" },
  { icon: Clock, label: "Confirmed within 24 hours" },
];

const towns = getTownsByCounty("Monmouth");

export default function MonmouthCountyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SiteNav />
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-charcoal-40 flex-wrap">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/cleaning-services" className="hover:text-gold transition-colors">Cleaning Services</Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">Monmouth County</span>
        </nav>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Service Area</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
            House Cleaning in Monmouth County, NJ
          </h1>
          <p className="text-charcoal-70 text-lg max-w-3xl leading-relaxed">
            {BUSINESS.name} provides residential and commercial cleaning services throughout Monmouth County — from the shore towns near Asbury Park to the larger colonials in Holmdel and Colts Neck. Our team is fully insured, bonded, and backed by a 24-hour satisfaction guarantee.
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

        {/* Town grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-bold text-charcoal mb-8">
            Monmouth County towns we serve
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {towns.map((town) => (
              <Link
                key={town.slug}
                href={`/cleaning-services/${town.slug}`}
                className="group bg-cream-100 rounded-xl border border-charcoal/5 p-5 hover:border-gold/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-charcoal group-hover:text-gold transition-colors">
                      {town.name}, NJ
                    </p>
                    <p className="text-xs text-charcoal-40 mt-0.5">
                      ZIP {town.zipCodes.join(", ")}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-charcoal-40 group-hover:text-gold transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* About Monmouth */}
        <section className="bg-cream-100 border-y border-charcoal/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-4">
            <h2 className="text-xl font-bold text-charcoal">About our Monmouth County service area</h2>
            <p className="text-charcoal-70 leading-relaxed">
              Monmouth County covers a wide range of residential types — from the historic cottages and condos near the shore in Asbury Park and Bradley Beach, to the large colonials and estates in Holmdel, Colts Neck, and Marlboro. Our team adjusts for both: smaller shore properties get the efficient, turnover-ready cleaning rental owners need; larger inland homes get properly sized crews for thorough coverage without cutting corners.
            </p>
            <p className="text-charcoal-70 leading-relaxed">
              We&apos;re based locally and work in Monmouth County multiple days per week — which means scheduling is straightforward and we can respond quickly when clients need to move things around.
            </p>
          </div>
        </section>

        {/* Other counties */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold mb-5">
            Also serving
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cleaning-services/ocean-county"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cream-100 rounded-full border border-charcoal/10 text-sm text-charcoal hover:border-gold hover:text-gold transition-colors"
            >
              Ocean County <ChevronRight size={12} />
            </Link>
            <Link
              href="/cleaning-services/middlesex-county"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cream-100 rounded-full border border-charcoal/10 text-sm text-charcoal hover:border-gold hover:text-gold transition-colors"
            >
              Middlesex County <ChevronRight size={12} />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
              Get a cleaning quote in Monmouth County
            </h2>
            <p className="text-charcoal/80 max-w-xl mx-auto">
              Submit a booking request and we confirm your appointment within 24 hours. No payment collected until your cleaning is complete.
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
