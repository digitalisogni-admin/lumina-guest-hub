import { useState, useRef, useEffect, ReactNode } from "react";

export function TooltipBubble({
  content,
  children,
  delayMs = 1500,
}: {
  content: string;
  children: ReactNode;
  delayMs?: number;
}) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const startTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, delayMs);
  };

  const clearTimer = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={startTimer}
      onMouseLeave={clearTimer}
      onFocusCapture={startTimer}
      onBlurCapture={clearTimer}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 animate-in fade-in zoom-in-95 duration-200 pointer-events-none whitespace-nowrap">
          <div className="px-5 py-3 rounded-2xl bg-surface-2/95 backdrop-blur-xl border border-white/10 tv-shadow-lg text-white font-medium text-lg relative">
            {content}
            {/* Tail arrow */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 bg-surface-2/95 border-r border-b border-white/10 rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
}
