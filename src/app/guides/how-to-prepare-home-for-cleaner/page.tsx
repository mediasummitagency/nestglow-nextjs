import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { BASE_URL, BUSINESS } from "@/lib/config";
import PhoneLink from "@/components/PhoneLink";

export const metadata: Metadata = {
  title: "How to Prepare Your Home for a Cleaner (5-Minute Checklist)",
  description:
    "What to do before your cleaning appointment — a simple 5-minute checklist from NestGlow Co. Serving Monmouth, Ocean, and Middlesex County, NJ.",
  alternates: { canonical: `${BASE_URL}/guides/how-to-prepare-home-for-cleaner` },
  openGraph: {
    type: "article",
    publishedTime: "2026-04-16T00:00:00.000Z",
    modifiedTime: "2026-04-16T00:00:00.000Z",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Prepare Your Home for a Cleaner (5-Minute Checklist)",
  description:
    "What to do before your cleaning appointment — a simple 5-minute checklist.",
  author: { "@type": "Organization", name: BUSINESS.name },
  publisher: { "@type": "Organization", name: BUSINESS.name },
  url: `${BASE_URL}/guides/how-to-prepare-home-for-cleaner`,
  datePublished: "2026-04-16",
  dateModified: "2026-04-16",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Prepare Your Home for a Cleaner (5-Minute Checklist)",
  description: "Simple steps to get your home ready before a professional cleaning team arrives.",
  totalTime: "PT5M",
  step: [
    {
      "@type": "HowToStep",
      name: "Clear counters and surfaces",
      text: "Move personal items off countertops, tables, and nightstands so surfaces are clear. The cleaner can work faster and more thoroughly when they don't have to move things around.",
    },
    {
      "@type": "HowToStep",
      name: "Put away valuables",
      text: "Secure jewelry, cash, medications, and anything irreplaceable before the team arrives. This is standard practice regardless of who you hire — it protects everyone.",
    },
    {
      "@type": "HowToStep",
      name: "Move clutter off floors",
      text: "Pick up clothes, toys, shoes, or anything on the floor in main rooms. Clear floors mean the team can fully vacuum and mop without stopping every few feet.",
    },
    {
      "@type": "HowToStep",
      name: "Handle pets",
      text: "Kennel your pet, put them in a separate room with a note on the door, or let us know at booking if your pet will be free in the home. This helps the team work without interruption and keeps your pet comfortable.",
    },
    {
      "@type": "HowToStep",
      name: "Leave a note about priorities",
      text: "If there's a specific area you want extra attention — a bathroom with grout buildup, a kitchen that got heavy use — leave a written note or specify it in the booking form. The team will prioritize accordingly.",
    },
    {
      "@type": "HowToStep",
      name: "Leave access information",
      text: "If you won't be home, leave door codes, lockbox details, or key instructions so the team can enter on schedule.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need to clean before the cleaner comes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Pre-cleaning defeats the purpose. Your job is to clear clutter so surfaces are accessible — the team handles the actual cleaning. Don't wipe counters, scrub the toilet, or mop floors before we arrive.",
      },
    },
    {
      "@type": "Question",
      name: "What if I'm not home during the cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That's fine and very common. Leave access instructions — a door code, lockbox, or key handoff — so the team can enter on schedule. You'll receive a completion notification when the clean is done.",
      },
    },
    {
      "@type": "Question",
      name: "Should I put away valuables?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, as a general best practice. Secure jewelry, cash, medications, and anything irreplaceable before any service appointment. This is standard regardless of the company — it protects both you and the cleaning team.",
      },
    },
    {
      "@type": "Question",
      name: "Can I stay home while they clean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many clients are home during their cleaning. Just let the team work around your schedule — they'll move room to room and signal when they need you to step aside briefly, if needed.",
      },
    },
    {
      "@type": "Question",
      name: "What if I have specific instructions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Note them in the booking form when you schedule, or leave a written note at the home. Specific requests communicated in advance get handled consistently — verbal instructions on the day of can get missed if there's a crew of multiple people.",
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
      name: "How to Prepare Your Home for a Cleaner",
      item: `${BASE_URL}/guides/how-to-prepare-home-for-cleaner`,
    },
  ],
};

export default function PrepareForCleanerPage() {
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
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-sm text-charcoal-40 flex-wrap">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/guides" className="hover:text-gold transition-colors">Guides</Link>
          <ChevronRight size={12} />
          <span className="text-charcoal">How to Prepare for a Cleaner</span>
        </nav>

        {/* Article header */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <header className="space-y-4 mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Client Guide</p>
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal leading-tight">
              How to Prepare Your Home for a Cleaner (5-Minute Checklist)
            </h1>
            <div className="flex items-center gap-4 text-sm text-charcoal-40">
              <span className="flex items-center gap-1.5"><Clock size={13} /> 5 min read</span>
              <span>Updated April 2026</span>
            </div>
            <p className="text-charcoal-70 text-lg leading-relaxed border-l-4 border-gold pl-4">
              Preparing for a cleaner takes about 5 minutes and makes a meaningful difference in the result. Focus on putting away personal items and clutter so surfaces are clear, secure pets in a comfortable space, and leave a note about any specific areas you want prioritized. You don&apos;t need to pre-clean — that&apos;s the cleaner&apos;s job.
            </p>
          </header>

          <div className="prose-charcoal space-y-8 text-charcoal-70 leading-relaxed">

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">The 5-minute checklist</h2>
              <p>
                Run through this before your cleaning team arrives. It&apos;s fast, and it meaningfully improves what they can accomplish:
              </p>
              <ol className="space-y-4 list-decimal list-outside pl-4">
                <li>
                  <p className="font-bold text-charcoal">Clear counters and surfaces.</p>
                  <p className="text-sm mt-1">Move personal items off kitchen counters, bathroom vanities, coffee tables, and nightstands. The cleaner can work faster and more thoroughly on a clear surface than one they have to navigate around.</p>
                </li>
                <li>
                  <p className="font-bold text-charcoal">Put away valuables.</p>
                  <p className="text-sm mt-1">Secure jewelry, cash, medications, and anything irreplaceable before the team arrives. Standard best practice before any home service appointment — protects everyone.</p>
                </li>
                <li>
                  <p className="font-bold text-charcoal">Move clutter off floors.</p>
                  <p className="text-sm mt-1">Pick up clothes, shoes, toys, bags, or anything sitting on the floor in main living areas. Clear floors let the team vacuum and mop the full area — not just the parts they can reach between obstacles.</p>
                </li>
                <li>
                  <p className="font-bold text-charcoal">Handle pets.</p>
                  <p className="text-sm mt-1">Kennel your dog or cat, put them in a spare room with a note on the door, or let us know at booking if your pet will be free-roaming. This keeps the team focused and your pet comfortable during the visit.</p>
                </li>
                <li>
                  <p className="font-bold text-charcoal">Leave a note about priorities.</p>
                  <p className="text-sm mt-1">Is there a bathroom with grout buildup that always gets skipped? A kitchen that was especially used hard this week? Leave a sticky note or add it to the booking form. The team will prioritize accordingly.</p>
                </li>
                <li>
                  <p className="font-bold text-charcoal">Set up access if you won&apos;t be home.</p>
                  <p className="text-sm mt-1">Leave a door code, lockbox location, or key handoff plan so the team can start on time without waiting on you.</p>
                </li>
              </ol>
              <p className="text-sm bg-cream-100 border border-charcoal/10 rounded-xl px-4 py-3">
                <strong className="text-charcoal">That&apos;s it.</strong> The rest is our job. You don&apos;t need to wipe anything down, scrub the toilet, or vacuum before we arrive.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">What NOT to do</h2>
              <p>
                A few things clients do that actually work against them:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-charcoal mb-1">Don&apos;t pre-clean surfaces.</h3>
                  <p className="text-sm">
                    We regularly see clients who wipe down counters, scrub the toilet, or mop floors before we arrive. That&apos;s wasted effort — it&apos;s our job. Use those minutes to declutter instead, which actually helps us do better work.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-1">Don&apos;t stash things in unusual places to &ldquo;get them out of the way.&rdquo;</h3>
                  <p className="text-sm">
                    Moving things to odd spots — stacking dishes in the bedroom, pushing piles into corners — makes the cleaning harder, not easier. Surface clutter is fine to leave on counters. The team is used to it.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-1">Don&apos;t micromanage the team.</h3>
                  <p className="text-sm">
                    If you&apos;re home, let the team work. Standing in a room while they clean or following them from room to room interrupts the flow. If you have specific requests, communicate them at the start — then step back. If something isn&apos;t right when the clean is done, let us know and we&apos;ll address it.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">How to handle pets</h2>
              <p>
                Most of our clients have pets — it&apos;s not a problem. But planning ahead makes the visit go more smoothly for everyone.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-charcoal text-sm">Dogs:</p>
                  <p className="text-sm">Kennel or crate during the clean if possible, or confine to a room the team isn&apos;t actively working in. If your dog is well-behaved and won&apos;t follow the team around, free-roaming is fine — just let us know at booking.</p>
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">Cats:</p>
                  <p className="text-sm">Most cats manage themselves during a cleaning. If your cat is skittish around strangers, a closed spare room with food and water keeps them comfortable and out of the way.</p>
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">Other pets:</p>
                  <p className="text-sm">If you have birds, reptiles, or other pets that are sensitive to cleaning products or noise, note it at booking. We can adjust products used near those areas and sequence rooms accordingly.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">What to leave out for special requests</h2>
              <p>
                If you have a preference for specific cleaning products — unscented, fragrance-free, or products you supply yourself — leave them out with a note. Our team arrives with professional-grade cleaning supplies, but if you&apos;d prefer we use yours, that&apos;s not a problem.
              </p>
              <p>
                If there are fragile items in the home — antiques, collectibles, artwork — point them out before the team starts, or leave a note identifying them. The team is careful, but knowing where the fragile things are lets them be specifically attentive in those spots.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">Payment and tipping</h2>
              <p>
                Payment is due at completion of the cleaning. We accept credit cards, debit cards, and Zelle. No cash is required.
              </p>
              <p>
                Tipping is not required, but it&apos;s always appreciated. The team works hard, and tips go directly to the cleaners. Common amounts range from $5–$20 per visit. Cash left at the home works, or you can mention it when arranging payment at the end.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">What to expect after</h2>
              <p>
                The team arrives within a scheduled window — typically a 1–2 hour arrival window, not an exact time. Cleaning takes 2–5 hours depending on home size and scope.
              </p>
              <p>
                When finished, the team will do a quick walkthrough to confirm everything&apos;s been covered. If something was missed or didn&apos;t meet standard, we address it before we leave. If you notice something after we&apos;ve gone, contact us within 24 hours and we&apos;ll make it right.
              </p>
              <p>
                &ldquo;Done&rdquo; means surfaces are clean, floors are vacuumed and mopped, bathrooms are scrubbed, and the home smells fresh. You shouldn&apos;t need to spot-check behind us — but if you do, we want to know.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal">Frequently asked questions</h2>
              <div className="space-y-5">
                {[
                  {
                    q: "Do I need to clean before the cleaner comes?",
                    a: "No. Pre-cleaning defeats the purpose. Your job is to clear clutter so surfaces are accessible — the team handles the actual cleaning. Don't wipe counters, scrub the toilet, or mop floors before we arrive.",
                  },
                  {
                    q: "What if I'm not home during the cleaning?",
                    a: "That's fine and very common. Leave access instructions — a door code, lockbox, or key handoff — so the team can enter on schedule. You'll receive a notification when the clean is done.",
                  },
                  {
                    q: "Should I put away valuables?",
                    a: "Yes, as a general best practice. Secure jewelry, cash, medications, and anything irreplaceable before any service appointment. This is standard regardless of the company — it protects both you and the cleaning team.",
                  },
                  {
                    q: "Can I stay home while they clean?",
                    a: "Yes. Many clients are home. Just let the team work — they'll move room to room and the clean goes faster when they can flow without interruption.",
                  },
                  {
                    q: "What if I have specific instructions?",
                    a: "Note them in the booking form when you schedule, or leave a written note at the home before the team arrives. Specific requests communicated in advance get handled consistently across the whole crew.",
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
              <p className="font-bold text-charcoal">Ready to book?</p>
              <p className="text-sm">
                Submit the booking form with your home details. We return a firm quote within 24 hours — no payment until the cleaning is done and you&apos;re satisfied.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center bg-gold text-charcoal font-semibold px-5 py-2.5 rounded-full hover:bg-gold-dark transition-colors text-sm"
                >
                  Book a Cleaning
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
                href="/guides/how-much-does-house-cleaning-cost-nj"
                className="group bg-cream rounded-xl border border-charcoal/10 p-4 hover:border-gold/30 transition-all space-y-1"
              >
                <p className="font-semibold text-charcoal text-sm group-hover:text-gold transition-colors">
                  How Much Does House Cleaning Cost in NJ?
                </p>
                <p className="text-xs text-charcoal-40">6 min read</p>
              </Link>
              <Link
                href="/guides/what-to-expect-move-out-cleaning"
                className="group bg-cream rounded-xl border border-charcoal/10 p-4 hover:border-gold/30 transition-all space-y-1"
              >
                <p className="font-semibold text-charcoal text-sm group-hover:text-gold transition-colors">
                  What to Expect from a Move-Out Cleaning
                </p>
                <p className="text-xs text-charcoal-40">7 min read</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
