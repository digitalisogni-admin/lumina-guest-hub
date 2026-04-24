import type { Guest, Reservation, ServiceRequest } from "./types";

// Demo guest — Ms. Eleanor Chen, Suite 1204
export const MOCK_GUEST: Guest = {
  name: "Eleanor Chen",
  salutation: "Ms.",
  preferences: ["Vegan", "Quiet floor", "Sparkling water"],
  loyaltyTier: "Aurora Platinum",
  points: 12450,
  memberSince: 2024,
  languagePreference: "en",
  companions: [
    { name: "Michael Chen", relation: "Spouse", preferences: ["Extra pillows", "Early riser"] },
    { name: "Sophia Chen", relation: "Daughter", preferences: ["Kids menu", "Allergies: Peanuts"] },
  ],
  pastStays: [
    { property: "Aurora Kyoto", location: "Kyoto, Japan", date: "Dec 2025" },
    { property: "Aurora Paris", location: "Paris, France", date: "Mar 2025" },
  ],
};

export const MOCK_RESERVATION: Reservation = {
  room: "Suite 1204",
  checkIn: "2026-04-22",
  checkOut: "2026-04-26",
  guests: 2,
  nightlyRate: 680,
  nights: 4,
};

// Pre-seeded active requests (1 in-flight spa, 1 pending room service)
export const SEED_REQUESTS: ServiceRequest[] = [
  {
    id: "req_spa_001",
    kind: "spa",
    title: "Aurora Signature Massage",
    detail: "90 min · Couples suite · 4:30 PM",
    status: "enroute",
    etaMinutes: 18,
    createdAt: Date.now() - 1000 * 60 * 14,
  },
  {
    id: "req_dining_002",
    kind: "room-service",
    title: "In-Room Dining — Tasting Menu",
    detail: "Vegan 5-course · Sparkling water",
    status: "pending",
    etaMinutes: 35,
    createdAt: Date.now() - 1000 * 60 * 3,
  },
];

export const ADD_ON_SERVICES = [
  { id: "breakfast", label: "Daily breakfast in suite", price: 48 },
  { id: "late-checkout", label: "Late checkout (until 4 PM)", price: 75 },
  { id: "transfer", label: "Private airport transfer", price: 140 },
  { id: "spa-credit", label: "Spa credit ($150)", price: 120 },
];

export const MOVIES = [
  {
    id: "m1",
    title: "Interstellar",
    category: "Sci-Fi",
    rating: "PG-13",
    year: "2014",
    duration: "2h 49m",
    synopsis:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    image: "/images/dark knight - vertical.jpg",
    heroImage: "/images/interstellar - horizontal.jpg",
  },
  {
    id: "m2",
    title: "The Grand Budapest Hotel",
    category: "Comedy",
    rating: "R",
    year: "2014",
    duration: "1h 39m",
    synopsis:
      "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy.",
    image: "/images/joker - vertical.jpg",
  },
  {
    id: "m3",
    title: "Inception",
    category: "Sci-Fi",
    rating: "PG-13",
    year: "2010",
    duration: "2h 28m",
    synopsis:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    image: "/images/inception - vertical.jpg",
  },
  {
    id: "m4",
    title: "Coco",
    category: "Kids",
    rating: "PG",
    year: "2017",
    duration: "1h 45m",
    synopsis:
      "Aspiring musician Miguel enters the Land of the Dead to find his great-great-grandfather.",
    image: "/images/coco - vertical.jpg",
  },
  {
    id: "m5",
    title: "The Dark Knight",
    category: "Action",
    rating: "PG-13",
    year: "2008",
    duration: "2h 32m",
    synopsis:
      "Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    image: "/images/dark knight - vertical.jpg",
  },
  {
    id: "m6",
    title: "Avengers: Endgame",
    category: "Action",
    rating: "PG-13",
    year: "2019",
    duration: "3h 1m",
    synopsis:
      "The Avengers assemble once more in order to undo Thanos' actions and restore order to the universe.",
    image: "/images/avengers endgame - vertical.jpg",
  },
  {
    id: "m7",
    title: "Black Panther",
    category: "Action",
    rating: "PG-13",
    year: "2018",
    duration: "2h 14m",
    synopsis:
      "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future.",
    image: "/images/black panther - vertical.jpg",
  },
  {
    id: "m8",
    title: "Beauty and the Beast",
    category: "Kids",
    rating: "PG",
    year: "2017",
    duration: "2h 9m",
    synopsis:
      "A selfish Prince is cursed to become a monster for the rest of his life, unless he learns to fall in love with a beautiful young woman.",
    image: "/images/beauty & beast - vertical.jpg",
  },
];

export const SERIES = [
  {
    id: "s1",
    title: "Stranger Things",
    category: "Sci-Fi",
    rating: "TV-14",
    year: "2016-",
    seasons: "4 Seasons",
    synopsis:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments and terrifying supernatural forces.",
    image: "/images/stranger things - vertical.jpg",
    heroImage: "/images/stranger things - horizontal.jpg",
  },
  {
    id: "s2",
    title: "Breaking Bad",
    category: "Drama",
    rating: "TV-MA",
    year: "2008-2013",
    seasons: "5 Seasons",
    synopsis:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
    image: "/images/joker - vertical.jpg",
    heroImage: "/images/breaking Bad - horizontal.jpg",
  },
  {
    id: "s3",
    title: "The Last Kingdom",
    category: "Drama",
    rating: "TV-MA",
    year: "2015-2022",
    seasons: "5 Seasons",
    synopsis:
      "As Alfred the Great defends his kingdom from Norse invaders, Uhtred looks to claim his ancestral birthright.",
    image: "/images/riverdale - vertical.jpg",
    heroImage: "/images/Last-Kingdom- horizontal.jpg",
  },
];

export const MUSIC = [
  {
    id: "mu1",
    title: "Lobby Vibes",
    artist: "Lumina Curated",
    category: "Playlist",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80",
  },
  {
    id: "mu2",
    title: "Spa & Relaxation",
    artist: "Aurora Wellness",
    category: "Playlist",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80",
  },
  {
    id: "mu3",
    title: "Jazz Evening",
    artist: "The Obsidian Bar",
    category: "Playlist",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80",
  }, // Reusing image for now
  {
    id: "mu4",
    title: "Morning Energy",
    artist: "Lumina Curated",
    category: "Playlist",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80",
  },
  {
    id: "mu5",
    title: "Classical Focus",
    artist: "Lumina Curated",
    category: "Playlist",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&q=80",
  },
  {
    id: "mu6",
    title: "Sunset Chill",
    artist: "Lumina Curated",
    category: "Playlist",
    image: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=400&q=80",
  },
];

export const GAMES = [
  {
    id: "g1",
    title: "Asphalt 9",
    category: "Racing",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80",
  },
  {
    id: "g2",
    title: "Minecraft",
    category: "Adventure",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&q=80",
  },
  {
    id: "g3",
    title: "Among Us",
    category: "Strategy",
    rating: "4.5",
    image: "https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=400&q=80",
  },
  {
    id: "g4",
    title: "Genshin Impact",
    category: "RPG",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&q=80",
  },
  {
    id: "g5",
    title: "Crossy Road",
    category: "Casual",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80",
  },
];

export const MAP_POIS = [
  {
    id: "poi_pool",
    name: "Infinity Pool",
    status: "Open until 10 PM",
    category: "Leisure",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&q=80",
    x: 65,
    y: 30,
  },
  {
    id: "poi_spa",
    name: "Aurora Wellness Spa",
    status: "Open until 8 PM",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80",
    x: 25,
    y: 55,
  },
  {
    id: "poi_restaurant",
    name: "The Obsidian Bar",
    status: "Open until 2 AM",
    category: "Dining",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80",
    x: 80,
    y: 70,
  },
  {
    id: "poi_gym",
    name: "Fitness Center",
    status: "24/7 Access",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    x: 15,
    y: 20,
  },
];

export const SISTER_PROPERTIES = [
  {
    id: "prop_kyoto",
    name: "Aurora Kyoto",
    location: "Kyoto, Japan",
    description: "Experience tranquility amidst ancient temples.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
  },
  {
    id: "prop_paris",
    name: "Aurora Paris",
    location: "Paris, France",
    description: "Classic elegance in the heart of the Golden Triangle.",
    image: "/images/paris.jpg",
  },
  {
    id: "prop_maldives",
    name: "Aurora Maldives",
    location: "Malé, Maldives",
    description: "Overwater villas with crystal clear waters.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
  },
  {
    id: "prop_aspen",
    name: "Aurora Aspen",
    location: "Aspen, USA",
    description: "Ski-in, ski-out luxury for winter escapes.",
    image: "/images/aspen.jpg",
  },
];

export const ACTIVITIES = [
  {
    id: "act1",
    title: "Kids Club: Sandcastle Masters",
    category: "Kids",
    time: "10:00 AM - 12:00 PM",
    location: "Beach Front",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  },
  {
    id: "act2",
    title: "Adult Beach Volley",
    category: "Adults",
    time: "2:00 PM - 4:00 PM",
    location: "Sports Court",
    image: "https://images.unsplash.com/photo-1550133730-695473e544be?w=400&q=80",
  },
  {
    id: "act3",
    title: "Live Concert: Jazz Night",
    category: "Night Events",
    time: "8:00 PM - 11:00 PM",
    location: "The Obsidian Bar",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80",
  },
  {
    id: "act4",
    title: "Morning Yoga",
    category: "Wellness",
    time: "7:00 AM - 8:00 AM",
    location: "Zen Garden",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
  },
  {
    id: "act5",
    title: "Cabaret Show: Aurora Dreams",
    category: "Night Events",
    time: "9:30 PM - 10:30 PM",
    location: "Grand Ballroom",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80",
  },
];

export const BOUTIQUE_ITEMS = [
  {
    id: "b1",
    name: "Aurora Signature Robe",
    price: 145,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?w=400&q=80",
  },
  {
    id: "b2",
    name: "Luxury Lavender Oil",
    price: 32,
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80",
  },
  {
    id: "b3",
    name: "Egyptian Cotton Linens",
    price: 280,
    category: "Home",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80",
  },
  {
    id: "b4",
    name: "Lumina Scented Candle",
    price: 45,
    category: "Home",
    image: "https://images.unsplash.com/photo-1596435707124-3316900214a1?w=400&q=80",
  },
];

export const DINING_MENU = [
  {
    id: "d1",
    name: "Quinoa Harvest Bowl",
    price: 28,
    category: "Mains",
    dietaryTags: ["Vegan", "Gluten-Free", "Nut-Free"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
  {
    id: "d2",
    name: "Aurora Beef Tartare",
    price: 34,
    category: "Starters",
    dietaryTags: ["Gluten-Free"],
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80",
  },
  {
    id: "d3",
    name: "Silk Tofu Stir-fry",
    price: 26,
    category: "Mains",
    dietaryTags: ["Vegan", "Nut-Free"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
  },
  {
    id: "d4",
    name: "Valrhona Chocolate Dome",
    price: 18,
    category: "Desserts",
    dietaryTags: ["Nut-Free"],
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",
  },
];
