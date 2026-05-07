import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({ to, duration = 2.2, prefix = "", suffix = "", format = "int" }: { to: number; duration?: number; prefix?: string; suffix?: string; format?: "int" | "comma" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const v = useMotionValue(0);
  const rounded = useTransform(v, (n) => {
    const i = Math.floor(n);
    return format === "comma" ? i.toLocaleString("en-IN") : i.toString();
  });

  useEffect(() => {
    if (!inView) return;
    const c = animate(v, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return c.stop;
  }, [inView, to, duration, v]);

  useEffect(() => {
    return rounded.on("change", (val) => {
      if (ref.current) ref.current.textContent = `${prefix}${val}${suffix}`;
    });
  }, [rounded, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}
