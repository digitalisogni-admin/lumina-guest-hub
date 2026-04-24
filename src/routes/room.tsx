import { createFileRoute } from "@tanstack/react-router";
import { useGuest } from "@/context/GuestContext";
import { RoomControlCard } from "@/components/ui-cards/RoomControlCard";
import { SlidersHorizontal, Info } from "lucide-react";

export const Route = createFileRoute("/room")({
  head: () => ({
    meta: [{ title: "Smart Room · Lumina" }],
  }),
  component: RoomPage,
});

function RoomPage() {
  const { t } = useGuest();

  return (
    <div className="max-w-[1700px] mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-500 py-10">
      <header className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <SlidersHorizontal className="size-8 text-ai" />
            <h1 className="font-display text-6xl text-white">{t("smart_room")}</h1>
          </div>
          <p className="text-2xl text-muted-foreground">{t("room_controls")}</p>
        </div>

        <div className="bg-surface/50 border border-white/5 rounded-2xl p-6 flex items-center gap-4 max-w-md">
          <Info className="size-6 text-ai shrink-0" />
          <p className="text-lg text-white/70 italic">
            "Lumina can also adjust your suite via voice. Try saying 'Make it warmer' or 'Set lights
            to romantic' in the Concierge."
          </p>
        </div>
      </header>

      <main className="grid grid-cols-12 gap-10">
        <div className="col-span-6">
          <RoomControlCard />
        </div>

        <div className="col-span-6 space-y-8">
          <section className="rounded-3xl bg-surface border border-border p-8 space-y-6">
            <h3 className="text-2xl font-bold font-display text-white">Suite 1204 Ambiance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-secondary/50 border border-white/5">
                <div className="text-sm text-muted-foreground uppercase tracking-widest mb-1">
                  Energy Saving
                </div>
                <div className="text-2xl font-semibold text-status-completed">Optimized</div>
              </div>
              <div className="p-6 rounded-2xl bg-secondary/50 border border-white/5">
                <div className="text-sm text-muted-foreground uppercase tracking-widest mb-1">
                  Air Quality
                </div>
                <div className="text-2xl font-semibold text-ai">Excellent</div>
              </div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Your suite environment is managed by Lumina AI to ensure maximum comfort while
              minimizing ecological footprint. Manual overrides are always available and preferred.
            </p>
          </section>

          <section className="rounded-3xl bg-surface border border-border overflow-hidden flex flex-col h-[500px]">
            <div className="p-6 pb-2 border-b border-white/5 flex items-center justify-between z-10 bg-surface">
              <h3 className="text-2xl font-bold font-display text-white">Resort Map</h3>
              <div className="flex gap-4 text-xs font-semibold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <div className="size-3 rounded-full bg-ai animate-pulse" /> Your Suite
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="size-3 rounded-full bg-blue-500/50" /> Pools
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="size-3 rounded-full bg-emerald-500/50" /> Spa & Wellness
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="size-3 rounded-full bg-orange-500/50" /> Dining
                </span>
              </div>
            </div>

            <div className="flex-1 relative bg-[#0a0a0f] overflow-hidden group">
              {/* Abstract Map Background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Shoreline/Beach hint */}
                  <path
                    d="M -100 400 Q 200 350 400 450 T 800 400"
                    fill="none"
                    stroke="rgba(59,130,246,0.3)"
                    strokeWidth="100"
                    strokeLinecap="round"
                    className="blur-xl"
                  />
                </svg>
              </div>

              {/* Map Container - Interactive Area */}
              <div className="absolute inset-0 transition-transform duration-1000 ease-in-out group-hover:scale-105 group-hover:translate-x-[-2%] group-hover:translate-y-[-2%]">
                {/* Main Tower (Where Suite 1204 is) */}
                <div className="absolute top-[20%] left-[30%] w-[120px] h-[180px] bg-white/5 border border-white/20 rounded-lg backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.05)] flex items-center justify-center">
                  <span className="text-white/40 text-xs font-semibold tracking-widest uppercase rotate-[-90deg]">
                    Main Tower
                  </span>
                </div>

                {/* Spa Wing */}
                <div className="absolute top-[15%] left-[55%] w-[140px] h-[80px] bg-emerald-500/10 border border-emerald-500/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                  <span className="text-emerald-500/60 text-xs font-semibold tracking-widest uppercase">
                    Aurora Spa
                  </span>
                </div>

                {/* Pool Area */}
                <div className="absolute top-[45%] left-[45%] w-[180px] h-[100px] bg-blue-500/10 border border-blue-500/20 rounded-[40px] backdrop-blur-sm flex items-center justify-center">
                  <span className="text-blue-500/60 text-xs font-semibold tracking-widest uppercase">
                    Lagoon Pool
                  </span>
                </div>

                {/* Dining Pavilion */}
                <div className="absolute top-[65%] left-[25%] w-[100px] h-[100px] bg-orange-500/10 border border-orange-500/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                  <span className="text-orange-500/60 text-xs font-semibold tracking-widest uppercase text-center">
                    L'Horizon
                    <br />
                    Dining
                  </span>
                </div>

                {/* Guest Room Marker - Suite 1204 (Top floors of Main Tower) */}
                <div className="absolute top-[25%] left-[35%] flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-ai/30 rounded-full blur-md animate-pulse" />
                    <div className="absolute -inset-2 bg-ai/40 rounded-full animate-ping [animation-duration:3s]" />
                    <div className="relative size-4 bg-ai rounded-full border-2 border-white shadow-[0_0_15px_rgba(var(--ai-rgb),1)] z-10" />
                  </div>
                  <div className="mt-2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-md border border-white/20 text-white text-xs font-bold whitespace-nowrap tv-shadow z-20">
                    Suite 1204
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
