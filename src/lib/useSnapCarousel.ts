"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Shared plumbing for the phone carousels (`ServicesCarousel`, `WhyNestGlow`).
 *
 * The carousel itself is native CSS scroll-snap — this hook only reports which
 * slide is showing and moves to a given one. Deliberately no drag handlers: a
 * scroll container already swipes on touch, and hand-rolled pointer maths is
 * what usually breaks momentum, rubber-banding and two-finger scrolling.
 *
 * Position is read from the DOM rather than tracked in state, so a finger swipe
 * and an arrow tap end up at the same source of truth.
 */
export function useSnapCarousel(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;
    // Nearest slide by left edge. Measuring each child rather than assuming a
    // fixed stride keeps this correct when the slides are percentage-width and
    // the gap comes from CSS.
    let nearest = 0;
    let best = Infinity;
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i] as HTMLElement;
      const delta = Math.abs(child.offsetLeft - el.offsetLeft - el.scrollLeft);
      if (delta < best) {
        best = delta;
        nearest = i;
      }
    }
    setActive(nearest);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    // Desktop breakpoints render these tracks as a plain grid, where scrollLeft
    // never moves; sync just resolves to 0 and the indicators are hidden anyway.
    sync();
    return () => el.removeEventListener("scroll", sync);
  }, [sync, count]);

  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    if (!el || !slide) return;
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  return { trackRef, active, goTo };
}
