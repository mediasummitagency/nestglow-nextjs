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
    <section className="bg-cream-50 py-16 border-t border-charcoal/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-2 text-center">
          Towns We Serve
        </h2>
        <p className="text-center text-charcoal-70 mb-10">
          House cleaning across Monmouth, Ocean, and Middlesex County, NJ
        </p>

        {/* County tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {COUNTIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setActive(c.value)}
              className={
                active === c.value
                  ? "px-5 py-2 rounded-full text-sm font-semibold bg-charcoal text-white"
                  : "px-5 py-2 rounded-full text-sm font-semibold border border-charcoal/20 text-charcoal hover:bg-charcoal/5 transition-colors"
              }
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Fixed-height area: grid + view all button */}
        <div className="flex flex-col min-h-[160px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-4">
            {towns.map((town) => (
              <Link
                key={town.slug}
                href={`/cleaning-services/${town.slug}`}
                className="text-sm text-charcoal-70 hover:text-brand transition-colors"
              >
                {town.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8 text-center">
            <Link
              href={activeCounty.href}
              className="text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              View all in {activeCounty.label} County →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
