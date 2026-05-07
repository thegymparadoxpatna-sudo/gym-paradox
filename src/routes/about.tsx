import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Magnetic } from "@/components/site/Magnetic";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Paradox · Our Story · The Gym Paradox Patna" },
      { name: "description", content: "The story behind The Gym Paradox. Pain pays off. Discipline is freedom. Built in Patna, 2026." },
      { property: "og:title", content: "The Paradox · The Gym Paradox" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader
        eyebrow="The Story · Est. 2026"
        title="A"
        italic="paradox."
        lede="We're not building just another gym. We're building an environment that reminds people every single day that they are capable of becoming stronger than their excuses."
        image={aboutImg}
      />

      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute -right-12 top-32 font-display italic text-[28vw] md:text-[18vw] text-electric/[0.04] leading-none pointer-events-none select-none">PARADOX</div>
        <div className="relative mx-auto max-w-[1100px] px-5 md:px-10 space-y-20">
          {[
            { h: "Life itself is a paradox.", b: "The things that hurt us often heal us. The things we avoid are sometimes the things we need most. Growth begins where comfort ends." },
            { h: "Every transformation begins with struggle.", b: "The early mornings. The soreness. The discipline. The exhaustion. The moments when quitting feels easier than continuing. And yet, somehow, those difficult moments slowly become the reason a person starts feeling alive again." },
            { h: "The pain pays off.", b: "The discipline creates freedom. The struggle creates strength. The body changes slowly, but the mind changes forever." },
            { h: "We are building an environment.", b: "At The Gym Paradox, we are not building just another gym. We are building a place that reminds you every single day that you are capable of becoming stronger than your excuses, fears, doubts, and limitations." },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <article className="grid md:grid-cols-12 gap-6 md:gap-10 items-baseline">
                <span className="md:col-span-2 font-mono text-[10px] uppercase tracking-[0.28em] text-electric-gradient">0{i + 1}</span>
                <div className="md:col-span-10">
                  <h2 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.025em] text-balance">{s.h}</h2>
                  <p className={`mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl ${i === 0 ? "drop-cap" : ""}`}>{s.b}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative py-32 bg-ink border-y border-border overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50 pointer-events-none" />
        <div className="absolute inset-0 aurora opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 text-center">
          <h2 className="font-display leading-[0.85] tracking-[-0.05em]" style={{ fontSize: "clamp(4rem, 12vw, 14rem)" }}>
            Discipline<br /><em className="display-italic text-electric-gradient">is freedom.</em>
          </h2>
          <Magnetic strength={0.18}>
            <Link to="/contact" className="mt-12 inline-flex items-center gap-2 btn-electric rounded-full px-8 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground">
              Begin your paradox
            </Link>
          </Magnetic>
        </div>
      </section>
    </>
  );
}
