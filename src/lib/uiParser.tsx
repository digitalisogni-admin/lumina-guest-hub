import type { UIComponent } from "./types";
import { QuickReply } from "@/components/ui-cards/QuickReply";
import { RoomCard } from "@/components/ui-cards/RoomCard";
import { StatusTracker } from "@/components/ui-cards/StatusTracker";
import { Carousel } from "@/components/ui-cards/Carousel";

/**
 * Map an AI-returned ui_component { type, props } to the matching React
 * component. Unknown types are silently ignored — the chat still renders
 * the text response.
 */
export function renderUIComponent(
  ui: UIComponent | null | undefined,
  handlers?: { onQuickReply?: (option: string) => void; onAction?: () => void },
) {
  if (!ui) return null;
  switch (ui.type) {
    case "QuickReply":
      return <QuickReply options={ui.props.options} onSelect={handlers?.onQuickReply} />;
    case "RoomCard":
      return (
        <RoomCard
          title={ui.props.title}
          subtitle={ui.props.subtitle}
          price={ui.props.price}
          cta={ui.props.cta}
          onAction={handlers?.onAction}
        />
      );
    case "StatusTracker":
      return (
        <StatusTracker
          title={ui.props.title}
          status={ui.props.status}
          etaMinutes={ui.props.etaMinutes}
        />
      );
    case "Carousel":
      return <Carousel items={ui.props.items} />;
    default:
      return null;
  }
}
