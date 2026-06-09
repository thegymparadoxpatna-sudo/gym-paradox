import { animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({ to, duration = 2.2, prefix = "", suffix = "", format = "int" }: { to: number; duration?: number; prefix?: string; suffix?: string; format?: "int" | "comma" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const v = useMotionValue(0);
  const rounded = useTransform(v, (n) => {
    const i = Math.floor(n);
    return format === "comma" ? i.toLocaleString("en-IN") : i.toString();
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      animate(v, to, { duration, ease: [0.16, 1, 0.3, 1] });
    };
    if (typeof IntersectionObserver === "undefined") {
      start();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            start();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    // Safety fallback: if not triggered shortly (e.g. mobile layout quirks), start anyway.
    const t = window.setTimeout(start, 800);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [to, duration, v]);

  useEffect(() => {
    const initial = format === "comma" ? (0).toLocaleString("en-IN") : "0";
    if (ref.current) ref.current.textContent = `${prefix}${initial}${suffix}`;
    return rounded.on("change", (val) => {
      if (ref.current) ref.current.textContent = `${prefix}${val}${suffix}`;
    });
  }, [rounded, prefix, suffix, format]);

  return <span ref={ref} />;
}
