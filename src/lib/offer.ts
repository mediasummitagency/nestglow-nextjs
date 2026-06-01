export interface Offer {
  enabled: boolean;
  emoji: string;
  message: string;
  ctaLabel: string;
  ctaHref: string;
  expiresAt: string | null; // ISO date string — set to null to never auto-expire
}

export const ACTIVE_OFFER: Offer = {
  enabled: true,
  emoji: "✨",
  message: "$25 off your first clean — no contract, no commitment.",
  ctaLabel: "Book now",
  ctaHref: "/book",
  expiresAt: null,
};

export function isOfferActive(offer: Offer): boolean {
  if (!offer.enabled) return false;
  if (offer.expiresAt === null) return true;
  return new Date(offer.expiresAt) > new Date();
}
