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
                tag: "Romantic",
              },
              {
                title: "Forest Bathing",
                subtitle: "75 min · Sensory journey",
                tag: "Calm",
              },
              {
                title: "Athlete Recovery",
                subtitle: "60 min · Deep tissue",
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
        text: "I have three vegan-friendly options for tonight. Lumière is the best match for your preferences.",
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
              { title: "Lumière", subtitle: "Plant-forward tasting", tag: "Vegan menu" },
              { title: "Sora Sushi", subtitle: "Omakase counter", tag: "Quiet room" },
              { title: "Terrazza", subtitle: "Italian rooftop", tag: "View suite" },
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
          text: "I'm placing the vegan tasting menu with sparkling water — your usual. ETA 30–40 minutes. Tracker is live.",
          suggested_replies: [
            ask("Add dessert pairing"),
            ask("Change drink to wine"),
            act("Open Service Tracker", { kind: "navigate", payload: { to: "/services" } }),
          ],
        },
        ui_components: [
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
        text: "I can extend your stay through April 27, or arrange a late checkout up to 4 PM. Which would you prefer?",
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
        text: "I've notified housekeeping. Someone will be at your suite within 15 minutes.",
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
        text: "I can arrange a private car. Which class would you like?",
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
        { type: "QuickReply", props: { options: ["Sedan", "SUV", "Luxury"] } },
      ],
      backend_actions: [],
    }),
  },
];

const FALLBACK = (): AIResponse => ({
  response: {
    text: "I'm here to help. You can ask about dining, spa, room service, transport, or your stay.",
    suggested_replies: [
      { label: "Book the spa", echoAsMessage: true },
      { label: "Dinner tonight", echoAsMessage: true },
      { label: "Late checkout", echoAsMessage: true },
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
