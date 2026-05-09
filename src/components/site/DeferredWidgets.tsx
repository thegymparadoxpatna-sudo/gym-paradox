import { useEffect, useState, type ComponentType } from "react";

/**
 * Loads non-critical floating UI (WhatsApp button, mobile CTA, offer banner,
 * exit-intent modal) only after the page is idle. Keeps these widgets out of
 * the main JS bundle to reduce unused JavaScript on first paint.
 */
export function DeferredWidgets() {
  const [mods, setMods] = useState<{
    WhatsAppButton: ComponentType;
    MobileCTA: ComponentType;
    OfferBanner: ComponentType;
    ExitIntent: ComponentType;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      Promise.all([
        import("@/components/site/WhatsAppButton"),
        import("@/components/site/MobileCTA"),
        import("@/components/site/OfferBanner"),
        import("@/components/site/ExitIntent"),
      ]).then(([a, b, c, d]) => {
        if (cancelled) return;
        setMods({
          WhatsAppButton: a.WhatsAppButton,
          MobileCTA: b.MobileCTA,
          OfferBanner: c.OfferBanner,
          ExitIntent: d.ExitIntent,
        });
      });
    };
    const ric = (window as any).requestIdleCallback as
      | ((cb: () => void, opts?: { timeout: number }) => number)
      | undefined;
    const handle = ric
      ? ric(load, { timeout: 2500 })
      : window.setTimeout(load, 1500);
    return () => {
      cancelled = true;
      if (ric && (window as any).cancelIdleCallback) {
        (window as any).cancelIdleCallback(handle);
      } else {
        window.clearTimeout(handle as number);
      }
    };
  }, []);

  if (!mods) return null;
  const { WhatsAppButton, MobileCTA, OfferBanner, ExitIntent } = mods;
  return (
    <>
      <WhatsAppButton />
      <MobileCTA />
      <OfferBanner />
      <ExitIntent />
    </>
  );
}