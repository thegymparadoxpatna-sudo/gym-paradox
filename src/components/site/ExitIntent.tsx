import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { SITE } from "@/lib/site/config";

export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("tgp-exit-shown")) return;
    const handler = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        setOpen(true);
        setShown(true);
        sessionStorage.setItem("tgp-exit-shown", "1");
      }
    };
    const t = setTimeout(() => document.addEventListener("mouseout", handler), 8000);
    return () => { clearTimeout(t); document.removeEventListener("mouseout", handler); };
  }, [shown]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-ink border border-border rounded-sm overflow-hidden">
        <button onClick={() => setOpen(false)} className="absolute top-4 right-4 z-10 h-9 w-9 inline-flex items-center justify-center rounded-full bg-background/60 hover:bg-background">
          <X className="h-4 w-4" />
        </button>
        <div className="grid md:grid-cols-2">
          <div className="hidden md:block relative">
            <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />
          </div>
          <div className="p-8 md:p-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary">Limited offer</span>
            <h3 className="mt-3 font-display text-3xl md:text-4xl leading-[1] tracking-tight">
              Three days. <em className="display-italic text-primary">No excuses.</em>
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Claim a complimentary 3-day pass at The Gym Paradox. Walk in, train, taste the standard.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); window.location.href = `${SITE.whatsappHref}?text=${encodeURIComponent(`Hi, I'd like to claim the 3-Day Free Pass. Name: ${f.get("name")}, Phone: ${f.get("phone")}`)}`; }}
              className="mt-6 space-y-3"
            >
              <input name="name" required placeholder="Your name" className="w-full bg-transparent border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              <input name="phone" required placeholder="Phone number" className="w-full bg-transparent border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary" />
              <button type="submit" className="w-full bg-primary text-primary-foreground rounded-sm py-3 text-[11px] uppercase tracking-[0.25em] hover:opacity-90 transition">
                Claim My 3-Day Pass
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
