import type { Metadata } from "next";
import { Phone, Mail, MessageSquare, ShieldCheck, Clock, BadgeCheck, Sparkles } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { CtaOpen, CtaClosed, CtaNext } from "@/components/ui/CtaVariant";

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

/**
 * Three cards at any hour. `when` swaps the first one:
 *
 *   answered hours -> Call us   · Text us · Email us
 *   after hours    -> Send it now (jumps to the form) · Text us · Email us
 *
 * The phone is not offered when nobody is answering it. The form takes its
 * place rather than the grid dropping to two cards, both because the form IS
 * the after-hours path Lucas asked for and because a 3-column grid holding two
 * items reads as something failing to load.
 *
 * Text and email survive in both states: both sit in an inbox until morning,
 * so neither makes a promise the hour can break.
 */
const contactMethods = [
  { icon: Phone, label: "Call us", value: BUSINESS.phone, href: BUSINESS.phoneHref, when: "open" as const },
  { icon: Sparkles, label: "Send it now", value: "Quote request", href: "#quote-form", when: "closed" as const },
  { icon: MessageSquare, label: "Text us", value: BUSINESS.phone, href: BUSINESS.smsHref, when: null },
  { icon: Mail, label: "Email us", value: BUSINESS.email, href: BUSINESS.emailHref, when: null },
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
          <div id="quote-form" className="mx-auto mt-8 max-w-2xl scroll-mt-24 text-left">
            <ContactForm />
          </div>
        </PageHero>

        {/* Reassurances sit just under the form, on light ground — they are
            charcoal text and would not read on the hero image. */}
        <section className="bg-white py-10">
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

        {/* Contact methods */}
        <section id="contact-methods" className="bg-cream-100 py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                const card = (
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

                // `display: contents` on the wrapper, so the card stays a
                // direct grid item and keeps its column.
                return method.when === "open" ? (
                  <CtaOpen key={method.label}>{card}</CtaOpen>
                ) : method.when === "closed" ? (
                  <CtaClosed key={method.label}>{card}</CtaClosed>
                ) : (
                  card
                );
              })}
            </div>

            {/* Says when the PHONE is answered again — not when a human replies.
                The site's existing "within one business day" promise is true at
                every hour and is deliberately left alone. Always mounted, so
                the CtaMode script can fill it; see CtaNext in CtaVariant.tsx. */}
            <CtaClosed>
              <p className="mt-6 text-center text-sm text-charcoal-70">
                Caroline is away from the phone right now — send the form above
                and she will pick it up <CtaNext />.
              </p>
            </CtaClosed>
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
