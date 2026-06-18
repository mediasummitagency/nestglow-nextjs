import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ZipRouter } from "@/components/forms/ZipRouter";
import {
  ShieldCheck, Award, ThumbsUp, Clock, ChevronRight, Sparkles, Home, FileText,
  Utensils, Bath, Bed, Monitor, DoorOpen,
  Building2, Coffee, Briefcase, Shirt, Wind, Package, Layers, Lightbulb, Maximize2,
  type LucideIcon,
} from "lucide-react";
import { FAQ } from "@/components/sections/FAQ";
import { AnimatedStat } from "@/components/sections/StatCards";
import { ServiceAreasTabs } from "@/components/sections/ServiceAreasTabs";
import { StickyScrollFeatures, ScrollFeature } from "@/components/layout/StickyScrollFeatures";
import Tiers from "@/components/sections/Tiers";
import CtaBlock from "@/components/sections/CtaBlock";
import { BridgeMarquee } from "@/components/layout/BridgeMarquee";
import { RoomCarousel, COMMERCIAL_SPACES } from "@/components/sections/RoomCarousel";
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

export type ServiceKind =
  | "residential"
  | "moveinout"
  | "deep"
  | "commercial"
  | "airbnb"
  | "postconstruction";

export type ServicePageProps = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  introParagraph: string;
  features: FeatureSection[];
  faqs: Array<{ q: string; a: string }>;
  schemaServiceType: string;
  serviceKind: ServiceKind;
  checklist?: string[];
  showAddOns?: boolean;
  heroImage?: string;
};

function getStatNumbers(serviceKind: ServiceKind) {
  const secondStat =
    serviceKind === "commercial"       ? { value: "100+", label: "Businesses Served" } :
    serviceKind === "airbnb"           ? { value: "100+", label: "Turnovers Completed" } :
    serviceKind === "postconstruction" ? { value: "100+", label: "Projects Completed" } :
                                         { value: "100+", label: "Homes Cleaned" };
  return [
    { value: "10+",  label: "Years Serving NJ" },
    secondStat,
    { value: "5.0",  label: "Average Star Rating" },
    { value: "100%", label: "Satisfaction Guaranteed" },
  ];
}

const trustPillars = [
  { icon: ShieldCheck, label: "Fully insured & bonded" },
  { icon: Award,       label: "10+ years experience" },
  { icon: ThumbsUp,    label: "Satisfaction guaranteed" },
  { icon: Clock,       label: "On-time, every time" },
];

type AreaItem = { icon: LucideIcon; label: string };

const residentialAreas: AreaItem[] = [
  { icon: Utensils, label: "Kitchen" },
  { icon: Bath,     label: "Bathrooms" },
  { icon: Bed,      label: "Bedrooms" },
  { icon: Monitor,  label: "Living Areas" },
  { icon: DoorOpen, label: "Hallways" },
  { icon: Home,     label: "Entryways" },
];

const areasByKind: Record<ServiceKind, AreaItem[]> = {
  residential:      residentialAreas,
  moveinout:        residentialAreas,
  deep:             residentialAreas,
  commercial: [
    { icon: DoorOpen,   label: "Reception" },
    { icon: Bath,       label: "Restrooms" },
    { icon: Coffee,     label: "Break Room" },
    { icon: Monitor,    label: "Workstations" },
    { icon: Briefcase,  label: "Conference Rooms" },
    { icon: Building2,  label: "Common Areas" },
  ],
  airbnb: [
    { icon: Bed,      label: "Bedrooms" },
    { icon: Bath,     label: "Bathrooms" },
    { icon: Utensils, label: "Kitchen" },
    { icon: Monitor,  label: "Living Areas" },
    { icon: Shirt,    label: "Linens" },
    { icon: FileText, label: "Restock Check" },
  ],
  postconstruction: [
    { icon: Wind,      label: "Fine Dust" },
    { icon: Sparkles,  label: "HVAC Vents" },
    { icon: Maximize2, label: "Windows & Tracks" },
    { icon: Package,   label: "Cabinets" },
    { icon: Layers,    label: "Floors" },
    { icon: Lightbulb, label: "Fixtures" },
  ],
};

const quoteCtaCopy: Partial<Record<ServiceKind, { headline: string; body: string; cta: string }>> = {
  commercial: {
    headline: "Every space is quoted on a walk-through.",
    body: "Tell us your square footage and schedule and we'll send a firm number.",
    cta: "Book a walk-through",
  },
  airbnb: {
    headline: "Turnover pricing depends on unit size and frequency.",
    body: "Set up your season schedule and we'll lock in your per-turn rate.",
    cta: "Book your turnover schedule",
  },
  postconstruction: {
    headline: "Post-construction is quoted per project based on size and condition.",
    body: "Send the details and we'll price it.",
    cta: "Get a project quote",
  },
};

const featuresHeadingByKind: Record<ServiceKind, { headline: string; subline: string }> = {
  residential:      { headline: "Everything your home needs, nothing you don't",          subline: "Here's exactly how we work — and why clients stick around." },
  moveinout:        { headline: "Everything your home needs, nothing you don't",          subline: "Here's exactly how we work — and why clients stick around." },
  deep:             { headline: "Everything your home needs, nothing you don't",          subline: "Here's exactly how we work — and why clients stick around." },
  commercial:       { headline: "Everything your business needs, nothing it doesn't",     subline: "Here's exactly how we work — and why NJ businesses keep us on schedule." },
  airbnb:           { headline: "Everything your turnover needs, nothing it doesn't",     subline: "Here's exactly how we work — and why hosts rebook us every stay." },
  postconstruction: { headline: "Everything the final clean needs, nothing it doesn't",   subline: "Here's exactly how we work — and why contractors hand us the punch-out." },
};

function getHowItWorksVisual(serviceKind: ServiceKind): ReactNode {
  const stepsByKind: Record<ServiceKind, { step01: string; step03: string }> = {
    residential:      { step01: "Tell us about your home",     step03: "We clean, you relax" },
    moveinout:        { step01: "Tell us about your home",     step03: "We clean, you relax" },
    deep:             { step01: "Tell us about your home",     step03: "We clean, you relax" },
    commercial:       { step01: "Tell us about your space",    step03: "We clean after hours, you open to clean" },
    airbnb:           { step01: "Tell us about your property", step03: "We turn it over, you stay booked" },
    postconstruction: { step01: "Tell us about the project",   step03: "We clear the dust, you hand over the keys" },
  };
  const { step01, step03 } = stepsByKind[serviceKind];
  return (
    <div key="how-it-works" className="bg-white rounded-2xl shadow-xl border border-charcoal/8 p-8 h-full flex flex-col">
      <p className="text-xs font-semibold tracking-widest text-brand-dark mb-6">HOW IT WORKS</p>
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          {[
            { step: "01", label: step01, icon: Home },
            { step: "02", label: "Receive your firm quote", icon: FileText },
            { step: "03", label: step03, icon: Sparkles },
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
    </div>
  );
}

const whyClientsVisual: ReactNode = (
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
  </div>
);

function getFeatureVisuals(serviceKind: ServiceKind): ReactNode[] {
  const areas = areasByKind[serviceKind];
  const areasVisual = (
    <div key="areas-we-cover" className="bg-white rounded-2xl shadow-xl border border-charcoal/8 p-6 h-full flex flex-col">
      <p className="text-xs font-semibold tracking-widest text-brand-dark mb-6">AREAS WE COVER</p>
      <div className="flex-1 grid grid-cols-2 gap-y-0 content-evenly">
        {areas.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-brand-dark" />
            </div>
            <p className="text-base text-charcoal-70">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
  return [getHowItWorksVisual(serviceKind), areasVisual, whyClientsVisual];
}

export default function ServicePageLayout({
  slug,
  h1,
  metaDescription,
  introParagraph,
  features,
  faqs,
  schemaServiceType,
  serviceKind,
  showAddOns,
  heroImage,
}: ServicePageProps) {
  const isResidentialStyle = (["residential", "moveinout", "deep"] as ServiceKind[]).includes(serviceKind);
  const showRoomCarousel = isResidentialStyle;
  const showResidentialTiers = isResidentialStyle;

  const featureVisuals = getFeatureVisuals(serviceKind);

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

  const defaultScrollBgImages = [
    "/images/home/why-owner.png",
    "/images/home/why-guarantee.png",
    "/images/home/why-team.png",
  ];
  const scrollBgImagesByKind: Partial<Record<ServiceKind, string[]>> = {
    commercial: [
      "/images/services/commercial-cleaning/feature-1.png",
      "/images/services/commercial-cleaning/feature-2.png",
      "/images/services/commercial-cleaning/feature-3.png",
    ],
  };
  const scrollBgImages = scrollBgImagesByKind[serviceKind] ?? defaultScrollBgImages;

  const scrollFeatures: ScrollFeature[] = features.map((f, i) => ({
    ...f,
    visual: featureVisuals[i] ?? featureVisuals[featureVisuals.length - 1],
    bgImage: scrollBgImages[i] ?? scrollBgImages[scrollBgImages.length - 1],
  }));

  const quoteCta = quoteCtaCopy[serviceKind];

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
            src={heroImage ?? `/images/services/${slug}/hero.jpg`}
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
              {getStatNumbers(serviceKind).map((s) => (
                <AnimatedStat key={s.label} {...s} dark />
              ))}
            </div>
          </div>
          <ScrollHint />
        </section>

        <BridgeMarquee />
        {showRoomCarousel && <RoomCarousel />}
        {serviceKind === "commercial" && (
          <RoomCarousel
            rooms={COMMERCIAL_SPACES}
            title="What we clean"
            footerText="Offices, retail, medical suites, fitness studios, and more — if it's a space your clients see, we keep it ready. Not sure if we cover your type of space?"
            ctaLabel="Let's talk"
            ctaHref="/book"
          />
        )}
        {showAddOns && <AddOnServices />}
        {isResidentialStyle && (
          <div className="flex justify-center pb-14">
            <Link
              href="/book"
              className="inline-block bg-brand text-charcoal font-semibold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
            >
              Book a cleaning
            </Link>
          </div>
        )}

        <div className="border-t border-charcoal/10" />

        {/* Sticky scroll features */}
        <StickyScrollFeatures
          features={scrollFeatures}
          headline={featuresHeadingByKind[serviceKind].headline}
          subline={featuresHeadingByKind[serviceKind].subline}
        />

        {/* FAQ */}
        <FAQ
          headline="Frequently asked questions"
          items={faqs.map((f) => ({ question: f.q, answer: f.a }))}
        />

        {/* Towns we serve */}
        <div className="[&>section]:border-t-0">
          <ServiceAreasTabs />
        </div>

        {/* Pricing */}
        {showResidentialTiers ? (
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
        ) : serviceKind !== "commercial" ? (
          <section id="plans" className="py-16 bg-white">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-4">
              <p className="text-2xl font-bold text-charcoal">{quoteCta?.headline}</p>
              <p className="text-charcoal/60 text-base">{quoteCta?.body}</p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-block bg-brand text-charcoal font-semibold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
                >
                  {BUSINESS.phone}
                </a>
                <Link
                  href="/book"
                  className="inline-block bg-charcoal text-cream font-semibold px-8 py-3 rounded-full hover:bg-charcoal-70 transition-colors"
                >
                  {quoteCta?.cta}
                </Link>
              </div>
            </div>
          </section>
        ) : null}

        <Testimonials />

        {/* Final CTA */}
        {serviceKind === "commercial" ? (
          <section className="bg-white py-16 border-t border-charcoal/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal">
                Ready for a space that&apos;s handled?
              </h2>
              <p className="text-charcoal/70 max-w-xl mx-auto">
                Consistent, after-hours cleaning your team can count on — backed by full insurance and a certificate of insurance on request.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/book"
                  className="bg-charcoal text-cream font-semibold px-8 py-3 rounded-full hover:bg-charcoal-70 transition-colors"
                >
                  Book a walk-through
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
        ) : (
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
        )}

        {/* Related services */}
        <section className="bg-cream-50 py-16 border-t border-charcoal/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-2 text-center">
              Other services
            </h2>
            <p className="text-center text-charcoal-70 mb-10">
              Every service is backed by our satisfaction guarantee.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              {services.filter((svc) => svc.href !== `/services/${slug}`).map((svc) => {
                const Icon = svc.icon;
                return (
                  <Link
                    key={svc.href}
                    href={svc.href}
                    className="group bg-cream rounded-2xl p-5 border border-charcoal/10 shadow hover:border-brand hover:shadow-lg transition-all hover:-translate-y-0.5 space-y-3"
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
      </main>
    </>
  );
}
