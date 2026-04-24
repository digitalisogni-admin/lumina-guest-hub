import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Mail, Home, Star, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
  room: string;
  total: number;
}

export function CheckoutModal({ isOpen, onClose, guestName, room, total }: CheckoutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] bg-black/95 border-border p-0 overflow-hidden">
        <div className="p-12 text-center flex flex-col items-center">
          <div className="size-24 rounded-full bg-ai/20 grid place-items-center mb-8 animate-in zoom-in duration-500">
            <CheckCircle2 className="size-12 text-ai animate-bounce" />
          </div>

          <DialogHeader className="text-center">
            <DialogTitle className="font-display text-5xl text-primary mb-4">
              Thank you, {guestName}
            </DialogTitle>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              Your stay at Lumina has been officially completed. We hope your journey was as
              extraordinary as our service.
            </p>
          </DialogHeader>

          <div className="w-full mt-12 grid grid-cols-2 gap-6">
            <div className="bg-surface-2 p-6 rounded-3xl border border-border text-left">
              <div className="text-sm text-muted-foreground uppercase font-bold mb-1">
                Folio Total
              </div>
              <div className="text-3xl font-semibold text-foreground font-display">${total}</div>
              <div className="flex items-center gap-2 text-ai mt-2 text-sm font-medium">
                <Mail className="size-4" /> Emailed to your inbox
              </div>
            </div>
            <div className="bg-surface-2 p-6 rounded-3xl border border-border text-left">
              <div className="text-sm text-muted-foreground uppercase font-bold mb-1">Room</div>
              <div className="text-3xl font-semibold text-foreground font-display">{room}</div>
              <div className="text-muted-foreground mt-2 text-sm">Key deactivated</div>
            </div>
          </div>

          <div className="w-full mt-10 p-8 rounded-[40px] bg-ai/10 border border-ai/20">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h4 className="text-lg font-semibold text-foreground">Rate your experience</h4>
                <p className="text-sm text-muted-foreground">Help us improve our service</p>
              </div>
              <div className="flex items-center gap-1 text-ai">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button key={i} className="hover:scale-125 transition-transform" data-focusable>
                    <Star className="size-8 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 min-h-[72px] rounded-2xl bg-surface-2 text-foreground font-bold text-xl hover:bg-surface transition-all flex items-center justify-center gap-2"
              data-focusable
            >
              Close
            </button>
            <Link
              to="/"
              onClick={onClose}
              className="flex-[2] min-h-[72px] rounded-2xl bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all tv-shadow"
              data-focusable
            >
              Return Home <Home className="size-6" />
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
