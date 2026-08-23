"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/config";
import MobileNav from "./MobileNav";

// Four pages, so no dropdowns: Services and Areas are sections of the home
// page now that the standalone service/area pages are parked for phase 2.
// /about was parked too (2026-08-22) — no portrait of Caroline, and the copy
// needed dates nobody had.
const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Areas", href: "/#areas" },
  { label: "Contact", href: "/contact" },
];

export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const hideQuoteCta = pathname === "/contact";

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-40 h-[72px] flex items-center px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div
            className="grid grid-cols-3 items-center rounded-full border px-5 h-14 shadow-lg shadow-black/20"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderColor: "rgba(255,255,255,0.15)",
            }}
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

            {/* Nav — center col */}
            <nav className="hidden md:flex items-center justify-center gap-4">
              <Link
                href="/"
                className="text-base font-medium text-white/80 hover:text-brand transition-colors whitespace-nowrap"
              >
                Home
              </Link>
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-base font-medium text-white/80 hover:text-brand transition-colors whitespace-nowrap"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Right col — CTA (desktop) or hamburger (mobile) */}
            <div className="flex items-center justify-end gap-4 col-start-3">
              <a
                href={BUSINESS.phoneHref}
                className="hidden md:flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-brand transition-colors"
              >
                <Phone size={14} />
                {BUSINESS.phone}
              </a>
              {!hideQuoteCta && (
                <Link
                  href="/contact"
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
            </div>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
