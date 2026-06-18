"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
    <div className="border-b border-charcoal/5 last:border-0">
      <button
        className="flex items-center justify-between w-full py-3 text-sm font-medium text-charcoal"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown
          size={14}
          className={cn("transition-transform text-charcoal/40", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="pb-2 pl-3 flex flex-col">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="py-2 text-sm text-charcoal/60 hover:text-brand transition-colors"
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
  if (!open) return null;

  return (
    <>
      {/* Invisible tap-outside layer */}
      <div className="fixed inset-0 z-[59]" onClick={onClose} />

      {/* Popover panel — floats above the dock, centered */}
      <div
        className="fixed z-[60] w-64 bg-cream rounded-2xl shadow-2xl overflow-hidden"
        style={{
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 96px)",
          left: "calc(50% - 128px)",
          animation: "menu-from-point 0.25s cubic-bezier(0.34, 1.2, 0.64, 1) forwards",
          transformOrigin: "bottom center",
        }}
      >
        <nav className="py-1 px-4">
          <Link
            href="/"
            onClick={onClose}
            className="block py-3 text-sm font-medium text-charcoal hover:text-brand border-b border-charcoal/5 transition-colors"
          >
            Home
          </Link>
          <Accordion label="Services" items={services} onClose={onClose} />
          <Accordion label="Areas We Serve" items={areas} onClose={onClose} />
        </nav>
      </div>
    </>
  );
}
