import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BASE_URL } from "@/lib/config";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cleaning FAQs | NestGlow Co",
  description:
    "Answers to common questions about house cleaning in NJ — pricing, scheduling, what's included, our team, and how booking works with NestGlow Co.",
  alternates: { canonical: `${BASE_URL}/faq` },
};

type FAQ = { q: string; a: string };
type Category = { title: string; faqs: FAQ[] };

const categories: Category[] = [
  {
    title: "Pricing & Quotes",
    faqs: [
      {
        q: "How much does house cleaning cost in NJ?",
        a: "Most NJ homes fall between $120 and $400 per clean, depending on bedroom count, bathroom count, square footage, and the type of cleaning (standard vs. deep clean). We don't give estimates over the phone — you'll get a firm quote after submitting the booking form.",
      },
      {
        q: "How do you price a cleaning?",
        a: "We price based on property type, number of bedrooms and bathrooms, approximate square footage, and any add-ons you request. The booking form collects those details and our team returns a firm quote within 24 hours.",
      },
      {
        q: "Is there a minimum charge?",
        a: "Yes. Our minimum service starts around $120 for smaller spaces like studio or one-bedroom apartments. Most homes fall above this minimum.",
      },
      {
        q: "Do prices change for recurring clients?",
        a: "Recurring clients on weekly or bi-weekly schedules typically pay less per visit than one-time bookings. The discount reflects the lower effort required to maintain a home that's cleaned consistently.",
      },
      {
        q: "Are there any hidden fees?",
        a: "No. The price we quote is what you pay. If something changes the scope significantly (like a home that's in much worse condition than described), we'll tell you before cleaning begins — not after.",
      },
    ],
  },
  {
    title: "Scheduling & Booking",
    faqs: [
      {
        q: "How do I book a cleaning?",
        a: "Submit the booking form on this site. Our team reviews your request and contacts you within 24 hours to confirm your date, time, and final pricing. No payment is collected until your appointment is confirmed.",
      },
      {
        q: "How far in advance should I book?",
        a: "For first-time bookings, we recommend submitting at least 3-5 business days out. Recurring clients get priority scheduling. For urgent needs, call us directly — same-week availability is sometimes possible depending on the schedule.",
      },
      {
        q: "Can I reschedule or cancel?",
        a: "Yes. Just reach out at least 24 hours before your appointment and we'll move it. We understand life happens — we're flexible.",
      },
      {
        q: "What if I need to clean on a specific day or time?",
        a: "Note your preferred day and time window in the booking form. We'll do our best to accommodate it and confirm within 24 hours.",
      },
      {
        q: "Do you clean on weekends?",
        a: "Weekend availability varies by season. Include your preferences in the booking form and our team will confirm what's available.",
      },
    ],
  },
  {
    title: "What's Included",
    faqs: [
      {
        q: "What does a standard cleaning include?",
        a: "A standard clean covers all rooms: dusting surfaces and baseboards, vacuuming and mopping floors, cleaning bathrooms (toilet, sink, tub/shower, mirror), kitchen cleaning (counters, appliance exteriors, sink), and trash removal. It does not include interior oven cleaning, interior fridge cleaning, or laundry unless added.",
      },
      {
        q: "What's the difference between a regular clean and a deep clean?",
        a: "A regular clean maintains a home that's already reasonably tidy. A deep clean goes further — inside the oven, inside the fridge, grout scrubbing, baseboards and moldings, light fixtures, and areas that build up over time. Deep cleans take significantly longer and are priced higher. See our General vs. Deep Cleaning comparison for the full breakdown.",
      },
      {
        q: "Do you bring your own supplies and equipment?",
        a: "Yes. Our team arrives with all cleaning products and equipment. If you have preferences (specific products, allergies, fragrance-free), note it in the booking form or contact us beforehand.",
      },
      {
        q: "Do you do laundry or dishes?",
        a: "Laundry and dishes are available as add-ons. Add them in the booking form and we'll include them in your quote.",
      },
      {
        q: "Can you clean inside appliances?",
        a: "Yes — interior oven and interior fridge cleaning are available as add-ons. These take additional time and are priced accordingly.",
      },
    ],
  },
  {
    title: "Our Team & Trust",
    faqs: [
      {
        q: "Is NestGlow Co insured?",
        a: "Yes. We are fully insured and bonded. If anything is damaged during a cleaning, it's covered — contact us within 24 hours of service.",
      },
      {
        q: "Are your cleaners background-checked?",
        a: "Yes. All team members are background-checked before they work with us. We take home access seriously.",
      },
      {
        q: "Will I always have the same cleaner?",
        a: "For recurring clients, we do our best to send the same team member each visit. Continuity builds quality — the same person learns your home and your preferences.",
      },
      {
        q: "Do I need to be home during the cleaning?",
        a: "No. Many of our regular clients provide a key or garage code. We send an arrival reminder before each visit. If you prefer to be home, that's fine too.",
      },
      {
        q: "What if I'm not satisfied with the cleaning?",
        a: "We back every clean with a 24-hour satisfaction guarantee. If something wasn't done to your standard, contact us within 24 hours and we'll return to address it at no additional charge.",
      },
    ],
  },
  {
    title: "Payment",
    faqs: [
      {
        q: "When do I pay?",
        a: "Payment is collected after the cleaning is complete — not at booking. We review your request, confirm the appointment, complete the work, then collect payment.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept cash, check, Venmo, Zelle, and credit/debit card. Select your preferred method in the booking form.",
      },
      {
        q: "Is a deposit required?",
        a: "No deposit is required for most bookings. For large jobs or first-time commercial clients, we may ask for a partial deposit — our team will let you know when confirming your appointment.",
      },
    ],
  },
  {
    title: "Service Areas",
    faqs: [
      {
        q: "What areas does NestGlow Co serve?",
        a: "We serve Monmouth, Ocean, and Middlesex County, NJ. Specific towns include Neptune, Red Bank, Holmdel, Middletown, Freehold, Marlboro, Toms River, Brick, Point Pleasant, Jackson, Old Bridge, Edison, and more. See our full service area list.",
      },
      {
        q: "Do you serve my town?",
        a: "Check our service areas page for the full town list. If your town isn't listed, submit the booking form with your ZIP code — we sometimes schedule outside our standard area for the right fit.",
      },
      {
        q: "Do you charge a travel fee?",
        a: "We don't charge a separate travel fee for locations within our service area. Homes at the edge of our coverage may see slightly higher pricing factored into the quote.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: categories.flatMap((c) =>
    c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiteNav />
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-charcoal-40">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">FAQ</span>
        </nav>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Help Center</p>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal">
            Frequently Asked Questions
          </h1>
          <p className="text-charcoal-70 max-w-2xl leading-relaxed">
            Common questions about our cleaning services, pricing, scheduling, and what to expect. Can&apos;t find your answer?{" "}
            <Link href="/contact" className="text-gold hover:text-gold-dark underline transition-colors">
              Reach out directly.
            </Link>
          </p>
        </section>

        {/* Category nav */}
        <section className="bg-cream-100 border-y border-charcoal/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <a
                key={c.title}
                href={`#${c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="px-3 py-1.5 text-xs font-medium bg-cream border border-charcoal/10 rounded-full text-charcoal hover:border-gold hover:text-gold transition-colors"
              >
                {c.title}
              </a>
            ))}
          </div>
        </section>

        {/* FAQ sections */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-14">
          {categories.map((category) => (
            <section
              key={category.title}
              id={category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            >
              <h2 className="text-xl font-bold text-charcoal mb-6">{category.title}</h2>
              <Accordion multiple={false} className="space-y-2">
                {category.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`${category.title}-${i}`}
                    className="bg-cream-100 rounded-xl border border-charcoal/10 px-4"
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
            </section>
          ))}
        </div>

        {/* CTA */}
        <section className="bg-gold">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center space-y-4">
            <h2 className="text-2xl font-bold text-charcoal">
              Ready to book?
            </h2>
            <p className="text-charcoal/80">
              Submit a booking request and we confirm your appointment within 24 hours.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center bg-charcoal text-cream font-semibold px-7 py-3.5 rounded-full hover:bg-charcoal/90 transition-colors text-sm mt-2"
            >
              Book a Cleaning
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
