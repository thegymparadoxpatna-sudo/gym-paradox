import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Instagram, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { Magnetic } from "@/components/site/Magnetic";
import { GoogleReviewsBadge } from "@/components/site/GoogleReviewsBadge";
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
      { property: "og:url", content: "https://gym-paradox.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://gym-paradox.lovable.app/" },
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
          <img src={heroImg} alt="The Gym Paradox" className="h-full w-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
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

          <h1 className="font-display leading-[0.86] tracking-[-0.04em] text-balance" style={{ fontSize: "clamp(3rem, 9vw, 11rem)" }}>
            <motion.span
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Pain
            </motion.span>
            <motion.span
              initial={{ y: 80 }}
              animate={{ y: 0 }}
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
            <div className="flex flex-wrap gap-3">
              <Magnetic strength={0.18}>
                <Link to="/contact" className="inline-flex items-center gap-2 btn-electric rounded-full px-6 sm:px-7 py-4 min-h-[48px] font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground">
                  Book Free Trial <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <Link to="/about" className="inline-flex items-center gap-2 border border-border rounded-full px-6 sm:px-7 py-4 min-h-[48px] font-mono text-[10px] uppercase tracking-[0.22em] hover:border-electric transition">
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
      <section className="relative py-20 md:py-32 lg:py-48 overflow-hidden">
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
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24 lg:py-32 grid grid-cols-2 md:grid-cols-4 gap-y-16">
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
      <section className="relative py-20 md:py-32 lg:py-48">
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
              { t: "Strength", n: "01", meta: "60 min · High intensity", img: "https://images.unsplash.com/photo-1534438097545-a2c22c57f2ad?auto=format&fit=crop&w=800&q=70", span: "md:col-span-7 h-[60vh]" },
              { t: "Boxing & CrossFit", n: "02", meta: "50 min · Explosive", img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=70", span: "md:col-span-5 h-[60vh]" },
              { t: "HIIT", n: "03", meta: "35 min · Sharp", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=70", span: "md:col-span-4 h-[55vh]" },
              { t: "Zumba & Aerobic", n: "04", meta: "45 min · Rhythmic", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80", span: "md:col-span-4 h-[55vh]" },
              { t: "Personal Training", n: "05", meta: "Programmed · 1-on-1", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80", span: "md:col-span-4 h-[55vh]" },
            ].map((p) => (
              <Link key={p.t} to="/programs" className={`group relative overflow-hidden ${p.span}`}>
                <img src={p.img} alt={p.t} width="800" height="600" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
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
      <section className="relative py-20 md:py-32 lg:py-48 bg-ink overflow-hidden">
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
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-20 md:py-32 lg:py-44">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="text-center mb-16 flex flex-col items-center">
            <p className="eyebrow text-electric-gradient">04 — Voices</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl tracking-[-0.03em]">From inside the <em className="display-italic">paradox.</em></h2>
            <p className="mt-5 text-base text-muted-foreground max-w-xl">Real stories from real members who chose discipline over comfort.</p>
            <div className="mt-7">
              <GoogleReviewsBadge variant="card" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                q: "It is rare to find a space that feels this premium while still fostering a serious training mindset. Whether you are focused on strength, conditioning, or general wellness, this is undoubtedly one of the finest places to train in the city. Highly recommended for those who value quality and consistency.",
                n: "Samyak Shrey",
                meta: "Member · 2 days ago",
                localGuide: false,
                img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&h=200&q=80",
                isNew: false,
              },
              {
                q: "It's rare to find a gym that balances premium equipment, disciplined training culture, and a genuinely motivating environment so well. From strength training to overall fitness and recovery, every aspect feels thoughtfully designed for people who are serious about improving themselves. The trainers are knowledgeable, the atmosphere is energetic, and the consistency in quality truly stands out. Easily one of the best places in the city to train and stay committed to your fitness goals. Highly recommended for anyone who values professionalism, results, and a positive workout experience.",
                n: "Badrish Tiwari",
                meta: "Member · Local Guide",
                localGuide: true,
                img: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?auto=format&fit=crop&w=200&h=200&q=80",
                isNew: false,
              },
              {
                q: "One of the best gyms I have ever seen. New and advanced equipment to train all the body parts. Great positive and friendly environment. Great support by trainers to do right exercise of all body. Gym owner is friendly in nature and a great person. Great experience with The Gym Paradox.",
                n: "Shardindu Tiwari",
                meta: "Member · Local Guide",
                localGuide: true,
                img: "https://images.unsplash.com/photo-1614289371518-722f2615943d?auto=format&fit=crop&w=200&h=200&q=80",
                isNew: false,
              },
              {
                q: "Amazing gym with top-notch equipment and a very motivating environment. The trainers are highly professional, and the hygiene levels are excellent. Highly recommended for everyone!",
                n: "Devesh Ojha",
                meta: "Member · Local Guide",
                localGuide: true,
                img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200&q=80",
                isNew: false,
              },
              {
                q: "High-quality equipment and expert trainers make this gym a powerhouse for fitness results. Clean, motivating, and worth every penny.",
                n: "Sushant Mishra",
                meta: "Verified Google Review",
                localGuide: false,
                img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&h=200&q=80",
                isNew: false,
              },
              {
                q: "Love the way this gym \"I've been training for a few months now, and I can honestly say it's changed the game for me! The equipment is top-tier and always well-maintained, the atmosphere is incredibly motivating, and the staff is super knowledgeable and welcoming. It's clean, well-organized, and truly a fantastic place to achieve fitness goals. Highly recommend to anyone serious about their fitness journey!\"",
                n: "Amit Tiwari",
                meta: "Member · 2 days ago",
                localGuide: false,
                img: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?auto=format&fit=crop&w=200&h=200&q=80",
                isNew: true,
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <figure className="relative h-full p-7 md:p-8 border border-border rounded-sm bg-carbon/40 backdrop-blur-md hover:border-electric/60 transition flex flex-col">
                  <Quote aria-hidden className="absolute top-6 right-6 h-7 w-7 text-electric/30" strokeWidth={1.2} />
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-[oklch(0.82_0.17_85)] text-[oklch(0.82_0.17_85)]" strokeWidth={0} />
                      ))}
                    </div>
                    {t.isNew && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-electric-gradient border border-electric/40 rounded-full px-2 py-0.5">New</span>
                    )}
                  </div>
                  <blockquote className="text-base md:text-[15px] leading-relaxed text-foreground/90 flex-1">
                    "{t.q}"
                  </blockquote>
                  <figcaption className="mt-6 pt-6 border-t border-border/60 flex items-center gap-3">
                    <img
                      src={t.img}
                      alt={t.n}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover border border-electric/40"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-base tracking-[-0.01em] truncate">{t.n}</span>
                        {t.localGuide && (
                          <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-electric-gradient border border-electric/40 rounded-full px-1.5 py-0.5 shrink-0">
                            Local Guide
                          </span>
                        )}
                      </div>
                      <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition">
                        {t.meta}
                      </a>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition">
              Read all 220+ reviews on Google <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="relative py-16 md:py-24 lg:py-32 border-t border-border">
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
              <a key={id} href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="View on Instagram @thegymparadox" className="aspect-square overflow-hidden group relative">
                <img src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=70`} alt="The Gym Paradox Instagram post" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
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
