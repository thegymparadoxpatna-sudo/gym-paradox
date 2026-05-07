import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Magnetic } from "@/components/site/Magnetic";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership · The Gym Paradox Patna" },
      { name: "description", content: "Three founding tiers. Premium access. Patliputra, Patna. Book a free trial today." },
      { property: "og:title", content: "Membership · The Gym Paradox" },
    ],
  }),
  component: Membership,
});

type Tier = {
  name: string;
  desc: string;
  monthly: number;
  quarterly: number;
  annual: number;
  inc: string[];
  cta: string;
  featured?: boolean;
  founding?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Essential",
    desc: "Open access to the floor and group programs.",
    monthly: 3500, quarterly: 9800, annual: 35000,
    inc: ["Full gym access", "Group classes (HIIT, Zumba, Aerobic)", "Locker & changing", "Open hours: 6am – 10pm"],
    cta: "Start essential",
  },
  {
    name: "Performance",
    desc: "For members serious about progression.",
    monthly: 5500, quarterly: 15000, annual: 52000,
    inc: ["Everything in Essential", "Boxing & CrossFit programs", "Monthly assessment", "Priority class booking", "Recovery studio access"],
    cta: "Choose performance",
    featured: true,
  },
  {
    name: "Elite",
    desc: "Personalised. Programmed. Accountable.",
    monthly: 9800, quarterly: 27500, annual: 95000,
    inc: ["Everything in Performance", "Personal Training (8 sessions/mo)", "Nutrition programming", "Body comp tracking", "Guest passes (2/mo)"],
    cta: "Go elite",
  },
  {
    name: "Founding",
    desc: "Locked launch pricing for the first 100 members.",
    monthly: 0, quarterly: 0, annual: 52000,
    inc: ["Performance tier, full year", "20% locked launch pricing", "Founding-member kit", "Anniversary upgrade"],
    cta: "Become founding",
    founding: true,
  },
];

type Cycle = "monthly" | "quarterly" | "annual";

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

function Membership() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const labels: Record<Cycle, string> = { monthly: "/ month", quarterly: "/ quarter", annual: "/ year" };

  return (
    <>
      <PageHeader eyebrow="Membership · 2026" title="Choose your" italic="standard." lede="Three tiers. One door. Every membership includes a free 3-day trial — walk in, train, decide." />

      {/* Cycle toggle */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 mb-14 flex justify-center">
        <div className="relative inline-flex items-center rounded-full border border-border bg-carbon/60 backdrop-blur-md p-1 font-mono text-[10px] uppercase tracking-[0.22em]">
          {(["monthly", "quarterly", "annual"] as Cycle[]).map((c) => (
            <button
              key={c}
              onClick={() => setCycle(c)}
              className={`relative z-10 px-5 py-2.5 rounded-full transition-colors ${cycle === c ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {cycle === c && (
                <motion.span layoutId="cycle-pill" className="absolute inset-0 rounded-full gradient-electric -z-10" transition={{ type: "spring", stiffness: 280, damping: 28 }} />
              )}
              {c}
            </button>
          ))}
        </div>
      </div>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {TIERS.map((t, i) => {
            const price = t.founding ? t.annual : t[cycle];
            const showLabel = t.founding ? "/ year · founding" : labels[cycle];
            return (
              <Reveal key={t.name} delay={i * 0.07}>
                <div className={`relative h-full p-7 md:p-8 border flex flex-col rounded-sm overflow-hidden bg-carbon/40 backdrop-blur-md transition hover:-translate-y-1 ${t.featured ? "border-electric/60" : t.founding ? "border-[oklch(0.74_0.16_55)]/50" : "border-border hover:border-foreground/30"}`}>
                  {t.featured && <div className="absolute inset-0 -z-10 opacity-100" style={{ background: "var(--grad-electric-soft)" }} />}
                  {t.founding && <span className="absolute top-4 right-4 inline-flex font-mono text-[9px] uppercase tracking-[0.22em] text-[oklch(0.74_0.16_55)] border border-[oklch(0.74_0.16_55)]/50 rounded-full px-2.5 py-1">Most popular</span>}
                  {t.featured && <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-gradient mb-3">Recommended</span>}
                  <h3 className="font-display text-3xl tracking-[-0.025em]">{t.name}</h3>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-display text-5xl tracking-[-0.04em]">{price ? fmt(price) : "—"}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{showLabel}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {t.inc.map((i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <Check className="h-4 w-4 shrink-0 text-electric-gradient mt-0.5" /> <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                  <Magnetic strength={0.1}>
                    <Link to="/contact" className={`mt-8 inline-flex items-center justify-center gap-1.5 rounded-full w-full px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] transition ${t.featured || t.founding ? "btn-electric text-primary-foreground" : "border border-border hover:border-electric"}`}>
                      {t.cta} <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mx-auto max-w-[1400px] px-5 md:px-10 mt-16 text-center">
          <p className="text-sm text-muted-foreground">All memberships include a complimentary 3-day trial. No registration fee for founding members.</p>
        </div>
      </section>
    </>
  );
}
