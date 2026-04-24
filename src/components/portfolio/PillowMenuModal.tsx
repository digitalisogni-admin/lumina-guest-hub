import { useState } from "react";
import { X, Check, BedDouble, Info, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/ToastContext";

const PILLOWS = [
  {
    id: "p1",
    name: "Hungarian Goose Down",
    desc: "Ultra-soft, luxury feel for side and back sleepers.",
    firm: "Soft",
  },
  {
    id: "p2",
    name: "Memory Foam Contour",
    desc: "Orthopedic support for neck alignment.",
    firm: "Firm",
  },
  {
    id: "p3",
    name: "Cooling Gel Fiber",
    desc: "Breathable material for temperature regulation.",
    firm: "Medium",
  },
  {
    id: "p4",
    name: "Buckwheat Hull",
    desc: "Natural, firm support for therapeutic sleep.",
    firm: "Extra Firm",
  },
];

export function PillowMenuModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { showToast } = useToast();
  const [selected, setSelected] = useState<string>("p1");

  const handleRequest = () => {
    const pillow = PILLOWS.find((p) => p.id === selected);
    showToast(`${pillow?.name} requested to your room.`, "success");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[900px] w-[90vw] p-0 overflow-hidden bg-black border-white/10 rounded-[36px] tv-shadow-2xl">
        <DialogTitle className="sr-only">Pillow Menu</DialogTitle>

        <div className="flex h-[500px]">
          {/* Left: Visual */}
          <div className="w-1/3 relative bg-surface-2 border-r border-white/5">
            <div className="absolute inset-0 flex items-center justify-center">
              <BedDouble className="size-32 text-ai/20" />
            </div>
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <h2 className="text-4xl font-display text-white mb-2">Sleep Collection</h2>
              <p className="text-white/50">
                Personalize your rest with our curated selection of pillows.
              </p>
            </div>
          </div>

          {/* Right: Selection */}
          <div className="w-2/3 bg-surface p-10 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-display text-white">Select Your Pillow</h3>
              <button
                onClick={onClose}
                className="size-10 rounded-full bg-white/5 flex items-center justify-center text-white focus-tv"
                data-focusable
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar focus-tv-container">
              {PILLOWS.map((p) => (
                <button
                  key={p.id}
                  onFocus={() => setSelected(p.id)}
                  onClick={() => setSelected(p.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group outline-none ${
                    selected === p.id
                      ? "bg-ai/10 border-ai/30"
                      : "bg-white/5 border-transparent hover:bg-white/10 focus-visible:bg-white/10"
                  }`}
                  data-focusable
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`size-10 rounded-xl flex items-center justify-center transition-colors ${selected === p.id ? "bg-ai text-white" : "bg-white/10 text-white/40"}`}
                    >
                      {selected === p.id ? (
                        <Check className="size-5" />
                      ) : (
                        <Info className="size-5" />
                      )}
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">{p.name}</div>
                      <div className="text-sm text-white/50">{p.desc}</div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                      p.firm === "Soft"
                        ? "bg-blue-500/20 text-blue-400"
                        : p.firm === "Medium"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {p.firm}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={handleRequest}
              className="mt-6 w-full h-16 rounded-2xl bg-ai text-white font-semibold text-xl flex items-center justify-center gap-2 hover:bg-ai/90 focus-tv"
              data-focusable
            >
              Request to Room <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
