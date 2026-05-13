import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import legPress from "@/assets/equipment/leg-press.webp";
import functionalTrainer from "@/assets/equipment/functional-trainer.webp";
import hackSquat from "@/assets/equipment/hack-squat.webp";
import bicepsCurl from "@/assets/equipment/biceps-curl.webp";
import preacherCurl from "@/assets/equipment/preacher-curl.webp";
import seatedMidRow from "@/assets/equipment/seated-mid-row.webp";
import pecFly from "@/assets/equipment/pec-fly.webp";
import latPulldown from "@/assets/equipment/lat-pulldown.webp";
import chestPress from "@/assets/equipment/chest-press.webp";
import spinBike from "@/assets/equipment/spin-bike.webp";
import treadmill from "@/assets/equipment/treadmill.webp";
import elliptical from "@/assets/equipment/elliptical.webp";
import uprightBike from "@/assets/equipment/upright-bike.webp";
import recumbentBike from "@/assets/equipment/recumbent-bike.webp";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery · The Gym Paradox Patna" },
      { name: "description", content: "Inside The Gym Paradox: facility, equipment, training, and member transformations." },
      { property: "og:title", content: "Gallery · The Gym Paradox" },
      { property: "og:url", content: "https://thegymparadox.com/gallery" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://thegymparadox.com/gallery" },
    ],
  }),
  component: Gallery,
});

const IMG: { src: string; alt: string }[] = [
  { src: legPress, alt: "Angled Linear Leg Press — CF-3355-MB" },
  { src: functionalTrainer, alt: "Functional Trainer — Mi7-MB" },
  { src: hackSquat, alt: "Hack Squat / Dead Lift — RPL-5356-MB" },
  { src: bicepsCurl, alt: "Biceps Curl — RS-2102-MB" },
  { src: preacherCurl, alt: "Preacher Curl / Triceps Extension — HD-3100-MB" },
  { src: seatedMidRow, alt: "Seated Mid Row — RS-2203-MB" },
  { src: pecFly, alt: "Pec Fly — RS-2302-MB" },
  { src: latPulldown, alt: "Lat Pulldown — RS-2201-MB" },
  { src: chestPress, alt: "Chest Press — RS-2301-MB" },
  { src: spinBike, alt: "LeMond Pro Spin Bike — L-15300-A" },
  { src: treadmill, alt: "Freemotion REFLEX™ Treadmill — t10.9b" },
  { src: elliptical, alt: "Freemotion Elliptical — e10.9b (84422)" },
  { src: uprightBike, alt: "Freemotion Upright Bike — u10.9b (82422)" },
  { src: recumbentBike, alt: "Freemotion Recumbent Bike — r10.9b (82522)" },
];

function Gallery() {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Inside the" italic="paradox." />
      <section className="pb-16 md:pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {IMG.map((img, i) => (
            <button
              key={i}
              onClick={() => setOpen(img)}
              className="block w-full overflow-hidden bg-white aspect-square rounded-sm group"
            >
              <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-105" />
            </button>
          ))}
        </div>
      </section>

      {open && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in">
          <button aria-label="Close gallery" className="absolute top-5 right-5 h-11 w-11 inline-flex items-center justify-center rounded-full bg-background/30 hover:bg-background/60"><X className="h-5 w-5" /></button>
          <img src={open.src} alt={open.alt} className="max-h-[90vh] max-w-[95vw] object-contain" />
        </div>
      )}
    </>
  );
}
