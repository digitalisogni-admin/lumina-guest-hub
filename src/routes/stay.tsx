import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  CalendarDays,
  CreditCard,
  ChevronRight,
  Check,
  MapIcon,
  Moon,
  MapPin,
  X,
  QrCode,
  Star,
  Receipt,
  ArrowRight,
  ShieldCheck,
  DoorOpen,
  Plane,
  BedDouble,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import { useGuest } from "@/context/GuestContext";
import { SISTER_PROPERTIES } from "@/lib/mockData";
import { TooltipBubble } from "@/components/ui/TooltipBubble";
import { BookingCalendarModal } from "@/components/ui/BookingCalendarModal";
import { CheckoutModal as PortfolioCheckoutModal } from "@/components/portfolio/CheckoutModal";
import { HotelMapModal } from "@/components/portfolio/HotelMapModal";
import { PillowMenuModal } from "@/components/portfolio/PillowMenuModal";
import { useToast } from "@/components/ui/ToastContext";
import { Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/stay")({
  component: StayHub,
});

function StayHub() {
  const { guest, reservation, stayExtension, setStayExtension, t } = useGuest();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Modals & Panels
  const [isFolioOpen, setIsFolioOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isPillowOpen, setIsPillowOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  // Folio Logic
  const totalNights = reservation.nights + stayExtension;
  const roomTotal = totalNights * reservation.nightlyRate;
  const taxes = Math.round(roomTotal * 0.12);
  const grandTotal = roomTotal + taxes;
  const [rating, setRating] = useState(0);

  const handleCheckout = () => {
    if (rating === 0) {
      showToast("Please leave a rating before checking out.", "error");
      return;
    }
    setIsCheckoutLoading(true);
    setTimeout(() => {
      setIsCheckoutLoading(false);
      setIsCheckoutModalOpen(true);
      setIsFolioOpen(false);
    }, 1500);
  };

  const handleUpdateStay = (nights: number) => {
    setStayExtension(nights);
    showToast(
      nights > 1
        ? t("stay_extended_msg", { nights: String(nights) })
        : t("stay_extended_msg_singular", { nights: String(nights) }),
      "success",
    );
  };

  const checkOutISO = useMemo(() => {
    const d = new Date(reservation.checkOut);
    d.setDate(d.getDate() + stayExtension);
    return d.toISOString().split("T")[0];
  }, [reservation.checkOut, stayExtension]);

  return (
    <div className="relative w-full h-[calc(100vh-140px)] overflow-hidden flex flex-col pt-4">
      {/* ━━━ TOP BAR: Header & Stats ━━━ */}
      <header className="px-12 flex justify-between items-end shrink-0 mb-8">
        <div className="flex items-end gap-6">
          <img src="/images/logo.png" alt="Lumina" className="h-14 mb-1 opacity-90" />
          <div className="w-px h-16 bg-white/10 mb-1" />
          <div>
            <h1 className="text-6xl font-display text-white mb-2">Your Stay</h1>
            <p className="text-2xl text-white/60">
              {guest.salutation} {guest.name} <span className="mx-2 text-white/20">|</span> Room{" "}
              {reservation.room}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 bg-surface/50 backdrop-blur-md p-4 rounded-3xl border border-white/5">
          <div className="flex flex-col items-center px-4">
            <span className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">
              Check-in
            </span>
            <span className="text-lg text-white">{reservation.checkIn}</span>
          </div>
          <ArrowRight className="size-5 text-white/20" />
          <div className="flex flex-col items-center px-4">
            <span className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">
              Check-out
            </span>
            <span className="text-lg text-ai font-semibold">{checkOutISO}</span>
          </div>
          <div className="bg-ai/10 border border-ai/20 px-6 py-3 rounded-xl flex flex-col items-center">
            <span className="text-2xl font-display text-ai">{totalNights}</span>
            <span className="text-xs text-ai font-bold uppercase tracking-wider">Nights</span>
          </div>
        </div>
      </header>

      {/* ━━━ CENTER: Horizontal Carousel ━━━ */}
      <div className="flex-1 flex flex-col justify-center min-h-0 relative">
        <div className="px-12 mb-4 flex items-center justify-between">
          <h2 className="text-xl text-white/70 font-semibold tracking-wide uppercase">
            Explore the Collection
          </h2>
          <div className="flex gap-2">
            {SISTER_PROPERTIES.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === selectedIndex ? "w-8 bg-ai" : "w-3 bg-white/20"}`}
              />
            ))}
          </div>
        </div>

        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex gap-6 px-12">
            {SISTER_PROPERTIES.map((prop, idx) => {
              const isActive = idx === selectedIndex;
              return (
                <div
                  key={prop.id}
                  className={`relative shrink-0 transition-all duration-700 ease-out flex group focus-tv rounded-[40px] border border-white/10 overflow-hidden tv-shadow-2xl bg-surface`}
                  style={{
                    flexBasis: isActive ? "75%" : "20%",
                    height: "400px",
                  }}
                  data-focusable
                  onFocus={() => emblaApi?.scrollTo(idx)}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={prop.image}
                      alt={prop.name}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div
                      className={`absolute inset-0 bg-black transition-opacity duration-700 ${isActive ? "opacity-0" : "opacity-60"}`}
                    />
                  </div>

                  {/* Content (Only fully visible if active) */}
                  <div
                    className={`absolute inset-0 p-10 flex flex-col justify-end transition-opacity duration-500 delay-100 ${isActive ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-ai text-sm font-bold tracking-widest uppercase mb-2">
                          <MapPin className="size-4" /> {prop.location}
                        </div>
                        <h3 className="text-5xl font-display text-white mb-4">{prop.name}</h3>
                        <p className="text-white/80 text-xl max-w-lg">{prop.description}</p>
                      </div>

                      {/* QR Code Block */}
                      <div className="bg-black/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex items-center gap-6 animate-in slide-in-from-bottom-10 fade-in duration-700">
                        <div className="text-right">
                          <div className="text-2xl font-display text-white mb-1">
                            Book Future Stay
                          </div>
                          <div className="text-white/50 text-sm">Scan to send link to phone</div>
                        </div>
                        <div className="bg-white p-3 rounded-2xl">
                          <QrCode className="size-16 text-black" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vertical title for inactive cards */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"}`}
                  >
                    <h3 className="text-3xl font-display text-white -rotate-90 whitespace-nowrap tracking-wider">
                      {prop.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ━━━ BOTTOM: Action Tiles ━━━ */}
      <footer className="px-12 py-8 shrink-0 overflow-x-auto no-scrollbar">
        <div className="flex gap-6 min-w-max pb-4">
          <ActionTile
            icon={Receipt}
            title="View Folio"
            sub="Review bill & Checkout"
            onClick={() => setIsFolioOpen(true)}
            highlight
          />
          <ActionTile
            icon={CalendarDays}
            title="Modify Stay"
            sub="Extend dates"
            onClick={() => setIsCalendarOpen(true)}
          />
          <ActionTile
            icon={MapIcon}
            title="Resort Map"
            sub="Interactive directory"
            onClick={() => setIsMapOpen(true)}
          />
          <ActionTile
            icon={Star}
            title="Activities"
            sub="Daily experience board"
            onClick={() => navigate({ to: "/activities" })}
          />
          <ActionTile
            icon={BedDouble}
            title="Pillow Menu"
            sub="Premium sleep selection"
            onClick={() => setIsPillowOpen(true)}
          />
          <ActionTile
            icon={Sparkles}
            title="Digital Boutique"
            sub="Room delivery items"
            onClick={() => navigate({ to: "/boutique" })}
          />
        </div>
      </footer>

      {/* ━━━ SLIDE-OUT FOLIO PANEL ━━━ */}
      {isFolioOpen && (
        <div className="absolute inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/40 backdrop-blur-sm outline-none cursor-default"
            onClick={() => setIsFolioOpen(false)}
            data-focusable
          />

          {/* Panel */}
          <div className="w-[550px] h-full bg-surface/90 backdrop-blur-3xl border-l border-white/10 tv-shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 relative z-10">
            <div className="p-10 border-b border-white/10 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-ai/20 text-ai grid place-items-center">
                  <ShieldCheck className="size-6" />
                </div>
                <div>
                  <h2 className="font-display text-3xl text-white">Your Folio</h2>
                  <p className="text-white/50 text-sm">Invoice #INV-2401</p>
                </div>
              </div>
              <button
                onClick={() => setIsFolioOpen(false)}
                className="size-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white focus-tv"
                data-focusable
              >
                <X className="size-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar">
              <dl className="space-y-6">
                <FolioRow
                  label={t("room_nights", {
                    count: totalNights,
                    unit: totalNights > 1 ? t("nights_plural") : t("night"),
                  })}
                  value={`$${roomTotal.toLocaleString()}`}
                />
                <FolioRow label={t("taxes_fees")} value={`$${taxes}`} />
                <div className="border-t border-dashed border-white/20 pt-6 mt-6">
                  <div className="flex items-end justify-between">
                    <dt className="text-lg font-semibold text-white/70 uppercase tracking-wider">
                      {t("total")}
                    </dt>
                    <dd className="text-5xl font-display text-white">
                      ${grandTotal.toLocaleString()}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-5">
                <div className="size-12 rounded-xl bg-white/10 text-white grid place-items-center">
                  <CreditCard className="size-6" />
                </div>
                <div>
                  <div className="text-base font-semibold text-white">
                    {t("credit_card_ending", { number: "4421" })}
                  </div>
                  <div className="text-sm text-white/50">{t("charged_on_checkout")}</div>
                </div>
              </div>

              {/* Review Block */}
              <div className="rounded-[24px] bg-white/5 border border-white/10 p-6 text-center">
                <h3 className="text-white font-semibold mb-2">How was your stay?</h3>
                <div className="flex justify-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-2 focus-tv outline-none rounded-full transition-transform hover:scale-110"
                      data-focusable
                    >
                      <Star
                        className={`size-8 transition-colors ${rating >= star ? "fill-ai text-ai drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "fill-transparent text-white/20"}`}
                      />
                    </button>
                  ))}
                </div>

                <TooltipBubble
                  content={rating === 0 ? "Please rate to checkout" : "Complete Express Checkout"}
                >
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckoutLoading || rating === 0}
                    className={`w-full h-16 rounded-2xl font-semibold text-xl flex items-center justify-center gap-2 transition-all focus-tv ${
                      rating === 0
                        ? "bg-surface-2 text-white/30 cursor-not-allowed"
                        : "bg-ai text-white hover:bg-ai/90"
                    }`}
                    data-focusable
                  >
                    {isCheckoutLoading ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : (
                      <>
                        Express Checkout <ChevronRight className="size-5" />
                      </>
                    )}
                  </button>
                </TooltipBubble>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <BookingCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onConfirm={handleUpdateStay}
        currentNights={reservation.nights}
      />
      <HotelMapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
      <PillowMenuModal isOpen={isPillowOpen} onClose={() => setIsPillowOpen(false)} />
      <PortfolioCheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </div>
  );
}

function ActionTile({
  icon: Icon,
  title,
  sub,
  onClick,
  highlight,
}: {
  icon: LucideIcon;
  title: string;
  sub: string;
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group w-full text-left p-6 rounded-[32px] border transition-all focus-tv flex items-center gap-5 tv-shadow ${
        highlight
          ? "bg-ai/10 border-ai/30 hover:bg-ai/20"
          : "bg-surface/50 border-white/5 hover:bg-surface"
      }`}
      data-focusable
    >
      <div
        className={`size-16 rounded-2xl grid place-items-center transition-colors ${highlight ? "bg-ai text-white" : "bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white"}`}
      >
        <Icon className="size-8" />
      </div>
      <div>
        <div className={`text-2xl font-display mb-1 ${highlight ? "text-ai" : "text-white"}`}>
          {title}
        </div>
        <div className="text-sm text-white/50">{sub}</div>
      </div>
    </button>
  );
}

function FolioRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-lg text-white/60">{label}</dt>
      <dd className="text-xl font-medium text-white">{value}</dd>
    </div>
  );
}
