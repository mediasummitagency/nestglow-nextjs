"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
      router.push(
        `/cleaning-services/${match.county}?zip=${zip}&town=${encodeURIComponent(match.town)}`
      );
    } else {
      if (typeof window !== "undefined" && "dataLayer" in window) {
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: "zip_router_miss",
          zip,
        });
      }
      setIsRouting(false);
      setError(`out-of-area:${zip}`);
    }
  }

  const isOutOfArea = error?.startsWith("out-of-area:");
  const missedZip = isOutOfArea ? error!.split(":")[1] : null;
  const displayError = isOutOfArea ? null : error;

  return (
    <div className={cn("w-full", className)}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex gap-3",
          isHero ? "flex-col sm:flex-row sm:justify-center" : "flex-row"
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

      {displayError && (
        <p className="text-sm text-red-600 mt-2">{displayError}</p>
      )}

      {isOutOfArea && missedZip && (
        <p className="text-sm text-charcoal-70 mt-2">
          We don&apos;t currently serve {missedZip}.{" "}
          <Link
            href={`/contact?reason=waitlist&zip=${missedZip}`}
            className="font-semibold text-brand hover:text-brand-dark underline underline-offset-2 transition-colors"
          >
            Want to join our waitlist?
          </Link>
        </p>
      )}
    </div>
  );
}
