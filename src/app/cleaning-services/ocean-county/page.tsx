import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Star, Check, X, ChevronRight } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";
import { getTownsByCounty } from "@/lib/towns";
import PhoneLink from "@/components/PhoneLink";
import { TrustPillars } from "@/components/sections/TrustPillars";
import { TrustBadges } from "@/components/sections/TrustBadges";
import Tiers from "@/components/sections/Tiers";
import { SignatureProcess } from "@/components/sections/SignatureProcess";
import CtaBlock from "@/components/sections/CtaBlock";
import { FAQ } from "@/components/sections/FAQ";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "House Cleaning in Ocean County, NJ | NestGlow Co",
  description:
    "Professional house cleaning throughout Ocean County, NJ. Serving Toms River, Brick, Point Pleasant, Jackson, Lacey Township, and more. Insured, bonded. Free quote.",
  alternates: { canonical: `${BASE_URL}/cleaning-services/ocean-county` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Cleaning Services", item: `${BASE_URL}/cleaning-services` },
    { "@type": "ListItem", position: 3, name: "Ocean County", item: `${BASE_URL}/cleaning-services/ocean-county` },
  ],
};

const proPoints = [
  "Fully insured and bonded — you're protected",
  "Background-checked team members, every visit",
  "Consistent quality even when staff changes",
  "Professional-grade supplies included",
  "100% satisfaction guarantee — we come back if needed",
  "A real team you can reach by phone",
];

const indiePoints = [
  "Usually uninsured — liability falls on you",
  "No formal vetting or background checks",
  "No backup if the cleaner cancels last-minute",
  "Supply quality varies",
  "No guarantee policy",
  "Harder to reach when issues come up",
];

const countyFaqs = [
  {
    question: "How much does house cleaning cost in Ocean County?",
    answer: "Most homes in Ocean County run between $140 and $400 per clean depending on home size and service type. We provide a firm quote before any work begins — no surprises.",
  },
  {
    question: "Do I need to be home during the cleaning?",
    answer: "No. Most of our clients leave a key or provide entry instructions. Our team is background-checked and fully insured, so you can go about your day with complete peace of mind.",
  },
  {
    question: "Are you insured and bonded?",
    answer: "Yes. NestGlow Co is fully insured and bonded. If anything is ever damaged during a clean, you're covered — no awkward conversations, no out-of-pocket costs on your end.",
  },
  {
    question: "Do you bring your own supplies?",
    answer: "Yes. We bring everything — professional-grade products and equipment. If you have preferences or sensitivities (fragrance-free, specific products), just let us know in your booking notes.",
  },
  {
    question: "What if I'm not satisfied with the cleaning?",
    answer: "We come back. Our 100% satisfaction guarantee means if something wasn't cleaned to your standard, we'll return within 24 hours to make it right — at no extra charge.",
  },
];

const towns = getTownsByCounty("Ocean");

export default async function OceanCountyPage({
  searchParams,
}: {
  searchParams: Promise<{ zip?: string; town?: string }>;
}) {
  const params = await searchParams;
  const town = params.town;
  const place = town ?? "Ocean County";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="pt-[72px]">

        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-charcoal-40 flex-wrap">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/cleaning-services" className="hover:text-brand transition-colors">Cleaning Services</Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">Ocean County</span>
          {town && (
            <>
              <ChevronRight size={12} />
              <span className="text-charcoal">{town}</span>
            </>
          )}
        </nav>

        {/* Hero */}
        <section className="bg-white py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Cleaning services in Ocean County
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
              {town
                ? `Cleaning services for ${town} homes.`
                : "Cleaning services for Ocean County homes."}
            </h1>
            <p className="text-lg text-charcoal-70 leading-relaxed">
              10+ years of trust serving {place}. Pick your plan below — Glow, Signature Glow, or Full Glow.
            </p>
            <div className="flex items-center justify-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-brand stroke-brand" />
              ))}
              <span className="ml-1 text-sm text-charcoal-40">Trusted by homeowners across NJ</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="#plans"
                className="inline-flex items-center bg-brand text-charcoal font-semibold px-7 py-3.5 rounded-full hover:bg-brand-dark transition-colors text-sm"
              >
                See plans
              </Link>
              <PhoneLink className="inline-flex items-center border border-charcoal/20 text-charcoal font-semibold px-7 py-3.5 rounded-full hover:border-brand hover:text-brand transition-colors text-sm" />
            </div>
            <TrustPillars />
          </div>
        </section>

        {/* Trust badges */}
        <TrustBadges />

        {/* Tiers */}
        <section id="plans" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Suspense fallback={null}>
              <Tiers
                heading={`Choose the best plan for your ${place} home`}
                subtitle="Three packages built around how you live. Every one of them a NestGlow Signature Clean."
                zipOverride={params.zip}
                townOverride={params.town}
              />
            </Suspense>
          </div>
        </section>

        {/* Signature Process */}
        <SignatureProcess heading="What's included in every NestGlow visit" />

        {/* CTA — book */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <CtaBlock
            variant="book"
            heading={`Ready to book your ${place} cleaning?`}
            subheading="Pick a plan and we'll confirm within 24 hours."
          />
        </div>

        {/* Pro vs Independent */}
        <section className="bg-cream-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
                Why a professional team beats an independent cleaner
              </h2>
              <p className="text-charcoal-70 max-w-2xl mx-auto">
                A cheaper per-clean rate sounds good until something goes wrong.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div className="bg-cream-50 rounded-2xl p-8 border border-charcoal/10">
                <p className="text-[13px] font-bold uppercase tracking-widest text-brand mb-6 text-center">
                  {BUSINESS.name}
                </p>
                <ul className="space-y-4">
                  {proPoints.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <Check size={16} className="text-brand mt-0.5 shrink-0" />
                      <span className="text-sm text-charcoal-70">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-cream-100 border border-charcoal/10 rounded-2xl p-8">
                <p className="text-[13px] font-bold uppercase tracking-widest text-charcoal-40 mb-6 text-center">
                  Independent Cleaner
                </p>
                <ul className="space-y-4">
                  {indiePoints.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <X size={16} className="text-charcoal/30 mt-0.5 shrink-0" />
                      <span className="text-sm text-charcoal-40">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="text-center mt-10">
              <Link
                href="/book"
                className="bg-brand text-charcoal font-semibold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
              >
                Book NestGlow today
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials currentCounty="Ocean" />

        {/* Town grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-charcoal mb-4">
              Ocean County towns we serve
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 mb-10">
              <p className="text-charcoal-70 leading-relaxed">
                Ocean County spans from the busy shore communities near Point Pleasant Beach to the larger developments in Jackson Township and the active adult communities of Berkeley Township. Our team handles both ends of that spectrum: short-term rental turnovers along the water and recurring family home cleaning further inland.
              </p>
              <p className="text-charcoal-70 leading-relaxed">
                During peak summer months, we coordinate with rental calendars so that turnover cleans happen on time between guests. Year-round, we provide weekly, bi-weekly, and monthly recurring service for full-time Ocean County residents.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {towns.map((t) => (
              <Link
                key={t.slug}
                href={`/cleaning-services/${t.slug}`}
                className="group bg-cream-100 rounded-xl border border-charcoal/5 p-5 hover:border-brand/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-charcoal group-hover:text-brand transition-colors">
                      {t.name}, NJ
                    </p>
                    <p className="text-xs text-charcoal-40 mt-0.5">ZIP {t.zipCodes.join(", ")}</p>
                  </div>
                  <ChevronRight size={16} className="text-charcoal-40 group-hover:text-brand transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Other counties */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-5">Also serving</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/cleaning-services/monmouth-county" className="inline-flex items-center gap-2 px-4 py-2 bg-cream-100 rounded-full border border-charcoal/10 text-sm text-charcoal hover:border-brand hover:text-brand transition-colors">
              Monmouth County <ChevronRight size={12} />
            </Link>
            <Link href="/cleaning-services/middlesex-county" className="inline-flex items-center gap-2 px-4 py-2 bg-cream-100 rounded-full border border-charcoal/10 text-sm text-charcoal hover:border-brand hover:text-brand transition-colors">
              Middlesex County <ChevronRight size={12} />
            </Link>
          </div>
        </section>

        {/* CTA — phone */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-14">
          <CtaBlock variant="phone" />
        </div>

        {/* FAQ */}
        <FAQ
          headline="Questions about Ocean County cleaning"
          subtitle="Everything you need to know before booking."
          items={countyFaqs.map((f) => ({ question: f.question, answer: f.answer }))}
          cta={{ label: "See all FAQs", href: "/faq" }}
        />

      </main>
    </>
  );
}
