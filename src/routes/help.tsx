import { createFileRoute } from "@tanstack/react-router";
import { useWalkthrough, FlowId } from "@/context/WalkthroughContext";
import { Play, HelpCircle, Utensils, Map, CalendarPlus, Mic } from "lucide-react";

export const Route = createFileRoute("/help")({
  component: HelpPage,
});

function HelpPage() {
  const { startFlow } = useWalkthrough();

  const TUTORIALS: { id: FlowId; title: string; desc: string; icon: any }[] = [
    {
      id: "initial-welcome",
      title: "Welcome to Lumina",
      desc: "Learn the basics of using the TV remote and navigation.",
      icon: HelpCircle,
    },
    {
      id: "use-ai-concierge",
      title: "Using the AI Concierge",
      desc: "How to use voice and text to ask Lumina for anything.",
      icon: Mic,
    },
    {
      id: "book-restaurant",
      title: "Booking a Restaurant",
      desc: "Step-by-step guide to reserving a table for dining.",
      icon: Utensils,
    },
    {
      id: "book-excursion",
      title: "Booking an Excursion",
      desc: "How to explore the map and book local experiences.",
      icon: Map,
    },
    {
      id: "book-next-trip",
      title: "Planning Your Next Trip",
      desc: "Discover sister properties and save booking links.",
      icon: CalendarPlus,
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto pb-20 animate-in fade-in duration-700">
      <header className="mb-12">
        <h1 className="text-6xl font-display text-white mb-4">Tutorials Hub</h1>
        <p className="text-2xl text-white/60 max-w-2xl">
          Learn how to make the most of your stay. Select a tutorial to view a step-by-step
          walkthrough.
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {TUTORIALS.map((tut) => (
          <button
            key={tut.id}
            onClick={() => startFlow(tut.id)}
            className="group relative rounded-3xl bg-surface border border-white/5 p-8 text-left transition-all hover:bg-surface-2 focus-tv outline-none tv-shadow"
            data-focusable
          >
            <div className="size-16 rounded-2xl bg-white/5 group-hover:bg-ai/20 text-white/50 group-hover:text-ai transition-colors grid place-items-center mb-6">
              <tut.icon className="size-8" />
            </div>
            <h3 className="text-2xl font-display text-white mb-2">{tut.title}</h3>
            <p className="text-white/50">{tut.desc}</p>

            <div className="absolute top-8 right-8 size-10 rounded-full bg-ai text-white grid place-items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <Play className="size-4 ml-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
