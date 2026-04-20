"use client";

import { BUSINESS } from "@/lib/config";

export default function PhoneLink({ className }: { className?: string }) {
  function handleClick() {
    if (typeof window !== "undefined" && "dataLayer" in window) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({ event: "phone_click" });
    }
  }

  return (
    <a
      href={BUSINESS.phoneHref}
      className={className}
      onClick={handleClick}
    >
      {BUSINESS.phone}
    </a>
  );
}
