'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'

export type StickyFeature = {
  title: string
  subtitle: string
  body: ReactNode
  visual: ReactNode
}

export function StickyFeatureSection({ features }: { features: StickyFeature[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, i) => {
      if (!ref) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i)
          } else if (entry.boundingClientRect.top > 0) {
            // Section exited downward (scrolling up) — revert to previous
            setActiveIndex(Math.max(0, i - 1))
          }
        },
        { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
      )
      observer.observe(ref)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 bg-charcoal">
      {/* Left: scrollable text */}
      <div>
        {features.map((f, i) => (
          <div
            key={i}
            ref={el => { itemRefs.current[i] = el }}
            className="min-h-[55vh] flex flex-col justify-center items-center text-center px-8 sm:px-16 py-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-cream mb-4 leading-tight">
              {f.title}
            </h2>
            <p className="text-lg text-cream/60 mb-10 max-w-sm leading-relaxed">{f.subtitle}</p>
            <div className="w-full max-w-sm text-left">{f.body}</div>
          </div>
        ))}
      </div>

      {/* Right: sticky visual */}
      <div className="hidden md:flex items-start">
        <div className="sticky top-[72px] w-full h-[55vh] flex items-center justify-center px-8">
          <div className="relative w-full max-w-md min-h-[380px]">
            {features.map((f, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  i === activeIndex
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6 pointer-events-none'
                }`}
              >
                {f.visual}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
