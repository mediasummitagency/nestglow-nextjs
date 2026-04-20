import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import PhoneLink from "@/components/PhoneLink";

export const metadata: Metadata = {
  title: "How Much Does House Cleaning Cost in NJ? (2025 Guide)",
  description:
    "A plain-language breakdown of house cleaning prices in New Jersey. What drives cost, average price ranges by home size, deep clean vs. regular clean, and how to get a fair quote.",
  alternates: { canonical: `${BASE_URL}/guides/how-much-does-house-cleaning-cost-nj` },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Much Does House Cleaning Cost in NJ? (2025 Guide)",
  description:
    "A plain-language breakdown of house cleaning prices in New Jersey — what drives cost, average ranges by home size, and how to get a fair quote.",
  author: { "@type": "Organization", name: BUSINESS.name },
  publisher: { "@type": "Organization", name: BUSINESS.name },
  url: `${BASE_URL}/guides/how-much-does-house-cleaning-cost-nj`,
  datePublished: "2025-01-01",
  dateModified: "2025-10-01",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does house cleaning cost in NJ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most NJ homes fall between $120 and $400 per clean. A 1-bedroom apartment starts around $120–$160. A 3-bedroom, 2-bathroom home typically runs $180–$280. Larger homes with 4+ bedrooms often fall between $250 and $400+. Deep cleans and move-out cleans price higher than standard maintenance cleans.",
      },
    },
    {
      "@type": "Question",
      name: "What factors affect house cleaning prices in New Jersey?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The main factors are: number of bedrooms and bathrooms, total square footage, condition of the home, type of cleaning (standard vs. deep vs. move-out), frequency (one-time costs more per visit than recurring), and any add-ons like interior oven, fridge cleaning, or laundry.",
      },
    },
    {
      "@type": "Question",
      name: "Is recurring cleaning cheaper than one-time cleaning in NJ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Recurring clients on weekly or bi-weekly schedules typically pay 10–20% less per visit than one-time bookings. A home that's cleaned consistently requires less time and effort to maintain, which is reflected in the rate.",
      },
    },
  ],
};

export default function HowMuchCostGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
          <Link href="/guides" className="hover:text-gold transition-colors">Guides</Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">House Cleaning Costs in NJ</span>
        </nav>

        {/* Article header */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <header className="space-y-4 mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Pricing Guide</p>
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal leading-tight">
              How Much Does House Cleaning Cost in NJ?
            </h1>
            <div className="flex items-center gap-4 text-sm text-charcoal-40">
              <span className="flex items-center gap-1.5"><Clock size={13} /> 6 min read</span>
              <span>Updated October 2025</span>
            </div>
            <p className="text-charcoal-70 text-lg leading-relaxed border-l-4 border-gold pl-4">
              Most NJ homes fall between $120 and $400 per clean. The real number depends on your home size, the type of cleaning, and how often you book. Here&apos;s what actually moves the price.
            </p>
          </header>

          <div className="prose-charcoal space-y-8 text-charcoal-70 leading-relaxed">

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">The short answer: price by home size</h2>
              <p>
                If you want a rough number before diving deeper, here are typical price ranges for standard recurring cleans in NJ:
              </p>
              <div className="overflow-x-auto rounded-xl border border-charcoal/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-charcoal text-cream text-left">
                      <th className="px-4 py-3 font-semibold">Home Size</th>
                      <th className="px-4 py-3 font-semibold">Standard Clean</th>
                      <th className="px-4 py-3 font-semibold">Deep Clean</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/5">
                    {[
                      ["Studio / 1 BR", "$120 – $160", "$180 – $240"],
                      ["2 BR / 1 BA", "$150 – $200", "$220 – $300"],
                      ["3 BR / 2 BA", "$180 – $280", "$280 – $400"],
                      ["4 BR / 2–3 BA", "$250 – $350", "$350 – $500"],
                      ["5+ BR / Large Home", "$350 – $500+", "$500+"],
                    ].map(([size, standard, deep]) => (
                      <tr key={size} className="even:bg-cream-100">
                        <td className="px-4 py-3 font-medium text-charcoal">{size}</td>
                        <td className="px-4 py-3">{standard}</td>
                        <td className="px-4 py-3">{deep}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-charcoal-40">
                Ranges reflect typical Monmouth, Ocean, and Middlesex County pricing. Actual quotes depend on condition, add-ons, and specifics of your home.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">What actually drives the price</h2>
              <p>Cleaning companies use a mix of factors — here&apos;s what carries the most weight:</p>

              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-charcoal mb-1">1. Number of bedrooms and bathrooms</h3>
                  <p>
                    More bedrooms means more surfaces, more floors, more baseboards. More bathrooms means more toilets, showers, sinks, and tile. These two numbers are the fastest way to estimate a home&apos;s scope.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-1">2. Square footage</h3>
                  <p>
                    A 1,200 sq ft ranch and a 3,500 sq ft colonial both have 3 bedrooms — but they&apos;re very different jobs. Total square footage matters, especially when there are large common areas, hallways, or finished basements.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-1">3. Condition of the home</h3>
                  <p>
                    A home that hasn&apos;t been professionally cleaned in six months takes significantly longer than one that gets a maintenance clean every two weeks. Heavily soiled homes — especially after construction, renovation, or a long vacancy — price differently from a well-maintained home.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-1">4. Type of cleaning</h3>
                  <p>
                    Standard maintenance cleans are faster and cost less. Deep cleans go further — inside appliances, grout scrubbing, baseboards, light fixtures, behind furniture. Move-out cleans are the most intensive and typically price highest.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-1">5. Frequency</h3>
                  <p>
                    One-time cleans cost more per visit than recurring service. A home cleaned weekly or bi-weekly is easier to maintain, so each visit takes less time and the per-visit rate reflects that.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-1">6. Add-ons</h3>
                  <p>
                    Interior oven cleaning, interior fridge cleaning, laundry, dishes, inside cabinets — these all add time and are priced accordingly. Not included by default.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">Standard clean vs. deep clean: what&apos;s the difference?</h2>
              <p>
                A standard clean maintains a home that&apos;s already reasonably tidy. It covers the expected rooms and surfaces — floors, counters, bathrooms, kitchen, dusting — in a time-efficient way.
              </p>
              <p>
                A deep clean resets a home that hasn&apos;t had that maintenance. It includes everything in a standard clean, plus:
              </p>
              <ul className="space-y-2 pl-4 list-disc list-outside text-sm">
                <li>Interior oven and range cleaning</li>
                <li>Interior refrigerator cleaning</li>
                <li>Grout scrubbing in bathrooms and kitchens</li>
                <li>Baseboards and moldings throughout</li>
                <li>Light fixtures and ceiling fans</li>
                <li>Inside window tracks and sills</li>
                <li>Behind and underneath appliances (where accessible)</li>
                <li>Cabinet fronts and interiors</li>
              </ul>
              <p>
                A deep clean is the right starting point for new clients, homes that haven&apos;t been professionally cleaned in months, and pre-listing or post-renovation cleans. After the first deep clean, a recurring standard clean keeps the home in that condition.
              </p>
              <p>
                <Link href="/general-vs-deep-cleaning" className="text-gold hover:text-gold-dark underline transition-colors font-medium">
                  See the full room-by-room comparison →
                </Link>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">Move-out cleaning: what to expect</h2>
              <p>
                Move-out cleans are the most thorough — and the most expensive — type of residential cleaning. The home needs to be empty (or nearly empty), cleaned top-to-bottom for landlord inspection or new occupant move-in.
              </p>
              <p>
                Expect move-out cleans to price 30–60% higher than a deep clean of the same home, depending on condition. A clean, empty home will price at the lower end; one that was hard on surfaces or hasn&apos;t been cleaned in a long time will price higher.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">Is it worth getting a quote vs. accepting a phone estimate?</h2>
              <p>
                Phone estimates are almost always inaccurate — in either direction. A company that gives you a firm number over the phone without knowing your home&apos;s square footage, bedroom and bathroom count, and current condition is guessing.
              </p>
              <p>
                A proper quote takes two minutes: submit a booking form with your home details. A reputable cleaning company returns a real number within 24 hours. That number is what you actually pay — no surprises after the job.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">Cleaning costs in Monmouth, Ocean &amp; Middlesex County</h2>
              <p>
                Pricing across these three counties is fairly consistent. There&apos;s a slight premium for shore properties in Ocean and Monmouth counties during peak summer season, when rental turnover demand is high. Larger homes in communities like Holmdel, Colts Neck, and Manalapan price at the upper end of their bedroom-count range due to actual square footage.
              </p>
              <p>
                The biggest variation isn&apos;t geography — it&apos;s home condition and cleaning type. A 3-bedroom house in excellent shape on a recurring schedule costs significantly less per visit than the same home being cleaned for the first time after a year of deferred maintenance.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">How to get a fair quote</h2>
              <ol className="space-y-3 list-decimal list-outside pl-4 text-sm">
                <li>Fill out the booking form with your actual bedroom count, bathroom count, and approximate square footage.</li>
                <li>Note the current condition honestly. &ldquo;Hasn&apos;t been deep cleaned in 6 months&rdquo; is useful information — it affects scope and therefore price.</li>
                <li>List any add-ons you want (oven, fridge, laundry).</li>
                <li>Specify the type of cleaning and desired frequency.</li>
                <li>Get a written quote back within 24 hours that reflects what you actually described.</li>
              </ol>
              <p>
                No payment is collected until you confirm the appointment and the cleaning is complete.
              </p>
            </section>

            {/* CTA block */}
            <div className="bg-gold/10 border border-gold/20 rounded-2xl p-6 space-y-4">
              <p className="font-bold text-charcoal">Get a quote for your home</p>
              <p className="text-sm">
                Submit the booking form with your home details. Our team returns a firm quote within 24 hours — no payment until the cleaning is done.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center bg-gold text-charcoal font-semibold px-5 py-2.5 rounded-full hover:bg-gold-dark transition-colors text-sm"
                >
                  Get a Quote
                </Link>
                <PhoneLink className="inline-flex items-center text-sm font-medium text-gold hover:text-gold-dark transition-colors" />
              </div>
            </div>
          </div>
        </article>

        {/* Related guides */}
        <section className="bg-cream-100 border-y border-charcoal/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Related</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/guides/what-to-expect-move-out-cleaning"
                className="group bg-cream rounded-xl border border-charcoal/10 p-4 hover:border-gold/30 transition-all space-y-1"
              >
                <p className="font-semibold text-charcoal text-sm group-hover:text-gold transition-colors">
                  What to Expect from a Move-Out Cleaning
                </p>
                <p className="text-xs text-charcoal-40">5 min read</p>
              </Link>
              <Link
                href="/general-vs-deep-cleaning"
                className="group bg-cream rounded-xl border border-charcoal/10 p-4 hover:border-gold/30 transition-all space-y-1"
              >
                <p className="font-semibold text-charcoal text-sm group-hover:text-gold transition-colors">
                  General vs. Deep Cleaning: Full Comparison
                </p>
                <p className="text-xs text-charcoal-40">Service comparison</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
