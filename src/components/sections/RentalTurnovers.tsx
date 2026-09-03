import Image from "next/image";
import { CalendarClock, BedDouble, Camera } from "lucide-react";
import { PrimaryCta } from "@/components/ui/PrimaryCta";

/**
 * The short-term rental block on the home page. Added 2026-09-02 off the first
 * SEO pull (`projects/summit-media/clients/nestglow/seo/baseline-2026-09-02.md`
 * §4 and §6): `airbnb cleaning service` is 2,400/mo at difficulty 0, none of the
 * 20 map-pack competitors positions for it, and it is Caroline's second real
 * service — yet until now it only existed as a service card and half a tagline.
 *
 * Written for the OWNER, not the cleaner. Half of the query space around
 * "airbnb cleaning" is people looking for cleaning jobs (Turno, "airbnb
 * cleaning jobs"), so nothing here reads like a recruiting page: no "join",
 * no "hosts pay", no rates per turnover. The CTA sends the owner to the
 * contact form with the turnover service pre-selected.
 *
 * Claims stay inside what the `Airbnb & Rental Turnovers` card in
 * `lib/services.ts` already promises (linen handling, restocking, photo check,
 * same-day in season) — that copy was signed off 2026-08-22. Laundry is
 * deliberately not promised: the parked service page said linens are remade
 * with what the host provides, and nothing has changed that.
 */
const points = [
  {
    icon: CalendarClock,
    title: "Same-day turnovers",
    body:
      "Checkout at 10, check-in at 4? That window is what we plan around. Same-day resets run through the summer season, and a standing turnover day is held for you week to week.",
  },
  {
    icon: BedDouble,
    title: "Linens, restock, reset",
    body:
      "Beds stripped and remade with the linens you provide, towels replaced, kitchen and baths reset, bins out. We run your restock list and flag anything running low before a guest notices.",
  },
  {
    icon: Camera,
    title: "A photo check before we leave",
    body:
      "Every turnover ends with a walk-through and photos sent to you, so you know the place is guest-ready without driving over to look.",
  },
];

export function RentalTurnovers() {
  return (
    <section id="airbnb" className="scroll-mt-24 bg-cream-50 py-16 md:py-20 border-t border-charcoal/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section title, centred like "How it works" and "Towns We Serve".
            The turnover line below is the column heading, not the section's. */}
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal text-center mb-3">
          Airbnb &amp; Short-Term Rentals
        </h2>
        <p className="text-center text-charcoal-70 mb-12">
          Between-guest turnovers for Shore rentals, on your booking calendar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-charcoal/10 bg-cream-100">
            <Image
              src="/images/services/airbnb-cleaning/hero.jpg"
              alt="A short-term rental living room reset and ready for the next guest"
              fill
              className="object-cover object-center"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-charcoal leading-tight mb-4">
              Turnovers that are ready before the next guest is.
            </h3>
            <p className="text-charcoal-70 leading-relaxed mb-8">
              Renting on the Shore means the clock starts the minute a guest checks out. NestGlow does
              between-guest turnovers for Airbnb, VRBO and privately rented homes across Monmouth and
              Ocean County, on a schedule that follows your booking calendar, not ours.
            </p>

            <ul className="space-y-5">
              {points.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-charcoal/10 text-brand-dark">
                      <Icon size={18} />
                    </span>
                    <div>
                      <h4 className="font-semibold text-brand-dark mb-1">{p.title}</h4>
                      <p className="text-sm text-charcoal-70 leading-relaxed">{p.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* CTA sits under the whole block, centred, the way WhyNestGlow and
            How-it-works end — not tucked under one column. */}
        <div className="mt-12 text-center">
          <PrimaryCta
            label="Set up turnover cleaning"
            href="/contact?service=airbnb"
            className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
          />
          <p className="mt-4 text-sm text-charcoal-70">
            We also do the pre-season reset and the end-of-season deep clean.
          </p>
        </div>

      </div>
    </section>
  );
}
