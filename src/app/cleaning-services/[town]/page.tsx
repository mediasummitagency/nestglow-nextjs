import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Check, X } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";
import { towns, getTownBySlug } from "@/lib/towns";
import PhoneLink from "@/components/PhoneLink";
import { TrustBadges } from "@/components/sections/TrustBadges";
import Tiers from "@/components/sections/Tiers";
import { SignatureProcess } from "@/components/sections/SignatureProcess";
import CtaBlock from "@/components/sections/CtaBlock";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { Testimonials } from "@/components/sections/Testimonials";

type TownPageProps = {
  params: Promise<{ town: string }>;
  searchParams: Promise<{ zip?: string }>;
};

export async function generateStaticParams() {
  return towns.map((t) => ({ town: t.slug }));
}

export async function generateMetadata({ params }: TownPageProps): Promise<Metadata> {
  const { town: slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) return {};
  return {
    title: town.metaTitle,
    description: town.metaDescription,
    alternates: { canonical: `${BASE_URL}/cleaning-services/${town.slug}` },
    openGraph: {
      title: town.metaTitle,
      description: `${town.metaDescription} 100% satisfaction guarantee.`,
      url: `${BASE_URL}/cleaning-services/${town.slug}`,
    },
  };
}

const countyHubSlug: Record<string, string> = {
  Monmouth: "monmouth-county",
  Ocean: "ocean-county",
  Middlesex: "middlesex-county",
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

export default async function TownPage({ params, searchParams }: TownPageProps) {
  const { town: slug } = await params;
  const { zip } = await searchParams;
  const town = getTownBySlug(slug);
  if (!town) notFound();

  const countySlug = countyHubSlug[town.county];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Cleaning Services", item: `${BASE_URL}/cleaning-services` },
      { "@type": "ListItem", position: 3, name: `${town.county} County`, item: `${BASE_URL}/cleaning-services/${countySlug}` },
      { "@type": "ListItem", position: 4, name: `${town.name}, NJ`, item: `${BASE_URL}/cleaning-services/${town.slug}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `House Cleaning in ${town.name}, NJ`,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      telephone: BUSINESS.phoneHref.replace("tel:", ""),
    },
    areaServed: {
      "@type": "City",
      name: town.name,
      addressRegion: "NJ",
    },
    serviceType: "House Cleaning",
    url: `${BASE_URL}/cleaning-services/${town.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: town.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const nearbyTownData = town.nearbyTowns
    .map((s) => getTownBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getTownBySlug>>[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-charcoal-40 flex-wrap">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/cleaning-services" className="hover:text-brand transition-colors">Cleaning Services</Link>
          <ChevronRight size={12} />
          <Link href={`/cleaning-services/${countySlug}`} className="hover:text-brand transition-colors">
            {town.county} County
          </Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">{town.name}</span>
        </nav>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            {town.county} County, NJ
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
            {town.h1}
          </h1>
          <p className="text-charcoal-70 text-lg max-w-3xl leading-relaxed">
            {town.introParagraph}
          </p>
          {town.zipCodes.length > 0 && (
            <p className="text-sm text-charcoal-40">
              Serving ZIP code{town.zipCodes.length > 1 ? "s" : ""}: {town.zipCodes.join(", ")}
            </p>
          )}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="#plans"
              className="inline-flex items-center bg-brand text-charcoal font-semibold px-7 py-3.5 rounded-full hover:bg-brand-dark transition-colors text-sm"
            >
              See plans
            </Link>
            <PhoneLink className="inline-flex items-center border border-charcoal/20 text-charcoal font-semibold px-7 py-3.5 rounded-full hover:border-brand hover:text-brand transition-colors text-sm" />
          </div>
        </section>

        {/* Trust badges */}
        <TrustBadges />

        {/* Local hook */}
        <section className="bg-cream-100 border-y border-charcoal/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex gap-5">
              <div className="w-1 bg-brand rounded-full shrink-0" />
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-widest text-brand">
                  Local knowledge
                </p>
                <p className="text-charcoal-70 leading-relaxed">{town.localHook}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section id="plans" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Suspense fallback={null}>
              <Tiers
                heading={`Choose the best plan for your ${town.name} home`}
                subtitle="Three packages built around how you live. Every one of them a NestGlow Signature Clean."
                zipOverride={zip}
                townOverride={town.name}
              />
            </Suspense>
          </div>
        </section>

        {/* Signature Process */}
        <SignatureProcess heading="What's included in every NestGlow visit" />

        {/* Book CTA */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <CtaBlock
            variant="book"
            heading={`Ready to book your ${town.name} cleaning?`}
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
        <Testimonials currentTown={town.name} currentCounty={town.county} />

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-bold text-charcoal mb-8">
            Common questions about cleaning in {town.name}
          </h2>
          <FAQAccordion
            namespace={`${town.slug}-faq`}
            items={town.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
          />
        </section>

        {/* Phone CTA */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <CtaBlock variant="phone" />
        </div>

        {/* Nearby towns */}
        {nearbyTownData.length > 0 && (
          <section className="bg-cream-100 border-y border-charcoal/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-5">
                Also serving nearby
              </p>
              <div className="flex flex-wrap gap-3">
                {nearbyTownData.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/cleaning-services/${t.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cream rounded-full border border-charcoal/10 text-sm text-charcoal hover:border-brand hover:text-brand transition-colors"
                  >
                    Cleaning in {t.name}, NJ
                    <ChevronRight size={12} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="bg-brand">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
              Ready to book in {town.name}?
            </h2>
            <p className="text-charcoal/80 max-w-xl mx-auto">
              Submit a booking request and our team confirms your appointment within 24 hours. No payment until the cleaning is complete.
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
    </>
  );
}
