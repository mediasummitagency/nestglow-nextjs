# The lead path — NestGlow Co

Rebuilt 2026-08-29. Formspree removed; a Google Sheet is now the record.

```
Contact form ──▶ /api/lead ──┬──▶ Apps Script ──▶ Google Sheet    THE RECORD
                             ├──▶ Zapier hook ──▶ SMS to Caroline  the alert
                             └──▶ Resend      ──▶ customer receipt a nicety
```

All three fire in parallel. **Only the Sheet write can fail the visitor's submit.**

| Leg | If it fails | Visitor sees |
|---|---|---|
| Sheet | 502, whole lead written to the Vercel log | The form's error state |
| SMS | 200, logged at **error** level | Success screen |
| Resend | 200, logged at warn level | Success screen |

The SMS is deliberately not allowed to fail the request: it runs through Zapier, which has a task
quota and a third party in the middle, and a lead sitting safely in the Sheet is not lost because
a text did not send. But it *is* logged as an error, because a delivered lead nobody has been
told about looks exactly like a quiet day.

## Why Formspree was removed

Two reasons, in ascending order of seriousness.

**It silently drops near-duplicate submissions.** On 2026-08-28, six or seven test submissions
with the same name, email and phone produced exactly one delivery. `/api/lead` returned 502 for
the rest. Because the site only pushes `form_submit` to the dataLayer *after* a successful
response, the GA4 conversion stopped firing too — which was the only visible symptom, and it cost
most of an afternoon to trace.

**Nobody has the account.** It was set up long enough ago that neither Lucas nor Caroline can
reach it. No way to see the submission archive, read or relax the spam rules, check the monthly
quota, or change the recipient — on the one path that carries revenue. A dependency nobody can
log into is not a dependency you can operate.

`FORMS` still exists in `src/lib/config.ts` only because the orphaned `BookingForm.tsx`
references it. Both can be deleted together; removing the config block alone breaks the build.

## Setting up the Sheet — do this once

### 1. Create the spreadsheet
A new Google Sheet in the Summit account. Name it something like `NestGlow — Leads`. **No tabs or
headers needed** — the script creates the `Leads` tab and its header row on the first write.

### 2. Paste the script
From inside that Sheet: **Extensions → Apps Script**.

⚠️ **From the Sheet, not from the Apps Script project list.** Starting from the project list
creates an *unbound* project that cannot reach the spreadsheet, and it fails at the first write
with an error that does not say so.

Delete the placeholder `myFunction`, paste the entire contents of
[`scripts/lead-intake.gs`](../scripts/lead-intake.gs), save.

### 3. Set the token
**Project Settings** (gear, left sidebar) → **Script Properties** → **Add script property**

| Property | Value |
|---|---|
| `LEAD_TOKEN` | a long random string — `openssl rand -hex 24` |

Keep that value; it goes into Vercel in step 5 and the two must match exactly.

### 4. Deploy
**Deploy → New deployment → Web app**

| Field | Value |
|---|---|
| Execute as | **Me** |
| Who has access | **Anyone** |

"Anyone" is required — Vercel calls this with no Google credentials. The token from step 3 is
what actually guards it, not the obscurity of the URL.

Authorise when prompted (it will warn the app is unverified; it is your own script). Copy the
**Web app URL**, ending in `/exec`.

### 5. Set the Vercel variables
Project → Settings → Environment Variables, **Production**:

| Name | Value |
|---|---|
| `LEAD_SHEET_URL` | the `/exec` URL from step 4 |
| `LEAD_WEBHOOK_TOKEN` | the same string as `LEAD_TOKEN` |

**Redeploy.** Environment variables are read when the server starts, so a new value does nothing
until the next deployment.

### 6. Verify before trusting it
Submit one real form on the live site with **details you have not used before** — see the warning
below. Then check, in order:

- a row appears in the Sheet, with Town and County filled in
- Caroline gets the text
- the customer address gets the receipt
- the Vercel log reads `[lead] recorded — row=2 | alert=sent | receipt=sent: …`

## ⚠️ Two mistakes that cost sessions on TCG

Both are in the script's own header comment too, because they are invisible when they happen.

**Redeploying: use the pencil, never "New deployment".** A new deployment mints a *new URL* and
orphans the one in Vercel. Leads then post into the void while everything reports success. This
happened three times on TCG on 2026-08-03.

**The Version dropdown defaults to the existing version.** Change it to **New version**, or the
pencil redeploys the previous snapshot to the same URL and reports success. The editor shows your
new code, the endpoint serves the old, and nothing anywhere says so.

`SCRIPT_VERSION` exists to make that detectable. Ask the live endpoint what it is running:

```sh
node -e "fetch('<the /exec URL>',{method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({token:'probe'})}).then(async r=>console.log(await r.text()))"
```

The `v` that comes back is the deployed edit. Bump `SCRIPT_VERSION` as part of every change.

## ⚠️ A token mismatch does not look like an error

An Apps Script web app **can only answer HTTP 200**. It cannot return a 4xx or 5xx at all. A
rejected token comes back as `200 {"ok":false,"error":"unauthorized"}`.

That is why `deliver()` in `src/lib/sheet.ts` parses the **body** instead of trusting the status.
Trusting `res.ok` would turn every dropped lead into a thank-you screen. If you ever change the
shape the script returns, change that check with it.

Verified 2026-08-29 against a stand-in endpoint: token mismatch → 502, HTML error page → 502,
valid write → 200. Both failure modes arrive as HTTP 200 from Apps Script and are caught by
reading the body.

## The columns

| Column | Source |
|---|---|
| Received | server timestamp, written as a real Date so Sheets can sort it |
| Name, Phone, Email, ZIP | the form |
| **Town, County** | resolved server-side from the ZIP via `lib/zipToCounty.ts` |
| Service, Tier, Message | the form (`Tier` only when they came from a pricing card) |
| Out of Area | `yes` when the ZIP is outside Monmouth/Ocean/Middlesex |
| Notes | **left blank, for a human** |
| Form Page, Page URL, Device, Referrer | captured by the form at submit |

**Do not reorder or delete columns.** Appending at the END is safe; inserting in the middle
silently changes the meaning of every historical row without moving the data under it.

Out-of-area rows stay in the same tab rather than being split off, because the interesting
question is the ratio — how much demand is arriving from towns Caroline does not serve yet.

## Not built yet: attribution

BDF's version of this carries 23 UTM and click-id columns because BDF runs ads. NestGlow does
not, so they were left out rather than shipped empty. When ads start, the pattern to copy is
`bdf-nextjs/src/lib/attribution.ts` plus its client-side capture — it needs columns here *and* a
component that stashes the parameters on landing, so it is a feature rather than a config change.
Append the columns after `Referrer`.

## Testing this without touching Caroline

`/api/lead` was verified end to end on 2026-08-29 against a local stand-in for both Apps Script
and Zapier, so nothing reached her phone. If you need to do that again: point `LEAD_SHEET_URL`
and `ZAPIER_LEAD_HOOK_URL` at a local server before starting `next start`. Shell environment
variables take precedence over `.env.local`, which is what keeps the real hook out of it.

**And when testing against the real thing, always use fresh details.** Repeat submissions were
what Formspree was silently dropping; there is no reason to believe every downstream service is
free of similar filtering.
