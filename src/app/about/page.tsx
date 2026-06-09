import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, ThumbsUp, Clock, Sparkles, Eye, Heart, RefreshCw } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "About NestGlow Co",
  description:
    "Family-run, 10+ years strong. Meet the team behind NestGlow Co, serving Monmouth, Ocean, and Middlesex County, NJ.",
  alternates: { canonical: `${BASE_URL}/about` },
};

const trustItems = [
  { icon: Award, label: "10+ years of experience" },
  { icon: ShieldCheck, label: "Fully insured & bonded" },
  { icon: ThumbsUp, label: "Reliable & professional" },
  { icon: Clock, label: "24-hour satisfaction guarantee" },
];

const values = [
  { icon: Eye, label: "Transparency", body: "No hidden fees. You know exactly what you're getting." },
  { icon: Sparkles, label: "Convenience", body: "Book in a tap. We work around your schedule, not ours." },
  { icon: Heart, label: "Care", body: "Your home, your schedule, your trust. We treat it accordingly." },
  { icon: RefreshCw, label: "Consistency", body: "Same standard on the first clean and the fiftieth." },
];

export default function AboutPage() {
  return (
    <>
      <main>
        <PageHero
          heading="Treating your home like our own."
          subheading="NestGlow Co is a small team built on a big belief: your home should feel like a refuge, not a chore. For more than a decade, we have been helping NJ homeowners and businesses stay on top of it all."
          centered
        />

        {/* Meet Caroline */}
        <section className="bg-cream-100 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6">
              Meet Caroline
            </h2>
            {/* Photo placeholder */}
            <div className="w-32 h-32 rounded-full bg-cream border border-charcoal/10 flex items-center justify-center text-charcoal-40 text-xs text-center mb-6 mx-auto md:mx-0">
              Photo<br />coming soon
            </div>
            <div className="space-y-5 text-base text-charcoal-70 leading-relaxed">
              <p>
                Caroline started NestGlow Co in [PLACEHOLDER: year] with a simple belief: cleaning should never feel like another thing on a homeowner&apos;s to-do list. She had been cleaning homes on her own since [PLACEHOLDER: year], building a reputation one satisfied family at a time along the Jersey Shore.
              </p>
              <p>
                As word spread, Caroline couldn&apos;t keep up alone. By [PLACEHOLDER: year] she had brought on her first team members — people she trained herself and trusted to hold the same standard she had set from day one: show up on time, notice the details, and leave every home better than you found it.
              </p>
              <p>
                Today NestGlow Co serves [PLACEHOLDER: number]+ homes across Monmouth, Ocean, and Middlesex County. The team has grown, but the approach hasn&apos;t changed: small-company care, professional results, and a guarantee that if something isn&apos;t right, we come back and fix it.
              </p>
            </div>
          </div>
        </section>

        {/* Why trust us */}
        <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-8">
            Why you can trust us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-4 bg-cream-100 rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-brand-dark" />
                  </div>
                  <p className="font-semibold text-charcoal">{item.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* What we believe in */}
        <section className="bg-cream-100 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-8">
              What we believe in
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((val) => {
                const Icon = val.icon;
                return (
                  <div key={val.label} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-brand" />
                      <h3 className="font-bold text-charcoal">{val.label}</h3>
                    </div>
                    <p className="text-sm text-charcoal-70 leading-relaxed">{val.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service area */}
        <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
            Where we work
          </h2>
          <p className="text-charcoal-70 leading-relaxed mb-4">
            We serve homeowners and businesses across three counties along the Jersey Shore and inland NJ.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Monmouth County", href: "/cleaning-services/monmouth-county" },
              { label: "Ocean County", href: "/cleaning-services/ocean-county" },
              { label: "Middlesex County", href: "/cleaning-services/middlesex-county" },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="bg-cream-100 border border-charcoal/10 hover:border-brand text-sm font-semibold text-charcoal px-4 py-2 rounded-full transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-brand py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <h2 className="text-3xl font-bold text-charcoal">
              Ready to come home to clean?
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
    </>
  );
}
