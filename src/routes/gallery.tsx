import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery · The Gym Paradox Patna" },
      { name: "description", content: "Inside The Gym Paradox: facility, equipment, training, and member transformations." },
      { property: "og:title", content: "Gallery · The Gym Paradox" },
    ],
  }),
  component: Gallery,
});

const IMG = [
  "1517438476312-10d79c5f25d6","1534438097545-a2c22c57f2ad","1581009146145-b5ef050c2e1e","1571019613454-1cb2f99b2d8b","1593079831268-3381b0db4a77","1549719386-74dfcbf7dbed","1517836357463-d25dfeac3438","1518611012118-696072aa579a","1599901860904-17e6ed7083a0","1583454110551-21f2fa2afe61","1540497077202-7c8a3999166f","1567013127542-490d757e51fc",
];

function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Inside the" italic="paradox." />
      <section className="pb-16 md:pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 columns-2 md:columns-3 gap-3 md:gap-4 [column-fill:_balance]">
          {IMG.map((id, i) => (
            <button
              key={id}
              onClick={() => setOpen(id)}
              className="mb-3 md:mb-4 block w-full overflow-hidden break-inside-avoid"
              style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 4 === 0 ? "1/1" : "4/5" }}
            >
              <img src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`} alt="" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            </button>
          ))}
        </div>
      </section>

      {open && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in">
          <button className="absolute top-5 right-5 h-10 w-10 inline-flex items-center justify-center rounded-full bg-background/30 hover:bg-background/60"><X className="h-5 w-5" /></button>
          <img src={`https://images.unsplash.com/photo-${open}?auto=format&fit=crop&w=1800&q=85`} alt="" className="max-h-[90vh] max-w-[95vw] object-contain" />
        </div>
      )}
    </>
  );
}
