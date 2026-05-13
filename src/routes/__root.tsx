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
import frauncesWghtUrl from "@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { PageTransition } from "@/components/site/PageTransition";
import { RouteProgress } from "@/components/site/RouteProgress";
import { DeferredWidgets } from "@/components/site/DeferredWidgets";
import { SITE } from "@/lib/site/config";

const SITE_URL = "https://thegymparadox.com";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

// GA4 Measurement ID. Override via VITE_GA_MEASUREMENT_ID env var if needed.
const GA_ID = ((import.meta as any).env?.VITE_GA_MEASUREMENT_ID as string | undefined) || "G-D21P41JFT7";
const PIXEL_ID = (import.meta as any).env?.VITE_META_PIXEL_ID as string | undefined;

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: SITE.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: OG_IMAGE,
  telephone: SITE.phone,
  email: SITE.email,
  priceRange: "₹₹₹",
  description:
    "A premium fitness destination in Patna offering strength training, boxing & CrossFit, HIIT, Zumba & aerobic, and personal training.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3rd Floor, Uno Business Centre, Patliputra Colony",
    addressLocality: "Patna",
    addressRegion: "Bihar",
    postalCode: "800013",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    // Approx. Patliputra Colony, Patna — replace with exact coords at deploy.
    latitude: 25.6232,
    longitude: 85.1015,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "06:00",
      closes: "22:00",
    },
  ],
  sameAs: [SITE.instagram],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "220",
    bestRating: "5",
  },
};

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
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "The Gym Paradox · Pain Pays Off · Patna" },
      { name: "description", content: "A premium fitness destination in Patna. World-class equipment, scientific training, premium interiors. Pain pays off." },
      { name: "theme-color", content: "#0A0A0A" },
      { name: "author", content: SITE.name },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "IN-BR" },
      { name: "geo.placename", content: "Patna, Bihar, India" },
      { name: "geo.position", content: "25.6232;85.1015" },
      { name: "ICBM", content: "25.6232, 85.1015" },
      { property: "og:title", content: "The Gym Paradox · Pain Pays Off · Patna" },
      { property: "og:description", content: "A premium fitness destination in Patna. World-class equipment, scientific training, premium interiors. Pain pays off." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "The Gym Paradox · Pain Pays Off · Patna" },
      { name: "twitter:description", content: "A premium fitness destination in Patna. World-class equipment, scientific training, premium interiors. Pain pays off." },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/logo-180.png" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "preconnect", href: "https://cdn.gpteng.co", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://images.unsplash.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://images.unsplash.com" },
      { rel: "preload", href: frauncesWghtUrl, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORG_JSONLD),
      },
      ...(GA_ID
        ? [
            { src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, async: true },
            {
              children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`,
            },
          ]
        : []),
      ...(PIXEL_ID
        ? [
            {
              children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`,
            },
          ]
        : []),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.22em]"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <RouteProgress />
        <Nav />
        <main id="main-content" className="flex-1">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
        <DeferredWidgets />
      </div>
    </QueryClientProvider>
  );
}
