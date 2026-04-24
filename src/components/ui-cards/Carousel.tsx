export function Carousel({
  items,
  onItemSelect,
}: {
  items: Array<{ title: string; subtitle?: string; tag?: string; image?: string }>;
  onItemSelect?: (index: number) => void;
}) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-3 -mx-2 px-2 snap-x snap-mandatory" role="list">
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          role="listitem"
          onClick={() => onItemSelect?.(i)}
          className="snap-start shrink-0 w-[320px] text-left rounded-3xl bg-surface border border-border tv-shadow overflow-hidden hover:border-ai/40 transition-colors"
        >
          <div className="h-28 bg-gradient-to-br from-ai/70 via-ai to-primary relative" aria-hidden>
            <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
          </div>
          <div className="p-5">
            {item.tag && (
              <div className="inline-block text-xs font-semibold uppercase tracking-wide text-ai bg-ai-soft px-2.5 py-1 rounded-full mb-2">
                {item.tag}
              </div>
            )}
            <div className="text-xl font-semibold text-foreground font-display">{item.title}</div>
            {item.subtitle && (
              <div className="text-sm text-muted-foreground mt-1">{item.subtitle}</div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
