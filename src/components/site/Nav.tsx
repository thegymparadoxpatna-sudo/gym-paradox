import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site/config";
import { Menu, X } from "lucide-react";

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
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-base md:text-lg tracking-tight">
            The <em className="display-italic text-primary not-italic font-black italic">Gym</em> Paradox
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.slice(1, -1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Book Free Trial
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
          <div className="flex flex-col px-5 py-6 gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="font-display text-3xl py-2 hover:text-primary transition"
              >
                {n.label}
              </Link>
            ))}
            <a href={SITE.whatsappHref} className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              WhatsApp · {SITE.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
