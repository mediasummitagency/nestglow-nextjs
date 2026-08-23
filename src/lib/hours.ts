/**
 * Answered hours, and the single source of truth for the time-aware CTAs.
 *
 * Fourth build of this system. Original: `gorsegner-local-test-build/includes/
 * cta-mode.php` (2026-08-17) → `tcg-nextjs/src/lib/hours.ts` (2026-08-18) →
 * `bdf-nextjs/src/lib/hours.ts` (2026-08-19b), which is what this is adapted
 * from. BDF deliberately, not TCG: BDF is the only copy carrying both fixes
 * logged in `projects/summit-media/cross-client-backports.md` (the
 * `suppressHydrationWarning` on `CtaNext`, and `nextPhrase` respecting
 * `closedDates`). Porting from TCG would have re-introduced two known bugs.
 *
 * ── SHIPPING DARK — READ BEFORE TOUCHING `ENABLED` ───────────────────────
 * `ENABLED` is false and the `windows` below are a PLACEHOLDER. Nobody has
 * told us when Caroline actually answers her phone — it is not in `config.ts`,
 * not in the client folder, not in `progress.md`. A guess about when a human
 * picks up is exactly the claim that must never reach a live page.
 *
 * While the flag is off this is a genuine no-op, not a styled-away one:
 * `CtaClosed` renders nothing, `CtaOpen` renders its children bare, and
 * `CtaMode` emits no script at all. The built HTML contains zero `cta-variant`
 * markup. That is what makes it safe to leave in the repo half-finished.
 *
 * TO TURN IT ON: replace `windows` with Caroline's real hours, set
 * `ENABLED: true`, and add a matching `BUSINESS.hours` to `config.ts` if the
 * footer or contact page ever renders the hours as text. TCG and BDF both did
 * exactly this in a single session once Lucas confirmed.
 *
 * IF THE HOURS CHANGE LATER: update `windows` AND any human-readable copy that
 * names them. Nothing derives one from the other, and a page that says one
 * thing while the buttons behave like another is worse than either alone.
 */

export const HOURS = {
  /** OFF — the `windows` below are invented. Do not flip this to true until
   *  Caroline's real hours are confirmed and pasted in. See the header. */
  ENABLED: false,

  /**
   * Always the business's clock, never the visitor's.
   *
   * EASTERN. NestGlow serves Monmouth, Ocean and Middlesex County, New Jersey.
   * Do not copy `America/Chicago` across from the BDF file — that one is
   * Houston and says so in its own comment.
   */
  tz: "America/New_York",

  /**
   * ISO-8601 weekday (1 = Monday … 7 = Sunday) → [open, close] as 24h "HH:MM".
   * A day absent from this map is closed all day.
   *
   * ⚠️ PLACEHOLDER — NOT CONFIRMED BY ANYONE. Shaped as a plausible cleaning
   * schedule (weekdays plus a short Saturday) purely so the mechanism can be
   * exercised and tested while the flag is off.
   *
   * The per-day map is the right shape even so, and should not be flattened to
   * a single open/close pair: a Saturday-afternoon visitor and a Tuesday-
   * afternoon visitor are not in the same state, and flattening would point the
   * Saturday one at a phone nobody is answering.
   */
  windows: {
    1: ["08:00", "17:00"],
    2: ["08:00", "17:00"],
    3: ["08:00", "17:00"],
    4: ["08:00", "17:00"],
    5: ["08:00", "17:00"],
    6: ["09:00", "13:00"],
    // 7 (Sunday) absent = closed all day.
  } as Record<number, [string, string]>,

  /** One-off closures, "YYYY-MM-DD". A date listed here is after-hours all day,
   *  so the site leads with the form instead of the phone. Add holidays and
   *  shutdown weeks; stale past dates are harmless. */
  closedDates: [] as string[],

  /** Human-readable, for any copy that names the hours. Nothing renders it yet.
   *  Kept here so the two are visibly the same claim when someone updates one.
   *  Placeholder, same as `windows`. */
  display: "Mon–Fri 8am–5pm · Sat 9am–1pm",
} as const;

/** Minutes past midnight for an "HH:MM" string. */
export function toMinutes(hhmm: string): number {
  return Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
}
