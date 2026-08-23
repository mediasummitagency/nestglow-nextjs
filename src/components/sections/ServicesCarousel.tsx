"use client";

import { services } from "@/lib/services";
import { useSnapCarousel } from "@/lib/useSnapCarousel";

/**
 * The four service cards.
 *
 * Phone: a swipeable carousel. Stacked full-width cards made this section about
 * four screens tall on a 393px viewport, which is a long scroll past copy most
 * visitors only need one card of. Cards now sit in a scroll-snap row with the
 * next one peeking, so the swipe is discoverable without an instruction.
 *
 * Tablet and up: the plain 2-up grid. No swipe affordance on a mouse, and four
 * cards fit on screen at once anyway.
 *
 * Native scroll-snap on purpose — no carousel library, no drag handlers. It
 * keeps momentum, rubber-banding and accessibility behaviour that iOS gives for
 * free and that hand-rolled drag code usually breaks.
 */
export function ServicesCarousel() {
  const { trackRef, active, goTo } = useSnapCarousel(services.length);

  return (
    <>
      <div
        ref={trackRef}
        className="
          no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2
          sm:mx-auto sm:grid sm:max-w-5xl sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0
        "
      >
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <article
              key={svc.title}
              className="
                w-[82%] shrink-0 snap-center space-y-3 rounded-2xl border border-charcoal/10 bg-cream p-6 shadow
                sm:w-auto sm:shrink
              "
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20">
                <Icon size={18} className="text-brand-dark" />
              </div>
              <h3 className="text-lg font-bold text-charcoal">{svc.title}</h3>
              <p className="text-sm font-medium leading-relaxed text-charcoal">{svc.copy}</p>
              <p className="text-sm leading-relaxed text-charcoal-70">{svc.detail}</p>
            </article>
          );
        })}
      </div>

      {/* Dots: phone only. They double as the affordance that says "there is more
          to the right" before anyone has swiped. */}
      <div className="mt-5 flex justify-center gap-2 sm:hidden">
        {services.map((svc, i) => (
          <button
            key={svc.title}
            type="button"
            aria-label={`Show ${svc.title}`}
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
    </>
  );
}
