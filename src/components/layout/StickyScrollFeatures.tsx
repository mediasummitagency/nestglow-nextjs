'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import Image from 'next/image'

export type ScrollFeature = {
  badge: string
  headline: string
  subhead: string
  body: string
  visual: ReactNode
  bgImage: string
}

// Scroll track height per feature (vh).
const PANEL_VH = 85
// Extra vh of scroll before card animation begins — gives the section time to settle centred.
const LEAD_IN_VH = 5

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

      // Pixels of scroll consumed by the lead-in before animation starts
      const leadInPx = (LEAD_IN_VH / 100) * window.innerHeight
      // Remaining pixels available for the card animation
      const animPx = scrollable - leadInPx

      const cardProgress = animPx > 0
        ? Math.max(0, Math.min(features.length - 1, ((scrolled - leadInPx) / animPx) * (features.length - 1)))
        : 0

      // Move each card: offset of 0 = centred in view, 1 = one card-height below, -1 = above
      features.forEach((_, i) => {
        const card = cardRefs.current[i]
        if (card) card.style.transform = `translateY(${(i - cardProgress) * 220}%)`
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
      {/* Mobile: stacked */}
      <div className="md:hidden">
        {features.map((f, i) => (
          <div key={i} className="relative overflow-hidden">
            <Image
              src={f.bgImage}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/75" />
            <div className="relative z-10 px-4 sm:px-6 py-14 space-y-6">
              {/* Section header only on first panel */}
              {i === 0 && (eyebrow || headline || subline) && (
                <div className="text-center space-y-2 mb-8">
                  {eyebrow && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand/30 text-brand text-xs font-bold tracking-widest uppercase">
                      {eyebrow}
                    </span>
                  )}
                  {headline && (
                    <h2 className="text-2xl font-bold text-white leading-tight">{headline}</h2>
                  )}
                  {subline && (
                    <p className="text-sm text-white/70 max-w-xs mx-auto">{subline}</p>
                  )}
                </div>
              )}
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand/30 text-brand text-xs font-bold tracking-widest uppercase mb-5">
                  {f.badge}
                </span>
                <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{f.headline}</h2>
                <p className="text-base text-white/80 mb-4">{f.subhead}</p>
                <p className="text-base text-white leading-relaxed">{f.body}</p>
              </div>
              <div>{f.visual}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: scroll-driven sticky section */}
      <div
        ref={sectionRef}
        className="hidden md:block"
        style={{ height: `${features.length * PANEL_VH + LEAD_IN_VH}vh` }}
      >
        <div className="sticky top-0 h-screen relative overflow-hidden">
          {/* Background images — crossfade with active panel */}
          {features.map((f, i) => (
            <div
              key={`bg-${i}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                i === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={f.bgImage}
                alt=""
                fill
                quality={90}
                className="object-cover object-center"
                sizes="100vw"
                priority={i === 0}
              />
            </div>
          ))}
          {/* Dark overlay — left-biased so text column has more contrast */}
          <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.40) 100%)" }} />

          {/* Content */}
          <div className="relative z-20 h-full px-[17%] flex flex-col">
            {/* Section header — inside the first photo */}
            {(eyebrow || headline || subline) && (
              <div className="text-center pt-10 pb-2 space-y-2 shrink-0">
                {eyebrow && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand/30 text-brand text-xs font-bold tracking-widest uppercase">
                    {eyebrow}
                  </span>
                )}
                {headline && (
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    {headline}
                  </h2>
                )}
                {subline && (
                  <p className="text-base text-white/70 max-w-xl mx-auto">
                    {subline}
                  </p>
                )}
              </div>
            )}

            {/* 2-col scroll content — text pushed left, card pushed right */}
            <div className="flex-1 flex items-center justify-between gap-8">
              {/* Left: text cross-fades in place */}
              <div className="w-[42%] max-w-[560px] shrink-0">
                <div className="relative w-full min-h-[420px]">
                  {features.map((f, i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                        i === activeIndex
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-4 pointer-events-none'
                      }`}
                    >
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand/30 text-brand text-xs font-bold tracking-widest uppercase mb-5 block w-fit">
                        {f.badge}
                      </span>
                      <h2 className="text-4xl font-bold text-white mb-3 leading-tight">{f.headline}</h2>
                      <p className="text-lg text-white/80 mb-6">{f.subhead}</p>
                      <p className="text-lg text-white leading-relaxed">{f.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: cards scroll physically (translateY driven by scroll progress) */}
              <div className="relative overflow-hidden shrink-0 w-[46%] max-w-[560px] h-[480px]">
                {features.map((f, i) => (
                  <div
                    key={i}
                    ref={el => { cardRefs.current[i] = el }}
                    className="absolute inset-4"
                    style={{ transform: `translateY(${i * 220}%)` }}
                  >
                    {f.visual}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
