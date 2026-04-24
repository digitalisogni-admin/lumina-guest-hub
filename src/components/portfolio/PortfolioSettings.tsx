import { usePortfolioDemo } from "@/context/PortfolioDemoContext";
import { Settings2, MonitorPlay, SmartphoneNfc, MessageSquareWarning } from "lucide-react";
import { useState } from "react";

export function PortfolioSettings() {
  const { setIsScreensaverActive, setShowProactiveToast, setIsQRPairingOpen, theme, setTheme } =
    usePortfolioDemo();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {/* Menu Options */}
      <div
        className={`flex flex-col gap-2 transition-all duration-300 origin-bottom-right ${isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0 pointer-events-none"}`}
      >
        <button
          onClick={() => setIsScreensaverActive(true)}
          className="flex items-center gap-3 px-4 py-3 bg-surface-2/90 backdrop-blur-xl border border-white/10 rounded-2xl text-white font-medium hover:bg-surface hover:scale-105 transition-all shadow-xl"
        >
          <span className="text-sm">Trigger Idle Mode</span>
          <MonitorPlay className="size-5 text-ai" />
        </button>

        <button
          onClick={() => setShowProactiveToast(true)}
          className="flex items-center gap-3 px-4 py-3 bg-surface-2/90 backdrop-blur-xl border border-white/10 rounded-2xl text-white font-medium hover:bg-surface hover:scale-105 transition-all shadow-xl"
        >
          <span className="text-sm">Trigger AI Notification</span>
          <MessageSquareWarning className="size-5 text-emerald-400" />
        </button>

        <button
          onClick={() => setIsQRPairingOpen(true)}
          className="flex items-center gap-3 px-4 py-3 bg-surface-2/90 backdrop-blur-xl border border-white/10 rounded-2xl text-white font-medium hover:bg-surface hover:scale-105 transition-all shadow-xl"
        >
          <span className="text-sm">Show QR Pairing</span>
          <SmartphoneNfc className="size-5 text-blue-400" />
        </button>

        {/* Theme Selector */}
        <div className="mt-2 p-3 bg-surface-2/90 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col gap-3 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
            Themes
          </span>
          <div className="flex gap-2">
            {[
              { id: "dark", color: "bg-slate-900", label: "Dark" },
              { id: "purple", color: "bg-purple-500", label: "Purple" },
              { id: "blue", color: "bg-blue-500", label: "Blue" },
              { id: "yellow", color: "bg-amber-400", label: "Yellow" },
              { id: "green", color: "bg-emerald-500", label: "Green" },
              { id: "red", color: "bg-rose-500", label: "Red" },
              { id: "white", color: "bg-white border border-black/10", label: "White" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                title={t.label}
                className={`size-10 rounded-full transition-all hover:scale-125 hover:shadow-lg ${t.color} ${theme === t.id ? "ring-2 ring-ai ring-offset-2 ring-offset-black/20 scale-110" : "opacity-70"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`size-14 rounded-full bg-ai grid place-items-center text-white shadow-[0_0_20px_rgba(var(--ai-rgb),0.5)] transition-transform duration-300 hover:scale-110 ${isOpen ? "rotate-90" : "rotate-0"}`}
      >
        <Settings2 className="size-6" />
      </button>

      {!isOpen && (
        <div className="absolute right-16 top-4 w-max px-3 py-1 bg-black/80 rounded-md text-xs text-white/70 animate-pulse pointer-events-none">
          Portfolio Demos
        </div>
      )}
    </div>
  );
}
