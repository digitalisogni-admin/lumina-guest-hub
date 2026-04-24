import { X, CheckCircle2, Clock, MapPin, ChefHat } from "lucide-react";

export function LiveTrackerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={onClose} />

      <div className="relative w-[500px] bg-surface border border-white/10 rounded-[40px] shadow-2xl animate-in slide-in-from-bottom-10 duration-500 overflow-hidden">
        {/* Header Map/Visual Area */}
        <div className="h-48 bg-gradient-to-br from-surface-2 to-black relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800')] opacity-40 mix-blend-overlay bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors outline-none focus-tv rounded-full p-2 z-10"
            data-focusable
          >
            <X className="size-6" />
          </button>

          <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
            <div>
              <p className="text-white/60 text-sm uppercase tracking-widest mb-1">In-Room Dining</p>
              <h3 className="text-3xl font-display text-white">Tasting Menu</h3>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm uppercase tracking-widest mb-1">ETA</p>
              <p className="text-3xl font-bold text-emerald-400">12 min</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="p-8">
          <div className="relative border-l-2 border-white/10 ml-6 space-y-10 pb-4">
            {/* Step 1: Completed */}
            <div className="relative">
              <div className="absolute -left-[35px] top-0 size-8 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 grid place-items-center">
                <CheckCircle2 className="size-5" />
              </div>
              <div className="pl-4">
                <h4 className="text-white font-semibold text-lg">Order Confirmed</h4>
                <p className="text-white/50 text-sm mt-1">Sent to L'Horizon Kitchen at 7:42 PM</p>
              </div>
            </div>

            {/* Step 2: Active */}
            <div className="relative">
              <div className="absolute -left-[35px] top-0 size-8 rounded-full bg-ai border border-ai text-white grid place-items-center shadow-[0_0_15px_rgba(var(--ai-rgb),0.5)]">
                <ChefHat className="size-5" />
              </div>
              <div className="pl-4">
                <h4 className="text-white font-semibold text-lg">Preparing</h4>
                <p className="text-ai text-sm mt-1 animate-pulse">Chef is preparing your order</p>
              </div>
            </div>

            {/* Step 3: Pending */}
            <div className="relative">
              <div className="absolute -left-[35px] top-0 size-8 rounded-full bg-surface border border-white/20 text-white/30 grid place-items-center">
                <MapPin className="size-5" />
              </div>
              <div className="pl-4 opacity-40">
                <h4 className="text-white font-semibold text-lg">On the way</h4>
                <p className="text-white/50 text-sm mt-1">Delivery to Suite 1204</p>
              </div>
            </div>
          </div>

          <button
            className="w-full mt-8 py-4 bg-surface-2 hover:bg-surface border border-white/5 rounded-2xl text-white font-semibold transition-colors focus-tv outline-none"
            data-focusable
            onClick={onClose}
          >
            Modify or Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
}
