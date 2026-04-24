import { useEffect, useRef } from "react";

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => confirmRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-surface/80 backdrop-blur-2xl border border-white/10 tv-shadow-xl rounded-[32px] p-10 max-w-2xl w-full text-center relative animate-in zoom-in-95 duration-300">
        <h2 className="text-4xl font-display text-white mb-4">{title}</h2>
        <p className="text-xl text-white/70 mb-10">{description}</p>

        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-xl min-w-[180px] hover:bg-white/10 transition-colors"
            data-focusable
          >
            {cancelText}
          </button>
          <button
            type="button"
            ref={confirmRef}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-8 py-4 rounded-2xl bg-ai text-white font-semibold text-xl min-w-[180px] hover:bg-ai/90 transition-colors"
            data-focusable
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
