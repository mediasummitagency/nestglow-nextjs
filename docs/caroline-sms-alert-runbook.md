# Runbook — Caroline's SMS lead alert (Zapier)

Live since 2026-08-27. Confirmed arriving on Caroline's phone.

## The path

```
Contact form  ->  /api/lead  ->  Formspree        ->  Caroline's email  (THE LEAD)
                             ->  Resend           ->  customer's receipt (nicety)
                             ->  Zapier Catch Hook -> SMS by Zapier -> Caroline (alert)
```

All three legs run in parallel. **Only Formspree can fail the request.** If Zapier is down or
the Zap is off, the lead still reaches Caroline by email and the visitor still sees the success
screen. The failure shows up only in the Vercel log.

Modelled on `websites/karla-quiz`, which does the same thing through a Google Sheet. There is no
sheet here, so the site posts to the hook directly. That removes Zapier's polling delay: Karla's
alert waits for the next poll, Caroline's fires on submit.

## ⚠️ It was WhatsApp first. WhatsApp cannot work here — do not retry it

Built against Zapier's WhatsApp Notifications app first, because that is what Karla's quiz uses.
It delivered nothing while reporting success at every single step: the Zap ran, the action
returned `Message sent successfully`, and Meta issued a real `wamid` message ID. Nothing arrived.

**Meta paused MARKETING-category WhatsApp templates to US numbers on 2025-04-01, with no end
date.** The API still accepts the message, returns 200 and a real ID, then drops it.
AUTHENTICATION and UTILITY templates are unaffected, which is exactly why Caroline's setup OTP
arrived fine and the lead alerts never did. Karla is reachable only because she is in Brazil.

This is not a misconfigured Zap. Changing templates, reconnecting the account, or re-verifying
the number does not fix it. **WhatsApp lead alerts are dead for every US client.** Logged in
`learnings/patterns.md`, 2026-08-27.

## Setup, in order

1. **Zapier → Create Zap → Trigger: Webhooks by Zapier → Catch Hook.** Leave "Pick off a child
   key" empty. Copy the URL it gives you.
2. **Vercel → nestglow-nextjs → Settings → Environment Variables.** Add
   `ZAPIER_LEAD_HOOK_URL` = that URL, for Production. Mark it sensitive — anyone holding the URL
   can push fake leads to Caroline's phone.
3. **Redeploy.** Env vars are read when the server starts, so a new value does nothing until the
   next deploy.
4. **Get a sample into Zapier so there are fields to map.**

   **Do not do this by submitting the live contact form.** That runs the whole path, and
   Formspree would put a fake lead in Caroline's real inbox. Post straight to the hook instead:

   ```sh
   curl -X POST -H "Content-Type: application/json" \
     -d '{"name":"TEST LEAD","phone":"(732) 555-0100","email":"test@summitmedia.co","zip":"07753","service":"Deep cleaning","tier":"Glow","message":"Test payload.","out_of_area":"no","submitted_at":"2026-08-27T00:00:00.000Z","source":"NestGlow Co — contact form"}' \
     "$ZAPIER_LEAD_HOOK_URL"
   ```

5. **Action: SMS by Zapier → Send SMS.**
   - **From Number** — pick one and never change it, so Caroline can save it as a contact and
     the alerts thread together instead of arriving from a stranger each time.
   - **Message** — freeform, unlike WhatsApp. Current wording:

     ```
     New NestGlow lead

     {{Name}}
     {{Phone}}

     {{Service}} in {{Zip}}

     {{Message}}
     ```

     Name and phone lead, because the only action that matters is calling back. **The phone sits
     on its own line so it cannot wrap mid-number and stays tappable** — same rule the
     confirmation email follows. `Submitted At` is deliberately left out: it is raw UTC and the
     text arrives instantly anyway. `Tier` is left out because it is blank unless the visitor
     came from a pricing card.
6. **Test, confirm Caroline receives it, then turn the Zap on.** A Zap left off answers 410 and
   nothing visible breaks.

## Two limits that belong to SMS by Zapier, not to this code

- **T-Mobile numbers are not supported.** Zapier says so in the action's own Configure step. If
  Caroline ever ports her number to T-Mobile, this channel dies silently.
- **There is a monthly send cap** tied to the Zapier plan. Worth watching against real lead
  volume rather than discovering it during a busy month.

If either bites, the replacement is **Pushover** — no carrier restrictions, no send cap, custom
wording, already written at `bdf-nextjs/src/lib/push.ts` and `tcg-nextjs/src/lib/push.ts` and
the pattern Lucas standardised on 2026-08-20. Swapping the destination is a change to this one
leg, not a rebuild.

## Fields the hook receives

Every one of these is sent on every lead, blank rather than missing, so they all stay mappable.

| Field | Notes |
|---|---|
| `name` | required on the form |
| `email` | required on the form |
| `phone` | required on the form |
| `zip` | required on the form |
| `service` | required on the form |
| `tier` | the pricing card they came from, blank otherwise |
| `message` | **the only optional field on the form** |
| `out_of_area` | `"yes"` / `"no"` — string, not boolean, so it reads properly inside message text |
| `submitted_at` | ISO, when the person hit submit (not when the Zap ran) |
| `source` | `NestGlow Co — contact form` |

Right now **every** lead is texted, including out-of-area ones. Those visitors were shown a
waitlist message rather than a quote promise, so if Caroline does not want the interruption, add
a Zapier **Filter** step set to continue only when `out_of_area` is `no`. No code change needed.

## Reading the log

One line per lead in Vercel's function logs:

```
[lead] formspree=ok receipt=sent: … alert=sent outOfArea=false
```

`alert=` values:

| Value | Means |
|---|---|
| `sent` | Zapier accepted it |
| `skipped: missing ZAPIER_LEAD_HOOK_URL` | env var not set in this environment |
| `FAILED: http 410` | **the Zap is off or deleted.** The failure most likely to go unnoticed |
| `FAILED: ENOTFOUND` / `TimeoutError` | network |

Note what this log line does **not** tell you: `alert=sent` means Zapier accepted the payload,
not that a text reached Caroline. That distinction is what hid the WhatsApp failure for a whole
afternoon. To verify actual delivery, check Zapier's Zap History and ask Caroline.
