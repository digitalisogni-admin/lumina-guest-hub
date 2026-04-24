// Shared types for Lumina AI Concierge

export type ServiceStatus = "pending" | "enroute" | "completed";

export type ServiceKind =
  | "room-service"
  | "spa"
  | "maintenance"
  | "dining"
  | "housekeeping"
  | "transport"
  | "other";

export interface ServiceRequest {
  id: string;
  kind: ServiceKind;
  title: string;
  detail?: string;
  status: ServiceStatus;
  etaMinutes: number;
  createdAt: number;
}

export interface Guest {
  name: string;
  salutation: string;
  preferences: string[];
  loyaltyTier: string;
  points?: number;
  memberSince?: number;
  languagePreference?: string;
  companions?: { name: string; relation: string; preferences?: string[] }[];
  pastStays?: { property: string; location: string; date: string }[];
}

export interface Reservation {
  room: string;
  checkIn: string; // ISO
  checkOut: string; // ISO
  guests: number;
  nightlyRate: number;
  nights: number;
}

// JSON-driven UI cards returned by the AI
export type UIComponent =
  | { type: "QuickReply"; props: { options: string[] } }
  | {
      type: "RoomCard";
      props: {
        title: string;
        subtitle?: string;
        image?: string;
        price?: string;
        cta?: string;
        action?: BackendAction;
      };
    }
  | {
      type: "StatusTracker";
      props: {
        title: string;
        status: ServiceStatus;
        etaMinutes: number;
      };
    }
  | {
      type: "WeatherCard";
      props: {
        temp: string;
        condition: string;
        forecast: Array<{ day: string; temp: string; icon: string }>;
      };
    }
  | {
      type: "LocalRecs";
      props: {
        category: string;
        locations: Array<{
          name: string;
          distance: string;
          rating: number;
          image: string;
        }>;
      };
    }
  | {
      type: "Carousel";
      props: {
        items: Array<{
          title: string;
          subtitle?: string;
          image?: string;
          tag?: string;
          action?: BackendAction;
        }>;
      };
    };

/**
 * A suggested reply can be a plain prompt the guest sends back to Lumina,
 * OR a direct action that triggers a backend mutation (e.g. "Confirm order"
 * → creates a service request) without round-tripping through the LLM.
 */
export interface SuggestedReply {
  label: string;
  // If provided, executing the chip dispatches this action immediately
  // (in addition to optionally sending `label` back as a prompt).
  action?: BackendAction;
  // If true, the chip's label is also sent as the next user message.
  echoAsMessage?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "guest" | "lumina";
  text: string;
  // Multiple UI cards may accompany a single AI reply.
  ui?: UIComponent[];
  suggestedReplies?: SuggestedReply[];
  timestamp: number;
}

export type BackendAction =
  | {
      kind: "create_request";
      payload: Omit<ServiceRequest, "id" | "createdAt" | "status"> & {
        status?: ServiceStatus;
      };
    }
  | { kind: "book"; payload: { item: string } }
  | { kind: "navigate"; payload: { to: "/services" | "/stay" | "/concierge" | "/" | "/room" } }
  | {
      kind: "room_control";
      payload: {
        temp?: number;
        lightMode?: "bright" | "romantic" | "sleep" | "movie";
        curtains?: boolean;
      };
    }
  | { kind: "excursion-details"; payload: { title: string; subtitle?: string } }
  | { kind: "none" };

export interface AIResponse {
  response: { text: string; suggested_replies: SuggestedReply[] };
  // Multiple cards (e.g. a Carousel + a QuickReply rail) in one reply.
  ui_components: UIComponent[];
  // Top-level actions executed immediately when the reply lands
  // (e.g. spa booking confirmation → create_request).
  backend_actions: BackendAction[];
}
