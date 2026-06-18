export interface MasterItem {
  id: string;
  label: string;
}

export const MASTER_ROOMS: MasterItem[] = [
  { id: "kitchen", label: "Kitchen" },
  { id: "primary-bathroom", label: "Primary Bathroom" },
  { id: "living-room", label: "Living Room" },
  { id: "main-floors", label: "Main-level Floors" },
  { id: "primary-bedroom", label: "Primary Bedroom" },
  { id: "secondary-bathroom", label: "Secondary Bathroom" },
  { id: "dining-room", label: "Dining Room" },
  { id: "all-bedrooms", label: "All Bedrooms" },
  { id: "family-room", label: "Family Room" },
  { id: "office", label: "Office" },
  { id: "laundry-room", label: "Laundry Room" },
  { id: "hallways", label: "Hallways & Entryways" },
  { id: "entire-home-floors", label: "Entire Home Floors" },
  { id: "all-other-rooms", label: "All Other Rooms" },
];

export const MASTER_EXTRAS: MasterItem[] = [
  { id: "interior-windows", label: "Interior Windows" },
  { id: "appliances", label: "Inside Appliances (Oven/Fridge)" },
  { id: "baseboards", label: "Baseboards & Door Frames" },
  { id: "cabinet-fronts", label: "Inside Cabinet Fronts" },
];

export interface Tier {
  id: "glow" | "signature-glow" | "full-glow";
  name: string;
  tagline: string;
  bestFor: string;
  includedRooms: string[];
  bonusExtras: string[] | null;
  includedRoomIds: string[];
  includedExtraIds: string[];
  isPopular: boolean;
  ctaLabel: string;
  sizeFitMaxSqft: number | null;
  photoSrc?: string;
}

export const TIERS: Tier[] = [
  {
    id: "glow",
    name: "Glow",
    tagline: "3 rooms cleaned",
    bestFor: "Condos, smaller homes, and regular maintenance cleaning.",
    includedRooms: [
      "Kitchen",
      "Primary Bathroom",
      "Living Room",
      "Primary Bedroom",
      "Main-level floors",
    ],
    bonusExtras: null,
    includedRoomIds: ["kitchen", "primary-bathroom", "living-room", "primary-bedroom", "main-floors"],
    includedExtraIds: [],
    isPopular: false,
    ctaLabel: "Select this Glow",
    sizeFitMaxSqft: 1500,
    photoSrc: undefined,
  },
  {
    id: "signature-glow",
    name: "Signature Glow",
    tagline: "5 rooms cleaned",
    bestFor: "Most homes — busy families and on-the-go professionals.",
    includedRooms: [
      "Kitchen",
      "Primary Bathroom",
      "Secondary Bathroom",
      "Living Room",
      "Dining Room",
      "All Bedrooms",
      "Main-level floors",
    ],
    bonusExtras: null,
    includedRoomIds: [
      "kitchen",
      "primary-bathroom",
      "secondary-bathroom",
      "living-room",
      "dining-room",
      "all-bedrooms",
      "main-floors",
    ],
    includedExtraIds: [],
    isPopular: true,
    ctaLabel: "Select this Glow",
    sizeFitMaxSqft: 2800,
    photoSrc: undefined,
  },
  {
    id: "full-glow",
    name: "Full Glow",
    tagline: "All rooms cleaned",
    bestFor: "Larger homes, pre-event resets, and allergy or pet households.",
    includedRooms: [
      "Kitchen",
      "All Bathrooms",
      "Living Room",
      "Dining Room",
      "Family Room",
      "All Bedrooms",
      "Office",
      "Laundry Room",
      "Hallways",
      "All Other Rooms",
      "Entire Home Floors",
    ],
    bonusExtras: [
      "Interior windows",
      "Inside appliance cleaning (oven/fridge)",
      "Baseboards & door frames",
      "Inside cabinet fronts",
    ],
    includedRoomIds: [
      "kitchen",
      "primary-bathroom",
      "living-room",
      "main-floors",
      "primary-bedroom",
      "secondary-bathroom",
      "dining-room",
      "all-bedrooms",
      "family-room",
      "office",
      "laundry-room",
      "hallways",
      "entire-home-floors",
      "all-other-rooms",
    ],
    includedExtraIds: ["interior-windows", "appliances", "baseboards", "cabinet-fronts"],
    isPopular: false,
    ctaLabel: "Select this Glow",
    sizeFitMaxSqft: null,
    photoSrc: undefined,
  },
];

export function getTierById(id: string): Tier | undefined {
  return TIERS.find((t) => t.id === id);
}

export function recommendTierBySqft(sqft: number): Tier {
  return (
    TIERS.find((t) => t.sizeFitMaxSqft !== null && t.sizeFitMaxSqft >= sqft) ??
    TIERS[TIERS.length - 1]
  );
}
