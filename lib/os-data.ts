// Central data layer for the Odyssey AI travel operating system.
// All modules (countries, content, budget, visa, notifications) source from here.

export const CURRENCY = "₹";

export function formatMoney(n: number): string {
  return `${CURRENCY}${Math.round(n).toLocaleString("en-IN")}`;
}

/* ----------------------------------- Countries ----------------------------------- */

export type Country = {
  name: string;
  code: string; // ISO-ish 2-letter
  region: string;
  tagline: string;
  hue: number; // used for the generated gradient tint
  aiScore: number; // 0-100
  highlights: string[];
  trending?: boolean;
};

export const COUNTRIES: Country[] = [
  { name: "Japan", code: "JP", region: "Asia", tagline: "Neon cities meet ancient shrines", hue: 350, aiScore: 96, highlights: ["Kyoto temples", "Ramen alleys", "Cherry blossoms"], trending: true },
  { name: "India", code: "IN", region: "Asia", tagline: "A universe of color and flavor", hue: 30, aiScore: 94, highlights: ["Taj Mahal", "Street food", "Himalayan treks"], trending: true },
  { name: "France", code: "FR", region: "Europe", tagline: "Art, wine and timeless romance", hue: 220, aiScore: 93, highlights: ["Eiffel Tower", "Louvre", "Riviera"] },
  { name: "Italy", code: "IT", region: "Europe", tagline: "La dolce vita, coast to coast", hue: 140, aiScore: 92, highlights: ["Amalfi Coast", "Colosseum", "Pasta"], trending: true },
  { name: "Spain", code: "ES", region: "Europe", tagline: "Sun, tapas and Gaudí dreams", hue: 40, aiScore: 90, highlights: ["Sagrada Família", "Flamenco", "Beaches"] },
  { name: "Switzerland", code: "CH", region: "Europe", tagline: "Alpine peaks and glacial lakes", hue: 200, aiScore: 95, highlights: ["Matterhorn", "Scenic rail", "Chocolate"], trending: true },
  { name: "Germany", code: "DE", region: "Europe", tagline: "Fairytale castles and modern cities", hue: 260, aiScore: 88, highlights: ["Neuschwanstein", "Berlin", "Black Forest"] },
  { name: "United Kingdom", code: "GB", region: "Europe", tagline: "History, moors and modern buzz", hue: 250, aiScore: 87, highlights: ["London", "Highlands", "Castles"] },
  { name: "United States", code: "US", region: "Americas", tagline: "Fifty states of adventure", hue: 210, aiScore: 89, highlights: ["Grand Canyon", "NYC", "National parks"] },
  { name: "Canada", code: "CA", region: "Americas", tagline: "Untamed wilderness and lakes", hue: 190, aiScore: 90, highlights: ["Banff", "Rockies", "Northern lights"], trending: true },
  { name: "Australia", code: "AU", region: "Oceania", tagline: "Reefs, red deserts and reef towns", hue: 25, aiScore: 89, highlights: ["Sydney", "Great Barrier Reef", "Outback"] },
  { name: "New Zealand", code: "NZ", region: "Oceania", tagline: "Cinematic fjords and peaks", hue: 160, aiScore: 92, highlights: ["Fiordland", "Queenstown", "Glowworms"] },
  { name: "Thailand", code: "TH", region: "Asia", tagline: "Islands, temples and street eats", hue: 300, aiScore: 91, highlights: ["Phi Phi", "Bangkok", "Massage"], trending: true },
  { name: "Indonesia", code: "ID", region: "Asia", tagline: "Islands of gods and volcanoes", hue: 130, aiScore: 90, highlights: ["Bali", "Komodo", "Rice terraces"] },
  { name: "Singapore", code: "SG", region: "Asia", tagline: "A garden city from the future", hue: 175, aiScore: 88, highlights: ["Gardens by the Bay", "Hawker food", "Marina Bay"] },
  { name: "Malaysia", code: "MY", region: "Asia", tagline: "Rainforests and twin towers", hue: 155, aiScore: 84, highlights: ["Petronas", "Borneo", "Penang food"] },
  { name: "Vietnam", code: "VN", region: "Asia", tagline: "Karst bays and buzzing streets", hue: 120, aiScore: 87, highlights: ["Ha Long Bay", "Pho", "Hoi An"] },
  { name: "South Korea", code: "KR", region: "Asia", tagline: "K-culture meets mountain temples", hue: 320, aiScore: 89, highlights: ["Seoul", "Palaces", "BBQ"], trending: true },
  { name: "China", code: "CN", region: "Asia", tagline: "Ancient wonders at vast scale", hue: 15, aiScore: 86, highlights: ["Great Wall", "Guilin", "Forbidden City"] },
  { name: "UAE", code: "AE", region: "Middle East", tagline: "Desert luxury and sky-high dreams", hue: 45, aiScore: 90, highlights: ["Burj Khalifa", "Desert safari", "Souks"], trending: true },
  { name: "Turkey", code: "TR", region: "Middle East", tagline: "Where continents and eras meet", hue: 205, aiScore: 88, highlights: ["Cappadocia", "Istanbul", "Bazaars"] },
  { name: "Greece", code: "GR", region: "Europe", tagline: "Whitewashed isles and myth", hue: 215, aiScore: 91, highlights: ["Santorini", "Acropolis", "Island hopping"], trending: true },
  { name: "Egypt", code: "EG", region: "Africa", tagline: "Pyramids and the eternal Nile", hue: 50, aiScore: 85, highlights: ["Pyramids", "Nile cruise", "Temples"] },
  { name: "South Africa", code: "ZA", region: "Africa", tagline: "Safaris and two-ocean cities", hue: 100, aiScore: 87, highlights: ["Kruger", "Cape Town", "Wine lands"] },
  { name: "Brazil", code: "BR", region: "Americas", tagline: "Rhythm, rainforest and beaches", hue: 110, aiScore: 86, highlights: ["Rio", "Amazon", "Iguazu"] },
  { name: "Mexico", code: "MX", region: "Americas", tagline: "Ruins, reefs and rich flavor", hue: 20, aiScore: 87, highlights: ["Tulum", "Chichen Itza", "Tacos"] },
  { name: "Portugal", code: "PT", region: "Europe", tagline: "Azulejos, cliffs and custard tarts", hue: 145, aiScore: 89, highlights: ["Lisbon", "Algarve", "Port wine"] },
  { name: "Netherlands", code: "NL", region: "Europe", tagline: "Canals, bikes and blooms", hue: 30, aiScore: 84, highlights: ["Amsterdam", "Tulips", "Windmills"] },
  { name: "Austria", code: "AT", region: "Europe", tagline: "Imperial cities and alpine song", hue: 235, aiScore: 85, highlights: ["Vienna", "Hallstatt", "Alps"] },
  { name: "Norway", code: "NO", region: "Europe", tagline: "Fjords under dancing skies", hue: 195, aiScore: 91, highlights: ["Fjords", "Aurora", "Lofoten"], trending: true },
  { name: "Sweden", code: "SE", region: "Europe", tagline: "Design, forests and archipelago", hue: 210, aiScore: 83, highlights: ["Stockholm", "Lapland", "Fika"] },
  { name: "Denmark", code: "DK", region: "Europe", tagline: "Hygge, harbors and cycling", hue: 5, aiScore: 82, highlights: ["Copenhagen", "Nyhavn", "New Nordic"] },
  { name: "Finland", code: "FI", region: "Europe", tagline: "Lakes, saunas and Santa's north", hue: 220, aiScore: 84, highlights: ["Helsinki", "Aurora", "Lapland"] },
  { name: "Iceland", code: "IS", region: "Europe", tagline: "Fire, ice and endless waterfalls", hue: 185, aiScore: 93, highlights: ["Golden Circle", "Geysers", "Glaciers"], trending: true },
  { name: "Ireland", code: "IE", region: "Europe", tagline: "Emerald cliffs and warm pubs", hue: 150, aiScore: 82, highlights: ["Cliffs of Moher", "Dublin", "Ring of Kerry"] },
  { name: "Nepal", code: "NP", region: "Asia", tagline: "Roof of the world adventures", hue: 15, aiScore: 88, highlights: ["Everest", "Kathmandu", "Trekking"] },
  { name: "Sri Lanka", code: "LK", region: "Asia", tagline: "Tea hills, temples and surf", hue: 105, aiScore: 85, highlights: ["Sigiriya", "Tea country", "Beaches"] },
  { name: "Maldives", code: "MV", region: "Asia", tagline: "Overwater serenity", hue: 190, aiScore: 94, highlights: ["Overwater villas", "Reefs", "Sandbanks"], trending: true },
  { name: "Bhutan", code: "BT", region: "Asia", tagline: "The last Himalayan kingdom", hue: 25, aiScore: 87, highlights: ["Tiger's Nest", "Dzongs", "Happiness"] },
  { name: "Philippines", code: "PH", region: "Asia", tagline: "7,000 islands of turquoise", hue: 180, aiScore: 86, highlights: ["Palawan", "Boracay", "Diving"] },
  { name: "Cambodia", code: "KH", region: "Asia", tagline: "Jungle temples of empire", hue: 40, aiScore: 84, highlights: ["Angkor Wat", "Markets", "Khmer food"] },
  { name: "Morocco", code: "MA", region: "Africa", tagline: "Medinas, dunes and riads", hue: 265, aiScore: 88, highlights: ["Chefchaouen", "Marrakech", "Sahara"], trending: true },
  { name: "Kenya", code: "KE", region: "Africa", tagline: "The great migration awaits", hue: 55, aiScore: 86, highlights: ["Masai Mara", "Safari", "Rift Valley"] },
  { name: "Tanzania", code: "TZ", region: "Africa", tagline: "Kilimanjaro and Serengeti", hue: 90, aiScore: 87, highlights: ["Serengeti", "Kilimanjaro", "Zanzibar"] },
  { name: "Mauritius", code: "MU", region: "Africa", tagline: "Lagoons and volcanic peaks", hue: 170, aiScore: 85, highlights: ["Lagoons", "Le Morne", "Reefs"] },
  { name: "Seychelles", code: "SC", region: "Africa", tagline: "Granite boulders and powder sand", hue: 165, aiScore: 88, highlights: ["Anse Source", "Island hop", "Snorkel"] },
  { name: "Qatar", code: "QA", region: "Middle East", tagline: "Modern art of the desert coast", hue: 300, aiScore: 84, highlights: ["Doha", "Souq Waqif", "Dunes"] },
  { name: "Saudi Arabia", code: "SA", region: "Middle East", tagline: "Ancient tombs, new frontiers", hue: 35, aiScore: 83, highlights: ["AlUla", "Red Sea", "Riyadh"] },
  { name: "Jordan", code: "JO", region: "Middle East", tagline: "Rose city and desert nights", hue: 20, aiScore: 88, highlights: ["Petra", "Wadi Rum", "Dead Sea"] },
  { name: "Peru", code: "PE", region: "Americas", tagline: "Lost cities in the clouds", hue: 130, aiScore: 90, highlights: ["Machu Picchu", "Cusco", "Amazon"], trending: true },
  { name: "Argentina", code: "AR", region: "Americas", tagline: "Tango, glaciers and steak", hue: 205, aiScore: 85, highlights: ["Patagonia", "Buenos Aires", "Iguazu"] },
  { name: "Croatia", code: "HR", region: "Europe", tagline: "Adriatic walls and islands", hue: 210, aiScore: 87, highlights: ["Dubrovnik", "Plitvice", "Hvar"] },
];

export const REGIONS = ["All", "Asia", "Europe", "Americas", "Africa", "Middle East", "Oceania"] as const;

/* ----------------------------------- Hero slides ----------------------------------- */

export type HeroSlide = {
  id: string;
  title: string;
  location: string;
  country: string;
  description: string;
  image: string;
  bestTime: string;
  food: string;
  budget: string;
  aiScore: number;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "kyoto",
    title: "Explore Kyoto",
    location: "Kyoto, Japan",
    country: "Japan",
    description: "Golden temples, bamboo groves and geisha-lit lanes at dusk.",
    image: "/images/hero-kyoto.png",
    bestTime: "Mar–May, Oct–Nov",
    food: "Kaiseki, matcha, ramen",
    budget: "₹1.6L / week",
    aiScore: 96,
  },
  {
    id: "switzerland",
    title: "Discover Switzerland",
    location: "Zermatt, Switzerland",
    country: "Switzerland",
    description: "Ride glacier rails beneath the mighty Matterhorn.",
    image: "/images/hero-swiss-alps.png",
    bestTime: "Jun–Sep, Dec–Mar",
    food: "Fondue, rösti, chocolate",
    budget: "₹2.4L / week",
    aiScore: 95,
  },
  {
    id: "thailand",
    title: "Hidden Thailand",
    location: "Phi Phi Islands",
    country: "Thailand",
    description: "Turquoise lagoons ringed by dramatic limestone cliffs.",
    image: "/images/dest-phiphi.png",
    bestTime: "Nov–Apr",
    food: "Pad thai, mango sticky rice",
    budget: "₹90k / week",
    aiScore: 91,
  },
  {
    id: "paris",
    title: "Experience Paris",
    location: "Paris, France",
    country: "France",
    description: "Café mornings, gallery afternoons and river-lit nights.",
    image: "/images/dest-eiffel.png",
    bestTime: "Apr–Jun, Sep–Oct",
    food: "Croissants, escargot, wine",
    budget: "₹1.9L / week",
    aiScore: 93,
  },
  {
    id: "banff",
    title: "Adventure in Canada",
    location: "Banff, Canada",
    country: "Canada",
    description: "Glassy alpine lakes framed by the endless Rockies.",
    image: "/images/dest-banff.png",
    bestTime: "Jun–Sep",
    food: "Poutine, bison, maple",
    budget: "₹2.1L / week",
    aiScore: 90,
  },
];

/* ----------------------------------- Content modules ----------------------------------- */

export type Place = {
  id: string;
  name: string;
  category: string; // used for filters
  image: string;
  rating: number;
  reviews: number;
  price: number; // per night / per meal / entry
  priceUnit: string;
  distanceKm: number;
  tags: string[];
  blurb: string;
  aiScore: number;
  crowd?: "Low" | "Medium" | "High";
  bestTime?: string;
};

export const HOTELS: Place[] = [
  { id: "h1", name: "Aman Skyline Suites", category: "Luxury", image: "/images/hero-dubai.png", rating: 4.9, reviews: 1820, price: 24000, priceUnit: "night", distanceKm: 1.2, tags: ["Pool", "Spa", "Rooftop"], blurb: "Floor-to-ceiling city views with a cloud-level infinity pool.", aiScore: 97 },
  { id: "h2", name: "Sakura Ryokan Retreat", category: "Boutique", image: "/images/hero-kyoto.png", rating: 4.8, reviews: 940, price: 12500, priceUnit: "night", distanceKm: 2.8, tags: ["Onsen", "Garden", "Breakfast"], blurb: "A tranquil timber ryokan with private hot-spring baths.", aiScore: 94 },
  { id: "h3", name: "Alpine Glass Lodge", category: "Luxury", image: "/images/dest-matterhorn.png", rating: 4.9, reviews: 610, price: 31000, priceUnit: "night", distanceKm: 4.5, tags: ["Ski-in", "Fireplace", "Views"], blurb: "Wake to the Matterhorn from a heated glass chalet.", aiScore: 96 },
  { id: "h4", name: "Lagoon Overwater Villas", category: "Couples", image: "/images/hero-maldives.png", rating: 4.9, reviews: 1330, price: 42000, priceUnit: "night", distanceKm: 0.4, tags: ["Overwater", "Reef", "Butler"], blurb: "Step from your deck into a private turquoise lagoon.", aiScore: 98 },
  { id: "h5", name: "Cliffside Blue Domes", category: "Boutique", image: "/images/hero-santorini.png", rating: 4.7, reviews: 2210, price: 18500, priceUnit: "night", distanceKm: 3.1, tags: ["Caldera view", "Plunge pool"], blurb: "Whitewashed caves perched over the Aegean sunset.", aiScore: 92 },
  { id: "h6", name: "Harbour Family Loft", category: "Family", image: "/images/dest-sydney.png", rating: 4.6, reviews: 780, price: 9800, priceUnit: "night", distanceKm: 2.0, tags: ["Kitchen", "2BR", "Harbour"], blurb: "Roomy loft steps from the Opera House and ferries.", aiScore: 88 },
  { id: "h7", name: "Desert Dune Camp", category: "Budget", image: "/images/hero-dubai.png", rating: 4.5, reviews: 540, price: 6200, priceUnit: "night", distanceKm: 22, tags: ["Stargazing", "BBQ"], blurb: "Glamping tents under a blazing Milky Way.", aiScore: 85 },
  { id: "h8", name: "Riviera Grand Hotel", category: "Luxury", image: "/images/dest-amalfi.png", rating: 4.8, reviews: 1450, price: 27000, priceUnit: "night", distanceKm: 1.6, tags: ["Beach club", "Michelin"], blurb: "Belle Époque glamour on the Amalfi cliffs.", aiScore: 93 },
];

export const RESTAURANTS: Place[] = [
  { id: "r1", name: "Kaiseki Hana", category: "Fine dining", image: "/images/hero-kyoto.png", rating: 4.9, reviews: 620, price: 5400, priceUnit: "meal", distanceKm: 1.1, tags: ["Japanese", "Tasting menu"], blurb: "Twelve seasonal courses plated like edible art.", aiScore: 96 },
  { id: "r2", name: "Nonna's Amalfi Table", category: "Local food", image: "/images/dest-amalfi.png", rating: 4.8, reviews: 1980, price: 2200, priceUnit: "meal", distanceKm: 0.8, tags: ["Italian", "Seafood"], blurb: "Hand-rolled pasta with lemons from the terrace.", aiScore: 93 },
  { id: "r3", name: "Night Market Wok", category: "Street food", image: "/images/dest-phiphi.png", rating: 4.7, reviews: 3120, price: 450, priceUnit: "meal", distanceKm: 1.9, tags: ["Thai", "Vegetarian"], blurb: "Smoky pad thai fired to order at a buzzing stall.", aiScore: 90 },
  { id: "r4", name: "Spice Route Thali", category: "Local food", image: "/images/dest-taj-mahal.png", rating: 4.8, reviews: 2640, price: 650, priceUnit: "meal", distanceKm: 2.4, tags: ["Indian", "Vegetarian", "Halal"], blurb: "Endless regional thali served on a banana leaf.", aiScore: 92 },
  { id: "r5", name: "Le Petit Jardin", category: "Fine dining", image: "/images/dest-eiffel.png", rating: 4.7, reviews: 1210, price: 4800, priceUnit: "meal", distanceKm: 1.3, tags: ["French", "Wine pairing"], blurb: "Candlelit courtyard bistro two blocks from the tower.", aiScore: 91 },
  { id: "r6", name: "Souk Tagine House", category: "Local food", image: "/images/dest-chefchaouen.png", rating: 4.6, reviews: 880, price: 900, priceUnit: "meal", distanceKm: 3.0, tags: ["Moroccan", "Halal", "Vegan"], blurb: "Slow-cooked tagines in a blue-washed courtyard.", aiScore: 88 },
  { id: "r7", name: "Harbourside Grill", category: "Fine dining", image: "/images/dest-sydney.png", rating: 4.7, reviews: 1540, price: 3600, priceUnit: "meal", distanceKm: 1.7, tags: ["Seafood", "Vegan"], blurb: "Just-caught seafood with a front-row harbour view.", aiScore: 89 },
  { id: "r8", name: "Alpine Fondue Stube", category: "Local food", image: "/images/dest-matterhorn.png", rating: 4.6, reviews: 720, price: 2800, priceUnit: "meal", distanceKm: 4.2, tags: ["Swiss", "Vegetarian"], blurb: "Bubbling cheese fondue in a cozy timber chalet.", aiScore: 87 },
];

export const PLACES: Place[] = [
  { id: "p1", name: "Taj Mahal", category: "Landmark", image: "/images/dest-taj-mahal.png", rating: 4.9, reviews: 51200, price: 1100, priceUnit: "entry", distanceKm: 3.4, tags: ["Icon", "Sunrise"], blurb: "The marble monument to love, luminous at dawn.", aiScore: 99, crowd: "High", bestTime: "6–8 AM" },
  { id: "p2", name: "Eiffel Tower", category: "Landmark", image: "/images/dest-eiffel.png", rating: 4.8, reviews: 68400, price: 2600, priceUnit: "entry", distanceKm: 1.2, tags: ["Icon", "Night view"], blurb: "Ascend the iron lattice as the city sparkles.", aiScore: 96, crowd: "High", bestTime: "After 8 PM" },
  { id: "p3", name: "Grand Canyon Rim", category: "Nature", image: "/images/dest-grand-canyon.png", rating: 4.9, reviews: 30200, price: 1700, priceUnit: "entry", distanceKm: 12, tags: ["Nature", "Hiking"], blurb: "A mile-deep chasm glowing red at golden hour.", aiScore: 95, crowd: "Medium", bestTime: "Sunset" },
  { id: "p4", name: "Sydney Opera House", category: "Landmark", image: "/images/dest-sydney.png", rating: 4.7, reviews: 42100, price: 3200, priceUnit: "entry", distanceKm: 0.9, tags: ["Icon", "Tour"], blurb: "Step inside the sails of a modern wonder.", aiScore: 92, crowd: "Medium", bestTime: "Morning" },
  { id: "p5", name: "Mount Fuji Viewpoint", category: "Nature", image: "/images/dest-fuji.png", rating: 4.8, reviews: 21800, price: 0, priceUnit: "free", distanceKm: 28, tags: ["Nature", "Photo"], blurb: "The perfect snow-capped cone mirrored in the lake.", aiScore: 94, crowd: "Medium", bestTime: "Sunrise" },
  { id: "p6", name: "Banff Lake Trail", category: "Nature", image: "/images/dest-banff.png", rating: 4.9, reviews: 15400, price: 0, priceUnit: "free", distanceKm: 6.5, tags: ["Hiking", "Nature"], blurb: "Glacier-fed turquoise water beneath jagged peaks.", aiScore: 93, crowd: "Low", bestTime: "Early AM" },
  { id: "p7", name: "Burj Khalifa Deck", category: "Landmark", image: "/images/dest-burj-khalifa.png", rating: 4.7, reviews: 38900, price: 4200, priceUnit: "entry", distanceKm: 2.1, tags: ["Icon", "Skyline"], blurb: "The world's highest observation deck at dusk.", aiScore: 91, crowd: "High", bestTime: "Sunset" },
  { id: "p8", name: "Santorini Caldera Walk", category: "Nature", image: "/images/hero-santorini.png", rating: 4.8, reviews: 19700, price: 0, priceUnit: "free", distanceKm: 2.0, tags: ["Sunset", "Coastal"], blurb: "Cliff-edge path from Fira to Oia at sunset.", aiScore: 92, crowd: "Medium", bestTime: "Evening" },
];

export const TEMPLES: Place[] = [
  { id: "t1", name: "Fushimi Inari Shrine", category: "Shrine", image: "/images/hero-kyoto.png", rating: 4.9, reviews: 44300, price: 0, priceUnit: "free", distanceKm: 4.0, tags: ["Shinto", "Hike"], blurb: "Thousands of vermilion torii winding up the mountain.", aiScore: 97, crowd: "High", bestTime: "Before 8 AM" },
  { id: "t2", name: "Tiger's Nest Monastery", category: "Monastery", image: "/images/dest-fuji.png", rating: 4.9, reviews: 8600, price: 1500, priceUnit: "entry", distanceKm: 9.5, tags: ["Buddhist", "Cliff"], blurb: "A sacred monastery clinging to a Himalayan cliff.", aiScore: 96, crowd: "Low", bestTime: "Morning" },
  { id: "t3", name: "Angkor Wat", category: "Temple", image: "/images/dest-taj-mahal.png", rating: 4.9, reviews: 39900, price: 3000, priceUnit: "entry", distanceKm: 6.0, tags: ["Hindu", "Sunrise"], blurb: "The largest religious monument, glowing at sunrise.", aiScore: 98, crowd: "High", bestTime: "5–6 AM" },
  { id: "t4", name: "Blue Mosque", category: "Mosque", image: "/images/dest-chefchaouen.png", rating: 4.8, reviews: 27500, price: 0, priceUnit: "free", distanceKm: 2.6, tags: ["Islamic", "Architecture"], blurb: "Cascading domes and twenty thousand blue tiles.", aiScore: 93, crowd: "Medium", bestTime: "Mid-morning" },
  { id: "t5", name: "Sagrada Família", category: "Church", image: "/images/dest-eiffel.png", rating: 4.8, reviews: 61200, price: 2400, priceUnit: "entry", distanceKm: 3.3, tags: ["Gaudí", "Architecture"], blurb: "Gaudí's forest of stone pillars bathed in stained light.", aiScore: 95, crowd: "High", bestTime: "Afternoon" },
  { id: "t6", name: "Wat Arun", category: "Temple", image: "/images/dest-phiphi.png", rating: 4.7, reviews: 18300, price: 500, priceUnit: "entry", distanceKm: 3.9, tags: ["Buddhist", "River"], blurb: "The Temple of Dawn shimmering over the river.", aiScore: 90, crowd: "Medium", bestTime: "Sunset" },
];

export const HIDDEN_GEMS: Place[] = [
  { id: "g1", name: "Chefchaouen Blue Lanes", category: "Village", image: "/images/dest-chefchaouen.png", rating: 4.9, reviews: 6200, price: 0, priceUnit: "free", distanceKm: 5.0, tags: ["Photo", "Culture"], blurb: "An entire mountain town washed in dreamy blue.", aiScore: 95 },
  { id: "g2", name: "Neuschwanstein Overlook", category: "Viewpoint", image: "/images/dest-neuschwanstein.png", rating: 4.8, reviews: 4100, price: 0, priceUnit: "free", distanceKm: 7.2, tags: ["Castle", "Photo"], blurb: "The bridge angle on the fairytale castle few find.", aiScore: 92 },
  { id: "g3", name: "Secret Amalfi Cove", category: "Beach", image: "/images/dest-amalfi.png", rating: 4.7, reviews: 1800, price: 0, priceUnit: "free", distanceKm: 4.6, tags: ["Swim", "Quiet"], blurb: "A hidden pebble cove reached by a cliff staircase.", aiScore: 90 },
  { id: "g4", name: "Fuji Moss Forest", category: "Nature", image: "/images/dest-fuji.png", rating: 4.6, reviews: 900, price: 0, priceUnit: "free", distanceKm: 18, tags: ["Hike", "Quiet"], blurb: "A silent emerald forest at the foot of the volcano.", aiScore: 88 },
  { id: "g5", name: "Backstreet Ramen Counter", category: "Cafe", image: "/images/hero-kyoto.png", rating: 4.8, reviews: 2600, price: 700, priceUnit: "meal", distanceKm: 1.4, tags: ["Food", "Local"], blurb: "Eight seats, one broth simmered for eighteen hours.", aiScore: 91 },
  { id: "g6", name: "Banff Larch Meadow", category: "Viewpoint", image: "/images/dest-banff.png", rating: 4.9, reviews: 1500, price: 0, priceUnit: "free", distanceKm: 11, tags: ["Hike", "Autumn"], blurb: "Golden larches framing a mirror-still tarn.", aiScore: 93 },
];

export type TravelEvent = {
  id: string;
  name: string;
  category: string;
  image: string;
  date: string;
  price: number;
  distanceKm: number;
  tags: string[];
  blurb: string;
  aiScore: number;
};

export const EVENTS: TravelEvent[] = [
  { id: "e1", name: "Lantern River Festival", category: "Cultural", image: "/images/hero-kyoto.png", date: "Tonight · 7:00 PM", price: 0, distanceKm: 0.8, tags: ["Free", "Family"], blurb: "Thousands of paper lanterns released down the river.", aiScore: 96 },
  { id: "e2", name: "Rooftop Jazz & Skyline", category: "Nightlife", image: "/images/hero-dubai.png", date: "Tonight · 9:30 PM", price: 1800, distanceKm: 2.1, tags: ["Music", "21+"], blurb: "Live quartet against a glittering skyline.", aiScore: 89 },
  { id: "e3", name: "Coastal Food Carnival", category: "Food", image: "/images/dest-amalfi.png", date: "Tomorrow · 12:00 PM", price: 600, distanceKm: 1.3, tags: ["Food", "Family"], blurb: "Fifty stalls of regional seafood and street eats.", aiScore: 93 },
  { id: "e4", name: "Desert Stargazing Night", category: "Seasonal", image: "/images/hero-dubai.png", date: "Fri · 8:00 PM", price: 2400, distanceKm: 22, tags: ["Nature", "Guided"], blurb: "Telescope tour of the winter sky with a bonfire.", aiScore: 90 },
  { id: "e5", name: "Old Town Culture Walk", category: "Cultural", image: "/images/dest-chefchaouen.png", date: "Sat · 10:00 AM", price: 400, distanceKm: 0.5, tags: ["Guided", "Free spots"], blurb: "A storyteller-led wander through the medina.", aiScore: 87 },
  { id: "e6", name: "Harbour Fireworks Show", category: "Seasonal", image: "/images/dest-sydney.png", date: "Sat · 9:00 PM", price: 0, distanceKm: 1.9, tags: ["Free", "Family"], blurb: "The harbour lights up over the water.", aiScore: 91 },
];

export const SECTION_META: Record<string, { title: string; blurb: string; data: (Place | TravelEvent)[]; filters: string[] }> = {
  events: { title: "Events near you", blurb: "Festivals, nightlife and happenings the AI ranked for tonight.", data: EVENTS, filters: ["Cultural", "Food", "Nightlife", "Seasonal"] },
  hotels: { title: "Stays for you", blurb: "Smart hotel picks scored for your budget and trip style.", data: HOTELS, filters: ["Luxury", "Boutique", "Couples", "Family", "Budget"] },
  restaurants: { title: "Where to eat", blurb: "From street woks to tasting menus, matched to your taste.", data: RESTAURANTS, filters: ["Fine dining", "Local food", "Street food"] },
  places: { title: "Places to see", blurb: "Landmarks and nature, with AI crowd and timing intel.", data: PLACES, filters: ["Landmark", "Nature"] },
  temples: { title: "Temples & sacred sites", blurb: "Shrines, monasteries and cultural landmarks to explore.", data: TEMPLES, filters: ["Temple", "Shrine", "Monastery", "Mosque", "Church"] },
  gems: { title: "Hidden gems", blurb: "Off-radar spots the AI surfaced just for you.", data: HIDDEN_GEMS, filters: ["Viewpoint", "Village", "Beach", "Cafe", "Nature"] },
};

/* ----------------------------------- Visa ----------------------------------- */

export type VisaStatus = "ready" | "action" | "urgent";

export type VisaRule = {
  destination: string;
  type: string;
  processing: string;
  fee: string;
  validity: string;
  documents: string[];
  status: VisaStatus;
  note: string;
};

// Simplified illustrative matrix keyed by destination for an Indian passport holder.
export const VISA_RULES: Record<string, VisaRule> = {
  Japan: { destination: "Japan", type: "eVisa (Tourist)", processing: "5–7 days", fee: "₹3,000", validity: "90 days", documents: ["Passport (6mo)", "Photo", "Itinerary", "Bank statement"], status: "action", note: "Apply at least 2 weeks before departure." },
  Thailand: { destination: "Thailand", type: "Visa on Arrival", processing: "On arrival", fee: "₹5,500", validity: "15 days", documents: ["Passport", "Return ticket", "Photo"], status: "ready", note: "Carry cash for the arrival fee." },
  France: { destination: "France", type: "Schengen (Short stay)", processing: "15 days", fee: "₹7,200", validity: "90 days", documents: ["Passport", "Insurance", "Hotel booking", "Financials"], status: "urgent", note: "Travel insurance of €30,000 is mandatory." },
  UAE: { destination: "UAE", type: "eVisa (Tourist)", processing: "3–4 days", fee: "₹6,000", validity: "30 days", documents: ["Passport", "Photo", "Confirmed ticket"], status: "ready", note: "Fast online approval, no embassy visit." },
  Switzerland: { destination: "Switzerland", type: "Schengen (Short stay)", processing: "15 days", fee: "₹7,200", validity: "90 days", documents: ["Passport", "Insurance", "Accommodation", "Financials"], status: "action", note: "Book an appointment at the visa centre early." },
  Maldives: { destination: "Maldives", type: "Free Visa on Arrival", processing: "On arrival", fee: "Free", validity: "30 days", documents: ["Passport", "Return ticket", "Hotel booking"], status: "ready", note: "No pre-approval required." },
};

/* ----------------------------------- Notifications ----------------------------------- */

export type NotificationPriority = "urgent" | "important" | "info";

export type AppNotification = {
  id: string;
  priority: NotificationPriority;
  title: string;
  body: string;
  time: string;
};

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  { id: "n1", priority: "urgent", title: "Visa action required", body: "Your France Schengen visa needs travel insurance uploaded within 5 days.", time: "2m ago" },
  { id: "n2", priority: "important", title: "Hotel check-in tomorrow", body: "Sakura Ryokan Retreat check-in opens at 2:00 PM. Bring your booking QR.", time: "1h ago" },
  { id: "n3", priority: "info", title: "AI found a food festival", body: "Coastal Food Carnival is 1.3 km away tomorrow — matches your love of seafood.", time: "3h ago" },
  { id: "n4", priority: "important", title: "Budget watch", body: "You are spending 18% more on food than your daily average.", time: "5h ago" },
  { id: "n5", priority: "info", title: "Weather update", body: "Clear skies until 6 PM — a great window for the caldera walk.", time: "6h ago" },
];

/* ----------------------------------- Budget categories ----------------------------------- */

export const EXPENSE_CATEGORIES = ["Hotel", "Food", "Cab", "Shopping", "Tickets", "Activities", "Flights", "Other"] as const;
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export type Expense = {
  id: string;
  label: string;
  category: ExpenseCategory;
  amount: number;
};

export const INITIAL_EXPENSES: Expense[] = [
  { id: "x1", label: "Return flights", category: "Flights", amount: 48000 },
  { id: "x2", label: "Ryokan · 3 nights", category: "Hotel", amount: 37500 },
  { id: "x3", label: "Kaiseki dinner", category: "Food", amount: 5400 },
  { id: "x4", label: "Airport transfer", category: "Cab", amount: 2200 },
  { id: "x5", label: "Temple entries", category: "Tickets", amount: 1800 },
];
