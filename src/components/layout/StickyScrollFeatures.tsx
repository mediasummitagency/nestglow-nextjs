'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'

export type ScrollFeature = {
  badge: string
  headline: string
  subhead: string
  body: string
  visual: ReactNode
}

// Scroll track height per feature (vh). Total section = features.length × this.
const PANEL_VH = 80

export function StickyScrollFeatures({
  features,
  eyebrow,
  headline,
  subline,
}: {
  features: ScrollFeature[]
  eyebrow?: string
  headline?: string
  subline?: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return

      const { top, height } = el.getBoundingClientRect()
      const scrolled = -top
      const scrollable = height - window.innerHeight
      if (scrollable <= 0) return

      // Raw progress 0 → 1 across the full section
      const raw = Math.max(0, Math.min(1, scrolled / scrollable))

      // Cards complete their travel in the first 100% of scroll — hold on last card at end
      const cardProgress = Math.min(raw, 1) * (features.length - 1)

      // Move each card: offset of 0 = centred in view, 1 = one card-height below, -1 = above
      features.forEach((_, i) => {
        const card = cardRefs.current[i]
        if (card) card.style.transform = `translateY(${(i - cardProgress) * 100}%)`
      })

      // Update text index based on which card is nearest centre
      setActiveIndex(Math.min(features.length - 1, Math.round(cardProgress)))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [features.length])

  return (
    <section className="border-t border-charcoal/5">
      {(eyebrow || headline || subline) && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-2 text-center space-y-3">
          {eyebrow && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand/10 text-brand-dark text-xs font-bold tracking-widest uppercase">
              {eyebrow}
            </span>
          )}
          {headline && (
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal leading-tight">
              {headline}
            </h2>
          )}
          {subline && (
            <p className="text-base text-charcoal-70 max-w-xl mx-auto">
              {subline}
            </p>
          )}
        </div>
      )}
      {/* Mobile: stacked */}
      <div className="md:hidden bg-white px-4 sm:px-6 py-12 space-y-12">
        {features.map((f, i) => (
          <div key={i} className="space-y-6">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand/10 text-brand-dark text-xs font-bold tracking-widest uppercase mb-5">
                {f.badge}
              </span>
              <h2 className="text-2xl font-bold text-charcoal mb-2 leading-tight">{f.headline}</h2>
              <p className="text-base text-charcoal-40 mb-4">{f.subhead}</p>
              <p className="text-base text-charcoal-70 leading-relaxed">{f.body}</p>
            </div>
            <div>{f.visual}</div>
          </div>
        ))}
      </div>

      {/* Desktop: scroll-driven sticky section */}
      <div
        ref={sectionRef}
        className="hidden md:block bg-white"
        style={{ height: `${features.length * PANEL_VH}vh` }}
      >
        <div className="sticky top-[72px] h-[calc(100vh-72px)]">
          <div className="h-full max-w-5xl mx-auto px-6 grid grid-cols-2 gap-16">
            {/* Left: text cross-fades in place */}
            <div className="flex items-start pt-[35vh] pr-4">
              <div className="relative w-full min-h-[360px]">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      i === activeIndex
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                  >
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand/10 text-brand-dark text-xs font-bold tracking-widest uppercase mb-5 block w-fit">
                      {f.badge}
                    </span>
                    <h2 className="text-3xl font-bold text-charcoal mb-3 leading-tight">{f.headline}</h2>
                    <p className="text-base text-charcoal-40 mb-6">{f.subhead}</p>
                    <p className="text-base text-charcoal-70 leading-relaxed">{f.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: cards scroll physically (translateY driven by scroll progress) */}
            <div className="relative overflow-hidden flex items-center">
              {features.map((f, i) => (
                <div
                  key={i}
                  ref={el => { cardRefs.current[i] = el }}
                  className="absolute inset-0 flex items-start pt-[35vh]"
                  style={{ transform: `translateY(${i * 100}%)` }}
                >
                  {f.visual}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
