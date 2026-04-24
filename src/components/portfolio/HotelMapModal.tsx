import { useState, useEffect } from "react";
import { X, Map as MapIcon, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MAP_POIS } from "@/lib/mockData";
import { useGuest } from "@/context/GuestContext";

export function HotelMapModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useGuest();
  const [activePoiId, setActivePoiId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActivePoiId(MAP_POIS[0].id);
    } else {
      setActivePoiId(null);
    }
  }, [isOpen]);

  const activePoi = MAP_POIS.find((p) => p.id === activePoiId) || MAP_POIS[0];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[1400px] w-[95vw] h-[85vh] p-0 overflow-hidden bg-surface/80 backdrop-blur-3xl border-white/10 rounded-[40px] tv-shadow-2xl flex">
        <DialogTitle className="sr-only">Interactive Resort Map</DialogTitle>

        {/* ━━━ LEFT: Interactive Map (65%) ━━━ */}
        <div className="relative w-[65%] h-full overflow-hidden bg-black/40">
          {/* Base Map Image - Google Maps Satellite Style */}
          <div
            className="absolute inset-0 transition-transform duration-1000 ease-out origin-center"
            style={{
              transform: `scale(1.5) translate(${(50 - activePoi.x) * 0.4}%, ${(50 - activePoi.y) * 0.4}%)`,
            }}
          >
            <img
              src="/images/map.jpg"
              alt="Resort Map"
              className="w-full h-full object-cover opacity-60 mix-blend-screen"
            />
            {/* Soft vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)]" />
          </div>

          {/* Compass/HUD Elements */}
          <div className="absolute top-8 left-8 z-20 flex flex-col gap-4">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="size-12 rounded-full border border-ai/50 flex items-center justify-center">
                <div className="w-1 h-8 bg-gradient-to-t from-transparent via-ai to-transparent" />
              </div>
              <div>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
                  Orientation
                </div>
                <div className="text-white font-mono font-bold tracking-widest text-sm">
                  N 34.0194 / W 118.4912
                </div>
              </div>
            </div>
          </div>

          {/* Markers */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {MAP_POIS.map((poi) => {
              const isActive = activePoiId === poi.id;
              return (
                <button
                  key={poi.id}
                  onClick={() => setActivePoiId(poi.id)}
                  className="absolute transition-all duration-1000 ease-out group/marker outline-none cursor-pointer pointer-events-auto"
                  style={{
                    left: `${poi.x}%`,
                    top: `${poi.y}%`,
                    transform: `translate(-50%, -50%)`,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  data-focusable
                >
                  {/* Google Maps Style Marker */}
                  <div className="relative flex flex-col items-center">
                    {isActive && (
                      <div className="absolute -top-4 w-32 h-32 rounded-full bg-ai/20 animate-ping -translate-y-1/2" />
                    )}

                    <div
                      className={`
                      relative size-10 rounded-full border-2 transition-all duration-500 flex items-center justify-center
                      ${isActive ? "bg-ai border-white shadow-[0_0_30px_rgba(var(--ai),0.8)] scale-125" : "bg-black/60 border-white/20 scale-100 group-hover/marker:border-ai/50"}
                    `}
                    >
                      <div
                        className={`size-3 rounded-full ${isActive ? "bg-white" : "bg-white/40"}`}
                      />
                    </div>

                    {/* Tooltip on Map */}
                    <div
                      className={`
                      mt-4 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 text-white font-semibold transition-all duration-500 whitespace-nowrap
                      ${isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 group-hover/marker:opacity-100 group-hover/marker:translate-y-0"}
                    `}
                    >
                      {poi.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Overlay gradient to blend with sidebar */}
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black/40 to-transparent z-20" />
        </div>

        {/* ━━━ RIGHT: Directory Sidebar (35%) ━━━ */}
        <div className="relative w-[35%] h-full flex flex-col bg-white/5 z-30 border-l border-white/10">
          {/* Header */}
          <div className="p-10 pb-6 flex items-center justify-between shrink-0">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <MapIcon className="size-6 text-ai" />
                <h2 className="text-3xl font-display text-white">Directory</h2>
              </div>
              <p className="text-white/40">Select a location to explore.</p>
            </div>
            <button
              onClick={onClose}
              className="size-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all focus-tv"
              data-focusable
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Active POI Preview Card */}
          <div className="px-10 shrink-0 mb-6">
            <div className="rounded-[24px] overflow-hidden relative aspect-video bg-white/5 border border-white/5">
              <img
                src={activePoi.image}
                alt={activePoi.name}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                key={activePoi.id} // Forces re-render for smooth image swap
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="text-ai text-xs font-bold uppercase tracking-wider mb-1">
                  {activePoi.category}
                </div>
                <div className="text-2xl font-display text-white mb-1">{activePoi.name}</div>
                <div className="text-white/60 text-sm flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />{" "}
                  {activePoi.status}
                </div>
              </div>
            </div>
          </div>

          {/* List Navigation */}
          <div className="flex-1 overflow-y-auto px-6 pb-10 space-y-2 no-scrollbar focus-tv-container">
            {MAP_POIS.map((poi) => {
              const isActive = activePoiId === poi.id;
              return (
                <button
                  key={poi.id}
                  onFocus={() => setActivePoiId(poi.id)}
                  onClick={() => setActivePoiId(poi.id)}
                  className={[
                    "w-full text-left p-5 rounded-2xl transition-all duration-300 flex items-center justify-between group outline-none",
                    isActive
                      ? "bg-ai/10 border border-ai/30"
                      : "hover:bg-white/5 border border-transparent focus-visible:bg-white/10",
                  ].join(" ")}
                  data-focusable
                >
                  <div>
                    <div
                      className={[
                        "text-lg font-semibold transition-colors",
                        isActive ? "text-ai" : "text-white",
                      ].join(" ")}
                    >
                      {poi.name}
                    </div>
                    <div className="text-sm text-white/40 mt-1">{poi.category}</div>
                  </div>
                  <ChevronRight
                    className={[
                      "size-5 transition-transform",
                      isActive ? "text-ai translate-x-1" : "text-white/20",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
