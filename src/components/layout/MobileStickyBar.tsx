"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Phone, Sparkles, Menu } from "lucide-react";
import Link from "next/link";
import { BUSINESS } from "@/lib/config";
import { cn } from "@/lib/utils";
import MobileNav from "@/components/layout/MobileNav";

type DataLayerWindow = Window & { dataLayer?: object[] };

function pushEvent(event: string) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event });
}

const NAV_ITEMS = [
  { label: "Home", icon: Home,     href: "/",                type: "link"   as const, event: "mobile_sticky_home_click" },
  { label: "Call", icon: Phone,    href: BUSINESS.phoneHref, type: "a"      as const, event: "mobile_sticky_call_click" },
  { label: "Book", icon: Sparkles, href: "/book",            type: "link"   as const, event: "mobile_sticky_quote_click" },
  { label: "Menu", icon: Menu,     href: null,               type: "button" as const, event: "mobile_sticky_menu_click" },
];

export default function MobileStickyBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname === "/book") return null;

  return (
    <>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex justify-center px-12"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
      >
        <div className="w-full rounded-full px-3 py-2.5 bg-white/50 backdrop-blur-xl border border-white/25 shadow-lg shadow-black/10">
          <div className="grid grid-cols-4">
            {NAV_ITEMS.map(({ label, icon: Icon, type, event, href }) => {
              const isActive =
                type === "button"
                  ? menuOpen
                  : href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href as string);

              const content = (
                <>
                  <Icon size={20} className={cn(isActive ? "text-brand" : "text-charcoal/55")} />
                  <span className={cn("text-[10px] font-medium", isActive ? "text-brand" : "text-charcoal/55")}>
                    {label}
                  </span>
                </>
              );

              if (type === "button") {
                return (
                  <button
                    key={label}
                    className="flex flex-col items-center gap-0.5 py-2 rounded-full transition-colors active:opacity-70"
                    onClick={() => { pushEvent(event); setMenuOpen(true); }}
                  >
                    {content}
                  </button>
                );
              }

              const Wrapper = type === "link" ? Link : "a";
              return (
                <Wrapper
                  key={label}
                  href={href as string}
                  className="flex flex-col items-center gap-0.5 py-2 rounded-full transition-colors active:opacity-70"
                  onClick={() => pushEvent(event)}
                >
                  {content}
                </Wrapper>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
