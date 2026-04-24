import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServices } from "@/context/ServiceContext";
import { useToast } from "@/components/ui/ToastContext";
import { StatusTracker } from "@/components/ui-cards/StatusTracker";
import { TooltipBubble } from "@/components/ui/TooltipBubble";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { MenuModal } from "@/components/ui/MenuModal";
import {
  Soup,
  Sparkles,
  Wrench,
  UtensilsCrossed,
  BedDouble,
  Car,
  Bell,
  ArrowRight,
  Waves,
  Map,
  Gift,
  Clock,
  CalendarDays,
  Coffee,
  Wine,
  Palmtree,
  ShoppingBag,
} from "lucide-react";
import type { ServiceKind } from "@/lib/types";
import { useGuest } from "@/context/GuestContext";
import { ExcursionDetailModal } from "@/components/ui/ExcursionDetailModal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [{ title: "Services · Lumina" }],
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

type TabId = "tracker" | "dining" | "pools" | "excursions" | "offers" | "boutique";

function ServicesPage() {
  const [activeTab, setActiveTab] = useState<TabId>("tracker");
  const { t } = useGuest();

  return (
    <div className="max-w-[1700px] mx-auto h-[calc(100vh-200px)] flex gap-10 mt-4">
      {/* Left Sidebar Navigation */}
      <nav className="w-80 shrink-0 flex flex-col gap-3" aria-label="Services Menu" role="tablist">
        <TabButton
          id="tracker"
          active={activeTab}
          onClick={setActiveTab}
          icon={Bell}
          label={t("active")}
        />
        <TabButton
          id="dining"
          active={activeTab}
          onClick={setActiveTab}
          icon={UtensilsCrossed}
          label={t("dining")}
        />
        <TabButton
          id="pools"
          active={activeTab}
          onClick={setActiveTab}
          icon={Waves}
          label={t("spa")}
        />
        <TabButton
          id="excursions"
          active={activeTab}
          onClick={setActiveTab}
          icon={Map}
          label={t("services")}
        />
        <TabButton
          id="boutique"
          active={activeTab}
          onClick={setActiveTab}
          icon={ShoppingBag}
          label="Boutique"
        />
        <TabButton
          id="offers"
          active={activeTab}
          onClick={setActiveTab}
          icon={Gift}
          label={t("fidelity")}
        />
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide pr-4 pb-12">
        {activeTab === "tracker" && <TrackerTab />}
        {activeTab === "dining" && <DiningTab />}
        {activeTab === "pools" && <PoolsTab />}
        {activeTab === "excursions" && <ExcursionsTab />}
        {activeTab === "boutique" && <BoutiqueTab />}
        {activeTab === "offers" && <OffersTab />}
      </main>
    </div>
  );
}

function TabButton({
  id,
  active,
  onClick,
  icon: Icon,
  label,
}: {
  id: TabId;
  active: TabId;
  onClick: (id: TabId) => void;
  icon: any;
  label: string;
}) {
  const isActive = active === id;
  const { t } = useGuest();
  return (
    <TooltipBubble content={`${t("open_concierge")} ${label}`}>
      <button
        onClick={() => onClick(id)}
        role="tab"
        aria-selected={isActive}
        className={`flex items-center gap-4 w-[320px] p-5 rounded-2xl transition-all focus-tv outline-none ${
          isActive
            ? "bg-white text-black tv-shadow-lg scale-105 z-10"
            : "bg-surface text-muted-foreground hover:bg-white/10 hover:text-white"
        }`}
        data-focusable
      >
        <Icon className={`size-7 ${isActive ? "text-black" : "text-white/50"}`} />
        <span className="text-xl font-semibold">{label}</span>
      </button>
    </TooltipBubble>
  );
}

// --- Tabs Implementation ---

function TrackerTab() {
  const { requests } = useServices();
  const { t } = useGuest();
  const active = requests.filter((r) => r.status !== "completed");
  const done = requests.filter((r) => r.status === "completed");

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
      <header>
        <h1 className="font-display text-5xl text-white">{t("tracker_title")}</h1>
        <p className="text-xl text-muted-foreground mt-2">{t("tracker_subtitle")}</p>
      </header>

      {active.length === 0 && done.length === 0 && <EmptyState />}

      {active.length > 0 && (
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-white">{t("in_progress")}</h2>
          {active.map((r) => {
            const Icon = ICONS[r.kind] || Bell;
            return (
              <article
                key={r.id}
                className="rounded-3xl bg-surface border border-white/5 tv-shadow p-7 grid grid-cols-12 gap-6 items-center focus-tv outline-none"
                tabIndex={0}
                data-focusable
              >
                <div className="col-span-1">
                  <div className="size-16 rounded-2xl bg-ai/10 text-ai grid place-items-center">
                    <Icon className="size-8" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="text-2xl font-semibold text-white font-display">{r.title}</div>
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
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-white">{t("completed_today")}</h2>
          <div className="grid grid-cols-2 gap-5">
            {done.map((r) => {
              const Icon = ICONS[r.kind] || Bell;
              return (
                <div
                  key={r.id}
                  className="rounded-3xl bg-surface-2 border border-white/5 p-6 flex items-center gap-5 focus-tv outline-none"
                  tabIndex={0}
                  data-focusable
                >
                  <div className="size-14 rounded-2xl bg-status-completed/10 text-status-completed grid place-items-center">
                    <Icon className="size-7" />
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-white">{r.title}</div>
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

function DiningTab() {
  const { createRequest } = useServices();
  const { showToast } = useToast();
  const { t } = useGuest();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVenue, setActiveVenue] = useState("");
  const [activeAction, setActiveAction] = useState("");

  const handleBook = (venue: string, action: string) => {
    setActiveVenue(venue);
    setActiveAction(action);
    setConfirmOpen(true);
  };

  const handleViewMenu = (venue: string) => {
    setActiveVenue(venue);
    setMenuOpen(true);
  };

  const confirmBooking = () => {
    createRequest({ kind: "dining", title: activeAction, detail: activeVenue, etaMinutes: 0 });
    showToast(t("confirmed_for", { action: activeAction, venue: activeVenue }));
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <header>
        <h1 className="font-display text-5xl text-white">{t("dining_title")}</h1>
        <p className="text-xl text-muted-foreground mt-2">{t("dining_subtitle")}</p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {/* Main Restaurant */}
        <div className="rounded-3xl bg-surface border border-white/5 overflow-hidden group">
          <div className="h-48 bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center" />
          <div className="p-8 relative">
            <div className="absolute -top-8 right-8 size-16 bg-primary text-primary-foreground rounded-2xl grid place-items-center shadow-xl">
              <UtensilsCrossed className="size-8" />
            </div>
            <h3 className="text-3xl font-display text-white mb-2">L'Horizon</h3>
            <p className="text-muted-foreground mb-6">
              Mediterranean fine dining with panoramic ocean views. Experience our chef's signature
              tasting menu.
            </p>
            <div className="flex gap-4">
              <TooltipBubble content={t("book_table")}>
                <button
                  onClick={() => handleBook("L'Horizon", t("book_table"))}
                  className="flex-1 py-3 px-6 rounded-xl bg-white text-black font-semibold focus-tv outline-none"
                  data-focusable
                >
                  {t("book_table")}
                </button>
              </TooltipBubble>
              <TooltipBubble content={t("view_menu")}>
                <button
                  onClick={() => handleViewMenu("L'Horizon")}
                  className="flex-1 py-3 px-6 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition focus-tv outline-none"
                  data-focusable
                >
                  {t("view_menu")}
                </button>
              </TooltipBubble>
            </div>
          </div>
        </div>

        {/* Lounge Bar */}
        <div className="rounded-3xl bg-surface border border-white/5 overflow-hidden group">
          <div className="h-48 bg-[url('https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center" />
          <div className="p-8 relative">
            <div className="absolute -top-8 right-8 size-16 bg-primary text-primary-foreground rounded-2xl grid place-items-center shadow-xl">
              <Wine className="size-8" />
            </div>
            <h3 className="text-3xl font-display text-white mb-2">The Obsidian Bar</h3>
            <p className="text-muted-foreground mb-6">
              Craft cocktails, rare spirits, and live jazz every evening in a moody, sophisticated
              setting.
            </p>
            <div className="flex gap-4">
              <TooltipBubble content={t("reserve_seats")}>
                <button
                  onClick={() => handleBook("The Obsidian Bar", t("reserve_seats"))}
                  className="flex-1 py-3 px-6 rounded-xl bg-white text-black font-semibold focus-tv outline-none"
                  data-focusable
                >
                  {t("reserve_seats")}
                </button>
              </TooltipBubble>
              <TooltipBubble content={t("view_drinks")}>
                <button
                  onClick={() => handleViewMenu("The Obsidian Bar")}
                  className="flex-1 py-3 px-6 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition focus-tv outline-none"
                  data-focusable
                >
                  {t("view_drinks")}
                </button>
              </TooltipBubble>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmBooking}
        title={t("confirm_reservation")}
        description={t("confirm_reservation_desc")
          .replace("{action}", activeAction.toLowerCase())
          .replace("{venue}", activeVenue)}
        confirmText={t("confirm_booking")}
      />
      <MenuModal
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        restaurantName={activeVenue}
      />
    </div>
  );
}

function PoolsTab() {
  const { createRequest } = useServices();
  const { showToast } = useToast();
  const { t } = useGuest();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleBook = () => {
    createRequest({
      kind: "spa",
      title: t("book_treatment"),
      detail: t("aurora_spa_treatment"),
      etaMinutes: 30,
    });
    showToast(t("spa_booking_desc"));
    setConfirmOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <header>
        <h1 className="font-display text-5xl text-white">{t("pools_title")}</h1>
        <p className="text-xl text-muted-foreground mt-2">{t("pools_subtitle")}</p>
      </header>

      <div className="grid grid-cols-3 gap-6">
        <div
          className="rounded-3xl bg-surface border border-white/5 p-6 focus-tv outline-none"
          tabIndex={0}
          data-focusable
        >
          <Waves className="size-10 text-ai mb-4" />
          <h3 className="text-2xl font-display text-white mb-2">{t("infinity_pool")}</h3>
          <p className="text-muted-foreground mb-4">{t("infinity_pool_desc")}</p>
          <div className="flex items-center gap-2 text-sm text-white/70 bg-white/5 px-3 py-2 rounded-lg inline-flex">
            <Clock className="size-4" /> 07:00 AM - 10:00 PM
          </div>
        </div>

        <div
          className="rounded-3xl bg-surface border border-white/5 p-6 focus-tv outline-none"
          tabIndex={0}
          data-focusable
        >
          <Palmtree className="size-10 text-ai mb-4" />
          <h3 className="text-2xl font-display text-white mb-2">{t("lagoon_oasis")}</h3>
          <p className="text-muted-foreground mb-4">{t("lagoon_oasis_desc")}</p>
          <div className="flex items-center gap-2 text-sm text-white/70 bg-white/5 px-3 py-2 rounded-lg inline-flex">
            <Clock className="size-4" /> 08:00 AM - 08:00 PM
          </div>
        </div>

        <div
          className="rounded-3xl bg-surface border border-white/5 p-6 flex flex-col focus-tv outline-none"
          tabIndex={0}
          data-focusable
        >
          <Sparkles className="size-10 text-ai mb-4" />
          <h3 className="text-2xl font-display text-white mb-2">{t("aurora_spa")}</h3>
          <p className="text-muted-foreground mb-4 flex-1">{t("aurora_spa_desc")}</p>
          <TooltipBubble content={t("book_treatment")}>
            <button
              onClick={() => setConfirmOpen(true)}
              className="w-full py-3 rounded-xl bg-white text-black font-semibold mt-auto focus-tv outline-none"
              data-focusable
            >
              {t("book_treatment")}
            </button>
          </TooltipBubble>
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleBook}
        title={t("spa_booking_confirm")}
        description={t("spa_booking_desc")}
        confirmText={t("confirm_booking")}
      />
    </div>
  );
}

function ExcursionsTab() {
  const { t } = useGuest();
  const [selectedExcursion, setSelectedExcursion] = useState<{
    title: string;
    image: string;
    price: string;
  } | null>(null);

  const EXCURSIONS = [
    {
      title: "Private Yacht Charter",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=500",
      price: "$450",
    },
    {
      title: "Mountain Summit Hike",
      image:
        "https://images.unsplash.com/photo-1518182170546-076616fdcbde?auto=format&fit=crop&q=80&w=500",
      price: "$85",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <header>
        <h1 className="font-display text-5xl text-white">{t("services")}</h1>
        <p className="text-xl text-muted-foreground mt-2">{t("excursions_subtitle")}</p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {EXCURSIONS.map((excursion) => (
          <div
            key={excursion.title}
            className="rounded-3xl bg-surface border border-white/5 overflow-hidden flex focus-tv outline-none"
            tabIndex={0}
            data-focusable
          >
            <div
              className="w-1/3 bg-cover bg-center"
              style={{ backgroundImage: `url(${excursion.image})` }}
            />
            <div className="p-6 w-2/3 flex flex-col justify-center">
              <h3 className="text-2xl font-display text-white mb-2">{excursion.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {t("excursion_generic_desc")}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg text-white font-semibold">
                  {t("from_price").replace("{price}", excursion.price)}
                </span>
                <TooltipBubble content={t("details")}>
                  <button
                    onClick={() => setSelectedExcursion(excursion)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition focus-tv outline-none"
                    data-focusable
                  >
                    {t("details")}
                  </button>
                </TooltipBubble>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ExcursionDetailModal
        isOpen={!!selectedExcursion}
        onClose={() => setSelectedExcursion(null)}
        excursion={selectedExcursion}
      />
    </div>
  );
}

function OffersTab() {
  const { createRequest } = useServices();
  const { showToast } = useToast();
  const { t } = useGuest();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClaim = () => {
    createRequest({
      kind: "spa",
      title: t("claimed_upgrade"),
      detail: t("complimentary_spa_upgrade"),
      etaMinutes: 15,
    });
    showToast(t("claim_offer_desc"));
    setConfirmOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <header>
        <h1 className="font-display text-5xl text-white">{t("offers_title")}</h1>
        <p className="text-xl text-muted-foreground mt-2">{t("offers_subtitle")}</p>
      </header>

      <div
        className="rounded-3xl bg-gradient-to-br from-ai/20 to-ai/5 border border-ai/20 p-10 relative overflow-hidden focus-tv outline-none"
        tabIndex={0}
        data-focusable
      >
        <div className="absolute top-0 right-0 p-8">
          <Gift className="size-32 text-ai opacity-20" />
        </div>
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai/20 text-ai text-sm font-semibold mb-6">
            <Sparkles className="size-4" /> {t("exclusive_offer")}
          </div>
          <h3 className="text-4xl font-display text-white mb-4">{t("spa_upgrade_title")}</h3>
          <p className="text-xl text-white/70 mb-8">{t("spa_upgrade_desc")}</p>
          <TooltipBubble content={t("claim_offer")}>
            <button
              onClick={() => setConfirmOpen(true)}
              className="px-8 py-4 rounded-xl bg-white text-black font-semibold text-lg hover:scale-105 transition-transform focus-tv outline-none"
              data-focusable
            >
              {t("claim_offer")}
            </button>
          </TooltipBubble>
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleClaim}
        title={t("claim_offer_confirm")}
        description={t("claim_offer_desc")}
        confirmText={t("claim_offer")}
      />
    </div>
  );
}

function BoutiqueTab() {
  const { t } = useGuest();
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <header>
        <h1 className="font-display text-5xl text-white">Digital Boutique</h1>
        <p className="text-xl text-muted-foreground mt-2">Luxury items delivered to your suite.</p>
      </header>

      <div
        className="rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-white/10 p-10 relative overflow-hidden focus-tv outline-none"
        tabIndex={0}
        data-focusable
      >
        <div className="absolute top-0 right-0 p-8">
          <ShoppingBag className="size-32 text-primary opacity-20" />
        </div>
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6">
            <Sparkles className="size-4" /> Exclusive Collection
          </div>
          <h3 className="text-4xl font-display text-white mb-4">Lumina Signature Collection</h3>
          <p className="text-xl text-white/70 mb-8">
            From our signature scents to premium Egyptian cotton, bring the Lumina experience home.
          </p>
          <Link
            to="/boutique"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-semibold text-lg hover:scale-105 transition-transform focus-tv outline-none"
            data-focusable
          >
            Shop the Collection <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  const { t } = useGuest();
  return (
    <div className="rounded-3xl bg-surface border border-white/5 tv-shadow p-12 text-center">
      <div className="mx-auto size-20 rounded-3xl bg-ai/10 text-ai grid place-items-center">
        <Bell className="size-10" />
      </div>
      <h2 className="mt-6 font-display text-3xl text-white">{t("no_requests_title")}</h2>
      <p className="text-lg text-muted-foreground mt-2 max-w-xl mx-auto">{t("no_requests_desc")}</p>
      <Link
        to="/concierge"
        className="mt-6 inline-flex items-center gap-2 min-h-[64px] px-6 rounded-2xl bg-white text-black text-lg font-semibold focus-tv outline-none"
        data-focusable
      >
        {t("ask_lumina_btn")} <ArrowRight className="size-5" />
      </Link>
    </div>
  );
}
