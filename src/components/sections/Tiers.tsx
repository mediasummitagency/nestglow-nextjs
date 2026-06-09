"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Circle } from "lucide-react";
import { TIERS, MASTER_ROOMS, MASTER_EXTRAS } from "@/lib/tiers";

interface TiersProps {
  heading?: string;
  subtitle?: string;
  zipOverride?: string;
  townOverride?: string;
  dark?: boolean;
}

type DataLayerWindow = Window & { dataLayer?: object[] };

function pushTierClick(tierId: string, tierName: string) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({
    event: "tier_card_click",
    tier_id: tierId,
    tier_name: tierName,
    source_page: window.location.pathname,
  });
}

export default function Tiers({
  heading = "Three plans, every one of them a NestGlow Signature Clean.",
  subtitle = "Pick the plan that fits your home, and we'll handle the rest.",
  zipOverride,
  townOverride,
  dark = false,
}: TiersProps) {
  const searchParams = useSearchParams();
  const zip = zipOverride ?? searchParams.get("zip") ?? "";
  const town = townOverride ?? searchParams.get("town") ?? "";

  return (
    <div className="mt-8">
      <div className="text-center mb-16">
        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-3 ${dark ? "text-cream" : "text-charcoal"}`}>{heading}</h2>
        <p className={`max-w-2xl mx-auto ${dark ? "text-cream/70" : "text-charcoal-70"}`}>{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 max-w-5xl mx-auto">
        {TIERS.map((tier) => {
          const url =
            `/book?tier=${tier.id}` +
            (zip ? `&zip=${zip}` : "") +
            (town ? `&town=${encodeURIComponent(town)}` : "");

          const includedRooms = new Set(tier.includedRoomIds);
          const includedExtras = new Set(tier.includedExtraIds);

          const cardClass = tier.isPopular
            ? "relative flex flex-col h-full bg-cream-50 border-2 border-brand shadow-xl rounded-2xl p-6 md:p-7 md:scale-105 transition-all duration-200 hover:-translate-y-3 hover:shadow-[0_16px_60px_rgba(79,172,254,0.45)]"
            : "relative flex flex-col h-full bg-white border-2 border-brand/25 shadow-sm rounded-2xl p-6 md:p-7 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl hover:border-brand/60";

          return (
            <Link
              key={tier.id}
              href={url}
              className={cardClass}
              onClick={() => pushTierClick(tier.id, tier.name)}
            >
              {tier.isPopular && (
                <span className="absolute top-0 right-0 bg-brand text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                  Most Popular
                </span>
              )}

              {/* Card header */}
              <div className={`text-center mb-4 ${tier.isPopular ? "mt-5" : ""}`}>
                <h3 className="text-[2.05rem] font-extrabold text-brand">{tier.name}</h3>
                <p className="text-[0.95rem] mt-1 text-charcoal-70">{tier.tagline}</p>
                <p className="text-[0.95rem] mt-2 text-charcoal">{tier.bestFor}</p>
              </div>

              <hr className="my-5 border-charcoal/10" />

              {/* Rooms */}
              <p className="text-[0.825rem] font-bold uppercase tracking-widest mb-6 text-charcoal-70 text-center">
                What&apos;s included
              </p>
              <ul className="space-y-2">
                {MASTER_ROOMS.map((item) => {
                  const checked = includedRooms.has(item.id);
                  return (
                    <li
                      key={item.id}
                      className={`flex items-center gap-2 text-[0.95rem] ${checked ? "text-charcoal" : "text-charcoal/30"}`}
                    >
                      {checked
                        ? <CheckCircle size={17} className="shrink-0 text-brand" />
                        : <Circle size={17} className="shrink-0 text-charcoal/25" />
                      }
                      {item.label}
                    </li>
                  );
                })}
              </ul>

              {/* Deluxe extras */}
              <div className="mt-5">
                <hr className="mb-5 border-charcoal/10" />
                <p className="text-[0.825rem] font-bold uppercase tracking-widest mb-6 text-charcoal-70 text-center">
                  Plus deluxe extras
                </p>
                <ul className="space-y-2">
                  {MASTER_EXTRAS.map((item) => {
                    const checked = includedExtras.has(item.id);
                    return (
                      <li
                        key={item.id}
                        className={`flex items-center gap-2 text-[0.95rem] ${checked ? "text-charcoal" : "text-charcoal/30"}`}
                      >
                        {checked
                          ? <CheckCircle size={17} className="shrink-0 text-brand" />
                          : <Circle size={17} className="shrink-0 text-charcoal/25" />
                        }
                        {item.label}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-7 w-full bg-brand text-white font-semibold py-4 rounded-full text-center text-[1.1rem]">
                {tier.ctaLabel}
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
