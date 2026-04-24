import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Music,
  Star,
  ChevronRight,
  Trophy,
  Sparkles,
} from "lucide-react";
import { ACTIVITIES } from "@/lib/mockData";
import { TooltipBubble } from "@/components/ui/TooltipBubble";

export const Route = createFileRoute("/activities")({
  component: ActivitiesPage,
});

function ActivitiesPage() {
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Kids", "Adults", "Night Events", "Wellness"];

  const filteredActivities =
    filter === "All" ? ACTIVITIES : ACTIVITIES.filter((a) => a.category === filter);

  return (
    <div className="max-w-[1600px] mx-auto pb-20 animate-in fade-in duration-700">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <p className="text-ai font-semibold text-sm tracking-[0.2em] uppercase mb-2">
            Daily Experience
          </p>
          <h1 className="text-6xl font-display text-white">Activities Board</h1>
        </div>

        <div className="flex gap-3 bg-surface/50 backdrop-blur-md p-2 rounded-2xl border border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all focus-tv ${
                filter === cat
                  ? "bg-ai text-white shadow-lg"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
              data-focusable
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        {filteredActivities.map((act) => (
          <TooltipBubble key={act.id} content={`View details for ${act.title}`}>
            <button
              className="group relative aspect-[16/10] rounded-[32px] overflow-hidden text-left tv-shadow focus-tv outline-none transition-transform hover:-translate-y-2"
              data-focusable
            >
              <img
                src={act.image}
                alt={act.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 rounded-full bg-ai/20 backdrop-blur-md border border-ai/30 text-ai text-xs font-bold uppercase tracking-wider">
                  {act.category}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="text-3xl font-display text-white mb-4 group-hover:text-ai transition-colors">
                  {act.title}
                </h3>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Clock className="size-4 text-ai" /> {act.time}
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <MapPin className="size-4 text-ai" /> {act.location}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-white font-medium flex items-center gap-2">
                    Book Experience <ChevronRight className="size-4" />
                  </span>
                  {act.category === "Kids" && <Trophy className="size-6 text-amber-400" />}
                  {act.category === "Night Events" && <Music className="size-6 text-purple-400" />}
                  {act.category === "Wellness" && <Sparkles className="size-6 text-emerald-400" />}
                </div>
              </div>
            </button>
          </TooltipBubble>
        ))}
      </div>

      {/* Highlights Section */}
      <section className="mt-20">
        <h2 className="text-3xl font-display text-white mb-10">Weekly Highlights</h2>
        <div className="grid grid-cols-2 gap-8">
          <HighlightCard
            image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80"
            title="Full Moon Yoga Session"
            date="Friday, April 24"
            desc="A mystical journey under the stars at the Zen Garden. Guided by our master instructors."
          />
          <HighlightCard
            image="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80"
            title="Gala Dinner & Cabaret"
            date="Saturday, April 25"
            desc="An evening of culinary excellence followed by the mesmerizing 'Aurora Dreams' show."
          />
        </div>
      </section>
    </div>
  );
}

function HighlightCard({
  image,
  title,
  date,
  desc,
}: {
  image: string;
  title: string;
  date: string;
  desc: string;
}) {
  return (
    <div className="group relative h-[300px] rounded-[40px] overflow-hidden border border-white/5 tv-shadow">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="relative h-full p-10 flex flex-col justify-center max-w-md">
        <div className="text-ai text-sm font-bold uppercase tracking-widest mb-2">{date}</div>
        <h3 className="text-4xl font-display text-white mb-4">{title}</h3>
        <p className="text-white/60 text-lg leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
