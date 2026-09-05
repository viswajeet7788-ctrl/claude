export type Category = "Beaches" | "Mountains" | "Cities" | "Culture" | "Adventure" | "Nature";

export type Destination = {
  id: string;
  name: string;
  city: string;
  country: string;
  countryId: string;
  categories: Category[];
  image: string;
  rating: number;
  reviews: number;
  popularity: number;
  priceFrom: number;
  blurb: string;
};

export type Country = {
  id: string;
  name: string;
  image: string;
};

export type HeroSlide = {
  id: string;
  title: string;
  location: string;
  tagline: string;
  image: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "santorini",
    title: "Chase the endless blue",
    location: "Santorini, Greece",
    tagline: "Whitewashed cliffs and Aegean sunsets that stop time.",
    image: "/images/hero-santorini.png",
  },
  {
    id: "maldives",
    title: "Wake up over water",
    location: "Maldives",
    tagline: "Overwater villas above impossibly clear lagoons.",
    image: "/images/hero-maldives.png",
  },
  {
    id: "alps",
    title: "Breathe the mountain air",
    location: "Swiss Alps, Switzerland",
    tagline: "Snow-capped peaks mirrored in emerald lakes.",
    image: "/images/hero-swiss-alps.png",
  },
  {
    id: "kyoto",
    title: "Walk through a thousand gates",
    location: "Kyoto, Japan",
    tagline: "Vermilion torii winding through ancient forest.",
    image: "/images/hero-kyoto.png",
  },
  {
    id: "dubai",
    title: "Touch the skyline",
    location: "Dubai, UAE",
    tagline: "Futuristic towers glowing over the desert dusk.",
    image: "/images/hero-dubai.png",
  },
];

export const destinations: Destination[] = [
  {
    id: "burj-khalifa",
    name: "Burj Khalifa",
    city: "Dubai",
    country: "United Arab Emirates",
    countryId: "uae",
    categories: ["Cities", "Adventure"],
    image: "/images/dest-burj-khalifa.png",
    rating: 4.8,
    reviews: 12840,
    popularity: 98,
    priceFrom: 210,
    blurb: "Ascend the world's tallest tower for skyline views that never end.",
  },
  {
    id: "matterhorn",
    name: "The Matterhorn",
    city: "Zermatt",
    country: "Switzerland",
    countryId: "switzerland",
    categories: ["Mountains", "Adventure"],
    image: "/images/dest-matterhorn.png",
    rating: 4.9,
    reviews: 8210,
    popularity: 94,
    priceFrom: 180,
    blurb: "Hike beneath the most photographed peak in the Alps.",
  },
  {
    id: "neuschwanstein",
    name: "Neuschwanstein Castle",
    city: "Bavaria",
    country: "Germany",
    countryId: "germany",
    categories: ["Culture", "Mountains"],
    image: "/images/dest-neuschwanstein.png",
    rating: 4.7,
    reviews: 15320,
    popularity: 90,
    priceFrom: 95,
    blurb: "Step into the fairytale castle that inspired a kingdom of dreams.",
  },
  {
    id: "eiffel-tower",
    name: "Eiffel Tower",
    city: "Paris",
    country: "France",
    countryId: "france",
    categories: ["Cities", "Culture"],
    image: "/images/dest-eiffel.png",
    rating: 4.6,
    reviews: 42010,
    popularity: 99,
    priceFrom: 120,
    blurb: "Sip wine beneath the iron lady as the city lights flicker on.",
  },
  {
    id: "chefchaouen",
    name: "The Blue City",
    city: "Chefchaouen",
    country: "Morocco",
    countryId: "morocco",
    categories: ["Culture", "Cities"],
    image: "/images/dest-chefchaouen.png",
    rating: 4.7,
    reviews: 6120,
    popularity: 82,
    priceFrom: 70,
    blurb: "Wander cobalt alleys tucked into the Rif Mountains.",
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    city: "Agra",
    country: "India",
    countryId: "india",
    categories: ["Culture"],
    image: "/images/dest-taj-mahal.png",
    rating: 4.9,
    reviews: 33940,
    popularity: 96,
    priceFrom: 60,
    blurb: "Watch dawn light glow across the world's grandest monument to love.",
  },
  {
    id: "grand-canyon",
    name: "Grand Canyon",
    city: "Arizona",
    country: "United States",
    countryId: "usa",
    categories: ["Nature", "Adventure"],
    image: "/images/dest-grand-canyon.png",
    rating: 4.8,
    reviews: 28770,
    popularity: 93,
    priceFrom: 85,
    blurb: "Stand on the rim of a mile-deep masterpiece carved over eons.",
  },
  {
    id: "sydney-opera",
    name: "Sydney Opera House",
    city: "Sydney",
    country: "Australia",
    countryId: "australia",
    categories: ["Cities", "Culture"],
    image: "/images/dest-sydney.png",
    rating: 4.6,
    reviews: 19450,
    popularity: 88,
    priceFrom: 140,
    blurb: "Catch a show under the sails on the sparkling harbour.",
  },
  {
    id: "banff",
    name: "Moraine Lake",
    city: "Banff",
    country: "Canada",
    countryId: "canada",
    categories: ["Nature", "Mountains"],
    image: "/images/dest-banff.png",
    rating: 4.9,
    reviews: 11230,
    popularity: 91,
    priceFrom: 110,
    blurb: "Paddle across turquoise glacial water ringed by rugged peaks.",
  },
  {
    id: "mount-fuji",
    name: "Mount Fuji",
    city: "Honshu",
    country: "Japan",
    countryId: "japan",
    categories: ["Nature", "Mountains"],
    image: "/images/dest-fuji.png",
    rating: 4.8,
    reviews: 17600,
    popularity: 92,
    priceFrom: 130,
    blurb: "Frame Japan's sacred volcano behind clouds of cherry blossom.",
  },
  {
    id: "amalfi",
    name: "Amalfi Coast",
    city: "Positano",
    country: "Italy",
    countryId: "italy",
    categories: ["Beaches", "Culture"],
    image: "/images/dest-amalfi.png",
    rating: 4.8,
    reviews: 21300,
    popularity: 95,
    priceFrom: 160,
    blurb: "Cling to pastel cliffs above the shimmering Mediterranean.",
  },
  {
    id: "phi-phi",
    name: "Phi Phi Islands",
    city: "Krabi",
    country: "Thailand",
    countryId: "thailand",
    categories: ["Beaches", "Adventure"],
    image: "/images/dest-phiphi.png",
    rating: 4.7,
    reviews: 14980,
    popularity: 89,
    priceFrom: 75,
    blurb: "Drift between limestone towers rising from turquoise seas.",
  },
];

export const countries: Country[] = [
  { id: "uae", name: "UAE", image: "/images/dest-burj-khalifa.png" },
  { id: "switzerland", name: "Switzerland", image: "/images/dest-matterhorn.png" },
  { id: "italy", name: "Italy", image: "/images/dest-amalfi.png" },
  { id: "japan", name: "Japan", image: "/images/dest-fuji.png" },
  { id: "france", name: "France", image: "/images/dest-eiffel.png" },
  { id: "thailand", name: "Thailand", image: "/images/dest-phiphi.png" },
  { id: "usa", name: "USA", image: "/images/dest-grand-canyon.png" },
  { id: "india", name: "India", image: "/images/dest-taj-mahal.png" },
  { id: "canada", name: "Canada", image: "/images/dest-banff.png" },
  { id: "germany", name: "Germany", image: "/images/dest-neuschwanstein.png" },
  { id: "morocco", name: "Morocco", image: "/images/dest-chefchaouen.png" },
  { id: "australia", name: "Australia", image: "/images/dest-sydney.png" },
];

export const categories: (Category | "All")[] = [
  "All",
  "Beaches",
  "Mountains",
  "Cities",
  "Culture",
  "Adventure",
  "Nature",
];

export const nationalities = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "India",
  "Germany",
  "France",
  "Italy",
  "Japan",
  "United Arab Emirates",
  "Brazil",
  "Singapore",
];
