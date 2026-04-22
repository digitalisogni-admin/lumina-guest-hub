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

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function formatLong(iso: string) {
  // Locale-stable formatting for SSR + hydration safety
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
  return `${WEEKDAYS[date.getUTCDay()]}, ${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}`;
}

function WelcomeDashboard() {
  const { guest, reservation } = useGuest();
  const checkOut = formatLong(reservation.checkOut);

  return (
    <div className="max-w-[1820px] mx-auto">
      {/* Ambient hero */}
      <section className="relative mb-10 overflow-hidden rounded-[32px] p-12 bg-gradient-to-br from-surface via-surface to-ai-soft border border-border tv-shadow-lg">
        <div
          aria-hidden
          className="absolute -top-20 -right-20 size-[420px] rounded-full bg-ai/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-10 size-[360px] rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative">
          <p className="text-base text-ai font-semibold tracking-[0.18em] uppercase">
            Good evening
          </p>
          <h1 className="font-display text-6xl text-primary mt-3 leading-tight">
            Welcome back,
            <br />
            <span className="bg-gradient-to-r from-primary to-ai bg-clip-text text-transparent">
              {guest.salutation} {guest.name}.
            </span>
          </h1>
          <p className="text-2xl text-muted-foreground mt-4 max-w-2xl">
            Your suite is ready. Lumina is one click away — voice, text, or quick actions.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-8">
        {/* Room info card */}
        <section
          className="col-span-5 rounded-3xl bg-surface border border-border p-8 tv-shadow-lg"
          aria-labelledby="room-info"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 id="room-info" className="font-display text-3xl text-primary">
                {reservation.room}
              </h2>
              <p className="text-lg text-muted-foreground mt-1">Check-out · {checkOut}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-status-completed/15 text-status-completed text-sm font-semibold">
              <span className="size-2 rounded-full bg-status-completed" /> Active
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <InfoTile icon={Wifi} title="Wi-Fi" body="Aurora-Suite · auto-connected" />
            <InfoTile icon={KeyRound} title="Digital Key" body="Active until checkout" />
          </div>

          {/* QR + Wallet */}
          <div className="mt-8 flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-surface-2 to-ai-soft/40">
            <div className="bg-white p-3 rounded-xl tv-shadow">
              <QRCodeSVG
                value="lumina://key/suite-1204?token=demo"
                size={140}
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
          <div className="flex items-end justify-between mb-5">
            <h2 id="quick-actions" className="font-display text-3xl text-primary">
              Quick actions
            </h2>
            <span className="text-base text-muted-foreground">
              Press <kbd className="px-2 py-0.5 rounded bg-surface-2 text-foreground">⏎</kbd> to
              select
            </span>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {QUICK_ACTIONS.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="min-h-[200px] rounded-3xl bg-surface border border-border tv-shadow p-7 flex flex-col justify-between hover:border-ai/40 hover:-translate-y-0.5 transition-all group relative overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute -top-12 -right-12 size-40 rounded-full bg-ai/0 group-hover:bg-ai/10 blur-2xl transition-colors"
                />
                <div className="size-16 rounded-2xl bg-ai-soft text-ai grid place-items-center group-hover:bg-ai group-hover:text-ai-foreground transition-colors relative">
                  <a.icon className="size-8" />
                </div>
                <div className="relative">
                  <div className="text-2xl font-semibold text-foreground font-display">
                    {a.label}
                  </div>
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
          className="block rounded-3xl bg-gradient-to-r from-primary via-primary to-ai text-primary-foreground p-8 tv-shadow-lg hover:opacity-95 transition-opacity relative overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_80%_30%,white,transparent_55%)]"
          />
          <div className="relative flex items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="size-16 rounded-2xl bg-white/15 backdrop-blur grid place-items-center">
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
