"use client";

import { type Review, reviews } from "@/lib/reviews";
import { useSnapCarousel } from "@/lib/useSnapCarousel";

interface TestimonialsProps {
  currentTown?: string;
  currentCounty?: string;
}

function relevanceScore(r: Review, currentTown?: string, currentCounty?: string): number {
  if (currentTown && r.town === currentTown) return 2;
  if (currentCounty && r.county === currentCounty) return 1;
  return 0;
}

/**
 * The five reviews.
 *
 * Phone: a swipeable carousel, matching `ServicesCarousel` and the phone view of
 * `WhyNestGlow` — same `useSnapCarousel` hook, same slide width, same dots.
 *
 * It replaces a "Show more reviews" button that hid reviews 4 and 5 behind a tap
 * (2026-08-23). Two problems with that: the two most locally-relevant reviews
 * are sorted to the FRONT, so the hidden ones were the weakest anyway, and a
 * tap-to-expand pushed the whole rest of the page down. Swiping costs nothing
 * and keeps the section one screen tall regardless of how many reviews exist.
 *
 * Tablet and up: the existing grid, untouched — 3 across, then 5 across on large
 * screens. No swipe affordance on a mouse.
 *
 * Native scroll-snap on purpose — no carousel library, no drag handlers. It
 * keeps the momentum, rubber-banding and accessibility behaviour iOS gives for
 * free and that hand-rolled drag code usually breaks.
 */
export function Testimonials({ currentTown, currentCounty }: TestimonialsProps) {
  const sorted = [...reviews].sort(
    (a, b) =>
      relevanceScore(b, currentTown, currentCounty) -
      relevanceScore(a, currentTown, currentCounty)
  );

  const { trackRef, active, goTo } = useSnapCarousel(sorted.length);

  return (
    <section className="py-16 bg-white border-t border-charcoal/10">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">

        {/* Centered header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-3">
            What our clients say.
          </h2>
          <p className="text-charcoal-70 max-w-2xl mx-auto">
            Real reviews from homeowners across Monmouth, Ocean, and Middlesex County.
          </p>
        </div>

        {/* Phone: snap row, next card peeking so the swipe needs no instruction.
            The negative margin matches the container's own px-6 so the track
            bleeds to the screen edge while the first card stays aligned with the
            heading above it. */}
        <div
          ref={trackRef}
          className="
            no-scrollbar -mx-6 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto scroll-smooth px-6 pb-2
            sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5
          "
        >
          {sorted.map((t) => (
            <blockquote
              key={t.name}
              className="
                flex w-[82%] shrink-0 snap-center flex-col rounded-2xl border-2 border-charcoal/20 bg-white p-7 shadow-md
                sm:w-auto sm:shrink
              "
            >
              <div className="flex gap-1.5 mb-6">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-charcoal text-sm leading-none">●</span>
                ))}
              </div>
              <p className="text-base text-charcoal-70 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <hr className="my-6 border-charcoal/10" />
              <footer>
                <p className="text-base font-semibold text-charcoal">{t.name}</p>
                <p className="text-sm text-charcoal-40 mt-0.5">{t.location}</p>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Dots: phone only. They double as the affordance that says "there is
            more to the right" before anyone has swiped. */}
        <div className="mt-5 flex justify-center gap-2 sm:hidden">
          {sorted.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Show the review from ${t.name}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={
                i === active
                  ? "h-2 w-6 rounded-full bg-brand transition-all"
                  : "h-2 w-2 rounded-full bg-charcoal/25 transition-all"
              }
            />
          ))}
        </div>

      </div>
    </section>
  );
}
