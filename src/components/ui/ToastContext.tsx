import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { CheckCircle2 } from "lucide-react";

type ToastType = "success" | "error" | "info";
type ToastMessage = { id: string; message: string; type: ToastType };

const ToastContext = createContext<{ showToast: (msg: string, type?: ToastType) => void } | null>(
  null,
);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-5 fade-in zoom-in-95 duration-300">
          <div className="bg-surface-2/95 backdrop-blur-md border border-white/10 tv-shadow-lg rounded-2xl p-4 pr-6 flex items-center gap-4">
            <div
              className={`size-10 rounded-xl grid place-items-center ${
                toast.type === "error"
                  ? "bg-red-500/20 text-red-500"
                  : toast.type === "info"
                    ? "bg-blue-500/20 text-blue-500"
                    : "bg-status-completed/20 text-status-completed"
              }`}
            >
              <CheckCircle2 className="size-6" />
            </div>
            <div className="text-xl font-semibold text-white">{toast.message}</div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
