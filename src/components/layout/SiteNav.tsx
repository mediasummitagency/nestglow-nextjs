"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/config";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";

const servicesLinks = [
  { label: "Residential Cleaning", href: "/services/residential-cleaning" },
  { label: "Commercial Cleaning", href: "/services/commercial-cleaning" },
  { label: "Deep Cleaning", href: "/services/deep-cleaning" },
  { label: "Move In / Move Out", href: "/services/move-in-move-out" },
];

const areasLinks = [
  { label: "Monmouth County", href: "/cleaning-services/monmouth-county" },
  { label: "Ocean County", href: "/cleaning-services/ocean-county" },
  { label: "Middlesex County", href: "/cleaning-services/middlesex-county" },
];

function NavDropdown({
  label,
  links,
}: {
  label: string;
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-gold transition-colors"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          size={14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <div className="bg-cream border border-charcoal/10 rounded-xl shadow-lg py-2 min-w-[200px]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm text-charcoal hover:bg-cream-100 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 h-[72px] bg-charcoal border-b border-white/10 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo-white.png"
              alt="NestGlow Co"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-white/80 hover:text-gold transition-colors"
            >
              Home
            </Link>
            <NavDropdown label="Services" links={servicesLinks} />
            <NavDropdown label="Service Areas" links={areasLinks} />
            <Link
              href="/guides"
              className="text-sm font-medium text-white/80 hover:text-gold transition-colors"
            >
              Guides
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-white/80 hover:text-gold transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={BUSINESS.phoneHref}
              className="flex items-center gap-1.5 text-sm font-medium text-charcoal hover:text-gold transition-colors"
            >
              <Phone size={14} />
              {BUSINESS.phone}
            </a>
            <Link
              href="/book"
              className="bg-gold text-charcoal text-sm font-semibold px-4 py-2 rounded-full hover:bg-gold-dark transition-colors"
            >
              Book Cleaning
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-5 h-0.5 bg-white" />
            <span className="block w-5 h-0.5 bg-white" />
            <span className="block w-5 h-0.5 bg-white" />
          </button>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
