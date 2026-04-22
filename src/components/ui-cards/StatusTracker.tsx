import { Check, Clock, Truck } from "lucide-react";
import type { ServiceStatus } from "@/lib/types";

const STEPS: Array<{ key: ServiceStatus; label: string; Icon: typeof Clock }> = [
  { key: "pending", label: "Pending", Icon: Clock },
  { key: "enroute", label: "En Route", Icon: Truck },
  { key: "completed", label: "Completed", Icon: Check },
];

const ORDER: Record<ServiceStatus, number> = { pending: 0, enroute: 1, completed: 2 };

export function StatusTracker({
  title,
  status,
  etaMinutes,
  compact = false,
}: {
  title?: string;
  status: ServiceStatus;
  etaMinutes: number;
  compact?: boolean;
}) {
  const idx = ORDER[status];

  return (
    <div
      aria-live="polite"
      className={[
        "rounded-3xl bg-surface border border-border p-6 tv-shadow",
        compact ? "" : "p-8",
      ].join(" ")}
    >
      {title && (
        <div className="flex items-center justify-between mb-5">
          <div className="text-xl font-semibold text-foreground">{title}</div>
          <div className="text-base text-muted-foreground">
            {status === "completed" ? "Done" : `ETA ${etaMinutes} min`}
          </div>
        </div>
      )}
      <div className="flex items-center gap-3">
        {STEPS.map((step, i) => {
          const reached = i <= idx;
          const isCurrent = i === idx;
          return (
            <div key={step.key} className="flex items-center gap-3 flex-1 last:flex-none">
              <div
                className={[
                  "size-14 rounded-2xl grid place-items-center transition-colors",
                  reached
                    ? step.key === "completed"
                      ? "bg-status-completed text-white"
                      : step.key === "enroute"
                        ? "bg-status-enroute text-white"
                        : "bg-status-pending text-white"
                    : "bg-surface-2 text-muted-foreground",
                  isCurrent ? "ring-4 ring-ai/30" : "",
                ].join(" ")}
              >
                <step.Icon className="size-6" />
              </div>
              <div className="text-base font-medium text-foreground whitespace-nowrap">
                {step.label}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={[
                    "h-1.5 flex-1 rounded-full mx-2 transition-colors",
                    i < idx ? "bg-ai" : "bg-border",
                  ].join(" ")}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
