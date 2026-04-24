import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { askLumina } from "@/lib/mockAI";
import type { BackendAction, ChatMessage, SuggestedReply } from "@/lib/types";
import { useServices } from "./ServiceContext";
import { useNavigate } from "@tanstack/react-router";
import { useGuest } from "./GuestContext";

interface AISessionContextValue {
  messages: ChatMessage[];
  isThinking: boolean;
  send: (text: string) => Promise<void>;
  runAction: (action: BackendAction) => void;
  runSuggestedReply: (reply: SuggestedReply) => Promise<void> | void;
  reset: () => void;
}

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "lumina",
  text: "Good evening, Ms. Chen. How may I make your stay extraordinary tonight?",
  suggestedReplies: [
    { label: "Book the spa", echoAsMessage: true },
    { label: "Dinner tonight", echoAsMessage: true },
    { label: "Late checkout", echoAsMessage: true },
    { label: "Order room service", echoAsMessage: true },
  ],
  // Stable timestamp so SSR & client agree
  timestamp: 0,
};

const AISessionContext = createContext<AISessionContextValue | null>(null);

export function AISessionProvider({ children }: { children: ReactNode }) {
  const { createRequest } = useServices();
  const navigate = useNavigate();
  const { setRoomTemperature, setLightMode, setCurtainsOpen } = useGuest();
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [isThinking, setIsThinking] = useState(false);

  const runAction = useCallback(
    (action: BackendAction) => {
      switch (action.kind) {
        case "create_request":
          createRequest(action.payload);
          break;
        case "navigate":
          navigate({ to: action.payload.to });
          break;
        case "book":
          // Handle booking if needed
          break;
        case "room_control":
          if (action.payload.temp !== undefined) setRoomTemperature(action.payload.temp);
          if (action.payload.lightMode !== undefined) setLightMode(action.payload.lightMode);
          if (action.payload.curtains !== undefined) setCurtainsOpen(action.payload.curtains);
          break;
        case "excursion-details":
          // Handled in concierge page directly
          break;
        case "none":
        default:
          break;
      }
    },
    [createRequest, navigate, setRoomTemperature, setLightMode, setCurtainsOpen],
  );

  const send = useCallback(
    async (text: string) => {
      const guestMsg: ChatMessage = {
        id: `m_${Date.now()}_g`,
        role: "guest",
        text,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, guestMsg]);
      setIsThinking(true);

      const ai = await askLumina(text);

      // Fire any top-level backend actions immediately
      ai.backend_actions.forEach(runAction);

      const luminaMsg: ChatMessage = {
        id: `m_${Date.now()}_l`,
        role: "lumina",
        text: ai.response.text,
        ui: ai.ui_components,
        suggestedReplies: ai.response.suggested_replies,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, luminaMsg]);
      setIsThinking(false);
    },
    [runAction],
  );

  const runSuggestedReply = useCallback(
    (reply: SuggestedReply) => {
      // 1) If chip carries an action, run it.
      if (reply.action) runAction(reply.action);
      // 2) If it should also echo as a message, send it through the AI.
      if (reply.echoAsMessage ?? !reply.action) {
        return send(reply.label);
      }
    },
    [runAction, send],
  );

  const reset = useCallback(() => setMessages([WELCOME]), []);

  const value = useMemo(
    () => ({ messages, isThinking, send, runAction, runSuggestedReply, reset }),
    [messages, isThinking, send, runAction, runSuggestedReply, reset],
  );

  return <AISessionContext.Provider value={value}>{children}</AISessionContext.Provider>;
}

export function useAISession() {
  const ctx = useContext(AISessionContext);
  if (!ctx) throw new Error("useAISession must be used inside AISessionProvider");
  return ctx;
}
