"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/config";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Residential Cleaning", href: "/services/residential-cleaning" },
  { label: "Commercial Cleaning", href: "/services/commercial-cleaning" },
  { label: "Deep Cleaning", href: "/services/deep-cleaning" },
  { label: "Move In / Move Out", href: "/services/move-in-move-out" },
  { label: "All Service Areas", href: "/cleaning-services" },
  { label: "Monmouth County", href: "/cleaning-services/monmouth-county" },
  { label: "Ocean County", href: "/cleaning-services/ocean-county" },
  { label: "Middlesex County", href: "/cleaning-services/middlesex-county" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export default function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative ml-auto w-full max-w-sm h-full bg-cream flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-charcoal/10">
          <span className="font-display font-semibold text-lg text-charcoal">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 text-charcoal hover:text-gold transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block py-3 text-base font-medium text-charcoal hover:text-gold border-b border-charcoal/5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-6 py-6 border-t border-charcoal/10 flex flex-col gap-3">
          <a
            href={BUSINESS.phoneHref}
            className="flex items-center justify-center gap-2 text-sm font-medium text-charcoal hover:text-gold transition-colors"
          >
            <Phone size={14} />
            {BUSINESS.phone}
          </a>
          <Link
            href="/book"
            onClick={onClose}
            className="w-full bg-gold text-charcoal text-sm font-semibold px-4 py-3 rounded-full text-center hover:bg-gold-dark transition-colors"
          >
            Book Cleaning
          </Link>
        </div>
      </div>
    </div>
  );
}
