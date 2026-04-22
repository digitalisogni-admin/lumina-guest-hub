export function Carousel({
  items,
}: {
  items: Array<{ title: string; subtitle?: string; tag?: string; image?: string }>;
}) {
  return (
    <div
      className="flex gap-4 overflow-x-auto pb-3 -mx-2 px-2 snap-x snap-mandatory"
      role="list"
    >
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          role="listitem"
          className="snap-start shrink-0 w-[320px] text-left rounded-3xl bg-surface border border-border tv-shadow overflow-hidden hover:border-ai/40 transition-colors"
        >
          <div className="h-28 bg-gradient-to-br from-ai/70 to-primary" aria-hidden />
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
