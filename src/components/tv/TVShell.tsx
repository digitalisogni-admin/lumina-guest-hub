import type { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { RemoteHint } from "./RemoteHint";
import { useRemoteNav } from "@/hooks/useRemoteNav";
import { useMockSSE } from "@/hooks/useMockSSE";

export function TVShell({ children }: { children: ReactNode }) {
  // Activate global remote nav + mock real-time stream
  useRemoteNav();
  useMockSSE(true);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <TopBar />
      <main className="flex-1 px-12 py-8">{children}</main>
      <RemoteHint />
    </div>
  );
}
