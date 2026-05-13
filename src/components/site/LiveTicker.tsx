import { useEffect, useState } from "react";

export function LiveTicker() {
  const [time, setTime] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    const tick = () => {
      const d = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const h = d.getHours();
      const m = d.getMinutes().toString().padStart(2, "0");
      setTime(`${h.toString().padStart(2,"0")}:${m} IST`);
      setIsOpen(h >= 6 && h < 22);
    };
    tick();
    const i = setInterval(tick, 30_000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="hidden md:flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
      <span className="inline-flex items-center gap-2">
        <span className={`relative h-1.5 w-1.5 rounded-full ${isOpen ? "bg-electric" : "bg-muted-foreground/50"}`}>
          {isOpen && <span className="absolute inset-0 rounded-full bg-electric pulse-soft" />}
        </span>
        {isOpen ? "Open now · Closes at 10 PM" : "Closed · Opens at 6 AM"}
      </span>
      <span className="text-foreground/70">{time || "—"} · Patna</span>
    </div>
  );
}
