"use client";

import Link from "next/link";
import Image from "next/image";
import { BUSINESS } from "@/lib/config";

// Services and Areas are home-page sections while the standalone pages are
// parked for phase 2, so these point at anchors rather than routes.
const servicesLinks = [
  { label: "Regular Home Cleaning", href: "/#services" },
  { label: "Deep Cleaning", href: "/#services" },
  { label: "Move In / Move Out", href: "/#services" },
  { label: "Airbnb & Rental Turnovers", href: "/#services" },
];

const areasLinks = [
  { label: "Monmouth County, NJ", href: "/#areas" },
  { label: "Ocean County, NJ", href: "/#areas" },
  { label: "Middlesex County, NJ", href: "/#areas" },
];

const companyLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Get a Quote", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();


  return (
    <footer className="bg-charcoal text-cream dock-clearance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* 5-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-cream/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/logo-white.png"
              alt="NestGlow Co"
              width={140}
              height={40}
              className="h-9 w-auto object-contain mb-4"
            />
            <p className="text-sm text-cream/70 leading-relaxed mb-4">
              {BUSINESS.tagline}
            </p>
            <a
              href={BUSINESS.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cream/60 hover:text-brand transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @nestglowco
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-cream/40 mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-cream/40 mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2">
              {areasLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-cream/40 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-cream/40 mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-cream/70">
              <li>
                <a
                  href={BUSINESS.phoneHref}
                  className="hover:text-brand transition-colors"
                >
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.emailHref}
                  className="hover:text-brand transition-colors"
                >
                  {BUSINESS.email}
                </a>
              </li>
              <li className="pt-2 text-cream/50 leading-relaxed">
                Monmouth County, NJ
                <br />
                Ocean County, NJ
                <br />
                Middlesex County, NJ
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/40">
          <p suppressHydrationWarning>© {year} NestGlow Co. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-brand transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-brand transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
