## Goal

Re-align the visual system to the official Brand Identity doc and dial the entire site down: smaller display sizes, lighter weights, more whitespace. Less shouting, more premium.

## Brand reference (from the PDF)

- **Color:** Royal Performance Blue `#204CA1`, Pure White `#FFFFFF`, Pure Black `#000000`
- **Typography:** Helvetica Now Display (already first in our font stack — keep)
- **Personality:** Bold, Premium, Modern — but expressed through restraint, not size

## Changes

### 1. Color tokens (`src/styles.css`)
- Replace the vivid `oklch(0.66 0.22 256)` electric blue with the brand `#204CA1` (≈ `oklch(0.42 0.16 264)`).
- Add a slightly brighter sibling for hover/glow only (not the base), so the brand blue stays the hero.
- Rebuild `--grad-electric`, `--grad-aurora`, `--grad-mesh`, `--shadow-electric` around the new blue at lower opacity (drop from ~0.55 → ~0.35 shadow alpha; mesh from 0.22 → 0.14).
- Keep background obsidian, foreground bone — those already match the brand's premium dark register.

### 2. Typography scale — lower the volume
Currently hero/page headers use `text-[14vw] md:text-[8vw]` and section headings hit 7–9vw. Pull everything down ~25–30%:
- Hero (`index.tsx`): `text-[14vw] md:text-[8vw]` → `text-[10vw] md:text-[6vw]`, weight 600 → 500, tracking `-0.045em` → `-0.03em`.
- `PageHeader.tsx`: `text-[14vw] md:text-[8vw]` → `text-[10vw] md:text-[5.5vw]`.
- Large section headers across pages: drop one step (e.g. `text-7xl md:text-9xl` → `text-5xl md:text-7xl`).
- Body lede: keep size, but raise line-height for breathing room.
- Eyebrow: keep mono micro-label (already restrained, on-brand).

### 3. Weight & emphasis
- Replace blanket `font-bold` / heavy display usage with `font-medium` (500) for headings, `font-semibold` (600) only for true emphasis.
- Reduce the use of `text-electric-gradient` on every headline — keep it for one accent word per section, not whole H1s. The brand wants confidence, not glitter.
- Soften `btn-electric` shadow (`-20px / 0.55` → `-25px / 0.30`) and remove the hover translate-Y to feel more premium-still vs. bouncy.

### 4. Spacing & rhythm
- Add ~20% more vertical padding to hero and section blocks (`pt-32 md:pt-48` already good; bump section gaps from `py-20` → `py-28` where dense).
- Tighten max-content widths on lede paragraphs (`max-w-2xl` → `max-w-xl`) so type doesn't sprawl at smaller sizes.

### 5. Nav (`Nav.tsx`)
- Logo text from `text-base md:text-lg` → `text-sm md:text-base`.
- CTA pill: reduce shadow intensity, keep size.

### 6. What stays
- Layout, sections, content, animations, forms, pricing — untouched.
- Helvetica Now Display font stack — already correct, no change.
- Logo, nav structure, page count, routes — untouched.

## Files touched

- `src/styles.css` — color tokens, gradients, shadows, button intensity
- `src/routes/index.tsx` — hero + section sizes/weights
- `src/components/site/PageHeader.tsx` — page hero scale
- `src/routes/about.tsx`, `programs.tsx`, `trainers.tsx`, `membership.tsx`, `gallery.tsx`, `contact.tsx` — headline size/weight pass
- `src/components/site/Nav.tsx` — logo text scale, CTA shadow

## Out of scope
- No new pages, no copy changes, no animation rewrites, no logo swap (PDF doesn't supply a new mark to install).
- SEO/canonical work from prior turns stays as-is.
