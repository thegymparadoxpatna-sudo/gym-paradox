import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Phone, Mail, MapPin, Clock, Instagram, MessageCircle, Check, Star, Loader2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/site/PageHeader";
import { Magnetic } from "@/components/site/Magnetic";
import { GoogleReviewsBadge } from "@/components/site/GoogleReviewsBadge";
import { SITE } from "@/lib/site/config";
import { submitToWeb3Forms, checkRateLimit, recordSubmission, whatsappSuccessHref, PHONE_REGEX, EMAIL_REGEX } from "@/config/forms";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Enquire · Book Free Trial · The Gym Paradox Patna" },
      { name: "description", content: "Visit us in Patliputra, Patna. Book a complimentary 3-day trial. Open 6am – 10pm, all days." },
      { property: "og:title", content: "Enquire · The Gym Paradox" },
      { property: "og:url", content: "https://thegymparadox.com/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://thegymparadox.com/contact" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Enquire · The Gym Paradox",
          url: "https://thegymparadox.com/contact",
          mainEntity: {
            "@type": "HealthClub",
            name: "The Gym Paradox",
            telephone: "+91 72800 55007",
            email: "thegymparadoxpatna@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "3rd Floor, Uno Business Centre, Patliputra Colony",
              addressLocality: "Patna",
              addressRegion: "Bihar",
              postalCode: "800013",
              addressCountry: "IN",
            },
          },
        }),
      },
    ],
  }),
  component: Contact,
});

const FIELDS = ["name", "phone", "email", "interest", "message"] as const;

function Contact() {
  const [done, setDone] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({ name: "", phone: "", email: "", interest: "Free Trial", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [botcheck, setBotcheck] = useState("");
  const filled = FIELDS.filter((k) => values[k]?.trim()).length;
  const progress = (filled / FIELDS.length) * 100;

  const update = (k: string, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.name || values.name.trim().length < 2) e.name = "Please enter your name (min 2 characters).";
    if (!values.phone) e.phone = "Phone is required.";
    else if (!PHONE_REGEX.test(values.phone.trim())) e.phone = "Enter a valid Indian mobile number.";
    if (!values.email) e.email = "Email is required.";
    else if (!EMAIL_REGEX.test(values.email.trim())) e.email = "Enter a valid email address.";
    if (values.message && values.message.length > 1000) e.message = "Message is too long (max 1000 characters).";
    return e;
  };

  const reset = () => {
    setDone(false);
    setSubmitError("");
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }
    const rl = checkRateLimit("contact");
    if (!rl.allowed) {
      setSubmitError(`Too many attempts. Please try again in ${rl.minutesLeft} minutes or contact us directly via WhatsApp.`);
      return;
    }
    setLoading(true);
    const res = await submitToWeb3Forms(
      {
        subject: "🔥 New Enquiry — The Gym Paradox Website",
        source: "Contact Page",
        name: values.name,
        phone: values.phone,
        email: values.email,
        interest: values.interest,
        message: values.message,
      },
      { botcheck }
    );
    setLoading(false);
    if (res.ok) {
      recordSubmission("contact");
      setDone(true);
    } else {
      setSubmitError(res.error || "Something went wrong. Please try again.");
    }
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
                <p className="mt-6 eyebrow text-electric-gradient">Enquiry Sent</p>
                <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-[-0.03em]">Thanks {values.name || "there"}!</h2>
                <p className="mt-4 text-sm text-muted-foreground">We've received your message. Our team will reach out within 24 hours.</p>
                <p className="mt-2 text-sm text-muted-foreground">Want a faster response? Message us on WhatsApp.</p>
                <a
                  href={whatsappSuccessHref(values.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 btn-electric text-primary-foreground rounded-full px-8 py-4 min-h-[48px] font-mono text-[10px] uppercase tracking-[0.22em]"
                >
                  Continue on WhatsApp <ArrowUpRight className="h-4 w-4" />
                </a>
                <div className="mt-6">
                  <button onClick={reset} className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">
                    Submit another enquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                {submitError && (
                  <div className="border border-destructive/40 bg-destructive/10 rounded-sm p-4 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
                      <div>
                        <p className="font-medium">Couldn't send your enquiry</p>
                        <p className="text-muted-foreground mt-1">{submitError} You can also reach us directly:</p>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs">
                          <a href={SITE.phoneHref} className="underline">📞 {SITE.phone}</a>
                          <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="underline">💬 WhatsApp</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Honeypot */}
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }} checked={!!botcheck} onChange={(e) => setBotcheck(e.target.checked ? "1" : "")} />
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

                <Field label="Name" name="name" required value={values.name} onChange={(v) => update("name", v)} autoComplete="name" error={errors.name} disabled={loading} />
                <Field label="Phone" name="phone" required type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(v) => update("phone", v)} error={errors.phone} disabled={loading} />
                <Field label="Email" name="email" required type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(v) => update("email", v)} error={errors.email} disabled={loading} />
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Interest</label>
                  <select disabled={loading} value={values.interest} onChange={(e) => update("interest", e.target.value)} className="mt-2 w-full min-h-[48px] bg-transparent border border-border rounded-sm px-4 py-3.5 text-base md:text-sm focus:outline-none focus:border-electric transition disabled:opacity-60">
                    {["Free Trial", "Membership", "Personal Training", "Boxing & CrossFit", "Zumba & Aerobic", "HIIT", "Strength Training", "Other"].map((i) => <option key={i} className="bg-background">{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Message</label>
                  <textarea disabled={loading} maxLength={1000} value={values.message} onChange={(e) => update("message", e.target.value)} rows={4} className={`mt-2 w-full bg-transparent border rounded-sm px-4 py-3.5 text-base md:text-sm focus:outline-none focus:border-electric resize-none transition disabled:opacity-60 ${errors.message ? "border-destructive" : "border-border"}`} />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>
                <Magnetic strength={0.12}>
                  <button type="submit" disabled={loading} className="inline-flex w-full sm:w-auto justify-center items-center gap-2 btn-electric text-primary-foreground rounded-full px-8 py-4 min-h-[48px] font-mono text-[10px] uppercase tracking-[0.22em] disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? (<>Sending… <Loader2 className="h-4 w-4 animate-spin" /></>) : (<>Send enquiry <ArrowUpRight className="h-4 w-4" /></>)}
                  </button>
                </Magnetic>
                <p className="text-xs text-muted-foreground">Your enquiry will be forwarded to our team via WhatsApp and email.</p>
              </form>
            )}

            {!done && (
              <div className="mt-10 pt-8 border-t border-border">
                <div className="flex items-center gap-2 mb-3" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[oklch(0.82_0.17_85)] text-[oklch(0.82_0.17_85)]" strokeWidth={0} />
                  ))}
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground ml-1">5.0 · 220+ reviews</span>
                </div>
                <p className="text-base md:text-lg text-foreground leading-relaxed max-w-xl">
                  Don't take our word for it. Read 220+ verified reviews from our members on Google.
                </p>
                <a
                  href={SITE.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-electric-gradient hover:opacity-80 transition"
                >
                  Read Reviews on Google <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>

          <aside className="lg:col-span-5 lg:pl-8 space-y-6">
            <GoogleReviewsBadge variant="card" className="w-full justify-start" />
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
                className="h-full w-full"
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

function Field({ label, name, type = "text", required, value, onChange, inputMode, autoComplete, error, disabled }: { label: string; name: string; type?: string; required?: boolean; value: string; onChange: (v: string) => void; inputMode?: "text" | "tel" | "email" | "numeric" | "url" | "search" | "decimal" | "none"; autoComplete?: string; error?: string; disabled?: boolean }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}{required && " *"}</label>
      <input name={name} type={type} inputMode={inputMode} autoComplete={autoComplete} required={required} maxLength={120} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}
        className={`mt-2 w-full min-h-[48px] bg-transparent border rounded-sm px-4 py-3.5 text-base md:text-sm focus:outline-none focus:border-electric transition disabled:opacity-60 ${error ? "border-destructive" : "border-border"}`} />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Row({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const cls = "flex items-start gap-3 py-3 border-b border-border last:border-0 text-sm hover:text-electric-gradient transition";
  if (href) return <a className={cls} href={href}><span className="mt-0.5 text-electric-gradient">{icon}</span><span>{label}</span></a>;
  return <div className={cls}><span className="mt-0.5 text-electric-gradient">{icon}</span><span>{label}</span></div>;
}
