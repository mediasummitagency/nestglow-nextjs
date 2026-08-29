import { NextResponse } from "next/server";
import { LEAD_SINK, deliver, missingLeadConfig } from "@/lib/sheet";
import { sendConfirmation } from "@/lib/email";
import { notifyZapier } from "@/lib/zapier";
import { lookupZip } from "@/lib/zipToCounty";

/**
 * The single lead endpoint.
 *
 * ── REBUILT 2026-08-29: FORMSPREE OUT, GOOGLE SHEET IN ────────────────────
 * Was: Formspree (Caroline's copy, and the leg that could fail the request)
 * plus Resend and a Zapier SMS alongside it. Now it matches the shape BDF and
 * TCG already run — an Apps Script that writes a Sheet row, with the alert and
 * the customer receipt fired in parallel beside it.
 *
 *   ContactForm ──▶ /api/lead ──▶ Apps Script ──▶ Google Sheet   (THE RECORD)
 *                             ├─▶ Zapier hook ──▶ SMS to Caroline (the alert)
 *                             └─▶ Resend      ──▶ customer receipt (a nicety)
 *
 * Why Formspree went is in `lib/sheet.ts`: it silently drops near-duplicate
 * submissions, and nobody has the account, so none of that was adjustable.
 *
 * ── WHAT CAN AND CANNOT FAIL THE REQUEST ──────────────────────────────────
 *   Sheet fails  -> 502, the visitor sees the form's error state and can try
 *                   again or call. The WHOLE lead is logged server-side,
 *                   because that row is now the only structured copy.
 *   SMS fails    -> still 200. The lead is recorded; Caroline just has not
 *                   been pinged, and the reason is logged loudly.
 *   Resend fails -> still 200. The customer gets no receipt, reason logged.
 *
 * Do not promote the SMS leg to a failure condition. It runs through Zapier,
 * which has a task quota and a third party in the middle. A lead sitting
 * safely in the Sheet is not lost because a text did not send.
 *
 * ── THE DATALAYER PUSH DEPENDS ON THIS RESPONSE ───────────────────────────
 * `ContactForm` only pushes `form_submit` to the dataLayer when this route
 * answers OK, which is what makes GA4's `generate_lead` mean "a lead that
 * actually landed" rather than "a button was clicked". Keep it that way. On
 * 2026-08-28 that coupling is what surfaced Formspree dropping submissions —
 * the conversion stopped firing, which was the only visible symptom.
 *
 * ── RUNTIME ──────────────────────────────────────────────────────────────
 * Node, not edge — `AbortSignal.timeout` and the plain fetch shape below are
 * simplest there, and this route is called once per lead, not on every page.
 */
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  //
  // THIS IS THE ONLY HONEYPOT CHECK. ContactForm used to run the same test in
  // the browser and return before ever calling this route, which meant an
  // autofilled field produced no row, no alert and NO LOG LINE — the lead
  // simply never existed. Removed 2026-08-29; do not reintroduce it there.
  //
  // Logged rather than silent, because a hidden field can also be filled by
  // browser autofill on a REAL visitor — in which case this line is the only
  // trace that lead ever existed. Gorsegner's live forms were destroying
  // autofilled leads exactly this way until 2026-08-16, and NestGlow's own
  // contact form was doing it to Lucas on 2026-08-29.
  //
  // The field is `hp_field` across every Summit build. It was `_gotcha` here
  // until 2026-08-29 — a Formspree convention that outlived Formspree.
  if (get("hp_field")) {
    console.warn(
      `[lead] honeypot triggered — filtered as spam (or autofill false positive). ` +
        `name=${get("name")} email=${get("email")} phone=${get("phone")}`
    );
    return NextResponse.json({ ok: true, spam: true });
  }

  const name = get("name");
  const email = get("email");
  const phone = get("phone");
  const zip = get("zip");

  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  // Re-checked here even though the form enforces both. The client is not the
  // boundary — anything can POST to this route.
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  const phoneDigits = phone.replace(/\D/g, "");
  if (phone && phoneDigits.length !== 10) {
    // The field pretty-prints as you type, so what arrives is "(732) 555-0100".
    // This checks the number under the formatting, not the punctuation.
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 400 });
  }

  const outOfArea = get("out_of_area") === "yes";
  const service = get("service");
  const tier = get("tier");
  const message = get("message");

  // Resolved server-side rather than asked for: the form already has the ZIP
  // and the mapping already exists, so making the Sheet carry the town and
  // county costs nothing and saves whoever reads it from looking up 60 ZIPs by
  // hand. `countyDisplayName` ("Monmouth County"), not `county`, which is the
  // routing slug ("monmouth-county") and reads like a URL in a spreadsheet.
  // Both stay empty for an out-of-area ZIP, which is not in the map at all —
  // that is what `Out of Area` says instead.
  const match = lookupZip(zip);
  const town = match?.town ?? "";
  const county = match?.countyDisplayName ?? "";

  const missing = missingLeadConfig();
  if (missing.length > 0) {
    // Distinct from a delivery failure: nothing was attempted, and the fix is
    // setting a variable rather than investigating an outage. Named variables,
    // not internal keys — decoding "missing: url" cost an hour on TCG.
    console.error(
      `[lead] DROPPED — missing env: ${missing.join(", ")} | ` +
        `name=${name} phone=${phone} email=${email} zip=${zip}`
    );
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const payload = {
    token: LEAD_SINK.token!,
    submittedAt: new Date().toISOString(),
    name,
    phone,
    email,
    zip,
    town,
    county,
    service,
    tier,
    message,
    out_of_area: outOfArea ? "yes" : "no",
    // Sent by the form so the Sheet can answer "which page closed them?"
    // without a separate analytics query.
    form_page: get("form_page"),
    pageUrl: get("pageUrl"),
    referrer: get("referrer"),
    deviceType: get("deviceType"),
  };

  // All three run together. They share no data and none depends on another's
  // result, so sequencing them would just stack three round trips into a wait
  // the visitor is already sitting through. Chained, TCG measured this at
  // about ten seconds; in parallel it is bounded by the slowest one.
  //
  // Neither `notifyZapier` nor `sendConfirmation` rejects, so `allSettled`
  // buys nothing — their failures come back as strings for the logs below.
  const [delivery, alert, receipt] = await Promise.all([
    deliver(LEAD_SINK.url!, JSON.stringify(payload)),
    notifyZapier({
      name,
      email,
      phone: phone || undefined,
      zip: zip || undefined,
      service: service || undefined,
      tier: tier || undefined,
      message: message || undefined,
      outOfArea,
    }),
    sendConfirmation({
      name,
      email,
      service: service || undefined,
      zip: zip || undefined,
      message: message || undefined,
      outOfArea,
    }),
  ]);

  const { ok, detail, row } = delivery;

  if (ok) {
    // Logged on SUCCESS too, not just on failure. `ok` covers the Sheet row
    // alone — the alert and the receipt each fail independently while the
    // request still returns success, and those are exactly the cases this line
    // exists for. `row` is the sheet row number, so a lead is findable without
    // scrolling for a timestamp.
    console.log(
      `[lead] recorded — row=${row ?? "?"} | alert=${alert} | receipt=${receipt} | outOfArea=${outOfArea}`
    );
  }

  // Error level, and separate, because this is the one Caroline actually acts
  // on. A failed alert alongside a successful row write means the lead is safe
  // but nobody has been told, which looks exactly like a quiet day unless
  // something says otherwise here.
  if (alert.startsWith("FAILED") || alert.startsWith("skipped")) {
    console.error(
      `[lead] SMS alert not delivered (${alert}) — ${name} / ${phone} is in the sheet but unannounced`
    );
  }

  // Warn, not error: nobody is waiting on this to do their job and it does not
  // cost the lead. It does cost the customer their reassurance, which is why
  // it is not silent — "I filled out the form and never heard anything" is the
  // complaint this exists to prevent.
  if (receipt.startsWith("FAILED") || receipt.startsWith("skipped")) {
    console.warn(`[lead] customer receipt not sent (${receipt}) — ${email}`);
  }

  if (!ok) {
    // The whole lead, not just the fact one was lost. With Formspree gone this
    // is the ONLY copy that exists when the Sheet is unreachable — the row was
    // never written, so this log line is what a person retypes from. Vercel
    // keeps runtime logs; the token is removed rather than printed. `detail`
    // is what separates "Google is down" from "the token no longer matches",
    // which need completely different fixes.
    const safe: Partial<typeof payload> = { ...payload };
    delete safe.token;
    console.error(
      `[lead] DELIVERY FAILED (${detail}) — lead not recorded anywhere else: ${JSON.stringify(safe)}`
    );
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, receipt, alert });
}
