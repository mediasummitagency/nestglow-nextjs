"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { FORMS, BUSINESS } from "@/lib/config";
import { lookupZip } from "@/lib/zipToCounty";
import { TIERS } from "@/lib/tiers";

type FormState = "idle" | "submitting" | "success" | "error";

// Matches the four services on the home page. Commercial and Post-construction were
// removed 2026-08-22 — Caroline does not sell them, and leaving them in the dropdown
// would book walk-throughs for work she has to turn down.
const SERVICE_OPTIONS = [
  "Regular home cleaning",
  "Airbnb or rental turnover",
  "Deep cleaning",
  "Move in / move out",
  "Not sure yet",
];

function pushToDataLayer(data: Record<string, unknown>) {
  if (typeof window !== "undefined" && Array.isArray((window as unknown as { dataLayer?: unknown[] }).dataLayer)) {
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push(data);
  }
}

const fieldClass =
  "w-full rounded-lg border border-charcoal/20 bg-white px-3.5 py-2.5 text-base text-charcoal " +
  "placeholder:text-charcoal/40 outline-none transition-colors " +
  "focus:border-brand focus:ring-2 focus:ring-brand/30";

function Field({
  id,
  label,
  children,
  required,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-charcoal">
        {label}
        {required && <span className="text-brand-dark ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export function ContactForm() {
  /**
   * The hero ZIP box hands off here via ?zip= and, for an out-of-area ZIP,
   * &reason=waitlist.
   *
   * Read after mount from window.location rather than with useSearchParams():
   * that hook opts the whole subtree out of prerendering, so the static HTML
   * would contain only the Suspense fallback and the form would not exist for
   * anyone — or anything — that has not run JS yet. This is the page the whole
   * site funnels into, so the form itself ships in the HTML and the ZIP
   * prefill layers on afterwards.
   */
  const [incomingZip, setIncomingZip] = useState("");
  const [isWaitlist, setIsWaitlist] = useState(false);
  const [incomingTier, setIncomingTier] = useState("");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const z = (q.get("zip") ?? "").replace(/\D/g, "").slice(0, 5);
    if (z) setIncomingZip(z);
    setIsWaitlist(q.get("reason") === "waitlist");
    // ?tier= comes from the three plan buttons on the home page. Whitelisted
    // against the real tier ids so nothing arbitrary rides into the email.
    const t = q.get("tier") ?? "";
    if (TIERS.some((x) => x.id === t)) setIncomingTier(t);
  }, []);

  const tier = TIERS.find((t) => t.id === incomingTier) ?? null;

  const matched = incomingZip ? lookupZip(incomingZip) : null;

  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);

    // Honeypot: real people never fill a hidden field. Bots fill everything.
    if (data.get("_gotcha")) {
      setFormState("success");
      return;
    }

    setFormState("submitting");
    data.append("out_of_area", isWaitlist ? "yes" : "no");

    try {
      const res = await fetch(FORMS.booking, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        pushToDataLayer({
          event: "form_submit",
          form_type: isWaitlist ? "waitlist" : "quote_request",
          zip: String(data.get("zip") ?? ""),
          service: String(data.get("service") ?? ""),
          tier: String(data.get("tier") ?? ""),
        });
        setFormState("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border-2 border-brand/40 bg-white p-8 text-center shadow-md"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand/15">
          <CheckCircle2 size={28} className="text-brand-dark" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-charcoal">
          {isWaitlist ? "Thanks — you're on the list." : "Thanks — we've got it."}
        </h2>
        <p className="mx-auto mb-6 max-w-md text-charcoal-70">
          {isWaitlist
            ? `We're not cleaning in ${incomingZip} yet. We'll email you the moment that changes.`
            : "Caroline will get back to you within one business day to confirm the details and give you a firm price."}
        </p>
        <p className="text-sm text-charcoal-70">
          Need us sooner? Call{" "}
          <a href={BUSINESS.phoneHref} className="font-semibold text-brand-dark underline">
            {BUSINESS.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-charcoal/15 bg-white p-6 shadow-md sm:p-8">
      {isWaitlist ? (
        <div className="mb-6 rounded-lg border border-brand/30 bg-cream-100 px-4 py-3">
          <p className="text-sm text-charcoal">
            {/* {" "} not a bare space: JSX trims each line's trailing
                whitespace, so a space before a newline is stripped at build
                time and this renders as "yet.Leave". */}
            <strong>We&apos;re not in {incomingZip} yet.</strong>{" "}
            Leave your details and we&apos;ll let you know as soon as we cover
            your area.
          </p>
        </div>
      ) : matched ? (
        <div className="mb-6 rounded-lg border border-brand/30 bg-cream-100 px-4 py-3">
          <p className="text-sm text-charcoal">
            <strong>Good news, we clean in {matched.town}.</strong>{" "}
            Tell us about the job and Caroline will come back with a firm
            price.
          </p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
        {formState === "error" && (
          <div role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-800">
              That didn&apos;t go through. Please try again, or call us on{" "}
              <a href={BUSINESS.phoneHref} className="font-semibold underline">
                {BUSINESS.phone}
              </a>
              .
            </p>
          </div>
        )}

        {/* Honeypot — hidden from people, irresistible to bots. */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute h-0 w-0 overflow-hidden opacity-0"
        />

        {tier && (
          <>
            <input type="hidden" name="tier" value={tier.name} />
            <p className="rounded-xl border border-brand/30 bg-brand/8 px-4 py-3 text-sm text-charcoal">
              Quoting the <strong className="font-semibold">{tier.name}</strong>{" "}
              plan: {tier.tagline.toLowerCase()}. Tell us about the place and
              Caroline will confirm the price.
            </p>
          </>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Your name" required>
            <input id="name" name="name" required autoComplete="name" placeholder="Jane Smith" className={fieldClass} />
          </Field>
          <Field id="phone" label="Phone" required>
            <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="(732) 555-0100" className={fieldClass} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="email" label="Email" required>
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@example.com" className={fieldClass} />
          </Field>
          <Field id="zip" label="ZIP code" required>
            <input
              id="zip"
              name="zip"
              required
              inputMode="numeric"
              pattern="[0-9]{5}"
              maxLength={5}
              value={incomingZip}
              onChange={(e) => setIncomingZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              placeholder="07753"
              className={fieldClass}
            />
          </Field>
        </div>

        <Field id="service" label="What do you need?" required>
          <select id="service" name="service" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select a service…
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field id="message" label="Tell us about the place">
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="How many bedrooms and bathrooms, roughly how big, any pets, and when you'd like us — anything that helps us quote it properly."
            className={`${fieldClass} resize-y`}
          />
        </Field>

        <button
          type="submit"
          disabled={formState === "submitting"}
          className="w-full rounded-full bg-brand px-6 py-3.5 text-base font-bold text-white shadow transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {formState === "submitting" ? "Sending…" : isWaitlist ? "Join the waitlist" : "Get my free quote"}
        </button>

        <p className="text-center text-xs leading-relaxed text-charcoal-40">
          We&apos;ll use your details to answer this enquiry and may call or text you about it. No
          marketing lists, no sharing with anyone else. See our{" "}
          <Link href="/privacy-policy" className="underline hover:text-charcoal-70">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms-of-service" className="underline hover:text-charcoal-70">
            Terms
          </Link>
          .
        </p>
      </form>
    </div>
  );
}

export default ContactForm;
