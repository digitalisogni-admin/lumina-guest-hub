import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

export function BookingCalendarModal({
  isOpen,
  onClose,
  onConfirm,
  currentNights,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (extraNights: number) => void;
  currentNights: number;
}) {
  const [selectedExtra, setSelectedExtra] = useState(0);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => confirmRef.current?.focus(), 50);
      setSelectedExtra(0);
    }
  }, [isOpen, currentNights]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-surface border border-white/10 tv-shadow-2xl rounded-[32px] p-10 max-w-[1000px] w-full relative animate-in zoom-in-95 duration-300">
        <h2 className="text-4xl font-display text-white mb-2">Modify Your Stay</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Your suite is available to extend up to 4 more nights.
        </p>

        <div className="flex gap-10">
          {/* Calendar Mock */}
          <div className="flex-[3] bg-surface-2 rounded-3xl p-8 border border-white/5">
            <div className="flex justify-between items-center mb-8">
              <button type="button" className="p-2 text-white/50 hover:text-white" data-focusable>
                <ChevronLeft className="size-6" />
              </button>
              <span className="text-2xl text-white font-semibold">April 2026</span>
              <button type="button" className="p-2 text-white hover:text-ai" data-focusable>
                <ChevronRight className="size-6" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-4 text-center text-base font-semibold text-white/50 mb-6 uppercase tracking-wider">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-4 gap-x-4">
              {/* Mock dates */}
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                // mock current stay: 15 to 15+currentNights
                const start = 15;
                const end = start + currentNights;
                const isCurrent = day >= start && day < end;
                const isExtra = day >= end && day < end + selectedExtra;
                const isPast = day < start;
                const isAvailable = day >= end && day <= end + 4;

                return (
                  <button
                    type="button"
                    key={day}
                    className={`aspect-square rounded-full flex items-center justify-center text-xl font-semibold transition-all ${
                      isCurrent
                        ? "bg-white/20 text-white"
                        : isExtra
                          ? "bg-ai text-white tv-shadow"
                          : isPast
                            ? "text-white/20"
                            : isAvailable
                              ? "text-white hover:bg-white/10"
                              : "text-white/30"
                    }`}
                    data-focusable={isAvailable}
                    onClick={() => {
                      if (isAvailable) {
                        setSelectedExtra(day - end + 1);
                      }
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-[2] flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-2xl text-white font-semibold mb-2">Extension Options</h3>
              {[0, 1, 2, 3, 4].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setSelectedExtra(n)}
                  className={`w-full p-4 rounded-2xl flex justify-between items-center border-2 transition-colors ${
                    selectedExtra === n
                      ? "bg-ai/20 border-ai text-white"
                      : "bg-surface-2 border-transparent text-white/70 hover:border-white/10 hover:text-white"
                  }`}
                  data-focusable
                >
                  <span className="text-xl font-medium">
                    {n === 0 ? "No extension" : `+${n} Night${n > 1 ? "s" : ""}`}
                  </span>
                  {selectedExtra === n && <Check className="text-ai size-6" />}
                </button>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 rounded-2xl bg-surface-2 border border-white/10 text-white font-semibold text-xl"
                data-focusable
              >
                Cancel
              </button>
              <button
                type="button"
                ref={confirmRef}
                onClick={() => {
                  onConfirm(selectedExtra);
                  onClose();
                }}
                className="flex-1 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-xl"
                data-focusable
              >
                Update Stay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
