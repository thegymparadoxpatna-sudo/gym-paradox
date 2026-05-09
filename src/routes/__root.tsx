import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { ExitIntent } from "@/components/site/ExitIntent";
import { OfferBanner } from "@/components/site/OfferBanner";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Cursor } from "@/components/site/Cursor";
import { MobileCTA } from "@/components/site/MobileCTA";
import { PageTransition } from "@/components/site/PageTransition";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-background">
      <div className="text-center max-w-md">
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary">404 — Lost in the paradox</p>
        <h1 className="mt-6 font-display text-7xl">Not<em className="display-italic text-primary"> here.</em></h1>
        <p className="mt-4 text-sm text-muted-foreground">This page doesn't exist. Yet.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-primary-foreground">Return home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-background">
      <div className="text-center">
        <h1 className="font-display text-4xl">Something broke.</h1>
        <p className="mt-3 text-sm text-muted-foreground">Try again — or return home.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-primary px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] text-primary-foreground">Retry</button>
          <a href="/" className="rounded-full border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.25em]">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Gym Paradox — Pain Pays Off" },
      { name: "description", content: "Patna's premium fitness destination. World-class equipment. Scientific training." },
      { name: "theme-color", content: "#0A0A0A" },
      { property: "og:title", content: "The Gym Paradox — Pain Pays Off" },
      { property: "og:description", content: "Patna's premium fitness destination. World-class equipment. Scientific training." },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/logo-180.png" },
      { rel: "manifest", href: "/manifest.json" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
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
      <div className="min-h-screen flex flex-col">
        <ScrollProgress />
        <Nav />
        <main className="flex-1">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
        <WhatsAppButton />
        <MobileCTA />
        <OfferBanner />
        <ExitIntent />
        <Cursor />
      </div>
    </QueryClientProvider>
  );
}
