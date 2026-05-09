import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import facilityImg from "@/assets/facility.jpg";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities & Equipment · The Gym Paradox Patna" },
      { name: "description", content: "Imported strength platforms. Olympic flooring. Recovery zones. Hospital-grade hygiene. Premium interiors in Patliputra, Patna." },
      { property: "og:title", content: "Facilities · The Gym Paradox" },
      { property: "og:url", content: "https://gym-paradox.lovable.app/facilities" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://gym-paradox.lovable.app/facilities" },
    ],
  }),
  component: Facilities,
});

const ITEMS = [
  { t: "Strength Platform", d: "Imported Olympic platforms, calibrated bumpers, premium racks.", img: facilityImg, span: "md:col-span-7 h-[70vh]" },
  { t: "Cardio Deck", d: "Curve treadmills, assault bikes, ski ergs.", img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1400&q=80", span: "md:col-span-5 h-[70vh]" },
  { t: "Combat Floor", d: "Heavy bags, full-size ring, padded sprung floor.", img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1400&q=80", span: "md:col-span-5 h-[60vh]" },
  { t: "Recovery Studio", d: "Stretch zone, foam recovery, controlled cooling.", img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1400&q=80", span: "md:col-span-7 h-[60vh]" },
];

const PRINCIPLES = [
  { n: "01", t: "Imported equipment", d: "Every machine and platform is imported from leading global brands. Nothing local-grade." },
  { n: "02", t: "Hospital-level hygiene", d: "Daily deep clean, hourly touchpoint sanitisation, antimicrobial flooring throughout." },
  { n: "03", t: "Premium interiors", d: "Considered lighting, sound design, and a tonal palette built for focus, not distraction." },
  { n: "04", t: "Climate engineered", d: "Filtered air, controlled temperature, and humidity calibrated for performance." },
];

function Facilities() {
  return (
    <>
      <PageHeader eyebrow="The Standard" title="Built like a" italic="club." lede="World-class equipment is the floor, not the ceiling. Every detail of the space is engineered so nothing distracts you from the work." image={facilityImg} />

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {ITEMS.map((it) => (
            <div key={it.t} className={`group relative overflow-hidden rounded-sm ${it.span}`}>
              <img src={it.img} alt={it.t} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <h3 className="font-display text-3xl md:text-4xl tracking-[-0.025em]">{it.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md">{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 bg-ink border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <h2 className="font-display text-5xl md:text-6xl tracking-[-0.03em]">Four <em className="display-italic text-electric-gradient">non-negotiables.</em></h2>
          <div className="mt-16 grid md:grid-cols-2 gap-x-12 gap-y-12">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.05}>
                <div className="border-t border-border pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric-gradient">{p.n}</p>
                  <h3 className="mt-3 font-display text-3xl tracking-[-0.025em]">{p.t}</h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
