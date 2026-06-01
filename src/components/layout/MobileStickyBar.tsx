"use client";

import { usePathname } from "next/navigation";
import { Phone, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";
import { BUSINESS } from "@/lib/config";

type DataLayerWindow = Window & { dataLayer?: object[] };

function pushEvent(event: string) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event });
}

export default function MobileStickyBar() {
  const pathname = usePathname();
  if (pathname === "/book") return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-charcoal text-cream border-t border-white/10"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href={BUSINESS.phoneHref}
          className="flex flex-col items-center justify-center gap-1 py-3 text-xs font-semibold hover:bg-white/10 active:bg-white/20 transition-colors"
          onClick={() => pushEvent("mobile_sticky_call_click")}
        >
          <Phone size={18} />
          Call
        </a>
        <a
          href={BUSINESS.smsHref}
          className="flex flex-col items-center justify-center gap-1 py-3 text-xs font-semibold hover:bg-white/10 active:bg-white/20 transition-colors"
          onClick={() => pushEvent("mobile_sticky_text_click")}
        >
          <MessageSquare size={18} />
          Text
        </a>
        <Link
          href="/book"
          className="flex flex-col items-center justify-center gap-1 py-3 text-xs font-semibold hover:bg-white/10 active:bg-white/20 transition-colors"
          onClick={() => pushEvent("mobile_sticky_quote_click")}
        >
          <Sparkles size={18} />
          Quote
        </Link>
      </div>
    </div>
  );
}
