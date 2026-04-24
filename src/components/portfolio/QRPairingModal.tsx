import { usePortfolioDemo } from "@/context/PortfolioDemoContext";
import { X, Smartphone, ArrowRight } from "lucide-react";

export function QRPairingModal() {
  const { isQRPairingOpen, setIsQRPairingOpen } = usePortfolioDemo();

  if (!isQRPairingOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        onClick={() => setIsQRPairingOpen(false)}
      />

      <div className="relative w-[500px] bg-surface border border-white/10 rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

        <button
          onClick={() => setIsQRPairingOpen(false)}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors outline-none focus-tv rounded-full p-2"
          data-focusable
        >
          <X className="size-6" />
        </button>

        <div className="flex flex-col items-center text-center relative z-10">
          <div className="size-16 rounded-full bg-primary/20 grid place-items-center mb-6">
            <Smartphone className="size-8 text-primary" />
          </div>

          <h2 className="text-3xl font-display text-white mb-2">Sync Your Device</h2>
          <p className="text-white/60 mb-8 text-lg">
            Scan to use your phone as a remote and take Lumina with you around the resort.
          </p>

          <div className="p-4 bg-white rounded-3xl tv-shadow-lg mb-8">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
              alt="QR Code"
              className="size-48"
            />
          </div>

          <div className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-left">
              <p className="text-white font-medium">Or enter code manually</p>
              <p className="text-2xl font-mono text-primary tracking-widest mt-1">AX-7829</p>
            </div>
            <ArrowRight className="size-6 text-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
