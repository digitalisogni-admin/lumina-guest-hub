import { useState, useEffect } from "react";
import { X, MapPin, QrCode, ArrowRight, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type Property = {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
};

export function SisterPropertyModal({
  isOpen,
  onClose,
  property,
}: {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}) {
  const [qrScanned, setQrScanned] = useState(false);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setQrScanned(false);
    }
  }, [isOpen]);

  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[1000px] w-[90vw] h-[70vh] p-0 overflow-hidden bg-black border-white/10 rounded-[36px] tv-shadow-2xl">
        <DialogTitle className="sr-only">Book Future Stay at {property.name}</DialogTitle>

        <div className="flex h-full">
          {/* Left Side: Destination Imagery */}
          <div className="w-1/2 relative h-full">
            <img
              src={property.image}
              alt={property.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-10 left-10 right-10">
              <div className="flex items-center gap-2 text-white/80 text-sm font-semibold tracking-widest uppercase mb-3">
                <MapPin className="size-4 text-ai" /> {property.location}
              </div>
              <h2 className="text-5xl font-display text-white mb-4">{property.name}</h2>
              <p className="text-white/80 text-lg leading-relaxed">{property.description}</p>
            </div>
          </div>

          {/* Right Side: Booking QR */}
          <div className="w-1/2 bg-surface p-12 flex flex-col justify-center items-center relative text-center">
            <button
              onClick={onClose}
              className="absolute top-8 right-8 size-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all focus-tv"
              data-focusable
            >
              <X className="size-6" />
            </button>

            <div className="size-16 rounded-2xl bg-ai/10 text-ai grid place-items-center mb-8">
              <QrCode className="size-8" />
            </div>

            <h3 className="text-3xl font-display text-white mb-4">Continue Your Journey</h3>
            <p className="text-muted-foreground text-lg mb-10 max-w-sm">
              Scan the QR code below to send a secure booking link directly to your mobile device.
              Special loyalty rates applied.
            </p>

            {/* Simulated QR Code */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-ai to-primary rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white p-4 rounded-2xl">
                {/* Real QR code logic would go here, using a placeholder for the demo */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://lumina.app/book/${property.id}`}
                  alt="Booking QR Code"
                  className="w-48 h-48 rounded-lg"
                />
              </div>

              {/* Interactive simulated scan button for demo purposes */}
              <button
                onClick={() => setQrScanned(true)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer focus-tv"
                data-focusable
                aria-label="Simulate QR Scan"
              />
            </div>

            {qrScanned && (
              <div className="mt-8 flex items-center gap-2 text-emerald-400 animate-in fade-in slide-in-from-bottom-2">
                <CheckCircle2 className="size-5" />
                <span className="font-semibold">Link sent to your device!</span>
              </div>
            )}

            {!qrScanned && (
              <div className="mt-8 flex items-center gap-2 text-muted-foreground text-sm">
                <ArrowRight className="size-4 animate-pulse text-ai" />
                Scan to book instantly
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
