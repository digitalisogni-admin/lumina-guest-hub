import type { BackendAction, UIComponent } from "./types";
import { QuickReply } from "@/components/ui-cards/QuickReply";
import { RoomCard } from "@/components/ui-cards/RoomCard";
import { StatusTracker } from "@/components/ui-cards/StatusTracker";
import { Carousel } from "@/components/ui-cards/Carousel";

interface Handlers {
  onQuickReply?: (option: string) => void;
  onAction?: (action: BackendAction) => void;
}

/**
 * Map a single AI-returned ui_component { type, props } to its React
 * component. Unknown types render nothing.
 */
export function renderUIComponent(ui: UIComponent, handlers?: Handlers) {
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
          onAction={ui.props.action ? () => handlers?.onAction?.(ui.props.action!) : undefined}
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
      return (
        <Carousel
          items={ui.props.items}
          onItemSelect={(i) => {
            const action = ui.props.items[i]?.action;
            if (action) handlers?.onAction?.(action);
          }}
        />
      );
    default:
      return null;
  }
}

/** Render a list of cards stacked vertically with consistent spacing. */
export function renderUIComponents(
  list: UIComponent[] | undefined,
  handlers?: Handlers,
) {
  if (!list || list.length === 0) return null;
  return (
    <div className="flex flex-col gap-4">
      {list.map((ui, i) => (
        <div key={i}>{renderUIComponent(ui, handlers)}</div>
      ))}
    </div>
  );
}
