import { createContext, useContext, type ReactNode } from "react";
import { MOCK_GUEST, MOCK_RESERVATION } from "@/lib/mockData";
import type { Guest, Reservation } from "@/lib/types";

interface GuestContextValue {
  guest: Guest;
  reservation: Reservation;
}

const GuestContext = createContext<GuestContextValue | null>(null);

export function GuestProvider({ children }: { children: ReactNode }) {
  return (
    <GuestContext.Provider value={{ guest: MOCK_GUEST, reservation: MOCK_RESERVATION }}>
      {children}
    </GuestContext.Provider>
  );
}

export function useGuest() {
  const ctx = useContext(GuestContext);
  if (!ctx) throw new Error("useGuest must be used inside GuestProvider");
  return ctx;
}
