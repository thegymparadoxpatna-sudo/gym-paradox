import { useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Fast, non-blocking page transition. The new route mounts immediately
// (no AnimatePresence mode="wait" exit delay) and fades in quickly so
// clicks feel instant.
export function PageTransition({ children }: { children: ReactNode }) {
  const { location } = useRouterState();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
