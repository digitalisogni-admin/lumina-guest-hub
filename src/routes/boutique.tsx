import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag, ChevronRight, CheckCircle2, Sparkles } from "lucide-react";
import { BOUTIQUE_ITEMS } from "@/lib/mockData";
import { TooltipBubble } from "@/components/ui/TooltipBubble";
import { useToast } from "@/components/ui/ToastContext";

export const Route = createFileRoute("/boutique")({
  component: BoutiquePage,
});

function BoutiquePage() {
  const { showToast } = useToast();
  const [purchased, setPurchased] = useState<Set<string>>(new Set());
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "LUMINA20") {
      setDiscount(0.2);
      showToast("Promo code applied! 20% discount granted.", "success");
    } else {
      showToast("Invalid promo code.", "error");
    }
  };

  const handlePurchase = (id: string, name: string) => {
    setPurchased((prev) => new Set(prev).add(id));
    showToast(`${name} has been charged to your folio and will be delivered shortly.`, "success");
  };

  const subtotal = BOUTIQUE_ITEMS.filter((i) => purchased.has(i.id)).reduce(
    (acc, i) => acc + i.price,
    0,
  );
  const total = subtotal * (1 - discount);

  return (
    <div className="max-w-[1600px] mx-auto pb-20 animate-in fade-in duration-700">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <p className="text-ai font-semibold text-sm tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
            <Sparkles className="size-4" /> Room Delivery
          </p>
          <h1 className="text-6xl font-display text-white">Digital Boutique</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="bg-surface/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-4">
            <input
              type="text"
              placeholder="Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="bg-transparent border-none outline-none text-white w-32 placeholder:text-white/30"
              data-focusable
            />
            <button
              onClick={handleApplyPromo}
              className="px-4 py-1.5 rounded-xl bg-ai text-white font-bold text-sm hover:bg-ai/80 transition-colors"
              data-focusable
            >
              Apply
            </button>
          </div>

          <div className="flex items-center gap-4 bg-surface/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5">
            <ShoppingBag className="size-6 text-ai" />
            <div>
              <div className="text-sm text-white/50 uppercase tracking-widest font-bold">Total</div>
              <div className="text-xl font-display text-white">
                ${total.toFixed(0)}
                {discount > 0 && <span className="text-sm text-ai ml-2">(-20%)</span>}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-8">
        {BOUTIQUE_ITEMS.map((item) => {
          const isBought = purchased.has(item.id);
          return (
            <div
              key={item.id}
              className="group relative rounded-[32px] overflow-hidden bg-surface border border-white/5 tv-shadow flex flex-col focus-within:ring-4 focus-within:ring-ai"
            >
              <div className="relative aspect-square">
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 text-xs font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-display text-white mb-2 line-clamp-2">{item.name}</h3>
                <div className="text-3xl font-display text-ai mb-6 mt-auto">${item.price}</div>

                <TooltipBubble content={isBought ? "Item purchased" : "Charge to room and deliver"}>
                  <button
                    onClick={() => !isBought && handlePurchase(item.id, item.name)}
                    disabled={isBought}
                    className={`w-full h-14 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all focus-tv outline-none ${
                      isBought
                        ? "bg-emerald-500/20 text-emerald-400 cursor-default"
                        : "bg-white/10 text-white hover:bg-ai hover:text-white"
                    }`}
                    data-focusable
                  >
                    {isBought ? (
                      <>
                        <CheckCircle2 className="size-5" /> Delivered to Room
                      </>
                    ) : (
                      <>
                        Order Now <ChevronRight className="size-5" />
                      </>
                    )}
                  </button>
                </TooltipBubble>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
