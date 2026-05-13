import { useEffect, useState } from "react";
import { X, Sparkles, Loader2, Check, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ctaImg from "@/assets/cta.jpg";
import { submitToWeb3Forms, checkRateLimit, recordSubmission, whatsappSuccessHref, PHONE_REGEX } from "@/config/forms";

export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [botcheck, setBotcheck] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("tgp-exit-shown")) return;
    const handler = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        setOpen(true); setShown(true);
        sessionStorage.setItem("tgp-exit-shown", "1");
      }
    };
    const t = setTimeout(() => document.addEventListener("mouseout", handler), 8000);
    return () => { clearTimeout(t); document.removeEventListener("mouseout", handler); };
  }, [shown]);

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setOpen(false), 4000);
    return () => clearTimeout(t);
  }, [success]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!name || name.trim().length < 2) { setError("Please enter your name."); return; }
    if (!PHONE_REGEX.test(phone.trim())) { setError("Enter a valid Indian mobile number."); return; }
    const rl = checkRateLimit("exit-intent");
    if (!rl.allowed) { setError(`Too many attempts. Try again in ${rl.minutesLeft} min.`); return; }
    setLoading(true);
    const res = await submitToWeb3Forms(
      { subject: "🎯 3-Day Trial Request — The Gym Paradox", source: "Exit Intent Popup", name, phone },
      { botcheck }
    );
    setLoading(false);
    if (res.ok) { recordSubmission("exit-intent"); setSuccess(true); }
    else setError(res.error || "Couldn't send. Please try again.");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-carbon border border-border rounded-sm overflow-hidden shadow-elev"
          >
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 z-10 h-9 w-9 inline-flex items-center justify-center rounded-full bg-background/60 hover:bg-background transition">
              <X className="h-4 w-4" />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="hidden md:block relative">
                <img src={ctaImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-carbon/60" />
                <div className="absolute inset-0 aurora opacity-40" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-gradient">Limited offer</p>
                  <p className="mt-2 font-display text-2xl leading-tight">First 100 founding members.</p>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-electric-gradient">
                  <Sparkles className="h-3 w-3" /> Wait — one thing
                </span>
                <h3 className="mt-4 font-display text-3xl md:text-4xl leading-[1] tracking-[-0.03em]">
                  Three days. <em className="display-italic text-electric-gradient">No excuses.</em>
                </h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  Claim a complimentary 3-day pass at The Gym Paradox. Walk in, train, taste the standard.
                </p>
                {success ? (
                  <div className="mt-6 border border-electric/40 bg-carbon/40 p-6 rounded-sm text-center">
                    <div className="mx-auto h-10 w-10 rounded-full gradient-electric inline-flex items-center justify-center"><Check className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} /></div>
                    <p className="mt-3 text-sm">Thanks {name}! We'll be in touch shortly.</p>
                    <a href={whatsappSuccessHref(name)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 btn-electric text-primary-foreground rounded-full px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em]">
                      Continue on WhatsApp <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="mt-6 space-y-3">
                    {error && <p className="text-xs text-destructive">{error}</p>}
                    <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }} checked={!!botcheck} onChange={(e) => setBotcheck(e.target.checked ? "1" : "")} />
                    <input value={name} onChange={(e) => setName(e.target.value)} disabled={loading} required placeholder="Your name" autoComplete="name" className="w-full bg-transparent border border-border rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-electric transition disabled:opacity-60" />
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} disabled={loading} required type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone number" className="w-full bg-transparent border border-border rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-electric transition disabled:opacity-60" />
                    <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 btn-electric text-primary-foreground rounded-full py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] disabled:opacity-70">
                      {loading ? (<>Sending… <Loader2 className="h-4 w-4 animate-spin" /></>) : "Claim My 3-Day Pass"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
