## Goal
Fix the unreadable micro-text across the site. The brand uses 10px mono uppercase in `text-muted-foreground` everywhere — on dark backgrounds it disappears. Bump size, weight, and contrast globally so labels are actually readable.

## Changes

### 1. Trust badge row (`src/routes/index.tsx`, lines 100–110)
Currently: `text-[10px] tracking-[0.22em] text-muted-foreground`.
- Size: `10px → 13px` (`text-[13px]`)
- Weight: add `font-semibold`
- Color: `text-muted-foreground → text-foreground/90`
- Increase the bullet dot from `h-1 w-1 → h-1.5 w-1.5` so it stays proportional.
- Bump vertical padding `py-5 → py-6` for breathing room.

### 2. Section eyebrow (`.eyebrow` in `src/styles.css`, line 135)
Used on every section header (Manifesto "01 — Manifesto", Programs, About, etc.) and in `PageHeader`.
- Size: `10px → 12px`
- Weight: `500 → 700`
- Tracking: `0.28em → 0.24em` (tighter so bolder text doesn't sprawl)

This single token change lifts every eyebrow across the entire site (home, about, programs, membership, contact, gallery, PageHeader).

### 3. Inline eyebrow-style labels not using the `.eyebrow` class
Several spots hardcode the same pattern (`font-mono text-[10px] uppercase tracking-[...] text-muted-foreground`) instead of using `.eyebrow`. Bump these too so they don't fall behind:
- `index.tsx` Scroll indicator (line 95): `text-[10px] → text-[11px]`, add `font-semibold`, color `text-muted-foreground → text-foreground/70`.
- `Footer.tsx` column headers ("Visit", "Explore", "Follow", "Join the paradox list"): `text-[10px] → text-[12px]`, add `font-semibold`, color `text-muted-foreground → text-foreground/80`.
- `Footer.tsx` copyright line: keep size, but lift color to `text-foreground/60` (currently invisible muted).
- `Nav.tsx` top micro-bar (LiveTicker + WhatsApp link): `text-[10px] → text-[11px]`, `font-semibold`, color to `text-foreground/70`.
- `programs.tsx` program numbers (`01`, `02`…): already `text-[10px] text-electric-gradient` — bump to `text-[12px] font-bold`.
- Stats labels in `index.tsx` STATS section (small labels under big numbers) — bump to `text-[12px] font-semibold` with `text-foreground/80`.

### 4. Mobile nav micro-link (`Nav.tsx` line 99, "WhatsApp · …")
- `text-[10px] text-muted-foreground` → `text-[12px] font-semibold text-foreground/80`.

## Files touched
- `src/styles.css` — `.eyebrow` token
- `src/routes/index.tsx` — trust row, scroll indicator, stat labels
- `src/routes/programs.tsx` — program number eyebrows
- `src/components/site/Footer.tsx` — column headers + copyright
- `src/components/site/Nav.tsx` — top micro-bar + mobile WhatsApp link

## Out of scope
- No layout/structure changes, no copy edits.
- Section H2 headlines already render clearly — not touching them.
- `PageHeader` titles unchanged; only the eyebrow inside it gets the global bump via `.eyebrow`.
