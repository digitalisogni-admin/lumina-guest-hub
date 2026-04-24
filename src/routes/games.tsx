import { createFileRoute } from "@tanstack/react-router";
import { Download, Star, ChevronRight, Gamepad2 } from "lucide-react";
import { GAMES } from "@/lib/mockData";
import { TooltipBubble } from "@/components/ui/TooltipBubble";
import { useState, useMemo } from "react";
import { PlayerModal } from "@/components/ui/PlayerModal";
import { useGuest } from "@/context/GuestContext";

export const Route = createFileRoute("/games")({
  head: () => {
    return {
      meta: [
        { title: "Games" },
        {
          name: "description",
          content: "Premium gaming experience",
        },
      ],
    };
  },
  component: GamesPage,
});

function GamesPage() {
  const { t } = useGuest();
  const [selectedGame, setSelectedGame] = useState<(typeof GAMES)[0] | null>(null);
  const [activeGenre, setActiveGenre] = useState("all");

  const GENRES = [
    { id: "all", label: t("cat_all") },
    { id: "racing", label: t("racing") },
    { id: "strategy", label: t("strategy") },
    { id: "adventure", label: t("adventure") },
    { id: "rpg", label: t("rpg") },
    { id: "casual", label: t("casual") },
  ];

  const filteredGames = useMemo(() => {
    if (activeGenre === "all") return GAMES;
    return GAMES.filter((g) => g.category.toLowerCase() === activeGenre.toLowerCase());
  }, [activeGenre]);

  return (
    <div className="max-w-[1600px] mx-auto pb-20">
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-2">
          <Gamepad2 className="size-8 text-ai" />
          <h1 className="font-display text-5xl text-primary">{t("games")}</h1>
        </div>
        <p className="text-xl text-muted-foreground mt-2">{t("premium_gaming")}</p>

        <div className="flex gap-4 mt-8">
          {GENRES.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setActiveGenre(genre.id)}
              className={[
                "px-8 py-3 rounded-full text-lg font-semibold transition-all focus-tv outline-none",
                genre.id === activeGenre
                  ? "bg-primary text-primary-foreground tv-shadow scale-105"
                  : "bg-surface-2 text-muted-foreground hover:bg-surface hover:text-foreground",
              ].join(" ")}
              data-focusable
            >
              {genre.label}
            </button>
          ))}
        </div>
      </header>

      <section className="space-y-12">
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl text-foreground uppercase tracking-wider">
              {t("top_rated_games")}
            </h2>
          </div>
          <div className="grid grid-cols-5 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredGames.map((game) => (
              <TooltipBubble
                key={game.id}
                content={t("play_game_tooltip", { title: game.title, category: game.category })}
              >
                <button
                  onClick={() => setSelectedGame(game)}
                  className="group flex flex-col gap-4 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ai rounded-3xl p-2 transition-all"
                  data-focusable
                >
                  <div className="relative aspect-square rounded-3xl overflow-hidden tv-shadow">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute bottom-4 right-4 size-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="size-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-foreground truncate">{game.title}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-muted-foreground font-medium">{game.category}</span>
                      <span className="flex items-center gap-1 text-ai font-semibold">
                        <Star className="size-4 fill-current" /> {game.rating}
                      </span>
                    </div>
                  </div>
                </button>
              </TooltipBubble>
            ))}
          </div>
        </div>

        <div className="rounded-[40px] bg-gradient-to-br from-ai/20 via-surface to-surface border border-ai/20 p-12 flex items-center justify-between overflow-hidden relative">
          <div className="max-w-2xl relative z-10">
            <h2 className="font-display text-4xl text-primary mb-4">{t("controller_support")}</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">{t("controller_desc")}</p>
            <button
              className="mt-8 px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-xl hover:bg-primary/90 transition-colors tv-shadow focus-tv"
              data-focusable
            >
              {t("pair_controller")}
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none">
            <Gamepad2 className="size-full rotate-12 translate-x-20 translate-y-20" />
          </div>
        </div>
      </section>

      <PlayerModal
        isOpen={!!selectedGame}
        onClose={() => setSelectedGame(null)}
        title={selectedGame?.title || ""}
        type="game"
        image={selectedGame?.image}
      />
    </div>
  );
}
