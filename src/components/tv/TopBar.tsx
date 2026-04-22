import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useGuest } from "@/context/GuestContext";
import { Sparkles, CloudSun } from "lucide-react";

const NAV = [
  { to: "/", label: "Welcome" },
  { to: "/concierge", label: "Concierge" },
  { to: "/services", label: "Services" },
  { to: "/stay", label: "Stay" },
] as const;

export function TopBar() {
  const { guest, reservation } = useGuest();
  const location = useLocation();
  // Render an empty placeholder during SSR so server & first client paint match,
  // then populate after mount to avoid hydration mismatch on time/locale.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="px-12 py-6 flex items-center justify-between border-b border-border/60 bg-surface/80 backdrop-blur-xl sticky top-0 z-40">
      <Link
        to="/"
        className="flex items-center gap-3 rounded-2xl px-3 py-2"
        aria-label="Lumina home"
      >
        <div className="size-12 rounded-2xl bg-gradient-to-br from-ai to-primary text-ai-foreground grid place-items-center tv-shadow">
          <Sparkles className="size-6" />
        </div>
        <div className="leading-tight">
          <div className="font-display text-3xl text-primary">Lumina</div>
          <div className="text-sm text-muted-foreground -mt-1 tracking-wide uppercase">
            AI Concierge
          </div>
        </div>
      </Link>

      <nav aria-label="Primary" className="flex items-center gap-2 bg-surface-2/70 p-1.5 rounded-full">
        {NAV.map((item) => {
          const active =
            item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={[
                "min-h-[56px] px-6 rounded-full text-lg font-semibold transition-colors flex items-center",
                active
                  ? "bg-primary text-primary-foreground tv-shadow"
                  : "text-muted-foreground hover:bg-surface hover:text-foreground",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-6">
        <div className="text-right leading-tight">
          <div className="text-lg font-semibold text-foreground">
            {guest.salutation} {guest.name}
          </div>
          <div className="text-sm text-muted-foreground">
            {reservation.room} · {guest.loyaltyTier}
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-2 text-foreground min-w-[150px]">
          <CloudSun className="size-6 text-ai" />
          <div className="leading-tight">
            <div
              className="text-lg font-semibold tabular-nums"
              suppressHydrationWarning
            >
              {now ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}
            </div>
            <div className="text-xs text-muted-foreground">22°C · Clear</div>
          </div>
        </div>
      </div>
    </header>
  );
}
