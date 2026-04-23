import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, ThumbsUp, Clock, Sparkles, Eye, Heart, RefreshCw } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";

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
      <main className="pt-[72px]">
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight">
            Treating your home like our own.
          </h1>
          <p className="text-lg text-charcoal-70 leading-relaxed">
            NestGlow Co is a small team built on a big belief: your home should feel like a refuge, not a chore. For more than a decade, we have been helping NJ homeowners and businesses stay on top of it all.
          </p>
        </section>

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
            <p className="text-base text-charcoal-70 leading-relaxed">
              Caroline started NestGlow Co because she believed that cleaning should never feel like another thing on a homeowner&apos;s to-do list. After more than a decade of helping Jersey Shore families keep their homes feeling calm and cared for, she built a team that shares the same standard: show up on time, notice the details, and leave every home better than we found it.
            </p>
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
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-gold-dark" />
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
                      <Icon size={16} className="text-gold" />
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
                className="bg-cream-100 border border-charcoal/10 hover:border-gold text-sm font-semibold text-charcoal px-4 py-2 rounded-full transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gold py-16">
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
