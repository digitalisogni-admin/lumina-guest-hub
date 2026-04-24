import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Crown,
  Star,
  Gift,
  Users,
  MapPin,
  ChevronDown,
  ChevronUp,
  History,
  Plane,
  ShieldCheck,
  ArrowRight,
  Clock,
} from "lucide-react";
import { useGuest } from "@/context/GuestContext";
import { MOCK_GUEST } from "@/lib/mockData";

export const Route = createFileRoute("/fidelity")({
  head: () => ({
    meta: [{ title: "Fidelity · Lumina" }],
  }),
  component: FidelityScreen,
});

function FidelityScreen() {
  const { t } = useGuest();
  const [expandedSection, setExpandedSection] = useState<string | null>("dashboard");

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="max-w-[1500px] mx-auto pb-20 animate-in fade-in duration-700">
      {/* Header Profile Area */}
      <header className="flex items-center gap-8 mb-12 mt-12 bg-surface p-10 rounded-[40px] border border-white/5 tv-shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 size-96 bg-ai/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="size-32 rounded-full overflow-hidden border-4 border-ai/30 shadow-[0_0_40px_rgba(var(--ai-rgb),0.3)] shrink-0">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80"
            alt="Guest"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 z-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-5xl font-display text-white">{MOCK_GUEST.name}</h1>
            <div className="px-4 py-1 rounded-full bg-ai/20 border border-ai/40 text-ai text-sm font-bold tracking-widest uppercase flex items-center gap-2">
              <Crown className="size-4" /> {MOCK_GUEST.loyaltyTier}
            </div>
          </div>
          <p className="text-xl text-muted-foreground flex items-center gap-4">
            <span>
              {t("member_since")} {MOCK_GUEST.memberSince}
            </span>
            <span className="size-1.5 rounded-full bg-white/20" />
            <span>
              {MOCK_GUEST.points?.toLocaleString()} {t("available_points")}
            </span>
          </p>
        </div>

        {/* 3D Fidelity Card */}
        <div className="shrink-0 perspective-[1000px] group mr-4">
          <div className="w-[340px] h-[210px] rounded-2xl relative transition-all duration-700 transform-gpu preserve-3d group-hover:rotate-y-180 tv-shadow-2xl cursor-pointer">
            {/* Front */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1a1a24] to-black border border-white/10 overflow-hidden backface-hidden p-6 flex flex-col justify-between">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
              <div className="absolute -inset-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />

              <div className="flex justify-between items-start z-10">
                <Crown className="size-6 text-ai" />
                <span className="text-ai text-xs tracking-widest font-semibold uppercase">
                  Aurora Hotels
                </span>
              </div>
              <div className="z-10">
                <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">
                  {t("cardholder")}
                </p>
                <p className="text-xl text-white font-display tracking-widest uppercase">
                  {MOCK_GUEST.name}
                </p>
              </div>
            </div>
            {/* Back */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0a0a0f] to-[#1a1a24] border border-white/10 overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col justify-between">
              <div className="w-full h-10 bg-black/80 -mx-6 mt-2" />
              <div className="flex-1 flex flex-col justify-center items-center gap-4 mt-4">
                <div className="text-center">
                  <p className="text-white/40 text-[8px] uppercase tracking-widest mb-1">
                    Membership Number
                  </p>
                  <p className="text-white font-display text-lg tracking-[0.2em]">
                    AUR-8829-1104-5592
                  </p>
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <img src="/images/logo.png" className="h-6 opacity-80" alt="Logo" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-full h-8 bg-[url('https://www.creativetacos.com/wp-content/uploads/2023/04/Barcode-Textures-2.jpg')] bg-repeat-x bg-contain opacity-60 invert" />
                <p className="text-white/30 text-[8px] text-center uppercase tracking-[0.1em]">
                  Valid at all Aurora Hotels & Resorts worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Col: Expandable Sections */}
        <div className="col-span-8 space-y-4">
          {/* Points Dashboard */}
          <ExpandableCard
            title="Points Dashboard"
            icon={<Star className="size-6 text-ai" />}
            isExpanded={expandedSection === "dashboard"}
            onToggle={() => toggleSection("dashboard")}
          >
            <div className="p-8 pt-2">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
                    Current Balance
                  </p>
                  <p className="text-6xl font-display text-white">
                    {MOCK_GUEST.points?.toLocaleString()}{" "}
                    <span className="text-2xl text-muted-foreground">pts</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
                    Next Tier: Black
                  </p>
                  <p className="text-xl text-white">2,550 pts needed</p>
                </div>
              </div>

              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden mb-8">
                <div className="h-full bg-gradient-to-r from-ai to-primary w-[80%] rounded-full relative">
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/30" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-surface-2 p-5 rounded-2xl border border-white/5">
                  <p className="text-muted-foreground text-sm mb-1">Earned this stay</p>
                  <p className="text-2xl text-white font-semibold">+1,240 pts</p>
                </div>
                <div className="bg-surface-2 p-5 rounded-2xl border border-white/5">
                  <p className="text-muted-foreground text-sm mb-1">Upcoming Expiration</p>
                  <p className="text-xl text-white font-semibold">None</p>
                </div>
                <button
                  className="bg-ai/10 p-5 rounded-2xl border border-ai/20 text-left hover:bg-ai/20 transition-colors focus-tv outline-none"
                  data-focusable
                >
                  <p className="text-ai text-sm mb-1">Quick Action</p>
                  <p className="text-lg text-white font-semibold flex items-center gap-2">
                    Redeem Points <ArrowRight className="size-4" />
                  </p>
                </button>
              </div>
            </div>
          </ExpandableCard>

          {/* Rewards Catalog */}
          <ExpandableCard
            title="Rewards Catalog"
            icon={<Gift className="size-6 text-ai" />}
            isExpanded={expandedSection === "rewards"}
            onToggle={() => toggleSection("rewards")}
          >
            <div className="p-8 pt-2 grid grid-cols-2 gap-6">
              <RewardItem
                title="Suite Upgrade"
                pts="10,000"
                image="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80"
                canAfford
              />
              <RewardItem
                title="Spa Treatment (90m)"
                pts="8,500"
                image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80"
                canAfford
              />
              <RewardItem
                title="Dinner for Two at L'Horizon"
                pts="15,000"
                image="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80"
                canAfford={false}
              />
              <RewardItem
                title="Helicopter Transfer"
                pts="25,000"
                image="https://images.unsplash.com/photo-1533604101087-43eb52f37c35?w=400&q=80"
                canAfford={false}
              />
            </div>
          </ExpandableCard>

          {/* Travel Companions */}
          <ExpandableCard
            title="Travel Companions"
            icon={<Users className="size-6 text-ai" />}
            isExpanded={expandedSection === "companions"}
            onToggle={() => toggleSection("companions")}
          >
            <div className="p-8 pt-2 space-y-4">
              {MOCK_GUEST.companions?.map((comp, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-5 rounded-2xl bg-surface-2 border border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-white/10 grid place-items-center text-white/50 font-bold text-xl">
                      {comp.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xl text-white font-semibold">{comp.name}</p>
                      <p className="text-sm text-muted-foreground">{comp.relation}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {comp.preferences?.map((pref, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 rounded-lg bg-black/40 text-xs text-white/70 border border-white/5"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <button
                className="w-full p-4 rounded-2xl border-2 border-dashed border-white/10 text-white/50 hover:bg-white/5 hover:text-white transition-colors focus-tv outline-none font-semibold"
                data-focusable
              >
                + Add Companion Profile
              </button>
            </div>
          </ExpandableCard>

          {/* Stay History */}
          <ExpandableCard
            title="Past Journeys"
            icon={<History className="size-6 text-ai" />}
            isExpanded={expandedSection === "history"}
            onToggle={() => toggleSection("history")}
          >
            <div className="p-8 pt-2 space-y-6">
              {MOCK_GUEST.pastStays?.map((stay, i) => (
                <div key={i} className="flex items-center gap-6 relative">
                  <div className="size-14 rounded-2xl bg-surface-2 border border-white/5 grid place-items-center z-10">
                    <Plane className="size-6 text-white/50" />
                  </div>
                  {i !== MOCK_GUEST.pastStays!.length - 1 && (
                    <div className="absolute left-7 top-14 bottom-[-24px] w-px bg-white/10" />
                  )}
                  <div>
                    <p className="text-xl text-white font-display">{stay.property}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <MapPin className="size-3" /> {stay.location}{" "}
                      <span className="text-white/20">•</span> {stay.date}
                    </p>
                  </div>
                  <button
                    className="ml-auto px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-semibold transition-colors focus-tv outline-none"
                    data-focusable
                  >
                    View Folio
                  </button>
                </div>
              ))}
            </div>
          </ExpandableCard>
        </div>

        {/* Right Col: Tier Benefits */}
        <div className="col-span-4 space-y-6">
          <h3 className="font-display text-3xl text-white mb-6">Platinum Benefits</h3>

          <BenefitItem icon={Crown} title="Suite Upgrades" desc="Complimentary upon availability" />
          <BenefitItem icon={Clock} title="Flexible Times" desc="Guaranteed 4PM late checkout" />
          <BenefitItem
            icon={ShieldCheck}
            title="Lounge Access"
            desc="Access to all Aurora Executive Lounges"
          />
          <BenefitItem
            icon={Gift}
            title="Welcome Amenity"
            desc="Premium champagne & local delicacies"
          />

          <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-ai/20 to-transparent border border-ai/20">
            <h4 className="text-xl font-semibold text-white mb-2">Dedicated Concierge</h4>
            <p className="text-sm text-white/70 mb-4">
              A specialized agent is assigned to handle your requests 24/7.
            </p>
            <button
              className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 focus-tv outline-none"
              data-focusable
            >
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Subcomponents ─────────────────────────────────────────────────────────

function ExpandableCard({
  title,
  icon,
  isExpanded,
  onToggle,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface border border-white/5 rounded-[32px] overflow-hidden tv-shadow transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-8 focus-tv outline-none hover:bg-white/[0.02]"
        data-focusable
      >
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-xl bg-ai/10 grid place-items-center">{icon}</div>
          <h2 className="font-display text-3xl text-white">{title}</h2>
        </div>
        <div className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
          <ChevronDown className="size-8 text-white/30" />
        </div>
      </button>

      <div
        className={`grid transition-all duration-500 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function RewardItem({
  title,
  pts,
  image,
  canAfford,
}: {
  title: string;
  pts: string;
  image: string;
  canAfford: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden border ${canAfford ? "border-white/10 cursor-pointer group hover:border-ai/50" : "border-white/5 opacity-60 cursor-not-allowed"}`}
      tabIndex={canAfford ? 0 : -1}
      data-focusable={canAfford}
    >
      <img
        src={image}
        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-semibold text-lg leading-tight mb-1">{title}</p>
        <p className={`text-sm font-bold ${canAfford ? "text-ai" : "text-white/40"}`}>{pts} pts</p>
      </div>
    </div>
  );
}

function BenefitItem({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 p-5 bg-surface border border-white/5 rounded-2xl">
      <div className="size-10 rounded-full bg-white/5 grid place-items-center shrink-0">
        <Icon className="size-5 text-white/70" />
      </div>
      <div>
        <h4 className="text-white font-semibold text-lg">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      </div>
    </div>
  );
}
