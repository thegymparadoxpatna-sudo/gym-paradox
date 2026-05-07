import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Paradox · Our Story · The Gym Paradox Patna" },
      { name: "description", content: "The story behind The Gym Paradox. Pain pays off. Discipline is freedom. Built in Patna, 2026." },
      { property: "og:title", content: "The Paradox · The Gym Paradox" },
      { property: "og:description", content: "Growth begins where comfort ends. The story of Patna's premium fitness destination." },
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
        image="https://images.unsplash.com/photo-1517438476312-10d79c5f25d6?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1100px] px-5 md:px-10 space-y-16">
          {[
            { h: "Life itself is a paradox.", b: "The things that hurt us often heal us. The things we avoid are sometimes the things we need most. Growth begins where comfort ends." },
            { h: "Every transformation begins with struggle.", b: "The early mornings. The soreness. The discipline. The exhaustion. The moments when quitting feels easier than continuing. And yet, somehow, those difficult moments slowly become the reason a person starts feeling alive again." },
            { h: "The pain pays off.", b: "The discipline creates freedom. The struggle creates strength. The body changes slowly, but the mind changes forever." },
            { h: "We are building an environment.", b: "At The Gym Paradox, we are not building just another gym. We are building a place that reminds you every single day that you are capable of becoming stronger than your excuses, fears, doubts, and limitations." },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <article className="grid md:grid-cols-12 gap-6 md:gap-10 items-baseline">
                <span className="md:col-span-2 text-[10px] uppercase tracking-[0.3em] text-primary">0{i + 1}</span>
                <div className="md:col-span-10">
                  <h2 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-balance">{s.h}</h2>
                  <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">{s.b}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative py-32 bg-ink border-y border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 text-center">
          <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.85] tracking-[-0.04em]">
            Discipline<br /><em className="display-italic text-primary">is freedom.</em>
          </h2>
          <Link to="/contact" className="mt-12 inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-8 py-4 text-[11px] uppercase tracking-[0.25em]">
            Begin your paradox
          </Link>
        </div>
      </section>
    </>
  );
}
