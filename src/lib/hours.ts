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
 * ── LIVE SINCE 2026-08-23 ────────────────────────────────────────────────
 * Built dark against a placeholder earlier the same session, then switched on
 * once Lucas confirmed: **Mon-Fri 8am-6pm, Sat-Sun 8am-12pm, Eastern** —
 * identical to TCG and BDF, so the per-day map shape was already right. The
 * flag exists so an unverified guess about when someone answers the phone can
 * never reach a live page, which is exactly the path TCG and BDF each took.
 *
 * The off state stays a genuine no-op if it is ever needed again: `CtaClosed`
 * renders nothing, `CtaOpen` renders its children bare, `CtaMode` emits no
 * script, and the built HTML contains zero `cta-variant` markup.
 *
 * IF THE HOURS CHANGE: update `windows` below AND any human-readable copy that
 * names them, AND the expectations in `_workspace/tools/cta-clock-test.mjs` —
 * a green run against stale numbers means nothing. Nothing derives one from
 * another, and a page that says one thing while the buttons behave like
 * another is worse than either alone.
 *
 * Nothing on this site renders the hours as text today. If that changes, add
 * `BUSINESS.hours` to `config.ts` and keep it in step with `windows` by hand.
 */

export const HOURS = {
  /** ON since 2026-08-23 — the hours below are Lucas-confirmed, not a guess.
   *  Do not flip this back on placeholder values if they ever change. */
  ENABLED: true,

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
   * CONFIRMED by Lucas 2026-08-23: **Mon-Fri 8-6, Sat-Sun 8-12** — the same
   * shape TCG and BDF both turned out to have. This is why the config is a
   * per-day map and not the single open/close pair Gorsegner uses: flattened to
   * one window, a Saturday 2pm visitor would be pointed at a phone nobody is
   * answering. Do not flatten it back.
   *
   * Consequence worth knowing before reading the after-hours copy: every day of
   * the week is answered, so "first thing tomorrow" is always literally
   * tomorrow, and the "first thing <weekday>" phrasing the script can still
   * produce is unreachable with these values. Left in because it costs nothing
   * and becomes correct again the moment a day is removed — or the moment a
   * one-off closure lands in `closedDates` below.
   */
  windows: {
    1: ["08:00", "18:00"],
    2: ["08:00", "18:00"],
    3: ["08:00", "18:00"],
    4: ["08:00", "18:00"],
    5: ["08:00", "18:00"],
    6: ["08:00", "12:00"],
    7: ["08:00", "12:00"],
  } as Record<number, [string, string]>,

  /** One-off closures, "YYYY-MM-DD". A date listed here is after-hours all day,
   *  so the site leads with the form instead of the phone. Add holidays and
   *  shutdown weeks; stale past dates are harmless. */
  closedDates: [] as string[],

  /** Human-readable, for any copy that names the hours. Nothing renders it yet.
   *  Kept here so the two are visibly the same claim when someone updates one. */
  display: "Mon–Fri 8am–6pm · Sat–Sun 8am–12pm",
} as const;

/** Minutes past midnight for an "HH:MM" string. */
export function toMinutes(hhmm: string): number {
  return Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
}
