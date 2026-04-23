import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact NestGlow Co",
  description:
    "Get in touch with NestGlow Co — book a cleaning, ask a question, or request a custom quote. Serving Monmouth, Ocean, and Middlesex County, NJ.",
  alternates: { canonical: `${BASE_URL}/contact` },
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#contact-methods"],
  },
  url: `${BASE_URL}/contact`,
};

const contactMethods = [
  {
    icon: Phone,
    label: "Call us",
    value: BUSINESS.phone,
    href: BUSINESS.phoneHref,
  },
  {
    icon: MessageSquare,
    label: "Text us",
    value: BUSINESS.phone,
    href: BUSINESS.phoneHref,
  },
  {
    icon: Mail,
    label: "Email us",
    value: BUSINESS.email,
    href: BUSINESS.emailHref,
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <main className="pt-[72px]">
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal">
            Let&apos;s get in touch.
          </h1>
          <p className="text-lg text-charcoal-70">
            We respond to all messages within 24 hours. For the fastest response, give us a call.
          </p>
        </section>

        {/* Contact methods */}
        <section id="contact-methods" className="bg-cream-100 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.label}
                    href={method.href}
                    className="bg-cream rounded-2xl p-6 border border-charcoal/10 hover:border-gold transition-all hover:-translate-y-0.5 flex flex-col items-center gap-3 text-center group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                      <Icon size={20} className="text-gold-dark" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-40">
                      {method.label}
                    </p>
                    <p className="font-semibold text-charcoal group-hover:text-gold transition-colors">
                      {method.value}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service area */}
        <section className="py-12 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-charcoal-70 mb-4">
            We serve homeowners and businesses in:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
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

        {/* Book CTA */}
        <section className="bg-gold py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
              Ready to book?
            </h2>
            <p className="text-charcoal-70">
              Use our booking form to schedule your clean, share details about your space, and choose add-ons.
            </p>
            <Link
              href="/book"
              className="inline-block bg-charcoal text-cream font-semibold px-8 py-3 rounded-full hover:bg-charcoal-70 transition-colors"
            >
              Book Your Cleaning
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
