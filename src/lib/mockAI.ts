import type { AIResponse } from "./types";

/**
 * Mock AI service for the Lumina Concierge.
 *
 * Returns a structured contract:
 *  {
 *    response: { text, suggested_replies },
 *    ui_component: { type, props } | null,
 *    backend_action: { kind, payload? }
 *  }
 *
 * The intent is matched on simple keywords. In a real implementation this
 * would call an LLM with a JSON-schema constrained tool-use response.
 */

interface Intent {
  match: RegExp;
  build: (input: string) => AIResponse;
}

const INTENTS: Intent[] = [
  // Spa
  {
    match: /\b(spa|massage|relax|wellness)\b/i,
    build: () => ({
      response: {
        text: "Of course. Our Aurora Spa has openings this afternoon. Would you like a 60 or 90 minute treatment?",
        suggested_replies: ["Book 90-min signature", "Show all treatments", "Maybe later"],
      },
      ui_component: {
        type: "RoomCard",
        props: {
          title: "Aurora Signature Massage",
          subtitle: "90 min · Hot stone & aromatherapy",
          price: "$320",
          cta: "Reserve",
        },
      },
      backend_action: { kind: "none" },
    }),
  },

  // Dining
  {
    match: /\b(dinner|dining|restaurant|reservation|eat|food)\b/i,
    build: () => ({
      response: {
        text: "I have three vegan-friendly options for tonight. Lumière is most aligned with your preferences.",
        suggested_replies: ["Book Lumière at 8 PM", "Show menus", "Order to room"],
      },
      ui_component: {
        type: "Carousel",
        props: {
          items: [
            { title: "Lumière", subtitle: "Plant-forward tasting", tag: "Vegan menu" },
            { title: "Sora Sushi", subtitle: "Omakase counter", tag: "Quiet room" },
            { title: "Terrazza", subtitle: "Italian rooftop", tag: "View suite" },
          ],
        },
      },
      backend_action: { kind: "none" },
    }),
  },

  // Room service
  {
    match: /\b(room service|in.?room|order|breakfast|snack)\b/i,
    build: () => ({
      response: {
        text: "Placing a vegan tasting menu order with sparkling water — your usual. Estimated 30–40 minutes.",
        suggested_replies: ["Confirm order", "Change drink", "Add dessert"],
      },
      ui_component: {
        type: "StatusTracker",
        props: { title: "In-Room Dining", status: "pending", etaMinutes: 35 },
      },
      backend_action: {
        kind: "create_request",
        payload: {
          kind: "room-service",
          title: "In-Room Dining — Vegan Tasting",
          detail: "5 courses · Sparkling water",
          etaMinutes: 35,
        },
      },
    }),
  },

  // Late checkout / extend stay
  {
    match: /\b(late ?check.?out|extend|stay longer|another night)\b/i,
    build: () => ({
      response: {
        text: "I can extend your stay through April 27. Your suite is available — would you like me to confirm?",
        suggested_replies: ["Confirm extra night", "Just late checkout", "Show rates"],
      },
      ui_component: {
        type: "RoomCard",
        props: {
          title: "Extend — 1 extra night",
          subtitle: "Suite 1204 · April 26 → 27",
          price: "$680",
          cta: "Confirm",
        },
      },
      backend_action: { kind: "none" },
    }),
  },

  // Maintenance
  {
    match: /\b(maintenance|broken|fix|repair|towel|housekeep)\b/i,
    build: () => ({
      response: {
        text: "I've notified housekeeping. Someone will be at your suite within 15 minutes.",
        suggested_replies: ["Thank you", "Add fresh towels", "Cancel"],
      },
      ui_component: {
        type: "StatusTracker",
        props: { title: "Housekeeping Visit", status: "pending", etaMinutes: 15 },
      },
      backend_action: {
        kind: "create_request",
        payload: {
          kind: "housekeeping",
          title: "Housekeeping Visit",
          detail: "Fresh towels & turndown",
          etaMinutes: 15,
        },
      },
    }),
  },

  // Transport
  {
    match: /\b(taxi|car|airport|transfer|ride|driver)\b/i,
    build: () => ({
      response: {
        text: "I can arrange a private car. When would you like to depart?",
        suggested_replies: ["In 30 minutes", "Tomorrow 7 AM", "Show options"],
      },
      ui_component: {
        type: "QuickReply",
        props: { options: ["Sedan", "SUV", "Luxury"] },
      },
      backend_action: { kind: "none" },
    }),
  },
];

const FALLBACK: AIResponse = {
  response: {
    text: "I'm here to help. You can ask about dining, spa, room service, transport, or your stay.",
    suggested_replies: ["Book spa", "Dinner tonight", "Late checkout", "Order room service"],
  },
  ui_component: {
    type: "QuickReply",
    props: { options: ["Spa", "Dining", "Room service", "Maintenance"] },
  },
  backend_action: { kind: "none" },
};

/** Simulate latency + match an intent. */
export async function askLumina(message: string): Promise<AIResponse> {
  await new Promise((r) => setTimeout(r, 500 + Math.random() * 600));
  const intent = INTENTS.find((i) => i.match.test(message));
  return intent ? intent.build(message) : FALLBACK;
}
