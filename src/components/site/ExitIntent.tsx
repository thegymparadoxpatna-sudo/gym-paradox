import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/site/config";
import ctaImg from "@/assets/cta.jpg";

export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

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
                <form
                  onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); window.location.href = `${SITE.whatsappHref}?text=${encodeURIComponent(`Hi, I'd like to claim the 3-Day Free Pass. Name: ${f.get("name")}, Phone: ${f.get("phone")}`)}`; }}
                  className="mt-6 space-y-3"
                >
                  <input name="name" required placeholder="Your name" className="w-full bg-transparent border border-border rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-electric transition" />
                  <input name="phone" required placeholder="Phone number" className="w-full bg-transparent border border-border rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-electric transition" />
                  <button type="submit" className="w-full btn-electric text-primary-foreground rounded-full py-3.5 font-mono text-[10px] uppercase tracking-[0.22em]">
                    Claim My 3-Day Pass
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
