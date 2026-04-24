import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

/**
 * Global D-pad / remote navigation.
 *
 * - Arrow keys move focus to the geometrically nearest focusable in that direction
 * - Enter activates focused element (native behavior)
 * - Escape navigates back via router history
 *
 * Spatial focus model: we measure each focusable's bounding rect and
 * pick the candidate that is (a) in the desired direction relative to
 * the current focus, and (b) closest by weighted distance (axis-aligned
 * displacement weighted heavier than orthogonal drift).
 */

type Dir = "up" | "down" | "left" | "right";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function getFocusables(): HTMLElement[] {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  return nodes.filter((el) => {
    if (el.hasAttribute("disabled")) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return false;
    const style = window.getComputedStyle(el);
    if (style.visibility === "hidden" || style.display === "none") return false;
    return true;
  });
}

function center(rect: DOMRect) {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function findNext(current: HTMLElement, dir: Dir): HTMLElement | null {
  const all = getFocusables().filter((el) => el !== current);
  const cRect = current.getBoundingClientRect();
  const c = center(cRect);

  let best: HTMLElement | null = null;
  let bestScore = Infinity;

  for (const el of all) {
    const r = el.getBoundingClientRect();
    const p = center(r);
    const dx = p.x - c.x;
    const dy = p.y - c.y;

    let inDir = false;
    let primary = 0;
    let orth = 0;

    switch (dir) {
      case "right":
        inDir = r.left >= cRect.right - 4;
        primary = Math.max(0, r.left - cRect.right);
        orth = Math.abs(dy);
        break;
      case "left":
        inDir = r.right <= cRect.left + 4;
        primary = Math.max(0, cRect.left - r.right);
        orth = Math.abs(dy);
        break;
      case "down":
        inDir = r.top >= cRect.bottom - 4;
        primary = Math.max(0, r.top - cRect.bottom);
        orth = Math.abs(dx);
        break;
      case "up":
        inDir = r.bottom <= cRect.top + 4;
        primary = Math.max(0, cRect.top - r.bottom);
        orth = Math.abs(dx);
        break;
    }
    if (!inDir) continue;
    // Weight orthogonal drift heavily so we stay in column/row.
    const score = primary + orth * 2;
    if (score < bestScore) {
      bestScore = score;
      best = el;
    }
  }
  return best;
}

export function useRemoteNav() {
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't hijack arrow keys inside text inputs
      const target = e.target as HTMLElement | null;
      const isTextInput =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if (e.key === "Escape") {
        e.preventDefault();
        router.history.back();
        return;
      }

      if (isTextInput) return;

      let dir: Dir | null = null;
      if (e.key === "ArrowUp") dir = "up";
      else if (e.key === "ArrowDown") dir = "down";
      else if (e.key === "ArrowLeft") dir = "left";
      else if (e.key === "ArrowRight") dir = "right";
      if (!dir) return;

      const current = (document.activeElement as HTMLElement) || null;
      let next: HTMLElement | null = null;
      if (current && current !== document.body) {
        next = findNext(current, dir);
      } else {
        // No focus yet — focus the first focusable
        next = getFocusables()[0] ?? null;
      }
      if (next) {
        e.preventDefault();
        next.focus();
        next.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);
}
