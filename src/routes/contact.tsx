import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Phone, Mail, MapPin, Clock, Instagram, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SITE } from "@/lib/site/config";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Enquire · Book Free Trial · The Gym Paradox Patna" },
      { name: "description", content: "Visit us in Patliputra, Patna. Book a complimentary 3-day trial. Open 6am – 10pm, all days." },
      { property: "og:title", content: "Enquire · The Gym Paradox" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim().slice(0, 100);
    const phone = String(f.get("phone") || "").trim().slice(0, 20);
    const interest = String(f.get("interest") || "");
    const msg = String(f.get("message") || "").trim().slice(0, 600);
    if (!name || !phone) return;

    const text = `New enquiry — The Gym Paradox\nName: ${name}\nPhone: ${phone}\nInterest: ${interest}\nMessage: ${msg}`;
    const wa = `${SITE.whatsappHref}?text=${encodeURIComponent(text)}`;
    const mail = `${SITE.emailHref}?subject=${encodeURIComponent("New enquiry")}&body=${encodeURIComponent(text)}`;

    window.open(wa, "_blank");
    window.location.href = mail;
    setDone(true);
  };

  return (
    <>
      <PageHeader eyebrow="Enquire · Book Free Trial" title="Begin the" italic="paradox." lede="Tell us a little about you. We'll set up your complimentary 3-day pass and a quick walk-through of the space." />

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            {done ? (
              <div className="border border-primary p-10 md:p-14 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Received</p>
                <h2 className="mt-4 font-display text-4xl">We'll be in touch shortly.</h2>
                <p className="mt-3 text-sm text-muted-foreground">Or chat with us directly on WhatsApp for the fastest reply.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <Field label="Name" name="name" required />
                <Field label="Phone" name="phone" required type="tel" />
                <Field label="Email" name="email" type="email" />
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Interest</label>
                  <select name="interest" className="mt-2 w-full bg-transparent border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary">
                    {["Free Trial", "Membership", "Personal Training", "Boxing & CrossFit", "Zumba & Aerobic", "HIIT", "Strength Training", "Other"].map((i) => <option key={i} className="bg-background">{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Message</label>
                  <textarea name="message" rows={4} className="mt-2 w-full bg-transparent border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none" />
                </div>
                <button type="submit" className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] hover:opacity-90 transition">
                  Send enquiry <ArrowUpRight className="h-4 w-4" />
                </button>
                <p className="text-xs text-muted-foreground">Your enquiry will be forwarded to our team via WhatsApp and email.</p>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5 lg:pl-8 space-y-6">
            <div className="border border-border p-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-5">Visit</p>
              <Row icon={<MapPin className="h-4 w-4" />} label={SITE.address} href={SITE.maps} />
              <Row icon={<Clock className="h-4 w-4" />} label={SITE.hours} />
              <Row icon={<Phone className="h-4 w-4" />} label={SITE.phone} href={SITE.phoneHref} />
              <Row icon={<MessageCircle className="h-4 w-4" />} label={`WhatsApp · ${SITE.phone}`} href={SITE.whatsappHref} />
              <Row icon={<Mail className="h-4 w-4" />} label={SITE.email} href={SITE.emailHref} />
              <Row icon={<Instagram className="h-4 w-4" />} label={SITE.instagramHandle} href={SITE.instagram} />
            </div>
            <div className="aspect-[4/3] overflow-hidden border border-border">
              <iframe
                src={SITE.mapsEmbed}
                className="h-full w-full grayscale"
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

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}{required && " *"}</label>
      <input name={name} type={type} required={required} maxLength={120}
        className="mt-2 w-full bg-transparent border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary" />
    </div>
  );
}

function Row({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const cls = "flex items-start gap-3 py-3 border-b border-border last:border-0 text-sm hover:text-primary transition";
  if (href) return <a className={cls} href={href}><span className="mt-0.5 text-primary">{icon}</span><span>{label}</span></a>;
  return <div className={cls}><span className="mt-0.5 text-primary">{icon}</span><span>{label}</span></div>;
}
