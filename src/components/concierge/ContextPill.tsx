import { useGuest } from "@/context/GuestContext";
import { CalendarDays, BedDouble, Heart } from "lucide-react";

export function ContextPill() {
  const { guest, reservation } = useGuest();
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });

  return (
    <div
      className="inline-flex items-center gap-3 px-4 py-3 rounded-full bg-surface border border-border tv-shadow text-base text-foreground"
      aria-label="Stay context"
    >
      <span className="inline-flex items-center gap-2">
        <BedDouble className="size-5 text-ai" /> {reservation.room}
      </span>
      <span className="size-1.5 rounded-full bg-border" aria-hidden />
      <span className="inline-flex items-center gap-2">
        <CalendarDays className="size-5 text-ai" /> {fmt(reservation.checkIn)} —{" "}
        {fmt(reservation.checkOut)}
      </span>
      <span className="size-1.5 rounded-full bg-border" aria-hidden />
      <span className="inline-flex items-center gap-2">
        <Heart className="size-5 text-ai" /> {guest.preferences.join(", ")}
      </span>
    </div>
  );
}
