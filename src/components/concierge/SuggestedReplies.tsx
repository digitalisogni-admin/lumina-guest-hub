import { Sparkles, Zap } from "lucide-react";
import type { SuggestedReply } from "@/lib/types";

/**
 * Suggested reply chips. Each chip is a focusable remote target.
 * - Plain prompts (echoAsMessage) get a neutral indigo soft style.
 * - Action-bound chips get a stronger filled style + bolt icon to signal
 *   they trigger a backend action immediately.
 */
export function SuggestedReplies({
  replies,
  onSelect,
}: {
  replies: SuggestedReply[];
  onSelect: (reply: SuggestedReply) => void;
}) {
  if (!replies.length) return null;
  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="Suggested replies">
      {replies.map((r) => {
        const isAction = !!r.action;
        return (
          <button
            key={r.label}
            type="button"
            onClick={() => onSelect(r)}
            aria-label={isAction ? `${r.label} — runs immediately` : r.label}
            className={[
              "min-h-[60px] px-5 rounded-2xl text-lg font-semibold inline-flex items-center gap-2 border-2 transition-colors",
              isAction
                ? "bg-ai text-ai-foreground border-ai hover:bg-ai/90"
                : "bg-ai-soft text-ai border-transparent hover:border-ai/40",
            ].join(" ")}
          >
            {isAction ? (
              <Zap className="size-5" />
            ) : (
              <img src="/images/logo.png" alt="" className="size-5 object-contain opacity-70" />
            )}
            {r.label}
          </button>
        );
      })}
    </div>
  );
}
