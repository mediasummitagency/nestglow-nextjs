import Link from "next/link";
import { BUSINESS } from "@/lib/config";
import { CtaOpen, CtaClosed } from "@/components/ui/CtaVariant";

/**
 * A page's main call to action, in whichever form is useful at the hour.
 *
 *   answered hours -> "Call (732) 614-0192"  (tel:)
 *   after hours    -> the page's own label   (-> /contact, the form)
 *
 * ONE of the two, never both — a page offering a call and a form side by side
 * splits the decision, and half of that choice is dead at 2am. Which half is
 * live is the only thing that changes.
 *
 * Both are always in the HTML and CSS hides the one that does not apply (see
 * `CtaMode.tsx`), so nothing paints and then swaps. While `HOURS.ENABLED` is
 * false, `CtaOpen` renders its children bare and `CtaClosed` renders nothing —
 * which would leave the CALL button showing at every hour. That is deliberate
 * and matches every other variant on the site: the open state is the one that
 * survives the feature being off. It is only reachable by turning the flag off
 * again, which would be a decision, not an accident.
 *
 * NOT used on /contact itself — the form is already the page, so a button
 * pointing at it would be a link to where you are.
 */
export function PrimaryCta({
  label,
  className,
}: {
  /** Shown after hours, pointing at the form. The open state always says
   *  "Call <number>" — a page-specific label there would bury the number. */
  label: string;
  className: string;
}) {
  return (
    <>
      <CtaOpen>
        <a href={BUSINESS.phoneHref} className={className}>
          Call {BUSINESS.phone}
        </a>
      </CtaOpen>
      <CtaClosed>
        <Link href="/contact" className={className}>
          {label}
        </Link>
      </CtaClosed>
    </>
  );
}
