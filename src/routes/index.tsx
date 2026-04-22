import { createFileRoute, Link } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
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
} from "lucide-react";
import { useGuest } from "@/context/GuestContext";

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

const QUICK_ACTIONS = [
  { icon: Soup, label: "Room Service", hint: "Order to suite", to: "/concierge" as const },
  { icon: Sparkles, label: "Spa", hint: "Aurora wellness", to: "/concierge" as const },
  { icon: Wrench, label: "Maintenance", hint: "Quick assistance", to: "/concierge" as const },
  { icon: UtensilsCrossed, label: "Dining", hint: "Reserve a table", to: "/concierge" as const },
  { icon: CalendarPlus, label: "Extend Stay", hint: "Modify dates", to: "/stay" as const },
];

function WelcomeDashboard() {
  const { guest, reservation } = useGuest();
  const checkOut = new Date(reservation.checkOut).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-[1820px] mx-auto">
      {/* Hero greeting */}
      <section className="mb-10">
        <p className="text-xl text-ai font-medium tracking-wide uppercase">Good evening</p>
        <h1 className="font-display text-6xl text-primary mt-2">
          Welcome back, {guest.salutation} {guest.name}.
        </h1>
        <p className="text-2xl text-muted-foreground mt-3">
          Your suite is ready. How may Lumina assist you tonight?
        </p>
      </section>

      <div className="grid grid-cols-12 gap-8">
        {/* Room info card */}
        <section
          className="col-span-5 rounded-3xl bg-surface border border-border p-8 tv-shadow-lg"
          aria-labelledby="room-info"
        >
          <h2 id="room-info" className="font-display text-3xl text-primary">
            {reservation.room}
          </h2>
          <p className="text-lg text-muted-foreground mt-1">Check-out · {checkOut}</p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <InfoTile icon={Wifi} title="Wi-Fi" body="Aurora-Suite · auto-connected" />
            <InfoTile icon={KeyRound} title="Digital Key" body="Active until checkout" />
          </div>

          {/* QR + Wallet */}
          <div className="mt-8 flex items-center gap-6 p-6 rounded-2xl bg-surface-2">
            <div className="bg-white p-3 rounded-xl">
              <QRCodeSVG
                value="lumina://key/suite-1204?token=demo"
                size={148}
                bgColor="#FFFFFF"
                fgColor="#0F172A"
                level="M"
              />
            </div>
            <div className="flex-1">
              <div className="text-xl font-semibold text-foreground">Your Digital Key</div>
              <p className="text-base text-muted-foreground mt-1">
                Scan to unlock, or add to your phone wallet for tap-to-enter.
              </p>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  className="min-h-[56px] px-5 rounded-2xl bg-primary text-primary-foreground font-semibold text-base inline-flex items-center gap-2"
                >
                  <Smartphone className="size-5" /> Apple Wallet
                </button>
                <button
                  type="button"
                  className="min-h-[56px] px-5 rounded-2xl bg-surface border-2 border-border text-foreground font-semibold text-base inline-flex items-center gap-2"
                >
                  <Smartphone className="size-5" /> Google Wallet
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick action grid */}
        <section className="col-span-7" aria-labelledby="quick-actions">
          <h2 id="quick-actions" className="font-display text-3xl text-primary mb-5">
            Quick actions
          </h2>
          <div className="grid grid-cols-3 gap-5">
            {QUICK_ACTIONS.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="min-h-[200px] rounded-3xl bg-surface border border-border tv-shadow p-7 flex flex-col justify-between hover:border-ai/40 transition-colors group"
              >
                <div className="size-16 rounded-2xl bg-ai-soft text-ai grid place-items-center group-hover:bg-ai group-hover:text-ai-foreground transition-colors">
                  <a.icon className="size-8" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-foreground font-display">{a.label}</div>
                  <div className="text-base text-muted-foreground mt-1">{a.hint}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Talk to Lumina rail */}
      <section className="mt-10">
        <Link
          to="/concierge"
          className="block rounded-3xl bg-gradient-to-r from-primary via-primary to-ai text-primary-foreground p-8 tv-shadow-lg hover:opacity-95 transition-opacity"
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="size-16 rounded-2xl bg-white/15 grid place-items-center">
                <Sparkles className="size-8" />
              </div>
              <div>
                <div className="font-display text-3xl">Talk to Lumina</div>
                <p className="text-lg text-primary-foreground/80 mt-1">
                  Voice or text — anything from dinner to a spa booking.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-xl font-semibold">
              Open concierge <ArrowRight className="size-6" />
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}

function InfoTile({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Wifi;
  title: string;
  body: string;
}) {
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
