import { usePortfolioDemo } from "@/context/PortfolioDemoContext";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export function ProactiveToast() {
  const { showProactiveToast, setShowProactiveToast } = usePortfolioDemo();
  const navigate = useNavigate();

  useEffect(() => {
    if (showProactiveToast) {
      const timer = setTimeout(() => setShowProactiveToast(false), 15000);
      return () => clearTimeout(timer);
    }
  }, [showProactiveToast]);

  if (!showProactiveToast) return null;

  return (
    <div className="fixed top-12 right-12 z-[100] animate-in slide-in-from-top-12 fade-in duration-500">
      <div className="w-[450px] bg-surface-2/80 backdrop-blur-3xl border border-white/20 rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(var(--ai-rgb),0.15)] relative overflow-hidden group">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-ai/20 blur-[50px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        <button
          onClick={() => setShowProactiveToast(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors outline-none focus-tv rounded-full p-1"
          data-focusable
        >
          <X className="size-5" />
        </button>

        <div className="flex gap-4 relative z-10">
          <div className="size-12 rounded-2xl bg-gradient-to-tr from-ai to-primary grid place-items-center shadow-[0_0_15px_rgba(var(--ai-rgb),0.5)] shrink-0 mt-1">
            <img src="/images/logo.png" alt="" className="size-6 object-contain" />
          </div>
          <div>
            <h4 className="text-white font-display text-xl mb-1">Lumina Proactive</h4>
            <p className="text-white/80 leading-relaxed text-[15px]">
              It looks like light rain is starting outside. Would you like to view our indoor Spa
              menu or order room service instead?
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setShowProactiveToast(false);
                  navigate({ to: "/services" });
                }}
                className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors focus-tv outline-none flex items-center gap-2"
                data-focusable
              >
                View Spa <ArrowRight className="size-4" />
              </button>
              <button
                onClick={() => setShowProactiveToast(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors focus-tv outline-none border border-white/10"
                data-focusable
              >
                Room Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
