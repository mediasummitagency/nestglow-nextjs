import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import PhoneLink from "@/components/PhoneLink";

export const metadata: Metadata = {
  title: "What to Expect from a Professional Move-Out Cleaning",
  description:
    "What's included in a professional move-out cleaning, how long it takes, what it costs, and how to prepare. A guide from NestGlow Co serving NJ.",
  alternates: { canonical: `${BASE_URL}/guides/what-to-expect-move-out-cleaning` },
  openGraph: {
    type: "article",
    publishedTime: "2026-04-16T00:00:00.000Z",
    modifiedTime: "2026-04-16T00:00:00.000Z",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What to Expect from a Professional Move-Out Cleaning",
  description:
    "What's included in a professional move-out cleaning, how long it takes, what it costs, and how to prepare.",
  author: { "@type": "Organization", name: BUSINESS.name },
  publisher: { "@type": "Organization", name: BUSINESS.name },
  url: `${BASE_URL}/guides/what-to-expect-move-out-cleaning`,
  datePublished: "2026-04-16",
  dateModified: "2026-04-16",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Prepare Your Home for a Move-Out Cleaning",
  description: "Steps to get your home ready before the cleaning crew arrives for a move-out clean.",
  step: [
    {
      "@type": "HowToStep",
      name: "Clear the home of furniture and belongings",
      text: "Move-out cleans are optimized for empty homes. Remove all furniture, personal items, and belongings before the team arrives. The cleaner the space, the more thorough the clean.",
    },
    {
      "@type": "HowToStep",
      name: "Ensure utilities are on",
      text: "Make sure electricity and water are active on the day of the cleaning. The team needs power for vacuuming and lighting, and water for all wet cleaning tasks.",
    },
    {
      "@type": "HowToStep",
      name: "Leave access instructions",
      text: "Provide key handoff details, door codes, or lockbox instructions so the team can access the property without you needing to be present.",
    },
    {
      "@type": "HowToStep",
      name: "Note any special areas",
      text: "If there are specific areas the landlord or buyer has flagged — heavy grout staining, an oven that hasn't been cleaned in months — note those when booking so we can plan accordingly.",
    },
    {
      "@type": "HowToStep",
      name: "Add-on requests",
      text: "If you want the garage included, inside cabinets, or any other add-on, mention it when booking — not the day of. This allows us to allocate the right time and crew.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How far in advance should I book a move-out cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At least 1–2 weeks in advance is ideal. During summer months (June–August), when rental turnover demand peaks in NJ, book as early as possible — 3–4 weeks out if you can. Last-minute bookings are sometimes available but not guaranteed.",
      },
    },
    {
      "@type": "Question",
      name: "Will a move-out clean help me get my deposit back?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — a professional move-out clean targets exactly what landlords look for during inspection: inside appliances, grout lines, fixtures, window tracks, and cabinet interiors. A clean that addresses those areas removes the most common reasons landlords withhold deposits.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to be there during the cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. As long as access is arranged in advance — via key handoff, lockbox, or door code — you don't need to be present. Most clients aren't home during the cleaning.",
      },
    },
    {
      "@type": "Question",
      name: "What if there's still some furniture in the home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A move-out clean is optimized for empty homes — surfaces are fully accessible, floors can be fully cleaned, and nothing needs to be worked around. If furniture remains, we'll clean what we can access, but the result won't be as thorough. If possible, clear the home completely before the appointment.",
      },
    },
    {
      "@type": "Question",
      name: "Do you clean the garage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Garage cleaning is an add-on — it's not included in a standard move-out clean. If you want the garage done, mention it when booking so we can account for the additional time and price it accordingly.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides` },
    {
      "@type": "ListItem",
      position: 3,
      name: "What to Expect from a Professional Move-Out Cleaning",
      item: `${BASE_URL}/guides/what-to-expect-move-out-cleaning`,
    },
  ],
};

export default function MoveOutCleaningGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SiteNav />
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-charcoal-40 flex-wrap">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/guides" className="hover:text-gold transition-colors">Guides</Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">Move-Out Cleaning</span>
        </nav>

        {/* Article header */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <header className="space-y-4 mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Move-Out Guide</p>
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal leading-tight">
              What to Expect from a Professional Move-Out Cleaning
            </h1>
            <div className="flex items-center gap-4 text-sm text-charcoal-40">
              <span className="flex items-center gap-1.5"><Clock size={13} /> 7 min read</span>
              <span>Updated April 2026</span>
            </div>
            <p className="text-charcoal-70 text-lg leading-relaxed border-l-4 border-gold pl-4">
              A professional move-out cleaning is a thorough, empty-home deep clean designed to hand a property over in spotless condition — inside cabinets, inside the oven, scrubbed grout, polished fixtures, and cleaned interior windows. It typically takes 4–8 hours for a standard home and costs between $250 and $500 depending on size. For tenants, a professional move-out clean significantly improves your chances of getting the full security deposit back. For sellers and landlords, it creates a strong first impression for buyers or new tenants.
            </p>
          </header>

          <div className="prose-charcoal space-y-8 text-charcoal-70 leading-relaxed">

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">What&apos;s included in a move-out clean</h2>
              <p>
                A move-out clean is more thorough than a standard maintenance clean or even a standard deep clean. Because the home is empty, every surface is accessible. Here&apos;s what a professional move-out clean covers:
              </p>
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-charcoal mb-2">Kitchen</h3>
                  <ul className="space-y-1 pl-4 list-disc list-outside text-sm">
                    <li>Interior and exterior oven, including racks and broiler drawer</li>
                    <li>Interior refrigerator and freezer (including shelves and drawers)</li>
                    <li>Interior microwave</li>
                    <li>Inside all cabinets and drawers (wiped and dried)</li>
                    <li>Countertops, backsplash, and grout lines</li>
                    <li>Sink, faucet, and disposal area</li>
                    <li>Dishwasher interior (filter, door seal, interior walls)</li>
                    <li>Exterior of all appliances</li>
                    <li>Baseboards and floor (swept and mopped)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-2">Bathrooms</h3>
                  <ul className="space-y-1 pl-4 list-disc list-outside text-sm">
                    <li>Toilet (inside bowl, rim, base, behind tank)</li>
                    <li>Shower and tub — grout scrubbing, tile, fixtures</li>
                    <li>Sink and vanity</li>
                    <li>Mirror</li>
                    <li>Inside medicine cabinet and vanity drawers</li>
                    <li>Exhaust fan cover (wiped)</li>
                    <li>Baseboards and floor</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-2">All rooms</h3>
                  <ul className="space-y-1 pl-4 list-disc list-outside text-sm">
                    <li>Walls spot-cleaned (scuffs, marks — not a full wall wash)</li>
                    <li>Baseboards and door frames wiped</li>
                    <li>Light switches and outlet covers</li>
                    <li>Window sills, tracks, and interior windows</li>
                    <li>Ceiling fans and light fixtures (dusted, wiped)</li>
                    <li>Inside closets and shelving</li>
                    <li>Floors vacuumed and mopped (or vacuumed for carpet)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">What&apos;s NOT included</h2>
              <p>
                A move-out clean is comprehensive, but not unlimited. These items are typically not included unless arranged in advance:
              </p>
              <ul className="space-y-2 pl-4 list-disc list-outside text-sm">
                <li><strong>Furniture moving:</strong> The home should be empty. We clean around remaining items but do not move heavy furniture.</li>
                <li><strong>Repairs and damage remediation:</strong> We clean surfaces; we don&apos;t patch holes, repaint, or fix broken items.</li>
                <li><strong>Outdoor areas:</strong> Patios, decks, driveways, and exterior windows are not included in a standard move-out clean.</li>
                <li><strong>Garage:</strong> Garage cleaning is an add-on — not standard. Mention it when booking.</li>
                <li><strong>Carpet shampooing:</strong> Vacuuming is included; wet carpet extraction is a separate service that must be requested.</li>
                <li><strong>Biohazard or severe mold:</strong> Normal cleaning tasks only. Extreme conditions require specialized remediation services.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">Timing: when to schedule</h2>
              <p>
                The ideal move-out clean happens after all your belongings are out and before the final walkthrough with your landlord, buyer, or new tenant. That window is often tight.
              </p>
              <p>
                Book at least 1–2 weeks in advance for most of the year. During summer (June–August), NJ&apos;s shore rental market creates a spike in demand — book 3–4 weeks out if possible, or earlier. Move-out slots fill faster than standard recurring spots.
              </p>
              <p>
                If you&apos;re coordinating with a real estate closing date, give us the closing date when you book. We can work backward to schedule the clean 1–2 days before, giving buyers a fresh home at closing.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">Cost expectations</h2>
              <p>
                Move-out cleans price higher than standard deep cleans because every surface is accessible and every area is expected to be brought to inspection-ready condition. Expect:
              </p>
              <div className="overflow-x-auto rounded-xl border border-charcoal/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-charcoal text-cream text-left">
                      <th className="px-4 py-3 font-semibold">Home Size</th>
                      <th className="px-4 py-3 font-semibold">Estimated Range</th>
                      <th className="px-4 py-3 font-semibold">Time Estimate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/5">
                    {[
                      ["1–2 bedroom", "$250 – $350", "4–5 hours"],
                      ["3 bedroom / 2 bath", "$300 – $400", "5–6 hours"],
                      ["4 bedroom / 2–3 bath", "$380 – $500", "6–8 hours"],
                      ["5+ bedroom / large home", "$500+", "8+ hours"],
                    ].map(([size, range, time]) => (
                      <tr key={size} className="even:bg-cream-100">
                        <td className="px-4 py-3 font-medium text-charcoal">{size}</td>
                        <td className="px-4 py-3">{range}</td>
                        <td className="px-4 py-3">{time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-charcoal-40">
                Ranges for Monmouth, Ocean, and Middlesex County, NJ. Actual pricing depends on home condition, add-ons, and specifics confirmed at booking.
              </p>
              <p>
                Price scales up if the home hasn&apos;t been cleaned in a long time, if there&apos;s significant oven or grout buildup, or if add-ons like garage cleaning are requested. A quote from the booking form reflects your actual home details, not a generic phone estimate.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">Tenant, landlord, and seller perspectives</h2>
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-charcoal mb-1">Tenants</h3>
                  <p>
                    Your goal is deposit recovery. Landlords do move-out inspections with a checklist — and the most common deductions come from exactly what a move-out clean covers: oven residue, bathroom grout, cabinet interiors, and fixture buildup. A professional clean addresses all of those. Keep the service receipt — it&apos;s documentation if a landlord tries to dispute.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-1">Landlords</h3>
                  <p>
                    You want the property ready for the next tenant as fast as possible. A professional move-out clean gets the unit to showing condition in one visit — rather than doing it yourself or waiting for tenant cleanup that rarely meets standard. It also lets you charge back the cost if the tenant didn&apos;t fulfill their lease cleaning obligations.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-1">Sellers</h3>
                  <p>
                    A clean home at closing leaves a lasting first impression and signals the property was well cared for. Buyers notice. Listing agents notice. A professional pre-closing clean is a low-cost way to protect perceived value at one of the highest-stakes moments of the transaction.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">Preparation checklist</h2>
              <p>
                A little preparation before the cleaning makes a big difference in the result. Here&apos;s what to do before your move-out clean:
              </p>
              <ol className="space-y-3 list-decimal list-outside pl-4 text-sm">
                <li><strong>Clear the home completely.</strong> Remove all furniture, boxes, personal items, and trash. An empty home gets the most thorough clean.</li>
                <li><strong>Ensure utilities are active.</strong> Power and water must be on — the team needs both. Confirm with your utility providers before the appointment.</li>
                <li><strong>Leave access instructions.</strong> If you won&apos;t be there, provide a lockbox code, key handoff plan, or door code so the team can enter without you.</li>
                <li><strong>Note problem areas.</strong> If the oven hasn&apos;t been cleaned in two years or there&apos;s heavy grout staining in one bathroom, mention it at booking so we can plan accordingly.</li>
                <li><strong>Request add-ons in advance.</strong> Garage, carpet extraction, or any non-standard request should be noted when booking — not the day of.</li>
              </ol>
              <p>
                You don&apos;t need to pre-clean anything. That&apos;s our job.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">Working with real estate agents</h2>
              <p>
                We regularly coordinate move-out and pre-closing cleans with real estate agents and their timelines. If your agent needs the home ready for a specific showing or closing date, we can work backward from that date to schedule the clean at the right time.
              </p>
              <p>
                We can also provide a service receipt after the clean — useful for sellers who want to document the condition for buyers, and for tenants who want proof of professional cleaning for their landlord.
              </p>
              <p>
                If you&apos;re an agent who regularly needs reliable move-out or pre-listing cleans in Monmouth, Ocean, or Middlesex County, <Link href="/contact" className="text-gold hover:text-gold-dark underline transition-colors font-medium">reach out directly</Link> — we work well with agents who need consistent, accountable turnaround.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">Frequently asked questions</h2>
              <div className="space-y-5">
                {[
                  {
                    q: "How far in advance should I book a move-out cleaning?",
                    a: "At least 1–2 weeks in advance. During summer months in NJ, when rental turnover demand is highest, book 3–4 weeks out if possible. Move-out slots fill faster than standard recurring appointments.",
                  },
                  {
                    q: "Will a move-out clean help me get my deposit back?",
                    a: "Yes. A professional move-out clean targets exactly what landlords look for during inspection — inside appliances, grout lines, cabinet interiors, and fixture buildup. These are the most common sources of deposit deductions. The service receipt is also useful documentation if a dispute arises.",
                  },
                  {
                    q: "Do I need to be there during the cleaning?",
                    a: "No. As long as access is arranged — via key, lockbox, or door code — the team can complete the clean without you being present. Most clients aren't home during the service.",
                  },
                  {
                    q: "What if there's still some furniture in the home?",
                    a: "Move-out cleans are optimized for empty homes — full floor access, fully accessible surfaces, no workarounds. If furniture remains, the clean will still be thorough in accessible areas, but the result won't match a fully empty home. If possible, clear out completely before the appointment.",
                  },
                  {
                    q: "Do you clean the garage?",
                    a: "The garage is an add-on — not included in a standard move-out clean. If you want it done, request it when booking so we can allocate time and price it correctly.",
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="border-b border-charcoal/10 pb-5 last:border-0 last:pb-0">
                    <p className="font-bold text-charcoal mb-1">{q}</p>
                    <p className="text-sm">{a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA block */}
            <div className="bg-gold/10 border border-gold/20 rounded-2xl p-6 space-y-4">
              <p className="font-bold text-charcoal">Ready to book a move-out clean?</p>
              <p className="text-sm">
                Submit the booking form with your home details and moving timeline. We return a firm quote within 24 hours and can coordinate with your closing date, final walkthrough, or lease end.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center bg-gold text-charcoal font-semibold px-5 py-2.5 rounded-full hover:bg-gold-dark transition-colors text-sm"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/services/move-in-move-out"
                  className="inline-flex items-center text-sm font-medium text-gold hover:text-gold-dark transition-colors"
                >
                  See move-in / move-out service details →
                </Link>
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
                href="/guides/how-much-does-house-cleaning-cost-nj"
                className="group bg-cream rounded-xl border border-charcoal/10 p-4 hover:border-gold/30 transition-all space-y-1"
              >
                <p className="font-semibold text-charcoal text-sm group-hover:text-gold transition-colors">
                  How Much Does House Cleaning Cost in NJ?
                </p>
                <p className="text-xs text-charcoal-40">6 min read</p>
              </Link>
              <Link
                href="/guides/how-to-prepare-home-for-cleaner"
                className="group bg-cream rounded-xl border border-charcoal/10 p-4 hover:border-gold/30 transition-all space-y-1"
              >
                <p className="font-semibold text-charcoal text-sm group-hover:text-gold transition-colors">
                  How to Prepare Your Home for a Cleaner
                </p>
                <p className="text-xs text-charcoal-40">5 min read</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
