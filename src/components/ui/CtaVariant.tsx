import { HOURS } from "@/lib/hours";

/**
 * The two halves of a time-aware call-to-action. Both are always in the HTML;
 * `CtaMode` decides which is visible by setting `data-cta-mode` on <html>, and
 * the CSS in `globals.css` hides the other. See `CtaMode.tsx`.
 *
 * While `HOURS.ENABLED` is false these render the open-hours markup only, with
 * no wrapper and no after-hours copy anywhere in the DOM. That is what keeps
 * the placeholder hours in `lib/hours.ts` off a live page before Caroline has
 * confirmed them: the feature ships dark, and one boolean turns it on
 * everywhere at once.
 *
 * The off state is a genuine no-op, not a styled-away one — worth keeping true,
 * because it is what makes the switch safe to leave in the repo. If you add a
 * variant, check the built HTML contains zero `cta-variant` markup with the
 * flag off.
 */

/** Shown during answered hours. This wraps the site's EXISTING copy — the open
 *  state should always be what the page said before this feature existed. */
export function CtaOpen({ children }: { children: React.ReactNode }) {
  if (!HOURS.ENABLED) return <>{children}</>;
  return (
    <span className="cta-variant" data-when="open">
      {children}
    </span>
  );
}

/** Shown outside answered hours. Never offers a phone call. */
export function CtaClosed({ children }: { children: React.ReactNode }) {
  if (!HOURS.ENABLED) return null;
  return (
    <span className="cta-variant" data-when="closed">
      {children}
    </span>
  );
}

/**
 * "first thing tomorrow" / "at 8:00 AM this morning" / "first thing Monday",
 * filled in by the script in `CtaMode`. Reads after "back".
 *
 * The text below is the pre-script fallback and the value a crawler sees, so it
 * has to stand on its own: "on the next business day" is true in every case the
 * script refines.
 *
 * IMPORTANT: this only ever restates the hours in `lib/hours.ts` — when the
 * PHONE is answered again. It is not a promise that someone calls back by then.
 * NestGlow's existing commitment is "we reply within one business day", which is
 * already true at every hour and is deliberately left alone.
 *
 * ── ONLY USE THIS IN MARKUP THAT IS ALWAYS MOUNTED ───────────────────────
 * The script fills `[data-cta-next]` when it runs, on DOMContentLoaded, on
 * load, and on a 60-second tick. A node that React mounts later — inside a
 * modal, a sheet, a conditional branch — misses all of those and shows the
 * fallback text until the next tick. This is why it is not used inside
 * MobileNav, which only mounts when the menu opens.
 *
 * Also mind the sentence it lands in: the fallback has to read correctly too.
 * "back <CtaNext />" works for both values; "back on <CtaNext />" produced
 * "back on on the next business day".
 *
 * ── suppressHydrationWarning IS LOAD-BEARING ─────────────────────────────
 * The CtaMode script rewrites this element's textContent on DOMContentLoaded,
 * which is BEFORE React hydrates. React then finds "first thing tomorrow" where
 * the server sent "on the next business day" and throws hydration error #418 —
 * a real, visitor-facing page error, on every page that renders this.
 *
 * Suppressing tells React to leave the DOM content alone here, which is what we
 * want: the script's value is the correct one. Note this is a DIFFERENT problem
 * from the `<html data-cta-mode>` attribute React strips during hydration — that
 * one needs the MutationObserver in CtaMode.tsx and suppression does not fix it.
 * Both are needed.
 *
 * TCG and Gorsegner still render their equivalent without suppression — see
 * `projects/summit-media/cross-client-backports.md` item 1.
 */
export function CtaNext() {
  return (
    <span data-cta-next suppressHydrationWarning>
      on the next business day
    </span>
  );
}
