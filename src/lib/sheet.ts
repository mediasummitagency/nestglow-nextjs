/**
 * The Google Sheet — NestGlow's record of every lead.
 *
 * Ported from `bdf-nextjs/src/lib/webhooks.ts` (2026-08-29), which is itself
 * TCG's. The mechanism is carried over intact; the columns are NestGlow's and
 * the attribution block is not carried over (see the end of this comment).
 *
 * ── WHY FORMSPREE WAS REMOVED, 2026-08-29 ─────────────────────────────────
 * Caroline's copy of the lead used to go through Formspree, and that ended for
 * two reasons, in ascending order of seriousness.
 *
 * The visible one: Formspree silently rejects repeated near-identical
 * submissions. Six or seven test submissions on 2026-08-28 produced exactly
 * one delivery, `/api/lead` returned 502 for the rest, and because the site
 * only pushes `form_submit` to the dataLayer AFTER a successful response, the
 * GA4 conversion never fired either. An afternoon went into that.
 *
 * The real one: **nobody has the Formspree account.** It was set up long
 * enough ago that neither Lucas nor Caroline can reach it. That meant no way
 * to see the submission archive, read or relax the spam rules, check the
 * monthly quota, or change the recipient — on the single path that carries
 * revenue. A dependency nobody can log into is not a dependency you can
 * operate, and swapping it for a Sheet in an account Summit owns was the whole
 * point of this change.
 *
 * ── THIS IS THE ONE LEG THAT CAN FAIL THE REQUEST ─────────────────────────
 * `/api/lead` fans out three ways. Only this one decides whether the visitor
 * sees a thank-you:
 *
 *   Sheet fails   -> 502. The visitor is told to call, and the WHOLE lead is
 *                    written to the server log, because with Formspree gone
 *                    this row is the only structured copy that exists.
 *   SMS fails     -> still 200. The lead is recorded; Caroline just has not
 *                    been pinged yet, and the reason is logged loudly.
 *   Resend fails  -> still 200. The customer simply gets no receipt.
 *
 * Do not promote the SMS leg to a failure condition. It runs through Zapier,
 * which has a task quota and a third party in the middle; a lead that reached
 * the Sheet is not lost just because a text did not send.
 *
 * ── THE TOKEN ─────────────────────────────────────────────────────────────
 * `LEAD_WEBHOOK_TOKEN` is a shared secret the Apps Script compares before it
 * writes anything. Without it, anyone who found the web-app URL could append
 * rows to Caroline's lead sheet. Change it in both places or neither — a
 * mismatch drops every lead, and the script is what reports that.
 *
 * ── NO ATTRIBUTION BLOCK HERE, YET ────────────────────────────────────────
 * BDF's version carries 23 UTM and click-id columns because BDF runs ads.
 * NestGlow does not yet. When it does, the pattern to copy is
 * `bdf-nextjs/src/lib/attribution.ts` plus its client-side capture — it needs
 * columns here AND a component that stashes the params on landing, so it is a
 * feature rather than a config change. Append the columns at the END when that
 * happens; see the warning in `scripts/lead-intake.gs`.
 */

export const LEAD_SINK = {
  /** Apps Script web-app URL, ending in `/exec`. Appends the row and nothing
   *  else — the SMS alert and the customer confirmation are fired by
   *  `/api/lead`. `scripts/lead-intake.gs` is the source of what is deployed
   *  there. */
  url: process.env.LEAD_SHEET_URL,
  token: process.env.LEAD_WEBHOOK_TOKEN,
};

/** The env var behind each `LEAD_SINK` key. Kept here so a missing-config log
 *  line names the variable you actually go and set on Vercel, instead of the
 *  internal key (`url`/`token`) that only means something in this file.
 *  BDF's older version logged the internal key and cost an hour on TCG. */
const LEAD_SINK_ENV: Record<keyof typeof LEAD_SINK, string> = {
  url: "LEAD_SHEET_URL",
  token: "LEAD_WEBHOOK_TOKEN",
};

/** Env var names of whichever settings the running function did not receive —
 *  empty when it is fully configured. */
export function missingLeadConfig(): string[] {
  return (Object.keys(LEAD_SINK) as (keyof typeof LEAD_SINK)[])
    .filter((k) => !LEAD_SINK[k])
    .map((k) => LEAD_SINK_ENV[k]);
}

/** What the script reports back. `row` is the sheet row number, which makes a
 *  lead findable from a log line without scrolling for a timestamp. */
export type DeliveryReport = {
  ok: boolean;
  detail: string;
  row?: number;
};

/**
 * POST the lead and report whether it actually landed. Never throws: a
 * downstream outage should surface as a handled `false`, not a 500 on the
 * visitor's form submit.
 *
 * ── WHY THIS READS THE BODY AND NOT JUST THE STATUS ───────────────────────
 * An Apps Script web app serves **HTTP 200 for everything** it returns through
 * ContentService, including its own `{ok:false}` for a rejected token or a
 * caught exception. It cannot return a non-2xx status at all.
 *
 * So trusting `res.ok` would mean a token mismatch — the single most likely
 * misconfiguration, and the exact one `.env.example` warns about — reads back
 * as success. Every lead would be dropped while the visitor is shown "Thanks,
 * we've got it". The contract is the JSON body: `{ok:true}` or it did not
 * land.
 *
 * Redirects are followed on purpose (fetch's default). Apps Script answers a
 * POST with a 302 to `script.googleusercontent.com` and serves the real
 * response from there — set `redirect: "manual"` and every successful delivery
 * reads back as a 302 and gets logged as a failure.
 */
export async function deliver(
  url: string,
  body: string,
  timeoutMs = 8000
): Promise<DeliveryReport> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (err) {
    // Timeout, DNS, TLS, connection refused. `cause.code` carries the specific
    // one where Node provides it; the bare name is the fallback.
    const e = err as Error & { cause?: { code?: string } };
    return { ok: false, detail: `request failed: ${e.cause?.code ?? e.name}` };
  }

  if (!res.ok) return { ok: false, detail: `http ${res.status}` };

  const text = await res.text().catch(() => "");
  try {
    const parsed = JSON.parse(text) as Partial<DeliveryReport> & { error?: string };
    if (parsed.ok === true) {
      return { ok: true, detail: "ok", row: parsed.row };
    }
    return { ok: false, detail: `rejected: ${parsed.error ?? "no ok flag in response"}` };
  } catch {
    // Not JSON. Apps Script serves an HTML error page when a deployment is
    // broken or the URL points at a stale or undeployed version, and that page
    // arrives with a 200 like everything else.
    return { ok: false, detail: `non-JSON response (${text.slice(0, 120)})` };
  }
}
