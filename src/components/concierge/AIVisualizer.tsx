import { useEffect, useState } from "react";

export function AIVisualizer({ state = "idle" }: { state: "idle" | "thinking" | "speaking" }) {
  const active = state !== "idle";

  // Configuration for the different states
  const config = {
    idle: {
      scale: "scale-100",
      opacity: "opacity-40",
      blur: "blur-2xl",
      coreColor: "from-ai/30 to-blue-500/30",
      ringSpeed: "duration-[10s]",
      pulseSpeed: "animate-pulse",
    },
    thinking: {
      scale: "scale-110",
      opacity: "opacity-80",
      blur: "blur-xl",
      coreColor: "from-ai/80 via-purple-500/80 to-blue-500/80",
      ringSpeed: "duration-[3s]",
      pulseSpeed: "animate-pulse", // Default pulse is 2s, we'll use custom keyframes if needed, but pulse is fine
    },
    speaking: {
      scale: "scale-[1.25]",
      opacity: "opacity-100",
      blur: "blur-lg",
      coreColor: "from-amber-400 via-ai to-purple-400",
      ringSpeed: "duration-[2s]",
      pulseSpeed: "animate-none", // We'll rely on the scale and a custom rapid pulse
    },
  };

  const current = config[state];

  return (
    <div className="relative size-80 flex items-center justify-center">
      {/* Outer Ambient Glow */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${current.scale} ${current.opacity} ${current.blur} bg-gradient-to-tr ${current.coreColor}`}
      />

      {/* Rotating Energy Rings */}
      <div
        className={`absolute inset-4 rounded-full border-2 border-transparent border-t-white/30 border-l-white/10 animate-spin transition-all ease-in-out ${current.ringSpeed} ${active ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`absolute inset-8 rounded-full border-2 border-transparent border-b-ai/50 border-r-ai/20 animate-spin transition-all ease-in-out ${current.ringSpeed} [animation-direction:reverse] ${active ? "opacity-100" : "opacity-0"}`}
      />

      {/* Core Orb */}
      <div
        className={`relative size-32 rounded-full transition-all duration-700 ease-in-out ${current.scale}`}
      >
        {/* Core solid glow */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${current.coreColor} blur-md transition-all duration-700`}
        />

        {/* Inner bright core */}
        <div
          className={`absolute inset-2 rounded-full bg-white/40 blur-sm transition-all duration-500 ${state === "speaking" ? "scale-110 bg-white/60" : "scale-100"}`}
        />

        {/* Pulsing overlay for speaking state to mimic waveform amplitude */}
        {state === "speaking" && (
          <>
            <div className="absolute inset-0 rounded-full bg-amber-200/50 blur-lg animate-ping [animation-duration:1s]" />
            <div className="absolute inset-0 rounded-full bg-white/30 blur-xl animate-ping [animation-duration:1.5s]" />
          </>
        )}

        {/* Breathing overlay for idle/thinking */}
        {(state === "idle" || state === "thinking") && (
          <div
            className={`absolute inset-0 rounded-full bg-white/20 blur-lg ${current.pulseSpeed}`}
          />
        )}
      </div>
    </div>
  );
}
