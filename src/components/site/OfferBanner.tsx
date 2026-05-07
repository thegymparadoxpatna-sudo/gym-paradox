import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function OfferBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("tgp-offer-dismissed")) return;
    const t = setTimeout(() => setOpen(true), 3500);
    return () => clearTimeout(t);
  }, []);
  if (!open) return null;
  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm animate-fade-in">
      <div className="relative overflow-hidden rounded-md border border-border bg-carbon/90 backdrop-blur-xl p-4 shadow-elev">
        <div className="absolute inset-0 -z-10 gradient-mesh opacity-50" />
        <div className="flex items-start gap-3">
          <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-sm gradient-electric shrink-0">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-gradient">Founding offer</p>
            <p className="mt-1 text-sm leading-snug">20% off the first 100 annual memberships.</p>
            <Link to="/membership" className="mt-2 inline-flex items-center gap-1 text-xs font-medium underline underline-offset-4 decoration-electric/60 hover:decoration-electric">
              Claim before it ends
            </Link>
          </div>
          <button onClick={() => { setOpen(false); sessionStorage.setItem("tgp-offer-dismissed", "1"); }} aria-label="Dismiss" className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
