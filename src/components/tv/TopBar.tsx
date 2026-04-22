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
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="px-12 py-6 flex items-center justify-between border-b border-border/60 bg-surface/60 backdrop-blur-sm">
      <Link
        to="/"
        className="flex items-center gap-3 rounded-2xl px-3 py-2"
        aria-label="Lumina home"
      >
        <div className="size-12 rounded-2xl bg-ai text-ai-foreground grid place-items-center">
          <Sparkles className="size-6" />
        </div>
        <div className="leading-tight">
          <div className="font-display text-3xl text-primary">Lumina</div>
          <div className="text-sm text-muted-foreground -mt-1">AI Concierge</div>
        </div>
      </Link>

      <nav aria-label="Primary" className="flex items-center gap-2">
        {NAV.map((item) => {
          const active =
            item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={[
                "min-h-[64px] px-6 rounded-2xl text-xl font-medium transition-colors flex items-center",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
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
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-2 text-foreground">
          <CloudSun className="size-6 text-ai" />
          <div className="leading-tight">
            <div className="text-lg font-semibold">
              {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="text-xs text-muted-foreground">22°C · Clear</div>
          </div>
        </div>
      </div>
    </header>
  );
}
