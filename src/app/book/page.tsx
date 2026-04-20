import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ShieldCheck, Award, ThumbsUp, Clock, ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BASE_URL, BUSINESS } from "@/lib/config";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import BookingFormWrapper from "./BookingFormWrapper";
import PhoneLink from "@/components/PhoneLink";

export const metadata: Metadata = {
  title: "Book a Cleaning",
  description:
    "Book a residential or commercial cleaning with NestGlow Co. Serving Monmouth, Ocean, and Middlesex County, NJ. Insured, bonded, and guaranteed.",
  alternates: { canonical: `${BASE_URL}/book` },
};

const bookingFaqs = [
  {
    q: "When will you confirm my appointment?",
    a: "We confirm all bookings via text or phone within 24 hours. If you submit on a weekend, expect to hear from us by Monday morning.",
  },
  {
    q: "What if I need to reschedule?",
    a: "Just reach out at least 24 hours before your appointment and we'll find a new time that works. We're flexible — life happens.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "Not at all. Many of our regular clients provide a key or garage code. Our team is background-checked and fully insured. We'll send an arrival reminder before each visit.",
  },
  {
    q: "What happens after I submit this form?",
    a: "Our team reviews your request and reaches out within 24 hours to confirm the date, time, and final pricing. No payment is collected until your appointment is confirmed.",
  },
  {
    q: "Is my payment processed now?",
    a: "No. This form is a booking request, not a payment transaction. Payment is collected after the cleaning is complete, using the method you selected.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: bookingFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const trustPoints = [
  { icon: ShieldCheck, label: "Fully insured & bonded" },
  { icon: Award, label: "10+ years of experience" },
  { icon: ThumbsUp, label: "24-hour satisfaction guarantee" },
  { icon: Clock, label: "Confirmed within 24 hours" },
];

export default function BookPage() {
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
          <span className="text-charcoal">Book Cleaning</span>
        </nav>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Booking</p>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal">Book Your Cleaning</h1>
          <p className="text-charcoal-70">Tell us about your space. We&apos;ll confirm your appointment within 24 hours.</p>
          <div className="flex flex-wrap gap-4 text-sm text-charcoal-70">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-gold" /> Insured &amp; bonded</span>
            <span className="flex items-center gap-1.5"><ThumbsUp size={14} className="text-gold" /> Background-checked team</span>
            <span className="flex items-center gap-1.5"><Award size={14} className="text-gold" /> 24-hour satisfaction guarantee</span>
          </div>
        </section>

        {/* Main two-column */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Form — 2/3 width */}
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="p-8 text-charcoal-40 text-sm">Loading form...</div>}>
                <BookingFormWrapper />
              </Suspense>
            </div>

            {/* Sidebar — 1/3 width */}
            <aside className="lg:sticky lg:top-[88px] space-y-6">
              {/* Trust */}
              <div className="bg-cream-100 rounded-2xl p-6 border border-charcoal/5 space-y-4">
                <h2 className="font-bold text-charcoal text-sm uppercase tracking-widest">
                  Why book with NestGlow Co
                </h2>
                <ul className="space-y-3">
                  {trustPoints.map((p) => {
                    const Icon = p.icon;
                    return (
                      <li key={p.label} className="flex items-center gap-3 text-sm text-charcoal-70">
                        <Icon size={16} className="text-gold shrink-0" />
                        {p.label}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Prefer to call */}
              <div className="bg-cream-100 rounded-2xl p-6 border border-charcoal/5 space-y-3">
                <h2 className="font-bold text-charcoal text-sm uppercase tracking-widest">
                  Prefer to call?
                </h2>
                <PhoneLink className="text-lg font-bold text-gold hover:text-gold-dark transition-colors" />
                <p className="text-xs text-charcoal-40">
                  We answer calls and texts during business hours.
                </p>
              </div>

              {/* Testimonial */}
              <blockquote className="bg-gold/10 border border-gold/20 rounded-2xl p-6 space-y-3">
                <p className="text-sm text-charcoal-70 italic leading-relaxed">
                  &ldquo;Caroline is extremely dependable and does a great job. My house is sparkling after she leaves!&rdquo;
                </p>
                <footer className="text-sm font-semibold text-charcoal">Jeffrey R.</footer>
              </blockquote>
            </aside>
          </div>
        </section>

        {/* Booking FAQs */}
        <section className="bg-cream-100 py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-charcoal mb-8">Booking questions</h2>
            <Accordion multiple={false} className="space-y-2">
              {bookingFaqs.map((faq, i) => (
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
      </main>
      <Footer />
    </>
  );
}
