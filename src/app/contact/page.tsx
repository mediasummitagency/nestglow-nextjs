import type { Metadata } from "next";
import { ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { CallTextBlock } from "@/components/forms/CallTextBlock";

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
  // #contact-methods is on the CallTextBlock above the form (it moved there
  // when the duplicate card row was deleted, 2026-08-23). Keep the two in step.
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#contact-methods"],
  },
};

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
        {/* FORM-FIRST, 2026-08-23. The page used to be hero -> contact cards
            -> form, so the only fillable thing on a page called "contact" was
            the third screen down. Anyone who clicked "contact" has already
            decided; make them scroll twice and some of them leave instead.
            Same fix gorsegner-local-test-build specs for its own /contact/ in
            `_workspace/next-implementation/gorsegner-contact-routing-and-showroom.md`
            section 2 — collapse the hero into the form rather than stacking one
            above the other.

            The form is a self-contained white card, so it sits on the hero
            image without any restyling. `text-left` because the hero container
            is `text-center` and form labels must not inherit it. */}
        <PageHero
          heading="Get your free quote."
          subheading="Tell us about the place and Caroline will come back with a firm price."
          centered
        >
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-left md:mt-8">
            {/* The page's ONE contact surface, at every width. Since /contact
                went form-first the form is the first thing here, so without
                this a visitor who would rather call has nothing to call until
                they have scrolled past all of it. Carries #contact-methods for
                the schema's speakable selector. */}
            <CallTextBlock id="contact-methods" />
            <div id="quote-form" className="scroll-mt-24">
              <ContactForm />
            </div>
          </div>
        </PageHero>

        {/* Reassurances sit just under the form, on light ground — they are
            charcoal text and would not read on the hero image. */}
        <section className="bg-white py-8 md:py-10">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
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
        <section className="border-t border-charcoal/10 bg-cream py-10 md:py-14">
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
