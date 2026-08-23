import { Home, Sparkles, Truck, Star, type LucideIcon } from "lucide-react";

/**
 * The service set, rendered as cards on the home page.
 *
 * Four cards, not six. Lucas confirmed 2026-08-22 that Caroline's main services are
 * residential (recurring) and Airbnb/rental turnovers, so **Commercial Cleaning and
 * Post-Construction were removed** — they were built on an assumption and she does not
 * sell them. Do not add them back without asking her. Deep Cleaning and Move In / Move
 * Out are kept as residential variants, not separate lines of business.
 *
 * Order is deliberate: the two mains lead, the two residential add-ons follow.
 *
 * These deliberately carry no `href`. The six standalone service pages were
 * parked before launch (see
 * projects/summit-media/clients/nestglow/website/parked-for-phase-2/), so the
 * card copy has to answer "do you do my job?" on its own rather than defer to
 * a page behind a link. `detail` is the second line that does that work.
 *
 * When a service earns its own page again, add `href` back here and the grid
 * on the home page can start linking out.
 */
export type Service = {
  icon: LucideIcon;
  title: string;
  copy: string;
  detail: string;
};

export const services: Service[] = [
  {
    icon: Home,
    title: "Regular Home Cleaning",
    copy: "Weekly, bi-weekly, or monthly upkeep for homes that stay lived-in.",
    detail:
      "Kitchens, bathrooms, bedrooms and living areas every visit — surfaces, floors, mirrors, fixtures and trash. Same team each time, so nobody has to be re-taught how you like things.",
  },
  {
    icon: Star,
    title: "Airbnb & Rental Turnovers",
    copy: "Fast, reliable changeovers for Shore short-term rentals.",
    detail:
      "Between-guest resets with linen handling, restocking and a photo check before the next arrival. Same-day turnovers available through the summer season.",
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    copy: "The reset a regular clean skips. Most first-time clients start here.",
    detail:
      "Inside the oven and fridge, cabinet fronts, backsplash and grout, baseboards, door frames, vents and light switches. Built for a first clean, a seasonal reset, or the week before guests arrive.",
  },
  {
    icon: Truck,
    title: "Move In / Move Out",
    copy: "Empty-home cleans for buyers, sellers, renters and landlords.",
    detail:
      "Every cabinet and drawer inside and out, appliances, closets, and floors with nothing in the way. Timed around your closing or handover so the place is deposit-ready or day-one fresh.",
  },
];
