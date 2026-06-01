"use client";

import React, { useEffect, useRef, useState } from "react";

const STYLE_ID = "nestglow-faq-accordion-styles";

interface FAQItem {
  question: string;
  answer: string;
  meta?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  namespace?: string;
}

const palette = {
  panel: "bg-white",
  border: "border-charcoal/10",
  heading: "text-charcoal",
  muted: "text-charcoal-70",
  iconRing: "border-charcoal/20",
  iconSurface: "bg-cream-100",
  icon: "text-charcoal",
  glow: "rgba(79, 172, 254, 0.10)",
  shadow: "shadow-md",
};

export function FAQAccordion({ items, namespace = "faq" }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [hasEntered, setHasEntered] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.innerHTML = `
      @keyframes nestglow-faq-fade-up {
        0% { transform: translate3d(0, 20px, 0); opacity: 0; filter: blur(6px); }
        60% { filter: blur(0); }
        100% { transform: translate3d(0, 0, 0); opacity: 1; filter: blur(0); }
      }
      .nestglow-faq-fade {
        opacity: 0;
        transform: translate3d(0, 24px, 0);
        filter: blur(12px);
        transition: opacity 700ms ease, transform 700ms ease, filter 700ms ease;
      }
      .nestglow-faq-fade--ready {
        animation: nestglow-faq-fade-up 860ms cubic-bezier(0.22, 0.68, 0, 1) forwards;
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleItem = (index: number) =>
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
    <ul
      ref={listRef}
      className={`space-y-4 ${hasEntered ? "nestglow-faq-fade--ready" : "nestglow-faq-fade"}`}
    >
      {items.map((item, index) => {
        const open = activeIndex === index;
        const panelId = `${namespace}-panel-${index}`;
        const buttonId = `${namespace}-trigger-${index}`;

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
              onClick={() => toggleItem(index)}
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
  );
}
