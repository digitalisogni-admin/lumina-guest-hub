import React, { createContext, useContext, useState, ReactNode } from "react";

export type FlowId =
  | "initial-welcome"
  | "book-restaurant"
  | "book-excursion"
  | "book-next-trip"
  | "use-ai-concierge"
  | null;

interface WalkthroughContextType {
  activeFlow: FlowId;
  startFlow: (flow: FlowId) => void;
  stopFlow: () => void;
  accessibilityMode: "default" | "high-contrast" | "vision-assist";
  setAccessibilityMode: (mode: "default" | "high-contrast" | "vision-assist") => void;
}

const WalkthroughContext = createContext<WalkthroughContextType | undefined>(undefined);

export function WalkthroughProvider({ children }: { children: ReactNode }) {
  const [activeFlow, setActiveFlow] = useState<FlowId>(null);
  const [accessibilityMode, setAccessibilityMode] = useState<
    "default" | "high-contrast" | "vision-assist"
  >("default");

  return (
    <WalkthroughContext.Provider
      value={{
        activeFlow,
        startFlow: setActiveFlow,
        stopFlow: () => setActiveFlow(null),
        accessibilityMode,
        setAccessibilityMode,
      }}
    >
      {/* Apply global accessibility classes */}
      <div
        className={`${accessibilityMode === "high-contrast" ? "high-contrast-mode" : ""} ${accessibilityMode === "vision-assist" ? "vision-assist-mode" : ""}`}
      >
        {children}
      </div>
    </WalkthroughContext.Provider>
  );
}

export function useWalkthrough() {
  const context = useContext(WalkthroughContext);
  if (!context) {
    throw new Error("useWalkthrough must be used within a WalkthroughProvider");
  }
  return context;
}
