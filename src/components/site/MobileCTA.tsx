import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function MobileCTA() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-30 px-4 pt-3 bg-gradient-to-t from-background via-background/90 to-transparent"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
    >
      <Link to="/contact" className="flex items-center justify-center gap-2 w-full rounded-full btn-electric min-h-[48px] py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground">
        Book Free Trial <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
