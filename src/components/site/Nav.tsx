import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site/config";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { LiveTicker } from "./LiveTicker";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "backdrop-blur-2xl bg-background/65 border-b border-border"
          : "bg-gradient-to-b from-background/40 to-transparent"
      }`}
    >
      {/* top micro-bar with live status */}
      <div className={`hidden md:block border-b transition ${scrolled ? "border-transparent h-0 overflow-hidden" : "border-border/40"}`}>
        <div className="mx-auto max-w-[1400px] px-10 h-8 flex items-center justify-between">
          <LiveTicker />
          <a href={SITE.whatsappHref} className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition">
            WhatsApp · {SITE.phone}
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-16 md:h-[68px] max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Logo className="h-8 w-8 md:h-10 md:w-10" />

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.slice(1, -1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="group relative font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              <span className="relative">
                {n.label}
                <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-electric opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full btn-electric px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] font-medium text-primary-foreground"
          >
            Book Free Trial <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="flex flex-col items-center px-5 py-6 gap-1">
            <Logo size={80} className="mb-6" linked={false} />
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="font-display text-3xl py-2 hover:text-electric-gradient transition"
              >
                {n.label}
              </Link>
            ))}
            <a href={SITE.whatsappHref} className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              WhatsApp · {SITE.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
