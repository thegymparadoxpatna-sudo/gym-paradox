## Problem

Clicking any nav link or in-page CTA feels unresponsive for ~1 second, causing users to double-click. Audit shows three concrete causes — none are network latency.

### Root causes

1. **`src/components/site/PageTransition.tsx`** — Uses `<AnimatePresence mode="wait">` with a 0.55s exit + 0.55s enter. `mode="wait"` blocks the new route from rendering until the old one finishes its 550ms exit animation. Effective perceived delay: **~550–1100ms** on every navigation, even when the destination route is already in memory. This is the dominant cause.

2. **No link preloading** — `defaultPreload` is not set on the router, so route chunks (and any loader data) are fetched only after the click. Combined with cause #1, the user sees nothing happen.

3. **No pending indicator** — There's a `ScrollProgress` (scroll-based) but no router-pending bar, so during the dead time there's zero visual feedback that a click registered.

Minor: nav links and CTAs have no `:active` state styling, so the click itself doesn't even flash.

## Fix

### 1. Rewrite `src/components/site/PageTransition.tsx`
- Remove `mode="wait"`. Let the new page mount immediately.
- Drop the y-translate exit; keep only a fast 180ms opacity fade-in on enter (no exit animation).
- This alone removes the perceived freeze.

### 2. Update `src/router.tsx`
- Add `defaultPreload: "intent"` and `defaultPreloadDelay: 50` so route code is fetched on hover/touchstart, before the click.
- Add `defaultPendingMs: 100` so transitions feel instant for cached routes.

### 3. Add a top pending bar in `src/components/site/__root.tsx` area
- New `src/components/site/RouteProgress.tsx`: a thin 2px electric-color bar at top that animates while `useRouterState({ select: s => s.isLoading })` is true. Mount it in `__root.tsx` next to `ScrollProgress`.
- Gives instant visual confirmation the click registered.

### 4. Scroll-to-top on route change
- Add `scrollRestoration: true` to the router config so navigating to a new page resets scroll (currently new pages can render mid-scroll, which feels broken on top of the slow fade).

### 5. Tap feedback
- In `src/components/site/Nav.tsx`, add `active:scale-95 transition-transform` to nav links and the "Book Free Trial" CTA so the click visibly acknowledges itself even before the route resolves.

## Files touched

- `src/components/site/PageTransition.tsx` — simplify animation, remove `mode="wait"`
- `src/router.tsx` — preload + scroll restoration + pending timing
- `src/components/site/RouteProgress.tsx` — new file, thin pending bar
- `src/routes/__root.tsx` — mount `<RouteProgress />`
- `src/components/site/Nav.tsx` — add `active:` tap states

## Out of scope

- No content/copy changes
- No backend, data-fetching, or route-structure changes
- No design-token changes
