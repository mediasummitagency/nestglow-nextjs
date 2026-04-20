import Link from "next/link";
import Image from "next/image";
import { Star, ShieldCheck, Award, ThumbsUp, Clock, Home, Briefcase, Sparkles, Truck, ChevronRight } from "lucide-react";
import { BUSINESS, BASE_URL } from "@/lib/config";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import QuickQuoteForm from "@/components/forms/QuickQuoteForm";

const testimonials = [
  {
    name: "Eileen S.",
    date: "2025-10-08",
    quote:
      "I'm so happy I scheduled with Caroline and her team. Caroline was so kind and very professional. She arrived promptly right on time at 9 AM. Communication and reminders were sent to keep us updated about our appointment and her arrival time.",
  },
  {
    name: "Jeffrey R.",
    date: "2020-01-31",
    quote:
      "Caroline is extremely dependable and does a great job. She is very flexible with my schedule and always accommodates my schedule. My house is sparkling after she leaves! I would highly recommend her.",
  },
  {
    name: "Greg A.",
    date: "2020-01-31",
    quote:
      "Caroline is punctual, flexible, and dependable! I love walking into my house when she's been here!",
  },
  {
    name: "Elena H.",
    date: "2020-01-29",
    quote:
      "We hired Caroline over three years ago. She comes to our house every other week and does a fabulous job. Caroline is very dependable and trustworthy and I would recommend her to anyone.",
  },
  {
    name: "Danny H.",
    date: "2020-01-29",
    quote:
      "Caroline has worked with us for over a year. She is conscientious, hard working and flexible. Caroline always asks for feedback — 'how does it look', 'what else can I do', 'anything you want me to focus on this week', 'anything I should do better' — she listens, incorporates the feedback and grows. We are super happy with the work Caroline does.",
  },
];

const services = [
  {
    href: "/services/residential-cleaning",
    icon: Home,
    title: "Residential Cleaning",
    copy: "Regular maintenance, deep cleans, and special requests for the homes you live in and love.",
  },
  {
    href: "/services/commercial-cleaning",
    icon: Briefcase,
    title: "Commercial Cleaning",
    copy: "Offices, storefronts, and professional suites. Schedules built around your business hours.",
  },
  {
    href: "/services/deep-cleaning",
    icon: Sparkles,
    title: "Deep Cleaning",
    copy: "Top-to-bottom detailing for first-time cleans, seasonal resets, and pre-guest refreshes.",
  },
  {
    href: "/services/move-in-move-out",
    icon: Truck,
    title: "Move In / Move Out",
    copy: "Empty-home deep cleans that make the next chapter simpler — for sellers, buyers, and renters.",
  },
];

const trustPillars = [
  { icon: ShieldCheck, label: "Fully insured & bonded" },
  { icon: Award, label: "10+ years of experience" },
  { icon: ThumbsUp, label: "Satisfaction guaranteed" },
  { icon: Clock, label: "On-time, every time" },
];

const howItWorks = [
  {
    step: "01",
    title: "Tell us about your space.",
    body: "Share the basics in our quick form.",
  },
  {
    step: "02",
    title: "We confirm your clean.",
    body: "Within 24 hours, a real person from our team gets back to you.",
  },
  {
    step: "03",
    title: "Your home glows.",
    body: "Our insured, background-checked team arrives on time and leaves your space spotless.",
  },
];

const counties = [
  { name: "Monmouth County", href: "/cleaning-services/monmouth-county", towns: 10 },
  { name: "Ocean County", href: "/cleaning-services/ocean-county", towns: 7 },
  { name: "Middlesex County", href: "/cleaning-services/middlesex-county", towns: 6 },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HouseCleaningService",
  name: BUSINESS.name,
  image: `${BASE_URL}/logo.png`,
  "@id": BASE_URL,
  url: BASE_URL,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    addressCountry: BUSINESS.address.country,
  },
  areaServed: BUSINESS.areaServed.map((a) => ({ "@type": "Place", name: a })),
  priceRange: "$$",
  foundingDate: "2015",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "5",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <SiteNav />

      <main className="pt-[72px]">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              Cleaning services in NJ
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
              Clean homes. Calm days. Count on our team.
            </h1>
            <p className="text-lg text-charcoal-70 leading-relaxed">
              Professional residential and commercial cleaning across Monmouth, Ocean, and Middlesex County. 10+ years, insured, bonded, and guaranteed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/book"
                className="bg-gold text-charcoal font-semibold px-6 py-3 rounded-full hover:bg-gold-dark transition-colors"
              >
                Book Your Cleaning
              </Link>
              <Link
                href="/general-vs-deep-cleaning"
                className="border border-charcoal/20 text-charcoal font-semibold px-6 py-3 rounded-full hover:bg-cream-100 transition-colors"
              >
                See what&apos;s included
              </Link>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-charcoal-70">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-gold stroke-gold" />
              ))}
              <span className="ml-1">Rated by homeowners across Monmouth County</span>
            </div>
          </div>

          {/* Hero image — placeholder until real photo is available */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-100">
            <div className="absolute inset-0 flex items-center justify-center text-charcoal-40 text-sm">
              [Hero photo — add before launch]
            </div>
          </div>
        </section>

        {/* Quick Quote */}
        <section className="bg-cream-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">
              Get a quick quote
            </h2>
            <QuickQuoteForm />
          </div>
        </section>

        {/* Services grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-2 text-center">
            What we clean
          </h2>
          <p className="text-center text-charcoal-70 mb-10">
            Every service is backed by our satisfaction guarantee.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="group bg-cream-100 rounded-2xl p-8 border border-transparent hover:border-gold transition-all hover:-translate-y-0.5 space-y-3"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <Icon size={18} className="text-gold-dark" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal group-hover:text-gold transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-charcoal-70 leading-relaxed">{svc.copy}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                    Learn more <ChevronRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-cream-100 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {trustPillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.label} className="flex flex-col items-center gap-2">
                    <Icon size={24} className="text-gold" />
                    <p className="text-sm font-medium text-charcoal">{p.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-2 text-center">
            How it works
          </h2>
          <p className="text-center text-charcoal-70 mb-10">
            Simple, fast, and reliable from start to finish.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step) => (
              <div key={step.step} className="flex flex-col gap-3">
                <span className="font-display text-5xl font-bold text-gold/30">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-charcoal">{step.title}</h3>
                <p className="text-sm text-charcoal-70 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* General vs Deep teaser */}
        <section className="bg-cream-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-2 text-center">
              Not sure what kind of clean you need?
            </h2>
            <p className="text-center text-charcoal-70 mb-8">
              General cleaning keeps your home maintained. Deep cleaning resets it.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full max-w-2xl mx-auto text-sm border-collapse">
                <thead>
                  <tr className="border-b border-charcoal/10">
                    <th className="text-left py-3 px-4 font-semibold text-charcoal">Task</th>
                    <th className="py-3 px-4 font-semibold text-charcoal">General</th>
                    <th className="py-3 px-4 font-semibold text-charcoal">Deep</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Dusting surfaces", true, true],
                    ["Vacuuming & mopping", true, true],
                    ["Bathroom scrub", true, true],
                    ["Inside oven cleaning", false, true],
                    ["Inside fridge cleaning", false, true],
                    ["Baseboards & door frames", false, true],
                  ].map(([task, general, deep]) => (
                    <tr key={task as string} className="border-b border-charcoal/5">
                      <td className="py-3 px-4 text-charcoal-70">{task as string}</td>
                      <td className="py-3 px-4 text-center">
                        {general ? (
                          <span className="text-sage-dark font-bold">Yes</span>
                        ) : (
                          <span className="text-charcoal-40">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {deep ? (
                          <span className="text-sage-dark font-bold">Yes</span>
                        ) : (
                          <span className="text-charcoal-40">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/general-vs-deep-cleaning"
                className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal font-semibold px-6 py-3 rounded-full hover:bg-cream transition-colors"
              >
                See the full comparison <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-2 text-center">
            What our clients say
          </h2>
          <div className="flex items-center justify-center gap-1 mb-10">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-gold stroke-gold" />
            ))}
            <span className="ml-2 text-sm text-charcoal-70">5.0 · 5 reviews</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t) => (
              <blockquote
                key={t.name}
                className="bg-cream-100 rounded-2xl p-6 space-y-4 border border-charcoal/5"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-gold stroke-gold" />
                  ))}
                </div>
                <p className="text-sm text-charcoal-70 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="text-sm font-semibold text-charcoal">{t.name}</footer>
              </blockquote>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
            >
              Read all reviews <ChevronRight size={14} />
            </Link>
          </div>
        </section>

        {/* Service areas */}
        <section className="bg-cream-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-2 text-center">
              Serving the NJ Shore and inland
            </h2>
            <p className="text-center text-charcoal-70 mb-10">
              Monmouth, Ocean, and Middlesex Counties — from the shore to the suburbs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {counties.map((county) => (
                <Link
                  key={county.href}
                  href={county.href}
                  className="group bg-cream rounded-2xl p-6 border border-charcoal/10 hover:border-gold transition-all hover:-translate-y-0.5 text-center space-y-2"
                >
                  <h3 className="font-bold text-charcoal group-hover:text-gold transition-colors">
                    {county.name}
                  </h3>
                  <p className="text-sm text-charcoal-40">{county.towns} towns served</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                    View towns <ChevronRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gold py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal">
              Ready to come home to clean?
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

      <Footer />
    </>
  );
}
