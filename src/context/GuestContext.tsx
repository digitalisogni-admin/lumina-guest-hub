import { createContext, useContext, useState, type ReactNode } from "react";
import { MOCK_GUEST, MOCK_RESERVATION } from "@/lib/mockData";
import type { Guest, Reservation } from "@/lib/types";
import { TRANSLATIONS, type LanguageCode, type TranslationKey } from "@/lib/translations";

interface GuestContextValue {
  guest: Guest;
  reservation: Reservation;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  stayExtension: number;
  setStayExtension: (days: number) => void;
  // Room Control State
  roomTemperature: number;
  setRoomTemperature: (temp: number) => void;
  lightMode: "bright" | "romantic" | "sleep" | "movie";
  setLightMode: (mode: "bright" | "romantic" | "sleep" | "movie") => void;
  curtainsOpen: boolean;
  setCurtainsOpen: (open: boolean) => void;
  t: (key: TranslationKey, variables?: Record<string, string | number>) => string;
}

const GuestContext = createContext<GuestContextValue | null>(null);

export function GuestProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("eng");
  const [stayExtension, setStayExtension] = useState(0);

  // Room Control State
  const [roomTemperature, setRoomTemperature] = useState(22);
  const [lightMode, setLightMode] = useState<"bright" | "romantic" | "sleep" | "movie">("bright");
  const [curtainsOpen, setCurtainsOpen] = useState(true);

  const t = (key: TranslationKey, variables?: Record<string, string | number>) => {
    let text = (TRANSLATIONS[language] as any)[key] || (TRANSLATIONS["eng"] as any)[key] || key;
    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        text = text.replace(new RegExp(`\\{\\{${k}\\}\\}`, "g"), String(v));
      });
    }
    return text;
  };

  return (
    <GuestContext.Provider
      value={{
        guest: MOCK_GUEST,
        reservation: MOCK_RESERVATION,
        language,
        setLanguage,
        stayExtension,
        setStayExtension,
        roomTemperature,
        setRoomTemperature,
        lightMode,
        setLightMode,
        curtainsOpen,
        setCurtainsOpen,
        t,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
}

export function useGuest() {
  const ctx = useContext(GuestContext);
  if (!ctx) throw new Error("useGuest must be used inside GuestProvider");
  return ctx;
}
