"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/config";
import { CtaOpen } from "@/components/ui/CtaVariant";
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

// Routes whose first section is a dark hero image. The bar's links are white, so
// it can only stay translucent where something dark sits behind it — everywhere
// else it needs its own opaque background or the text lands on white.
const DARK_HERO_ROUTES = ["/", "/contact"];

export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const hideQuoteCta = pathname === "/contact";

  // The bar is fixed, so it outlives the hero it was designed against. Past the
  // first few pixels of scroll it is over page content, which is cream on every
  // route — hence the opaque treatment below.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); // a reload can restore mid-page scroll before any event fires
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !DARK_HERO_ROUTES.includes(pathname);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 h-[72px] flex items-center px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div
            className="grid grid-cols-3 items-center rounded-full border px-5 h-14 shadow-lg shadow-black/20 transition-colors duration-300"
            style={{
              background: solid
                ? "rgba(26,31,54,0.92)"
                : "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderColor: solid
                ? "rgba(255,255,255,0.12)"
                : "rgba(255,255,255,0.15)",
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
              {/* Answered hours only. After hours the number comes out of the
                  header entirely and "Get a quote" is left as the single
                  primary — offering a call that rings out loses the visitor
                  outright, because nobody leaves a voicemail for a cleaner.
                  There is no after-hours replacement here on purpose: the
                  quote button beside it already IS the after-hours path. */}
              <CtaOpen>
                <a
                  href={BUSINESS.phoneHref}
                  className="hidden md:flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-brand transition-colors"
                >
                  <Phone size={14} />
                  {BUSINESS.phone}
                </a>
              </CtaOpen>
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
