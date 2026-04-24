import { useEffect } from "react";
import { useServices } from "@/context/ServiceContext";

/**
 * Simulates a real-time event stream (SSE/WebSocket) that advances
 * service request statuses every 8–12s:
 *   pending → enroute → completed
 *
 * In production this would subscribe to a real SSE endpoint; here we
 * tick locally so the Service Tracker feels alive.
 */
export function useMockSSE(enabled = true) {
  const { requests, updateStatus } = useServices();

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(
      () => {
        // Find the oldest request that is not completed and advance it.
        const candidates = requests.filter((r) => r.status !== "completed");
        if (candidates.length === 0) return;
        const target = candidates[Math.floor(Math.random() * candidates.length)];
        const next = target.status === "pending" ? "enroute" : "completed";
        updateStatus(target.id, next);
      },
      8000 + Math.random() * 4000,
    );
    return () => clearInterval(interval);
  }, [requests, updateStatus, enabled]);
}
