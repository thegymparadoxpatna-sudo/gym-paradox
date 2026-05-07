import { useEffect, useState } from "react";

export function LiveTicker() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const h = d.getHours();
      const m = d.getMinutes().toString().padStart(2, "0");
      setTime(`${h.toString().padStart(2,"0")}:${m} IST`);
    };
    tick();
    const i = setInterval(tick, 30_000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="hidden md:flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
      <span className="inline-flex items-center gap-2">
        <span className="relative h-1.5 w-1.5 rounded-full bg-[oklch(0.74_0.16_55)]">
          <span className="absolute inset-0 rounded-full bg-[oklch(0.74_0.16_55)] pulse-soft" />
        </span>
        Doors open · 06:00
      </span>
      <span className="text-foreground/70">{time || "—"} · Patna</span>
      <span>Members training now · 38</span>
    </div>
  );
}
