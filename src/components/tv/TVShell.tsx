import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useRemoteNav } from "@/hooks/useRemoteNav";
import { useMockSSE } from "@/hooks/useMockSSE";
import { TopBar } from "./TopBar";
import { WelcomeAnimation } from "./WelcomeAnimation";
import { RemoteHint } from "./RemoteHint";
import { useWalkthrough } from "@/context/WalkthroughContext";
import { useGuest } from "@/context/GuestContext";
import { Screensaver } from "./Screensaver";
import { AlarmModal } from "./AlarmModal";
import { usePortfolioDemo } from "@/context/PortfolioDemoContext";

export function TVShell({ children }: { children: ReactNode }) {
  const { startFlow } = useWalkthrough();
  const { guest, setLanguage } = useGuest();
  const [showScreensaver, setShowScreensaver] = useState(false);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const { theme } = usePortfolioDemo();

  // Activate global remote nav + mock real-time stream
  useRemoteNav();
  useMockSSE(true);

  // 13. Multi-Language Auto-Switch
  useEffect(() => {
    if (guest.languagePreference && guest.languagePreference !== "en") {
      setLanguage(guest.languagePreference as any);
    }
  }, [guest.languagePreference, setLanguage]);

  // 3. Cinematic Screensaver Auto-trigger (2 minutes)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timer);
      if (!showScreensaver) {
        timer = setTimeout(() => setShowScreensaver(true), 120000); // 2 minutes
      }
    };

    const events = ["keydown", "mousedown", "mousemove", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [showScreensaver]);

  useEffect(() => {
    const hasCompleted = localStorage.getItem("lumina_onboarding_completed");
    if (!hasCompleted) {
      // Trigger welcome flow after initial animations settle
      const timer = setTimeout(() => {
        startFlow("initial-welcome");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [startFlow]);

  // Global listener for alarm modal (can be triggered by custom events if needed)
  useEffect(() => {
    const handleOpenAlarm = () => setShowAlarmModal(true);
    window.addEventListener("open-smart-alarm", handleOpenAlarm);
    return () => window.removeEventListener("open-smart-alarm", handleOpenAlarm);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col bg-background text-foreground overflow-hidden transition-colors duration-500 theme-${theme}`}
    >
      <WelcomeAnimation />
      <TopBar onOpenAlarm={() => setShowAlarmModal(true)} />
      <main className="flex-1 px-12 py-8">{children}</main>
      <RemoteHint />

      {showScreensaver && <Screensaver onDismiss={() => setShowScreensaver(false)} />}

      <AlarmModal isOpen={showAlarmModal} onClose={() => setShowAlarmModal(false)} />
    </div>
  );
}
