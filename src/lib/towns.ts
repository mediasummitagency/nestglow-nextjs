export type TownFAQ = {
  question: string;
  answer: string;
};

export type TownData = {
  slug: string;
  name: string;
  county: "Monmouth" | "Ocean" | "Middlesex";
  state: "NJ";
  metaTitle: string;
  metaDescription: string;
  h1: string;
  introParagraph: string;
  localHook: string;
  faqs: TownFAQ[];
  nearbyTowns: string[];
  zipCodes: string[];
};

export function getTownBySlug(slug: string): TownData | undefined {
  return towns.find((t) => t.slug === slug);
}

export function getTownsByCounty(county: TownData["county"]): TownData[] {
  return towns.filter((t) => t.county === county);
}

export const towns: TownData[] = [
  // ─── MONMOUTH COUNTY ──────────────────────────────────────────────────

  {
    slug: "neptune-city-nj",
    name: "Neptune City",
    county: "Monmouth",
    state: "NJ",
    metaTitle: "House Cleaning in Neptune City, NJ | NestGlow Co",
    metaDescription: "Professional house cleaning in Neptune City, NJ. Weekly, bi-weekly, and one-time deep cleans. Insured, bonded, guaranteed. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Neptune City, NJ",
    introParagraph: "NestGlow Co provides residential and commercial cleaning services in Neptune City, NJ. Our team handles weekly maintenance, deep cleans, and move in/out services across the borough — insured, bonded, and backed by a 24-hour satisfaction guarantee.",
    localHook: "Neptune City homes — from the blocks near Memorial Park to Sylvania Avenue — benefit from consistent, detail-oriented cleaning from a team that's local to the area.",
    faqs: [
      { question: "How much does house cleaning cost in Neptune City, NJ?", answer: "Most Neptune City homes fall between $120-$250 for a standard clean, depending on bedroom count, bathroom count, and square footage. Deep cleans and move-out cleans price higher. Submit our booking form and we'll return a firm quote before any cleaning begins." },
      { question: "How often should I schedule cleaning in Neptune City?", answer: "Most of our Neptune City clients book bi-weekly or weekly. Families with kids or pets typically go weekly; smaller households do well with bi-weekly. We'll adjust based on your needs — no contracts required." },
      { question: "Does NestGlow Co serve Neptune City, NJ?", answer: "Yes — Neptune City is one of our core service areas. We work in the borough regularly and can typically confirm an appointment within 24 hours of a booking request." },
      { question: "Do you offer commercial cleaning in Neptune City?", answer: "Yes. We clean offices, retail storefronts, and professional suites throughout Neptune City. Commercial pricing is custom — we schedule a brief walk-through before providing a quote." },
      { question: "What neighborhoods in Neptune City do you cover?", answer: "We cover all of Neptune City Borough — including the streets near Memorial Park, Sylvania Avenue, 3rd Avenue corridor, and throughout the borough's compact residential areas." },
    ],
    nearbyTowns: ["neptune-nj", "bradley-beach-nj", "asbury-park-nj"],
    zipCodes: ["07753"],
  },

  {
    slug: "neptune-nj",
    name: "Neptune",
    county: "Monmouth",
    state: "NJ",
    metaTitle: "House Cleaning in Neptune, NJ | NestGlow Co",
    metaDescription: "House cleaning services in Neptune Township, NJ. Weekly, bi-weekly, and one-time cleans. Insured and bonded. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Neptune, NJ",
    introParagraph: "NestGlow Co provides residential and commercial cleaning in Neptune Township, NJ. From Ocean Grove's historic homes to Shark River Hills and the Route 33 corridor, our team delivers consistent, insured, and bonded cleaning service across the township.",
    localHook: "Neptune Township's mix of historic Ocean Grove cottages and mid-century homes benefit from our detailed approach to older properties.",
    faqs: [
      { question: "How much does house cleaning cost in Neptune, NJ?", answer: "Most Neptune Township homes fall between $140-$300 per clean, depending on home size and scope. Larger homes in Shark River Hills and deep cleans on older Ocean Grove properties typically price at the upper end of that range." },
      { question: "Do you serve Ocean Grove specifically?", answer: "Yes — Ocean Grove is part of Neptune Township and is within our service area. We clean in Ocean Grove regularly and are familiar with the older housing stock, which often needs more detailed care." },
      { question: "Does NestGlow Co serve Neptune, NJ?", answer: "Yes — Neptune Township is in our core service area. We cover the entire township including Ocean Grove, Shark River Hills, and the residential sections off Neptune Boulevard." },
      { question: "How soon can you schedule a cleaning in Neptune?", answer: "We can typically schedule a first clean within 3-5 business days, sometimes sooner. Same-day cleaning is available for an additional fee when our schedule allows." },
      { question: "What areas of Neptune Township do you cover?", answer: "All of Neptune Township — Ocean Grove, Shark River Hills, Neptune proper, and the Route 33 and Route 66 residential corridors." },
    ],
    nearbyTowns: ["neptune-city-nj", "bradley-beach-nj", "asbury-park-nj"],
    zipCodes: ["07753"],
  },

  {
    slug: "asbury-park-nj",
    name: "Asbury Park",
    county: "Monmouth",
    state: "NJ",
    metaTitle: "House Cleaning in Asbury Park, NJ | NestGlow Co",
    metaDescription: "House cleaning in Asbury Park, NJ. Regular service, deep cleans, move in/out. Historic homes and short-term rentals welcome. Insured. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Asbury Park, NJ",
    introParagraph: "NestGlow Co provides residential and short-term rental cleaning services in Asbury Park, NJ. Our team handles historic Victorian homes, renovated condos, and Airbnb turnover cleans across the city — insured, bonded, and flexible with shore rental schedules.",
    localHook: "Asbury Park's mix of historic homes, renovated downtown units, and short-term rentals benefit from a cleaning team familiar with both residential detail and rental turnover pace.",
    faqs: [
      { question: "How much does cleaning cost in Asbury Park, NJ?", answer: "Asbury Park cleanings typically range $140-$300 depending on property size and scope. Short-term rental turnovers are often quoted per-visit based on bedroom count and turnover timing." },
      { question: "Do you clean Airbnbs and short-term rentals in Asbury Park?", answer: "Yes. Short-term rental turnover cleaning is a regular part of our Asbury Park work. We can coordinate with your check-out/check-in windows and provide consistent quality for guests between bookings." },
      { question: "Does NestGlow Co serve Asbury Park, NJ?", answer: "Yes — Asbury Park is in our core service area. We work throughout the city including the historic West Side, the downtown blocks, and the oceanfront properties." },
      { question: "Can you clean historic Asbury Park homes with original details?", answer: "Yes. Our team is experienced with older homes — Victorian woodwork, original tile, and historic detailing. We adjust our products and technique to protect delicate surfaces while still delivering a thorough clean." },
      { question: "What neighborhoods in Asbury Park do you cover?", answer: "All of Asbury Park — the West Side historic blocks, downtown/Cookman Avenue area, Main Street corridor, and the oceanfront properties along Ocean Avenue." },
    ],
    nearbyTowns: ["bradley-beach-nj", "neptune-nj", "neptune-city-nj"],
    zipCodes: ["07712"],
  },

  {
    slug: "bradley-beach-nj",
    name: "Bradley Beach",
    county: "Monmouth",
    state: "NJ",
    metaTitle: "House Cleaning in Bradley Beach, NJ | NestGlow Co",
    metaDescription: "House cleaning services in Bradley Beach, NJ. Year-round and seasonal homes, Airbnb turnover. Insured. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Bradley Beach, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services in Bradley Beach, NJ — for year-round residents, seasonal homeowners, and short-term rental properties. Our team is insured, bonded, and familiar with the tight coordination that shore properties often require between rentals.",
    localHook: "Bradley Beach's mix of year-round residents and seasonal rental properties benefits from a cleaning team that can coordinate turnover schedules with minimal fuss.",
    faqs: [
      { question: "How much does cleaning cost in Bradley Beach, NJ?", answer: "Most Bradley Beach homes fall in the $140-$280 range depending on size and scope. Short-term rental turnovers are priced per-visit based on bedroom count and whether linens are included." },
      { question: "Do you handle seasonal rental turnovers in Bradley Beach?", answer: "Yes. Rental turnovers are a regular part of our summer schedule here. We can coordinate with your check-in/check-out windows and provide consistent quality between guests." },
      { question: "Does NestGlow Co serve Bradley Beach, NJ?", answer: "Yes — Bradley Beach is in our service area. We work in the borough year-round and can schedule quickly during shoulder seasons." },
      { question: "Can you clean bay-side or beach-side homes with salt air concerns?", answer: "Yes. Our team is familiar with shore-climate concerns — humidity, salt-air residue on windows and fixtures, sand tracked indoors. We adjust our routine to address these specifically." },
      { question: "How far in advance should I book a summer rental turnover?", answer: "For summer (June-August), we recommend booking your rental turnover schedule by early May. Winter and spring bookings are typically easier to schedule within 1-2 weeks." },
    ],
    nearbyTowns: ["asbury-park-nj", "neptune-nj", "neptune-city-nj"],
    zipCodes: ["07720"],
  },

  {
    slug: "red-bank-nj",
    name: "Red Bank",
    county: "Monmouth",
    state: "NJ",
    metaTitle: "House Cleaning in Red Bank, NJ | NestGlow Co",
    metaDescription: "House cleaning in Red Bank, NJ. Weekly, bi-weekly, and deep cleans for homes and apartments. Insured, bonded, guaranteed. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Red Bank, NJ",
    introParagraph: "NestGlow Co provides residential and commercial cleaning services in Red Bank, NJ. Our team cleans apartments, single-family homes, and professional offices throughout the borough — insured, bonded, and backed by a satisfaction guarantee.",
    localHook: "Red Bank's mix of downtown apartments, older Victorian homes, and professional offices keeps our team busy year-round with a varied weekly rotation.",
    faqs: [
      { question: "How much does house cleaning cost in Red Bank, NJ?", answer: "Most Red Bank homes fall in the $130-$280 range. Downtown apartments typically price at the lower end; older multi-bedroom Victorians in the West Side area price at the upper end." },
      { question: "Do you clean offices in Red Bank?", answer: "Yes — commercial office cleaning in Red Bank is a regular part of our work. We can schedule after-hours or weekend service to avoid disrupting your business, and provide custom pricing after a walk-through." },
      { question: "Does NestGlow Co serve Red Bank, NJ?", answer: "Yes — Red Bank is in our core service area. We work in the borough regularly and typically have shorter scheduling waits here than in more rural Monmouth County towns." },
      { question: "Do you clean short-term rentals in Red Bank?", answer: "Yes. We handle short-term rental and Airbnb turnovers in Red Bank, coordinating with check-in/check-out schedules to keep your property guest-ready." },
      { question: "What neighborhoods in Red Bank do you cover?", answer: "All of Red Bank Borough — the West Side Victorian blocks, downtown apartments, the Mechanic Street and Maple Avenue areas, and the residential streets east of downtown." },
    ],
    nearbyTowns: ["middletown-nj", "holmdel-nj", "neptune-city-nj"],
    zipCodes: ["07701"],
  },

  {
    slug: "middletown-nj",
    name: "Middletown",
    county: "Monmouth",
    state: "NJ",
    metaTitle: "House Cleaning in Middletown, NJ | NestGlow Co",
    metaDescription: "House cleaning in Middletown Township, NJ. Family homes, deep cleans, pre-listing prep. Insured. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Middletown, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services throughout Middletown Township, NJ. Our team handles weekly and bi-weekly maintenance cleans, deep cleans, and pre-listing prep across Lincroft, Leonardo, Navesink, and the rest of the township — fully insured and bonded.",
    localHook: "Middletown's sprawling township covers a wide range of home sizes — from smaller Belford capes to larger Lincroft colonials — and our team scales service accordingly.",
    faqs: [
      { question: "How much does house cleaning cost in Middletown, NJ?", answer: "Middletown cleanings typically range $150-$320 depending on property size. Larger 3-4 bedroom homes in Lincroft and Navesink price at the upper end; smaller homes in Belford and Port Monmouth are lower." },
      { question: "Do you clean pre-listing for real estate in Middletown?", answer: "Yes. Pre-listing deep cleans are a regular part of our Middletown work. We can coordinate timing with your real estate agent and schedule around showings." },
      { question: "Does NestGlow Co serve Middletown, NJ?", answer: "Yes — we cover all of Middletown Township including Lincroft, Leonardo, Navesink, Belford, Port Monmouth, and Middletown proper." },
      { question: "How far in advance should I book regular cleaning in Middletown?", answer: "For recurring bi-weekly or weekly service, we recommend booking at least 1-2 weeks in advance. One-time deep cleans can often be scheduled within 3-5 days." },
      { question: "What areas of Middletown do you cover?", answer: "All of Middletown Township — Lincroft, Navesink, Leonardo, Port Monmouth, Belford, Middletown proper, and the Route 35 corridor communities." },
    ],
    nearbyTowns: ["red-bank-nj", "holmdel-nj", "neptune-city-nj"],
    zipCodes: ["07748", "07758", "07718"],
  },

  {
    slug: "holmdel-nj",
    name: "Holmdel",
    county: "Monmouth",
    state: "NJ",
    metaTitle: "House Cleaning in Holmdel, NJ | NestGlow Co",
    metaDescription: "Professional house cleaning in Holmdel, NJ. Large-home specialists, deep cleans, recurring service. Insured and bonded. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Holmdel, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services in Holmdel, NJ — a community known for larger single-family homes that benefit from a detailed, consistent cleaning partner. Our team is insured, bonded, and experienced with the square footage and scope Holmdel properties typically involve.",
    localHook: "Holmdel homes — many of them larger colonials in the 2,500-4,000 sq ft range — benefit from a cleaning team that brings the right crew size for the job.",
    faqs: [
      { question: "How much does house cleaning cost in Holmdel, NJ?", answer: "Most Holmdel homes fall in the $180-$400 range per clean. Larger 4-5 bedroom colonials price higher; we give you a firm quote after you submit the booking form." },
      { question: "Can you handle larger homes in Holmdel?", answer: "Yes — larger homes are a regular part of our Holmdel work. We bring the crew size to match the scope so a 3,000+ sq ft home still gets done in a reasonable timeframe." },
      { question: "Does NestGlow Co serve Holmdel, NJ?", answer: "Yes — Holmdel is in our core service area. We work throughout the township including the Bell Works corridor, Longstreet Road estates, Holly Hills, and the Route 34 residential areas." },
      { question: "Do you offer deep cleaning for larger Holmdel homes?", answer: "Yes. Deep cleans in Holmdel typically take 6-10 hours depending on home size. We schedule with enough time to do the work thoroughly rather than rush through." },
      { question: "What neighborhoods in Holmdel do you cover?", answer: "We work throughout all of Holmdel — the Bell Works corridor, Longstreet Road area, Holly Hills, the Route 34 corridor, and homes near Holmdel Park." },
    ],
    nearbyTowns: ["middletown-nj", "colts-neck-nj", "red-bank-nj", "marlboro-nj"],
    zipCodes: ["07733"],
  },

  {
    slug: "colts-neck-nj",
    name: "Colts Neck",
    county: "Monmouth",
    state: "NJ",
    metaTitle: "House Cleaning in Colts Neck, NJ | NestGlow Co",
    metaDescription: "Professional house cleaning in Colts Neck, NJ. Estate-sized homes, deep cleans, insured team. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Colts Neck, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services in Colts Neck, NJ. Our team handles estate-sized colonials, custom-built homes, and rural residential properties throughout the township — with the crew size and detail orientation these larger homes require.",
    localHook: "Colts Neck homes often exceed 3,000 square feet, and the right cleaning team brings a crew sized to the scope rather than stretching a solo visit over many hours.",
    faqs: [
      { question: "How much does house cleaning cost in Colts Neck, NJ?", answer: "Colts Neck cleanings typically range $250-$500+ per visit depending on home size. Estates over 4,000 sq ft price higher; we'll give you a firm number after you submit the booking form." },
      { question: "Can you handle estate-sized homes in Colts Neck?", answer: "Yes. Larger homes are a regular part of our Colts Neck work. We scale the crew to match the square footage so the job gets done efficiently." },
      { question: "Does NestGlow Co serve Colts Neck, NJ?", answer: "Yes — Colts Neck is in our service area. We work throughout the township including the Laird Road estates, Route 537 corridor homes, and throughout the rural residential areas." },
      { question: "Do you offer recurring service in Colts Neck?", answer: "Yes. Most of our Colts Neck clients book bi-weekly or weekly recurring service. We can set up a consistent schedule and assign the same team members each visit for continuity." },
      { question: "What neighborhoods in Colts Neck do you cover?", answer: "All of Colts Neck Township — Laird Road estates, Route 537 corridor, the Grand Tour neighborhood, and throughout the township's rural residential areas." },
    ],
    nearbyTowns: ["holmdel-nj", "marlboro-nj", "freehold-nj"],
    zipCodes: ["07722"],
  },

  {
    slug: "marlboro-nj",
    name: "Marlboro",
    county: "Monmouth",
    state: "NJ",
    metaTitle: "House Cleaning in Marlboro, NJ | NestGlow Co",
    metaDescription: "House cleaning in Marlboro, NJ. Family homes, large colonials, deep cleans. Insured, bonded. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Marlboro, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services throughout Marlboro, NJ — a family-focused township where large colonials and split-levels benefit from consistent weekly or bi-weekly cleaning service. Our team is insured, bonded, and familiar with the township's mix of developments.",
    localHook: "Marlboro's 1980s and 1990s colonial builds have the kind of square footage that benefits from a cleaning team that arrives with the right crew — not just one person trying to cover 3,000 square feet alone.",
    faqs: [
      { question: "How much does house cleaning cost in Marlboro, NJ?", answer: "Most Marlboro homes fall in the $180-$350 range per clean. Larger colonials with 4+ bedrooms price at the upper end; smaller homes or condos are lower." },
      { question: "Do you serve Morganville specifically?", answer: "Yes. Morganville is part of Marlboro Township and we work throughout that area regularly." },
      { question: "Does NestGlow Co serve Marlboro, NJ?", answer: "Yes — Marlboro is in our core Monmouth County service area. We work in the township regularly and can typically schedule new clients within a week." },
      { question: "Can you accommodate school-schedule cleaning in Marlboro?", answer: "Yes. Many of our Marlboro families prefer weekday mid-morning or afternoon cleaning — after drop-off, before pick-up. We can schedule around your family routine." },
      { question: "What neighborhoods in Marlboro do you cover?", answer: "All of Marlboro Township — Morganville, Robertsville, Old Marlboro, Marlboro Village, and the Route 9 corridor residential developments." },
    ],
    nearbyTowns: ["colts-neck-nj", "manalapan-nj", "freehold-nj", "holmdel-nj"],
    zipCodes: ["07746"],
  },

  {
    slug: "freehold-nj",
    name: "Freehold",
    county: "Monmouth",
    state: "NJ",
    metaTitle: "House Cleaning in Freehold, NJ | NestGlow Co",
    metaDescription: "House cleaning in Freehold, NJ. Older homes, rentals, and family residences. Insured team. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Freehold, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services across Freehold Borough and Freehold Township, NJ. From older Victorian-era homes on the east side of the borough to newer colonials throughout the township, our insured, bonded team delivers consistent service for weekly, bi-weekly, and one-time cleans.",
    localHook: "Freehold's mix of borough Victorians and township colonials keeps our team adaptable — older homes get more detailed care, newer builds get efficient routines.",
    faqs: [
      { question: "How much does house cleaning cost in Freehold, NJ?", answer: "Freehold cleanings typically range $140-$300 depending on property size and age. Older Victorian-era homes with more detailed work price at the upper end; newer colonials fall in the middle." },
      { question: "Do you serve both Freehold Borough and Freehold Township?", answer: "Yes — both. We cover both and can clarify based on your address when you book." },
      { question: "Does NestGlow Co serve Freehold, NJ?", answer: "Yes — Freehold is in our core service area. We work in the borough and township regularly and can typically schedule new clients within 3-5 business days." },
      { question: "Do you clean rental properties in Freehold?", answer: "Yes. Rental turnover cleaning in Freehold is a regular part of our work — both for landlords between tenants and for tenants ending a lease." },
      { question: "What neighborhoods in Freehold do you cover?", answer: "All of Freehold Borough and Freehold Township — including the historic streets near Court Street, Strathmore, Freehold Acres, the Elton-Adelphia Road corridor, and throughout the township's residential developments." },
    ],
    nearbyTowns: ["marlboro-nj", "manalapan-nj", "colts-neck-nj"],
    zipCodes: ["07728"],
  },

  // ─── OCEAN COUNTY ─────────────────────────────────────────────────────

  {
    slug: "toms-river-nj",
    name: "Toms River",
    county: "Ocean",
    state: "NJ",
    metaTitle: "House Cleaning in Toms River, NJ | NestGlow Co",
    metaDescription: "House cleaning in Toms River, NJ. Weekly, bi-weekly, and deep cleans. Insured, bonded. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Toms River, NJ",
    introParagraph: "NestGlow Co provides residential and commercial cleaning services throughout Toms River, NJ — Ocean County's largest municipality. Our insured, bonded team handles recurring maintenance, deep cleans, and move in/out services across the township.",
    localHook: "Toms River's scale — from Silverton to South Toms River to the riverside neighborhoods — means our team is in the area regularly and can typically schedule quickly.",
    faqs: [
      { question: "How much does house cleaning cost in Toms River, NJ?", answer: "Most Toms River homes fall in the $140-$320 range per clean. Smaller homes in older Toms River neighborhoods price at the lower end; larger newer builds price higher." },
      { question: "Does NestGlow Co serve Toms River, NJ?", answer: "Yes — Toms River is one of our primary Ocean County service areas. We cover the whole township including Silverton, South Toms River, Pine Beach-adjacent streets, and the riverside residential areas." },
      { question: "Do you offer commercial cleaning in Toms River?", answer: "Yes. Office and retail cleaning in Toms River is a regular part of our commercial work. We can provide custom quotes after a walk-through." },
      { question: "How often should I schedule cleaning in Toms River?", answer: "Most Toms River clients book bi-weekly. Families with kids or pets often go weekly; smaller households do well with bi-weekly or monthly." },
      { question: "What neighborhoods in Toms River do you cover?", answer: "All of Toms River — Silverton, Pine Beach-adjacent, Brookside, Cedar Gardens, Whispering Woods, South Toms River, and throughout the township's residential developments." },
    ],
    nearbyTowns: ["brick-nj", "berkeley-township-nj", "lacey-township-nj"],
    zipCodes: ["08753", "08755", "08757"],
  },

  {
    slug: "brick-nj",
    name: "Brick",
    county: "Ocean",
    state: "NJ",
    metaTitle: "House Cleaning in Brick, NJ | NestGlow Co",
    metaDescription: "House cleaning in Brick Township, NJ. Weekly, bi-weekly, deep cleans. Insured, bonded. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Brick, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services throughout Brick Township, NJ. Our team covers the whole township — from Herbertsville to Laurelton to Metedeconk — with insured, bonded cleaning for weekly, bi-weekly, and one-time deep cleans.",
    localHook: "Brick Township is one of the most active residential markets in Ocean County, and our team is in the area regularly enough to typically schedule new clients quickly.",
    faqs: [
      { question: "How much does house cleaning cost in Brick, NJ?", answer: "Most Brick homes fall in the $140-$300 range per clean. We give you a firm quote after you submit the booking form — no estimates over the phone." },
      { question: "Does NestGlow Co serve Brick, NJ?", answer: "Yes — Brick is one of our most active Ocean County service areas. We cover the whole township year-round." },
      { question: "Do you clean Airbnbs and short-term rentals in Brick?", answer: "Yes. Short-term rental cleaning in Brick is a regular part of our summer season work. We coordinate turnovers with check-in/check-out schedules." },
      { question: "Do you clean large family homes in Brick?", answer: "Yes. Our team handles homes from smaller capes to large colonials throughout the township. Crew size scales with home size." },
      { question: "What neighborhoods in Brick do you cover?", answer: "All of Brick Township — Herbertsville, Laurelton, Bricktown, Cedar Bridge, Lake Riviera, Adamston, Metedeconk, and the Route 88 and Route 70 corridor residential areas." },
    ],
    nearbyTowns: ["toms-river-nj", "point-pleasant-nj", "jackson-nj"],
    zipCodes: ["08723", "08724"],
  },

  {
    slug: "point-pleasant-nj",
    name: "Point Pleasant",
    county: "Ocean",
    state: "NJ",
    metaTitle: "House Cleaning in Point Pleasant, NJ | NestGlow Co",
    metaDescription: "Cleaning services in Point Pleasant, NJ. Year-round and seasonal homes, rental turnovers. Insured. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Point Pleasant, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services in Point Pleasant Beach and Point Pleasant Borough, NJ. Our team handles year-round homes, seasonal rental turnovers, and one-time deep cleans — insured, bonded, and coordinated around shore rental schedules.",
    localHook: "Point Pleasant's high-turnover rental market keeps our team coordinated with the check-in/check-out pace that shore properties require during peak season.",
    faqs: [
      { question: "How much does cleaning cost in Point Pleasant, NJ?", answer: "Most Point Pleasant cleanings fall in the $140-$300 range. Short-term rental turnovers are priced per-visit based on bedroom count and whether linens are included." },
      { question: "Do you handle summer rental turnovers in Point Pleasant?", answer: "Yes. Rental turnover cleaning is a large part of our Point Pleasant summer schedule. We can coordinate with your rental calendar and keep turnovers consistent between guests." },
      { question: "Does NestGlow Co serve Point Pleasant, NJ?", answer: "Yes — we serve both Point Pleasant Beach and Point Pleasant Borough. Shore properties are a significant part of our Ocean County work." },
      { question: "How far in advance should I book a summer rental turnover in Point Pleasant?", answer: "For peak summer (June-August), book by early May if possible. Shoulder seasons and winter are more flexible — typically 1-2 weeks in advance is enough." },
      { question: "What neighborhoods in Point Pleasant do you cover?", answer: "Both Point Pleasant Beach (Bay Avenue area, Arnold Avenue, the beach-side blocks) and Point Pleasant Borough (Mantoloking Road, Bridge Avenue, and the residential streets throughout)." },
    ],
    nearbyTowns: ["brick-nj", "toms-river-nj"],
    zipCodes: ["08742"],
  },

  {
    slug: "lacey-township-nj",
    name: "Lacey Township",
    county: "Ocean",
    state: "NJ",
    metaTitle: "House Cleaning in Lacey Township, NJ | NestGlow Co",
    metaDescription: "House cleaning in Lacey Township, NJ. Forked River, Lanoka Harbor. Insured team. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Lacey Township, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services in Lacey Township, NJ — including Forked River, Lanoka Harbor, and Bamber Lake. Our insured, bonded team handles weekly, bi-weekly, and one-time cleans across the township.",
    localHook: "Lacey Township's large residential lots and range of home sizes mean our team scales service to match what's actually in front of us.",
    faqs: [
      { question: "How much does cleaning cost in Lacey Township, NJ?", answer: "Lacey Township cleanings typically range $150-$320 depending on home size and scope. Larger homes on bigger lots price at the upper end." },
      { question: "Does NestGlow Co serve Forked River?", answer: "Yes — Forked River is part of Lacey Township and is within our service area. We cover all of Lacey Township regularly." },
      { question: "Does NestGlow Co serve Lacey Township, NJ?", answer: "Yes — Lacey Township is in our Ocean County service area. We cover Forked River, Lanoka Harbor, Bamber Lake, and the Lacey Road corridor." },
      { question: "How often should I schedule cleaning in Lacey Township?", answer: "Most Lacey Township clients book bi-weekly. We can adjust to weekly for busier households or monthly for lighter needs." },
      { question: "What neighborhoods in Lacey Township do you cover?", answer: "All of Lacey Township — Forked River, Lanoka Harbor, Bamber Lake, the Lacey Road corridor, and throughout the residential areas." },
    ],
    nearbyTowns: ["toms-river-nj", "berkeley-township-nj"],
    zipCodes: ["08731", "08734"],
  },

  {
    slug: "berkeley-township-nj",
    name: "Berkeley Township",
    county: "Ocean",
    state: "NJ",
    metaTitle: "House Cleaning in Berkeley Township, NJ | NestGlow Co",
    metaDescription: "House cleaning in Berkeley Township, NJ. Holiday City, Bayville. Insured. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Berkeley Township, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services in Berkeley Township, NJ — including Bayville, Holiday City, and the active adult community areas. Our team is insured, bonded, and experienced with the scheduling requirements of planned communities.",
    localHook: "Berkeley Township's active adult communities benefit from a cleaning team that's familiar with HOA rules, scheduled work windows, and the cleanup standards these properties require.",
    faqs: [
      { question: "How much does cleaning cost in Berkeley Township, NJ?", answer: "Berkeley Township cleanings typically range $130-$280. Smaller Holiday City-style homes price at the lower end; larger family homes price higher." },
      { question: "Do you serve Holiday City specifically?", answer: "Yes. Holiday City is part of Berkeley Township and we work in the community regularly. We're familiar with the HOA rules and scheduled work windows these properties require." },
      { question: "Does NestGlow Co serve Berkeley Township, NJ?", answer: "Yes — Berkeley Township is in our Ocean County service area. We cover Bayville, Holiday City, Pinewald, Keswick Park, and throughout the township." },
      { question: "Can you work around HOA schedules in Berkeley Township?", answer: "Yes — we're familiar with HOA work windows, noise restrictions, and cleanup standards in Berkeley Township's planned communities. We coordinate with requirements before the first clean." },
      { question: "What neighborhoods in Berkeley Township do you cover?", answer: "All of Berkeley Township — Bayville, Holiday City, Pinewald, Keswick Park, Ocean Acres adjacent, and throughout the township's residential sections." },
    ],
    nearbyTowns: ["toms-river-nj", "lacey-township-nj"],
    zipCodes: ["08721", "08757"],
  },

  {
    slug: "jackson-nj",
    name: "Jackson",
    county: "Ocean",
    state: "NJ",
    metaTitle: "House Cleaning in Jackson, NJ | NestGlow Co",
    metaDescription: "House cleaning in Jackson Township, NJ. Family homes, larger colonials. Insured. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Jackson, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services throughout Jackson Township, NJ. Our team covers Jackson Mills, Cassville, and the many planned communities across the township — insured, bonded, and scaled to match the larger homes typical of Jackson developments.",
    localHook: "Jackson Township's newer planned communities are full of larger colonials with more square footage than many Ocean County neighborhoods — the right crew size matters here.",
    faqs: [
      { question: "How much does cleaning cost in Jackson, NJ?", answer: "Most Jackson Township homes fall in the $160-$350 range. Larger colonials in newer developments price at the upper end of that range." },
      { question: "Does NestGlow Co serve Jackson, NJ?", answer: "Yes — Jackson Township is in our Ocean County service area. We cover all parts of the township including Jackson Mills, Cassville, and the many planned residential communities throughout." },
      { question: "How often should I schedule cleaning in Jackson?", answer: "Most Jackson clients book bi-weekly for a family-sized home. Weekly works well for larger homes with kids and pets; monthly is an option for lighter needs." },
      { question: "Can you handle larger Jackson homes?", answer: "Yes. Larger homes are a regular part of our Jackson work. We bring the right crew size to match the scope so 2,500-3,500 sq ft homes still get done efficiently." },
      { question: "What neighborhoods in Jackson do you cover?", answer: "All of Jackson Township — Cassville, Jackson Mills, the Route 527 corridor, Chandler Estates, and throughout the township's planned residential developments." },
    ],
    nearbyTowns: ["brick-nj", "toms-river-nj"],
    zipCodes: ["08527"],
  },

  // ─── MIDDLESEX COUNTY ────────────────────────────────────────────────

  {
    slug: "old-bridge-nj",
    name: "Old Bridge",
    county: "Middlesex",
    state: "NJ",
    metaTitle: "House Cleaning in Old Bridge, NJ | NestGlow Co",
    metaDescription: "House cleaning in Old Bridge Township, NJ. Family homes, deep cleans, insured team. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Old Bridge, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services throughout Old Bridge Township, NJ. Our team covers Laurence Harbor, Cliffwood, Matawan-adjacent streets, and the Route 9 and Route 34 residential corridors — insured, bonded, and flexible on scheduling.",
    localHook: "Old Bridge's active real estate market keeps homeowners focused on presentation — and a consistent cleaning routine helps both day-to-day living and pre-listing prep.",
    faqs: [
      { question: "How much does cleaning cost in Old Bridge, NJ?", answer: "Most Old Bridge homes fall in the $140-$300 range per clean. We give you a firm quote after you submit the booking form." },
      { question: "Does NestGlow Co serve Old Bridge, NJ?", answer: "Yes — Old Bridge Township is in our Middlesex County service area. We cover the whole township including Laurence Harbor, Cliffwood, and the Route 9 and Route 34 residential developments." },
      { question: "Do you do pre-listing deep cleans in Old Bridge?", answer: "Yes. Pre-listing deep cleans are a common request in Old Bridge's competitive market. We can coordinate timing with your real estate agent." },
      { question: "How often should I schedule cleaning in Old Bridge?", answer: "Most Old Bridge clients book bi-weekly. Busier households with kids or pets often go weekly; smaller households do well with bi-weekly or monthly." },
      { question: "What neighborhoods in Old Bridge do you cover?", answer: "All of Old Bridge Township — Laurence Harbor, Cliffwood, Matawan-adjacent, Cheesequake, and throughout the township's many residential communities." },
    ],
    nearbyTowns: ["sayreville-nj", "east-brunswick-nj", "manalapan-nj"],
    zipCodes: ["08857"],
  },

  {
    slug: "manalapan-nj",
    name: "Manalapan",
    county: "Middlesex",
    state: "NJ",
    metaTitle: "House Cleaning in Manalapan, NJ | NestGlow Co",
    metaDescription: "House cleaning in Manalapan, NJ. Large colonials, deep cleans, insured team. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Manalapan, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services in Manalapan, NJ — a township full of large colonials with the kind of square footage that benefits from a properly sized cleaning crew. Our team is insured, bonded, and experienced with whole-house cleaning scope.",
    localHook: "Manalapan colonials often exceed 2,500 square feet across multiple levels — the right crew makes a bigger difference here than in smaller homes.",
    faqs: [
      { question: "How much does cleaning cost in Manalapan, NJ?", answer: "Most Manalapan homes fall in the $180-$380 range. Larger colonials with 4+ bedrooms price at the upper end; smaller homes fall in the middle." },
      { question: "Does NestGlow Co serve Manalapan, NJ?", answer: "Yes — Manalapan is in our service area. We cover the whole township including Taylors Mills, Englishtown-adjacent streets, and the Route 522 corridor." },
      { question: "Can you handle larger Manalapan homes efficiently?", answer: "Yes. We bring the right crew size for larger colonials so a 3,000+ sq ft home still gets cleaned in one reasonable session." },
      { question: "Do you offer recurring service in Manalapan?", answer: "Yes. Most of our Manalapan clients book bi-weekly recurring service. We can assign the same team members each visit for continuity." },
      { question: "What neighborhoods in Manalapan do you cover?", answer: "All of Manalapan — Taylors Mills, Englishtown-adjacent streets, the Route 522 corridor, Manalapan Village, and throughout the township's residential developments." },
    ],
    nearbyTowns: ["marlboro-nj", "freehold-nj", "old-bridge-nj"],
    zipCodes: ["07726"],
  },

  {
    slug: "east-brunswick-nj",
    name: "East Brunswick",
    county: "Middlesex",
    state: "NJ",
    metaTitle: "House Cleaning in East Brunswick, NJ | NestGlow Co",
    metaDescription: "House cleaning in East Brunswick, NJ. Established suburb, school-district area. Insured. Free quote — (732) 614-0192.",
    h1: "House Cleaning in East Brunswick, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services throughout East Brunswick, NJ. Our team handles weekly and bi-weekly maintenance cleans, deep cleans, and pre-listing prep across this established suburb — insured, bonded, and consistent.",
    localHook: "East Brunswick buyers are comparison shopping carefully, which makes consistent home maintenance and pre-listing preparation meaningfully valuable.",
    faqs: [
      { question: "How much does cleaning cost in East Brunswick, NJ?", answer: "Most East Brunswick homes fall in the $150-$320 range per clean. We give you a firm quote after you submit the booking form." },
      { question: "Does NestGlow Co serve East Brunswick, NJ?", answer: "Yes — East Brunswick is in our core Middlesex County service area. We cover the whole township year-round." },
      { question: "Do you do pre-listing cleans in East Brunswick?", answer: "Yes. East Brunswick's school-district-driven market makes pre-listing cleaning a smart investment, and we coordinate with real estate agents when needed." },
      { question: "How often should I schedule cleaning in East Brunswick?", answer: "Bi-weekly is the most common frequency for East Brunswick families. Weekly works well for larger households; monthly is available for lighter needs." },
      { question: "What neighborhoods in East Brunswick do you cover?", answer: "All of East Brunswick — Farrington Lake, Milltown-adjacent, Old Bridge adjacent, Route 18 corridor, and throughout the established residential areas." },
    ],
    nearbyTowns: ["old-bridge-nj", "edison-nj"],
    zipCodes: ["08816"],
  },

  {
    slug: "edison-nj",
    name: "Edison",
    county: "Middlesex",
    state: "NJ",
    metaTitle: "House Cleaning in Edison, NJ | NestGlow Co",
    metaDescription: "House cleaning in Edison Township, NJ. Family homes, rental properties, commercial. Insured. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Edison, NJ",
    introParagraph: "NestGlow Co provides residential and commercial cleaning services throughout Edison Township, NJ. Our team covers the whole township including Metuchen-adjacent areas, Oak Tree Road corridor, Clara Barton, North Edison, and South Edison — insured, bonded, and scheduled flexibly.",
    localHook: "Edison's competitive real estate market and diverse housing stock keeps our team covering a wide range of home sizes and cleaning scopes week-to-week.",
    faqs: [
      { question: "How much does cleaning cost in Edison, NJ?", answer: "Most Edison homes fall in the $140-$320 range per clean. We give you a firm quote based on your home's details after you submit the booking form." },
      { question: "Does NestGlow Co serve Edison, NJ?", answer: "Yes — Edison Township is in our core Middlesex County service area. We cover all parts of the township year-round." },
      { question: "Do you clean rental properties in Edison?", answer: "Yes. Rental turnover cleaning in Edison is a regular part of our work — both for landlords between tenants and for tenants ending a lease." },
      { question: "Do you offer commercial cleaning in Edison?", answer: "Yes. Office, retail, and professional suite cleaning in Edison is part of our commercial work. We provide custom quotes after a walk-through." },
      { question: "What neighborhoods in Edison do you cover?", answer: "All of Edison — Metuchen-adjacent streets, Clara Barton, Oak Tree Road, Stelton Road corridor, North Edison, South Edison, and throughout." },
    ],
    nearbyTowns: ["woodbridge-nj", "east-brunswick-nj", "sayreville-nj"],
    zipCodes: ["08817", "08820"],
  },

  {
    slug: "woodbridge-nj",
    name: "Woodbridge",
    county: "Middlesex",
    state: "NJ",
    metaTitle: "House Cleaning in Woodbridge, NJ | NestGlow Co",
    metaDescription: "House cleaning in Woodbridge Township, NJ. Avenel, Fords, Iselin, Colonia. Insured. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Woodbridge, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services across Woodbridge Township, NJ — one of the largest and most diverse townships in Middlesex County. Our team covers Colonia, Avenel, Iselin, Fords, Port Reading, Sewaren, Keasbey, and Woodbridge proper.",
    localHook: "Woodbridge's range of communities means our team is in the township multiple days a week, and we can usually fit new clients into the regular rotation quickly.",
    faqs: [
      { question: "How much does cleaning cost in Woodbridge, NJ?", answer: "Most Woodbridge homes fall in the $140-$320 range per clean. We give you a firm quote after you submit the booking form." },
      { question: "Do you serve Iselin specifically?", answer: "Yes. Iselin is part of Woodbridge Township and we cover it regularly. Our team is in Iselin's residential neighborhoods multiple times per week." },
      { question: "Does NestGlow Co serve Woodbridge, NJ?", answer: "Yes — we cover all of Woodbridge Township including Avenel, Fords, Iselin, Sewaren, Port Reading, Colonia, Keasbey, and Woodbridge proper." },
      { question: "How often should I schedule cleaning in Woodbridge?", answer: "Most Woodbridge clients book bi-weekly. Families with kids or pets often go weekly; smaller households do well with bi-weekly or monthly." },
      { question: "What neighborhoods in Woodbridge do you cover?", answer: "All of Woodbridge Township — Colonia, Avenel, Iselin, Fords, Port Reading, Sewaren, Keasbey, Woodbridge proper, and the residential sections throughout." },
    ],
    nearbyTowns: ["edison-nj", "sayreville-nj"],
    zipCodes: ["07095"],
  },

  {
    slug: "sayreville-nj",
    name: "Sayreville",
    county: "Middlesex",
    state: "NJ",
    metaTitle: "House Cleaning in Sayreville, NJ | NestGlow Co",
    metaDescription: "House cleaning in Sayreville, NJ. Family homes, rental properties. Insured, bonded. Free quote — (732) 614-0192.",
    h1: "House Cleaning in Sayreville, NJ",
    introParagraph: "NestGlow Co provides residential cleaning services throughout Sayreville, NJ — including Parlin, Morgan, and the Washington Road corridor. Our insured, bonded team handles weekly, bi-weekly, and one-time cleans.",
    localHook: "Sayreville's mix of older cape cods and newer developments benefits from a cleaning team that can adapt routine and detail level to the home's age and condition.",
    faqs: [
      { question: "How much does cleaning cost in Sayreville, NJ?", answer: "Most Sayreville homes fall in the $130-$280 range per clean. We give you a firm quote after you submit the booking form." },
      { question: "Does NestGlow Co serve Sayreville, NJ?", answer: "Yes — Sayreville is in our Middlesex County service area. We cover the whole borough including Parlin, Morgan, and the South Amboy-adjacent streets." },
      { question: "Do you clean rental properties in Sayreville?", answer: "Yes. Rental turnover cleaning in Sayreville is a regular part of our work. We coordinate with move-out/move-in timing to minimize vacancy." },
      { question: "How often should I schedule cleaning in Sayreville?", answer: "Most Sayreville clients book bi-weekly. Weekly works well for larger households; monthly is an option for lighter needs." },
      { question: "What neighborhoods in Sayreville do you cover?", answer: "All of Sayreville — Parlin, Morgan, South Amboy-adjacent, Washington Road, and throughout the borough." },
    ],
    nearbyTowns: ["old-bridge-nj", "woodbridge-nj", "edison-nj"],
    zipCodes: ["08872"],
  },
];
