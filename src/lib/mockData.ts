import type { Guest, Reservation, ServiceRequest } from "./types";

// Demo guest — Ms. Eleanor Chen, Suite 1204
export const MOCK_GUEST: Guest = {
  name: "Eleanor Chen",
  salutation: "Ms.",
  preferences: ["Vegan", "Quiet floor", "Sparkling water"],
  loyaltyTier: "Aurora Platinum",
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
