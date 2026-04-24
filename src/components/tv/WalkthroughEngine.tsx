import { useEffect, useState } from "react";
import { useWalkthrough, FlowId } from "@/context/WalkthroughContext";
import { ChevronRight, X, Accessibility, Mic, Map, Utensils, CalendarPlus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

type Step = {
  title: string;
  description: string;
  selector?: string;
  icon?: any;
};

const FLOWS: Record<Exclude<FlowId, null>, Step[]> = {
  "initial-welcome": [
    {
      title: "Welcome to Lumina",
      description: "Your journey begins here. Allow us to guide you through your digital suite.",
    },
    {
      title: "Personal Concierge",
      description: "Your AI companion, Lumina, is always at your command for any request.",
      selector: "[data-tour='concierge-rail']",
    },
    {
      title: "Master Your Environment",
      description: "Tailor your suite's lighting, climate, and privacy with absolute precision.",
      selector: "[data-tour='smart-room']",
    },
    {
      title: "Curated Experiences",
      description: "Indulge in a world of fine dining, wellness, and local excursions.",
      selector: "[data-tour='nav-services']",
    },
    {
      title: "Explore the Globe",
      description: "Discover our most prestigious sister properties around the world.",
      selector: "[data-tour='nav-stay']",
    },
    {
      title: "At Your Service",
      description:
        "Should you require assistance or wish to enable accessibility features, we are here.",
      selector: "[data-tour='accessibility']",
    },
  ],
  "book-restaurant": [
    {
      title: "Fine Dining",
      description: "Explore a curated selection of culinary excellence.",
      icon: Utensils,
    },
    {
      title: "Our Collection",
      description: "Begin by exploring our signature restaurants.",
      selector: "[data-tour='nav-services']",
    },
  ],
  "book-excursion": [
    {
      title: "Local Discovery",
      description: "Venture beyond the resort with our hand-picked excursions.",
      icon: Map,
    },
    {
      title: "Interactive Map",
      description: "Locate your next adventure on our interactive resort map.",
      selector: "[data-tour='smart-room']",
    }, // Fallback to a dashboard item
  ],
  "use-ai-concierge": [
    {
      title: "AI Concierge",
      description: "Experience the future of hospitality with Lumina AI.",
      icon: Mic,
    },
    {
      title: "Seamless Interaction",
      description: "Speak naturally to request service, information, or recommendations.",
      selector: "[data-tour='concierge-rail']",
    },
  ],
  "book-next-trip": [
    {
      title: "Global Collection",
      description: "Plan your next escape within the Aurora portfolio.",
      icon: CalendarPlus,
    },
    {
      title: "The Stay Hub",
      description: "Your gateway to elite properties worldwide.",
      selector: "[data-tour='nav-stay']",
    },
  ],
};

export function WalkthroughEngine() {
  const { activeFlow, stopFlow } = useWalkthrough();
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (activeFlow) setCurrentStep(0);
  }, [activeFlow]);

  useEffect(() => {
    if (!activeFlow) return;
    const step = FLOWS[activeFlow][currentStep];
    if (!step.selector) {
      setTargetRect(null);
      return;
    }

    const update = () => {
      const el = document.querySelector(step.selector!);
      if (el) setTargetRect(el.getBoundingClientRect());
      else setTargetRect(null);
    };

    update();
    const interval = setInterval(update, 500);
    window.addEventListener("resize", update);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", update);
    };
  }, [activeFlow, currentStep]);

  if (!activeFlow) return null;

  const steps = FLOWS[activeFlow];
  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      if (activeFlow === "initial-welcome")
        localStorage.setItem("lumina_onboarding_completed", "true");
      stopFlow();
    } else {
      setCurrentStep((c) => c + 1);
    }
  };

  const getTooltipStyle = () => {
    if (!targetRect)
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "420px" };

    const padding = 20;
    const width = 380;
    let top = targetRect.bottom + padding;
    let left = targetRect.left + targetRect.width / 2 - width / 2;

    if (top + 280 > window.innerHeight) top = targetRect.top - 280 - padding;
    left = Math.max(padding, Math.min(left, window.innerWidth - width - padding));

    return { top: `${top}px`, left: `${left}px`, width: `${width}px` };
  };

  return (
    <div className="fixed inset-0 z-[150] overflow-hidden pointer-events-none">
      {/* Cinematic Soft Spotlight */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-all duration-700 pointer-events-auto">
        <svg className="w-full h-full">
          <defs>
            <mask id="luxury-mask">
              <rect width="100%" height="100%" fill="white" />
              {targetRect && (
                <rect
                  x={targetRect.left - 12}
                  y={targetRect.top - 12}
                  width={targetRect.width + 24}
                  height={targetRect.height + 24}
                  rx="24"
                  fill="black"
                  className="transition-all duration-700 ease-in-out"
                />
              )}
            </mask>
            <filter id="glow">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="black" opacity="0.4" mask="url(#luxury-mask)" />
          {targetRect && (
            <rect
              x={targetRect.left - 12}
              y={targetRect.top - 12}
              width={targetRect.width + 24}
              height={targetRect.height + 24}
              rx="24"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              className="transition-all duration-700 ease-in-out"
            />
          )}
        </svg>
      </div>

      {/* Luxury Tooltip */}
      <div
        className="absolute z-[160] transition-all duration-700 ease-out pointer-events-auto"
        style={getTooltipStyle()}
      >
        <div className="bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 rounded-[28px] p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative flex flex-col items-center text-center">
          {/* Subtle Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
            <div
              className="h-full bg-ai transition-all duration-1000"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="w-full flex justify-between items-center mb-6 opacity-40">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Lumina Tour</span>
            <button
              onClick={() => stopFlow()}
              className="text-[10px] font-bold tracking-widest uppercase hover:text-white transition-colors"
            >
              Skip
            </button>
          </div>

          {step.icon && (
            <div className="size-14 rounded-2xl bg-white/5 grid place-items-center mb-6 text-white border border-white/5">
              <step.icon className="size-6 opacity-80" />
            </div>
          )}

          <h2 className="text-3xl font-display text-white mb-3 tracking-wide">{step.title}</h2>
          <p className="text-base text-white/50 leading-relaxed font-light">{step.description}</p>

          <button
            onClick={handleNext}
            className="mt-8 w-full h-14 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all focus-tv outline-none"
            data-focusable
            autoFocus
          >
            {isLast ? "Begin Experience" : "Continue"} <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Pointer Arrow */}
        {targetRect && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a0a0a]/90 rotate-45 border-l border-t border-white/10 transition-all duration-700 ${targetRect.bottom < (getTooltipStyle().top as any).replace("px", "") ? "top-[-9px]" : "bottom-[-9px] rotate-[225deg]"}`}
          />
        )}
      </div>
    </div>
  );
}
