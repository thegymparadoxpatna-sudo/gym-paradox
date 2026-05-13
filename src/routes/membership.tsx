import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Magnetic } from "@/components/site/Magnetic";
import { GoogleReviewsBadge } from "@/components/site/GoogleReviewsBadge";

const STANDARD_PLANS = [
  { key: "monthly", label: "Monthly", price: 4999, per: "/ month", tag: "Flexible", duration: "P1M" },
  { key: "quarterly", label: "Quarterly", price: 12999, per: "/ 3 months", tag: "Save ~₹2,000 vs monthly", duration: "P3M" },
  { key: "halfyearly", label: "Half-Yearly", price: 18999, per: "/ 6 months", tag: "Save ₹10,995 vs monthly", duration: "P6M" },
  { key: "yearly", label: "Yearly", price: 27999, per: "/ year", tag: "Save ₹31,989 vs monthly", duration: "P1Y", recommended: true },
];

const FOUNDING_PLANS = [
  { key: "quarterly", label: "Quarterly", price: 10999, original: 12999, per: "/ 3 months", save: "Save ₹2,000", duration: "P3M" },
  { key: "halfyearly", label: "Half-Yearly", price: 15499, original: 18999, per: "/ 6 months", save: "Save ₹3,500", duration: "P6M" },
  { key: "yearly", label: "Yearly", price: 21999, original: 27999, per: "/ year", save: "Save ₹6,000", duration: "P1Y", popular: true },
];

const STANDARD_INCLUSIONS = [
  "Full gym access",
  "All group programs (HIIT, Zumba, Aerobic, Boxing, CrossFit)",
  "Locker & changing facilities",
  "All operating hours: 6 AM – 10 PM",
  "Complimentary 3-day trial",
];

const FOUNDING_INCLUSIONS = [
  ...STANDARD_INCLUSIONS,
  "Locked-in pricing for life of membership",
  "Founding member recognition",
];

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const schemaOffers = [
  ...STANDARD_PLANS.map((p) => ({
    "@type": "Offer",
    name: `Standard ${p.label}`,
    price: p.price,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: "https://gym-paradox.lovable.app/membership",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: p.price,
      priceCurrency: "INR",
      billingDuration: p.duration,
    },
  })),
  ...FOUNDING_PLANS.map((p) => ({
    "@type": "Offer",
    name: `Founding ${p.label}`,
    price: p.price,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: "https://gym-paradox.lovable.app/membership#founding",
    eligibleCustomerType: "First 100 members",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: p.price,
      priceCurrency: "INR",
      billingDuration: p.duration,
    },
  })),
];

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership · The Gym Paradox Patna" },
      { name: "description", content: "One membership. Full access. Standard plans from ₹4,999/month and exclusive Founding pricing for the first 100 members." },
      { property: "og:title", content: "Membership · The Gym Paradox" },
      { property: "og:url", content: "https://gym-paradox.lovable.app/membership" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://gym-paradox.lovable.app/membership" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "The Gym Paradox Membership Plans",
          itemListElement: schemaOffers.map((o, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: o,
          })),
        }),
      },
    ],
  }),
  component: Membership,
});

function Membership() {
  return (
    <>
      <PageHeader
        eyebrow="Membership · 2026"
        title="Choose your"
        italic="standard."
        lede="One membership. Full access. Every plan includes a complimentary 3-day trial — walk in, train, decide."
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 -mt-4 mb-16 flex justify-center">
        <GoogleReviewsBadge variant="pill" />
      </div>

      {/* SECTION 1 — STANDARD */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-electric-gradient">01 — Standard Plans</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl tracking-[-0.035em] leading-[0.95]">Standard Membership</h2>
            <p className="mt-4 max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed">
              Choose the duration that fits your commitment. Full access, every plan.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {STANDARD_PLANS.map((p, i) => (
              <Reveal key={p.key} delay={i * 0.06}>
                <div className={`relative h-full p-7 md:p-8 border flex flex-col rounded-sm overflow-hidden bg-carbon/40 backdrop-blur-md transition hover:-translate-y-1 ${p.recommended ? "border-electric/60" : "border-border hover:border-foreground/30"}`}>
                  {p.recommended && <div className="absolute inset-0 -z-10" style={{ background: "var(--grad-electric-soft)" }} />}
                  {p.recommended && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-gradient mb-3">Recommended</span>
                  )}
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{p.label}</p>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-display text-5xl tracking-[-0.04em]">{fmt(p.price)}</span>
                  </div>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{p.per}</p>
                  <p className="mt-4 inline-flex w-fit text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground border border-border rounded-full px-2.5 py-1">{p.tag}</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {STANDARD_INCLUSIONS.map((it) => (
                      <li key={it} className="flex gap-3 text-sm">
                        <Check className="h-4 w-4 shrink-0 text-electric-gradient mt-0.5" /> <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <Magnetic strength={0.1}>
                    <Link to="/contact" className={`mt-8 inline-flex items-center justify-center gap-1.5 rounded-full w-full px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] transition ${p.recommended ? "btn-electric text-primary-foreground" : "border border-border hover:border-electric"}`}>
                      Book Free Trial <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — FOUNDING */}
      <section id="founding" className="relative py-20 md:py-28 border-y border-electric/20 overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--grad-electric-soft)" }} />
        <div className="absolute inset-0 -z-10 gradient-mesh opacity-40" />
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-electric-gradient" style={{ filter: "brightness(1.2) saturate(1.2)", textShadow: "0 0 24px oklch(0.72 0.22 256 / 0.35)" }}>02 — Founding Member Pricing</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl tracking-[-0.035em] leading-[0.95]">
              First 100 Members <em className="display-italic text-electric-gradient">Exclusive</em><span className="text-electric-gradient">.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
              Locked-in launch pricing for our founding 100 members. Once we reach 100 active memberships, this offer ends — permanently.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {FOUNDING_PLANS.map((p, i) => (
              <Reveal key={p.key} delay={i * 0.06}>
                <div className={`relative h-full p-7 md:p-8 border flex flex-col rounded-sm overflow-hidden bg-ink/80 backdrop-blur-md transition hover:-translate-y-1 ${p.popular ? "border-electric" : "border-electric/40 hover:border-electric/70"}`}>
                  {p.popular && <div className="absolute inset-0 -z-10" style={{ background: "var(--grad-electric-soft)" }} />}
                  {p.popular && (
                    <span className="absolute top-4 right-4 inline-flex font-mono text-[9px] uppercase tracking-[0.22em] text-primary-foreground gradient-electric rounded-full px-2.5 py-1">Most popular</span>
                  )}
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric-gradient">{p.label}</p>
                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="font-display text-5xl tracking-[-0.04em]">{fmt(p.price)}</span>
                    <span className="font-mono text-sm text-muted-foreground line-through">{fmt(p.original)}</span>
                  </div>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{p.per}</p>
                  <p className="mt-4 inline-flex w-fit text-[11px] font-mono uppercase tracking-[0.18em] text-electric-gradient border border-electric/40 rounded-full px-2.5 py-1">{p.save}</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {FOUNDING_INCLUSIONS.map((it) => (
                      <li key={it} className="flex gap-3 text-sm">
                        <Check className="h-4 w-4 shrink-0 text-electric-gradient mt-0.5" /> <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <Magnetic strength={0.1}>
                    <Link to="/contact" className="mt-8 inline-flex items-center justify-center gap-1.5 rounded-full w-full px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] btn-electric text-primary-foreground">
                      Claim Founding Spot <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — FOOTER NOTE */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-10 text-center space-y-5">
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            All memberships include a complimentary 3-day trial. No registration fees. Cash, UPI, and card payments accepted at the gym.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 leading-relaxed">
            Founding member pricing is limited to the first 100 active members and is non-transferable. Prices subject to change for new members once founding tier is filled.
          </p>
        </div>
      </section>
    </>
  );
}
