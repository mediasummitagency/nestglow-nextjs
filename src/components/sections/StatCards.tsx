"use client"

import { useEffect, useRef, useState } from "react"

type Stat = {
  value: string   // e.g. "10+", "500+", "5.0", "100%"
  label: string
}

function parseValue(raw: string): { target: number; suffix: string; decimals: number } {
  const suffix = raw.replace(/[\d.]/g, "")          // "+", "%", ""
  const numeric = parseFloat(raw.replace(/[^0-9.]/g, ""))
  const decimals = raw.includes(".") ? raw.split(".")[1].replace(/\D/g, "").length : 0
  return { target: numeric, suffix, decimals }
}

export function AnimatedStat({ value, label, dark }: Stat & { dark?: boolean }) {
  const { target, suffix, decimals } = parseValue(value)
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const duration = 1400
    const start = performance.now()
    const raf = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)   // ease-out cubic
      setDisplay(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [started, target, decimals])

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2 rounded-2xl px-6 py-5 text-center"
      style={dark ? {
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.25)",
      } : {
        background: "#ffffff",
        border: "1px solid rgba(26,31,54,0.08)",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
      }}
    >
      <p className="text-3xl md:text-4xl font-bold text-brand tabular-nums">
        {display.toFixed(decimals)}{suffix}
      </p>
      <p className={`text-sm font-medium ${dark ? "text-white/70" : "text-charcoal-70"}`}>{label}</p>
    </div>
  )
}

export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-cream-50 py-10 border-t border-b border-charcoal/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <AnimatedStat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
