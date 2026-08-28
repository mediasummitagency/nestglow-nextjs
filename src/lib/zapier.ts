import { BUSINESS } from "@/lib/config";

/**
 * Zapier — Caroline's WhatsApp alert.
 *
 * The site POSTs one flat JSON object to a Zapier "Catch Hook" trigger. The Zap
 * on the other side sends it to Caroline over Zapier's WhatsApp Notifications
 * app. Same shape Karla's quiz uses (`websites/karla-quiz`, 2026-07-26), minus
 * the Google Sheet in the middle: that build polls a sheet, this one fires the
 * moment the form is submitted.
 *
 * ── THIS IS AN ALERT, NOT THE LEAD ────────────────────────────────────────
 * Caroline's actual copy of the lead arrives by Formspree and is confirmed
 * working (Lucas, 2026-08-23). This is a nudge to look at her inbox faster.
 * So it never throws and never fails the request — exactly like Resend's
 * receipt. If Zapier is down, a lead is un-announced, not lost.
 *
 * Do not make a Zapier failure return non-200. The one thing that fails the
 * request is Formspree, because that is the only leg carrying the lead itself.
 *
 * ── WHY A WEBHOOK AND NOT FORMSPREE'S OWN ZAPIER INTEGRATION ──────────────
 * Formspree's Zapier connection is a paid-plan feature and polls on an
 * interval. A Catch Hook is free on any plan, fires instantly, and — the part
 * that actually matters — lets us decide the payload. See the next block.
 *
 * ── EVERY KEY IS ALWAYS SENT, EVEN WHEN EMPTY ─────────────────────────────
 * This is the one non-obvious thing in this file. Zapier builds its list of
 * mappable fields from the FIRST sample it catches. A key omitted from that
 * sample does not appear in the mapping dropdown at all, so if the first test
 * lead happens to leave "message" blank, "message" is invisible in the Zap
 * editor forever after — and the fix is re-testing and re-mapping by hand.
 * Sending "" instead of omitting the key costs nothing and avoids that.
 *
 * ── THE MESSAGE WORDING IS NOT SET HERE ───────────────────────────────────
 * Zapier's WhatsApp Notifications app takes no freeform text. Its Send Message
 * action offers seven fixed templates and typing a custom sentence into the
 * Template field crashes with `Cannot read properties of undefined (reading
 * 'map')` — hit for real on Karla's quiz, logged in `learnings/patterns.md`.
 * The Zap uses the built-in "New Lead" template and maps these fields into its
 * blanks. So changing what Caroline's message SAYS is not a code change here;
 * it is limited by what that template allows.
 */

const ZAPIER_SINK = {
  /**
   * The Catch Hook URL from the Zap's trigger step — looks like
   * `https://hooks.zapier.com/hooks/catch/1234567/abcdef/`.
   *
   * Treat it as a secret. Anyone holding it can push fake leads to Caroline's
   * phone. It is unguessable rather than authenticated, which is why it lives
   * in an env var and not in `config.ts`.
   */
  url: process.env.ZAPIER_LEAD_HOOK_URL,
};

export type LeadAlert = {
  name: string;
  email: string;
  phone?: string;
  zip?: string;
  service?: string;
  /** The pricing tier card the visitor arrived from, when they came from one. */
  tier?: string;
  message?: string;
  /** ZIP outside the service area — the visitor has already been shown the
   *  waitlist message rather than a quote promise. Sent so the Zap can filter
   *  these out later if Caroline decides she does not want to be pinged for
   *  them; right now every lead is announced. */
  outOfArea?: boolean;
};

/**
 * Fires the alert. NEVER THROWS.
 *
 * @returns `"sent"`, `"skipped: …"` or `"FAILED: …"` — logged by `/api/lead`
 *          on one line per lead, so a silent alert is diagnosable from the
 *          Vercel log without reproducing it.
 */
export async function notifyZapier(lead: LeadAlert, timeoutMs = 5000): Promise<string> {
  if (!ZAPIER_SINK.url) return "skipped: missing ZAPIER_LEAD_HOOK_URL";

  // Read the comment block above before removing any of these or making one
  // conditional. Empty string is deliberate; `undefined` breaks field mapping.
  const payload = {
    name: lead.name,
    phone: lead.phone ?? "",
    email: lead.email,
    zip: lead.zip ?? "",
    service: lead.service ?? "",
    tier: lead.tier ?? "",
    message: lead.message ?? "",
    // "yes"/"no" rather than a boolean: this value gets mapped straight into a
    // WhatsApp template's text blank, where `false` reads like a bug and "no"
    // reads like an answer. Zapier filters handle both equally well.
    out_of_area: lead.outOfArea ? "yes" : "no",
    // Zapier stamps its own received-at time, but that is when the Zap ran, not
    // when the person hit submit. On a delayed or replayed Zap those differ.
    submitted_at: new Date().toISOString(),
    // Hard-coded rather than derived: if the booking form is ever pointed at
    // the same hook, this is what tells the two apart in one glance.
    source: `${BUSINESS.name} — contact form`,
  };

  try {
    const res = await fetch(ZAPIER_SINK.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    });
    // Zapier answers `{"status":"success"}` on a caught hook. Anything else is
    // worth the log line — a 410 in particular means the Zap was turned off or
    // deleted, which is the failure most likely to go unnoticed.
    return res.ok ? "sent" : `FAILED: http ${res.status}`;
  } catch (err) {
    // `TimeoutError` on our own abort; otherwise a `TypeError` from fetch,
    // whose `cause.code` is the only part that says WHICH network failure it
    // was (ECONNREFUSED, ENOTFOUND, …). This leg is silent by design, so the
    // log line is the whole diagnosis — a bare "TypeError" is not enough.
    //
    // `cause.errors[0]` covers undici's AggregateError shape, where Node tried
    // IPv6 and IPv4 in parallel and the per-address code sits one level deeper.
    // Neither branch is guaranteed: a refused connection can arrive with a
    // `cause` carrying no code at all, and falls back to the bare name. Checked
    // on macOS/Node 24 — ENOTFOUND and TimeoutError both resolve, ECONNREFUSED
    // does not.
    const e = err as Error & {
      cause?: { code?: string; errors?: { code?: string }[] };
    };
    const code = e.cause?.code ?? e.cause?.errors?.[0]?.code;
    return `FAILED: ${code ?? e.name}`;
  }
}
