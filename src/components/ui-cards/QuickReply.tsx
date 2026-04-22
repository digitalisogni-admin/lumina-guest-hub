export function QuickReply({
  options,
  onSelect,
}: {
  options: string[];
  onSelect?: (option: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="Quick replies">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onSelect?.(opt)}
          className="min-h-[64px] px-6 rounded-2xl bg-ai-soft text-ai font-semibold text-lg border-2 border-transparent hover:border-ai/40 transition-colors"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
