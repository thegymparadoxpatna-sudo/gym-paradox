import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Instagram } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site/config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Gym Paradox · Pain Pays Off · Premium Fitness in Patna" },
      { name: "description", content: "Premium fitness destination in Patna. Cinematic spaces, scientific training, world-class equipment. Membership opens 2026." },
      { property: "og:title", content: "The Gym Paradox · Pain Pays Off" },
      { property: "og:description", content: "A luxury performance club in Patliputra, Patna. Discipline is freedom." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80" },
    ],
  }),
  component: Home,
});

const HERO_IMG = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80";

function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={ref} className="relative h-[100svh] w-full overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img src={HERO_IMG} alt="The Gym Paradox" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
          <div className="absolute inset-0 grain opacity-40 mix-blend-overlay" />
        </motion.div>

        <motion.div style={{ opacity }} className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 md:px-10 pb-20 md:pb-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-primary" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary">Est. 2026 · Patliputra, Patna</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[14vw] md:text-[10vw] leading-[0.86] tracking-[-0.04em] text-balance"
          >
            Pain<br />
            <em className="display-italic text-primary">pays off.</em>
          </motion.h1>

          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <p className="max-w-md text-sm md:text-base text-muted-foreground leading-relaxed">
              A premium performance club where discipline becomes freedom and struggle becomes strength. The Gym Paradox isn't another gym — it's an environment.
            </p>
            <div className="flex gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] hover:opacity-90 transition">
                Book Free Trial <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 border border-border rounded-full px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] hover:border-primary transition">
                The Story
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </div>
      </section>

      {/* MARQUEE */}
      <section className="relative border-y border-border py-6 overflow-hidden ticker-mask">
        <div className="flex marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {["Discipline is freedom", "Pain pays off", "Strength is earned", "The body changes slowly", "The mind changes forever", "Patna's premier club"].map((t) => (
                <span key={t} className="font-display text-5xl md:text-7xl px-10 italic opacity-60">
                  {t} <span className="text-primary not-italic">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative py-32 md:py-48">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary sticky top-32">01 — Manifesto</p>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance">
                Life itself is a <em className="display-italic text-primary">paradox.</em> The things that hurt us often heal us. Growth begins where comfort ends.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>Every transformation begins with struggle. The early mornings. The soreness. The moments when quitting feels easier than continuing.</p>
                <p>And yet, somehow, those difficult moments slowly become the reason a person starts feeling alive again. The pain pays off. The discipline creates freedom.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative bg-ink border-y border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-24 md:py-32 grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
          {[
            { n: "12,000", l: "Sq ft of premium space" },
            { n: "5", l: "Specialised disciplines" },
            { n: "100%", l: "Imported equipment" },
            { n: "16hr", l: "Daily, all days" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
              <div>
                <div className="font-display text-5xl md:text-6xl tracking-tight">{s.n}</div>
                <div className="mt-3 h-px w-8 bg-primary" />
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROGRAMS PREVIEW */}
      <section className="relative py-32 md:py-48">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary">02 — Programs</p>
              <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">Five disciplines.<br /><em className="display-italic">One standard.</em></h2>
            </div>
            <Link to="/programs" className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">
              All programs <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {[
              { t: "Strength", n: "01", img: "https://images.unsplash.com/photo-1534438097545-a2c22c57f2ad?auto=format&fit=crop&w=900&q=80", span: "md:col-span-7 h-[60vh]" },
              { t: "Boxing & CrossFit", n: "02", img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=900&q=80", span: "md:col-span-5 h-[60vh]" },
              { t: "HIIT", n: "03", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80", span: "md:col-span-4 h-[55vh]" },
              { t: "Zumba & Aerobic", n: "04", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80", span: "md:col-span-4 h-[55vh]" },
              { t: "Personal Training", n: "05", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80", span: "md:col-span-4 h-[55vh]" },
            ].map((p) => (
              <Link key={p.t} to="/programs" className={`group relative overflow-hidden ${p.span}`}>
                <img src={p.img} alt={p.t} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-primary">{p.n}</span>
                  <div className="flex items-end justify-between">
                    <h3 className="font-display text-3xl md:text-4xl tracking-tight">{p.t}</h3>
                    <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT FEATURE */}
      <section className="relative py-32 md:py-48 bg-ink">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <Reveal className="md:col-span-6 relative aspect-[4/5] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80" alt="Premium facility" className="absolute inset-0 h-full w-full object-cover" />
          </Reveal>
          <div className="md:col-span-6 md:pl-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary">03 — The Standard</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl leading-[0.95] tracking-tight text-balance">
              Built like a club. Trained like an <em className="display-italic text-primary">athlete.</em>
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-md">
              Imported strength platforms. Olympic-grade flooring. Recovery zones. Hospital-level hygiene. Every detail designed so nothing distracts you from the work.
            </p>
            <Link to="/facilities" className="mt-8 inline-flex items-center gap-2 border border-border rounded-full px-6 py-3 text-[11px] uppercase tracking-[0.25em] hover:border-primary transition">
              Tour the facility <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-32 md:py-44">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-6">04 — Voices</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {[
              { q: "I came in for a body. I left with a mind that doesn't quit.", n: "Aakash R.", r: "Member · 14 months" },
              { q: "The space alone makes you want to show up. The trainers make you want to come back.", n: "Priya M.", r: "Member · 9 months" },
              { q: "Lost 18kg. Found a discipline I didn't know I had.", n: "Rohit K.", r: "Member · 2 years" },
              { q: "Patna finally has a gym that feels like the ones I've trained at in Mumbai and Dubai.", n: "Anjali S.", r: "Founding member" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <figure>
                  <blockquote className="font-display text-2xl md:text-3xl leading-[1.2] tracking-tight text-balance">
                    "{t.q}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="h-px w-8 bg-primary" />
                    <span className="text-xs uppercase tracking-[0.2em]">{t.n}</span>
                    <span className="text-xs text-muted-foreground">{t.r}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="relative py-24 md:py-32 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">Inside the <em className="display-italic text-primary">paradox.</em></h2>
            <a href={SITE.instagram} className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">
              <Instagram className="h-4 w-4" /> {SITE.instagramHandle}
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-3">
            {[
              "1571019613454-1cb2f99b2d8b","1534438327276-14e5300c3a48","1517836357463-d25dfeac3438","1581009146145-b5ef050c2e1e","1518611012118-696072aa579a","1549719386-74dfcbf7dbed",
            ].map((id) => (
              <a key={id} href={SITE.instagram} className="aspect-square overflow-hidden group">
                <img src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=70`} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative">
        <div className="relative h-[80svh] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=2000&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40" />
          <div className="relative z-10 mx-auto h-full max-w-[1400px] px-5 md:px-10 flex flex-col justify-center items-center text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Open membership · 2026</p>
            <h2 className="mt-6 font-display text-[14vw] md:text-[9vw] leading-[0.85] tracking-[-0.04em]">
              Begin the<br /><em className="display-italic text-primary">paradox.</em>
            </h2>
            <Link to="/contact" className="mt-12 inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-8 py-4 text-[11px] uppercase tracking-[0.25em] hover:opacity-90 transition">
              Book Free Trial <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
