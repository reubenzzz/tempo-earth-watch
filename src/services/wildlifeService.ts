// Wildlife Data Service
export interface AnimalData {
  name: string;
  scientificName: string;
  icon: string;
  population: string;
  estimatedCount: string;
  status: "Stable" | "Vulnerable" | "Endangered" | "Critical";
  threats: string;
  habitat: string;
  region: string[];
}

// Comprehensive wildlife database
export const GLOBAL_WILDLIFE_DATABASE: AnimalData[] = [
  // Mammals
  { name: "African Elephant", scientificName: "Loxodonta africana", icon: "🐘", population: "Vulnerable", estimatedCount: "415,000", status: "Vulnerable", threats: "Poaching, habitat loss", habitat: "Savanna, forests", region: ["Africa"] },
  { name: "Bengal Tiger", scientificName: "Panthera tigris tigris", icon: "🐅", population: "Endangered", estimatedCount: "2,500", status: "Endangered", threats: "Poaching, habitat fragmentation", habitat: "Forests, grasslands", region: ["Asia", "India"] },
  { name: "Giant Panda", scientificName: "Ailuropoda melanoleuca", icon: "🐼", population: "Vulnerable", estimatedCount: "1,864", status: "Vulnerable", threats: "Habitat loss", habitat: "Bamboo forests", region: ["Asia", "China"] },
  { name: "Blue Whale", scientificName: "Balaenoptera musculus", icon: "🐋", population: "Endangered", estimatedCount: "25,000", status: "Endangered", threats: "Ship strikes, climate change", habitat: "Oceans", region: ["Global"] },
  { name: "Mountain Gorilla", scientificName: "Gorilla beringei beringei", icon: "🦍", population: "Endangered", estimatedCount: "1,063", status: "Endangered", threats: "Poaching, disease", habitat: "Mountain forests", region: ["Africa"] },
  { name: "Snow Leopard", scientificName: "Panthera uncia", icon: "🐆", population: "Vulnerable", estimatedCount: "4,000-6,500", status: "Vulnerable", threats: "Poaching, climate change", habitat: "Mountains", region: ["Asia"] },
  { name: "Polar Bear", scientificName: "Ursus maritimus", icon: "🐻‍❄️", population: "Vulnerable", estimatedCount: "26,000", status: "Vulnerable", threats: "Climate change, pollution", habitat: "Arctic ice", region: ["Arctic"] },
  { name: "Red Panda", scientificName: "Ailurus fulgens", icon: "🦊", population: "Endangered", estimatedCount: "10,000", status: "Endangered", threats: "Habitat loss, poaching", habitat: "Temperate forests", region: ["Asia"] },
  { name: "Orangutan", scientificName: "Pongo spp.", icon: "🦧", population: "Critical", estimatedCount: "104,700", status: "Critical", threats: "Deforestation, hunting", habitat: "Rainforests", region: ["Asia"] },
  { name: "Cheetah", scientificName: "Acinonyx jubatus", icon: "🐆", population: "Vulnerable", estimatedCount: "6,500-7,000", status: "Vulnerable", threats: "Habitat loss, human conflict", habitat: "Grasslands", region: ["Africa"] },
  
  // Birds
  { name: "Bald Eagle", scientificName: "Haliaeetus leucocephalus", icon: "🦅", population: "Stable", estimatedCount: "316,700", status: "Stable", threats: "Pollution, habitat loss", habitat: "Forests, coasts", region: ["North America"] },
  { name: "California Condor", scientificName: "Gymnogyps californianus", icon: "🦅", population: "Critical", estimatedCount: "500", status: "Critical", threats: "Lead poisoning, habitat loss", habitat: "Mountains, cliffs", region: ["North America"] },
  { name: "Kakapo", scientificName: "Strigops habroptilus", icon: "🦜", population: "Critical", estimatedCount: "252", status: "Critical", threats: "Predation, low reproduction", habitat: "Forests", region: ["New Zealand"] },
  { name: "Philippine Eagle", scientificName: "Pithecophaga jefferyi", icon: "🦅", population: "Critical", estimatedCount: "400-800", status: "Critical", threats: "Deforestation, shooting", habitat: "Rainforests", region: ["Asia", "Philippines"] },
  { name: "Spix's Macaw", scientificName: "Cyanopsitta spixii", icon: "🦜", population: "Critical", estimatedCount: "200 (captivity)", status: "Critical", threats: "Habitat loss, illegal trade", habitat: "Dry forests", region: ["South America"] },
  { name: "Snowy Owl", scientificName: "Bubo scandiacus", icon: "🦉", population: "Vulnerable", estimatedCount: "30,000", status: "Vulnerable", threats: "Climate change", habitat: "Tundra", region: ["Arctic"] },
  { name: "Harpy Eagle", scientificName: "Harpia harpyja", icon: "🦅", population: "Vulnerable", estimatedCount: "20,000-50,000", status: "Vulnerable", threats: "Deforestation", habitat: "Rainforests", region: ["South America"] },
  { name: "Great Indian Bustard", scientificName: "Ardeotis nigriceps", icon: "🦤", population: "Critical", estimatedCount: "150", status: "Critical", threats: "Habitat loss, power lines", habitat: "Grasslands", region: ["Asia", "India"] },
  { name: "Kiwi", scientificName: "Apteryx spp.", icon: "🥝", population: "Vulnerable", estimatedCount: "68,000", status: "Vulnerable", threats: "Predation, habitat loss", habitat: "Forests", region: ["New Zealand"] },
  { name: "Atlantic Puffin", scientificName: "Fratercula arctica", icon: "🐧", population: "Vulnerable", estimatedCount: "12-14 million", status: "Vulnerable", threats: "Climate change, overfishing", habitat: "Coastal cliffs", region: ["Atlantic"] },
  
  // Marine Life
  { name: "Sea Turtle", scientificName: "Chelonioidea", icon: "🐢", population: "Endangered", estimatedCount: "Variable", status: "Endangered", threats: "Pollution, bycatch", habitat: "Oceans, beaches", region: ["Global"] },
  { name: "Great White Shark", scientificName: "Carcharodon carcharias", icon: "🦈", population: "Vulnerable", estimatedCount: "3,500", status: "Vulnerable", threats: "Overfishing, bycatch", habitat: "Coastal oceans", region: ["Global"] },
  { name: "Vaquita", scientificName: "Phocoena sinus", icon: "🐬", population: "Critical", estimatedCount: "10", status: "Critical", threats: "Bycatch in fishing nets", habitat: "Gulf of California", region: ["North America"] },
  { name: "Hawksbill Turtle", scientificName: "Eretmochelys imbricata", icon: "🐢", population: "Critical", estimatedCount: "25,000", status: "Critical", threats: "Illegal trade, habitat loss", habitat: "Coral reefs", region: ["Tropical"] },
  { name: "Whale Shark", scientificName: "Rhincodon typus", icon: "🦈", population: "Endangered", estimatedCount: "Unknown", status: "Endangered", threats: "Fishing, ship strikes", habitat: "Tropical oceans", region: ["Global"] },
  
  // Reptiles & Amphibians
  { name: "Komodo Dragon", scientificName: "Varanus komodoensis", icon: "🦎", population: "Vulnerable", estimatedCount: "5,700", status: "Vulnerable", threats: "Habitat loss, tourism", habitat: "Islands", region: ["Asia", "Indonesia"] },
  { name: "Chinese Alligator", scientificName: "Alligator sinensis", icon: "🐊", population: "Critical", estimatedCount: "150", status: "Critical", threats: "Habitat loss", habitat: "Wetlands", region: ["Asia", "China"] },
  { name: "Golden Poison Frog", scientificName: "Phyllobates terribilis", icon: "🐸", population: "Endangered", estimatedCount: "Unknown", status: "Endangered", threats: "Habitat loss, pollution", habitat: "Rainforests", region: ["South America"] },
  
  // Other Notable Species
  { name: "Monarch Butterfly", scientificName: "Danaus plexippus", icon: "🦋", population: "Endangered", estimatedCount: "Variable", status: "Endangered", threats: "Habitat loss, climate change", habitat: "Meadows, forests", region: ["North America"] },
  { name: "Honey Bee", scientificName: "Apis mellifera", icon: "🐝", population: "Vulnerable", estimatedCount: "Variable", status: "Vulnerable", threats: "Pesticides, disease", habitat: "Global", region: ["Global"] },
  { name: "African Wild Dog", scientificName: "Lycaon pictus", icon: "🐕", population: "Endangered", estimatedCount: "6,600", status: "Endangered", threats: "Habitat fragmentation, disease", habitat: "Savanna", region: ["Africa"] },
  { name: "Javan Rhino", scientificName: "Rhinoceros sondaicus", icon: "🦏", population: "Critical", estimatedCount: "74", status: "Critical", threats: "Poaching, low population", habitat: "Tropical forests", region: ["Asia"] },
  { name: "Sumatran Rhino", scientificName: "Dicerorhinus sumatrensis", icon: "🦏", population: "Critical", estimatedCount: "80", status: "Critical", threats: "Poaching, habitat loss", habitat: "Rainforests", region: ["Asia"] },
  { name: "Amur Leopard", scientificName: "Panthera pardus orientalis", icon: "🐆", population: "Critical", estimatedCount: "100", status: "Critical", threats: "Poaching, habitat loss", habitat: "Temperate forests", region: ["Asia"] },
  { name: "Saola", scientificName: "Pseudoryx nghetinhensis", icon: "🦌", population: "Critical", estimatedCount: "Unknown <750", status: "Critical", threats: "Hunting, habitat loss", habitat: "Forests", region: ["Asia", "Vietnam"] },
];

export const searchWildlife = async (query: string): Promise<AnimalData[]> => {
  // Local search in comprehensive database
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return GLOBAL_WILDLIFE_DATABASE.slice(0, 20);
  }
  
  const results = GLOBAL_WILDLIFE_DATABASE.filter(animal => 
    animal.name.toLowerCase().includes(normalizedQuery) ||
    animal.scientificName.toLowerCase().includes(normalizedQuery) ||
    animal.habitat.toLowerCase().includes(normalizedQuery) ||
    animal.region.some(r => r.toLowerCase().includes(normalizedQuery))
  );
  
  return results.length > 0 ? results : [];
};

export const getWildlifeByLocation = (locationName: string): AnimalData[] => {
  // Filter animals by region
  const normalizedLocation = locationName.toLowerCase();
  
  // Determine region based on location
  let region = "Global";
  if (normalizedLocation.includes("africa") || normalizedLocation.includes("kenya") || 
      normalizedLocation.includes("tanzania") || normalizedLocation.includes("south africa")) {
    region = "Africa";
  } else if (normalizedLocation.includes("asia") || normalizedLocation.includes("india") || 
             normalizedLocation.includes("china") || normalizedLocation.includes("indonesia")) {
    region = "Asia";
  } else if (normalizedLocation.includes("america") || normalizedLocation.includes("usa") || 
             normalizedLocation.includes("canada") || normalizedLocation.includes("mexico")) {
    region = "North America";
  } else if (normalizedLocation.includes("south america") || normalizedLocation.includes("brazil") || 
             normalizedLocation.includes("amazon")) {
    region = "South America";
  } else if (normalizedLocation.includes("arctic") || normalizedLocation.includes("polar")) {
    region = "Arctic";
  }
  
  const filtered = GLOBAL_WILDLIFE_DATABASE.filter(animal => 
    animal.region.includes(region) || animal.region.includes("Global")
  );
  
  return filtered.length > 0 ? filtered.slice(0, 15) : GLOBAL_WILDLIFE_DATABASE.slice(0, 15);
};
