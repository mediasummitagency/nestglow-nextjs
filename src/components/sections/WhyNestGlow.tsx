"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const rows = [
  {
    image: "/images/home/why-owner.png",
    alt: "NestGlow Co owner at a client's door",
    heading: "A name and a face, not a queue",
    body: "With NestGlow, when you have a question or need to move a date, a real local person picks up. You're talking to the owner, not typing into an app's chat window or waiting on a national support line. We're based right here in Monmouth, Ocean, and Middlesex County, and we answer to our neighbors.",
    imageLeft: true,
  },
  {
    image: "/images/home/why-team.png",
    alt: "NestGlow Co cleaning team arriving at a home",
    heading: "The same hands, every visit",
    body: "Booking apps send whoever's available, a different stranger in your home each time, re-learning where everything goes and what matters to you. NestGlow sends a consistent team that already knows your home, your preferences, and how you like things left. You shouldn't have to give the tour twice.",
    imageLeft: false,
  },
  {
    image: "/images/home/why-guarantee.png",
    alt: "A freshly cleaned, spotless living room",
    heading: "If it's not right, that's on us",
    body: "Hire an uninsured cleaner off a marketplace and a broken vase or an on-the-job injury can quietly become your liability. With NestGlow, you're covered, and every clean is backed by our satisfaction guarantee: if something wasn't done to your standard, we come back and make it right at no extra cost.",
    imageLeft: true,
  },
];

export function WhyNestGlow() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="bg-cream-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Booking a cleaner shouldn&apos;t feel{" "}
            <span className="text-brand">like a gamble.</span>
          </h2>
        </div>

        {/* ── Mobile carousel ── */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {rows.map((row, i) => (
                <div key={i} className="w-full flex-shrink-0 px-2">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-charcoal/10 bg-cream-100 mb-5">
                    <Image
                      src={row.image}
                      alt={row.alt}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">{row.heading}</h3>
                  <p className="text-charcoal-70 leading-relaxed text-sm">{row.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows + dots row */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              aria-label="Previous"
              disabled={current === 0}
              className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-charcoal transition-opacity disabled:opacity-25 disabled:pointer-events-none"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1.5">
              {rows.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full transition-all duration-200 ${
                    i === current ? "w-4 h-2 bg-brand" : "w-2 h-2 bg-charcoal/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrent((c) => Math.min(rows.length - 1, c + 1))}
              aria-label="Next"
              disabled={current === rows.length - 1}
              className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-charcoal transition-opacity disabled:opacity-25 disabled:pointer-events-none"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* ── Desktop: alternating rows (unchanged) ── */}
        <div className="hidden md:block">
          <div className="space-y-16">
            {rows.map((row, i) => (
              <div key={i} className="grid grid-cols-2 gap-12 items-center">
                <div
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden border border-charcoal/10 bg-cream-100 ${!row.imageLeft ? "md:order-2" : ""}`}
                >
                  <Image
                    src={row.image}
                    alt={row.alt}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <div className={!row.imageLeft ? "md:order-1" : ""}>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">{row.heading}</h3>
                  <p className="text-charcoal-70 leading-relaxed">{row.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/book"
            className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
          >
            Book NestGlow Today
          </Link>
        </div>

      </div>
    </section>
  );
}
