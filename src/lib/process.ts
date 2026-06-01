export interface ProcessCategory {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  description: string;
  items: string[];
}

export const SIGNATURE_PROCESS_NAME = "The NestGlow Signature Clean";

export const SIGNATURE_PROCESS: ProcessCategory[] = [
  {
    id: "kitchen",
    title: "Kitchen",
    icon: "UtensilsCrossed",
    description: "Every surface scrubbed, sanitized, and streak-free.",
    items: [
      "Counters scrubbed, sanitized, and shining",
      "Sink and faucets polished — no water spots",
      "Stovetop and appliance exteriors wiped down",
      "Cabinet fronts de-greased and streak-free",
      "Floor mopped thoroughly, edges included",
    ],
  },
  {
    id: "bathrooms",
    title: "Bathrooms",
    icon: "Droplets",
    description: "Disinfected top to bottom — no soap scum, no streaks.",
    items: [
      "Toilet disinfected inside and out",
      "Tub and shower scrubbed, no soap scum",
      "Mirror polished — no streaks or smears",
      "Sink and faucet sanitized and dried",
      "Floor scrubbed and baseboards wiped",
    ],
  },
  {
    id: "bedrooms",
    title: "Bedrooms",
    icon: "Moon",
    description: "Dusted, vacuumed, and put back exactly as you left it.",
    items: [
      "All surfaces dusted, including hard-to-reach spots",
      "Mirrors and glass cleaned streak-free",
      "Floors vacuumed or swept and mopped",
      "Bedside tables and furniture wiped down",
      "Everything back in place, exactly as you left it",
    ],
  },
  {
    id: "living-areas",
    title: "Living Areas",
    icon: "Sofa",
    description: "Floors, furniture, and every surface — done right.",
    items: [
      "Furniture wiped and cushions straightened",
      "All surfaces dusted — shelves, frames, trim",
      "Floors vacuumed and mopped",
      "Entryway swept and tidied",
      "Window sills and ledges wiped clean",
    ],
  },
  {
    id: "finishing-touches",
    title: "Finishing Touches",
    icon: "Sparkles",
    description: "The final pass that makes the whole home feel complete.",
    items: [
      "Light switches and doorknobs wiped",
      "Trash emptied and liners replaced",
      "Final walk-through to spot-check",
      "Doormat shaken/vacuumed",
      "Air freshened where appropriate",
    ],
  },
];

export const SIGNATURE_PROCESS_COUNT: number = SIGNATURE_PROCESS.reduce(
  (sum, category) => sum + category.items.length,
  0
);

export function formatProcessTagline(): string {
  return `${SIGNATURE_PROCESS_NAME} — ${SIGNATURE_PROCESS_COUNT} things we do in every home`;
}
