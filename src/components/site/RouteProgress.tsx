import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Thin top-of-page bar that animates while the router is transitioning
 * to a new route. Provides instant click feedback so users don't double-click.
 */
export function RouteProgress() {
  const isLoading = useRouterState({
    select: (s) => s.isLoading || s.isTransitioning,
  });

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="route-progress"
          className="fixed left-0 top-0 z-[60] h-[2px] bg-electric"
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: "85%" }}
          exit={{ width: "100%", opacity: 0 }}
          transition={{
            width: { duration: 0.6, ease: "easeOut" },
            opacity: { duration: 0.2, ease: "easeOut" },
          }}
        />
      )}
    </AnimatePresence>
  );
}