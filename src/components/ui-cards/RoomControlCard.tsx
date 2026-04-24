import {
  Thermometer,
  Sun,
  Moon,
  Film,
  Sparkles,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useGuest } from "@/context/GuestContext";
import { cn } from "@/lib/utils";

export function RoomControlCard() {
  const {
    roomTemperature,
    setRoomTemperature,
    lightMode,
    setLightMode,
    curtainsOpen,
    setCurtainsOpen,
    t,
  } = useGuest();

  const modes = [
    { id: "bright", icon: Sun, label: t("light_bright") },
    { id: "romantic", icon: Sparkles, label: t("light_romantic") },
    { id: "sleep", icon: Moon, label: t("light_sleep") },
    { id: "movie", icon: Film, label: t("light_movie") },
  ] as const;

  return (
    <div className="rounded-3xl bg-surface border border-border tv-shadow p-8 flex flex-col gap-8 min-w-[500px]">
      <div className="flex items-center gap-3">
        <SlidersHorizontal className="size-6 text-ai" />
        <h2 className="text-2xl font-bold font-display">{t("room_controls")}</h2>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Temperature Control */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {t("temperature")}
          </label>
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setRoomTemperature(roomTemperature + 1)}
                className="size-12 rounded-xl bg-secondary hover:bg-ai hover:text-ai-foreground transition-all flex items-center justify-center"
                aria-label="Increase temperature"
              >
                <ChevronUp className="size-6" />
              </button>
              <button
                onClick={() => setRoomTemperature(roomTemperature - 1)}
                className="size-12 rounded-xl bg-secondary hover:bg-ai hover:text-ai-foreground transition-all flex items-center justify-center"
                aria-label="Decrease temperature"
              >
                <ChevronDown className="size-6" />
              </button>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-bold font-display">{roomTemperature}</span>
              <span className="text-2xl text-muted-foreground">°C</span>
            </div>
          </div>
        </div>

        {/* Curtains Toggle */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {t("curtains")}
          </label>
          <button
            onClick={() => setCurtainsOpen(!curtainsOpen)}
            className={cn(
              "flex-1 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 p-4",
              curtainsOpen
                ? "bg-ai/10 border-ai text-ai"
                : "bg-secondary border-transparent text-muted-foreground",
            )}
          >
            <div className="text-3xl font-bold">{curtainsOpen ? t("open") : t("closed")}</div>
            <div className="text-xs uppercase tracking-widest opacity-60">Tap to toggle</div>
          </button>
        </div>
      </div>

      {/* Light Modes */}
      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {t("lights")}
        </label>
        <div className="grid grid-cols-4 gap-4">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setLightMode(mode.id)}
              className={cn(
                "flex flex-col items-center gap-3 p-4 rounded-2xl transition-all border-2",
                lightMode === mode.id
                  ? "bg-ai/10 border-ai text-ai"
                  : "bg-secondary border-transparent text-muted-foreground hover:bg-secondary/80",
              )}
            >
              <mode.icon className="size-6" />
              <span className="font-medium">{mode.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
