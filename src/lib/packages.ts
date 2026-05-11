export type Pkg = {
  id: string;
  title: string;
  destination: string;
  country: string;
  category: "Beach Breaks" | "Adventure" | "City Breaks" | "Cruise" | "Romance" | "Wellness" | "Tours" | "Safari";
  tags: string[];
  priceUSD: number;
  nights: number;
  validFrom: string;
  validTo: string;
  image: string;
  hotel: string;
  includes: string[];
  description: string;
  region: "Local" | "International";
};

const img = (q: string, sig: number) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1200&q=80&sig=${sig}`;

export const PACKAGES: Pkg[] = [
  {
    id: "zanzibar-mora",
    title: "The Mora Zanzibar Beachfront",
    destination: "Zanzibar",
    country: "Tanzania",
    category: "Beach Breaks",
    tags: ["Kids Stay Free", "All Inclusive"],
    priceUSD: 38065,
    nights: 7,
    validFrom: "2026-05-04",
    validTo: "2026-06-30",
    image: img("photo-1559827260-dc66d52bef19", 1),
    hotel: "The Mora Zanzibar 5★",
    includes: ["Return flights ex JNB", "7 nights accommodation", "All meals & drinks", "Airport transfers"],
    description:
      "Powder-white sand, turquoise water and barefoot luxury on Zanzibar's east coast. Spend your days snorkelling the reef and your evenings dining on freshly grilled seafood under the stars.",
    region: "International",
  },
  {
    id: "albania-tour",
    title: "An Unforgettable Trip to Albania",
    destination: "Tirana & Riviera",
    country: "Albania",
    category: "Tours",
    tags: ["Amazing Experience"],
    priceUSD: 29450,
    nights: 9,
    validFrom: "2026-06-21",
    validTo: "2026-12-20",
    image: img("photo-1601581875309-fafbf2d3ed3a", 2),
    hotel: "Boutique hotels throughout",
    includes: ["Return flights", "9 nights accommodation", "Guided tours", "Daily breakfast"],
    description:
      "Discover Europe's best-kept secret. Explore Ottoman old towns, Byzantine castles and the dazzling Albanian Riviera on this guided small-group tour.",
    region: "International",
  },
  {
    id: "maldives-constance",
    title: "Constance Moofushi Maldives",
    destination: "South Ari Atoll",
    country: "Maldives",
    category: "Beach Breaks",
    tags: ["All Inclusive", "Romantic"],
    priceUSD: 64900,
    nights: 6,
    validFrom: "2026-04-10",
    validTo: "2026-09-30",
    image: img("photo-1514282401047-d79a71a590e8", 3),
    hotel: "Constance Moofushi 5★",
    includes: ["Return flights ex JNB", "6 nights overwater villa", "All inclusive premium", "Speedboat transfers"],
    description:
      "Overwater villas, house-reef snorkelling and barefoot elegance. The crystal-clear lagoons of the South Ari Atoll are home to whale sharks and manta rays year-round.",
    region: "International",
  },
  {
    id: "mauritius-family",
    title: "Mauritius Family Escape",
    destination: "Flic en Flac",
    country: "Mauritius",
    category: "Beach Breaks",
    tags: ["Kids Stay Free", "Hot Deal"],
    priceUSD: 24990,
    nights: 7,
    validFrom: "2026-03-01",
    validTo: "2026-11-30",
    image: img("photo-1544551763-46a013bb70d5", 4),
    hotel: "Sands Suites Resort 4★",
    includes: ["Return flights", "7 nights half-board", "Kids club", "Airport transfers"],
    description:
      "Family-friendly all-inclusive on Mauritius' sunset coast. Endless lagoon swims, kids clubs, and sundowners over the Indian Ocean.",
    region: "International",
  },
  {
    id: "kruger-safari",
    title: "Classic Kruger Safari",
    destination: "Greater Kruger",
    country: "South Africa",
    category: "Safari",
    tags: ["Safari", "Amazing Experience"],
    priceUSD: 18750,
    nights: 4,
    validFrom: "2026-02-01",
    validTo: "2026-12-15",
    image: img("photo-1547970810-dc1eac37d174", 5),
    hotel: "Sabi Sands Lodge",
    includes: ["Return flights to Hoedspruit", "4 nights full-board", "Twice-daily game drives", "Park fees"],
    description:
      "Track the Big Five through the Sabi Sands with expert rangers. Open-vehicle game drives, bush dinners and luxury tented suites.",
    region: "Local",
  },
  {
    id: "capetown-citybreak",
    title: "Cape Town City & Wine",
    destination: "Cape Town",
    country: "South Africa",
    category: "City Breaks",
    tags: ["Hot Deal"],
    priceUSD: 12450,
    nights: 4,
    validFrom: "2026-01-15",
    validTo: "2026-12-20",
    image: img("photo-1580060839134-75a5edca2e99", 6),
    hotel: "The Silo Hotel 5★",
    includes: ["Return flights", "4 nights B&B", "Table Mountain cable car", "Winelands day tour"],
    description:
      "From the V&A Waterfront to the Stellenbosch winelands — taste, sip and soak in one of the world's most spectacular cities.",
    region: "Local",
  },
  {
    id: "thailand-island",
    title: "Thailand Island Hopper",
    destination: "Phuket & Krabi",
    country: "Thailand",
    category: "Adventure",
    tags: ["Adventure", "Hot Deal"],
    priceUSD: 27600,
    nights: 8,
    validFrom: "2026-04-01",
    validTo: "2026-10-31",
    image: img("photo-1552465011-b4e21bf6e79a", 7),
    hotel: "Mixed 4★ resorts",
    includes: ["Return flights", "8 nights accommodation", "Long-tail boat tours", "Daily breakfast"],
    description:
      "Limestone cliffs, hidden lagoons and street-food feasts. Hop between Phuket, Phi Phi and Krabi on this island-hopping adventure.",
    region: "International",
  },
  {
    id: "santorini-romance",
    title: "Santorini Honeymoon",
    destination: "Oia",
    country: "Greece",
    category: "Romance",
    tags: ["Romantic", "Amazing Experience"],
    priceUSD: 45200,
    nights: 6,
    validFrom: "2026-05-15",
    validTo: "2026-09-30",
    image: img("photo-1570077188670-e3a8d69ac5ff", 8),
    hotel: "Cave Suite with plunge pool",
    includes: ["Return flights", "6 nights cave suite", "Caldera sunset cruise", "Private transfers"],
    description:
      "Whitewashed cliffs, indigo seas and the world's most romantic sunsets. A honeymoon in Oia is a memory you'll keep forever.",
    region: "International",
  },
  {
    id: "med-cruise",
    title: "Mediterranean MSC Cruise",
    destination: "Italy · France · Spain",
    country: "Mediterranean",
    category: "Cruise",
    tags: ["Cruise", "All Inclusive"],
    priceUSD: 32400,
    nights: 7,
    validFrom: "2026-06-01",
    validTo: "2026-09-15",
    image: img("photo-1548574505-5e239809ee19", 9),
    hotel: "MSC Grandiosa balcony cabin",
    includes: ["Return flights to Genoa", "7-night cruise", "Full board on ship", "Port taxes"],
    description:
      "Sail the Mediterranean's iconic ports — Genoa, Naples, Marseille, Barcelona and Palma — on MSC's flagship cruise.",
    region: "International",
  },
  {
    id: "bali-wellness",
    title: "Bali Yoga & Wellness Retreat",
    destination: "Ubud",
    country: "Indonesia",
    category: "Wellness",
    tags: ["Amazing Experience"],
    priceUSD: 26800,
    nights: 7,
    validFrom: "2026-03-10",
    validTo: "2026-11-20",
    image: img("photo-1518548419970-58e3b4079ab2", 10),
    hotel: "Jungle villa retreat",
    includes: ["Return flights", "7 nights villa", "Daily yoga & meditation", "Spa treatments"],
    description:
      "Reset and reconnect deep in the Balinese rainforest. Daily yoga, traditional spa rituals and plant-based cuisine.",
    region: "International",
  },
  {
    id: "victoria-falls",
    title: "Victoria Falls Adventure",
    destination: "Livingstone",
    country: "Zambia",
    category: "Adventure",
    tags: ["Adventure", "Amazing Experience"],
    priceUSD: 21300,
    nights: 4,
    validFrom: "2026-04-01",
    validTo: "2026-11-30",
    image: img("photo-1516026672322-bc52d61a55d5", 11),
    hotel: "Royal Livingstone 5★",
    includes: ["Return flights", "4 nights B&B", "Falls tour", "Sunset Zambezi cruise"],
    description:
      "Stand in the spray of Mosi-oa-Tunya, raft the mighty Zambezi and sip sundowners as elephants wade past your boat.",
    region: "Local",
  },
  {
    id: "dubai-stopover",
    title: "Dubai City Break",
    destination: "Downtown Dubai",
    country: "UAE",
    category: "City Breaks",
    tags: ["Hot Deal", "Amazing Experience"],
    priceUSD: 19990,
    nights: 4,
    validFrom: "2026-02-01",
    validTo: "2026-12-15",
    image: img("photo-1512453979798-5ea266f8880c", 12),
    hotel: "Address Downtown 5★",
    includes: ["Return flights ex JNB", "4 nights B&B", "Burj Khalifa entry", "Desert safari"],
    description:
      "Skyline views from the Burj Khalifa, gold-souk wandering and dunes at sunset. A long weekend that feels like a world away.",
    region: "International",
  },
];

export const CATEGORIES = [
  { id: "beach", label: "Beach & Sun", image: img("photo-1507525428034-b723cf961d3e", 100), match: ["Beach Breaks"] },
  { id: "adventure", label: "Adventure & Safari", image: img("photo-1547970810-dc1eac37d174", 101), match: ["Adventure", "Safari"] },
  { id: "city", label: "City Breaks", image: img("photo-1496588152823-86ff7695e68f", 102), match: ["City Breaks"] },
  { id: "cruise", label: "Cruises", image: img("photo-1548574505-5e239809ee19", 103), match: ["Cruise"] },
  { id: "romance", label: "Romance", image: img("photo-1518621736915-f3b1c41bfd00", 104), match: ["Romance"] },
  { id: "wellness", label: "Wellness & Sport", image: img("photo-1540206395-68808572332f", 105), match: ["Wellness"] },
];

export const FILTER_TAGS = [
  "Hot Deal", "All Inclusive", "Amazing Experience", "Kids Stay Free",
  "Beach", "Safari", "Romantic", "Cruise", "Adventure",
];

export const formatUSD = (n: number) =>
  "$" + n.toLocaleString("en-US");

export const getPackage = (id: string) => PACKAGES.find((p) => p.id === id);
