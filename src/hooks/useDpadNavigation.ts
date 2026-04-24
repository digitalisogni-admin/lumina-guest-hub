import { useEffect, useState } from "react";

/**
 * A custom hook to handle spatial navigation for TV remotes.
 *
 * It manages a set of "focusable" elements and handles
 * ArrowUp, ArrowDown, ArrowLeft, ArrowRight, and Enter/Space keys.
 *
 * Elements should have a data-focusable attribute and optionally data-focus-group.
 */
export function useDpadNavigation() {
  const [focusedId, setFocusedId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const focusable = Array.from(document.querySelectorAll("[data-focusable]")) as HTMLElement[];
      if (focusable.length === 0) return;

      const current = document.activeElement as HTMLElement;

      // If nothing is focused, focus the first element on any arrow key
      if (!current || !current.hasAttribute("data-focusable")) {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
          focusable[0].focus();
          e.preventDefault();
        }
        return;
      }

      let nextIndex = -1;

      switch (e.key) {
        case "ArrowRight":
          nextIndex = getNextSpatialIndex(current, focusable, "right");
          break;
        case "ArrowLeft":
          nextIndex = getNextSpatialIndex(current, focusable, "left");
          break;
        case "ArrowDown":
          nextIndex = getNextSpatialIndex(current, focusable, "down");
          break;
        case "ArrowUp":
          nextIndex = getNextSpatialIndex(current, focusable, "up");
          break;
        case "Enter":
          // Special handling for inputs to not trigger click on Enter if desired
          // but usually click() is fine for TV buttons
          if (current.tagName !== "INPUT") {
            current.click();
          }
          break;
      }

      if (nextIndex !== -1) {
        focusable[nextIndex].focus();
        setFocusedId(focusable[nextIndex].id || null);
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { focusedId };
}

function getNextSpatialIndex(
  current: HTMLElement,
  all: HTMLElement[],
  direction: "up" | "down" | "left" | "right",
): number {
  const currentRect = current.getBoundingClientRect();
  const currentGroup = current.getAttribute("data-focus-group");
  const isTrap = current.hasAttribute("data-focus-trap");

  const currentCenter = {
    x: currentRect.left + currentRect.width / 2,
    y: currentRect.top + currentRect.height / 2,
  };

  let bestIndex = -1;
  let bestScore = Infinity;

  all.forEach((el, index) => {
    if (el === current) return;

    // Focus Group Logic:
    // If we are in a trap, we can only move within the same group
    const elGroup = el.getAttribute("data-focus-group");
    if (isTrap && elGroup !== currentGroup) return;

    const rect = el.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const dx = center.x - currentCenter.x;
    const dy = center.y - currentCenter.y;

    let isMatch = false;

    // Directional filters with improved cone of vision
    switch (direction) {
      case "right":
        isMatch = dx > 0 && Math.abs(dy) < dx * 0.8; // 40 degree cone
        break;
      case "left":
        isMatch = dx < 0 && Math.abs(dy) < Math.abs(dx) * 0.8;
        break;
      case "down":
        isMatch = dy > 0 && Math.abs(dx) < dy * 0.8;
        break;
      case "up":
        isMatch = dy < 0 && Math.abs(dx) < Math.abs(dy) * 0.8;
        break;
    }

    if (isMatch) {
      // Score calculation: distance + alignment penalty
      // Elements directly in line with the direction are preferred
      const distance = Math.sqrt(dx * dx + dy * dy);
      const alignmentPenalty =
        direction === "left" || direction === "right" ? Math.abs(dy) * 2 : Math.abs(dx) * 2;

      const groupBonus = elGroup === currentGroup && currentGroup ? -50 : 0;
      const score = distance + alignmentPenalty + groupBonus;

      if (score < bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    }
  });

  return bestIndex;
}
