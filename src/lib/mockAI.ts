import type { AIResponse, BackendAction, SuggestedReply, UIComponent } from "./types";

/**
 * Mock AI service for the Lumina Concierge.
 *
 * Each intent returns a richer contract:
 *  {
 *    response: { text, suggested_replies: SuggestedReply[] },
 *    ui_components: UIComponent[],     // multiple cards per reply
 *    backend_actions: BackendAction[], // executed immediately on arrival
 *  }
 *
 * SuggestedReply chips can either echo as a new prompt (default) or
 * trigger a backend action directly without another LLM round-trip
 * (e.g. "Confirm order" → create_request).
 */

interface Intent {
  match: RegExp;
  build: (input: string) => AIResponse;
}

// Helpers
const ask = (label: string): SuggestedReply => ({ label, echoAsMessage: true });
const act = (label: string, action: BackendAction): SuggestedReply => ({
  label,
  action,
  echoAsMessage: false,
});

const INTENTS: Intent[] = [
  // ── Spa ──────────────────────────────────────────────────────────────
  {
    match: /\b(spa|massage|relax|wellness)\b/i,
    build: () => ({
      response: {
        text: "Of course. Our Aurora Spa has openings this afternoon. The Signature is most popular — would you like me to reserve it?",
        suggested_replies: [
          act("Confirm 90-min Signature", {
            kind: "create_request",
            payload: {
              kind: "spa",
              title: "Aurora Signature Massage",
              detail: "90 min · Couples suite",
              etaMinutes: 45,
            },
          }),
          ask("Show all treatments"),
          ask("Book the sauna instead"),
          act("Open Service Tracker", { kind: "navigate", payload: { to: "/services" } }),
        ],
      },
      ui_components: [
        {
          type: "RoomCard",
          props: {
            title: "Aurora Signature Massage",
            subtitle: "90 min · Hot stone & aromatherapy",
            image:
              "https://images.unsplash.com/photo-1544161515-436cefb6579a?auto=format&fit=crop&q=80&w=800",
            price: "$320",
            cta: "Reserve now",
            action: {
              kind: "create_request",
              payload: {
                kind: "spa",
                title: "Aurora Signature Massage",
                detail: "90 min · Couples suite",
                etaMinutes: 45,
              },
            },
          },
        },
        {
          type: "Carousel",
          props: {
            items: [
              {
                title: "Couples Ritual",
                subtitle: "120 min · Private suite",
                image:
                  "https://images.unsplash.com/photo-1540555700478-4be289aefcf1?auto=format&fit=crop&q=80&w=600",
                tag: "Romantic",
              },
              {
                title: "Forest Bathing",
                subtitle: "75 min · Sensory journey",
                image:
                  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
                tag: "Calm",
              },
              {
                title: "Athlete Recovery",
                subtitle: "60 min · Deep tissue",
                image:
                  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600",
                tag: "Restore",
              },
            ],
          },
        },
      ],
      backend_actions: [],
    }),
  },

  // ── Dining ───────────────────────────────────────────────────────────
  {
    match: /\b(dinner|dining|restaurant|reservation|eat|food)\b/i,
    build: () => ({
      response: {
        text: "I have three dining experiences for tonight. Lumière is highly recommended for its seasonal plant-forward menu.",
        suggested_replies: [
          ask("Book Lumière at 8 PM"),
          ask("Show Sora's menu"),
          ask("Order to room instead"),
        ],
      },
      ui_components: [
        {
          type: "Carousel",
          props: {
            items: [
              {
                title: "Lumière",
                subtitle: "Plant-forward tasting",
                image:
                  "https://images.unsplash.com/photo-1550966841-3ee29648b2d4?auto=format&fit=crop&q=80&w=600",
                tag: "Vegan menu",
              },
              {
                title: "Sora Sushi",
                subtitle: "Omakase counter",
                image:
                  "https://images.unsplash.com/photo-1579027989536-b7b1f97563ba?auto=format&fit=crop&q=80&w=600",
                tag: "Quiet room",
              },
              {
                title: "Terrazza",
                subtitle: "Italian rooftop",
                image:
                  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600",
                tag: "View suite",
              },
            ],
          },
        },
      ],
      backend_actions: [],
    }),
  },

  // ── Room service ─────────────────────────────────────────────────────
  {
    match: /\b(room ?service|in.?room|order|breakfast|snack|tasting)\b/i,
    build: () => {
      const action: BackendAction = {
        kind: "create_request",
        payload: {
          kind: "room-service",
          title: "In-Room Dining — Vegan Tasting",
          detail: "5 courses · Sparkling water",
          etaMinutes: 35,
        },
      };
      return {
        response: {
          text: "I'm placing the vegan tasting menu with sparkling water — your usual preference. ETA 30–40 minutes. You can track the delivery in real-time.",
          suggested_replies: [
            ask("Add dessert pairing"),
            ask("Change drink to wine"),
            act("Open Service Tracker", { kind: "navigate", payload: { to: "/services" } }),
          ],
        },
        ui_components: [
          {
            type: "RoomCard",
            props: {
              title: "In-Room Dining",
              subtitle: "5-Course Vegan Tasting Menu",
              image:
                "https://images.unsplash.com/photo-1566733971257-82650298f158?auto=format&fit=crop&q=80&w=800",
              price: "$145",
              cta: "Order Now",
            },
          },
          {
            type: "StatusTracker",
            props: { title: "In-Room Dining", status: "pending", etaMinutes: 35 },
          },
        ],
        backend_actions: [action], // fire immediately
      };
    },
  },

  // ── Late checkout / extend stay ──────────────────────────────────────
  {
    match: /\b(late ?check.?out|extend|stay longer|another night)\b/i,
    build: () => ({
      response: {
        text: "I can extend your stay through April 27, or arrange a late checkout up to 4 PM. Which would you prefer, sir?",
        suggested_replies: [
          ask("Add one extra night"),
          ask("Just late checkout"),
          act("Open Stay management", { kind: "navigate", payload: { to: "/stay" } }),
        ],
      },
      ui_components: [
        {
          type: "RoomCard",
          props: {
            title: "Extend — 1 extra night",
            subtitle: "Suite 1204 · April 26 → 27",
            image:
              "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800",
            price: "$680",
            cta: "Confirm extension",
            action: { kind: "navigate", payload: { to: "/stay" } },
          },
        },
        {
          type: "RoomCard",
          props: {
            title: "Late checkout · 4 PM",
            subtitle: "Complimentary for Aurora Platinum",
            image:
              "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=800",
            price: "Free",
            cta: "Confirm",
            action: {
              kind: "create_request",
              payload: {
                kind: "other",
                title: "Late checkout",
                detail: "Until 4:00 PM · April 26",
                etaMinutes: 0,
                status: "enroute",
              },
            },
          },
        },
      ],
      backend_actions: [],
    }),
  },

  // ── Maintenance / housekeeping ───────────────────────────────────────
  {
    match: /\b(maintenance|broken|fix|repair|towel|housekeep|turndown)\b/i,
    build: () => ({
      response: {
        text: "I've notified housekeeping. Someone will be at your suite within 15 minutes to assist you.",
        suggested_replies: [
          ask("Add fresh towels"),
          ask("Bring extra pillows"),
          act("Open Service Tracker", { kind: "navigate", payload: { to: "/services" } }),
        ],
      },
      ui_components: [
        {
          type: "StatusTracker",
          props: { title: "Housekeeping Visit", status: "pending", etaMinutes: 15 },
        },
      ],
      backend_actions: [
        {
          kind: "create_request",
          payload: {
            kind: "housekeeping",
            title: "Housekeeping Visit",
            detail: "Fresh towels & turndown",
            etaMinutes: 15,
          },
        },
      ],
    }),
  },

  // ── Transport ────────────────────────────────────────────────────────
  {
    match: /\b(taxi|car|airport|transfer|ride|driver)\b/i,
    build: () => ({
      response: {
        text: "I can arrange a private chauffeur. We have premium sedans and SUVs available for your convenience.",
        suggested_replies: [
          act("Book Sedan in 30 min", {
            kind: "create_request",
            payload: {
              kind: "transport",
              title: "Private Sedan",
              detail: "Pickup at lobby · in 30 min",
              etaMinutes: 30,
            },
          }),
          ask("Tomorrow 7 AM, SUV"),
          ask("Show all options"),
        ],
      },
      ui_components: [
        {
          type: "Carousel",
          props: {
            items: [
              {
                title: "S-Class Sedan",
                subtitle: "Up to 3 guests",
                image:
                  "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600",
              },
              {
                title: "Luxury SUV",
                subtitle: "Up to 6 guests",
                image:
                  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
              },
            ],
          },
        },
        { type: "QuickReply", props: { options: ["Sedan", "SUV", "Luxury"] } },
      ],
      backend_actions: [],
    }),
  },

  // ── Weather ──────────────────────────────────────────────────────────
  {
    match: /\b(weather|temperature|forecast|outside|rain|sun)\b/i,
    build: () => ({
      response: {
        text: "It is a crisp 18°C in Zurich today with clear skies. A perfect afternoon for a walk around the lake.",
        suggested_replies: [
          ask("Lake Zurich boat tour"),
          ask("Need an umbrella?"),
          ask("Weekend forecast"),
        ],
      },
      ui_components: [
        {
          type: "WeatherCard",
          props: {
            temp: "18°C",
            condition: "Clear Skies",
            forecast: [
              { day: "Fri", temp: "20°C", icon: "sun" },
              { day: "Sat", temp: "16°C", icon: "cloud" },
              { day: "Sun", temp: "15°C", icon: "cloud-rain" },
            ],
          },
        },
      ],
      backend_actions: [],
    }),
  },

  // ── Local Recommendations ────────────────────────────────────────────
  {
    match: /\b(recommend|visit|see|do|local|attraction|museum|park)\b/i,
    build: () => ({
      response: {
        text: "Zurich offers world-class culture. I've curated a few nearby experiences that match your interest in contemporary art.",
        suggested_replies: [
          ask("Book museum tickets"),
          ask("Directions to Kunsthaus"),
          ask("Find coffee nearby"),
        ],
      },
      ui_components: [
        {
          type: "LocalRecs",
          props: {
            category: "Culture & Sightseeing",
            locations: [
              {
                name: "Kunsthaus Zürich",
                distance: "0.8 km",
                rating: 4.8,
                image:
                  "https://images.unsplash.com/photo-1518998053502-53cc8f24b78a?auto=format&fit=crop&q=80&w=600",
              },
              {
                name: "Lake Zurich Promenade",
                distance: "1.2 km",
                rating: 4.9,
                image:
                  "https://images.unsplash.com/photo-1528655848604-06d9d1502476?auto=format&fit=crop&q=80&w=600",
              },
              {
                name: "Old Town (Niederdorf)",
                distance: "0.5 km",
                rating: 4.7,
                image:
                  "https://images.unsplash.com/photo-1549464100-22435d44752e?auto=format&fit=crop&q=80&w=600",
              },
            ],
          },
        },
      ],
      backend_actions: [],
    }),
  },

  // ── Smart Room ───────────────────────────────────────────────────────
  {
    match:
      /\b(room|temp|temperature|warm|cold|light|bright|dim|romantic|sleep|movie|curtain|window)\b/i,
    build: (input: string) => {
      let text =
        "I've adjusted your suite's environment. Is there anything else you'd like to change?";
      const actions: BackendAction[] = [];
      const replies: SuggestedReply[] = [
        act("Full Room Controls", { kind: "navigate", payload: { to: "/room" } }),
        ask("Make it warmer"),
        ask("Romantic lights"),
      ];

      if (/\b(warm|hot|up|increase)\b/i.test(input)) {
        text = "Setting the temperature to 24°C for a cozy atmosphere.";
        actions.push({ kind: "room_control", payload: { temp: 24 } });
      } else if (/\b(cold|cool|down|decrease)\b/i.test(input)) {
        text = "Lowering the temperature to 20°C for your comfort.";
        actions.push({ kind: "room_control", payload: { temp: 20 } });
      } else if (/\b(romantic|dim)\b/i.test(input)) {
        text = "Switching to romantic lighting and closing the curtains.";
        actions.push({ kind: "room_control", payload: { lightMode: "romantic", curtains: false } });
      } else if (/\b(movie|cinema)\b/i.test(input)) {
        text = "Preparing the suite for a movie night. Lights dimmed, curtains closed.";
        actions.push({ kind: "room_control", payload: { lightMode: "movie", curtains: false } });
      } else if (/\b(sleep|night)\b/i.test(input)) {
        text = "Goodnight. Setting sleep mode and closing curtains.";
        actions.push({ kind: "room_control", payload: { lightMode: "sleep", curtains: false } });
      } else if (/\b(bright|day|work)\b/i.test(input)) {
        text = "Daylight mode activated. Opening curtains.";
        actions.push({ kind: "room_control", payload: { lightMode: "bright", curtains: true } });
      } else if (/\b(curtain|window)\b/i.test(input)) {
        const open = /\b(open)\b/i.test(input);
        text = open ? "Opening the curtains for you." : "Closing the curtains for privacy.";
        actions.push({ kind: "room_control", payload: { curtains: open } });
      }

      return {
        response: {
          text,
          suggested_replies: replies,
        },
        ui_components: [
          {
            type: "RoomCard",
            props: {
              title: "Room Environment",
              subtitle: "Active Controls",
              image:
                "https://images.unsplash.com/photo-1616594868991-0722e77ef50e?auto=format&fit=crop&q=80&w=800",
              cta: "Open Controls",
              action: { kind: "navigate", payload: { to: "/room" } },
            },
          },
        ],
        backend_actions: actions,
      };
    },
  },
];

const FALLBACK = (): AIResponse => ({
  response: {
    text: "I am Lumina, your Front Office & Concierge Manager. How may I assist you this evening, sir?",
    suggested_replies: [
      { label: "Book the spa", echoAsMessage: true },
      { label: "Dinner tonight", echoAsMessage: true },
      { label: "Late checkout", echoAsMessage: true },
      { label: "Local excursions", echoAsMessage: true },
      { label: "Order room service", echoAsMessage: true },
    ],
  },
  ui_components: [
    {
      type: "QuickReply" as const,
      props: { options: ["Spa", "Dining", "Room service", "Maintenance"] },
    } satisfies UIComponent,
  ],
  backend_actions: [],
});

/** Simulate latency + match an intent. */
export async function askLumina(message: string): Promise<AIResponse> {
  await new Promise((r) => setTimeout(r, 500 + Math.random() * 600));
  const intent = INTENTS.find((i) => i.match.test(message));
  return intent ? intent.build(message) : FALLBACK();
}
