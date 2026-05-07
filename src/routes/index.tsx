import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Instagram, Quote } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { Magnetic } from "@/components/site/Magnetic";
import { SITE, TRUST_ROW } from "@/lib/site/config";
import heroImg from "@/assets/hero.jpg";
import facilityImg from "@/assets/facility.jpg";
import ctaImg from "@/assets/cta.jpg";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Gym Paradox · Pain Pays Off · Premium Fitness in Patna" },
      { name: "description", content: "Premium fitness destination in Patna. Cinematic spaces, scientific training, world-class equipment. Membership opens 2026." },
      { property: "og:title", content: "The Gym Paradox · Pain Pays Off" },
      { property: "og:description", content: "A luxury performance club in Patliputra, Patna. Discipline is freedom." },
    ],
  }),
  component: Home,
});

function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const auroraScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  return (
    <>
      {/* HERO */}
      <section ref={ref} className="relative h-[100svh] w-full overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img src={heroImg} alt="The Gym Paradox" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
          <div className="absolute inset-0 grain opacity-50 mix-blend-overlay" />
        </motion.div>

        {/* Aurora glow behind headline */}
        <motion.div style={{ scale: auroraScale }} className="absolute left-[5%] bottom-[20%] w-[60vw] h-[60vw] aurora aurora-drift pointer-events-none" />

        <motion.div style={{ opacity }} className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 md:px-10 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-10 gradient-electric" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric-gradient">Est. 2026 · Patliputra, Patna</span>
          </motion.div>

          <h1 className="font-display leading-[0.84] tracking-[-0.05em] text-balance" style={{ fontSize: "clamp(5rem, 14vw, 18rem)" }}>
            <motion.span
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Pain
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              <em className="display-italic text-electric-gradient">pays off.</em>
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <p className="max-w-md text-sm md:text-base text-muted-foreground leading-relaxed">
              A premium performance club where discipline becomes freedom and struggle becomes strength. The Gym Paradox isn't another gym — it's an environment.
            </p>
            <div className="flex gap-3">
              <Magnetic strength={0.18}>
                <Link to="/contact" className="inline-flex items-center gap-2 btn-electric rounded-full px-7 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground">
                  Book Free Trial <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <Link to="/about" className="inline-flex items-center gap-2 border border-border rounded-full px-7 py-4 font-mono text-[10px] uppercase tracking-[0.22em] hover:border-electric transition">
                The Story
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground pulse-soft">
          Scroll
        </div>
      </section>

      {/* TRUST ROW */}
      <section className="relative border-y border-border bg-ink/60">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {TRUST_ROW.map((t) => (
            <p key={t} className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground text-center">
              <span className="inline-block h-1 w-1 rounded-full bg-electric mr-2 align-middle" />
              {t}
            </p>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <section className="relative border-b border-border py-8 overflow-hidden ticker-mask bg-background">
        <div className="flex marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {[
                { t: "Discipline is freedom", mode: "italic" },
                { t: "Pain pays off", mode: "italic" },
                { t: "Strength is earned", mode: "mono" },
                { t: "The body changes slowly", mode: "italic" },
                { t: "The mind changes forever", mode: "italic" },
                { t: "Patna's premier club", mode: "mono" },
              ].map((it, idx) => (
                <span key={`${i}-${idx}`} className={`px-10 ${it.mode === "italic" ? "font-display italic text-5xl md:text-7xl opacity-70" : "font-mono uppercase tracking-[0.25em] text-xs md:text-sm opacity-50"}`}>
                  {it.t} <span className="text-electric-gradient not-italic">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute -left-12 top-32 font-display italic text-[28vw] md:text-[20vw] text-electric/[0.04] leading-none pointer-events-none select-none">01</div>
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <p className="eyebrow text-electric-gradient sticky top-32">01 — Manifesto</p>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.025em] text-balance">
                Life itself is a <em className="display-italic text-electric-gradient">paradox.</em> The things that hurt us often heal us. Growth begins where comfort ends.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
                <p className="drop-cap">Every transformation begins with struggle. The early mornings. The soreness. The moments when quitting feels easier than continuing.</p>
                <p>And yet, somehow, those difficult moments slowly become the reason a person starts feeling alive again. The pain pays off. The discipline creates freedom.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative bg-ink border-y border-border overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 py-24 md:py-32 grid grid-cols-2 md:grid-cols-4 gap-y-16">
          {[
            { n: 12, suffix: ",000", l: "Sq ft of premium space" },
            { n: 5, l: "Specialised disciplines" },
            { n: 100, suffix: "%", l: "Imported equipment" },
            { n: 16, suffix: "hr", l: "Daily, all days" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08} className={i > 0 ? "md:border-l md:border-border md:pl-8" : "md:pr-4"}>
              <div>
                <div className="font-display text-5xl md:text-7xl tracking-[-0.03em]">
                  <Counter to={s.n} />{s.suffix}
                </div>
                <div className="mt-3 h-px w-8 gradient-electric" />
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{s.l}</p>
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
              <p className="eyebrow text-electric-gradient">02 — Programs</p>
              <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.95] tracking-[-0.03em]">Five disciplines.<br /><em className="display-italic">One standard.</em></h2>
            </div>
            <Link to="/programs" className="hidden md:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition">
              All programs <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {[
              { t: "Strength", n: "01", meta: "60 min · High intensity", img: "https://images.unsplash.com/photo-1534438097545-a2c22c57f2ad?auto=format&fit=crop&w=1200&q=80", span: "md:col-span-7 h-[60vh]" },
              { t: "Boxing & CrossFit", n: "02", meta: "50 min · Explosive", img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80", span: "md:col-span-5 h-[60vh]" },
              { t: "HIIT", n: "03", meta: "35 min · Sharp", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80", span: "md:col-span-4 h-[55vh]" },
              { t: "Zumba & Aerobic", n: "04", meta: "45 min · Rhythmic", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80", span: "md:col-span-4 h-[55vh]" },
              { t: "Personal Training", n: "05", meta: "Programmed · 1-on-1", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80", span: "md:col-span-4 h-[55vh]" },
            ].map((p) => (
              <Link key={p.t} to="/programs" className={`group relative overflow-hidden ${p.span}`}>
                <img src={p.img} alt={p.t} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500" style={{ background: "var(--grad-electric-soft)" }} />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric-gradient">{p.n}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground opacity-0 group-hover:opacity-100 transition translate-y-2 group-hover:translate-y-0 duration-500">{p.meta}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <h3 className="font-display text-3xl md:text-5xl tracking-[-0.025em]">{p.t}</h3>
                    <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition translate-x-[-8px] group-hover:translate-x-0 duration-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT FEATURE */}
      <section className="relative py-32 md:py-48 bg-ink overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <Reveal className="md:col-span-6 relative aspect-[4/5]">
            <div className="absolute -inset-2 md:-inset-3 border border-electric/40 pointer-events-none" />
            <div className="absolute inset-0 overflow-hidden">
              <img src={facilityImg} alt="Premium facility" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 to-transparent" />
            </div>
          </Reveal>
          <div className="md:col-span-6 md:pl-6">
            <p className="eyebrow text-electric-gradient">03 — The Standard</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl leading-[0.95] tracking-[-0.03em] text-balance">
              Built like a club. Trained like an <em className="display-italic text-electric-gradient">athlete.</em>
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-md">
              Imported strength platforms. Olympic-grade flooring. Recovery zones. Hospital-level hygiene. Every detail designed so nothing distracts you from the work.
            </p>
            <ul className="mt-8 space-y-2 max-w-md">
              {["12,000 sqft of training floor", "Hammer Strength · Olympic platforms", "Dyaco cardio · curve treadmills", "Recovery & cold-water studio"].map((s) => (
                <li key={s} className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="text-electric-gradient">—</span> {s}
                </li>
              ))}
            </ul>
            <Link to="/facilities" className="mt-10 inline-flex items-center gap-2 border border-border rounded-full px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] hover:border-electric transition">
              Tour the facility <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-32 md:py-44">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="eyebrow text-electric-gradient">04 — Voices</p>
              <h2 className="mt-4 font-display text-5xl md:text-6xl tracking-[-0.03em]">From inside the <em className="display-italic">paradox.</em></h2>
            </div>
          </div>
          <div className="space-y-16 md:space-y-24 max-w-5xl">
            {[
              { q: "I came in for a body. I left with a mind that doesn't quit.", n: "Aakash R.", r: "Member · 14 months", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=200&q=80" },
              { q: "The space alone makes you want to show up. The trainers make you want to come back.", n: "Priya M.", r: "Member · 9 months", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
              { q: "Lost 18kg. Found a discipline I didn't know I had.", n: "Rohit K.", r: "Member · 2 years", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
              { q: "Patna finally has a gym that feels like the ones I've trained at in Mumbai and Dubai.", n: "Anjali S.", r: "Founding member", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <figure className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
                  <div className="md:col-span-1">
                    <Quote className="h-8 w-8 text-electric-gradient" strokeWidth={1.2} />
                  </div>
                  <div className="md:col-span-11">
                    <blockquote className="font-display text-3xl md:text-5xl leading-[1.15] tracking-[-0.025em] text-balance">
                      "{t.q}"
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-4">
                      <img src={t.img} alt="" className="h-10 w-10 rounded-full object-cover grayscale" loading="lazy" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em]">{t.n}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{t.r}</span>
                    </figcaption>
                  </div>
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
            <h2 className="font-display text-4xl md:text-5xl tracking-[-0.03em]">Inside the <em className="display-italic text-electric-gradient">paradox.</em></h2>
            <a href={SITE.instagram} className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition">
              <Instagram className="h-4 w-4" /> {SITE.instagramHandle}
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-3">
            {[
              "1571019613454-1cb2f99b2d8b","1534438327276-14e5300c3a48","1517836357463-d25dfeac3438","1581009146145-b5ef050c2e1e","1518611012118-696072aa579a","1549719386-74dfcbf7dbed",
            ].map((id) => (
              <a key={id} href={SITE.instagram} className="aspect-square overflow-hidden group relative">
                <img src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=70`} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500" style={{ background: "var(--grad-electric-soft)" }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative">
        <div className="relative h-[85svh] overflow-hidden">
          <img src={ctaImg} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/50" />
          <div className="absolute inset-0 aurora opacity-50" />
          <div className="relative z-10 mx-auto h-full max-w-[1400px] px-5 md:px-10 flex flex-col justify-center items-center text-center">
            <p className="eyebrow text-electric-gradient">Open membership · 2026</p>
            <h2 className="mt-6 font-display leading-[0.85] tracking-[-0.05em]" style={{ fontSize: "clamp(4rem, 12vw, 16rem)" }}>
              Begin the<br /><em className="display-italic text-electric-gradient">paradox.</em>
            </h2>
            <Magnetic strength={0.2}>
              <Link to="/contact" className="mt-12 inline-flex items-center gap-2 btn-electric rounded-full px-9 py-5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground">
                Book Free Trial <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* dummy import to keep aboutImg in graph for prefetch */}
      <link rel="prefetch" as="image" href={aboutImg} />
    </>
  );
}
