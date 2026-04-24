import { useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { DINING_MENU } from "@/lib/mockData";
import { useGuest } from "@/context/GuestContext";
import { Sparkles, Leaf } from "lucide-react";

export function MenuModal({
  isOpen,
  onClose,
  restaurantName,
}: {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { guest } = useGuest();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ["Starters", "Mains", "Desserts"];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-surface/80 backdrop-blur-3xl border border-white/10 tv-shadow-xl rounded-[40px] overflow-hidden max-w-[1400px] w-full flex animate-in zoom-in-95 duration-300 h-[85vh]">
        {/* Mock Menu Visuals */}
        <div className="w-2/3 p-12 bg-white/5 overflow-y-auto hide-scrollbar">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-6xl font-display text-white">{restaurantName} Menu</h2>
            {guest.preferences.some((p) => ["Vegan", "Gluten-Free"].includes(p)) && (
              <div className="bg-ai/10 border border-ai/20 rounded-2xl px-6 py-3 flex items-center gap-3">
                <Sparkles className="size-5 text-ai" />
                <span className="text-white font-semibold">
                  Tailored for your{" "}
                  {guest.preferences
                    .filter((p) => ["Vegan", "Gluten-Free"].includes(p))
                    .join(" & ")}{" "}
                  lifestyle
                </span>
              </div>
            )}
          </div>

          <div className="space-y-12">
            {categories.map((cat) => (
              <div key={cat}>
                <h3 className="text-3xl text-ai font-display mb-6 border-b border-white/10 pb-2">
                  {cat}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {DINING_MENU.filter((item) => item.category === cat).map((item) => {
                    const isRecommended = item.dietaryTags.some((tag) =>
                      guest.preferences.includes(tag),
                    );
                    return (
                      <div
                        key={item.id}
                        className={`p-6 rounded-3xl border transition-all ${isRecommended ? "bg-ai/10 border-ai/40 ring-1 ring-ai/20" : "bg-white/5 border-white/5"}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-2xl font-display ${isRecommended ? "text-white" : "text-white/80"}`}
                            >
                              {item.name}
                            </span>
                            {isRecommended && (
                              <span className="bg-ai text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                                <Leaf className="size-3" /> Recommended
                              </span>
                            )}
                          </div>
                          <span className="text-2xl font-display text-white/50">${item.price}</span>
                        </div>
                        <div className="flex gap-2">
                          {item.dietaryTags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs px-2 py-1 rounded-lg ${guest.preferences.includes(tag) ? "bg-ai/20 text-ai border border-ai/30" : "bg-white/10 text-white/40 border border-white/10"}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR Code Section */}
        <div className="w-1/3 p-12 bg-white/5 text-white flex flex-col items-center justify-center text-center relative border-l border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-ai/20 via-transparent to-transparent opacity-30 pointer-events-none" />

          <h3 className="text-4xl font-display mb-4 relative z-10">Scan to Order</h3>
          <p className="text-xl text-white/60 mb-12 max-w-xs relative z-10">
            Personalize your dining experience, view ingredients, and order directly to your table
            or suite.
          </p>
          <div className="bg-white p-8 rounded-[32px] tv-shadow-2xl mb-12 relative z-10 scale-110">
            <QRCodeSVG
              value={`lumina://menu/${restaurantName.toLowerCase().replace(/\s/g, "-")}`}
              size={220}
              bgColor="#FFFFFF"
              fgColor="#0F172A"
              level="H"
            />
          </div>
          <button
            type="button"
            ref={closeRef}
            onClick={onClose}
            className="px-10 py-5 rounded-2xl bg-ai text-white font-bold text-2xl min-w-[240px] hover:scale-105 active:scale-95 transition-all relative z-10"
            data-focusable
          >
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );
}
