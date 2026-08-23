"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lookupZip } from "@/lib/zipToCounty";
import { cn } from "@/lib/utils";

interface ZipRouterProps {
  variant: "hero" | "inline" | "compact";
  className?: string;
}

export function ZipRouter({ variant, className }: ZipRouterProps) {
  const router = useRouter();
  const [zip, setZip] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRouting, setIsRouting] = useState(false);

  const isHero = variant === "hero";
  const isCompact = variant === "compact";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (zip.length !== 5) {
      setError("Please enter a 5-digit ZIP code.");
      return;
    }

    setIsRouting(true);
    const match = lookupZip(zip);

    if (match) {
      if (typeof window !== "undefined" && "dataLayer" in window) {
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: "zip_router_match",
          zip,
          county: match.county,
          town: match.town,
        });
      }
      router.push(`/contact?zip=${zip}`);
    } else {
      if (typeof window !== "undefined" && "dataLayer" in window) {
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: "zip_router_miss",
          zip,
        });
      }
      router.push(`/contact?zip=${zip}&reason=waitlist`);
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex gap-3",
          isHero ? "flex-col items-center sm:flex-row sm:justify-center" : "flex-row"
        )}
      >
        <input
          type="text"
          inputMode="numeric"
          placeholder={isCompact ? "ZIP code" : "Enter your ZIP"}
          value={zip}
          onChange={(e) => {
            setError(null);
            setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
          }}
          className={cn(
            "bg-white border border-charcoal/20 rounded-full text-charcoal placeholder:text-charcoal/40 outline-none focus:ring-2 focus:ring-brand/40",
            isHero ? "w-40 px-5 py-3 text-base" : "w-28 px-4 py-3 text-sm"
          )}
          disabled={isRouting}
          aria-label="ZIP code"
          maxLength={5}
        />
        <button
          type="submit"
          disabled={isRouting}
          className={cn(
            "bg-brand text-charcoal font-semibold rounded-full hover:bg-brand-dark transition-colors disabled:opacity-60 whitespace-nowrap shrink-0",
            isHero ? "px-8 py-3 text-base" : "px-7 py-3 text-base"
          )}
        >
          {isRouting
            ? "Checking..."
            : isHero
            ? "See if we serve your area"
            : "Go"}
        </button>
      </form>

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}
