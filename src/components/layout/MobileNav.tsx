"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  { label: "Residential Cleaning",       href: "/services/residential-cleaning" },
  { label: "Commercial Cleaning",        href: "/services/commercial-cleaning" },
  { label: "Deep Cleaning",              href: "/services/deep-cleaning" },
  { label: "Move In / Move Out",         href: "/services/move-in-move-out" },
  { label: "Airbnb & STR Cleaning",      href: "/services/airbnb-cleaning" },
  { label: "Post-Construction Cleaning", href: "/services/post-construction-cleaning" },
];

const areas = [
  { label: "All Service Areas",  href: "/cleaning-services" },
  { label: "Monmouth County",    href: "/cleaning-services/monmouth-county" },
  { label: "Ocean County",       href: "/cleaning-services/ocean-county" },
  { label: "Middlesex County",   href: "/cleaning-services/middlesex-county" },
];

function Accordion({
  label,
  items,
  onClose,
}: {
  label: string;
  items: { label: string; href: string }[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-charcoal/5">
      <button
        className="flex items-center justify-between w-full py-3 text-base font-medium text-charcoal hover:text-brand transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown
          size={16}
          className={cn("transition-transform text-charcoal/50", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="pb-2 pl-3 flex flex-col">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="py-2.5 text-sm text-charcoal/70 hover:text-brand transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-charcoal/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="absolute top-4 left-4 right-4 bg-cream rounded-2xl flex flex-col shadow-xl"
        style={{ animation: "menu-open 0.18s ease-out forwards" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-charcoal/10">
          <span className="font-display font-semibold text-base text-charcoal">Menu</span>
          <button
            onClick={onClose}
            className="p-1.5 text-charcoal hover:text-brand transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="py-2 px-5">
          <Link
            href="/"
            onClick={onClose}
            className="block py-3 text-base font-medium text-charcoal hover:text-brand border-b border-charcoal/5 transition-colors"
          >
            Home
          </Link>

          <Accordion label="Services" items={services} onClose={onClose} />
          <Accordion label="Areas We Serve" items={areas} onClose={onClose} />
        </nav>
      </div>
    </div>
  );
}
