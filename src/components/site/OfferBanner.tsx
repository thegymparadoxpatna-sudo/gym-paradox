import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function OfferBanner() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem("tgp-offer-dismissed")) setOpen(false);
  }, []);
  if (!open) return null;
  return (
    <div className="relative z-40 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-2.5 flex items-center justify-between gap-4">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] truncate">
          <span className="opacity-70 mr-2">Offer of the month —</span>
          Founding Members: 20% off annual · ends soon
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/membership" className="text-[11px] uppercase tracking-[0.2em] underline underline-offset-4">
            Claim
          </Link>
          <button onClick={() => { setOpen(false); sessionStorage.setItem("tgp-offer-dismissed", "1"); }} aria-label="Dismiss">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
