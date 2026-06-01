import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Home, Briefcase, Sparkles, Truck, ChevronRight,
} from "lucide-react";
import { BUSINESS, BASE_URL } from "@/lib/config";
import { FAQ } from "@/components/sections/FAQ";
import { ServiceAreasTabs } from "@/components/sections/ServiceAreasTabs";
import { SignatureProcess } from "@/components/sections/SignatureProcess";
import { TrustPillars } from "@/components/sections/TrustPillars";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { ZipRouter } from "@/components/forms/ZipRouter";
import Tiers from "@/components/sections/Tiers";
import { Testimonials } from "@/components/sections/Testimonials";

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    href: "/services/residential-cleaning",
    icon: Home,
    title: "Residential Cleaning",
    copy: "Regular maintenance, deep cleans, and special requests for the homes you live in and love.",
  },
  {
    href: "/services/commercial-cleaning",
    icon: Briefcase,
    title: "Commercial Cleaning",
    copy: "Offices, storefronts, and professional suites. Schedules built around your business hours.",
  },
  {
    href: "/services/deep-cleaning",
    icon: Sparkles,
    title: "Deep Cleaning",
    copy: "Top-to-bottom detailing for first-time cleans, seasonal resets, and pre-guest refreshes.",
  },
  {
    href: "/services/move-in-move-out",
    icon: Truck,
    title: "Move In / Move Out",
    copy: "Empty-home deep cleans that make the next chapter simpler — for sellers, buyers, and renters.",
  },
];

const howItWorks = [
  { step: "1", title: "Enter your ZIP", image: "/how-step-1.jpg", alt: "Homeowner relaxing while booking online", body: "We check your area and show you plans built for your home." },
  { step: "2", title: "Pick your plan", image: "/how-step-2.jpg", alt: "A NestGlow cleaner at work in a bright home", body: "Glow, Signature Glow, or Full Glow — each one a NestGlow Signature Clean." },
  { step: "3", title: "Your home glows", image: "/how-step-3.jpg", alt: "A homeowner enjoying a spotless living room", body: "Our insured, background-checked team arrives on time and leaves your space spotless." },
];

const counties = [
  { name: "Monmouth County", href: "/cleaning-services/monmouth-county", towns: 10 },
  { name: "Ocean County", href: "/cleaning-services/ocean-county", towns: 7 },
  { name: "Middlesex County", href: "/cleaning-services/middlesex-county", towns: 6 },
];


const homeFaqs = [
  {
    q: "How much does house cleaning cost in NJ?",
    a: "Most homes in Monmouth, Ocean, and Middlesex County run between $140 and $400 per clean depending on home size and service type. We provide a firm quote before any work begins — no surprises.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "No. Most of our clients leave a key or provide entry instructions. Our team is background-checked and fully insured, so you can go about your day with complete peace of mind.",
  },
  {
    q: "What's included in a standard cleaning?",
    a: "A standard clean covers all living areas, bedrooms, bathrooms, and the kitchen — dusting, vacuuming, mopping, sanitizing, and tidying throughout. Deep cleaning and add-ons are available for a more thorough refresh.",
  },
  {
    q: "Are you insured and bonded?",
    a: "Yes. NestGlow Co is fully insured and bonded. If anything is ever damaged during a clean, you're covered — no awkward conversations, no out-of-pocket costs on your end.",
  },
  {
    q: "How do I book a cleaning?",
    a: "Enter your ZIP above to check your area, pick the plan that fits, and we'll get you set up. We respond within 24 hours to confirm your date, time, and price.",
  },
  {
    q: "Do you bring your own supplies?",
    a: "Yes. We bring everything — professional-grade products and equipment. If you have preferences or sensitivities (fragrance-free, specific products), just let us know in your booking notes.",
  },
  {
    q: "What's the difference between a regular clean and a deep clean?",
    a: "A regular clean maintains your home week to week. A deep clean goes further — inside the oven, inside the fridge, baseboards, door frames, behind appliances, and more. First-time clients typically start with a deep clean.",
  },
  {
    q: "What if I'm not satisfied with the cleaning?",
    a: "We come back. Our 100% satisfaction guarantee means if something wasn't cleaned to your standard, we'll return within 24 hours to make it right — at no extra charge.",
  },
];

// ─── Schema ──────────────────────────────────────────────────────────────────

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HouseCleaningService",
  name: BUSINESS.name,
  image: `${BASE_URL}/logo.png`,
  "@id": BASE_URL,
  url: BASE_URL,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    addressCountry: BUSINESS.address.country,
  },
  areaServed: BUSINESS.areaServed.map((a) => ({ "@type": "Place", name: a })),
  priceRange: "$$",
  foundingDate: "2015",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <main>

        {/* Hero — ZIP-first */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="/hero-living-room.jpg"
            alt=""
            fill
            priority
            quality={85}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 z-10"
            style={{ background: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.70))" }}
          />
          <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6 py-16 md:py-24">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Cleaning services across NJ
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Come home to a place that feels like a fresh start.
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Enter your ZIP code to see if we serve your area — 10+ years of trust across Monmouth, Ocean, and Middlesex County.
            </p>
            <div className="flex items-center justify-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-brand stroke-brand" />
              ))}
              <span className="ml-1 text-sm text-white/80">
                Trusted by homeowners across NJ
              </span>
            </div>
            <div className="pt-2">
              <Suspense fallback={null}>
                <ZipRouter variant="hero" />
              </Suspense>
            </div>
            <TrustPillars variant="dark" />
          </div>
        </section>

        {/* Trust badges — Google Verified + Care.com */}
        {/* TODO: Add additional borrowed-authority badges as Caroline collects them — BBB, local press, chamber, etc. */}
        <TrustBadges />

        <SignatureProcess imageSrc="/signature-clean.png" />

        {/* Tiers teaser */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal text-center mb-2">
              Three plans, every one of them a NestGlow Signature Clean.
            </h2>
            <Suspense fallback={null}>
              <Tiers
                heading=""
                subtitle="Pick the plan that fits your home, and we'll handle the rest."
              />
            </Suspense>
          </div>
        </section>

        {/* Why NestGlow — alternating image rows */}
        <section className="bg-cream-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">

            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
                Booking a cleaner shouldn&apos;t feel{" "}
                <span className="text-brand">like a gamble.</span>
              </h2>
            </div>

            <div className="space-y-12 md:space-y-16">

              {/* Row 1 — image left / text right */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-charcoal/10 bg-cream-100">
                  <Image
                    src="/why-owner.png"
                    alt="NestGlow Co owner at a client's door"
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">
                    A name and a face, not a queue
                  </h3>
                  <p className="text-charcoal-70 leading-relaxed">
                    With NestGlow, when you have a question or need to move a date, a real local person picks up — you&apos;re talking to the owner, not typing into an app&apos;s chat window or waiting on a national support line. We&apos;re based right here in Monmouth, Ocean, and Middlesex County, and we answer to our neighbors.
                  </p>
                </div>
              </div>

              {/* Row 2 — image right / text left (desktop); image first on mobile via order classes) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-charcoal/10 bg-cream-100 md:order-2">
                  <Image
                    src="/why-team.png"
                    alt="NestGlow Co cleaning team arriving at a home"
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                </div>
                <div className="md:order-1">
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">
                    The same hands, every visit
                  </h3>
                  <p className="text-charcoal-70 leading-relaxed">
                    Booking apps send whoever&apos;s available — a different stranger in your home each time, re-learning where everything goes and what matters to you. NestGlow sends a consistent team that already knows your home, your preferences, and how you like things left. You shouldn&apos;t have to give the tour twice.
                  </p>
                </div>
              </div>

              {/* Row 3 — image left / text right */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-charcoal/10 bg-cream-100">
                  <Image
                    src="/why-guarantee.png"
                    alt="A freshly cleaned, spotless living room"
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">
                    If it&apos;s not right, that&apos;s on us — not on you
                  </h3>
                  <p className="text-charcoal-70 leading-relaxed">
                    Hire an uninsured cleaner off a marketplace and a broken vase or an on-the-job injury can quietly become your liability. With NestGlow, you&apos;re covered, and every clean is backed by our satisfaction guarantee: if something wasn&apos;t done to your standard, we come back and make it right at no extra cost. No disputes through an app, no chasing anyone down.
                  </p>
                </div>
              </div>

            </div>

            <div className="text-center mt-12">
              <Link
                href="/book"
                className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
              >
                Book NestGlow Today
              </Link>
            </div>

          </div>
        </section>

        {/* How it works */}
        <section className="bg-white py-16 border-t border-b border-charcoal/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-2 text-center">
              How it works
            </h2>
            <p className="text-center text-charcoal-70 mb-10">
              Simple, fast, and reliable from start to finish.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
              {howItWorks.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-5 rounded-full overflow-hidden bg-cream-100 border border-charcoal/10">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="160px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-brand">{step.step}</span>
                    <h3 className="text-lg font-bold text-brand-dark">{step.title}</h3>
                  </div>
                  <p className="text-sm text-charcoal-70 leading-relaxed max-w-xs mx-auto">{step.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/book"
                className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
              >
                Get started
              </Link>
            </div>
          </div>
        </section>

        {/* Service areas */}
        <ServiceAreasTabs />

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ */}
        <FAQ
          headline="Common questions"
          subtitle="Everything you need to know before booking."
          items={homeFaqs.map((faq) => ({ question: faq.q, answer: faq.a }))}
          cta={{ label: "See all FAQs", href: "/faq" }}
        />

        {/* Services grid + CTA */}
        <section className="bg-white py-16 border-t border-charcoal/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-2 text-center">
              What we clean
            </h2>
            <p className="text-center text-charcoal-70 mb-10">
              Every service is backed by our satisfaction guarantee.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((svc) => {
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
            <div className="mt-12 text-center space-y-4">
              <ZipRouter variant="hero" />
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
