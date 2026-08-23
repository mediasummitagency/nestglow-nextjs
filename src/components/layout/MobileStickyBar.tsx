"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Phone, MessageSquare, Sparkles, Menu } from "lucide-react";
import Link from "next/link";
import { BUSINESS } from "@/lib/config";
import { cn } from "@/lib/utils";
import MobileNav from "@/components/layout/MobileNav";
import { CtaOpen, CtaClosed } from "@/components/ui/CtaVariant";

type DataLayerWindow = Window & { dataLayer?: object[] };

function pushEvent(event: string) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event });
}

/**
 * 64px of bar, plus however tall the home-indicator strip is on the device.
 * Baking the inset into the height (rather than padding the <nav>, which would
 * shrink its content box) means the white surface always reaches the physical
 * bottom edge while the icons stay clear of the indicator.
 *
 * The matching page clearance is `.dock-clearance` in `globals.css` — 64px + the
 * same inset + breathing room. Keep the two in step by hand.
 */
const DOCK_H = "h-[calc(64px+env(safe-area-inset-bottom,0px))]";

/**
 * Four slots at any hour. `when` decides which of Call / Text occupies the
 * second one:
 *
 *   answered hours -> Home · Call · Quote · Menu
 *   after hours    -> Home · Text · Quote · Menu
 *
 * Both are always in the HTML and the CSS hides the one that does not apply
 * (see `CtaMode.tsx`), so the bar never paints one and swaps to the other. With
 * `HOURS.ENABLED` false, `CtaClosed` renders nothing and the bar is exactly the
 * four items it was before this existed.
 *
 * The phone is not offered after hours in any Summit build — a CTA that rings
 * out is worse than no CTA. Text replaces it rather than the form because the
 * Quote slot beside it already IS the form, and two slots pointing at /contact
 * would waste one of only four.
 */
const NAV_ITEMS = [
  { label: "Home", icon: Home,     href: "/",                type: "link"   as const, event: "mobile_sticky_home_click",  when: null },
  { label: "Call", icon: Phone,    href: BUSINESS.phoneHref, type: "a"      as const, event: "mobile_sticky_call_click",  when: "open"   as const },
  { label: "Text", icon: MessageSquare, href: BUSINESS.smsHref, type: "a"   as const, event: "mobile_sticky_text_click",  when: "closed" as const },
  { label: "Quote", icon: Sparkles, href: "/contact",        type: "link"   as const, event: "mobile_sticky_quote_click", when: null },
  { label: "Menu", icon: Menu,     href: null,               type: "button" as const, event: "mobile_sticky_menu_click",  when: null },
];

export default function MobileStickyBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Shown on every page since 2026-08-22. It used to return null on /contact,
  // which made the bar look broken rather than deliberate: tap Quote, land on
  // /contact, and the nav you just used has vanished.
  //
  // EDGE TO EDGE as of 2026-08-22, matching gorsegner-nextjs's `MobileDock`.
  // It was a floating pill inset 48px each side with a rounded white capsule and
  // a blur; the page ran underneath it on both sides, so it read as a widget
  // sitting on the page rather than as the bottom of the app. Now it owns the
  // full bottom edge: square, opaque white, hairline on top plus an upward
  // shadow so it separates from a white section as well as a dark one.
  //
  // The safe-area inset is padding on the ITEMS, never on the <nav>: the nav is
  // `box-sizing: border-box`, so padding there shrinks the content box the flex
  // items live in instead of making the bar taller. Here each item stretches the
  // full height and paints its own background right down to the physical edge,
  // while its icon and label sit above the home indicator. (gorsegner-nextjs's
  // MobileDock documents the same trap — its accent slot stopped ~34px short of
  // the bottom on a notched iPhone when the padding was in the wrong place.)
  //
  // `touch-manipulation` tells the browser these can never be double-tapped to
  // zoom, so there is no window where a tap waits on a possible second one.
  const itemBase =
    "flex flex-1 flex-col items-center justify-center gap-1 px-0.5 pb-[env(safe-area-inset-bottom,0px)] text-[10px] font-medium transition-colors touch-manipulation active:bg-charcoal/5";

  return (
    <>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <nav
        aria-label="Quick actions"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex items-stretch border-t border-charcoal/10 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.06)] md:hidden",
          DOCK_H,
        )}
      >
        {NAV_ITEMS.map(({ label, icon: Icon, type, event, href, when }) => {
          const isActive =
            type === "button"
              ? menuOpen
              : href === "/"
              ? pathname === "/"
              : pathname.startsWith(href as string);

          const tone = isActive ? "text-brand" : "text-charcoal/55";

          const content = (
            <>
              <Icon size={20} className={tone} />
              <span className={tone}>{label}</span>
            </>
          );

          // `display: contents` on the variant wrapper, so the slot inside it
          // stays a direct flex item of the bar and keeps its flex-1 width.
          const withVariant = (node: React.ReactNode) =>
            when === "open" ? (
              <CtaOpen key={label}>{node}</CtaOpen>
            ) : when === "closed" ? (
              <CtaClosed key={label}>{node}</CtaClosed>
            ) : (
              node
            );

          if (type === "button") {
            return withVariant(
              <button
                key={label}
                type="button"
                aria-expanded={menuOpen}
                className={itemBase}
                onClick={() => { pushEvent(event); setMenuOpen(true); }}
              >
                {content}
              </button>,
            );
          }

          const Wrapper = type === "link" ? Link : "a";
          return withVariant(
            <Wrapper
              key={label}
              href={href as string}
              aria-current={isActive ? "page" : undefined}
              className={itemBase}
              onClick={() => pushEvent(event)}
            >
              {content}
            </Wrapper>,
          );
        })}
      </nav>
    </>
  );
}
