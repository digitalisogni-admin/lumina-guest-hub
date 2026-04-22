import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarDays, CreditCard, ChevronRight, Check } from "lucide-react";
import { useGuest } from "@/context/GuestContext";
import { ADD_ON_SERVICES } from "@/lib/mockData";

export const Route = createFileRoute("/stay")({
  head: () => ({
    meta: [
      { title: "Your Stay · Lumina" },
      {
        name: "description",
        content: "View reservation, modify dates, add services, and complete express checkout.",
      },
    ],
  }),
  component: StayPage,
});

function StayPage() {
  const { guest, reservation } = useGuest();
  const [selected, setSelected] = useState<Set<string>>(new Set(["breakfast"]));
  const [extraNights, setExtraNights] = useState(0);

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  const checkOutDate = useMemo(() => {
    const d = new Date(reservation.checkOut);
    d.setDate(d.getDate() + extraNights);
    return d.toISOString();
  }, [reservation.checkOut, extraNights]);

  const totalNights = reservation.nights + extraNights;
  const roomTotal = totalNights * reservation.nightlyRate;
  const addOnsTotal = ADD_ON_SERVICES.filter((s) => selected.has(s.id)).reduce(
    (sum, s) => sum + s.price,
    0,
  );
  const taxes = Math.round((roomTotal + addOnsTotal) * 0.12);
  const grandTotal = roomTotal + addOnsTotal + taxes;

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-[1500px] mx-auto">
      <header className="mb-8">
        <h1 className="font-display text-5xl text-primary">Your Stay</h1>
        <p className="text-xl text-muted-foreground mt-2">
          {guest.salutation} {guest.name} · {guest.loyaltyTier}
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Reservation summary */}
        <section className="col-span-7 rounded-3xl bg-surface border border-border tv-shadow p-8">
          <h2 className="font-display text-3xl text-primary">Reservation</h2>
          <div className="mt-6 grid grid-cols-3 gap-5">
            <Stat label="Room" value={reservation.room} />
            <Stat label="Guests" value={String(reservation.guests)} />
            <Stat label="Nights" value={String(totalNights)} />
            <Stat label="Check-in" value={fmtDate(reservation.checkIn)} />
            <Stat label="Check-out" value={fmtDate(checkOutDate)} />
            <Stat label="Nightly rate" value={`$${reservation.nightlyRate}`} />
          </div>

          {/* Modify dates */}
          <div className="mt-8 p-6 rounded-2xl bg-surface-2">
            <div className="flex items-center gap-3 text-ai">
              <CalendarDays className="size-6" />
              <div className="text-xl font-semibold text-foreground">Extend your stay</div>
            </div>
            <p className="text-base text-muted-foreground mt-1">
              Add nights — your suite is available through April 30.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[0, 1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setExtraNights(n)}
                  className={[
                    "min-h-[64px] px-6 rounded-2xl text-lg font-semibold border-2",
                    extraNights === n
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-surface text-foreground border-border hover:border-ai/40",
                  ].join(" ")}
                >
                  {n === 0 ? "No change" : `+${n} night${n > 1 ? "s" : ""}`}
                </button>
              ))}
            </div>
          </div>

          {/* Add services */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Add services</h3>
            <div className="space-y-3">
              {ADD_ON_SERVICES.map((s) => {
                const isOn = selected.has(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggle(s.id)}
                    className={[
                      "w-full min-h-[80px] px-6 rounded-2xl flex items-center justify-between gap-4 border-2 transition-colors text-left",
                      isOn
                        ? "bg-ai-soft border-ai/50"
                        : "bg-surface border-border hover:border-ai/30",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={[
                          "size-10 rounded-xl grid place-items-center",
                          isOn ? "bg-ai text-ai-foreground" : "bg-surface-2 text-muted-foreground",
                        ].join(" ")}
                      >
                        {isOn ? <Check className="size-6" /> : <span className="size-3 rounded-full bg-current opacity-40" />}
                      </div>
                      <div className="text-lg font-semibold text-foreground">{s.label}</div>
                    </div>
                    <div className="text-lg font-semibold text-foreground">+${s.price}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Folio / checkout */}
        <aside className="col-span-5 rounded-3xl bg-surface border border-border tv-shadow p-8 h-fit sticky top-8">
          <h2 className="font-display text-3xl text-primary">Folio</h2>

          <dl className="mt-6 space-y-4">
            <Row label={`Room · ${totalNights} night${totalNights > 1 ? "s" : ""}`} value={`$${roomTotal}`} />
            <Row label="Add-on services" value={`$${addOnsTotal}`} />
            <Row label="Taxes & fees (12%)" value={`$${taxes}`} />
            <div className="border-t border-border pt-4 mt-4 flex items-center justify-between">
              <dt className="text-xl font-semibold text-foreground">Total</dt>
              <dd className="text-3xl font-semibold text-primary">${grandTotal}</dd>
            </div>
          </dl>

          <div className="mt-6 p-5 rounded-2xl bg-surface-2 flex items-center gap-3">
            <CreditCard className="size-6 text-ai" />
            <div>
              <div className="text-base font-semibold text-foreground">Visa ending 4421</div>
              <div className="text-sm text-muted-foreground">Charged on checkout</div>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 w-full min-h-[72px] rounded-2xl bg-primary text-primary-foreground font-semibold text-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            Express checkout <ChevronRight className="size-6" />
          </button>
          <p className="text-sm text-muted-foreground text-center mt-3">
            Folio will be emailed instantly. No need to visit the front desk.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-2 p-5">
      <div className="text-sm uppercase tracking-wide text-muted-foreground font-semibold">{label}</div>
      <div className="text-2xl font-semibold text-foreground mt-1 font-display">{value}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-lg text-muted-foreground">{label}</dt>
      <dd className="text-lg font-semibold text-foreground">{value}</dd>
    </div>
  );
}
