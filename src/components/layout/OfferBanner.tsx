import { ACTIVE_OFFER, isOfferActive } from "@/lib/offer";

export default function OfferBanner() {
  if (!isOfferActive(ACTIVE_OFFER)) return null;

  const offer = ACTIVE_OFFER;

  return (
    <div className="bg-brand border-b border-brand-dark/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 text-center">
        <p className="text-xs font-semibold text-charcoal">
          {offer.emoji} {offer.message}{" "}
          <a
            href={offer.ctaHref}
            className="underline underline-offset-2 hover:text-charcoal/70 transition-colors"
          >
            {offer.ctaLabel}
          </a>
        </p>
      </div>
    </div>
  );
}
