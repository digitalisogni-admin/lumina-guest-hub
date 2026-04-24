import { MapPin, Star } from "lucide-react";

interface LocalRecsProps {
  category: string;
  locations: Array<{
    name: string;
    distance: string;
    rating: number;
    image: string;
  }>;
}

export function LocalRecs({ category, locations }: LocalRecsProps) {
  return (
    <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xl font-semibold text-white/60 tracking-wide uppercase">{category}</h3>
        <span className="text-sm text-ai font-medium">Nearby experiences</span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {locations.map((loc, i) => (
          <button
            key={i}
            data-focusable
            className="flex-shrink-0 w-[320px] group text-left relative overflow-hidden rounded-[2rem] bg-white/[0.03] border border-white/5 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.05]"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={loc.image}
                alt={loc.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-focus:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                <Star className="size-3 fill-current" />
                <span className="text-sm font-bold">{loc.rating}</span>
              </div>
              <h4 className="text-xl font-bold mb-1 group-hover:text-ai transition-colors">
                {loc.name}
              </h4>
              <div className="flex items-center gap-1.5 text-white/50 text-sm">
                <MapPin className="size-3" />
                <span>{loc.distance} from Aurora</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
