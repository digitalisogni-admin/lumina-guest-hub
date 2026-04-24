import { usePortfolioDemo } from "@/context/PortfolioDemoContext";
import { useEffect, useState } from "react";
import { CloudRainWind } from "lucide-react";

export function Screensaver() {
  const { isScreensaverActive, setIsScreensaverActive } = usePortfolioDemo();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    if (isScreensaverActive) {
      const interval = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(interval);
    }
  }, [isScreensaverActive]);

  // Optional: Auto-activate after X seconds of idle time (disabled for manual demo control)
  /*
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      if (isScreensaverActive) setIsScreensaverActive(false);
      timeoutId = setTimeout(() => setIsScreensaverActive(true), 30000); // 30s idle
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [isScreensaverActive]);
  */

  if (!isScreensaverActive) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black animate-in fade-in duration-1000 cursor-pointer"
      onClick={() => setIsScreensaverActive(false)}
    >
      {/* Cinematic Background Loop */}
      <img
        src="https://images.unsplash.com/photo-1542314831-c6a4d142104d?auto=format&fit=crop&q=80&w=2560"
        alt="Resort Aerial"
        className="w-full h-full object-cover opacity-60 scale-105 animate-[slow-pan_60s_ease-in-out_infinite_alternate]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

      <div className="absolute top-24 left-24">
        <img src="/images/logo.png" alt="Lumina" className="h-16 opacity-80" />
      </div>

      {/* Clock and Weather */}
      <div className="absolute bottom-24 left-24 flex items-end gap-12">
        <div>
          <h1 className="text-9xl font-display text-white tabular-nums tracking-tighter shadow-black/50 drop-shadow-2xl">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </h1>
          <p className="text-3xl text-white/80 font-medium ml-2 mt-2">
            {time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>

        <div className="mb-4 flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10">
          <CloudRainWind className="size-12 text-blue-400" />
          <div>
            <p className="text-3xl text-white font-bold">22°C</p>
            <p className="text-white/70">Light Rain</p>
          </div>
        </div>
      </div>

      {/* Wake instruction */}
      <div className="absolute bottom-12 left-0 right-0 text-center animate-pulse">
        <p className="text-white/50 text-xl tracking-widest uppercase">
          Press any key or click to wake
        </p>
      </div>

      <style>{`
        @keyframes slow-pan {
          0% { transform: scale(1.05) translate(0, 0); }
          100% { transform: scale(1.1) translate(-2%, -1%); }
        }
      `}</style>
    </div>
  );
}
