import { Suspense } from "react";
import Link from "next/link";
import { ShieldCheck, Award, ThumbsUp, Clock, Star, ChevronRight, Sparkles, Home, FileText, Utensils, Bath, Bed, Monitor, DoorOpen, Briefcase, Truck, CheckCircle } from "lucide-react";
import { FAQ } from "@/components/sections/FAQ";
import { AnimatedStat } from "@/components/sections/StatCards";
import { ServiceAreasTabs } from "@/components/sections/ServiceAreasTabs";
import { StickyScrollFeatures, ScrollFeature } from "@/components/layout/StickyScrollFeatures";
import Tiers from "@/components/sections/Tiers";
import CtaBlock from "@/components/sections/CtaBlock";
import { GuaranteeBadge } from "@/components/ui/GuaranteeBadge";
import { BUSINESS, BASE_URL } from "@/lib/config";
import { reviews } from "@/lib/reviews";
import { ReactNode } from "react";

export type FeatureSection = {
  badge: string
  headline: string
  subhead: string
  body: string
}

export type ServicePageProps = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  introParagraph: string;
  features: FeatureSection[];
  faqs: Array<{ q: string; a: string }>;
  schemaServiceType: string;
  checklist?: string[];
};

const services = [
  { href: "/services/residential-cleaning",        icon: Home,      title: "Residential Cleaning",       copy: "Regular maintenance, deep cleans, and special requests for the homes you live in and love." },
  { href: "/services/commercial-cleaning",         icon: Briefcase, title: "Commercial Cleaning",         copy: "Offices, storefronts, and professional suites. Schedules built around your business hours." },
  { href: "/services/deep-cleaning",               icon: Sparkles,  title: "Deep Cleaning",               copy: "Top-to-bottom detailing for first-time cleans, seasonal resets, and pre-guest refreshes." },
  { href: "/services/move-out-cleaning",           icon: Truck,     title: "Move-Out Cleaning",           copy: "Deposit-ready deep cleans for rentals and homes you're handing back to a landlord." },
  { href: "/services/move-in-cleaning",            icon: Home,      title: "Move-In Cleaning",            copy: "Start fresh before your furniture arrives. A spotless home from day one." },
  { href: "/services/airbnb-cleaning",             icon: Star,      title: "Airbnb & STR Cleaning",       copy: "Rapid guest turnovers for Shore rentals — linen handling, restocking, same-day." },
  { href: "/services/post-construction-cleaning",  icon: Sparkles,  title: "Post-Construction Cleaning",  copy: "Multi-pass fine dust removal, HVAC vents, and contractor-ready scheduling." },
];

const statNumbers = [
  { value: "10+",  label: "Years Serving NJ" },
  { value: "100+", label: "Homes Cleaned" },
  { value: "5.0",  label: "Average Star Rating" },
  { value: "100%", label: "Satisfaction Guaranteed" },
];

const testimonialSnippets = reviews.slice(0, 3);

const trustPillars = [
  { icon: ShieldCheck, label: "Fully insured & bonded" },
  { icon: Award,       label: "10+ years experience" },
  { icon: ThumbsUp,    label: "Satisfaction guaranteed" },
  { icon: Clock,       label: "On-time, every time" },
];

const featureVisuals: ReactNode[] = [
  // Visual 0 — HOW IT WORKS
  <div key="how-it-works" className="bg-white rounded-2xl shadow-xl border border-charcoal/8 p-8">
    <p className="text-xs font-semibold tracking-widest text-brand-dark mb-8">HOW IT WORKS</p>
    <div className="space-y-7">
      {[
        { step: '01', label: 'Tell us about your home', icon: Home },
        { step: '02', label: 'Receive your firm quote', icon: FileText },
        { step: '03', label: 'We clean, you relax', icon: Sparkles },
      ].map(({ step, label, icon: Icon }) => (
        <div key={step} className="flex items-center gap-5">
          <div className="w-11 h-11 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
            <Icon size={18} className="text-brand-dark" />
          </div>
          <div>
            <p className="text-xs text-charcoal-40 mb-1">{step}</p>
            <p className="text-base font-medium text-charcoal">{label}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-8 pt-6 border-t border-charcoal/5">
      <p className="text-sm text-charcoal-40 italic">No commitment needed to get your quote.</p>
    </div>
  </div>,

  // Visual 1 — AREAS WE COVER
  <div key="areas-we-cover" className="bg-white rounded-2xl shadow-xl border border-charcoal/8 p-8">
    <p className="text-xs font-semibold tracking-widest text-brand-dark mb-8">AREAS WE COVER</p>
    <div className="grid grid-cols-2 gap-5">
      {[
        { icon: Utensils, label: 'Kitchen' },
        { icon: Bath, label: 'Bathrooms' },
        { icon: Bed, label: 'Bedrooms' },
        { icon: Monitor, label: 'Living Areas' },
        { icon: DoorOpen, label: 'Hallways' },
        { icon: Home, label: 'Entryways' },
      ].map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
            <Icon size={16} className="text-brand-dark" />
          </div>
          <p className="text-base text-charcoal-70">{label}</p>
        </div>
      ))}
    </div>
  </div>,

  // Visual 2 — WHY CLIENTS TRUST US
  <div key="why-clients" className="bg-white rounded-2xl shadow-xl border border-charcoal/8 p-8">
    <p className="text-xs font-semibold tracking-widest text-brand-dark mb-8">WHY CLIENTS TRUST US</p>
    <div className="space-y-6">
      {trustPillars.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
            <Icon size={18} className="text-brand-dark" />
          </div>
          <p className="text-base font-medium text-charcoal">{label}</p>
        </div>
      ))}
    </div>
  </div>,
];

export default function ServicePageLayout({
  slug,
  h1,
  metaDescription,
  introParagraph,
  features,
  faqs,
  schemaServiceType,
  checklist,
}: ServicePageProps) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: schemaServiceType,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      url: BASE_URL,
    },
    areaServed: BUSINESS.areaServed,
    name: h1,
    description: metaDescription,
    url: `${BASE_URL}/services/${slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const scrollFeatures: ScrollFeature[] = features.map((f, i) => ({
    ...f,
    visual: featureVisuals[i] ?? featureVisuals[featureVisuals.length - 1],
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-charcoal-40">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/services" className="hover:text-brand transition-colors">Services</Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">{h1.split(" in ")[0]}</span>
        </nav>

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16 text-center">
          <div className="space-y-4 mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-charcoal leading-tight">
              {h1}
            </h1>
            <p className="text-base md:text-lg text-charcoal-70 leading-relaxed">
              {introParagraph}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {statNumbers.map((s) => (
              <AnimatedStat key={s.label} {...s} />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Link
              href="/book"
              className="bg-brand text-charcoal font-semibold px-10 py-4 rounded-full hover:bg-brand-dark transition-colors"
            >
              Book Cleaning
            </Link>
            <Link
              href="/#quick-quote"
              className="border border-charcoal/20 text-charcoal font-semibold px-10 py-4 rounded-full hover:bg-cream-100 transition-colors"
            >
              Get a Quick Quote
            </Link>
          </div>
          <GuaranteeBadge />
        </section>

        {/* Checklist (optional — new service pages) */}
        {checklist && checklist.length > 0 && (
          <>
            <div className="border-t border-charcoal/10" />
            <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
              <h2 className="text-lg font-bold text-charcoal mb-5 text-center">What&apos;s included</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-charcoal-70">
                    <CheckCircle size={14} className="text-brand-dark mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-10">
              <CtaBlock variant="book" heading="Ready to book?" subheading="We confirm within 24 hours. No contract, no commitment." />
            </div>
          </>
        )}

        <div className="border-t border-charcoal/10" />

        {/* Sticky scroll features */}
        <StickyScrollFeatures
          features={scrollFeatures}
          eyebrow="WHAT'S INCLUDED"
          headline="Everything your home needs, nothing you don't"
          subline="Here's exactly how we work — and why clients stick around."
        />

        {/* FAQ */}
        <FAQ
          headline="Frequently asked questions"
          items={faqs.map((f) => ({ question: f.q, answer: f.a }))}
        />

        {/* Pricing tiers */}
        <section id="plans" className="py-16 bg-cream-50 border-t border-charcoal/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Suspense fallback={null}>
              <Tiers heading="Simple, transparent pricing" subtitle="Three packages built around how you live. All backed by our satisfaction guarantee." />
            </Suspense>
          </div>
        </section>

        {/* Phone CTA break */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <CtaBlock variant="phone" heading="Questions? Just call." subheading="We're a local team — real people pick up." />
        </div>

        {/* Towns we serve */}
        <ServiceAreasTabs />

        {/* Testimonials */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-8 text-center">
            What clients say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialSnippets.map((t) => (
              <blockquote
                key={t.name}
                className="bg-cream-100 rounded-2xl p-6 space-y-3 border border-charcoal/5"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-brand stroke-brand" />
                  ))}
                </div>
                <p className="text-sm text-charcoal-70 italic">&ldquo;{t.quote}&rdquo;</p>
                <footer className="text-sm font-semibold text-charcoal">{t.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Related services */}
        <section className="bg-cream-50 py-16 border-t border-charcoal/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-2 text-center">
              Other services
            </h2>
            <p className="text-center text-charcoal-70 mb-10">
              Every service is backed by our satisfaction guarantee.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.filter((svc) => svc.href !== `/services/${slug}`).map((svc) => {
                const Icon = svc.icon;
                return (
                  <Link
                    key={svc.href}
                    href={svc.href}
                    className="group bg-cream rounded-2xl p-6 border border-charcoal/10 shadow hover:border-brand hover:shadow-lg transition-all hover:-translate-y-0.5 space-y-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center">
                      <Icon size={18} className="text-brand-dark" />
                    </div>
                    <h3 className="text-lg font-bold text-charcoal group-hover:text-brand transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-charcoal-70 leading-relaxed">{svc.copy}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                      Learn more <ChevronRight size={14} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal">
              Ready to come home to clean?
            </h2>
            <p className="text-charcoal/70 max-w-xl mx-auto">
              100% satisfaction guaranteed. If it&apos;s not right, we come back — no questions asked.
            </p>
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
