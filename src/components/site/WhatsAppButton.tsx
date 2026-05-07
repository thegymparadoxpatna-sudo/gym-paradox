import { SITE } from "@/lib/site/config";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 md:bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full gradient-electric text-primary-foreground shadow-electric hover:scale-105 transition-transform"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 rounded-full animate-ping bg-electric/30" />
    </a>
  );
}
