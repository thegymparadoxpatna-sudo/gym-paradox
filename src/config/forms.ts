// Web3Forms configuration + shared submission helper.
// The access key is a public key by design (domain-validated server-side).
export const WEB3FORMS_ACCESS_KEY = "2d3baa39-ff4b-417b-8035-718dd6e50804";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const PHONE_REGEX = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RATE_LIMIT_MAX = 3;
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export type Web3FormsPayload = {
  subject: string;
  source: string;
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  [key: string]: string | undefined;
};

export function checkRateLimit(formId: string): { allowed: boolean; minutesLeft: number } {
  if (typeof window === "undefined") return { allowed: true, minutesLeft: 0 };
  const key = `web3forms_submissions_${formId}`;
  const now = Date.now();
  let stamps: number[] = [];
  try {
    stamps = JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    stamps = [];
  }
  stamps = stamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  localStorage.setItem(key, JSON.stringify(stamps));
  if (stamps.length >= RATE_LIMIT_MAX) {
    const oldest = Math.min(...stamps);
    const minutesLeft = Math.max(1, Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldest)) / 60000));
    return { allowed: false, minutesLeft };
  }
  return { allowed: true, minutesLeft: 0 };
}

export function recordSubmission(formId: string) {
  if (typeof window === "undefined") return;
  const key = `web3forms_submissions_${formId}`;
  let stamps: number[] = [];
  try {
    stamps = JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    stamps = [];
  }
  stamps.push(Date.now());
  localStorage.setItem(key, JSON.stringify(stamps));
}

export async function submitToWeb3Forms(
  payload: Web3FormsPayload,
  opts: { botcheck: string }
): Promise<{ ok: boolean; error?: string }> {
  if (opts.botcheck) {
    // Honeypot tripped — pretend success to bots.
    return { ok: true };
  }
  const body = {
    access_key: WEB3FORMS_ACCESS_KEY,
    from_name: "The Gym Paradox Website",
    submitted_at: new Date().toISOString(),
    page_url: typeof window !== "undefined" ? window.location.href : "",
    botcheck: "",
    ...payload,
    email: payload.email || "noreply@thegymparadox.com",
  };
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
    if (!res.ok || json.success === false) {
      return { ok: false, error: json.message || "Submission failed" };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Network error" };
  }
}

export function whatsappSuccessHref(name?: string) {
  const n = (name || "").trim();
  const msg = `Hi, I just submitted an enquiry on your website.${n ? ` My name is ${n}.` : ""}`;
  return `https://wa.me/917280055007?text=${encodeURIComponent(msg)}`;
}