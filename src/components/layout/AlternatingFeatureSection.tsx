import { ReactNode } from 'react'

type AltFeature = {
  badge: string
  title: string
  subtitle: string
  body: ReactNode
  visual: ReactNode
}

export function AlternatingFeatureSection({ features }: { features: AltFeature[] }) {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-charcoal/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-20 md:space-y-28">
        {features.map((f, i) => {
          const isEven = i % 2 === 0
          return (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
            >
              {/* Copy block — swaps order on desktop for odd blocks */}
              <div className={isEven ? '' : 'md:order-2'}>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand/10 text-brand-dark text-xs font-bold tracking-widest uppercase mb-5">
                  {f.badge}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-2 leading-tight">
                  {f.title}
                </h2>
                <p className="text-base text-charcoal-40 mb-6">{f.subtitle}</p>
                <div className="text-base text-charcoal-70 leading-relaxed">{f.body}</div>
              </div>

              {/* Visual block */}
              <div className={isEven ? '' : 'md:order-1'}>
                {f.visual}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
