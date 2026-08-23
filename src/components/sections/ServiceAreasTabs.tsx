"use client"

import { useState } from "react"

/**
 * Towns we serve, by county.
 *
 * This list used to be derived from `src/lib/towns.ts`, which also carried the
 * per-town page content. That file is parked with the town pages for phase 2,
 * so the names live here instead — the section is now a plain statement of
 * coverage rather than a link grid. Manalapan sits under Monmouth, which is
 * where it actually is; the parked town data had it filed under Middlesex.
 *
 * When the town pages come back, swap these arrays for `getTownsByCounty()`
 * and make each name a link again.
 *
 * ── EVERY COUNTY'S TOWNS ARE IN THE HTML, ALWAYS (2026-08-23) ────────────
 * This used to render only the ACTIVE county — `towns.map()` over one array —
 * so 11 of the 22 town names existed nowhere in the served markup until a human
 * clicked a tab. Crawlers do not click tabs, so Ocean and Middlesex, two of the
 * three counties this business serves, were invisible to local search. Verified
 * against the built HTML: 10/10 Monmouth present, 0/6 Ocean, 0/5 Middlesex.
 *
 * All three panels now render and the inactive ones carry the `hidden`
 * attribute. Google indexes content hidden behind tabs; it cannot index content
 * that was never emitted. Do not go back to conditionally rendering one panel.
 */
const COUNTIES = [
  {
    label: "Monmouth",
    value: "Monmouth" as const,
    towns: [
      "Asbury Park", "Bradley Beach", "Colts Neck", "Freehold", "Holmdel",
      "Manalapan", "Marlboro", "Middletown", "Neptune", "Neptune City", "Red Bank",
    ],
  },
  {
    label: "Ocean",
    value: "Ocean" as const,
    towns: [
      "Berkeley Township", "Brick", "Jackson", "Lacey Township",
      "Point Pleasant", "Toms River",
    ],
  },
  {
    label: "Middlesex",
    value: "Middlesex" as const,
    towns: [
      "East Brunswick", "Edison", "Old Bridge", "Sayreville", "Woodbridge",
    ],
  },
]

export function ServiceAreasTabs() {
  const [active, setActive] = useState<"Monmouth" | "Ocean" | "Middlesex">("Monmouth")

  return (
    <section id="areas" className="scroll-mt-24 bg-cream-50 py-[4.6rem] border-t border-charcoal/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-3 text-center">
          Towns We Serve
        </h2>
        <p className="text-[1.15rem] text-center text-charcoal-70 mb-12">
          House cleaning across Monmouth, Ocean, and Middlesex County, NJ
        </p>

        {/* County tabs */}
        <div className="flex gap-2 justify-center mb-8" role="tablist" aria-label="Counties served">
          {COUNTIES.map((c) => (
            <button
              key={c.value}
              id={`county-tab-${c.value}`}
              role="tab"
              aria-selected={active === c.value}
              aria-controls={`county-panel-${c.value}`}
              onClick={() => setActive(c.value)}
              className={
                active === c.value
                  ? "px-6 py-[9px] rounded-full text-[1rem] font-semibold bg-charcoal text-white"
                  : "px-6 py-[9px] rounded-full text-[1rem] font-semibold border border-charcoal/20 text-charcoal hover:bg-charcoal/5 transition-colors"
              }
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col min-h-[160px]">
          {/* One panel per county, ALL of them in the markup. The inactive ones
              are `hidden` rather than absent — see the note at the top of this
              file. */}
          {COUNTIES.map((c) => (
            <div
              key={c.value}
              id={`county-panel-${c.value}`}
              role="tabpanel"
              aria-labelledby={`county-tab-${c.value}`}
              hidden={active !== c.value}
              // The `hidden` ATTRIBUTE alone is not enough here: it works via
              // the UA rule `[hidden] { display: none }`, which any class
              // setting `display` outranks — so a bare `grid` class would leave
              // all three panels visible at once. The class is swapped instead,
              // and the attribute is kept for the accessibility tree.
              className={
                active === c.value
                  ? "grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-3 max-w-[780px] mx-auto"
                  : "hidden"
              }
            >
              {[...c.towns]
                .sort((a, b) => a.localeCompare(b))
                .map((town) => (
                  <span key={town} className="text-center text-[1rem] text-charcoal-70">
                    {town}
                  </span>
                ))}
            </div>
          ))}

          <div className="mt-auto pt-8 text-center">
            {/* `text-balance` spreads this over two even lines on a phone
                instead of orphaning the last word on its own. The em dash it
                used to carry is gone per the house copy rule — periods, not
                dashes, as sentence connectors in client-facing copy. */}
            <p className="mx-auto max-w-md text-balance text-[1rem] text-charcoal-70">
              Don&apos;t see your town?{" "}
              <a
                href="/contact"
                className="font-semibold text-brand hover:text-brand-dark transition-colors"
              >
                Ask us
              </a>
              . We may still cover you.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
