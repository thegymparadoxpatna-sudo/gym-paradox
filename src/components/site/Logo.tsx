import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-7 w-7 items-center justify-center">
        <span className="absolute inset-0 rounded-sm gradient-electric opacity-90" />
        <span className="absolute inset-[1px] rounded-sm bg-background" />
        <span className="relative font-display italic font-black text-[15px] text-electric-gradient leading-none">P</span>
      </span>
      <span className="font-display text-[15px] md:text-[16px] tracking-tight leading-none">
        The <em className="display-italic text-electric-gradient not-italic">Gym</em> Paradox
      </span>
    </Link>
  );
}
