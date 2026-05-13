import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Instagram, Loader2 } from "lucide-react";
import { NAV, SITE } from "@/lib/site/config";
import { Logo } from "./Logo";
import { submitToWeb3Forms, checkRateLimit, recordSubmission, EMAIL_REGEX } from "@/config/forms";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [botcheck, setBotcheck] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!EMAIL_REGEX.test(email.trim())) { setError("Enter a valid email."); return; }
    const rl = checkRateLimit("newsletter");
    if (!rl.allowed) { setError(`Too many attempts. Try again in ${rl.minutesLeft} min.`); return; }
    setLoading(true);
    const res = await submitToWeb3Forms(
      { subject: "📧 Newsletter Signup — The Gym Paradox", source: "Footer Newsletter", email },
      { botcheck }
    );
    setLoading(false);
    if (res.ok) { recordSubmission("newsletter"); setDone(true); }
    else setError(res.error || "Couldn't subscribe. Try again.");
  };

  return (
    <footer className="relative border-t border-border bg-ink overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 pt-24 md:pt-32 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Logo size={72} className="mb-6" withText textClassName="text-2xl md:text-3xl" />
            <p className="eyebrow text-electric-gradient">Begin · 2026</p>
            <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.9] tracking-tight">
              Pain<br />
              <em className="display-italic text-electric-gradient">pays off.</em>
            </h2>
            <p className="mt-8 max-w-md text-sm text-muted-foreground leading-relaxed">
              A premium fitness destination in the heart of Patliputra, Patna.
              Built for those who believe discipline is freedom.
            </p>

            <form onSubmit={onSubmit} className="mt-10 max-w-md">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-3">Join the paradox list</p>
              {done ? (
                <p className="text-sm text-electric-gradient">Welcome. Watch your inbox.</p>
              ) : (
                <>
                  <div className="relative flex items-center border-b border-border focus-within:border-electric transition">
                    <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }} checked={!!botcheck} onChange={(e) => setBotcheck(e.target.checked ? "1" : "")} />
                    <input
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                      disabled={loading}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      placeholder="your@email.com"
                      className="flex-1 min-w-0 bg-transparent py-3 min-h-[44px] text-base md:text-sm focus:outline-none placeholder:text-muted-foreground/50 disabled:opacity-60"
                    />
                    <button type="submit" disabled={loading} className="px-3 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition disabled:opacity-60" aria-label="Subscribe">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUpRight className="h-4 w-4" />}
                    </button>
                  </div>
                  {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
                </>
              )}
            </form>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-5">Visit</p>
            <p className="text-sm leading-relaxed">{SITE.address}</p>
            <p className="text-sm text-muted-foreground mt-4">{SITE.hours}</p>
            <a href={SITE.phoneHref} className="block text-sm mt-4 py-1.5 min-h-[24px] hover:text-electric-gradient transition">{SITE.phone}</a>
            <a href={SITE.emailHref} className="block text-sm mt-2 py-1.5 min-h-[24px] text-muted-foreground hover:text-foreground transition">{SITE.email}</a>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-5">Explore</p>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-5">Follow</p>
            <a href={SITE.instagram} className="inline-flex items-center gap-2 text-sm hover:text-electric-gradient transition">
              <Instagram className="h-4 w-4" /> {SITE.instagramHandle}
            </a>
            <a href={SITE.whatsappHref} className="block text-sm text-muted-foreground hover:text-foreground transition mt-3">WhatsApp</a>
          </div>
        </div>

        <div className="mt-20 pt-8 hairline">
          <div className="font-display text-[18vw] md:text-[14vw] leading-[0.85] tracking-[-0.06em] text-foreground/95 select-none">
            PARA<em className="display-italic text-electric-gradient">DOX</em>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>© {new Date().getFullYear()} The Gym Paradox · Patna</span>
          <span>Pain pays off.</span>
        </div>
      </div>
    </footer>
  );
}
