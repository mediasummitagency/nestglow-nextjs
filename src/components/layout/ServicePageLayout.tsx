import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ZipRouter } from "@/components/forms/ZipRouter";
import { ShieldCheck, Award, ThumbsUp, Clock, ChevronRight, Sparkles, Home, FileText, Utensils, Bath, Bed, Monitor, DoorOpen } from "lucide-react";
import { FAQ } from "@/components/sections/FAQ";
import { AnimatedStat } from "@/components/sections/StatCards";
import { ServiceAreasTabs } from "@/components/sections/ServiceAreasTabs";
import { StickyScrollFeatures, ScrollFeature } from "@/components/layout/StickyScrollFeatures";
import Tiers from "@/components/sections/Tiers";
import CtaBlock from "@/components/sections/CtaBlock";
import { BridgeMarquee } from "@/components/layout/BridgeMarquee";
import { RoomCarousel } from "@/components/sections/RoomCarousel";
import { AddOnServices } from "@/components/sections/AddOnServices";
import { BUSINESS, BASE_URL } from "@/lib/config";
import { Testimonials } from "@/components/sections/Testimonials";
import { services } from "@/lib/services";
import { ScrollHint } from "@/components/ui/ScrollHint";
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
  showAddOns?: boolean;
};

const statNumbers = [
  { value: "10+",  label: "Years Serving NJ" },
  { value: "100+", label: "Homes Cleaned" },
  { value: "5.0",  label: "Average Star Rating" },
  { value: "100%", label: "Satisfaction Guaranteed" },
];

const trustPillars = [
  { icon: ShieldCheck, label: "Fully insured & bonded" },
  { icon: Award,       label: "10+ years experience" },
  { icon: ThumbsUp,    label: "Satisfaction guaranteed" },
  { icon: Clock,       label: "On-time, every time" },
];

const featureVisuals: ReactNode[] = [
  // Visual 0 — HOW IT WORKS
  <div key="how-it-works" className="bg-white rounded-2xl shadow-xl border border-charcoal/8 p-8 h-full flex flex-col">
    <p className="text-xs font-semibold tracking-widest text-brand-dark mb-6">HOW IT WORKS</p>
    <div className="flex-1 flex flex-col justify-between">
      <div className="space-y-6">
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
      <div className="pt-5 border-t border-charcoal/5">
        <p className="text-sm text-charcoal-40 italic">No commitment needed to get your quote.</p>
      </div>
    </div>
  </div>,

  // Visual 1 — AREAS WE COVER
  <div key="areas-we-cover" className="bg-white rounded-2xl shadow-xl border border-charcoal/8 p-8 h-full flex flex-col">
    <p className="text-xs font-semibold tracking-widest text-brand-dark mb-6">AREAS WE COVER</p>
    <div className="flex-1 grid grid-cols-2 gap-y-0 content-evenly">
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
  <div key="why-clients" className="bg-white rounded-2xl shadow-xl border border-charcoal/8 p-8 h-full flex flex-col">
    <p className="text-xs font-semibold tracking-widest text-brand-dark mb-6">WHY CLIENTS TRUST US</p>
    <div className="flex-1 flex flex-col justify-evenly">
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
  showAddOns,
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

  const scrollBgImages = [
    '/images/home/why-owner.png',
    '/images/home/why-guarantee.png',
    '/images/home/why-team.png',
  ];

  const scrollFeatures: ScrollFeature[] = features.map((f, i) => ({
    ...f,
    visual: featureVisuals[i] ?? featureVisuals[featureVisuals.length - 1],
    bgImage: scrollBgImages[i] ?? scrollBgImages[scrollBgImages.length - 1],
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
      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <Image
            src={`/images/services/${slug}/hero.jpg`}
            alt=""
            fill
            priority
            quality={85}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 z-10"
            style={{ background: "linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.72))" }}
          />
          <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-12 md:pt-32 md:pb-16 text-center w-full">
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {h1}
              </h1>
            </div>
            <div className="flex justify-center mb-8">
              <Suspense fallback={null}>
                <ZipRouter variant="hero" />
              </Suspense>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 transform scale-[0.9] origin-center">
              {statNumbers.map((s) => (
                <AnimatedStat key={s.label} {...s} dark />
              ))}
            </div>
          </div>
          <ScrollHint />
        </section>

        <BridgeMarquee />
        <RoomCarousel />
        {showAddOns && <AddOnServices />}
        <div className="flex justify-center pb-14">
          <Link
            href="/book"
            className="inline-block bg-brand text-charcoal font-semibold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
          >
            Book a cleaning
          </Link>
        </div>

        <div className="border-t border-charcoal/10" />

        {/* Sticky scroll features */}
        <StickyScrollFeatures
          features={scrollFeatures}
          headline="Everything your home needs, nothing you don't"
          subline="Here's exactly how we work — and why clients stick around."
        />

        {/* FAQ */}
        <FAQ
          headline="Frequently asked questions"
          items={faqs.map((f) => ({ question: f.q, answer: f.a }))}
        />

        {/* Pricing tiers */}
        <section id="plans" className="py-16 bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Suspense fallback={null}>
              <Tiers heading="Simple, transparent pricing" subtitle="Three packages built around how you live. All backed by our satisfaction guarantee." dark />
            </Suspense>
          </div>
          <div className="text-center pt-16 space-y-3">
            <p className="text-lg font-bold text-cream">Questions? Just call or text.</p>
            <a
              href={BUSINESS.phoneHref}
              className="inline-block bg-brand text-charcoal font-semibold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
            >
              {BUSINESS.phone}
            </a>
          </div>
        </section>

        {/* Towns we serve — same bg-cream-50, drop the border so it flows seamlessly */}
        <div className="[&>section]:border-t-0">
          <ServiceAreasTabs />
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* Related services */}
        <section className="bg-cream-50 py-16 border-t border-charcoal/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-2 text-center">
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal">
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
