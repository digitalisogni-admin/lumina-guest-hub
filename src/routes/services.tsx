import { createFileRoute, Link } from "@tanstack/react-router";
import { useServices } from "@/context/ServiceContext";
import { StatusTracker } from "@/components/ui-cards/StatusTracker";
import { Soup, Sparkles, Wrench, UtensilsCrossed, BedDouble, Car, Bell, ArrowRight } from "lucide-react";
import type { ServiceKind } from "@/lib/types";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services · Lumina" },
      {
        name: "description",
        content: "Live status of your in-flight requests — pending, en route, or completed.",
      },
    ],
  }),
  component: ServicesPage,
});

const ICONS: Record<ServiceKind, typeof Soup> = {
  "room-service": Soup,
  spa: Sparkles,
  maintenance: Wrench,
  dining: UtensilsCrossed,
  housekeeping: BedDouble,
  transport: Car,
  other: Bell,
};

function ServicesPage() {
  const { requests } = useServices();
  const active = requests.filter((r) => r.status !== "completed");
  const done = requests.filter((r) => r.status === "completed");

  return (
    <div className="max-w-[1500px] mx-auto">
      <header className="mb-8">
        <h1 className="font-display text-5xl text-primary">Service Tracker</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Live updates on every request. Status refreshes automatically.
        </p>
      </header>

      {active.length === 0 && done.length === 0 && <EmptyState />}

      {active.length > 0 && (
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-foreground">In progress</h2>
          {active.map((r) => {
            const Icon = ICONS[r.kind];
            return (
              <article
                key={r.id}
                tabIndex={0}
                className="rounded-3xl bg-surface border border-border tv-shadow p-7 grid grid-cols-12 gap-6 items-center"
              >
                <div className="col-span-1">
                  <div className="size-16 rounded-2xl bg-ai-soft text-ai grid place-items-center">
                    <Icon className="size-8" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="text-2xl font-semibold text-foreground font-display">
                    {r.title}
                  </div>
                  {r.detail && (
                    <div className="text-base text-muted-foreground mt-1">{r.detail}</div>
                  )}
                </div>
                <div className="col-span-7">
                  <StatusTracker status={r.status} etaMinutes={r.etaMinutes} compact />
                </div>
              </article>
            );
          })}
        </section>
      )}

      {done.length > 0 && (
        <section className="space-y-5 mt-10">
          <h2 className="text-2xl font-semibold text-foreground">Completed today</h2>
          <div className="grid grid-cols-2 gap-5">
            {done.map((r) => {
              const Icon = ICONS[r.kind];
              return (
                <div
                  key={r.id}
                  className="rounded-3xl bg-surface-2 border border-border p-6 flex items-center gap-5"
                >
                  <div className="size-14 rounded-2xl bg-status-completed/15 text-status-completed grid place-items-center">
                    <Icon className="size-7" />
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-foreground">{r.title}</div>
                    {r.detail && (
                      <div className="text-base text-muted-foreground mt-1">{r.detail}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl bg-surface border border-border tv-shadow p-12 text-center">
      <div className="mx-auto size-20 rounded-3xl bg-ai-soft text-ai grid place-items-center">
        <Bell className="size-10" />
      </div>
      <h2 className="mt-6 font-display text-3xl text-primary">No active requests</h2>
      <p className="text-lg text-muted-foreground mt-2 max-w-xl mx-auto">
        Ask Lumina for room service, spa, or anything else — your requests will appear here in
        real time.
      </p>
      <Link
        to="/concierge"
        className="mt-6 inline-flex items-center gap-2 min-h-[64px] px-6 rounded-2xl bg-primary text-primary-foreground text-lg font-semibold"
      >
        Ask Lumina <ArrowRight className="size-5" />
      </Link>
    </div>
  );
}
