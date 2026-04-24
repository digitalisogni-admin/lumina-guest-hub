import { useState } from "react";
import { X, Bell, Clock, Sun, Music, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/ToastContext";

export function AlarmModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [time, setTime] = useState("07:30");
  const { showToast } = useToast();

  const handleSave = () => {
    showToast(
      `Alarm set for ${time}. You will be woken up gently with sunrise lighting.`,
      "success",
    );
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[800px] bg-surface/90 backdrop-blur-3xl border-white/10 rounded-[40px] p-10 tv-shadow-2xl">
        <DialogTitle className="sr-only">Set Wake-Up Alarm</DialogTitle>

        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-ai/20 text-ai grid place-items-center">
              <Bell className="size-8" />
            </div>
            <div>
              <h2 className="text-4xl font-display text-white">Smart Wake-Up</h2>
              <p className="text-white/50">Experience a natural start to your day.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-12 rounded-full bg-white/5 flex items-center justify-center text-white focus-tv"
            data-focusable
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold uppercase tracking-widest text-white/40 mb-3 block">
                Wake-up Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-5xl font-display text-white outline-none focus:border-ai transition-colors"
                data-focusable
              />
            </div>

            <div className="space-y-4">
              <AlarmOption
                icon={Sun}
                title="Sunrise Simulation"
                desc="Lights slowly brighten 15m before"
                active
              />
              <AlarmOption
                icon={Music}
                title="Nature Sounds"
                desc="Soft forest birds & stream"
                active
              />
            </div>
          </div>

          <div className="bg-white/5 rounded-[32px] p-8 flex flex-col justify-between border border-white/10">
            <div>
              <h3 className="text-xl font-display text-white mb-2">The Experience</h3>
              <p className="text-white/60 leading-relaxed text-base">
                Your room will begin to wake you up 20 minutes before your alarm. Curtains will open
                slightly, and the "Morning Glow" lighting scene will gradually intensify.
              </p>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-white text-black h-16 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              data-focusable
            >
              Set Smart Alarm <ChevronRight className="size-6" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AlarmOption({
  icon: Icon,
  title,
  desc,
  active,
}: {
  icon: any;
  title: string;
  desc: string;
  active?: boolean;
}) {
  return (
    <div
      className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${active ? "bg-ai/10 border-ai/30" : "bg-white/5 border-white/5"}`}
    >
      <div
        className={`size-10 rounded-xl grid place-items-center ${active ? "bg-ai text-white" : "bg-white/10 text-white/40"}`}
      >
        <Icon className="size-5" />
      </div>
      <div>
        <div className={`font-semibold ${active ? "text-white" : "text-white/40"}`}>{title}</div>
        <div className="text-xs text-white/40">{desc}</div>
      </div>
    </div>
  );
}
