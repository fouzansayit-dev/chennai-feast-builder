import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportAppError } from "../lib/error-reporting";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CateringChatbot from "../components/CateringChatbot";
import MobileFloatingBar from "../components/MobileFloatingBar";
import MobileAppHeader from "../components/MobileAppHeader";
import MobileAppTabBar from "../components/MobileAppTabBar";
import { PageFeedbackToolbarCSS as Agentation } from 'agentation';

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportAppError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "google-site-verification", content: "iskY54kELn4t9PipXtjEGZiUUkiwZaJje7X4ZOefxxM" },
      { name: "google-site-verification", content: "Sf6EtASU8psKTnEPh918aHupgQ3ZU4QjB7dl3Ur1KDg" },
      { title: "MCC Catering — Authentic South Indian Wedding Catering in Chennai" },
      { name: "description", content: "20+ years of premium wedding & event catering across Chennai. Banana-leaf feasts, live counters, and luxury reception buffets by D. Venkat." },
      { name: "author", content: "My Chennai Catering Services" },
      { property: "og:title", content: "MCC Catering — Premium South Indian Wedding Caterers, Chennai" },
      { property: "og:description", content: "Authentic wedding and event catering for weddings, receptions, and traditional celebrations in Chennai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "MCC Catering — Chennai" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-background text-foreground pb-20 lg:pb-0">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header />
        </div>
        
        {/* Mobile App Header */}
        <MobileAppHeader />

        <main className="flex-1 pt-[148px] lg:pt-[120px]">
          <Outlet />
        </main>

        {/* Desktop Footer */}
        <div className="hidden lg:block">
          <Footer />
        </div>

        {/* Mobile App Bottom Tab Bar */}
        <MobileAppTabBar />

        {/* Agentation Feedback Tool (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <Agentation
            onSubmit={(output, annotations) => {
              console.log('Agentation feedback submitted:', { output, annotations });
              // In a real app, you might send this to your backend API
              // fetch('/api/feedback', {
              //   method: 'POST',
              //   headers: { 'Content-Type': 'application/json' },
              //   body: JSON.stringify({ output, annotations })
              // });
            }}
          />
        )}

        <CateringChatbot />
      </div>
    </QueryClientProvider>
  );
}
