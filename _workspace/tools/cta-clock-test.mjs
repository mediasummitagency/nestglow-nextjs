/**
 * CTA CLOCK TEST — drives the SHIPPED time-aware CTA script at real clock times.
 *
 * Extracts the inline script out of the built HTML and runs it against stubbed
 * DOM globals, so what is under test is the exact code a visitor executes. It
 * deliberately does NOT reimplement the open/closed rules: a second copy of the
 * logic drifts from the first and then agrees with itself while both are wrong.
 * Gorsegner logged that trap on 2026-08-17; TCG and BDF's ports avoided it the
 * same way. Adapted from `bdf-nextjs/_workspace/tools/cta-clock-test.mjs`.
 *
 * Usage:  npx next build && node _workspace/tools/cta-clock-test.mjs
 *
 * Requires `HOURS.ENABLED = true` in `src/lib/hours.ts` — with the flag off no
 * script is emitted and there is nothing to test, which the run reports rather
 * than silently passing.
 *
 * The cases below assert Caroline's CONFIRMED hours (Lucas, 2026-08-23):
 * Mon-Fri 8am-6pm, Sat-Sun 8am-12pm, Eastern. If those ever change, rewrite the
 * expectations here in the same commit — a green run against stale numbers
 * means nothing.
 *
 * ── WHAT IT CANNOT SEE ───────────────────────────────────────────────────
 * Everything except a real browser. TCG shipped this feature with 16/16 of
 * these green and it was still broken on the live site, because React's
 * hydration stripped `data-cta-mode` off <html> and neither variant was hidden.
 * The last block covers that regression, but a passing run here is NOT evidence
 * the page is right — check `html[data-cta-mode="open"]` in an actual browser.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const HTML = readFileSync(join(ROOT, ".next/server/app/index.html"), "utf8");

const match = HTML.match(/<script>\(function\(\)\{\s*\nvar TZ=[\s\S]*?\}\)\(\);<\/script>/);
if (!match) {
  console.error(
    "No CTA script in the built HTML.\n" +
      "Either HOURS.ENABLED is false (nothing to test — that is the dark state working),\n" +
      "or the build is stale. Run `npx next build` first.",
  );
  process.exit(2);
}
const SCRIPT = match[0].replace(/^<script>/, "").replace(/<\/script>$/, "");

/** Minimal DOM the script touches. `attr` is what <html> ends up carrying. */
function makeEnv({ search = "", nextEls = 1 } = {}) {
  const nextNodes = Array.from({ length: nextEls }, () => ({ textContent: "" }));
  const state = { attr: null, observers: [], pushes: [] };
  const root = {
    getAttribute: (k) => (k === "data-cta-mode" ? state.attr : null),
    setAttribute: (k, v) => {
      if (k === "data-cta-mode") state.attr = v;
    },
  };
  const document = {
    documentElement: root,
    querySelectorAll: (sel) => (sel === "[data-cta-next]" ? nextNodes : []),
    addEventListener: () => {},
    hidden: false,
  };
  const window = {
    dataLayer: undefined,
    addEventListener: () => {},
    MutationObserver: class {
      constructor(cb) {
        state.observers.push(cb);
      }
      observe() {}
    },
  };
  Object.defineProperty(window, "dataLayerPushes", { get: () => state.pushes });
  return { state, root, document, window, nextNodes, location: { search } };
}

/* Rewrites the CLOSED=[...] literal in the SHIPPED script. Still the shipped
   code path — only the data differs, exactly as if the dates were in
   HOURS.closedDates — so the holiday branch can be exercised without a rebuild
   and without a second copy of the logic. */
function withClosedDates(dates) {
  return SCRIPT.replace(/CLOSED=\[[^\]]*\]/, `CLOSED=${JSON.stringify(dates)}`);
}

function run(env, at, source = SCRIPT) {
  env.window.__NG_CTA_NOW = at;
  // setInterval is a no-op: the script arms a 60s re-check we do not want here.
  // MutationObserver is passed separately because the script guards on
  // `window.MutationObserver` but then calls the BARE constructor — identical in
  // a browser, where they are the same binding, but not in this harness.
  const fn = new Function(
    "window",
    "document",
    "location",
    "setInterval",
    "Intl",
    "MutationObserver",
    source,
  );
  fn(env.window, env.document, env.location, () => 0, Intl, env.window.MutationObserver);
  return { mode: env.state.attr, phrase: env.nextNodes[0]?.textContent };
}

let failures = 0;
function check(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : `\n        expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`}`);
  if (!ok) failures++;
}

/* Instants are given in UTC and converted by the script into New Jersey wall
   time. August is EDT (UTC-4); the January cases check EST (UTC-5) so a DST
   change cannot silently shift the whole schedule by an hour. */
const CASES = [
  // [label, UTC instant, expected mode, expected phrase or null to skip]
  // ── weekdays, 08:00-18:00 ────────────────────────────────────────────────
  ["Mon 07:59 EDT — one minute before opening", "2026-08-17T11:59:00Z", "closed", "at 8:00 AM this morning"],
  ["Mon 08:00 EDT — opening minute", "2026-08-17T12:00:00Z", "open", null],
  ["Mon 12:00 EDT — midday", "2026-08-17T16:00:00Z", "open", null],
  ["Mon 17:59 EDT — one minute before closing", "2026-08-17T21:59:00Z", "open", null],
  ["Mon 18:00 EDT — closing minute", "2026-08-17T22:00:00Z", "closed", "first thing tomorrow"],
  ["Mon 02:00 EDT — middle of the night", "2026-08-17T06:00:00Z", "closed", "at 8:00 AM this morning"],
  // ── weekend, 08:00-12:00 — the half-day is the whole reason the config is a
  //    per-day map. A single Mon-Fri window would call all five of these wrong
  //    in one direction or the other.
  ["Sat 07:59 EDT — before the weekend window", "2026-08-22T11:59:00Z", "closed", "at 8:00 AM this morning"],
  ["Sat 08:00 EDT — weekend opening minute", "2026-08-22T12:00:00Z", "open", null],
  ["Sat 11:59 EDT — last minute of the weekend window", "2026-08-22T15:59:00Z", "open", null],
  ["Sat 12:00 EDT — weekend closing minute", "2026-08-22T16:00:00Z", "closed", "first thing tomorrow"],
  ["Sat 14:00 EDT — weekend afternoon (open under weekday hours)", "2026-08-22T18:00:00Z", "closed", "first thing tomorrow"],
  ["Sun 10:00 EDT — Sunday morning is answered", "2026-08-23T14:00:00Z", "open", null],
  ["Sun 14:00 EDT — Sunday afternoon", "2026-08-23T18:00:00Z", "closed", "first thing tomorrow"],
  ["Fri 18:00 EDT — closes into an ANSWERED Saturday", "2026-08-21T22:00:00Z", "closed", "first thing tomorrow"],
  // ── timezone: the visitor's clock must never decide this ─────────────────
  ["Visitor 4pm Pacific Mon = 7pm New Jersey — closed", "2026-08-17T23:00:00Z", "closed", null],
  ["Visitor 9am Central Mon = 10am New Jersey — open", "2026-08-17T14:00:00Z", "open", null],
  // ── DST: January is EST, one hour further from UTC than August ───────────
  ["Mon 08:00 EST in January — opening minute", "2026-01-12T13:00:00Z", "open", null],
  ["Mon 07:59 EST in January — before opening", "2026-01-12T12:59:00Z", "closed", "at 8:00 AM this morning"],
];

console.log("── clock cases ──");
for (const [label, iso, mode, phrase] of CASES) {
  const env = makeEnv();
  const got = run(env, new Date(iso));
  check(label, got.mode, mode);
  if (phrase !== null) check(`   phrase: ${label}`, got.phrase, phrase);
}

console.log("\n── one-off closures (HOURS.closedDates) ──");
{
  // Monday 10am, but today is a holiday.
  const src = withClosedDates(["2026-08-17"]);
  const env = makeEnv();
  const got = run(env, new Date("2026-08-17T14:00:00Z"), src);
  check("a closed date reads as closed even inside its window", got.mode, "closed");
  check("   phrase points at the next open day", got.phrase, "first thing tomorrow");
}
{
  // Both today AND tomorrow are closures. This is the case the phrase logic got
  // WRONG before BDF's 2026-08-19b fix — it checked only whether a weekday has
  // a window, so it promised "first thing tomorrow" on a day that was itself
  // shut. TCG and Gorsegner still carry that bug; it is latent only because
  // their closedDates are empty. This port has the fix from the start.
  const src = withClosedDates(["2026-08-17", "2026-08-18"]);
  const env = makeEnv();
  const got = run(env, new Date("2026-08-17T14:00:00Z"), src);
  check("two closures in a row: mode is closed", got.mode, "closed");
  check("   phrase SKIPS the closed tomorrow", got.phrase, "first thing Wednesday");
}
{
  // Every day of the coming week shut. Nothing to name, so it must say so
  // rather than pointing at a day that is also closed.
  const week = ["17", "18", "19", "20", "21", "22", "23", "24"].map((d) => `2026-08-${d}`);
  const env = makeEnv();
  const got = run(env, new Date("2026-08-17T14:00:00Z"), withClosedDates(week));
  check("a full week of closures falls back cleanly", got.phrase, "as soon as we are back");
}

console.log("\n── forced modes (?cta=) ──");
{
  const env = makeEnv({ search: "?cta=open" });
  // A Sunday afternoon, which is closed under the 8-12 weekend window — the
  // override has to win anyway.
  check("?cta=open forces open on a closed Sunday afternoon", run(env, new Date("2026-08-23T18:00:00Z")).mode, "open");
}
{
  const env = makeEnv({ search: "?cta=closed" });
  check("?cta=closed forces closed at Monday midday", run(env, new Date("2026-08-17T16:00:00Z")).mode, "closed");
}

console.log("\n── hydration regression (this is the one TCG shipped broken) ──");
{
  const env = makeEnv();
  run(env, new Date("2026-08-17T16:00:00Z"));
  check("starts open at Monday midday", env.state.attr, "open");
  // Exactly what React's hydration pass does: the attribute is not in the
  // element's props, so it is removed.
  env.state.attr = null;
  check("attribute is gone after React strips it", env.state.attr, null);
  // The MutationObserver the script registered should put it straight back.
  for (const cb of env.state.observers) cb();
  check("MutationObserver restores it", env.state.attr, "open");
}

console.log(`\n${failures === 0 ? "ALL PASS" : `${failures} FAILURE(S)`}`);
process.exit(failures === 0 ? 0 : 1);
