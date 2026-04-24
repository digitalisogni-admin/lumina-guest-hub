import { Sun, Cloud, CloudRain, Thermometer } from "lucide-react";

interface WeatherProps {
  temp: string;
  condition: string;
  forecast: Array<{ day: string; temp: string; icon: string }>;
}

export function WeatherCard({ temp, condition, forecast }: WeatherProps) {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "sun":
        return <Sun className="size-6 text-amber-400" />;
      case "cloud":
        return <Cloud className="size-6 text-slate-400" />;
      case "cloud-rain":
        return <CloudRain className="size-6 text-indigo-400" />;
      default:
        return <Sun className="size-6" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 tv-shadow">
        <div className="flex items-center gap-6">
          <div className="size-20 bg-amber-400/10 rounded-2xl grid place-items-center">
            <Sun className="size-10 text-amber-400" />
          </div>
          <div>
            <div className="text-5xl font-bold tracking-tight">{temp}</div>
            <div className="text-xl text-white/60 font-medium">{condition}</div>
          </div>
        </div>

        <div className="h-16 w-px bg-white/10 mx-4" />

        <div className="flex gap-8">
          {forecast.map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-white/40 uppercase tracking-wider">
                {f.day}
              </span>
              {getIcon(f.icon)}
              <span className="text-lg font-bold">{f.temp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
