"use client";

const ITEMS = [
  "SAME TEAM EVERY VISIT",
  "FIRM PRICING UPFRONT",
  "INSURED & BONDED",
  "24-HOUR GUARANTEE",
  "ECO PRODUCTS ON REQUEST",
  "ON-TIME, EVERY TIME",
];

export function BridgeMarquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="bg-brand-dark overflow-hidden py-4 select-none">
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ animation: "marquee-scroll 35s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-sm font-bold tracking-widest uppercase text-cream px-6">
              {item}
            </span>
            <span className="text-brand/60 text-xs">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
