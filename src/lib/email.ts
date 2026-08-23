import { BUSINESS } from "@/lib/config";

/**
 * The customer's confirmation email.
 *
 * Ported from `bdf-nextjs/src/lib/email.ts` (2026-08-20), whose sending pattern
 * is Gorsegner's — the one actually proven to deliver.
 *
 * ── WHAT THIS IS AND IS NOT ──────────────────────────────────────────────
 * This is the receipt the CUSTOMER gets. Caroline's own notification is not
 * this and must not be moved into it: her lead arrives by Formspree, which is
 * confirmed working (Lucas, 2026-08-23). Resend is additive — if it fails or is
 * unconfigured, Caroline still gets the lead and the customer simply gets no
 * receipt.
 *
 * ── WHY NOT GOOGLE APPS SCRIPT ───────────────────────────────────────────
 * `MailApp` was tried on TCG on 2026-08-03 and does not work. Google accepted
 * every message, counted it against the quota, returned no error, produced no
 * bounce — and it arrived nowhere. Four recipients across Gmail and Outlook;
 * the only addresses that ever received anything belonged to the sending
 * account itself, which is a sent copy, not delivery. Do not move this back.
 *
 * ── PLAIN TEXT, ON PURPOSE ───────────────────────────────────────────────
 * A designed HTML receipt from a one-person cleaning business reads as a mass
 * mail template; a plain note reads as a person. This is a reassurance, and it
 * should sound like one.
 *
 * ── NO CLAIM IS INVENTED HERE ────────────────────────────────────────────
 * The only response-time commitment this site makes anywhere is "we reply
 * within one business day" — on the form's reassurance strip and its success
 * screen. This email repeats that wording and does not tighten it. Promising
 * same-day is a business decision for Lucas and Caroline, not a copy tweak.
 */

const EMAIL_SINK = {
  /** From resend.com/api-keys. Sending permission only — it never reads. */
  apiKey: process.env.RESEND_API_KEY,
  /**
   * The `From` header including display name:
   * `NestGlow Co <hello@send.nestglowco.com>`.
   *
   * A SUBDOMAIN, never the root domain. Resend needs its own SPF and DKIM on
   * whatever it sends from, and putting those on `nestglowco.com` itself would
   * collide with the records for Caroline's normal mailbox. Same shape
   * Gorsegner and BDF use.
   */
  from: process.env.RESEND_FROM,
};

export function missingEmailConfig(): string[] {
  return Object.entries(EMAIL_SINK)
    .filter(([, v]) => !v)
    // The environment variable NAME, not the object key. Decoding
    // "missing env: token" cost an hour on TCG on 2026-08-03.
    .map(([k]) => (k === "apiKey" ? "RESEND_API_KEY" : "RESEND_FROM"));
}

export type Confirmation = {
  name: string;
  email: string;
  service?: string;
  zip?: string;
  message?: string;
  /** True when the ZIP is outside the service area — the form already routes
   *  these to a waitlist message on screen, so the receipt has to agree with
   *  what they were just told rather than promising a quote. */
  outOfArea?: boolean;
};

function bodyFor({ name, service, zip, message, outOfArea }: Confirmation): string {
  const first = name.trim().split(/\s+/)[0] || "there";

  // Built by pushing rather than filtering a literal: a filter over the whole
  // array to drop an empty detail line would strip the deliberate blank lines
  // too, and the note would arrive as one unbroken paragraph.
  const lines = outOfArea
    ? [
        `Hi ${first},`,
        "",
        `Thanks for getting in touch. We're not cleaning in ${zip ?? "your area"} just yet,`,
        "so we've added you to the list and we'll email you the moment that changes.",
      ]
    : [
        `Hi ${first},`,
        "",
        "Thanks for getting in touch. Your request came through and Caroline has it.",
        "",
        // Worded exactly as the rest of the site words it. Do not tighten.
        "She'll reply within one business day to confirm the details and give you a",
        "firm price. No obligation, and nothing is owed for the quote.",
      ];

  const details = [
    service ? `  Service: ${service}` : "",
    zip && !outOfArea ? `  ZIP: ${zip}` : "",
    message ? `  Details: ${message}` : "",
  ].filter(Boolean);
  if (details.length > 0) {
    lines.push("", "Here's what you sent us:", "", ...details);
  }

  lines.push(
    "",
    `If you'd rather not wait, call or text ${BUSINESS.phone}.`,
    "",
    "Talk soon,",
    BUSINESS.name,
    "House cleaning across Monmouth, Ocean and Middlesex County, NJ",
    BUSINESS.phone
  );
  return lines.join("\n");
}

/**
 * Sends the confirmation. NEVER THROWS — a customer missing their receipt is a
 * poor experience, but a lead lost because the receipt failed is a lost job.
 *
 * @returns `"sent: <id>"`, `"skipped: …"` or `"FAILED: …"`
 */
export async function sendConfirmation(
  lead: Confirmation,
  timeoutMs = 6000
): Promise<string> {
  const missing = missingEmailConfig();
  if (missing.length > 0) return `skipped: missing ${missing.join(", ")}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${EMAIL_SINK.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_SINK.from,
        to: [lead.email],
        // Replies reach Caroline's own inbox rather than a no-reply address.
        // It matters more than it looks: a customer replying "actually, can you
        // come Tuesday?" to a no-reply receipt is a booked job that evaporates.
        reply_to: BUSINESS.email,
        subject: `We got your request — ${BUSINESS.name}`,
        text: bodyFor(lead),
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });

    const raw = await res.text().catch(() => "");
    if (res.ok) {
      // The id is the handle for looking this exact message up in Resend's
      // dashboard — sent, delivered, bounced, complained. That per-message
      // status is the entire reason for not using Apps Script.
      let id = "no id";
      try {
        id = (JSON.parse(raw) as { id?: string }).id ?? id;
      } catch {
        /* keep the fallback */
      }
      return `sent: ${id}`;
    }

    let detail = `http ${res.status}`;
    try {
      const parsed = JSON.parse(raw) as { message?: string; name?: string };
      if (parsed.message) detail = `${parsed.name ?? res.status}: ${parsed.message}`;
    } catch {
      if (raw) detail = raw.slice(0, 160);
    }
    return `FAILED: ${detail}`;
  } catch (err) {
    return `FAILED: ${(err as Error).name}`;
  }
}
