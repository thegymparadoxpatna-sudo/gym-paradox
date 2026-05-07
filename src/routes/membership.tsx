import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

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

const TIERS = [
  { name: "Essential", price: "₹3,500", per: "/ month", desc: "Open access to the floor and group programs.", inc: ["Full gym access", "Group classes (HIIT, Zumba, Aerobic)", "Locker & changing", "Open hours: 6am – 10pm"], cta: "Start essential" },
  { name: "Performance", price: "₹5,500", per: "/ month", desc: "For members serious about progression.", inc: ["Everything in Essential", "Boxing & CrossFit programs", "1 monthly assessment", "Priority class booking", "Recovery studio access"], cta: "Choose performance", featured: true },
  { name: "Elite", price: "₹9,800", per: "/ month", desc: "Personalised. Programmed. Accountable.", inc: ["Everything in Performance", "Personal Training (8 sessions/mo)", "Nutrition programming", "Body comp tracking", "Guest passes (2/mo)"], cta: "Go elite" },
  { name: "Founding · Annual", price: "₹52,000", per: "/ year", desc: "20% off · limited to first 100 founding members.", inc: ["Performance tier, full year", "Locked launch pricing", "Founding-member kit", "Anniversary upgrade"], cta: "Become founding" },
];

function Membership() {
  return (
    <>
      <PageHeader eyebrow="Membership · 2026" title="Choose your" italic="standard." lede="Three tiers. One door. Every membership includes a free 3-day trial — walk in, train, decide." />

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <div className={`h-full p-7 md:p-8 border ${t.featured ? "border-primary bg-gradient-to-b from-primary/10 to-transparent" : "border-border"} flex flex-col`}>
                {t.featured && <span className="text-[10px] uppercase tracking-[0.25em] text-primary mb-3">Most chosen</span>}
                <h3 className="font-display text-3xl">{t.name}</h3>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-5xl">{t.price}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.per}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {t.inc.map((i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" /> <span>{i}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`mt-8 inline-flex justify-center rounded-full px-5 py-3 text-[11px] uppercase tracking-[0.25em] ${t.featured ? "bg-primary text-primary-foreground" : "border border-border hover:border-primary"} transition`}>
                  {t.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto max-w-[1400px] px-5 md:px-10 mt-16 text-center">
          <p className="text-sm text-muted-foreground">All memberships include a complimentary 3-day trial. No registration fee for founding members.</p>
        </div>
      </section>
    </>
  );
}
