import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/trainers")({
  head: () => ({
    meta: [
      { title: "Trainers · The Gym Paradox Patna" },
      { name: "description", content: "Certified strength coaches, boxing pros, and movement specialists. Meet the team behind The Gym Paradox." },
      { property: "og:title", content: "Trainers · The Gym Paradox" },
    ],
  }),
  component: Trainers,
});

const TEAM = [
  { n: "Coach A.", r: "Head of Strength", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80" },
  { n: "Coach B.", r: "Boxing & Conditioning", img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=80" },
  { n: "Coach C.", r: "HIIT Lead", img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80" },
  { n: "Coach D.", r: "Zumba & Aerobic", img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=900&q=80" },
  { n: "Coach E.", r: "Personal Training", img: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=900&q=80" },
  { n: "Coach F.", r: "Mobility & Recovery", img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80" },
];

function Trainers() {
  return (
    <>
      <PageHeader eyebrow="The Team" title="Coaches, not" italic="influencers." lede="The people you train with shape who you become. Our coaches are credentialed, lifelong students of the craft." />
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {TEAM.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.05}>
              <article className="group">
                <div className="aspect-[3/4] overflow-hidden bg-ink">
                  <img src={t.img} alt={t.n} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition duration-700" />
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <h3 className="font-display text-2xl">{t.n}</h3>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t.r}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
