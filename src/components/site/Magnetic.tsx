import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function Magnetic({ children, strength = 0.25, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
