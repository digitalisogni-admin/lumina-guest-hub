import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Clock, MapPin, Star, Users, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/ToastContext";
import { useGuest } from "@/context/GuestContext";
import { useServices } from "@/context/ServiceContext";

interface ExcursionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  excursion: {
    title: string;
    subtitle?: string;
    image?: string;
    price?: string;
  } | null;
}

export function ExcursionDetailModal({ isOpen, onClose, excursion }: ExcursionDetailModalProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { showToast } = useToast();
  const { t } = useGuest();
  const { createRequest } = useServices();

  if (!excursion) return null;

  const handleBook = () => {
    createRequest({
      kind: "other",
      title: excursion.title,
      detail: t("booked_for", { date: date?.toLocaleDateString() || "" }),
      etaMinutes: 60,
    });
    showToast(
      `${t("confirm_booking")}: ${excursion.title} ${t("on")} ${date?.toLocaleDateString()}`,
    );
    onClose();
  };

  const ITINERARY = [
    { time: "09:00 AM", task: t("itinerary_departure") },
    { time: "10:30 AM", task: t("itinerary_arrival") },
    { time: "11:00 AM", task: t("itinerary_tour") },
    { time: "01:00 PM", task: t("itinerary_lunch") },
    { time: "02:30 PM", task: t("itinerary_exploration") },
    { time: "04:30 PM", task: t("itinerary_return") },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1200px] bg-surface/80 backdrop-blur-3xl border-white/10 p-0 overflow-hidden rounded-[40px]">
        <div className="grid grid-cols-12 h-[85vh]">
          {/* Left: Info & Itinerary */}
          <div className="col-span-7 p-12 overflow-y-auto custom-scrollbar">
            <DialogHeader className="mb-8 text-left">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-ai/20 text-ai text-sm font-bold uppercase tracking-widest">
                  {t("featured_excursion")}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="size-4 fill-current" />
                  <Star className="size-4 fill-current" />
                  <Star className="size-4 fill-current" />
                  <Star className="size-4 fill-current" />
                  <Star className="size-4 fill-current" />
                </div>
              </div>
              <DialogTitle className="font-display text-5xl text-primary mb-2">
                {excursion.title}
              </DialogTitle>
              <p className="text-xl text-white/70 leading-relaxed">
                {t("excursion_default_desc").replace("{title}", excursion.title)}
              </p>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-white/5 grid place-items-center border border-white/5">
                  <Clock className="size-6 text-ai" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase font-bold">{t("duration")}</div>
                  <div className="text-lg font-semibold text-white">8 {t("hours")}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-white/5 grid place-items-center border border-white/5">
                  <Users className="size-6 text-ai" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase font-bold">{t("group_size")}</div>
                  <div className="text-lg font-semibold text-white">
                    {t("max_people").replace("{count}", "12")}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-white/5 grid place-items-center border border-white/5">
                  <MapPin className="size-6 text-ai" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase font-bold">{t("meeting_pt")}</div>
                  <div className="text-lg font-semibold text-white">{t("lobby")}</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-display text-2xl text-white border-b border-white/10 pb-2">
                {t("itinerary")}
              </h3>
              <div className="space-y-4">
                {ITINERARY.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="text-ai font-bold min-w-[100px]">{step.time}</div>
                    <div className="text-white/60">{step.task}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Calendar & Booking */}
          <div className="col-span-5 bg-white/5 p-12 border-l border-white/10 flex flex-col">
            <h3 className="font-display text-2xl text-white mb-6">{t("select_date_book")}</h3>

            <div className="flex-1 flex flex-col items-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-3xl border border-white/5 bg-black/20 p-4 w-full"
              />

              <div className="w-full mt-8 space-y-4">
                <div className="flex items-center justify-between p-5 rounded-2xl bg-black/20 border border-white/5">
                  <div className="text-white/60 font-medium">{t("price_per_person")}</div>
                  <div className="text-3xl font-display text-white">
                    {excursion.price || "$120"}
                  </div>
                </div>

                <button
                  onClick={handleBook}
                  className="w-full min-h-[72px] rounded-2xl bg-ai text-white font-bold text-xl flex items-center justify-center gap-2 hover:bg-ai/90 transition-all tv-shadow focus-tv outline-none"
                  data-focusable
                >
                  {t("confirm_booking")} <ChevronRight className="size-6" />
                </button>
                <p className="text-center text-sm text-white/40">{t("folio_charge_desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
