/**
 * NestGlow Co — lead intake. Google Apps Script, bound to the leads Sheet.
 *
 * **This writes spreadsheet rows. That is all it does.**
 *
 * Adapted 2026-08-29 from `bdf-nextjs/scripts/lead-intake.gs`, which is TCG's.
 * Same mechanism, NestGlow's own columns, no contact-click tab and no
 * attribution block (see below).
 *
 * ── WHAT THIS SHEET IS FOR ────────────────────────────────────────────────
 * Internal tracking. NestGlow is a flat monthly retainer, not pay-per-lead, so
 * unlike BDF's sheet this is not an invoice and no money is counted from it.
 *
 * It is still the ONLY structured copy of a lead. Formspree was removed on
 * 2026-08-29 and Caroline's alert is an SMS, which is a notification and not a
 * record — nobody can filter, sort or count a year of text messages. So if a
 * row is missing, the lead exists nowhere except a server log line.
 *
 * Two consequences, both inherited from BDF and both still true here:
 *   - Do not reorder or delete columns. Appending at the END is safe;
 *     inserting in the middle silently changes the meaning of every historical
 *     row without moving the data under it.
 *   - Do not "clean up" rows. `Notes` exists for a human to write in.
 *
 * ── NO EMAIL IN THIS FILE, EVER ───────────────────────────────────────────
 * The alert to Caroline is an SMS (`src/lib/zapier.ts` posts to a Zapier catch
 * hook, the Zap sends the text) and the customer's confirmation goes through
 * Resend (`src/lib/email.ts`). Both are fired by `/api/lead`, in parallel with
 * this request rather than after it.
 *
 * `MailApp` could not be made to deliver. It accepted every message, counted
 * each against the daily quota, returned no error and produced no bounce — and
 * nothing arrived. Four recipients tested across Gmail and Outlook on TCG
 * (2026-08-03); the only addresses that ever received anything belonged to the
 * sending account itself, which is a sent copy, not delivery. The sending
 * domain was ruled out: SPF, DKIM, DMARC and MX all verified.
 *
 * Do not add mail back here. If a notification is ever needed that SMS cannot
 * carry, it belongs in `/api/lead` with the other two, where failures are
 * visible in a log instead of being reported as a success that never happened.
 * On TCG that removal also cut about ten seconds off the visitor's wait — the
 * script used to hold them while it sent two emails before answering.
 *
 * ── DEPLOYING ─────────────────────────────────────────────────────────────
 * Extensions → Apps Script **from the Sheet** — not from the Apps Script
 * project list, which creates an unbound project that cannot reach the
 * spreadsheet. Then Deploy → Manage deployments → pencil → New version.
 *   - Execute as:      Me
 *   - Who has access:  Anyone      <- required; the token below is what
 *                                     actually guards it, not the URL
 *   - Copy the /exec URL into LEAD_SHEET_URL on Vercel
 *   - Project Settings → Script Properties → add LEAD_TOKEN, matching
 *     LEAD_WEBHOOK_TOKEN on Vercel exactly
 *
 * **Use the pencil, never "New deployment".** A new deployment mints a new URL
 * and orphans the one in Vercel. That happened three times on TCG on
 * 2026-08-03.
 *
 * **The Version dropdown defaults to the existing version.** Change it to "New
 * version", or the pencil redeploys the previous snapshot to the same URL and
 * reports success — the editor shows your new code, the endpoint serves the
 * old, and nothing anywhere says so. That cost a session on TCG on 2026-08-04.
 *
 * Re-deploy after ANY edit, and bump `SCRIPT_VERSION` as part of the edit.
 */

// ── Config ────────────────────────────────────────────────────────────────

/**
 * Which edit of this file is actually deployed. **Bump this on every change**,
 * and treat it as part of the change rather than paperwork after it.
 *
 * It exists because "is the new code live?" was otherwise only answerable by
 * submitting a real lead and reading the shape of the row it produced — and
 * only in hindsight, since a deploy that silently redeployed the previous
 * snapshot looks identical to one that worked.
 *
 * Returned on the `unauthorized` path deliberately, not just on success. That
 * path needs no token, writes no row and notifies nobody, so anyone can ask
 * the live endpoint what it is running:
 *
 *   node -e "fetch('<the /exec URL>',{method:'POST',
 *     headers:{'Content-Type':'application/json'},
 *     body:JSON.stringify({token:'probe'})}).then(async r=>
 *     console.log(await r.text()))"
 *
 * The `v` that comes back is the deployed edit. If it is not this string, the
 * deployment is stale no matter what the editor shows.
 */
var SCRIPT_VERSION = '2026-08-29a';

/** Tab name. Created on demand, so a fresh spreadsheet needs no setup beyond
 *  deploying this script. */
var LEADS_TAB = 'Leads';

/**
 * Column order. **Append to the END when adding a field.**
 *
 * `Notes` is written EMPTY and never touched again — it is for a human.
 *
 * `Out of Area` is 'yes' for someone whose ZIP is outside Monmouth, Ocean and
 * Middlesex. They were shown a waitlist message rather than a quote promise,
 * so the row is a demand signal, not a job to chase. Kept in the same tab
 * rather than split off because the interesting question is the ratio.
 *
 * When NestGlow starts running ads, the 23 attribution columns from
 * `bdf-nextjs/scripts/lead-intake.gs` append after `Referrer` — in that order,
 * and matching `src/lib/attribution.ts` on the site side.
 */
var LEAD_HEADERS = [
  'Received', 'Name', 'Phone', 'Email',
  'ZIP', 'Town', 'County', 'Service', 'Tier', 'Message', 'Out of Area',
  'Notes',
  'Form Page', 'Page URL', 'Device', 'Referrer'
];

// ── Entry point ───────────────────────────────────────────────────────────
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var expected = PropertiesService.getScriptProperties().getProperty('LEAD_TOKEN');
    if (!expected || data.token !== expected) {
      // Returned as data, not thrown: a wrong token is either our own
      // misconfiguration or someone poking the URL, and neither should get a
      // stack trace back.
      //
      // Note for whoever changes this: a web app CANNOT return a non-2xx
      // status through ContentService — this reaches /api/lead as HTTP 200
      // with `{ok:false}` in the body. That is exactly why `deliver()` in
      // src/lib/sheet.ts reads the body instead of trusting the status. If you
      // change this shape, change that check with it, or a bad token starts
      // reading as a successful delivery and every lead disappears while the
      // visitor is shown a thank-you.
      return json({ ok: false, error: 'unauthorized', v: SCRIPT_VERSION });
    }

    return appendRow([
      // A real Date, not the ISO string. `2026-08-29T23:24:03.411Z` is not a
      // time of day to anyone reading it, and as text it sorts and filters
      // like text. Handing Sheets a Date makes it a proper datetime cell — it
      // renders in the spreadsheet's own timezone, sorts chronologically, and
      // takes the number format applied below.
      parseWhen(data.submittedAt),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.zip || '',
      data.town || '',
      data.county || '',
      data.service || '',
      data.tier || '',
      data.message || '',
      data.out_of_area || '',
      '',  // Notes — human
      data.form_page || '',
      data.pageUrl || '',
      data.deviceType || '',
      data.referrer || ''
    ]);
  } catch (err) {
    // Surfaces to /api/lead as a rejected delivery, which then logs the whole
    // lead server-side and tells the visitor to call. Also lands in this
    // script's own execution log.
    console.error('lead-intake failed: ' + err);
    return json({ ok: false, error: String(err), v: SCRIPT_VERSION });
  }
}

// ── Pieces ────────────────────────────────────────────────────────────────

/**
 * Appends one row to the Leads tab, creating the tab and its header row if
 * this is the first write.
 *
 * `row` is returned so a lead can be found in the Sheet from a log line alone,
 * without scrolling for a timestamp.
 */
function appendRow(values) {
  var sheet = getTab(LEADS_TAB, LEAD_HEADERS);
  sheet.appendRow(values);
  var rowIndex = sheet.getLastRow();

  // Applied per row rather than once to the whole column. `ensureHeaders` only
  // runs on an empty tab, so a format set there would never reach a tab that
  // already has rows — which every real one does after the first lead.
  sheet.getRange(rowIndex, 1).setNumberFormat('mmm d, yyyy  h:mm am/pm');

  return json({ ok: true, row: rowIndex, tab: LEADS_TAB, v: SCRIPT_VERSION });
}

/** The named tab, created with its header row if it does not exist yet. */
function getTab(tabName, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
  }
  ensureHeaders(sheet, headers);
  return sheet;
}

function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

/** The `Received` cell. Returns a real Date so Sheets stores a datetime it can
 *  sort and format, and falls back to "now" rather than writing an Invalid
 *  Date if the caller ever sends something unparseable. */
function parseWhen(iso) {
  if (!iso) return new Date();
  var d = new Date(iso);
  return isNaN(d.getTime()) ? new Date() : d;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
