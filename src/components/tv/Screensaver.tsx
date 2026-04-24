import { useEffect, useState } from "react";
import { CloudSun } from "lucide-react";
import { useGuest } from "@/context/GuestContext";

export function Screensaver({ onDismiss }: { onDismiss: () => void }) {
  const [time, setTime] = useState(new Date());
  const { guest } = useGuest();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const handleKey = () => onDismiss();
    window.addEventListener("keydown", handleKey);
    window.addEventListener("mousedown", handleKey);

    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("mousedown", handleKey);
    };
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black animate-in fade-in duration-1000 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110 blur-[2px]"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-slow-motion-39845-large.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-20 animate-pulse-slow">
        <div className="space-y-4 mb-12">
          <p className="text-ai text-2xl font-semibold tracking-[0.3em] uppercase opacity-80">
            Reserved for
          </p>
          <h2 className="text-7xl font-display text-white">
            {guest.salutation} {guest.name}
          </h2>
        </div>

        <div className="flex items-center gap-12 text-white">
          <div className="text-[180px] font-display leading-none tracking-tighter drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>

          <div className="text-left space-y-2">
            <div className="text-4xl font-display opacity-90">
              {time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
            </div>
            <div className="flex items-center gap-3 text-2xl opacity-60 font-medium">
              <CloudSun className="size-8 text-amber-400" />
              <span>24°C · Clear Sky</span>
            </div>
          </div>
        </div>

        <div className="mt-24 text-xl text-white/30 uppercase tracking-[0.5em] animate-bounce">
          Press any key to return
        </div>
      </div>

      <div className="absolute top-20 left-20 opacity-30">
        <img src="/images/logo.png" alt="Lumina" className="h-10 invert" />
      </div>
    </div>
  );
}
