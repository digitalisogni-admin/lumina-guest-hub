import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, Pause, SkipForward, SkipBack, Volume2, Maximize2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useGuest } from "@/context/GuestContext";

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "movie" | "game";
  image?: string;
}

export function PlayerModal({ isOpen, onClose, title, type, image }: PlayerModalProps) {
  const { t } = useGuest();
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.1));
    }, 100);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-none w-screen h-screen bg-black p-0 border-none">
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
          {/* Background Image / Placeholder */}
          {image ? (
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover opacity-30 blur-2xl scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-ai/20 via-black to-black" />
          )}

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-12 max-w-4xl w-full px-12">
            <div className="text-center">
              <h2 className="text-white font-display text-6xl mb-4 animate-in fade-in slide-in-from-top-10 duration-700">
                {title}
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="size-2 rounded-full bg-ai animate-pulse" />
                <span className="text-ai text-2xl font-semibold tracking-wider uppercase">
                  {type === "movie" ? t("playing") : t("downloading")}
                </span>
              </div>
            </div>

            {/* Poster / Game Icon */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-ai/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative aspect-video w-[600px] rounded-[40px] overflow-hidden tv-shadow border border-white/10">
                <img src={image} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  {type === "movie" ? (
                    <Play className="size-24 text-white opacity-40" />
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="size-20 rounded-full border-4 border-white/20 border-t-ai animate-spin" />
                      <span className="text-white font-bold text-xl">{Math.floor(progress)}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            {type === "movie" && (
              <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                {/* Progress Bar */}
                <div className="space-y-3">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ai transition-all duration-300 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-white/40 text-lg font-medium tabular-nums">
                    <span>1:24:05</span>
                    <span>2:15:30</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-10">
                  <button
                    className="text-white/60 hover:text-white transition-colors"
                    data-focusable
                  >
                    <SkipBack className="size-10" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="size-20 rounded-full bg-white text-black grid place-items-center hover:scale-110 transition-transform active:scale-95"
                    data-focusable
                  >
                    {isPlaying ? (
                      <Pause className="size-10 fill-current" />
                    ) : (
                      <Play className="size-10 fill-current ml-1" />
                    )}
                  </button>
                  <button
                    className="text-white/60 hover:text-white transition-colors"
                    data-focusable
                  >
                    <SkipForward className="size-10" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Top Bar Controls */}
          <div className="absolute top-12 left-12 right-12 flex justify-between items-center z-20">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
              <Volume2 className="size-6 text-white/60" />
              <div className="h-1 w-24 bg-white/20 rounded-full">
                <div className="h-full w-[70%] bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="size-12 rounded-2xl bg-white/10 backdrop-blur-md grid place-items-center hover:bg-white/20 transition-colors"
                data-focusable
              >
                <Maximize2 className="size-6 text-white" />
              </button>
              <button
                onClick={onClose}
                className="size-12 rounded-2xl bg-white/10 backdrop-blur-md grid place-items-center hover:bg-white/20 transition-colors border border-white/10"
                data-focusable
              >
                <X className="size-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
