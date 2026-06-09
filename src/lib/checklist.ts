export type RoomChecklist = {
  room: string;
  items: string[];
};

export const roomChecklist: RoomChecklist[] = [
  {
    room: "Kitchen",
    items: [
      "Stovetop degreased",
      "Cabinet fronts wiped",
      "Table and chairs cleaned",
      "Floor vacuumed and mopped",
      "Trash emptied and bin wiped",
      "Microwave cleaned inside and out",
      "Sink scrubbed, disinfected, and shined",
      "Countertops and backsplash cleaned and disinfected",
      "Appliance exteriors wiped down (interiors on request)",
    ],
  },
  {
    room: "Bathrooms",
    items: [
      "Trash emptied",
      "Chrome fixtures shined",
      "Floor vacuumed and mopped",
      "Mirrors cleaned streak-free",
      "Towels folded and straightened",
      "Toilet disinfected inside and out",
      "Countertops cleared, wiped, and reset",
      "Sink and vanity cleaned and disinfected",
      "Tub and shower scrubbed, disinfected, and rinsed",
    ],
  },
  {
    room: "Bedrooms",
    items: [
      "Trash emptied",
      "Baseboards dusted",
      "Windowsills wiped",
      "Mirrors and glass cleaned",
      "General tidy and straighten",
      "Switch plates and door frames wiped",
      "Beds made (linens changed on request)",
      "Furniture dusted — tops, fronts, and surfaces",
      "Floors vacuumed and/or mopped, under bed where reachable",
    ],
  },
  {
    room: "Living Areas",
    items: [
      "Baseboards dusted",
      "Surfaces and shelves dusted",
      "Hallways and stairs vacuumed",
      "Floors vacuumed and/or mopped",
      "Upholstered furniture vacuumed",
      "Trash emptied and general tidy",
      "Cushions fluffed and straightened",
      "Picture frames and decor dusted",
      "Fingerprints removed from woodwork and switch plates",
    ],
  },
];

export type AddOn = {
  title: string;
  body: string;
};

export const addOns: AddOn[] = [
  {
    title: "Inside-Oven Cleaning",
    body: "Skip the scrubbing on hands and knees. We clean the inside of your oven down to the racks so it's ready for your next meal — just add it to your booking notes.",
  },
  {
    title: "Inside-Fridge Cleaning",
    body: "Shelves, drawers, and seals wiped and sanitized so the place that holds your food is actually clean. A great add-on before a big grocery run or after the holidays.",
  },
  {
    title: "Interior Window Cleaning",
    body: "Glass, sills, and tracks cleaned so more light gets in. Add interior windows to any deep clean for a noticeably brighter space.",
  },
];
