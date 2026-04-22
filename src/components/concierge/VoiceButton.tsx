import { Mic } from "lucide-react";
import { useState } from "react";

export function VoiceButton({ onCapture }: { onCapture?: (text: string) => void }) {
  const [listening, setListening] = useState(false);

  const toggle = () => {
    if (listening) {
      setListening(false);
      // Simulated transcription
      onCapture?.("Book the spa for tonight");
    } else {
      setListening(true);
      // Simulate listening for 2s then auto-stop
      setTimeout(() => {
        setListening(false);
        onCapture?.("Book the spa for tonight");
      }, 2200);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={listening ? "Stop listening" : "Speak to Lumina"}
      className={[
        "relative size-20 rounded-full grid place-items-center transition-colors shrink-0",
        listening ? "bg-ai text-ai-foreground" : "bg-surface border-2 border-border text-ai hover:bg-ai-soft",
      ].join(" ")}
    >
      {listening && <span className="absolute inset-0 rounded-full bg-ai animate-pulse-ring" aria-hidden />}
      {listening ? (
        <div className="flex items-end gap-1 h-7" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="block w-1.5 bg-ai-foreground rounded-full animate-wave"
              style={{ height: "100%", animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
      ) : (
        <Mic className="size-9" />
      )}
    </button>
  );
}
