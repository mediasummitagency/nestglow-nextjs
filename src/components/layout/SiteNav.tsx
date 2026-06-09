"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
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
        className="flex items-center gap-1 text-base font-medium text-white/80 hover:text-brand transition-colors whitespace-nowrap"
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
                className="block px-4 py-2 text-sm text-charcoal hover:bg-cream-100 hover:text-brand transition-colors"
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
  const pathname = usePathname();
  const minimal = pathname === "/book-now";
  const hideQuoteCta = pathname === "/book" || pathname === "/book-now";

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-40 h-[72px] flex items-center px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full">
        <div
          className="grid grid-cols-3 items-center rounded-full border px-5 h-14 shadow-lg shadow-black/20"
          style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderColor: "rgba(255,255,255,0.15)" }}
        >
          {/* Logo — left col */}
          <div className="flex items-center">
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
          </div>

          {/* Nav — center col, truly centered */}
          {!minimal ? (
            <nav className="hidden md:flex items-center justify-center gap-4">
              <Link
                href="/"
                className="text-base font-medium text-white/80 hover:text-brand transition-colors whitespace-nowrap"
              >
                Home
              </Link>
              <NavDropdown label="Services" links={servicesLinks} />
              <NavDropdown label="Service Areas" links={areasLinks} />
              <Link
                href="/about"
                className="text-base font-medium text-white/80 hover:text-brand transition-colors whitespace-nowrap"
              >
                About
              </Link>
            </nav>
          ) : (
            <div />
          )}

          {/* Right col — CTA (desktop) or hamburger (mobile) */}
          <div className="flex items-center justify-end gap-4">
            {!minimal && (
              <>
                <a
                  href={BUSINESS.phoneHref}
                  className="hidden md:flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-brand transition-colors"
                >
                  <Phone size={14} />
                  {BUSINESS.phone}
                </a>
                {!hideQuoteCta && (
                  <Link
                    href="/book"
                    className="hidden md:inline-flex bg-brand text-charcoal text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-brand-dark transition-colors duration-200"
                  >
                    Get a quote
                  </Link>
                )}
                <button
                  className="md:hidden flex flex-col gap-1.5 p-2"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                >
                  <span className="block w-5 h-0.5 bg-white" />
                  <span className="block w-5 h-0.5 bg-white" />
                  <span className="block w-5 h-0.5 bg-white" />
                </button>
              </>
            )}
            {minimal && (
              <a
                href={BUSINESS.phoneHref}
                className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-brand transition-colors"
              >
                <Phone size={14} />
                {BUSINESS.phone}
              </a>
            )}
          </div>
        </div>
        </div>
      </header>

      {!minimal && <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />}
    </>
  );
}
