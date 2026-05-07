import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs · Strength, Boxing, HIIT, Zumba, PT · The Gym Paradox" },
      { name: "description", content: "Five disciplines under one roof. Strength training, Boxing & CrossFit, HIIT, Zumba & Aerobic, Personal Training." },
      { property: "og:title", content: "Programs · The Gym Paradox" },
      { property: "og:description", content: "Five disciplines. One standard. Pain pays off." },
    ],
  }),
  component: Programs,
});

const PROGRAMS = [
  { n: "01", t: "Strength Training", d: "Heavy compound lifts on imported strength platforms. Periodised programs designed to add dense, functional muscle.", img: "https://images.unsplash.com/photo-1534438097545-a2c22c57f2ad?auto=format&fit=crop&w=1400&q=80" },
  { n: "02", t: "Boxing & CrossFit", d: "Explosive conditioning. Fight-discipline cardio. WODs that build the kind of fitness you can't fake.", img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1400&q=80" },
  { n: "03", t: "HIIT", d: "Short. Sharp. Engineered intervals that cut fat and forge cardiovascular capacity in 35 minutes flat.", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=80" },
  { n: "04", t: "Zumba & Aerobic", d: "Choreographed movement, infectious rhythm, serious calorie burn — without the monotony of a treadmill.", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80" },
  { n: "05", t: "Personal Training", d: "One-on-one, fully programmed. Nutrition, recovery, and accountability — built around your single goal.", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80" },
];

function Programs() {
  return (
    <>
      <PageHeader eyebrow="Five disciplines · One standard" title="Train" italic="with intent." lede="Each program at The Gym Paradox is designed by coaches, not algorithms. Pick a discipline. Or train all five." />

      <section className="pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 space-y-24 md:space-y-32">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.t}>
              <article className={`grid md:grid-cols-12 gap-8 md:gap-12 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                <div className="md:col-span-7 [direction:ltr]">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.img} alt={p.t} className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="md:col-span-5 [direction:ltr]">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{p.n}</p>
                  <h2 className="mt-3 font-display text-5xl md:text-6xl tracking-tight">{p.t}</h2>
                  <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{p.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CalculatorSection />
    </>
  );
}

function CalculatorSection() {
  return (
    <section className="bg-ink border-y border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Tools</p>
        <h2 className="mt-4 font-display text-5xl md:text-6xl tracking-tight">Know your <em className="display-italic">numbers.</em></h2>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <BMI />
          <BMR />
        </div>
      </div>
    </section>
  );
}

function BMI() {
  const [h, setH] = useState(170);
  const [w, setW] = useState(70);
  const bmi = w / ((h / 100) ** 2);
  const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Obese";
  return (
    <div className="border border-border p-8 md:p-10">
      <h3 className="font-display text-3xl">BMI</h3>
      <div className="mt-8 space-y-6">
        <Slider label="Height (cm)" value={h} min={120} max={220} onChange={setH} />
        <Slider label="Weight (kg)" value={w} min={30} max={180} onChange={setW} />
      </div>
      <div className="mt-10 flex items-end justify-between border-t border-border pt-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Your BMI</p>
          <p className="font-display text-6xl mt-2">{bmi.toFixed(1)}</p>
        </div>
        <p className="text-[11px] uppercase tracking-[0.25em] text-primary">{cat}</p>
      </div>
    </div>
  );
}

function BMR() {
  const [h, setH] = useState(170);
  const [w, setW] = useState(70);
  const [a, setA] = useState(28);
  const [male, setMale] = useState(true);
  // Mifflin-St Jeor
  const bmr = Math.round(10 * w + 6.25 * h - 5 * a + (male ? 5 : -161));
  return (
    <div className="border border-border p-8 md:p-10">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-3xl">BMR · Calories</h3>
        <div className="flex border border-border rounded-full p-1 text-[10px] uppercase tracking-[0.2em]">
          <button onClick={() => setMale(true)} className={`px-3 py-1.5 rounded-full ${male ? "bg-primary text-primary-foreground" : ""}`}>M</button>
          <button onClick={() => setMale(false)} className={`px-3 py-1.5 rounded-full ${!male ? "bg-primary text-primary-foreground" : ""}`}>F</button>
        </div>
      </div>
      <div className="mt-8 space-y-6">
        <Slider label="Age" value={a} min={14} max={80} onChange={setA} />
        <Slider label="Height (cm)" value={h} min={120} max={220} onChange={setH} />
        <Slider label="Weight (kg)" value={w} min={30} max={180} onChange={setW} />
      </div>
      <div className="mt-10 flex items-end justify-between border-t border-border pt-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Daily maintenance</p>
          <p className="font-display text-6xl mt-2">{bmr}<span className="text-2xl text-muted-foreground"> kcal</span></p>
        </div>
        <p className="text-[11px] uppercase tracking-[0.25em] text-primary">Resting</p>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>{label}</span><span className="text-foreground">{value}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(+e.target.value)}
        className="mt-2 w-full accent-primary" />
    </div>
  );
}
