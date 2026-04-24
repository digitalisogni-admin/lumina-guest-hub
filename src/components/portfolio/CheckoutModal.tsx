import { X, CreditCard, Apple, CheckCircle2, Users } from "lucide-react";
import { useState } from "react";

export function CheckoutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"summary" | "split" | "success">("summary");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />

      <div className="relative w-[800px] h-[500px] bg-surface border border-white/10 rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden flex">
        {/* Left Side: Summary */}
        <div className="w-1/2 bg-black/40 p-10 border-r border-white/5 flex flex-col relative">
          <div className="absolute inset-0 bg-gradient-to-br from-ai/5 to-transparent pointer-events-none" />
          <h3 className="text-2xl font-display text-white mb-8 relative z-10">Folio Summary</h3>

          <div className="space-y-4 flex-1 relative z-10">
            <div className="flex justify-between text-white/80">
              <span>Room (4 nights)</span>
              <span>$2,720.00</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>In-Room Dining</span>
              <span>$145.00</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Spa Services</span>
              <span>$250.00</span>
            </div>
            <div className="flex justify-between text-white/50 text-sm pt-4 border-t border-white/10">
              <span>Taxes & Fees</span>
              <span>$373.80</span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-auto relative z-10">
            <div className="flex justify-between items-end">
              <span className="text-white/60 uppercase tracking-widest text-sm">Total Due</span>
              <span className="text-4xl font-bold text-white">$3,488.80</span>
            </div>
          </div>
        </div>

        {/* Right Side: Action Area */}
        <div className="w-1/2 p-10 flex flex-col justify-center relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors outline-none focus-tv rounded-full p-2"
            data-focusable
          >
            <X className="size-6" />
          </button>

          {step === "summary" && (
            <div className="space-y-4 animate-in slide-in-from-right-4 fade-in">
              <h4 className="text-xl font-medium text-white mb-6">How would you like to pay?</h4>

              <button
                onClick={() => setStep("success")}
                className="w-full p-4 bg-white text-black rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-white/90 transition-all focus-tv outline-none tv-shadow"
                data-focusable
              >
                <Apple className="size-5" /> Pay Full Amount
              </button>

              <button
                onClick={() => setStep("success")}
                className="w-full p-4 bg-surface-2 border border-white/10 rounded-2xl text-white font-semibold flex items-center justify-center gap-3 hover:bg-surface transition-all focus-tv outline-none"
                data-focusable
              >
                <CreditCard className="size-5 text-white/50" /> Card on File (...4421)
              </button>

              <div className="py-4 text-center">
                <span className="text-white/30 text-sm">or</span>
              </div>

              <button
                onClick={() => setStep("split")}
                className="w-full p-4 bg-ai/10 border border-ai/30 rounded-2xl text-ai font-semibold flex items-center justify-center gap-3 hover:bg-ai/20 transition-all focus-tv outline-none"
                data-focusable
              >
                <Users className="size-5" /> Split Bill
              </button>
            </div>
          )}

          {step === "split" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 fade-in h-full flex flex-col">
              <h4 className="text-xl font-medium text-white">Split with Companions</h4>

              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between p-4 bg-surface-2 rounded-xl border border-ai/50">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-ai/20 text-ai grid place-items-center font-bold">
                      E
                    </div>
                    <span className="text-white font-medium">Eleanor Chen</span>
                  </div>
                  <span className="text-white font-semibold">$1,744.40</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-2 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-white/10 text-white/50 grid place-items-center font-bold">
                      M
                    </div>
                    <span className="text-white/80 font-medium">Michael Chen</span>
                  </div>
                  <span className="text-white/80 font-semibold">$1,744.40</span>
                </div>
              </div>

              <button
                onClick={() => setStep("success")}
                className="w-full p-4 bg-ai text-white rounded-2xl font-semibold hover:bg-ai/90 transition-all focus-tv outline-none mt-auto"
                data-focusable
              >
                Send Request & Pay My Half
              </button>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center text-center h-full animate-in zoom-in-95 fade-in">
              <div className="size-20 rounded-full bg-emerald-500/20 text-emerald-400 grid place-items-center mb-6">
                <CheckCircle2 className="size-10" />
              </div>
              <h4 className="text-2xl font-display text-white mb-2">Payment Complete</h4>
              <p className="text-white/60 mb-8">
                Your folio has been settled. A receipt was sent to your email.
              </p>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-white/10 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/20 transition-all focus-tv outline-none"
                data-focusable
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
