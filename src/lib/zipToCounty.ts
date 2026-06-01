// Data sourced from USPS / NJ state ZIP reference — last reviewed 2026-05-18.
// Review and update this file if NestGlow expands to additional counties.
// ZIPs reflect primary service municipalities; some ZIP codes span county
// or township boundaries and are mapped to the dominant municipality.

export interface ZipMatch {
  zip: string;
  county: "monmouth-county" | "ocean-county" | "middlesex-county";
  town: string;
  countyDisplayName: string;
}

export const SERVED_COUNTIES: string[] = [
  "monmouth-county",
  "ocean-county",
  "middlesex-county",
];

export const ZIP_TO_COUNTY: Record<string, ZipMatch> = {
  // === MONMOUTH COUNTY ===

  "07701": { zip: "07701", county: "monmouth-county", town: "Red Bank", countyDisplayName: "Monmouth County" },
  "07702": { zip: "07702", county: "monmouth-county", town: "Shrewsbury", countyDisplayName: "Monmouth County" },
  "07703": { zip: "07703", county: "monmouth-county", town: "Fort Monmouth", countyDisplayName: "Monmouth County" },
  "07704": { zip: "07704", county: "monmouth-county", town: "Fair Haven", countyDisplayName: "Monmouth County" },
  "07710": { zip: "07710", county: "monmouth-county", town: "Adelphia", countyDisplayName: "Monmouth County" },
  "07711": { zip: "07711", county: "monmouth-county", town: "Allenhurst", countyDisplayName: "Monmouth County" },
  "07712": { zip: "07712", county: "monmouth-county", town: "Asbury Park", countyDisplayName: "Monmouth County" },
  "07716": { zip: "07716", county: "monmouth-county", town: "Atlantic Highlands", countyDisplayName: "Monmouth County" },
  "07717": { zip: "07717", county: "monmouth-county", town: "Avon-by-the-Sea", countyDisplayName: "Monmouth County" },
  "07718": { zip: "07718", county: "monmouth-county", town: "Belford", countyDisplayName: "Monmouth County" },
  "07719": { zip: "07719", county: "monmouth-county", town: "Belmar", countyDisplayName: "Monmouth County" },
  "07720": { zip: "07720", county: "monmouth-county", town: "Bradley Beach", countyDisplayName: "Monmouth County" },
  "07721": { zip: "07721", county: "monmouth-county", town: "Cliffwood", countyDisplayName: "Monmouth County" },
  "07722": { zip: "07722", county: "monmouth-county", town: "Colts Neck", countyDisplayName: "Monmouth County" },
  "07723": { zip: "07723", county: "monmouth-county", town: "Deal", countyDisplayName: "Monmouth County" },
  "07724": { zip: "07724", county: "monmouth-county", town: "Eatontown", countyDisplayName: "Monmouth County" },
  "07727": { zip: "07727", county: "monmouth-county", town: "Farmingdale", countyDisplayName: "Monmouth County" },
  "07728": { zip: "07728", county: "monmouth-county", town: "Freehold", countyDisplayName: "Monmouth County" },
  "07730": { zip: "07730", county: "monmouth-county", town: "Hazlet", countyDisplayName: "Monmouth County" },
  "07731": { zip: "07731", county: "monmouth-county", town: "Howell", countyDisplayName: "Monmouth County" },
  "07732": { zip: "07732", county: "monmouth-county", town: "Highlands", countyDisplayName: "Monmouth County" },
  "07733": { zip: "07733", county: "monmouth-county", town: "Holmdel", countyDisplayName: "Monmouth County" },
  "07734": { zip: "07734", county: "monmouth-county", town: "Keansburg", countyDisplayName: "Monmouth County" },
  "07735": { zip: "07735", county: "monmouth-county", town: "Keyport", countyDisplayName: "Monmouth County" },
  "07737": { zip: "07737", county: "monmouth-county", town: "Leonardo", countyDisplayName: "Monmouth County" },
  "07738": { zip: "07738", county: "monmouth-county", town: "Lincroft", countyDisplayName: "Monmouth County" },
  "07739": { zip: "07739", county: "monmouth-county", town: "Little Silver", countyDisplayName: "Monmouth County" },
  "07740": { zip: "07740", county: "monmouth-county", town: "Long Branch", countyDisplayName: "Monmouth County" },
  "07746": { zip: "07746", county: "monmouth-county", town: "Marlboro", countyDisplayName: "Monmouth County" },
  "07747": { zip: "07747", county: "monmouth-county", town: "Matawan", countyDisplayName: "Monmouth County" },
  "07748": { zip: "07748", county: "monmouth-county", town: "Middletown", countyDisplayName: "Monmouth County" },
  "07750": { zip: "07750", county: "monmouth-county", town: "Monmouth Beach", countyDisplayName: "Monmouth County" },
  "07751": { zip: "07751", county: "monmouth-county", town: "Morganville", countyDisplayName: "Monmouth County" },
  "07752": { zip: "07752", county: "monmouth-county", town: "Navesink", countyDisplayName: "Monmouth County" },
  "07753": { zip: "07753", county: "monmouth-county", town: "Neptune City", countyDisplayName: "Monmouth County" },
  "07754": { zip: "07754", county: "monmouth-county", town: "Neptune", countyDisplayName: "Monmouth County" },
  "07755": { zip: "07755", county: "monmouth-county", town: "Oakhurst", countyDisplayName: "Monmouth County" },
  "07756": { zip: "07756", county: "monmouth-county", town: "Ocean Grove", countyDisplayName: "Monmouth County" },
  "07757": { zip: "07757", county: "monmouth-county", town: "Oceanport", countyDisplayName: "Monmouth County" },
  "07758": { zip: "07758", county: "monmouth-county", town: "Port Monmouth", countyDisplayName: "Monmouth County" },
  "07760": { zip: "07760", county: "monmouth-county", town: "Rumson", countyDisplayName: "Monmouth County" },
  "07762": { zip: "07762", county: "monmouth-county", town: "Spring Lake", countyDisplayName: "Monmouth County" },
  "07763": { zip: "07763", county: "monmouth-county", town: "Tinton Falls", countyDisplayName: "Monmouth County" },
  "07764": { zip: "07764", county: "monmouth-county", town: "West Long Branch", countyDisplayName: "Monmouth County" },
  "07765": { zip: "07765", county: "monmouth-county", town: "Wickatunk", countyDisplayName: "Monmouth County" },
  "08730": { zip: "08730", county: "monmouth-county", town: "Brielle", countyDisplayName: "Monmouth County" },
  "08736": { zip: "08736", county: "monmouth-county", town: "Manasquan", countyDisplayName: "Monmouth County" },
  "08750": { zip: "08750", county: "monmouth-county", town: "Sea Girt", countyDisplayName: "Monmouth County" },

  // === OCEAN COUNTY ===

  "08005": { zip: "08005", county: "ocean-county", town: "Barnegat", countyDisplayName: "Ocean County" },
  "08006": { zip: "08006", county: "ocean-county", town: "Barnegat Light", countyDisplayName: "Ocean County" },
  "08008": { zip: "08008", county: "ocean-county", town: "Beach Haven", countyDisplayName: "Ocean County" },
  "08050": { zip: "08050", county: "ocean-county", town: "Manahawkin", countyDisplayName: "Ocean County" },
  "08087": { zip: "08087", county: "ocean-county", town: "Tuckerton", countyDisplayName: "Ocean County" },
  "08092": { zip: "08092", county: "ocean-county", town: "West Creek", countyDisplayName: "Ocean County" },
  "08527": { zip: "08527", county: "ocean-county", town: "Jackson", countyDisplayName: "Ocean County" },
  "08533": { zip: "08533", county: "ocean-county", town: "New Egypt", countyDisplayName: "Ocean County" },
  "08721": { zip: "08721", county: "ocean-county", town: "Bayville", countyDisplayName: "Ocean County" },
  "08722": { zip: "08722", county: "ocean-county", town: "Beachwood", countyDisplayName: "Ocean County" },
  "08723": { zip: "08723", county: "ocean-county", town: "Brick", countyDisplayName: "Ocean County" },
  "08724": { zip: "08724", county: "ocean-county", town: "Brick", countyDisplayName: "Ocean County" },
  "08731": { zip: "08731", county: "ocean-county", town: "Forked River", countyDisplayName: "Ocean County" },
  "08732": { zip: "08732", county: "ocean-county", town: "Island Heights", countyDisplayName: "Ocean County" },
  "08733": { zip: "08733", county: "ocean-county", town: "Lakehurst", countyDisplayName: "Ocean County" },
  "08734": { zip: "08734", county: "ocean-county", town: "Lanoka Harbor", countyDisplayName: "Ocean County" },
  "08735": { zip: "08735", county: "ocean-county", town: "Lavallette", countyDisplayName: "Ocean County" },
  "08738": { zip: "08738", county: "ocean-county", town: "Mantoloking", countyDisplayName: "Ocean County" },
  "08739": { zip: "08739", county: "ocean-county", town: "Normandy Beach", countyDisplayName: "Ocean County" },
  "08740": { zip: "08740", county: "ocean-county", town: "Ocean Gate", countyDisplayName: "Ocean County" },
  "08741": { zip: "08741", county: "ocean-county", town: "Pine Beach", countyDisplayName: "Ocean County" },
  "08742": { zip: "08742", county: "ocean-county", town: "Point Pleasant", countyDisplayName: "Ocean County" },
  "08751": { zip: "08751", county: "ocean-county", town: "Seaside Heights", countyDisplayName: "Ocean County" },
  "08752": { zip: "08752", county: "ocean-county", town: "Seaside Park", countyDisplayName: "Ocean County" },
  "08753": { zip: "08753", county: "ocean-county", town: "Toms River", countyDisplayName: "Ocean County" },
  "08754": { zip: "08754", county: "ocean-county", town: "Toms River", countyDisplayName: "Ocean County" },
  "08755": { zip: "08755", county: "ocean-county", town: "Toms River", countyDisplayName: "Ocean County" },
  "08757": { zip: "08757", county: "ocean-county", town: "Toms River", countyDisplayName: "Ocean County" },
  "08758": { zip: "08758", county: "ocean-county", town: "Waretown", countyDisplayName: "Ocean County" },
  "08759": { zip: "08759", county: "ocean-county", town: "Manchester", countyDisplayName: "Ocean County" },

  // === MIDDLESEX COUNTY ===

  "07001": { zip: "07001", county: "middlesex-county", town: "Avenel", countyDisplayName: "Middlesex County" },
  "07008": { zip: "07008", county: "middlesex-county", town: "Carteret", countyDisplayName: "Middlesex County" },
  "07064": { zip: "07064", county: "middlesex-county", town: "Port Reading", countyDisplayName: "Middlesex County" },
  "07067": { zip: "07067", county: "middlesex-county", town: "Colonia", countyDisplayName: "Middlesex County" },
  "07077": { zip: "07077", county: "middlesex-county", town: "Sewaren", countyDisplayName: "Middlesex County" },
  "07080": { zip: "07080", county: "middlesex-county", town: "South Plainfield", countyDisplayName: "Middlesex County" },
  "07095": { zip: "07095", county: "middlesex-county", town: "Woodbridge", countyDisplayName: "Middlesex County" },
  "07726": { zip: "07726", county: "monmouth-county", town: "Manalapan", countyDisplayName: "Monmouth County" },
  "08512": { zip: "08512", county: "middlesex-county", town: "Cranbury", countyDisplayName: "Middlesex County" },
  "08536": { zip: "08536", county: "middlesex-county", town: "Plainsboro", countyDisplayName: "Middlesex County" },
  "08812": { zip: "08812", county: "middlesex-county", town: "Dunellen", countyDisplayName: "Middlesex County" },
  "08816": { zip: "08816", county: "middlesex-county", town: "East Brunswick", countyDisplayName: "Middlesex County" },
  "08817": { zip: "08817", county: "middlesex-county", town: "Edison", countyDisplayName: "Middlesex County" },
  "08818": { zip: "08818", county: "middlesex-county", town: "Edison", countyDisplayName: "Middlesex County" },
  "08820": { zip: "08820", county: "middlesex-county", town: "Edison", countyDisplayName: "Middlesex County" },
  "08824": { zip: "08824", county: "middlesex-county", town: "Kendall Park", countyDisplayName: "Middlesex County" },
  "08828": { zip: "08828", county: "middlesex-county", town: "Helmetta", countyDisplayName: "Middlesex County" },
  "08830": { zip: "08830", county: "middlesex-county", town: "Iselin", countyDisplayName: "Middlesex County" },
  "08831": { zip: "08831", county: "middlesex-county", town: "Monroe Township", countyDisplayName: "Middlesex County" },
  "08832": { zip: "08832", county: "middlesex-county", town: "Keasbey", countyDisplayName: "Middlesex County" },
  "08840": { zip: "08840", county: "middlesex-county", town: "Metuchen", countyDisplayName: "Middlesex County" },
  "08846": { zip: "08846", county: "middlesex-county", town: "Middlesex", countyDisplayName: "Middlesex County" },
  "08850": { zip: "08850", county: "middlesex-county", town: "Milltown", countyDisplayName: "Middlesex County" },
  "08852": { zip: "08852", county: "middlesex-county", town: "Monmouth Junction", countyDisplayName: "Middlesex County" },
  "08854": { zip: "08854", county: "middlesex-county", town: "Piscataway", countyDisplayName: "Middlesex County" },
  "08857": { zip: "08857", county: "middlesex-county", town: "Old Bridge", countyDisplayName: "Middlesex County" },
  "08859": { zip: "08859", county: "middlesex-county", town: "Parlin", countyDisplayName: "Middlesex County" },
  "08861": { zip: "08861", county: "middlesex-county", town: "Perth Amboy", countyDisplayName: "Middlesex County" },
  "08862": { zip: "08862", county: "middlesex-county", town: "Perth Amboy", countyDisplayName: "Middlesex County" },
  "08863": { zip: "08863", county: "middlesex-county", town: "Fords", countyDisplayName: "Middlesex County" },
  "08872": { zip: "08872", county: "middlesex-county", town: "Sayreville", countyDisplayName: "Middlesex County" },
  "08879": { zip: "08879", county: "middlesex-county", town: "South Amboy", countyDisplayName: "Middlesex County" },
  "08882": { zip: "08882", county: "middlesex-county", town: "South River", countyDisplayName: "Middlesex County" },
  "08884": { zip: "08884", county: "middlesex-county", town: "Spotswood", countyDisplayName: "Middlesex County" },
  "08901": { zip: "08901", county: "middlesex-county", town: "New Brunswick", countyDisplayName: "Middlesex County" },
  "08902": { zip: "08902", county: "middlesex-county", town: "North Brunswick", countyDisplayName: "Middlesex County" },
  "08904": { zip: "08904", county: "middlesex-county", town: "Highland Park", countyDisplayName: "Middlesex County" },
};

export function lookupZip(zip: string): ZipMatch | null {
  if (!/^\d{5}$/.test(zip)) return null;
  return ZIP_TO_COUNTY[zip] ?? null;
}

export function isServedZip(zip: string): boolean {
  return lookupZip(zip) !== null;
}
