import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Phone, Mail, MapPin, Clock, Instagram, MessageCircle, Check } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/site/PageHeader";
import { Magnetic } from "@/components/site/Magnetic";
import { SITE } from "@/lib/site/config";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Enquire · Book Free Trial · The Gym Paradox Patna" },
      { name: "description", content: "Visit us in Patliputra, Patna. Book a complimentary 3-day trial. Open 6am – 10pm, all days." },
      { property: "og:title", content: "Enquire · The Gym Paradox" },
      { property: "og:url", content: "https://gym-paradox.lovable.app/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://gym-paradox.lovable.app/contact" },
    ],
  }),
  component: Contact,
});

const FIELDS = ["name", "phone", "email", "interest", "message"] as const;

function Contact() {
  const [done, setDone] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({ name: "", phone: "", email: "", interest: "Free Trial", message: "" });
  const filled = FIELDS.filter((k) => values[k]?.trim()).length;
  const progress = (filled / FIELDS.length) * 100;

  const update = (k: string, v: string) => setValues((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.name || !values.phone) return;
    const text = `New enquiry — The Gym Paradox\nName: ${values.name}\nPhone: ${values.phone}\nEmail: ${values.email}\nInterest: ${values.interest}\nMessage: ${values.message}`;
    const wa = `${SITE.whatsappHref}?text=${encodeURIComponent(text)}`;
    const mail = `${SITE.emailHref}?subject=${encodeURIComponent("New enquiry")}&body=${encodeURIComponent(text)}`;
    setDone(true);
    setTimeout(() => window.open(wa, "_blank"), 1200);
    setTimeout(() => { window.location.href = mail; }, 1800);
  };

  return (
    <>
      <PageHeader eyebrow="Enquire · Book Free Trial" title="Begin the" italic="paradox." lede="Tell us a little about you. We'll set up your complimentary 3-day pass and a quick walk-through of the space." />

      <section className="pb-16 md:pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            {done ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
                className="border border-electric/40 bg-carbon/40 backdrop-blur-md p-12 md:p-16 text-center rounded-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 -z-10 opacity-100" style={{ background: "var(--grad-electric-soft)" }} />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 200 }}
                  className="mx-auto h-16 w-16 rounded-full gradient-electric inline-flex items-center justify-center shadow-electric"
                >
                  <Check className="h-7 w-7 text-primary-foreground" strokeWidth={2.5} />
                </motion.div>
                <p className="mt-6 eyebrow text-electric-gradient">Received</p>
                <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-[-0.03em]">We'll be in touch shortly.</h2>
                <p className="mt-4 text-sm text-muted-foreground">Redirecting you to WhatsApp for the fastest reply…</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                {/* Progress */}
                <div>
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                    <span>Form completion</span>
                    <span className="text-electric-gradient">{filled} / {FIELDS.length}</span>
                  </div>
                  <div className="h-px bg-border overflow-hidden">
                    <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }} className="h-full gradient-electric" />
                  </div>
                </div>

                <Field label="Name" name="name" required value={values.name} onChange={(v) => update("name", v)} autoComplete="name" />
                <Field label="Phone" name="phone" required type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(v) => update("phone", v)} />
                <Field label="Email" name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(v) => update("email", v)} />
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Interest</label>
                  <select value={values.interest} onChange={(e) => update("interest", e.target.value)} className="mt-2 w-full min-h-[48px] bg-transparent border border-border rounded-sm px-4 py-3.5 text-base md:text-sm focus:outline-none focus:border-electric transition">
                    {["Free Trial", "Membership", "Personal Training", "Boxing & CrossFit", "Zumba & Aerobic", "HIIT", "Strength Training", "Other"].map((i) => <option key={i} className="bg-background">{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Message</label>
                  <textarea value={values.message} onChange={(e) => update("message", e.target.value)} rows={4} className="mt-2 w-full bg-transparent border border-border rounded-sm px-4 py-3.5 text-base md:text-sm focus:outline-none focus:border-electric resize-none transition" />
                </div>
                <Magnetic strength={0.12}>
                  <button type="submit" className="inline-flex w-full sm:w-auto justify-center items-center gap-2 btn-electric text-primary-foreground rounded-full px-8 py-4 min-h-[48px] font-mono text-[10px] uppercase tracking-[0.22em]">
                    Send enquiry <ArrowUpRight className="h-4 w-4" />
                  </button>
                </Magnetic>
                <p className="text-xs text-muted-foreground">Your enquiry will be forwarded to our team via WhatsApp and email.</p>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5 lg:pl-8 space-y-6">
            <div className="border border-border p-7 rounded-sm bg-carbon/30 backdrop-blur-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-electric-gradient mb-5">Visit</p>
              <Row icon={<MapPin className="h-4 w-4" />} label={SITE.address} href={SITE.maps} />
              <Row icon={<Clock className="h-4 w-4" />} label={SITE.hours} />
              <Row icon={<Phone className="h-4 w-4" />} label={SITE.phone} href={SITE.phoneHref} />
              <Row icon={<MessageCircle className="h-4 w-4" />} label={`WhatsApp · ${SITE.phone}`} href={SITE.whatsappHref} />
              <Row icon={<Mail className="h-4 w-4" />} label={SITE.email} href={SITE.emailHref} />
              <Row icon={<Instagram className="h-4 w-4" />} label={SITE.instagramHandle} href={SITE.instagram} />
            </div>
            <div className="aspect-[4/3] overflow-hidden border border-border rounded-sm">
              <iframe
                src={SITE.mapsEmbed}
                className="h-full w-full grayscale contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required, value, onChange, inputMode, autoComplete }: { label: string; name: string; type?: string; required?: boolean; value: string; onChange: (v: string) => void; inputMode?: "text" | "tel" | "email" | "numeric" | "url" | "search" | "decimal" | "none"; autoComplete?: string }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}{required && " *"}</label>
      <input name={name} type={type} inputMode={inputMode} autoComplete={autoComplete} required={required} maxLength={120} value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full min-h-[48px] bg-transparent border border-border rounded-sm px-4 py-3.5 text-base md:text-sm focus:outline-none focus:border-electric transition" />
    </div>
  );
}

function Row({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const cls = "flex items-start gap-3 py-3 border-b border-border last:border-0 text-sm hover:text-electric-gradient transition";
  if (href) return <a className={cls} href={href}><span className="mt-0.5 text-electric-gradient">{icon}</span><span>{label}</span></a>;
  return <div className={cls}><span className="mt-0.5 text-electric-gradient">{icon}</span><span>{label}</span></div>;
}
