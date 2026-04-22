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
}

export interface Reservation {
  room: string;
  checkIn: string; // ISO
  checkOut: string; // ISO
  guests: number;
  nightlyRate: number;
  nights: number;
}

export interface ChatMessage {
  id: string;
  role: "guest" | "lumina";
  text: string;
  ui?: UIComponent | null;
  suggestedReplies?: string[];
  timestamp: number;
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
      type: "Carousel";
      props: {
        items: Array<{
          title: string;
          subtitle?: string;
          image?: string;
          tag?: string;
        }>;
      };
    };

export type BackendAction =
  | { kind: "create_request"; payload: Omit<ServiceRequest, "id" | "createdAt" | "status"> & { status?: ServiceStatus } }
  | { kind: "book"; payload: { item: string } }
  | { kind: "none" };

export interface AIResponse {
  response: { text: string; suggested_replies: string[] };
  ui_component: UIComponent | null;
  backend_action: BackendAction;
}
