import { ArrowRight } from "lucide-react";

export function RoomCard({
  title,
  subtitle,
  price,
  cta = "Reserve",
  onAction,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  price?: string;
  cta?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-3xl bg-surface border border-border tv-shadow overflow-hidden max-w-[560px]">
      <div className="h-32 bg-gradient-to-br from-ai/80 via-ai to-primary" aria-hidden />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold text-foreground font-display">{title}</div>
            {subtitle && <div className="text-base text-muted-foreground mt-1">{subtitle}</div>}
          </div>
          {price && <div className="text-2xl font-semibold text-ai">{price}</div>}
        </div>
        <button
          type="button"
          onClick={onAction}
          className="mt-5 min-h-[64px] w-full rounded-2xl bg-primary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
        >
          {cta} <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
