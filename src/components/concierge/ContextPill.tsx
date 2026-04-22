import { useGuest } from "@/context/GuestContext";
import { CalendarDays, BedDouble, Heart } from "lucide-react";

// Format reservation dates statically (no locale-dependent rendering on the server)
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmt(iso: string) {
  // Parse as plain Y-M-D so we don't get timezone shifts that cause hydration drift
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[(m ?? 1) - 1]} ${d}`;
}

export function ContextPill() {
  const { guest, reservation } = useGuest();

  return (
    <div
      className="inline-flex items-center gap-3 px-5 py-3.5 rounded-full bg-surface border border-border tv-shadow text-base text-foreground"
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
        <Heart className="size-5 text-ai" /> {guest.preferences.join(" · ")}
      </span>
    </div>
  );
}
