import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { useAISession } from "@/context/AISessionContext";
import { ChatBubble } from "@/components/concierge/ChatBubble";
import { ContextPill } from "@/components/concierge/ContextPill";
import { VoiceButton } from "@/components/concierge/VoiceButton";
import { renderUIComponent } from "@/lib/uiParser";

export const Route = createFileRoute("/concierge")({
  head: () => ({
    meta: [
      { title: "Concierge · Lumina" },
      {
        name: "description",
        content:
          "Chat with Lumina, your AI concierge. Book spa, dining, room service, and manage your stay by voice or text.",
      },
    ],
  }),
  component: ConciergePage,
});

function ConciergePage() {
  const { messages, isThinking, send } = useAISession();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  const submit = async (text: string) => {
    const t = text.trim();
    if (!t) return;
    setInput("");
    await send(t);
  };

  const lastLumina = [...messages].reverse().find((m) => m.role === "lumina");

  return (
    <div className="max-w-[1500px] mx-auto h-[calc(100vh-220px)] flex flex-col">
      {/* Context pill */}
      <div className="mb-6">
        <ContextPill />
      </div>

      {/* Transcript */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-2 space-y-6"
        aria-live="polite"
        aria-label="Conversation with Lumina"
      >
        {messages.map((m) => (
          <ChatBubble
            key={m.id}
            role={m.role}
            extra={
              m.role === "lumina" && m.ui ? (
                <div className="mt-1">{renderUIComponent(m.ui, { onQuickReply: submit })}</div>
              ) : null
            }
          >
            {m.text}
          </ChatBubble>
        ))}
        {isThinking && (
          <ChatBubble role="lumina">
            <span className="inline-flex gap-1.5">
              <span className="size-2 rounded-full bg-ai animate-pulse" />
              <span className="size-2 rounded-full bg-ai animate-pulse [animation-delay:120ms]" />
              <span className="size-2 rounded-full bg-ai animate-pulse [animation-delay:240ms]" />
            </span>
          </ChatBubble>
        )}
      </div>

      {/* Suggested replies for last message */}
      {!isThinking && lastLumina?.suggestedReplies && lastLumina.suggestedReplies.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3" aria-label="Suggested replies">
          {lastLumina.suggestedReplies.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => submit(s)}
              className="min-h-[56px] px-5 rounded-2xl bg-ai-soft text-ai text-lg font-semibold border-2 border-transparent hover:border-ai/40"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="mt-6 flex items-center gap-4"
      >
        <div className="flex-1 flex items-center gap-3 bg-surface border border-border rounded-3xl px-5 tv-shadow">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Lumina anything…"
            aria-label="Message Lumina"
            className="flex-1 bg-transparent outline-none text-xl py-5 placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
            className="size-14 rounded-2xl bg-primary text-primary-foreground grid place-items-center disabled:opacity-40"
          >
            <Send className="size-6" />
          </button>
        </div>
        <VoiceButton onCapture={(t) => submit(t)} />
      </form>
    </div>
  );
}
