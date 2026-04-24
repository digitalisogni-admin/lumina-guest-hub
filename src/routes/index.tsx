import { createFileRoute, Link } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import {
  UtensilsCrossed,
  Sparkles,
  Wrench,
  Soup,
  CalendarPlus,
  Wifi,
  KeyRound,
  Smartphone,
  ArrowRight,
  SlidersHorizontal,
  Map,
  ShoppingBag,
  CloudSun,
  Award,
  Film,
  Coffee,
  Plane,
  Clock,
  Receipt,
  Info,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/components/ui/ToastContext";
import { useGuest } from "@/context/GuestContext";
import { TooltipBubble } from "@/components/ui/TooltipBubble";
import { HotelMapModal } from "@/components/portfolio/HotelMapModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Welcome · Lumina" },
      {
        name: "description",
        content: "Your in-suite concierge dashboard — digital key, quick actions, and Lumina AI.",
      },
    ],
  }),
  component: WelcomeDashboard,
});

function WelcomeDashboard() {
  const { guest, reservation, t, language } = useGuest();
  const [isMapOpen, setIsMapOpen] = useState(false);

  const { showToast } = useToast();

  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

  const heroGradient =
    timeOfDay === "morning"
      ? "from-amber-500/5 via-transparent to-transparent"
      : timeOfDay === "afternoon"
        ? "from-blue-500/5 via-transparent to-transparent"
        : "from-indigo-500/5 via-transparent to-transparent";

  const greeting =
    timeOfDay === "morning"
      ? t("good_morning")
      : timeOfDay === "afternoon"
        ? t("good_afternoon")
        : t("good_evening");

  const handleMovieMode = () => {
    showToast("Movie Mode Activated: Lights dimmed, curtains closed.", "success");
  };

  const handleMorningRoutine = () => {
    showToast("Morning Routine: Ordered Oat Milk Latte & Avocado Toast.", "success");
  };

  const QUICK_ACTIONS = [
    {
      icon: Coffee,
      label: "Morning Routine",
      hint: "Order your usual",
      onClick: handleMorningRoutine,
    },
    {
      icon: Soup,
      label: guest.preferences?.includes("Vegan") ? "Vegan Dining" : t("room_service"),
      hint: "Curated for you",
      to: "/concierge" as const,
    },
    {
      icon: Film,
      label: "Movie Mode",
      hint: "Dim lights & close curtains",
      onClick: handleMovieMode,
    },
    {
      icon: Map,
      label: "Resort Map",
      hint: "Explore the property",
      onClick: () => setIsMapOpen(true),
    },
    {
      icon: SlidersHorizontal,
      label: t("smart_room"),
      hint: t("curtains_hint"),
      to: "/room" as const,
      tourId: "smart-room",
    },
    {
      icon: CalendarPlus,
      label: t("extend"),
      hint: t("extend_hint"),
      to: "/stay" as const,
      tourId: "stay-hub",
    },
  ];

  const formatLong = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    const date = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
    return date.toLocaleDateString(
      language === "russe"
        ? "ru-RU"
        : language === "esp"
          ? "es-ES"
          : language === "fr"
            ? "fr-FR"
            : language === "it"
              ? "it-IT"
              : language === "arab"
                ? "ar-SA"
                : "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
      },
    );
  };

  const checkOut = formatLong(reservation.checkOut);

  // Mock data for new widgets
  const homeTime = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
  });
  const localTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-[1820px] mx-auto animate-in fade-in duration-1000">
      {/* Ambient hero */}
      <section
        className={`relative mb-6 overflow-hidden rounded-[32px] p-10 bg-gradient-to-br ${heroGradient} border border-white/5 tv-shadow-lg transition-colors duration-1000`}
      >
        <div
          aria-hidden
          className="absolute -top-20 -right-20 size-[420px] rounded-full bg-ai/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-10 size-[360px] rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative">
          <div className="mb-6">
            <img
              src="/images/logo.png"
              alt="Lumina Logo"
              className="h-12 w-auto object-contain opacity-90"
            />
          </div>
          <p className="text-base text-ai font-semibold tracking-[0.18em] uppercase">{greeting}</p>
          <h1 className="font-display text-5xl text-primary mt-2 leading-tight">
            {t("welcome_back")},{" "}
            <span className="bg-gradient-to-r from-primary to-ai bg-clip-text text-transparent">
              {guest.salutation} {guest.name}.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mt-2 max-w-2xl">{t("hero_subtitle")}</p>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Guest Info, Loyalty, Weather */}
        <section className="col-span-4 flex flex-col gap-6" aria-labelledby="room-info">
          {/* Room info card */}
          <div className="rounded-[32px] bg-surface border border-border p-8 tv-shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <h2
                  id="room-info"
                  className="font-display text-2xl text-primary flex items-center gap-4"
                >
                  {reservation.room}
                  <span className="text-xs font-sans font-medium text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">
                    <Clock className="size-3 inline mr-1" /> Home (NY): {homeTime}
                  </span>
                </h2>
                <p className="text-base text-muted-foreground mt-1">
                  {t("checkout_date")} · {checkOut}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-status-completed/15 text-status-completed text-sm font-semibold">
                <span className="size-2 rounded-full bg-status-completed" /> {t("active")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InfoTile icon={Wifi} title="Wi-Fi" body={t("wifi_body")} />
            <InfoTile icon={KeyRound} title={t("digital_key")} body={t("digital_key_body")} />
          </div>

          {/* Weather Widget */}
          <div className="rounded-[32px] bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-white/10 p-8 tv-shadow-lg flex items-center justify-between group relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?w=800&q=80')] opacity-20 mix-blend-overlay bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
            <div className="relative z-10 flex items-center gap-6">
              <CloudSun className="size-16 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
              <div>
                <div className="text-4xl font-display text-white">24°C</div>
                <div className="text-lg text-white/70">Sunny & Clear</div>
              </div>
            </div>
            <div className="relative z-10 text-right">
              <div className="text-sm text-white/50 uppercase tracking-widest font-bold mb-1">
                Forecast
              </div>
              <div className="text-base text-white/90">Perfect beach day</div>
            </div>
          </div>

          {/* Loyalty Widget */}
          <div
            className="rounded-[32px] bg-gradient-to-r from-ai to-ai-soft/50 border border-ai/20 p-8 tv-shadow-lg flex items-center gap-6 relative overflow-hidden group hover:border-ai/50 transition-colors cursor-pointer"
            data-focusable
          >
            <div className="absolute top-0 right-0 size-64 bg-white/10 blur-[80px] rounded-full mix-blend-overlay" />
            <div className="size-16 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shrink-0">
              <Award className="size-8 text-white drop-shadow-md" />
            </div>
            <div className="flex-1 relative z-10">
              <div className="flex justify-between items-end mb-2">
                <div className="text-sm text-white/70 uppercase tracking-widest font-bold">
                  {guest.loyaltyTier}
                </div>
                <div className="text-2xl font-display text-white">
                  {guest.points?.toLocaleString() ?? 0} pts
                </div>
              </div>
              <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full w-[70%]" />
              </div>
              <div className="text-sm text-white/50 mt-2">2,550 pts to Obsidian Tier</div>
            </div>
          </div>

          {/* Service Tracker & Folio */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[24px] bg-surface-2 border border-border p-6 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-ai mb-2">
                <CheckCircle2 className="size-5" />
                <span className="font-semibold text-sm uppercase tracking-wider">
                  Service Tracker
                </span>
              </div>
              <div className="text-white text-lg font-medium">In-Room Dining</div>
              <div className="text-white/50 text-sm">Arriving in 12 mins</div>
              <div className="h-1.5 w-full bg-black/30 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-ai rounded-full w-[75%] animate-pulse" />
              </div>
            </div>

            <div className="rounded-[24px] bg-surface-2 border border-border p-6 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-white/50 mb-2">
                <Receipt className="size-5" />
                <span className="font-semibold text-sm uppercase tracking-wider">Live Folio</span>
              </div>
              <div className="text-3xl font-display text-white">
                $1,240<span className="text-lg text-white/40">.00</span>
              </div>
              <div className="text-white/50 text-sm mt-1">Current balance</div>
            </div>
          </div>

          {/* Flight Status */}
          <div className="rounded-[24px] bg-gradient-to-r from-[#0f172a] to-[#1e293b] border border-white/5 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-white/10 flex items-center justify-center">
                <Plane className="size-6 text-white/70" />
              </div>
              <div>
                <div className="text-white font-semibold">Flight AF123 to CDG</div>
                <div className="text-emerald-400 text-sm">On Time · Departs 4:30 PM</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Gate</div>
              <div className="text-white text-xl font-display">B14</div>
            </div>
          </div>

          {/* Concierge Tip */}
          <div className="rounded-[24px] bg-ai/5 border border-ai/20 p-5 flex items-start gap-4">
            <Info className="size-5 text-ai shrink-0 mt-0.5" />
            <p className="text-sm text-white/80 leading-relaxed">
              <strong className="text-white">Did you know?</strong> Your Platinum status includes
              complimentary sunset cocktails at the Horizon Lounge starting at 5 PM.
            </p>
          </div>
        </section>

        {/* Quick action grid */}
        <section className="col-span-8 flex flex-col" aria-labelledby="quick-actions">
          <div className="flex items-end justify-between mb-4">
            <h2 id="quick-actions" className="font-display text-2xl text-primary">
              {t("quick_actions")}
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {QUICK_ACTIONS.map((a) => (
              <TooltipBubble key={a.label} content={a.hint}>
                {a.to ? (
                  <Link
                    to={a.to}
                    className="min-h-[160px] rounded-[24px] bg-surface border border-white/5 tv-shadow p-6 flex flex-col justify-between hover:border-ai/40 hover:-translate-y-0.5 transition-all group relative overflow-hidden"
                    data-tour={a.tourId}
                    data-focusable
                  >
                    <div
                      aria-hidden
                      className="absolute -top-12 -right-12 size-40 rounded-full bg-ai/0 group-hover:bg-ai/10 blur-2xl transition-colors"
                    />
                    <div className="size-12 rounded-xl bg-ai-soft text-ai grid place-items-center group-hover:bg-ai group-hover:text-ai-foreground transition-colors relative">
                      <a.icon className="size-6" />
                    </div>
                    <div className="relative">
                      <div className="text-xl font-semibold text-foreground font-display">
                        {a.label}
                      </div>
                      <div className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                        {a.hint}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={a.onClick}
                    className="min-h-[160px] w-full rounded-[24px] bg-surface border border-white/5 tv-shadow p-6 flex flex-col justify-between hover:border-ai/40 hover:-translate-y-0.5 transition-all group relative overflow-hidden text-left"
                    data-tour={a.tourId}
                    data-focusable
                  >
                    <div
                      aria-hidden
                      className="absolute -top-12 -right-12 size-40 rounded-full bg-ai/0 group-hover:bg-ai/10 blur-2xl transition-colors"
                    />
                    <div className="size-12 rounded-xl bg-ai-soft text-ai grid place-items-center group-hover:bg-ai group-hover:text-ai-foreground transition-colors relative">
                      <a.icon className="size-6" />
                    </div>
                    <div className="relative">
                      <div className="text-xl font-semibold text-foreground font-display">
                        {a.label}
                      </div>
                      <div className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                        {a.hint}
                      </div>
                    </div>
                  </button>
                )}
              </TooltipBubble>
            ))}
          </div>

          {/* QR + Wallet moved here */}
          <div className="mt-auto pt-6">
            <div className="flex items-center gap-6 p-6 rounded-[32px] bg-gradient-to-br from-surface-2 to-ai-soft/40 border border-white/5 tv-shadow group">
              <div className="bg-white p-4 rounded-2xl tv-shadow relative overflow-hidden">
                <div className="absolute inset-0 bg-ai/20 animate-pulse mix-blend-overlay" />
                <QRCodeSVG
                  value="lumina://key/suite-1204?token=demo"
                  size={120}
                  bgColor="#FFFFFF"
                  fgColor="#0F172A"
                  level="M"
                />
              </div>
              <div className="flex-1">
                <div className="text-2xl font-display text-foreground mb-1">
                  {t("digital_key_title")}
                </div>
                <p className="text-lg text-muted-foreground mb-4">{t("digital_key_desc")}</p>
                <div className="flex gap-4">
                  <TooltipBubble content={t("apple_wallet_tooltip")}>
                    <button
                      type="button"
                      className="min-h-[56px] px-6 rounded-2xl bg-primary text-primary-foreground font-semibold text-base inline-flex items-center gap-3 hover:bg-primary/90 transition-all focus-tv outline-none"
                      data-focusable
                    >
                      <Smartphone className="size-5" /> {t("apple_wallet")}
                    </button>
                  </TooltipBubble>
                  <TooltipBubble content={t("google_wallet_tooltip")}>
                    <button
                      type="button"
                      className="min-h-[56px] px-6 rounded-2xl bg-surface border-2 border-border text-foreground font-semibold text-base inline-flex items-center gap-3 hover:bg-surface-2 transition-all focus-tv outline-none"
                      data-focusable
                    >
                      <Smartphone className="size-5" /> {t("google_wallet")}
                    </button>
                  </TooltipBubble>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Talk to Lumina rail */}
      <section className="mt-10">
        <Link
          to="/concierge"
          data-tour="concierge-rail"
          className="block rounded-3xl bg-gradient-to-r from-primary via-primary to-ai text-primary-foreground p-8 tv-shadow-lg hover:opacity-95 transition-opacity relative overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_80%_30%,white,transparent_55%)]"
          />
          <div className="relative flex items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="size-16 rounded-2xl bg-white/15 backdrop-blur grid place-items-center">
                <img src="/images/logo.png" alt="" className="size-10 object-contain" />
              </div>
              <div>
                <div className="font-display text-3xl">{t("talk_to_lumina")}</div>
                <p className="text-lg text-primary-foreground/80 mt-1">{t("lumina_promo_desc")}</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-xl font-semibold">
              {t("open_concierge")} <ArrowRight className="size-6" />
            </div>
          </div>
        </Link>
      </section>
      <HotelMapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </div>
  );
}

function InfoTile({ icon: Icon, title, body }: { icon: typeof Wifi; title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-surface-2 p-5">
      <div className="flex items-center gap-3 text-ai">
        <Icon className="size-6" />
        <div className="text-base font-semibold text-foreground">{title}</div>
      </div>
      <p className="text-base text-muted-foreground mt-2">{body}</p>
    </div>
  );
}
