# Runbook — Caroline's WhatsApp lead alert (Zapier)

Set up 2026-08-27. **The Zap is built and published** (Lucas). The code side is written and
builds clean, but is **not live until `ZAPIER_LEAD_HOOK_URL` is set in Vercel and the site is
redeployed** — until then production sends nothing to the hook and the log reads
`alert=skipped: missing ZAPIER_LEAD_HOOK_URL`.

The hook URL is a secret. It lives in `.env.local` (gitignored) for local work and must be
pasted into Vercel by hand. It is deliberately absent from `.env.example` and from this file.

## The path

```
Contact form  ->  /api/lead  ->  Formspree      ->  Caroline's email   (THE LEAD)
                             ->  Resend         ->  customer's receipt (nicety)
                             ->  Zapier Catch Hook -> WhatsApp Notifications -> Caroline (alert)
```

All three legs run in parallel. **Only Formspree can fail the request.** If Zapier is down or
the Zap is off, the lead still reaches Caroline by email and the visitor still sees the success
screen — the failure shows up only in the Vercel log.

Modelled on `websites/karla-quiz`, which does the same thing through a Google Sheet. There is no
sheet here, so the site posts to the hook directly. That removes Zapier's polling delay: Karla's
alert waits for the next poll, Caroline's fires on submit.

## Setup, in order

1. **Zapier → Create Zap → Trigger: Webhooks by Zapier → Catch Hook.** Leave "Pick off a child
   key" empty. Copy the URL it gives you.
2. **Vercel → nestglow-nextjs → Settings → Environment Variables.** Add
   `ZAPIER_LEAD_HOOK_URL` = that URL, for Production. Mark it sensitive — anyone holding the URL
   can push fake leads to Caroline's phone.
3. **Redeploy.** Env vars are read when the server starts, so a new value does nothing until the
   next deploy.
4. **Get a sample into Zapier so there are fields to map.** Zapier builds its list of mappable
   fields from the samples it has caught, so this has to happen before the action step.

   **Do not do this by submitting the live contact form.** That runs the whole path, and
   Formspree would put a fake lead in Caroline's real inbox. Post straight to the hook instead:

   ```sh
   curl -X POST -H "Content-Type: application/json"      -d '{"name":"TEST LEAD — Summit Media setup","phone":"(732) 555-0100","email":"test@summitmedia.co","zip":"07753","service":"Deep cleaning","tier":"Glow","message":"Test payload.","out_of_area":"no","submitted_at":"2026-08-27T00:00:00.000Z","source":"NestGlow Co — contact form"}'      "$ZAPIER_LEAD_HOOK_URL"
   ```

   Fill every field. The code sends all ten on every real lead even when blank, so a full sample
   here just makes them easier to find in the editor. Done once already on 2026-08-27 — hit
   "Test trigger" in the Zap and it should already be there.

   Leave the end-to-end test through the real form until last, once you *want* Caroline to
   receive it.
5. **Action: WhatsApp Notifications → Send Message.** Connect the account and verify **Caroline's**
   number by OTP — the number entered here is the one that receives, and it does not have to be
   the Zapier account owner's. She has to be on hand to read the code.
6. **In the Template field, pick the built-in "New Lead" template from the dropdown. Do not type
   a sentence into it.** Freeform text crashes the action with
   `Cannot read properties of undefined (reading 'map')`. Map the caught fields into the
   template's own blanks instead. Hit for real on Karla's quiz — `learnings/patterns.md`,
   2026-07-26.
7. **Test, confirm Caroline actually receives it, then TURN THE ZAP ON.** A Zap left off answers
   410 and nothing visible breaks.

## Fields the hook receives

Every one of these is sent on every lead, blank rather than missing, so they all stay mappable.

| Field | Notes |
|---|---|
| `name` | required |
| `email` | required |
| `phone` | |
| `zip` | |
| `service` | the form's service dropdown |
| `tier` | the pricing card they came from, when they came from one |
| `message` | |
| `out_of_area` | `"yes"` / `"no"` — string, not boolean, so it reads properly inside a template blank |
| `submitted_at` | ISO, when the person hit submit (not when the Zap ran) |
| `source` | `NestGlow Co — contact form` |

Right now **every** lead is announced, including out-of-area ones. If Caroline does not want to
be pinged for those, add a Zapier Filter step on `out_of_area` — no code change needed.

## Reading the log

One line per lead in Vercel's function logs:

```
[lead] formspree=ok receipt=sent: … alert=sent outOfArea=false
```

`alert=` values:

| Value | Means |
|---|---|
| `sent` | Zapier accepted it |
| `skipped: missing ZAPIER_LEAD_HOOK_URL` | env var not set — normal before step 2 |
| `FAILED: http 410` | **the Zap is off or deleted.** The failure most likely to go unnoticed |
| `FAILED: ENOTFOUND` / `TimeoutError` | network |

## What this does not do

Zapier's WhatsApp Notifications app gives no control over the message wording — only over which
values fill the "New Lead" template's blanks. If Caroline wants the message to say something
specific, that is not a change that can be made here. Pushover (what BDF and TCG use, ported from
`bdf-nextjs/src/lib/push.ts`) does allow custom wording and would replace this leg rather than
extend it.
