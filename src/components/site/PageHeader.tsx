import { Reveal } from "./Reveal";

export function PageHeader({ eyebrow, title, italic, lede, image }: { eyebrow: string; title: string; italic?: string; lede?: string; image?: string }) {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      {image && (
        <div className="absolute inset-0 -z-10">
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
      )}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
          <h1 className="mt-6 font-display text-[12vw] md:text-[8vw] leading-[0.86] tracking-[-0.04em] text-balance">
            {title}{italic && <> <em className="display-italic text-primary">{italic}</em></>}
          </h1>
          {lede && <p className="mt-8 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">{lede}</p>}
        </Reveal>
      </div>
    </section>
  );
}
