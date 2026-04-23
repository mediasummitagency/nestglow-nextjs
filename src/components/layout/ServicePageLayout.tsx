import Link from "next/link";
import { Check, ShieldCheck, Award, ThumbsUp, Clock, Star, ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BUSINESS, BASE_URL } from "@/lib/config";

export type ServicePageProps = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  introParagraph: string;
  whatsIncluded: string[];
  bestFor: string[];
  priceNote: string;
  faqs: Array<{ q: string; a: string }>;
  schemaServiceType: string;
};

const testimonialSnippets = [
  { name: "Eileen S.", quote: "Caroline was so kind and very professional. She arrived promptly right on time." },
  { name: "Jeffrey R.", quote: "Extremely dependable and does a great job. My house is sparkling after she leaves!" },
  { name: "Elena H.", quote: "Very dependable and trustworthy and I would recommend her to anyone." },
];

const trustPillars = [
  { icon: ShieldCheck, label: "Fully insured & bonded" },
  { icon: Award, label: "10+ years of experience" },
  { icon: ThumbsUp, label: "Satisfaction guaranteed" },
  { icon: Clock, label: "On-time, every time" },
];

export default function ServicePageLayout({
  slug,
  h1,
  metaDescription,
  introParagraph,
  whatsIncluded,
  bestFor,
  priceNote,
  faqs,
  schemaServiceType,
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
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/services" className="hover:text-gold transition-colors">Services</Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">{h1.split(" in ")[0]}</span>
        </nav>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl">
            {h1}
          </h1>
          <p className="text-base md:text-lg text-charcoal-70 leading-relaxed max-w-2xl">
            {introParagraph}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/book"
              className="bg-gold text-charcoal font-semibold px-6 py-3 rounded-full hover:bg-gold-dark transition-colors"
            >
              Book Cleaning
            </Link>
            <Link
              href="/#quick-quote"
              className="border border-charcoal/20 text-charcoal font-semibold px-6 py-3 rounded-full hover:bg-cream-100 transition-colors"
            >
              Get a Quick Quote
            </Link>
          </div>
        </section>

        {/* What's included */}
        <section className="bg-cream-100 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-8">
              What&apos;s included
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
              {whatsIncluded.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-gold-dark" />
                  </div>
                  <p className="text-sm text-charcoal-70 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best for */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6">
            Best for
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            {bestFor.map((scenario) => (
              <li
                key={scenario}
                className="bg-cream-100 rounded-xl p-4 text-sm text-charcoal-70 border border-charcoal/5"
              >
                {scenario}
              </li>
            ))}
          </ul>
        </section>

        {/* Pricing */}
        <section className="bg-cream-100 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-charcoal mb-3">About pricing</h2>
            <p className="text-sm text-charcoal-70 leading-relaxed">{priceNote}</p>
          </div>
        </section>

        {/* Trust bar */}
        <section className="py-10 border-b border-charcoal/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {trustPillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.label} className="flex flex-col items-center gap-2">
                    <Icon size={22} className="text-gold" />
                    <p className="text-sm font-medium text-charcoal">{p.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-8">
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
                    <Star key={i} size={12} className="fill-gold stroke-gold" />
                  ))}
                </div>
                <p className="text-sm text-charcoal-70 italic">&ldquo;{t.quote}&rdquo;</p>
                <footer className="text-sm font-semibold text-charcoal">{t.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-cream-100 py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-8">
              Frequently asked questions
            </h2>
            <Accordion multiple={false} className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-cream rounded-xl border border-charcoal/10 px-4"
                >
                  <AccordionTrigger className="text-sm font-semibold text-charcoal text-left py-4 hover:text-gold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-charcoal-70 leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gold py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <h2 className="text-3xl font-bold text-charcoal">
              Ready to book?
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
