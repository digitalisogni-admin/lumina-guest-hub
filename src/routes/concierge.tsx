import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Coffee, UtensilsCrossed, CarFront, BellRing } from "lucide-react";
import { useAISession } from "@/context/AISessionContext";
import { ChatBubble } from "@/components/concierge/ChatBubble";
import { ContextPill } from "@/components/concierge/ContextPill";
import { VoiceButton } from "@/components/concierge/VoiceButton";
import { SuggestedReplies } from "@/components/concierge/SuggestedReplies";
import { renderUIComponents } from "@/lib/uiParser";
import { AIVisualizer } from "@/components/concierge/AIVisualizer";
import { useDpadNavigation } from "@/hooks/useDpadNavigation";
import { ExcursionDetailModal } from "@/components/ui/ExcursionDetailModal";
import { useGuest } from "@/context/GuestContext";

export const Route = createFileRoute("/concierge")({
  head: () => ({
    meta: [
      { title: "Concierge · Lumina" },
      { name: "description", content: "Your personal AI concierge for Aurora Hotels." },
    ],
  }),
  component: ConciergePage,
});

function ConciergePage() {
  const { t, guest } = useGuest();
  const { messages, isThinking, send, runAction, runSuggestedReply } = useAISession();
  const [input, setInput] = useState("");
  const [isResponding, setIsResponding] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { focusedId } = useDpadNavigation();
  const [selectedExcursion, setSelectedExcursion] = useState<{
    title: string;
    subtitle?: string;
  } | null>(null);
  const [isExcursionModalOpen, setIsExcursionModalOpen] = useState(false);

  // Trigger visualizer "responding" state when Lumina replies
  useEffect(() => {
    if (messages.length === 0) return;
    const lastMessage = messages[messages.length - 1];

    if (lastMessage.role === "lumina" && !isThinking) {
      setIsResponding(true);
      const duration = Math.min(Math.max(lastMessage.text.length * 30, 2000), 8000);
      const timer = setTimeout(() => setIsResponding(false), duration);
      return () => clearTimeout(timer);
    }
  }, [messages, isThinking]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  const submit = async (text: string) => {
    const t = text.trim();
    if (!t) return;
    setInput("");
    setIsResponding(false);
    await send(t);
  };

  const lastLumina = [...messages].reverse().find((m) => m.role === "lumina");
  const aiState = isThinking ? "thinking" : isResponding ? "speaking" : "idle";

  return (
    <div className="relative max-w-[1840px] mx-auto h-[calc(100vh-180px)] mt-4 animate-in fade-in duration-1000">
      {/* Immersive Background Ambient */}
      <div className="absolute -inset-40 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[1200px] bg-ai/20 blur-[180px] rounded-full animate-pulse [animation-duration:10s]" />
        <div className="absolute top-0 right-0 size-[800px] bg-ai/10 blur-[150px] rounded-full animate-ai-fluid [animation-duration:15s]" />
      </div>

      <div className="dashboard-grid relative z-10 gap-12 h-full">
        {/* Left Side: Immersive Visuals & Luxury Welcome */}
        <section className="concierge-visual-area bg-surface/30 backdrop-blur-3xl rounded-[40px] border border-white/5 relative overflow-hidden flex flex-col">
          <div className="ai-stage-glow" />

          <div className="absolute top-12 left-12 z-20">
            <ContextPill />
          </div>

          <div className="flex-1 w-full flex flex-col items-center justify-center gap-16 relative z-10 px-12">
            {/* Contextual Visualizer - Larger Scale */}
            <div className="relative scale-110">
              <AIVisualizer state={aiState} />
            </div>

            {/* Show current media component from the last Lumina message if it exists */}
            <div className="w-full max-w-3xl transform transition-all duration-700">
              {lastLumina?.ui && lastLumina.ui.length > 0 ? (
                <div
                  className="animate-in fade-in slide-in-from-bottom-10 duration-700"
                  data-focus-group="ai-content"
                >
                  {renderUIComponents(lastLumina.ui, {
                    onQuickReply: submit,
                    onAction: (action) => {
                      if (action.kind === "excursion-details") {
                        setSelectedExcursion(action.payload);
                        setIsExcursionModalOpen(true);
                      } else if (action.kind !== "none") {
                        runAction(action);
                      }
                    },
                  })}
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 w-full max-w-2xl mx-auto text-center">
                  <div className="p-12 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl tv-shadow-2xl">
                    <h2 className="text-6xl font-display text-white mb-4 tracking-tight">
                      Good Evening, {guest.name}
                    </h2>
                    <p className="text-2xl text-white/60 leading-relaxed font-light">
                      Your personal AI companion is ready. <br />
                      How may I elevate your experience tonight?
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <ExcursionDetailModal
          isOpen={isExcursionModalOpen}
          onClose={() => setIsExcursionModalOpen(false)}
          excursion={selectedExcursion}
        />

        {/* Right Side: Chat & Controls */}
        <section className="concierge-chat-area flex flex-col relative h-full bg-surface/20 backdrop-blur-2xl rounded-[40px] border border-white/5 p-10">
          {/* Quick Action Chips - Larger and More spaced */}
          <div className="flex gap-4 overflow-x-auto pb-6 mb-4 shrink-0 hide-scrollbar mask-edges">
            <QuickAction
              icon={Sparkles}
              label="Book Spa"
              onClick={() => submit("I'd like to book a spa treatment")}
            />
            <QuickAction
              icon={Coffee}
              label="Breakfast"
              onClick={() => submit("Order room service breakfast")}
            />
            <QuickAction
              icon={UtensilsCrossed}
              label="Dining"
              onClick={() => submit("Make a restaurant reservation")}
            />
            <QuickAction
              icon={CarFront}
              label="Transport"
              onClick={() => submit("Arrange airport transfer")}
            />
            <QuickAction
              icon={BellRing}
              label="Wake Up"
              onClick={() => submit("Schedule a wake-up call")}
            />
          </div>

          <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-4">
              <div className="size-3 rounded-full bg-ai animate-pulse shadow-[0_0_15px_rgba(var(--ai-rgb),0.8)]" />
              <span className="text-xl font-display text-white tracking-widest uppercase opacity-80">
                {t("lumina_live")}
              </span>
            </div>
          </div>

          {/* Transcript - More padding and spacing */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto pr-6 space-y-8 scrollbar-hide mb-6"
            aria-live="polite"
            aria-label={t("conversation_aria")}
          >
            {messages.map((m, i) => {
              const showAvatar =
                m.role === "lumina" && (i === 0 || messages[i - 1].role !== "lumina");
              return (
                <div
                  key={m.id}
                  className={`flex ${m.role === "guest" ? "justify-end" : "justify-start"} items-end gap-5`}
                >
                  {m.role === "lumina" && (
                    <div className="shrink-0 mb-2">
                      {showAvatar ? (
                        <div className="size-10 rounded-full bg-white/10 grid place-items-center shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden border border-white/10">
                          <img
                            src="/images/logo.png"
                            alt="Lumina"
                            className="size-6 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="size-10" />
                      )}
                    </div>
                  )}
                  <div className={`max-w-[85%] ${m.role === "guest" ? "order-1" : "order-2"}`}>
                    <ChatBubble role={m.role}>{m.text}</ChatBubble>
                    <div
                      className={`text-[11px] text-white/30 mt-2 font-bold tracking-[0.2em] uppercase ${m.role === "guest" ? "text-right mr-2" : "text-left ml-4"}`}
                    >
                      {new Date(m.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            {isThinking && (
              <div className="flex justify-start items-end gap-5">
                <div className="shrink-0 mb-2">
                  <div className="size-10 rounded-full bg-white/10 grid place-items-center shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden border border-white/10">
                    <img src="/images/logo.png" alt="Lumina" className="size-6 object-contain" />
                  </div>
                </div>
                <div className="max-w-[85%]">
                  <ChatBubble role="lumina">
                    <span className="inline-flex gap-2 items-center px-2 py-1">
                      <span className="size-2.5 rounded-full bg-ai animate-bounce" />
                      <span className="size-2.5 rounded-full bg-ai animate-bounce [animation-delay:150ms]" />
                      <span className="size-2.5 rounded-full bg-ai animate-bounce [animation-delay:300ms]" />
                    </span>
                  </ChatBubble>
                </div>
              </div>
            )}
          </div>

          {/* Suggested replies - Enhanced Visibility */}
          {!isThinking &&
            lastLumina?.suggestedReplies &&
            lastLumina.suggestedReplies.length > 0 && (
              <div className="mt-4 mb-6" data-focus-group="suggestions">
                <SuggestedReplies
                  replies={lastLumina.suggestedReplies}
                  onSelect={runSuggestedReply}
                />
              </div>
            )}

          {/* Input bar - More premium focus state */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="mt-2 flex items-center gap-6"
            data-focus-group="input-bar"
          >
            <div className="flex-1 flex items-center gap-4 bg-white/5 border border-white/10 rounded-[32px] px-8 tv-shadow-lg focus-within:border-ai/40 focus-within:bg-white/[0.08] transition-all duration-300">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("ask_lumina_placeholder")}
                className="flex-1 bg-transparent outline-none text-2xl py-6 placeholder:text-white/20 font-light"
                data-focusable
                data-focus-trap
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="size-16 rounded-[24px] bg-white text-black grid place-items-center disabled:opacity-20 transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-white/10"
                data-focusable
              >
                <Send className="size-7" />
              </button>
            </div>
            <VoiceButton onCapture={(t) => submit(t)} />
          </form>
        </section>
      </div>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
  onClick,
}: {
  icon: any;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-surface-2 border border-white/5 rounded-xl text-sm font-semibold text-white/80 hover:bg-surface hover:text-white transition-colors shrink-0 focus-tv outline-none"
      data-focusable
    >
      <Icon className="size-4 text-ai" /> {label}
    </button>
  );
}
