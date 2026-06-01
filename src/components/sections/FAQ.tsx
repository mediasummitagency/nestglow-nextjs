"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const INTRO_STYLE_ID = "nestglow-faq-section-animations";

interface FAQItem {
  question: string;
  answer: string;
  meta?: string;
}

interface FAQProps {
  headline?: string;
  subtitle?: string;
  items?: FAQItem[];
  cta?: { label: string; href: string };
}

const palette = {
  surface: "bg-white text-charcoal",
  panel: "bg-white",
  border: "border-charcoal/10",
  heading: "text-charcoal",
  muted: "text-charcoal-70",
  iconRing: "border-charcoal/20",
  iconSurface: "bg-cream-100",
  icon: "text-charcoal",
  glow: "rgba(79, 172, 254, 0.10)",
  aurora: "transparent",
  shadow: "shadow-md",
  overlay: "transparent",
};

export function FAQ({
  headline = "Common Questions",
  subtitle,
  items = [],
  cta,
}: FAQProps) {
  const [introReady, setIntroReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(INTRO_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = INTRO_STYLE_ID;
    style.innerHTML = `
      @keyframes faq-section-fade-up {
        0% { transform: translate3d(0, 20px, 0); opacity: 0; filter: blur(6px); }
        60% { filter: blur(0); }
        100% { transform: translate3d(0, 0, 0); opacity: 1; filter: blur(0); }
      }
      @keyframes faq-section-beam-spin {
        0% { transform: rotate(0deg) scale(1); }
        100% { transform: rotate(360deg) scale(1); }
      }
      @keyframes faq-section-pulse {
        0% { transform: scale(0.7); opacity: 0.55; }
        60% { opacity: 0.1; }
        100% { transform: scale(1.25); opacity: 0; }
      }
      @keyframes faq-section-meter {
        0%, 20% { transform: scaleX(0); transform-origin: left; }
        45%, 60% { transform: scaleX(1); transform-origin: left; }
        80%, 100% { transform: scaleX(0); transform-origin: right; }
      }
      @keyframes faq-section-tick {
        0%, 30% { transform: translateX(-6px); opacity: 0.4; }
        50% { transform: translateX(2px); opacity: 1; }
        100% { transform: translateX(20px); opacity: 0; }
      }
      .faq-section-intro {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 0.85rem 1.4rem;
        border-radius: 9999px;
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.12);
        background: rgba(240, 240, 240, 0.65);
        color: rgba(20, 20, 20, 0.92);
        text-transform: uppercase;
        letter-spacing: 0.35em;
        font-size: 0.65rem;
        width: 100%;
        max-width: 24rem;
        margin: 0 auto;
        mix-blend-mode: screen;
        opacity: 0;
        transform: translate3d(0, 12px, 0);
        filter: blur(8px);
        transition: opacity 720ms ease, transform 720ms ease, filter 720ms ease;
        isolation: isolate;
      }
      .faq-section-intro--active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        filter: blur(0);
      }
      .faq-section-intro__beam,
      .faq-section-intro__pulse {
        position: absolute;
        inset: -110%;
        pointer-events: none;
        border-radius: 50%;
      }
      .faq-section-intro__beam {
        background: conic-gradient(from 160deg, rgba(50, 50, 50, 0.12), transparent 32%, rgba(100, 100, 100, 0.10) 58%, transparent 78%, rgba(100, 100, 100, 0.08));
        animation: faq-section-beam-spin 18s linear infinite;
        opacity: 0.55;
      }
      .faq-section-intro__pulse {
        border: 1px solid currentColor;
        opacity: 0.25;
        animation: faq-section-pulse 3.4s ease-out infinite;
      }
      .faq-section-intro__label {
        position: relative;
        z-index: 1;
        font-weight: 600;
        letter-spacing: 0.4em;
      }
      .faq-section-intro__meter {
        position: relative;
        z-index: 1;
        flex: 1 1 auto;
        height: 1px;
        background: linear-gradient(90deg, transparent, currentColor 35%, transparent 85%);
        transform: scaleX(0);
        transform-origin: left;
        animation: faq-section-meter 5.8s ease-in-out infinite;
        opacity: 0.7;
      }
      .faq-section-intro__tick {
        position: relative;
        z-index: 1;
        width: 0.55rem;
        height: 0.55rem;
        border-radius: 9999px;
        background: currentColor;
        box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.08);
        animation: faq-section-tick 3.2s ease-in-out infinite;
      }
      .faq-section-fade {
        opacity: 0;
        transform: translate3d(0, 24px, 0);
        filter: blur(12px);
        transition: opacity 700ms ease, transform 700ms ease, filter 700ms ease;
      }
      .faq-section-fade--ready {
        animation: faq-section-fade-up 860ms cubic-bezier(0.22, 0.68, 0, 1) forwards;
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntroReady(true);
          setHasEntered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleQuestion = (index: number) =>
    setActiveIndex((prev) => (prev === index ? -1 : index));

  const setCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--faq-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--faq-y", `${event.clientY - rect.top}px`);
  };

  const clearCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    event.currentTarget.style.removeProperty("--faq-x");
    event.currentTarget.style.removeProperty("--faq-y");
  };

  return (
    <div
      ref={sectionRef}
      className={`relative w-full transition-colors duration-700 ${palette.surface}`}
    >
      <div className="absolute inset-0 z-0" style={{ background: palette.aurora }} />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-80"
        style={{ background: palette.overlay, mixBlendMode: "screen" }}
      />

      <section
        className={`relative z-10 mx-auto flex max-w-4xl flex-col gap-12 px-6 py-16 md:py-24 lg:max-w-5xl lg:px-12 ${
          hasEntered ? "faq-section-fade--ready" : "faq-section-fade"
        }`}
      >
        <div className={`faq-section-intro ${introReady ? "faq-section-intro--active" : ""}`}>
          <span className="faq-section-intro__beam" aria-hidden="true" />
          <span className="faq-section-intro__pulse" aria-hidden="true" />
          <span className="faq-section-intro__label">FAQ</span>
          <span className="faq-section-intro__meter" aria-hidden="true" />
          <span className="faq-section-intro__tick" aria-hidden="true" />
        </div>

        <header className="text-center space-y-3">
          <h2 className={`text-4xl font-bold leading-tight md:text-5xl lg:text-6xl ${palette.heading}`}>
            {headline}
          </h2>
          {subtitle && (
            <p className={`text-base ${palette.muted}`}>{subtitle}</p>
          )}
        </header>

        <ul className="space-y-4">
          {items.map((item, index) => {
            const open = activeIndex === index;
            const panelId = `faq-section-panel-${index}`;
            const buttonId = `faq-section-trigger-${index}`;

            return (
              <li
                key={index}
                className={`group relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 focus-within:-translate-y-0.5 ${palette.border} ${palette.panel} ${palette.shadow}`}
                onMouseMove={setCardGlow}
                onMouseLeave={clearCardGlow}
              >
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{
                    background: `radial-gradient(240px circle at var(--faq-x, 50%) var(--faq-y, 50%), ${palette.glow}, transparent 70%)`,
                  }}
                />

                <button
                  type="button"
                  id={buttonId}
                  aria-controls={panelId}
                  aria-expanded={open}
                  onClick={() => toggleQuestion(index)}
                  className="relative flex w-full items-start gap-4 md:gap-6 px-5 md:px-8 py-5 md:py-7 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand/30"
                >
                  <span
                    className={`relative flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-105 ${palette.iconRing} ${palette.iconSurface}`}
                  >
                    <span
                      className={`pointer-events-none absolute inset-0 rounded-full border opacity-30 ${palette.iconRing} ${
                        open ? "animate-ping" : ""
                      }`}
                    />
                    <svg
                      className={`relative h-4 w-4 md:h-5 md:w-5 transition-transform duration-500 ${palette.icon} ${
                        open ? "rotate-45" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>

                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <h3 className={`text-lg font-semibold leading-tight sm:text-xl ${palette.heading}`}>
                        {item.question}
                      </h3>
                      {item.meta && (
                        <span
                          className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.35em] transition-opacity duration-300 sm:ml-auto ${palette.border} ${palette.muted}`}
                        >
                          {item.meta}
                        </span>
                      )}
                    </div>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`overflow-hidden text-base leading-relaxed transition-[max-height] duration-500 ease-out ${
                        open ? "max-h-64" : "max-h-0"
                      } ${palette.muted}`}
                    >
                      <p className="pr-2">{item.answer}</p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {cta && (
          <div className="text-center">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              {cta.label} <ChevronRight size={14} />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
