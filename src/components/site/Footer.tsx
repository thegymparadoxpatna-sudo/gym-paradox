import { Link } from "@tanstack/react-router";
import { NAV, SITE } from "@/lib/site/config";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight">
              Pain<br />
              <em className="display-italic text-primary">pays off.</em>
            </h2>
            <p className="mt-8 max-w-md text-sm text-muted-foreground leading-relaxed">
              A premium fitness destination in the heart of Patliputra, Patna.
              Built for those who believe discipline is freedom.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">Visit</p>
            <p className="text-sm leading-relaxed">{SITE.address}</p>
            <p className="text-sm text-muted-foreground mt-4">{SITE.hours}</p>
            <a href={SITE.phoneHref} className="block text-sm mt-4 hover:text-primary transition">{SITE.phone}</a>
            <a href={SITE.emailHref} className="block text-sm text-muted-foreground hover:text-foreground transition">{SITE.email}</a>
          </div>

          <div className="md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">Explore</p>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-sm text-muted-foreground hover:text-foreground transition">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">Follow</p>
            <a href={SITE.instagram} className="block text-sm hover:text-primary transition">{SITE.instagramHandle}</a>
            <a href={SITE.whatsappHref} className="block text-sm text-muted-foreground hover:text-foreground transition mt-2">WhatsApp</a>
          </div>
        </div>

        <div className="mt-20 pt-8 hairline flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="font-display text-[16vw] md:text-[14vw] leading-[0.85] tracking-[-0.05em] text-foreground/95">
            PARADOX
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>© {new Date().getFullYear()} The Gym Paradox · Patna</span>
          <span>Crafted by MyGymDesk Websites</span>
        </div>
      </div>
    </footer>
  );
}
