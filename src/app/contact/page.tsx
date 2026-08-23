import type { Metadata } from "next";
import { Phone, Mail, MessageSquare, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  // No brand suffix here — the root layout template appends "| NestGlow Co".
  title: "Contact & Free Quote",
  description:
    "Get a free cleaning quote from NestGlow Co. Tell us about your home or business and Caroline will come back within one business day. Monmouth, Ocean & Middlesex County, NJ.",
  alternates: { canonical: `${BASE_URL}/contact` },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${BASE_URL}/contact`,
  mainEntity: {
    "@type": "HouseCleaningService",
    name: BUSINESS.name,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    areaServed: BUSINESS.areaServed.map((a) => ({ "@type": "Place", name: a })),
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#contact-methods"],
  },
};

const contactMethods = [
  { icon: Phone, label: "Call us", value: BUSINESS.phone, href: BUSINESS.phoneHref },
  { icon: MessageSquare, label: "Text us", value: BUSINESS.phone, href: BUSINESS.smsHref },
  { icon: Mail, label: "Email us", value: BUSINESS.email, href: BUSINESS.emailHref },
];

const reassurances = [
  { icon: Clock, text: "We reply within one business day" },
  { icon: ShieldCheck, text: "Fully insured and bonded" },
  { icon: BadgeCheck, text: "No contract, no commitment" },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <main>
        <PageHero
          heading="Get your free quote."
          subheading="Tell us about the place and Caroline will come back with a firm price. Prefer to talk? Call or text — we answer."
          centered
        />

        {/* Contact methods */}
        <section id="contact-methods" className="bg-cream-100 py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.label}
                    href={method.href}
                    className="group flex flex-col items-center gap-2 rounded-2xl border border-charcoal/10 bg-white p-6 text-center shadow transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/20">
                      <Icon size={20} className="text-brand-dark" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-40">
                      {method.label}
                    </p>
                    <p className="font-semibold text-charcoal transition-colors group-hover:text-brand">
                      {method.value}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* The form */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <ContactForm />

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {reassurances.map((r) => {
                const Icon = r.icon;
                return (
                  <li key={r.text} className="flex items-center gap-2 text-sm text-charcoal-70">
                    <Icon size={16} className="shrink-0 text-brand-dark" />
                    {r.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Service area */}
        <section className="border-t border-charcoal/10 bg-cream py-14">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="mb-3 text-2xl font-bold text-charcoal md:text-3xl">Where we clean</h2>
            <p className="mx-auto max-w-xl text-charcoal-70">
              Homes and short-term rentals across{" "}
              <strong className="text-charcoal">Monmouth, Ocean and Middlesex County, New Jersey</strong>
              . Not sure if you&apos;re in range? Put your ZIP in the form above and we&apos;ll tell
              you straight away.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
