import { Star } from "lucide-react";
import { SITE } from "@/lib/site/config";

type Variant = "pill" | "card" | "inline";

export function GoogleReviewsBadge({ variant = "pill", className = "" }: { variant?: Variant; className?: string }) {
  const stars = (
    <span className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-[oklch(0.82_0.17_85)] text-[oklch(0.82_0.17_85)]" strokeWidth={0} />
      ))}
    </span>
  );

  if (variant === "card") {
    return (
      <a
        href={SITE.maps}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-4 border border-border bg-carbon/40 backdrop-blur-sm rounded-sm px-5 py-4 hover:border-electric/60 transition ${className}`}
      >
        <div className="flex flex-col gap-1.5">
          {stars}
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="text-foreground">5.0</span> · 220+ Verified Google Reviews
          </span>
        </div>
      </a>
    );
  }

  if (variant === "inline") {
    return (
      <a
        href={SITE.maps}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition ${className}`}
      >
        {stars}
        <span>5.0 · 220+ Google Reviews</span>
      </a>
    );
  }

  return (
    <a
      href={SITE.maps}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-full border border-border bg-carbon/40 backdrop-blur-sm px-4 py-2 hover:border-electric/60 transition ${className}`}
    >
      {stars}
      <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
        <span className="text-foreground">5.0</span>
        <span className="text-muted-foreground"> · 220+ Google Reviews</span>
      </span>
    </a>
  );
}