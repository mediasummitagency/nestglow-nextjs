import { NextResponse } from "next/server";
import { FORMS } from "@/lib/config";
import { sendConfirmation } from "@/lib/email";
import { notifyZapier } from "@/lib/zapier";

/**
 * The single lead endpoint.
 *
 * ── WHY THE FORM NO LONGER POSTS STRAIGHT TO FORMSPREE ───────────────────
 * It did until 2026-08-23, and that path is proven — Caroline receives those
 * emails (Lucas confirmed). Nothing about it was broken. But a Resend API key
 * can never touch the browser, so adding the customer's confirmation email
 * requires a server step, and this is it.
 *
 * ── FORMSPREE IS STILL THE THING THAT MUST NOT BREAK ──────────────────────
 * Caroline's copy of the lead is the deliverable. Resend's receipt and the
 * Zapier ping are niceties. So:
 *
 *   Formspree fails  -> 502, the visitor sees the form's error state and can
 *                       try again or call. Nothing is silently swallowed.
 *   Resend fails     -> still 200. The lead is delivered; the customer just
 *                       gets no receipt, and the reason is logged.
 *   Zapier fails     -> still 200. The lead is delivered; Caroline just is not
 *                       pinged on WhatsApp, and the reason is logged.
 *
 * ── THE ZAPIER LEG (added 2026-08-27) ─────────────────────────────────────
 * A Catch Hook that fans out to Zapier's WhatsApp Notifications app, so
 * Caroline gets a phone alert instead of waiting to notice an email. It is an
 * ALERT, not a second copy of the lead — see `lib/zapier.ts`. Do not promote it
 * to a failure condition; Formspree is the only leg that can fail the request.
 *
 * All three run in PARALLEL rather than in sequence: a slow Resend or Zapier
 * call must not delay the visitor's success screen, and neither depends on
 * Formspree's answer.
 *
 * ── RUNTIME ──────────────────────────────────────────────────────────────
 * Node, not edge — `AbortSignal.timeout` and the plain fetch shape below are
 * simplest there, and this route is called once per lead, not on every page.
 */
export const runtime = "nodejs";

/** Formspree is occasionally slow; the visitor is watching a spinner. */
const FORMSPREE_TIMEOUT_MS = 10_000;

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const get = (k: string) => String(form.get(k) ?? "").trim();

  // Honeypot. Real people never fill a hidden field; bots fill everything.
  // Answer 200 so the bot believes it worked and does not retry, but send
  // nothing anywhere.
  if (get("_gotcha")) {
    return NextResponse.json({ ok: true, spam: true });
  }

  const name = get("name");
  const email = get("email");
  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const outOfArea = get("out_of_area") === "yes";

  const toFormspree = fetch(FORMS.booking, {
    method: "POST",
    body: form,
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(FORMSPREE_TIMEOUT_MS),
  })
    .then((r) => r.ok)
    .catch(() => false);

  const toCustomer = sendConfirmation({
    name,
    email,
    service: get("service") || undefined,
    zip: get("zip") || undefined,
    message: get("message") || undefined,
    outOfArea,
  });

  const toCaroline = notifyZapier({
    name,
    email,
    phone: get("phone") || undefined,
    zip: get("zip") || undefined,
    service: get("service") || undefined,
    tier: get("tier") || undefined,
    message: get("message") || undefined,
    outOfArea,
  });

  const [leadDelivered, receipt, alert] = await Promise.all([
    toFormspree,
    toCustomer,
    toCaroline,
  ]);

  // One line per lead, so a missing receipt or a silent WhatsApp alert is
  // diagnosable from the server log without reproducing it. `skipped: …` on
  // either is the normal state until that leg's env vars are set — a logged
  // skip, not a failure.
  console.log(
    `[lead] formspree=${leadDelivered ? "ok" : "FAILED"} receipt=${receipt} alert=${alert} outOfArea=${outOfArea}`
  );

  if (!leadDelivered) {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, receipt, alert });
}
