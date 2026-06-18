"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  UtensilsCrossed,
  Droplets,
  Moon,
  Sofa,
  Sparkles,
  Check,
  ChevronRight,
  X,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import {
  SIGNATURE_PROCESS,
  SIGNATURE_PROCESS_COUNT,
  SIGNATURE_PROCESS_NAME,
  type ProcessCategory,
} from "@/lib/process";

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  UtensilsCrossed,
  Droplets,
  Moon,
  Sofa,
  Sparkles,
};

interface SignatureProcessProps {
  heading?: string;
  body1?: string;
  body2?: string;
  ctaHref?: string;
  ctaLabel?: string;
  imageSrc?: string;
  hideCta?: boolean;
}

export function SignatureProcess({
  heading = "Every room, done right — every single visit.",
  body1 = "You shouldn't have to wonder what got cleaned and what got skipped. Every NestGlow visit follows the same Signature Clean — a fixed 25-point routine across your kitchen, bathrooms, bedrooms, and living spaces, finished with the small touches most cleaners rush past.",
  body2 = "It's the same standard whether it's your first deep clean or your fiftieth recurring visit. Tap any room below to see exactly what's included — no vague promises, just the checklist we actually work from.",
  ctaHref = "/book",
  ctaLabel = "Book a cleaning",
  imageSrc,
  hideCta = false,
}: SignatureProcessProps) {
  const [activeRoom, setActiveRoom] = useState<ProcessCategory | null>(null);

  useEffect(() => {
    if (!activeRoom) return;
    const preventScroll = (e: Event) => e.preventDefault();
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveRoom(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [activeRoom]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Two-column grid — text top-aligns with image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — copy only */}
          <div className="space-y-6">
            <p className="text-xl text-center tracking-widest font-semibold text-brand uppercase sm:text-sm sm:text-left">
              {SIGNATURE_PROCESS_NAME}
            </p>

            <p className="text-charcoal-70 leading-relaxed">{body1}</p>
            <p className="hidden sm:block text-charcoal-70 leading-relaxed">{body2}</p>
          </div>

          {/* RIGHT — image (hidden on mobile, visible lg+) */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden hidden lg:block">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="Freshly cleaned NestGlow kitchen and living space"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
            ) : (
              /* Drop image at /public/images/process/signature-clean.png and pass imageSrc="/images/process/signature-clean.png" to activate */
              <div className="absolute inset-0 bg-charcoal/6 flex items-center justify-center">
                <span className="text-sm text-charcoal/30 font-medium text-center px-6">
                  Photo placeholder — pass imageSrc=&quot;/images/process/signature-clean.png&quot; when ready
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Tile row — single col on mobile, 3-col sm, 5-col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 items-stretch mt-10 max-w-xs mx-auto sm:max-w-none">
          {SIGNATURE_PROCESS.map((category) => {
            const Icon = ICON_MAP[category.icon];
            return (
              <button
                key={category.id}
                onClick={() => setActiveRoom(category)}
                className="group flex flex-col items-center justify-center text-center gap-3 p-5 bg-white border-2 border-brand/50 rounded-2xl shadow-md hover:border-brand hover:shadow-xl hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand h-full"
                aria-label={`View ${category.title} checklist`}
              >
                <div className="w-14 h-14 rounded-full bg-brand/15 flex items-center justify-center shrink-0">
                  {Icon && <Icon size={22} className="text-brand-dark" />}
                </div>
                <div className="min-h-[2.5rem] flex items-center justify-center">
                  <span className="text-base font-semibold text-charcoal leading-tight">
                    {category.title}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-xs text-charcoal-40">
                  5 points <ChevronRight size={12} />
                </span>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        {!hideCta && (
          <div className="text-center mt-12">
            <Link
              href={ctaHref}
              className="inline-block bg-brand text-charcoal font-semibold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
            >
              {ctaLabel}
            </Link>
          </div>
        )}

        {/* SEO fallback — all 25 items always in SSR HTML, visually hidden */}
        <div className="sr-only">
          {SIGNATURE_PROCESS.map((c) => (
            <div key={c.id}>
              <h3>{c.title}</h3>
              <ul>
                {c.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Modal — fixed full-screen, outside inner container */}
      <AnimatePresence>
        {activeRoom && (() => {
          const ModalIcon = ICON_MAP[activeRoom.icon];
          return (
            <motion.div
              key="modal-backdrop"
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setActiveRoom(null)}
            >
              <div className="absolute inset-0 bg-charcoal/50" />
              <motion.div
                className="relative bg-white rounded-3xl p-6 max-w-md w-full mx-4 max-h-[85vh] overflow-y-auto shadow-2xl"
                initial={{ opacity: 0, scale: 0.72 }}
                animate={{ opacity: 1, scale: 1, transition: { type: "spring", stiffness: 450, damping: 28 } }}
                exit={{ opacity: 0, scale: 0.82, transition: { duration: 0.14, ease: "easeIn" } }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                      {ModalIcon && <ModalIcon size={18} className="text-brand-dark" />}
                    </div>
                    <h3 className="text-lg font-bold text-charcoal">
                      {activeRoom.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveRoom(null)}
                    className="p-2 rounded-full hover:bg-charcoal/8 transition-colors"
                    aria-label="Close"
                  >
                    <X size={16} className="text-charcoal-40" />
                  </button>
                </div>

                {/* Checklist */}
                <ul className="space-y-3">
                  {activeRoom.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={15} className="text-brand-dark mt-0.5 shrink-0" />
                      <span className="text-sm text-charcoal-70 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
