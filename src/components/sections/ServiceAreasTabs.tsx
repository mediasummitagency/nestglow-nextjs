"use client"

import { useState } from "react"
import Link from "next/link"
import { getTownsByCounty } from "@/lib/towns"

const COUNTIES = [
  {
    label: "Monmouth",
    value: "Monmouth" as const,
    href: "/cleaning-services/monmouth-county",
  },
  {
    label: "Ocean",
    value: "Ocean" as const,
    href: "/cleaning-services/ocean-county",
  },
  {
    label: "Middlesex",
    value: "Middlesex" as const,
    href: "/cleaning-services/middlesex-county",
  },
]

export function ServiceAreasTabs() {
  const [active, setActive] = useState<"Monmouth" | "Ocean" | "Middlesex">("Monmouth")

  const activeCounty = COUNTIES.find((c) => c.value === active)!
  const towns = getTownsByCounty(active).sort((a, b) => a.name.localeCompare(b.name))

  return (
    <section className="bg-cream-50 py-[4.6rem] border-t border-charcoal/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-3 text-center">
          Towns We Serve
        </h2>
        <p className="text-[1.15rem] text-center text-charcoal-70 mb-12">
          House cleaning across Monmouth, Ocean, and Middlesex County, NJ
        </p>

        {/* County tabs */}
        <div className="flex gap-2 justify-center mb-8">
          {COUNTIES.map((c) => (
            <button
              key={c.value}
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

        {/* Fixed-height area: town list + view all button */}
        <div className="flex flex-col min-h-[160px]">
          {/*
            flex-wrap + justify-center: every row (including the partial last row)
            is centered. max-w-[680px] caps at 4 items per row (4×144px + 3×32px gap = 672px).
          */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-3 max-w-[780px] mx-auto">
            {towns.map((town) => (
              <Link
                key={town.slug}
                href={`/cleaning-services/${town.slug}`}
                className="text-center text-[1rem] text-charcoal-70 hover:text-brand transition-colors"
              >
                {town.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8 text-center">
            <Link
              href={activeCounty.href}
              className="text-[1rem] font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              View all in {activeCounty.label} County →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
