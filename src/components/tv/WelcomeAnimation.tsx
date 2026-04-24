import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export function WelcomeAnimation() {
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    // Start fading after 2.7 seconds
    const fadeTimer = setTimeout(() => setPhase("fading"), 2700);
    // Unmount after fade completes (800ms transition)
    const goneTimer = setTimeout(() => setPhase("gone"), 3500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ease-in-out"
      style={{ opacity: phase === "fading" ? 0 : 1 }}
    >
      <div className="flex flex-col items-center animate-in fade-in zoom-in duration-1000">
        <div className="size-24 rounded-3xl bg-white/10 grid place-items-center tv-shadow-lg mb-6 animate-pulse overflow-hidden">
          <img src="/images/logo.png" alt="" className="size-16 object-contain" />
        </div>
        <h1 className="text-6xl font-display text-white tracking-widest uppercase mb-2">Lumina</h1>
        <p className="text-xl text-muted-foreground tracking-widest uppercase">AI Concierge</p>
      </div>
    </div>
  );
}
