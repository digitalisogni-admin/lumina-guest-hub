import { Outlet, Link, createRootRoute } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { GuestProvider } from "@/context/GuestContext";
import { ServiceProvider } from "@/context/ServiceContext";
import { AISessionProvider } from "@/context/AISessionContext";
import { ToastProvider } from "@/components/ui/ToastContext";
import { TVShell } from "@/components/tv/TVShell";
import { WalkthroughProvider } from "@/context/WalkthroughContext";
import { WalkthroughEngine } from "@/components/tv/WalkthroughEngine";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground font-display">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-base text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-4 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});


import { PortfolioDemoProvider } from "@/context/PortfolioDemoContext";
import { PortfolioSettings } from "@/components/portfolio/PortfolioSettings";
import { Screensaver } from "@/components/portfolio/Screensaver";
import { ProactiveToast } from "@/components/portfolio/ProactiveToast";
import { QRPairingModal } from "@/components/portfolio/QRPairingModal";

function RootComponent() {
  return (
    <WalkthroughProvider>
      <GuestProvider>
        <ServiceProvider>
          <AISessionProvider>
            <PortfolioDemoProvider>
              <ToastProvider>
                <TVShell>
                  <Outlet />
                </TVShell>
                <PortfolioSettings />
                <Screensaver />
                <ProactiveToast />
                <QRPairingModal />
                <WalkthroughEngine />
              </ToastProvider>
            </PortfolioDemoProvider>
          </AISessionProvider>
        </ServiceProvider>
      </GuestProvider>
    </WalkthroughProvider>
  );
}
