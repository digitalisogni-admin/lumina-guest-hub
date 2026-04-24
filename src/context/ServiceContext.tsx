import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { SEED_REQUESTS } from "@/lib/mockData";
import type { ServiceRequest, ServiceStatus } from "@/lib/types";

interface ServiceContextValue {
  requests: ServiceRequest[];
  createRequest: (
    r: Omit<ServiceRequest, "id" | "createdAt" | "status"> & { status?: ServiceStatus },
  ) => ServiceRequest;
  updateStatus: (id: string, status: ServiceStatus) => void;
}

const ServiceContext = createContext<ServiceContextValue | null>(null);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<ServiceRequest[]>(SEED_REQUESTS);

  const createRequest = useCallback<ServiceContextValue["createRequest"]>((r) => {
    const next: ServiceRequest = {
      id: `req_${Math.random().toString(36).slice(2, 9)}`,
      createdAt: Date.now(),
      status: r.status ?? "pending",
      ...r,
    };
    setRequests((prev) => [next, ...prev]);
    return next;
  }, []);

  const updateStatus = useCallback<ServiceContextValue["updateStatus"]>((id, status) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }, []);

  const value = useMemo(
    () => ({ requests, createRequest, updateStatus }),
    [requests, createRequest, updateStatus],
  );

  return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>;
}

export function useServices() {
  const ctx = useContext(ServiceContext);
  if (!ctx) throw new Error("useServices must be used inside ServiceProvider");
  return ctx;
}
