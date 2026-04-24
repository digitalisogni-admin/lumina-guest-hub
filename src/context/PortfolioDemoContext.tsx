import { createContext, useContext, useState, ReactNode } from "react";

interface PortfolioDemoContextType {
  isScreensaverActive: boolean;
  setIsScreensaverActive: (v: boolean) => void;
  showProactiveToast: boolean;
  setShowProactiveToast: (v: boolean) => void;
  isQRPairingOpen: boolean;
  setIsQRPairingOpen: (v: boolean) => void;
  theme: string;
  setTheme: (t: string) => void;
}

const PortfolioDemoContext = createContext<PortfolioDemoContextType | undefined>(undefined);

export function PortfolioDemoProvider({ children }: { children: ReactNode }) {
  const [isScreensaverActive, setIsScreensaverActive] = useState(false);
  const [showProactiveToast, setShowProactiveToast] = useState(false);
  const [isQRPairingOpen, setIsQRPairingOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  return (
    <PortfolioDemoContext.Provider
      value={{
        isScreensaverActive,
        setIsScreensaverActive,
        showProactiveToast,
        setShowProactiveToast,
        isQRPairingOpen,
        setIsQRPairingOpen,
        theme,
        setTheme,
      }}
    >
      {children}
    </PortfolioDemoContext.Provider>
  );
}

export function usePortfolioDemo() {
  const context = useContext(PortfolioDemoContext);
  if (!context) {
    throw new Error("usePortfolioDemo must be used within a PortfolioDemoProvider");
  }
  return context;
}
