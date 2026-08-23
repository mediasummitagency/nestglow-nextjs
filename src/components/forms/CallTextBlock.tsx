import { BUSINESS } from "@/lib/config";
import { CtaClosed, CtaNext, CtaOpen } from "@/components/ui/CtaVariant";

/**
 * The contact block that sits directly above the quote form on a phone.
 *
 * Ported from `bdf-nextjs/src/components/forms/CallTextButtons.tsx`. Lucas,
 * 2026-08-10, on that build: "there's always a phone number to call or text, and
 * then the form right beneath it ... strictly on mobile because you have limited
 * real estate." Same reasoning here — since /contact went form-first the form is
 * the first thing on the page, so without this a phone visitor who would rather
 * call has nothing to call until they scroll past the whole form.
 *
 * Phone only (`sm:hidden`). It disappears at exactly the width where the contact
 * cards below become a real 3-across row and the number is visible anyway.
 *
 * Styled for a dark ground — it renders on the hero photo.
 *
 * The panels are a near-opaque charcoal scrim with a backdrop blur, NOT the
 * `bg-white/5`-style wash they started as (2026-08-23). Over a photo that was
 * only a few percent lighter than what sat behind it, so the boxes read as
 * faint outlines rather than surfaces and the hero image showed straight
 * through the text. Contrast against a photo has to come from an opaque-ish
 * layer; a translucent white one just tints whatever it lands on, and the hero
 * varies from light wall to dark floor down its own height.
 *
 * ── ONE PRIMARY, AND TEXT IS NEVER IT ────────────────────────────────────
 * Exactly one primary action at any hour, with text visibly smaller than it in
 * both states:
 *
 *   during answered hours →  CALL is primary, text + email secondary
 *   outside them          →  THE FORM is primary, text + email secondary
 *
 * After hours there is deliberately NO button pointing at the form. The form is
 * the very next thing on the page, so a button that scrolls sixty pixels is
 * clutter — the copy points at it instead, and the form's own white card is
 * already the heaviest element on the hero.
 *
 * The open-hours card is deliberately NOT brand blue: the form's own submit
 * button below it is, and two blue blocks a few hundred pixels apart read as two
 * primaries. Hierarchy comes from size and contrast instead.
 *
 * A phone CTA that rings out is worse than no phone CTA — the homeowner does not
 * leave a voicemail, they hit back and call the next cleaner. Driven by
 * `lib/hours.ts`; renders the open-hours card only while `HOURS.ENABLED` is off.
 */
export function CallTextBlock() {
  return (
    <div className="flex flex-col gap-3 sm:hidden">
      {/* PRIMARY, answered hours. */}
      <CtaOpen>
        <a
          href={BUSINESS.phoneHref}
          className="group flex flex-col gap-1 rounded-2xl border border-white/25 bg-charcoal/75 p-5 shadow-lg shadow-black/25 backdrop-blur-md transition-colors hover:border-brand/60 hover:bg-charcoal/85"
        >
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60">
            <PhoneIcon />
            Call us
          </span>
          <span className="text-2xl font-bold text-white transition-colors group-hover:text-brand-light">
            {BUSINESS.phone}
          </span>
        </a>
      </CtaOpen>

      {/* PRIMARY, after hours — copy, not a button. See the note above.
          Always mounted (only CSS-hidden), so the CtaMode script can fill the
          CtaNext span; see the warning in CtaVariant.tsx. */}
      <CtaClosed>
        <div className="rounded-2xl border border-white/20 bg-charcoal/70 p-5 shadow-lg shadow-black/25 backdrop-blur-md">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
            After hours
          </p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/75">
            Caroline isn&rsquo;t at the phone right now.{" "}
            {/* The {" "} is load-bearing: JSX trims whitespace at the end of
                each line, so a bare space after </strong> is stripped at build
                time and this rendered as "belowand". */}
            <strong className="font-semibold text-white">Send the form below</strong>{" "}
            and she&rsquo;ll pick it up <CtaNext />.
          </p>
        </div>
      </CtaClosed>

      {/* SECONDARY in both states — one container, two rows, visibly lighter
          than the primary above. Label left, value right: the email address is
          long enough to wrap a phone column, and right-aligning it against a
          fixed label keeps both rows on one line each (with `truncate` as the
          backstop rather than a hopeful guess about width). */}
      <div className="overflow-hidden rounded-2xl border border-white/20 bg-charcoal/70 shadow-lg shadow-black/25 backdrop-blur-md">
        <a
          href={BUSINESS.smsHref}
          className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-white/10"
        >
          <span className="text-white/40 transition-colors group-hover:text-brand-light">
            <TextIcon />
          </span>
          <span className="text-sm text-white/60">Text</span>
          <span className="ml-auto truncate text-sm font-semibold text-white/85 transition-colors group-hover:text-brand-light">
            {BUSINESS.phone}
          </span>
        </a>
        <a
          href={BUSINESS.emailHref}
          className="group flex items-center gap-3 border-t border-white/15 px-5 py-3.5 transition-colors hover:bg-white/10"
        >
          <span className="text-white/40 transition-colors group-hover:text-brand-light">
            <MailIcon />
          </span>
          <span className="text-sm text-white/60">Email</span>
          <span className="ml-auto truncate text-sm font-semibold text-white/85 transition-colors group-hover:text-brand-light">
            {BUSINESS.email}
          </span>
        </a>
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4.2-8 4.8-8-4.8V6l8 4.8L20 6v2.2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
    </svg>
  );
}
