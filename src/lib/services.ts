import { Home, Briefcase, Sparkles, Truck, Star, type LucideIcon } from "lucide-react";

export type Service = {
  href: string;
  icon: LucideIcon;
  title: string;
  copy: string;
};

export const services: Service[] = [
  { href: "/services/residential-cleaning",       icon: Home,      title: "Residential Cleaning",      copy: "Regular maintenance, deep cleans, and special requests for the homes you live in and love." },
  { href: "/services/commercial-cleaning",        icon: Briefcase, title: "Commercial Cleaning",        copy: "Offices, storefronts, and professional suites. Schedules built around your business hours." },
  { href: "/services/deep-cleaning",              icon: Sparkles,  title: "Deep Cleaning",              copy: "Top-to-bottom detailing for first-time cleans, seasonal resets, and pre-guest refreshes." },
  { href: "/services/move-in-move-out",            icon: Truck,     title: "Move In / Move Out",         copy: "Empty-home deep cleans for buyers, sellers, and renters — whether you're arriving or handing back the keys." },
  { href: "/services/airbnb-cleaning",            icon: Star,      title: "Airbnb & STR Cleaning",      copy: "Rapid guest turnovers for Shore rentals — linen handling, restocking, same-day." },
  { href: "/services/post-construction-cleaning", icon: Sparkles,  title: "Post-Construction Cleaning", copy: "Multi-pass fine dust removal, HVAC vents, and contractor-ready scheduling." },
];
