"use client";

import Link from "next/link";

// Flat list, no accordions: with five pages there is nothing left to nest.
// Services and Areas are sections of the home page for now — see
// projects/summit-media/clients/nestglow/website/parked-for-phase-2/.
const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Areas We Serve", href: "/#areas" },
  { label: "Contact", href: "/contact" },
];

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
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="block py-3 text-sm font-medium text-charcoal hover:text-brand border-b border-charcoal/5 last:border-0 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
