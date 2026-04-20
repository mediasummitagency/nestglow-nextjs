import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { BUSINESS } from "@/lib/config";

const servicesLinks = [
  { label: "Residential Cleaning", href: "/services/residential-cleaning" },
  { label: "Commercial Cleaning", href: "/services/commercial-cleaning" },
  { label: "Deep Cleaning", href: "/services/deep-cleaning" },
  { label: "Move In / Move Out", href: "/services/move-in-move-out" },
  { label: "General vs. Deep Clean", href: "/general-vs-deep-cleaning" },
];

const areasLinks = [
  { label: "All Service Areas", href: "/cleaning-services" },
  { label: "Monmouth County, NJ", href: "/cleaning-services/monmouth-county" },
  { label: "Ocean County, NJ", href: "/cleaning-services/ocean-county" },
  { label: "Middlesex County, NJ", href: "/cleaning-services/middlesex-county" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Guides", href: "/guides" },
  { label: "FAQ", href: "/faq" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
  { label: "Book Cleaning", href: "/book" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* 5-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-cream/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/logo.png"
              alt="NestGlow Co"
              width={130}
              height={36}
              className="h-8 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-sm text-cream/70 leading-relaxed mb-4">
              {BUSINESS.tagline}
            </p>
            <a
              href={BUSINESS.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cream/60 hover:text-gold transition-colors"
            >
              <ExternalLink size={16} />
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
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
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
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
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
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
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
                  className="hover:text-gold transition-colors"
                >
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.emailHref}
                  className="hover:text-gold transition-colors"
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
          <p>© {year} NestGlow Co. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
