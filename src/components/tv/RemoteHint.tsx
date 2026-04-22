export function RemoteHint() {
  return (
    <footer
      aria-label="Remote controls"
      className="px-12 py-4 border-t border-border/60 bg-surface/60 backdrop-blur-sm flex items-center justify-center gap-8 text-sm text-muted-foreground"
    >
      <Hint keys={["←", "→", "↑", "↓"]} label="Navigate" />
      <Hint keys={["⏎"]} label="Select" />
      <Hint keys={["Esc"]} label="Back" />
      <span className="opacity-60">Lumina · Aurora Hotels</span>
    </footer>
  );
}

function Hint({ keys, label }: { keys: string[]; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {keys.map((k) => (
          <kbd
            key={k}
            className="min-w-[36px] h-9 px-2 rounded-md border border-border bg-surface text-foreground text-base font-medium grid place-items-center"
          >
            {k}
          </kbd>
        ))}
      </div>
      <span>{label}</span>
    </div>
  );
}
