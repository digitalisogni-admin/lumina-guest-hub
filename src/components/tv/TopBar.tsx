import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useGuest } from "@/context/GuestContext";
import { Sparkles, CloudSun, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useWalkthrough } from "@/context/WalkthroughContext";
import { Accessibility, HelpCircle, Eye, HandIcon, Bell } from "lucide-react";

export function TopBar({ onOpenAlarm }: { onOpenAlarm?: () => void }) {
  const { guest, reservation, language, setLanguage, t } = useGuest();
  const { setAccessibilityMode, accessibilityMode } = useWalkthrough();
  const location = useLocation();

  const NAV: { to: string; label: string; tourId?: string }[] = [
    { to: "/", label: t("welcome"), tourId: "nav-welcome" },
    { to: "/concierge", label: t("concierge"), tourId: "nav-concierge" },
    { to: "/entertainment", label: t("entertainment"), tourId: "nav-entertainment" },
    { to: "/games", label: t("games"), tourId: "nav-games" },
    { to: "/services", label: t("services"), tourId: "nav-services" },
    { to: "/fidelity", label: t("fidelity"), tourId: "nav-fidelity" },
    { to: "/stay", label: t("stay"), tourId: "nav-stay" },
    { to: "/help", label: "Help", tourId: "nav-help" },
  ];
  // Render an empty placeholder during SSR so server & first client paint match,
  // then populate after mount to avoid hydration mismatch on time/locale.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="px-12 py-6 flex items-center justify-between border-b border-border/60 bg-black/95 sticky top-0 z-40">
      <Link
        to="/"
        className="flex items-center gap-3 rounded-2xl px-3 py-2"
        aria-label="Lumina home"
      >
        <div className="size-12 rounded-2xl bg-white/10 overflow-hidden grid place-items-center tv-shadow">
          <img src="/images/logo.png" alt="" className="size-8 object-contain" />
        </div>
        <div className="leading-tight">
          <div className="font-display text-3xl text-primary">Lumina</div>
          <div className="text-sm text-muted-foreground -mt-1 tracking-wide uppercase">
            {t("concierge")}
          </div>
        </div>
      </Link>

      <nav
        aria-label="Primary"
        className="flex items-center gap-2 bg-surface-2/70 p-1.5 rounded-full"
      >
        {NAV.map((item) => {
          const active =
            item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              data-tour={item.tourId}
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            data-tour="accessibility"
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl bg-surface-2 text-foreground hover:bg-surface transition-colors focus:ring-2 focus:ring-primary outline-none ${accessibilityMode !== "default" ? "ring-2 ring-ai" : ""}`}
          >
            <Accessibility
              className={`size-5 ${accessibilityMode !== "default" ? "text-ai" : "text-muted-foreground"}`}
            />
            <span className="font-semibold uppercase">Assist</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 bg-black/95 border-border">
          <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Accessibility
          </div>
          <DropdownMenuItem
            onClick={() => setAccessibilityMode("default")}
            className="text-lg py-3 flex items-center justify-between"
          >
            Standard{" "}
            {accessibilityMode === "default" && <span className="size-2 rounded-full bg-ai" />}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setAccessibilityMode("high-contrast")}
            className="text-lg py-3 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Eye className="size-5" /> High Contrast
            </span>
            {accessibilityMode === "high-contrast" && (
              <span className="size-2 rounded-full bg-ai" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setAccessibilityMode("vision-assist")}
            className="text-lg py-3 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <HandIcon className="size-5" /> Vision Assist
            </span>
            {accessibilityMode === "vision-assist" && (
              <span className="size-2 rounded-full bg-ai" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        onClick={onOpenAlarm}
        className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-surface-2 text-foreground hover:bg-surface transition-colors focus:ring-2 focus:ring-primary outline-none"
        data-focusable
      >
        <Bell className="size-5 text-muted-foreground" />
        <span className="font-semibold uppercase">Smart Home</span>
      </button>

      <div className="w-px h-8 bg-white/10 mx-2" />

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
            <div className="text-lg font-semibold tabular-nums" suppressHydrationWarning>
              {now ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}
            </div>
            <div className="text-xs text-muted-foreground">22°C · Clear</div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-surface-2 text-foreground hover:bg-surface transition-colors focus:ring-2 focus:ring-primary outline-none">
              <Languages className="size-5 text-muted-foreground" />
              <span className="font-semibold uppercase">{language}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-black/95 border-border">
            <DropdownMenuItem onClick={() => setLanguage("eng")} className="text-lg py-3">
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("fr")} className="text-lg py-3">
              Français
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("it")} className="text-lg py-3">
              Italiano
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("esp")} className="text-lg py-3">
              Español
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setLanguage("arab")}
              className="text-lg py-3 text-right w-full block"
            >
              العربية
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("russe")} className="text-lg py-3">
              Русский
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
