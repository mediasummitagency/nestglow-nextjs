"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Circle, ChevronDown, ChevronUp } from "lucide-react";
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="mt-8">
      {(heading || subtitle) && (
        <div className="text-center mb-10 md:mb-16">
          {heading && (
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-3 ${dark ? "text-cream" : "text-charcoal"}`}>
              {heading}
            </h2>
          )}
          {subtitle && (
            <p className={`max-w-2xl mx-auto ${dark ? "text-cream/70" : "text-charcoal-70"}`}>{subtitle}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 max-w-[88%] mx-auto md:max-w-5xl">
        {TIERS.map((tier) => {
          const url =
            `/book?tier=${tier.id}` +
            (zip ? `&zip=${zip}` : "") +
            (town ? `&town=${encodeURIComponent(town)}` : "");

          const includedRooms = new Set(tier.includedRoomIds);
          const includedExtras = new Set(tier.includedExtraIds);
          const isExpanded = expandedId === tier.id;

          const cardClass = tier.isPopular
            ? "relative flex flex-col bg-cream-50 border-2 border-brand shadow-xl rounded-2xl md:scale-105 transition-all duration-200 hover:shadow-[0_16px_60px_rgba(79,172,254,0.45)] min-h-[520px] md:min-h-[420px]"
            : "relative flex flex-col bg-white border border-charcoal/12 shadow-md rounded-2xl transition-all duration-200 hover:shadow-xl hover:border-brand/40 min-h-[520px] md:min-h-[420px]";

          const circleClass = tier.isPopular
            ? "absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden z-10 bg-gradient-to-br from-brand/10 to-brand/20"
            : "absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden z-10 bg-gradient-to-br from-cream-100 to-brand/8";

          return (
            <div key={tier.id} className="pt-16">
              <div className={cardClass}>

                {tier.isPopular && (
                  <span className="absolute top-0 right-0 bg-brand text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl z-10">
                    Most Popular
                  </span>
                )}

                {/* Circle — half above card top edge, half inside */}
                <div className={circleClass}>
                  {tier.photoSrc && (
                    <Image
                      src={tier.photoSrc}
                      alt={tier.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  )}
                </div>

                {/* Header — pt-20 clears the half-circle (64px) + breathing room */}
                <div className="text-center px-6 pt-20 pb-4">
                  <h3 className="text-[2rem] font-extrabold text-brand mt-[10px]">{tier.name}</h3>
                  <p className="text-base font-semibold text-charcoal mt-[78px]">{tier.tagline}</p>
                  <p className="text-[0.9rem] mt-2 text-charcoal leading-snug">{tier.bestFor}</p>
                </div>

                {/* Divider + checklist + toggle + CTA — floated to bottom */}
                <div className="mt-auto flex flex-col">

                <div className="px-6 pb-2">
                  <hr className="border-charcoal/10" />
                </div>

                {/* Checklist — hidden on mobile until toggled, always shown on desktop */}
                <div className={`px-6 ${isExpanded ? "block" : "hidden"} md:block`}>
                  <p className="text-[0.8rem] font-bold uppercase tracking-widest mb-4 text-charcoal-70 text-center">
                    What&apos;s included
                  </p>
                  <ul className="space-y-2">
                    {MASTER_ROOMS.map((item) => {
                      const checked = includedRooms.has(item.id);
                      return (
                        <li
                          key={item.id}
                          className={`flex items-center gap-2 text-[0.9rem] ${checked ? "text-charcoal" : "text-charcoal/25"}`}
                        >
                          {checked
                            ? <CheckCircle size={16} className="shrink-0 text-brand" />
                            : <Circle size={16} className="shrink-0 text-charcoal/20" />
                          }
                          {item.label}
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-5">
                    <hr className="mb-5 border-charcoal/10" />
                    <p className="text-[0.8rem] font-bold uppercase tracking-widest mb-4 text-charcoal-70 text-center">
                      Plus deluxe extras
                    </p>
                    <ul className="space-y-2">
                      {MASTER_EXTRAS.map((item) => {
                        const checked = includedExtras.has(item.id);
                        return (
                          <li
                            key={item.id}
                            className={`flex items-center gap-2 text-[0.9rem] ${checked ? "text-charcoal" : "text-charcoal/25"}`}
                          >
                            {checked
                              ? <CheckCircle size={16} className="shrink-0 text-brand" />
                              : <Circle size={16} className="shrink-0 text-charcoal/20" />
                            }
                            {item.label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <hr className="mt-5 border-charcoal/10" />
                </div>

                {/* Toggle — mobile only, right above CTA */}
                <div className="px-6 py-3 md:hidden">
                  <button
                    className="w-full text-sm font-semibold text-brand flex items-center justify-center gap-1 underline underline-offset-2"
                    onClick={() => setExpandedId(isExpanded ? null : tier.id)}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? "Hide what's included" : "Click to see what's included"}
                    {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                </div>

                {/* CTA */}
                <div className="px-6 pt-6 pb-12">
                  <Link
                    href={url}
                    className="block w-full bg-brand text-white font-semibold py-4 rounded-full text-center text-[1rem] hover:bg-brand-dark transition-colors"
                    onClick={() => pushTierClick(tier.id, tier.name)}
                  >
                    {tier.ctaLabel}
                  </Link>
                </div>

                </div> {/* end mt-auto group */}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
