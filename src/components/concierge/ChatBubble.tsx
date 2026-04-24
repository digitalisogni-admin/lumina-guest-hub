import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

export function ChatBubble({
  role,
  children,
  extra,
}: {
  role: "guest" | "lumina";
  children: ReactNode;
  extra?: ReactNode;
}) {
  const isLumina = role === "lumina";
  return (
    <div className={["flex gap-4 w-full", isLumina ? "justify-start" : "justify-end"].join(" ")}>
      {isLumina && (
        <div className="size-12 shrink-0 rounded-2xl bg-ai text-ai-foreground grid place-items-center">
          <img src="/images/logo.png" alt="" className="size-6 object-contain" />
        </div>
      )}
      <div
        className={[
          "max-w-[720px] flex flex-col gap-3",
          isLumina ? "items-start" : "items-end",
        ].join(" ")}
      >
        <div
          className={[
            "px-6 py-4 rounded-3xl text-xl leading-snug tv-shadow",
            isLumina
              ? "bg-surface border border-border text-foreground rounded-tl-md"
              : "bg-primary text-primary-foreground rounded-tr-md",
          ].join(" ")}
        >
          {children}
        </div>
        {extra}
      </div>
    </div>
  );
}
