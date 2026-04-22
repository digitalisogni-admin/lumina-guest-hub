import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { askLumina } from "@/lib/mockAI";
import type { ChatMessage } from "@/lib/types";
import { useServices } from "./ServiceContext";

interface AISessionContextValue {
  messages: ChatMessage[];
  isThinking: boolean;
  send: (text: string) => Promise<void>;
  reset: () => void;
}

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "lumina",
  text: "Good evening, Ms. Chen. How may I make your stay extraordinary tonight?",
  suggestedReplies: ["Book the spa", "Dinner tonight", "Late checkout", "Order room service"],
  timestamp: Date.now(),
};

const AISessionContext = createContext<AISessionContextValue | null>(null);

export function AISessionProvider({ children }: { children: ReactNode }) {
  const { createRequest } = useServices();
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [isThinking, setIsThinking] = useState(false);

  const send = useCallback(
    async (text: string) => {
      const guestMsg: ChatMessage = {
        id: `m_${Date.now()}`,
        role: "guest",
        text,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, guestMsg]);
      setIsThinking(true);

      const ai = await askLumina(text);

      // Dispatch backend action into ServiceContext
      if (ai.backend_action.kind === "create_request") {
        createRequest(ai.backend_action.payload);
      }

      const luminaMsg: ChatMessage = {
        id: `m_${Date.now()}_l`,
        role: "lumina",
        text: ai.response.text,
        ui: ai.ui_component,
        suggestedReplies: ai.response.suggested_replies,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, luminaMsg]);
      setIsThinking(false);
    },
    [createRequest],
  );

  const reset = useCallback(() => setMessages([WELCOME]), []);

  const value = useMemo(() => ({ messages, isThinking, send, reset }), [messages, isThinking, send, reset]);

  return <AISessionContext.Provider value={value}>{children}</AISessionContext.Provider>;
}

export function useAISession() {
  const ctx = useContext(AISessionContext);
  if (!ctx) throw new Error("useAISession must be used inside AISessionProvider");
  return ctx;
}
