import { createFileRoute } from "@tanstack/react-router";
import {
  Play,
  Star,
  ChevronRight,
  Info,
  Plus,
  Volume2,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
} from "lucide-react";
import { MOVIES, SERIES, MUSIC } from "@/lib/mockData";
import { TooltipBubble } from "@/components/ui/TooltipBubble";
import { useState, useMemo } from "react";
import { PlayerModal } from "@/components/ui/PlayerModal";
import { useGuest } from "@/context/GuestContext";

export const Route = createFileRoute("/entertainment")({
  head: () => ({
    meta: [
      { title: "Entertainment · Lumina" },
      { name: "description", content: "Watch movies, series, and kids content on your Lumina TV." },
    ],
  }),
  component: EntertainmentPage,
});

function EntertainmentPage() {
  const { t } = useGuest();
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState("movies");

  const CATEGORIES = [
    { id: "movies", label: t("movies") },
    { id: "series", label: t("series") },
    { id: "kids", label: t("kids") },
    { id: "music", label: t("music") },
  ];

  return (
    <div className="max-w-[1700px] mx-auto pb-20 mt-4 animate-in fade-in duration-700">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-5xl text-primary">{t("entertainment")}</h1>
          <p className="text-xl text-muted-foreground mt-2">{t("entertainment_desc")}</p>
        </div>
        <div className="flex gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={[
                "px-8 py-3 rounded-full text-lg font-semibold transition-all focus-tv outline-none tv-shadow",
                cat.id === activeCategory
                  ? "bg-primary text-primary-foreground scale-105"
                  : "bg-surface text-muted-foreground hover:bg-surface-2 hover:text-foreground",
              ].join(" ")}
              data-focusable
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      <section className="space-y-12">
        {activeCategory === "music" ? (
          <MusicLayout onPlay={setSelectedMedia} />
        ) : (
          <VideoLayout activeCategory={activeCategory} onPlay={setSelectedMedia} />
        )}
      </section>

      {/* Simplified Player Modal for both Movie/Series */}
      <PlayerModal
        isOpen={!!selectedMedia && activeCategory !== "music"}
        onClose={() => setSelectedMedia(null)}
        title={selectedMedia?.title || ""}
        type="movie"
        image={selectedMedia?.image || selectedMedia?.heroImage}
      />
    </div>
  );
}

// ─── Netflix-style Video Layout ─────────────────────────────────────────────

function VideoLayout({
  activeCategory,
  onPlay,
}: {
  activeCategory: string;
  onPlay: (m: any) => void;
}) {
  const { t } = useGuest();

  const items = useMemo(() => {
    if (activeCategory === "movies") return MOVIES;
    if (activeCategory === "series") return SERIES;
    if (activeCategory === "kids")
      return [...MOVIES, ...SERIES].filter((m) => m.category === "Kids");
    return MOVIES;
  }, [activeCategory]);

  const featured: any = items[0];
  const trending = items.slice(1, 5);
  const newReleases = items.slice(5, 9);
  const actionSciFi = items.filter((m) => m.category === "Sci-Fi" || m.category === "Action");

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Billboard */}
      {featured && (
        <div className="relative w-full h-[60vh] min-h-[500px] rounded-[40px] overflow-hidden tv-shadow-lg group">
          <img
            src={featured.heroImage || featured.image}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 p-16 max-w-3xl">
            <h2 className="font-display text-7xl text-white mb-4 leading-tight">
              {featured.title}
            </h2>

            <div className="flex items-center gap-4 text-white/80 font-semibold mb-6 text-lg">
              <span className="text-status-completed">
                {(t as any)("match_score", { score: "98" }) || "98% Match"}
              </span>
              <span>{featured.year}</span>
              <span className="px-2 py-0.5 border border-white/40 rounded text-sm">
                {featured.rating}
              </span>
              <span>{featured.duration || featured.seasons}</span>
            </div>

            <p className="text-xl text-white/90 mb-8 line-clamp-3 leading-relaxed">
              {featured.synopsis}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => onPlay(featured)}
                className="px-8 py-4 bg-white text-black rounded-xl font-bold text-xl flex items-center gap-3 hover:bg-white/90 transition-all focus-tv outline-none tv-shadow"
                data-focusable
              >
                <Play className="size-6 fill-current" /> {(t as any)("play") || "Play"}
              </button>
              <button
                className="px-8 py-4 bg-white/20 text-white backdrop-blur-md rounded-xl font-bold text-xl flex items-center gap-3 hover:bg-white/30 transition-all focus-tv outline-none"
                data-focusable
              >
                <Plus className="size-6" /> {(t as any)("my_list") || "My List"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Horizontal Rows */}
      <MediaRow
        title={(t as any)("trending_now") || "Trending Now"}
        items={trending}
        onPlay={onPlay}
      />
      {newReleases.length > 0 && (
        <MediaRow
          title={(t as any)("new_releases") || "New Releases"}
          items={newReleases}
          onPlay={onPlay}
        />
      )}
      {actionSciFi.length > 0 && activeCategory !== "kids" && (
        <MediaRow title="Action & Sci-Fi" items={actionSciFi} onPlay={onPlay} />
      )}
    </div>
  );
}

function MediaRow({
  title,
  items,
  onPlay,
}: {
  title: string;
  items: any[];
  onPlay: (m: any) => void;
}) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h3 className="font-display text-3xl text-foreground mb-6 flex items-center gap-3 group cursor-pointer">
        {title}{" "}
        <ChevronRight className="size-6 text-ai opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-2" />
      </h3>
      <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} onPlay={onPlay} />
        ))}
      </div>
    </div>
  );
}

function MediaCard({ item, onPlay }: { item: any; onPlay: (m: any) => void }) {
  return (
    <button
      onClick={() => onPlay(item)}
      className="group relative flex-none w-[320px] aspect-[16/9] rounded-2xl overflow-hidden snap-start focus-tv outline-none tv-shadow bg-surface-2 transition-all duration-300 hover:w-[400px] hover:z-10"
      data-focusable
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

      {/* Default View */}
      <div className="absolute bottom-4 left-4 right-4 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
        <h4 className="font-display text-xl text-white truncate">{item.title}</h4>
      </div>

      {/* Hover Reveal (Netflix style) */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 backdrop-blur-[2px]">
        <h4 className="font-display text-2xl text-white mb-2">{item.title}</h4>
        <div className="flex items-center gap-3 text-white/80 text-sm font-semibold mb-3">
          <span className="text-status-completed">New</span>
          <span className="px-1.5 border border-white/40 rounded">{item.rating}</span>
          <span>{item.duration || item.seasons}</span>
        </div>
        <p className="text-white/70 text-sm line-clamp-3 mb-4">{item.synopsis}</p>
        <div className="flex gap-3">
          <div className="size-10 rounded-full bg-white text-black grid place-items-center">
            <Play className="size-5 fill-current ml-1" />
          </div>
          <div className="size-10 rounded-full border-2 border-white/40 text-white grid place-items-center hover:border-white">
            <Plus className="size-5" />
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Spotify-style Music Layout ─────────────────────────────────────────────

function MusicLayout({ onPlay }: { onPlay: (m: any) => void }) {
  const { t } = useGuest();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(MUSIC[0]);

  const handlePlayTrack = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-32">
      {/* Top Banner */}
      <div className="w-full h-64 rounded-3xl overflow-hidden relative mb-12 tv-shadow bg-gradient-to-r from-ai/40 to-primary/40">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 flex flex-col justify-center p-12">
          <h2 className="text-5xl font-display text-white mb-2">
            {t("good_evening") || "Good Evening"}
          </h2>
          <p className="text-xl text-white/80">Curated sounds for your stay at Lumina.</p>
        </div>
      </div>

      <h3 className="font-display text-3xl text-foreground mb-6">Made For You</h3>
      <div className="grid grid-cols-6 gap-6">
        {MUSIC.map((track) => (
          <button
            key={track.id}
            onClick={() => handlePlayTrack(track)}
            className="group p-4 rounded-2xl bg-surface-2 border border-white/5 hover:bg-surface tv-shadow transition-all focus-tv outline-none text-left"
            data-focusable
          >
            <div className="relative aspect-square rounded-xl overflow-hidden mb-4 tv-shadow-lg">
              <img
                src={track.image}
                alt={track.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute right-3 bottom-3 size-12 bg-ai text-white rounded-full grid place-items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-ai/50">
                <Play className="size-6 fill-current ml-1" />
              </div>
            </div>
            <h4 className="font-semibold text-foreground text-lg truncate">{track.title}</h4>
            <p className="text-muted-foreground text-sm truncate mt-1">{track.artist}</p>
          </button>
        ))}
      </div>

      {/* Now Playing Bar (Sticky Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 h-28 bg-surface border-t border-white/10 tv-shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl flex items-center justify-between px-12 z-50 animate-in slide-in-from-bottom-24">
        {/* Track Info */}
        <div className="flex items-center gap-6 w-1/4">
          <img src={currentTrack.image} className="size-16 rounded-lg object-cover tv-shadow" />
          <div>
            <h4 className="font-semibold text-white text-lg">{currentTrack.title}</h4>
            <p className="text-muted-foreground text-sm">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex-1 max-w-2xl flex flex-col items-center gap-2">
          <div className="flex items-center gap-8">
            <button className="text-white/50 hover:text-white transition-colors" data-focusable>
              <Shuffle className="size-5" />
            </button>
            <button className="text-white/80 hover:text-white transition-colors" data-focusable>
              <SkipBack className="size-6 fill-current" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="size-12 rounded-full bg-white text-black grid place-items-center hover:scale-105 transition-transform focus-tv outline-none"
              data-focusable
            >
              {isPlaying ? (
                <div className="size-4 bg-black rounded-sm" />
              ) : (
                <Play className="size-6 fill-current ml-1" />
              )}
            </button>
            <button className="text-white/80 hover:text-white transition-colors" data-focusable>
              <SkipForward className="size-6 fill-current" />
            </button>
            <button className="text-white/50 hover:text-white transition-colors" data-focusable>
              <Repeat className="size-5" />
            </button>
          </div>
          {/* Progress Bar */}
          <div className="w-full flex items-center gap-3 text-xs text-white/50 font-medium">
            <span>1:24</span>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden group cursor-pointer">
              <div className="h-full bg-white group-hover:bg-ai w-1/3 relative rounded-full">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 size-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-md" />
              </div>
            </div>
            <span>3:45</span>
          </div>
        </div>

        {/* Volume */}
        <div className="w-1/4 flex items-center justify-end gap-3 text-white/50">
          <Volume2 className="size-5" />
          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer">
            <div className="h-full bg-white hover:bg-ai w-2/3 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
