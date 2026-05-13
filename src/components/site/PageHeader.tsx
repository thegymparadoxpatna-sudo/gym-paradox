import { Reveal } from "./Reveal";

export function PageHeader({ eyebrow, title, italic, lede, image }: { eyebrow: string; title: string; italic?: string; lede?: string; image?: string }) {
  const italicHasPeriod = italic?.endsWith(".");
  const italicCore = italicHasPeriod ? italic!.slice(0, -1) : italic;
  return (
    <section className="relative pt-32 md:pt-48 pb-12 md:pb-24 overflow-hidden">
      {image && (
        <div className="absolute inset-0 -z-10">
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
          <div className="absolute inset-0 gradient-mesh opacity-60" />
        </div>
      )}
      {!image && <div className="absolute inset-0 -z-10 gradient-mesh opacity-40" />}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow text-electric-gradient">{eyebrow}</p>
          <h1 className="mt-6 font-display text-[14vw] md:text-[8vw] leading-[0.9] md:leading-[0.86] tracking-[-0.035em] md:tracking-[-0.045em] text-balance">
            {title}{italic && <> <em className="display-italic text-electric-gradient">{italicCore}</em>{italicHasPeriod && <span className="text-electric-gradient">.</span>}</>}
          </h1>
          {lede && <p className="mt-6 md:mt-8 max-w-2xl text-base md:text-lg text-muted-foreground leading-[1.7] md:leading-relaxed">{lede}</p>}
        </Reveal>
      </div>
    </section>
  );
}
