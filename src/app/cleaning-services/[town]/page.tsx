import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  Award,
  ThumbsUp,
  Clock,
  Home,
  Briefcase,
  Sparkles,
  Truck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BASE_URL, BUSINESS } from "@/lib/config";
import { towns, getTownBySlug } from "@/lib/towns";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import PhoneLink from "@/components/PhoneLink";

type Params = { params: Promise<{ town: string }> };

export async function generateStaticParams() {
  return towns.map((t) => ({ town: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { town: slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) return {};
  return {
    title: town.metaTitle,
    description: town.metaDescription,
    alternates: { canonical: `${BASE_URL}/cleaning-services/${town.slug}` },
    openGraph: {
      title: town.metaTitle,
      description: town.metaDescription,
      url: `${BASE_URL}/cleaning-services/${town.slug}`,
    },
  };
}

const countyHubSlug: Record<string, string> = {
  Monmouth: "monmouth-county",
  Ocean: "ocean-county",
  Middlesex: "middlesex-county",
};

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    description: "Weekly, bi-weekly, and monthly home cleaning — consistent and insured.",
    href: "/services/residential-cleaning",
  },
  {
    icon: Briefcase,
    title: "Commercial Cleaning",
    description: "Offices, retail, and professional suites. Custom quotes after walk-through.",
    href: "/services/commercial-cleaning",
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description: "Top-to-bottom detail clean for homes that need a thorough reset.",
    href: "/services/deep-cleaning",
  },
  {
    icon: Truck,
    title: "Move In / Move Out",
    description: "Landlord and tenant cleans coordinated around move-in and move-out dates.",
    href: "/services/move-in-move-out",
  },
];

const trustPoints = [
  { icon: ShieldCheck, label: "Fully insured & bonded" },
  { icon: Award, label: "10+ years of experience" },
  { icon: ThumbsUp, label: "24-hour satisfaction guarantee" },
  { icon: Clock, label: "Confirmed within 24 hours" },
];

export default async function TownPage({ params }: Params) {
  const { town: slug } = await params;
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

      <SiteNav />
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-charcoal-40 flex-wrap">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/cleaning-services" className="hover:text-gold transition-colors">Cleaning Services</Link>
          <ChevronRight size={12} />
          <Link href={`/cleaning-services/${countySlug}`} className="hover:text-gold transition-colors">
            {town.county} County
          </Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">{town.name}</span>
        </nav>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
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

        {/* Services */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-bold text-charcoal mb-8">
            Services available in {town.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.title}
                  href={s.href}
                  className="group bg-cream-100 rounded-2xl p-6 border border-charcoal/5 space-y-3 hover:border-gold/30 hover:shadow-sm transition-all"
                >
                  <Icon size={22} className="text-gold" />
                  <p className="font-semibold text-charcoal group-hover:text-gold transition-colors text-sm">
                    {s.title}
                  </p>
                  <p className="text-xs text-charcoal-70 leading-relaxed">{s.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Local hook */}
        <section className="bg-cream-100 border-y border-charcoal/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex gap-5">
              <div className="w-1 bg-gold rounded-full shrink-0" />
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-widest text-gold">
                  Local knowledge
                </p>
                <p className="text-charcoal-70 leading-relaxed">{town.localHook}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-bold text-charcoal mb-8">
            Common questions about cleaning in {town.name}
          </h2>
          <Accordion multiple={false} className="space-y-2">
            {town.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-cream-100 rounded-xl border border-charcoal/10 px-4"
              >
                <AccordionTrigger className="text-sm font-semibold text-charcoal text-left py-4 hover:text-gold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-charcoal-70 leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Nearby towns */}
        {nearbyTownData.length > 0 && (
          <section className="bg-cream-100 border-y border-charcoal/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-gold mb-5">
                Also serving nearby
              </p>
              <div className="flex flex-wrap gap-3">
                {nearbyTownData.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/cleaning-services/${t.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cream rounded-full border border-charcoal/10 text-sm text-charcoal hover:border-gold hover:text-gold transition-colors"
                  >
                    Cleaning in {t.name}, NJ
                    <ChevronRight size={12} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-gold">
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
      <Footer />
    </>
  );
}
