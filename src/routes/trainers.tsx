import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/trainers")({
  head: () => ({
    meta: [
      { title: "Trainers · The Gym Paradox Patna" },
      { name: "description", content: "Certified strength coaches, boxing pros, and movement specialists. Meet the team behind The Gym Paradox." },
      { property: "og:title", content: "Trainers · The Gym Paradox" },
      { property: "og:url", content: "https://thegymparadox.com/trainers" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://thegymparadox.com/trainers" },
    ],
  }),
  component: Trainers,
});

const TEAM = [
  { n: "Coach A.", r: "Head of Strength", c: "12 yrs · NSCA-CSCS", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80" },
  { n: "Coach B.", r: "Boxing & Conditioning", c: "Ex-state level boxer", img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=80" },
  { n: "Coach C.", r: "HIIT Lead", c: "ACE-certified", img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80" },
  { n: "Coach D.", r: "Zumba & Aerobic", c: "Zumba ZIN™ Member", img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=900&q=80" },
  { n: "Coach E.", r: "Personal Training", c: "K11 · 8 yrs", img: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=900&q=80" },
  { n: "Coach F.", r: "Mobility & Recovery", c: "FRC · FMS Lvl 2", img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80" },
];

function Trainers() {
  return (
    <>
      <PageHeader eyebrow="The Team" title="Coaches, not" italic="influencers." lede="The people you train with shape who you become. Our coaches are credentialed, lifelong students of the craft." />
      <section className="pb-16 md:pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {TEAM.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.05}>
              <article className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-ink rounded-sm">
                  <img src={t.img} alt={t.n} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition duration-500">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-gradient">{t.c}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <h3 className="font-display text-2xl tracking-[-0.025em]">{t.n}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{t.r}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="py-16 md:py-20 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid md:grid-cols-3 gap-6 text-sm">
          <Link to="/programs" className="border border-border p-6 rounded-sm hover:border-electric transition">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-gradient">Programs</p>
            <p className="mt-3 font-display text-2xl">Browse the five disciplines our coaches lead</p>
          </Link>
          <Link to="/membership" className="border border-border p-6 rounded-sm hover:border-electric transition">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-gradient">Membership</p>
            <p className="mt-3 font-display text-2xl">Train 1-on-1 with our personal training tier</p>
          </Link>
          <Link to="/contact" className="border border-border p-6 rounded-sm hover:border-electric transition">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-gradient">Visit</p>
            <p className="mt-3 font-display text-2xl">Book a complimentary 3-day trial today</p>
          </Link>
        </div>
      </section>
    </>
  );
}
