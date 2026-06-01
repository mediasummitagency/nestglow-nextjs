"use client";

import { useState, useRef, FormEvent } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { GuaranteeBadge } from "@/components/ui/GuaranteeBadge";
import { FORMS, BUSINESS } from "@/lib/config";
import { TIERS } from "@/lib/tiers";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormState = "idle" | "submitting" | "success" | "error";
type AltSlot = { date: string; time: string };

const residentialAddOns = [
  { id: "fridge", label: "Inside Refrigerator", price: "+$30" },
  { id: "oven", label: "Inside Oven", price: "+$30" },
  { id: "cabinets", label: "Inside Cabinets", price: "+$50" },
  { id: "laundry", label: "Laundry Service", price: "+$15 per load" },
  { id: "windows", label: "Window Cleaning", price: "+$40" },
  { id: "sameday", label: "Same Day Cleaning", price: "+$70" },
  { id: "deep", label: "Deep Cleaning", price: "+$150" },
  { id: "postconstruction", label: "Post Construction", price: "+$500" },
  { id: "moveinout", label: "Move In/Out", price: "+$120" },
];

const commercialServices = [
  "Office Window Cleaning",
  "Carpet Cleaning",
  "Kitchen/Break Room Cleaning",
  "Restroom Deep Clean",
  "Desk/Workstation Cleaning",
  "After Hours Cleaning",
  "Weekly Recurring Service",
  "Monthly Recurring Service",
  "One-Time Deep Clean",
];

const timeSlots = ["8:00 AM – 10:00 AM", "10:00 AM – 12:00 PM", "12:00 PM – 2:00 PM", "2:00 PM – 4:00 PM"];

// ─── Primitives ───────────────────────────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-cream-100 rounded-2xl p-6 border border-charcoal/5 space-y-4">
      <h2 className="font-bold text-charcoal text-base">{title}</h2>
      {children}
    </div>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-sm font-medium text-charcoal">
        {label}
        {required && <span className="text-teal ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}

// ─── Progress indicator ───────────────────────────────────────────────────────

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "Contact Info" },
    { n: 2, label: "Your Plan & Property" },
    { n: 3, label: "Schedule" },
  ];
  return (
    <div className="flex items-start justify-center gap-0 mb-8">
      {steps.map((s, idx) => {
        const done = step > s.n;
        const current = step === s.n;
        return (
          <div key={s.n} className="flex items-start">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all ${
                  done
                    ? "bg-brand border-brand text-charcoal"
                    : current
                    ? "bg-brand border-brand text-charcoal"
                    : "bg-white border-charcoal/20 text-charcoal-40"
                }`}
              >
                {done ? <Check size={14} /> : s.n}
              </div>
              <span
                className={`text-[11px] font-medium text-center leading-tight max-w-[72px] ${
                  current ? "text-charcoal font-semibold" : "text-charcoal-40"
                }`}
              >
                {s.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-px w-12 sm:w-20 mx-2 mt-4 shrink-0 transition-colors ${
                  step > s.n ? "bg-brand" : "bg-charcoal/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BookingForm({
  prefill,
}: {
  prefill?: {
    firstName?: string;
    phone?: string;
    zip?: string;
    propertyType?: string;
    frequency?: string;
    tier?: string;
  };
}) {
  // Wizard state
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTier, setSelectedTier] = useState<string>(prefill?.tier ?? "signature-glow");
  const [dismissedNudge, setDismissedNudge] = useState(false);
  const [showFreqError, setShowFreqError] = useState(false);

  // Form state
  const [formState, setFormState] = useState<FormState>("idle");
  const [propertyType, setPropertyType] = useState(prefill?.propertyType ?? "");
  const [frequency, setFrequency] = useState(prefill?.frequency ?? "");
  const [sqft, setSqft] = useState("");
  const [altSlots, setAltSlots] = useState<AltSlot[]>([]);
  const [checkedAddons, setCheckedAddons] = useState<Record<string, boolean>>({});
  const [laundryLoads, setLaundryLoads] = useState("");
  const [commercialChecked, setCommercialChecked] = useState<Record<string, boolean>>({});
  const [paymentMethod, setPaymentMethod] = useState("");

  const stepOneRef = useRef<HTMLDivElement>(null);
  const stepTwoRef = useRef<HTMLDivElement>(null);

  const isCommercial = propertyType === "office";
  const showUpgradeNudge =
    !dismissedNudge &&
    propertyType === "house" &&
    sqft === "4to5k" &&
    selectedTier === "glow";

  // ─── Helpers ───────────────────────────────────────────────────────────────

  function toggleAddon(id: string, checked: boolean) {
    setCheckedAddons((prev) => ({ ...prev, [id]: checked }));
  }

  function toggleCommercial(label: string, checked: boolean) {
    setCommercialChecked((prev) => ({ ...prev, [label]: checked }));
  }

  function addAltSlot() {
    if (altSlots.length < 3) {
      setAltSlots((prev) => [...prev, { date: "", time: "" }]);
    }
  }

  function removeAltSlot(idx: number) {
    setAltSlots((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateAltSlot(idx: number, field: keyof AltSlot, value: string) {
    setAltSlots((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  }

  function pushToDataLayer(data: Record<string, unknown>) {
    if (typeof window !== "undefined" && Array.isArray((window as unknown as { dataLayer?: unknown[] }).dataLayer)) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push(data);
    }
  }

  // ─── Wizard navigation ─────────────────────────────────────────────────────

  function handleContinue(to: 2 | 3) {
    // Validate required HTML inputs in the current step div
    const stepRef = to === 2 ? stepOneRef : stepTwoRef;
    if (stepRef.current) {
      const inputs = stepRef.current.querySelectorAll<HTMLInputElement>("input[required]");
      for (const input of inputs) {
        if (!input.checkValidity()) {
          input.reportValidity();
          return;
        }
      }
    }

    // Step 2: frequency is a custom select — check via state
    if (to === 3 && !frequency) {
      setShowFreqError(true);
      return;
    }
    setShowFreqError(false);

    if (to === 2) {
      const el = stepOneRef.current;
      pushToDataLayer({
        event: "wizard_step_1_complete",
        first_name: el?.querySelector<HTMLInputElement>("#firstName")?.value ?? "",
        last_name: el?.querySelector<HTMLInputElement>("#lastName")?.value ?? "",
        email: el?.querySelector<HTMLInputElement>("#email")?.value ?? "",
        phone: el?.querySelector<HTMLInputElement>("#phone")?.value ?? "",
        address: el?.querySelector<HTMLInputElement>("#address")?.value ?? "",
      });
      if (typeof window !== "undefined" && !sessionStorage.getItem("nestglow_partial_sent")) {
        const payload = {
          _subject: "[PARTIAL] Lead - step 1 complete",
          lead_type: "partial",
          first_name: el?.querySelector<HTMLInputElement>("#firstName")?.value ?? "",
          last_name:  el?.querySelector<HTMLInputElement>("#lastName")?.value ?? "",
          email:      el?.querySelector<HTMLInputElement>("#email")?.value ?? "",
          phone:      el?.querySelector<HTMLInputElement>("#phone")?.value ?? "",
          address:    el?.querySelector<HTMLInputElement>("#address")?.value ?? "",
          tier:       selectedTier,
          ...(prefill?.zip ? { zip: prefill.zip } : {}),
        };
        try {
          fetch(FORMS.booking, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload),
          });
          sessionStorage.setItem("nestglow_partial_sent", "1");
        } catch (err) {
          console.warn("[NestGlow] Partial lead POST failed:", err);
        }
      }
    } else {
      pushToDataLayer({ event: "wizard_step_2_complete" });
    }

    setStep(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    pushToDataLayer({ event: "wizard_back_click", from_step: step });
    setStep((s) => (s - 1) as 1 | 2 | 3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ─── Submit ────────────────────────────────────────────────────────────────

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");

    const formEl = e.currentTarget;
    const data = new FormData(formEl);

    altSlots.forEach((slot, i) => {
      data.append(`alt_slot_${i + 1}_date`, slot.date);
      data.append(`alt_slot_${i + 1}_time`, slot.time);
    });

    try {
      const res = await fetch(FORMS.booking, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        pushToDataLayer({
          event: "form_submit",
          form_type: isCommercial ? "commercial_booking" : "residential_booking",
          frequency,
          property_type: propertyType,
          tier: selectedTier,
        });
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  // ─── Success state ─────────────────────────────────────────────────────────

  if (formState === "success") {
    return (
      <div className="bg-cream-100 rounded-2xl p-8 border border-sage/40 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center mx-auto">
          <span className="text-sage-dark text-xl">✓</span>
        </div>
        <h2 className="text-xl font-bold text-charcoal">Booking request submitted!</h2>
        <p className="text-charcoal-70 text-sm leading-relaxed">
          {isCommercial
            ? "Your commercial cleaning inquiry has been submitted. We'll be in touch to schedule a walk-through and provide a custom quote."
            : "Your cleaning service request has been submitted. We'll confirm via text or phone within 24 hours."}
        </p>
        <div className="space-y-1 text-sm text-charcoal-70">
          <p>
            <a href={BUSINESS.phoneHref} className="text-brand font-semibold hover:text-brand-dark">
              {BUSINESS.phone}
            </a>
          </p>
          <p>
            <a href={BUSINESS.emailHref} className="hover:text-brand transition-colors">
              {BUSINESS.email}
            </a>
          </p>
        </div>
        <button
          onClick={() => {
            setFormState("idle");
            setStep(1);
            setPropertyType("");
            setFrequency("");
            setSqft("");
            setAltSlots([]);
            setCheckedAddons({});
            setPaymentMethod("");
            setSelectedTier("signature-glow");
          }}
          className="text-sm text-charcoal-40 underline hover:text-brand transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  // ─── Form ──────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Hidden tier input — submits with FormData */}
      <input type="hidden" name="tier" value={selectedTier} />

      {formState === "error" && (
        <div className="bg-teal/10 border border-teal/30 rounded-xl p-4 text-sm text-teal">
          There was an issue submitting your form. Please call us directly at{" "}
          <a href={BUSINESS.phoneHref} className="font-semibold underline">
            {BUSINESS.phone}
          </a>
          .
        </div>
      )}

      <StepIndicator step={step} />

      {/* ── Step 1: Contact Info ─────────────────────────────────────────── */}
      <div ref={stepOneRef} style={{ display: step === 1 ? undefined : "none" }}>
        <SectionCard title="Contact information">
          <FieldRow>
            <Field id="firstName" label="First name" required>
              <Input
                id="firstName"
                name="firstName"
                required
                defaultValue={prefill?.firstName}
                placeholder="Jane"
                className="bg-white border-charcoal/20"
              />
            </Field>
            <Field id="lastName" label="Last name" required>
              <Input
                id="lastName"
                name="lastName"
                required
                placeholder="Smith"
                className="bg-white border-charcoal/20"
              />
            </Field>
          </FieldRow>
          <FieldRow>
            <Field id="email" label="Email" required>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
                className="bg-white border-charcoal/20"
              />
            </Field>
            <Field id="phone" label="Phone" required>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                defaultValue={prefill?.phone}
                placeholder="(732) 555-0100"
                className="bg-white border-charcoal/20"
              />
            </Field>
          </FieldRow>
          <Field id="address" label="Service address" required>
            <Input
              id="address"
              name="address"
              required
              placeholder="123 Main St, Neptune City, NJ 07753"
              className="bg-white border-charcoal/20"
            />
          </Field>
        </SectionCard>

        <div className="pt-4">
          <button
            type="button"
            onClick={() => handleContinue(2)}
            className="w-full bg-brand text-charcoal font-semibold py-4 rounded-full hover:bg-brand-dark transition-colors text-base"
          >
            Continue →
          </button>
        </div>
      </div>

      {/* ── Step 2: Your Plan & Property ─────────────────────────────────── */}
      <div ref={stepTwoRef} style={{ display: step === 2 ? undefined : "none" }}>

        {/* Tier selector */}
        <SectionCard title="Your plan">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TIERS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => {
                  setSelectedTier(tier.id);
                  setDismissedNudge(false);
                }}
                className={`relative text-left rounded-2xl p-5 border-2 transition-all ${
                  selectedTier === tier.id
                    ? "border-brand shadow-md bg-white"
                    : "border-charcoal/10 bg-cream-100 hover:border-brand/40"
                }`}
              >
                {tier.isPopular && (
                  <span className="absolute top-3 right-3 bg-brand text-charcoal text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
                {selectedTier === tier.id && (
                  <span className="absolute top-3 left-3 w-4 h-4 rounded-full bg-brand flex items-center justify-center">
                    <Check size={10} className="text-charcoal" />
                  </span>
                )}
                <p className="font-bold text-charcoal text-sm mb-1 mt-1">{tier.name}</p>
                <p className="text-xs text-charcoal-70 leading-snug">{tier.bestFor}</p>
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Property details */}
        <SectionCard title="Property details">
          <Field id="propertyType" label="Property type" required>
            <Select
              value={propertyType}
              onValueChange={(v) => {
                setPropertyType(v ?? "");
                setDismissedNudge(false);
              }}
              name="propertyType"
            >
              <SelectTrigger className="bg-white border-charcoal/20">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="office">Office / Commercial</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <FieldRow>
            <Field id="bedrooms" label="Bedrooms">
              <Select name="bedrooms">
                <SelectTrigger className="bg-white border-charcoal/20">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {["Studio/0", "1", "2", "3", "4", "5+"].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field id="fullBaths" label="Full bathrooms">
              <Select name="fullBaths">
                <SelectTrigger className="bg-white border-charcoal/20">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {["0", "1", "2", "3", "4+"].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldRow>
          <FieldRow>
            <Field id="halfBaths" label="Half bathrooms">
              <Select name="halfBaths">
                <SelectTrigger className="bg-white border-charcoal/20">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {["0", "1", "2", "3+"].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            {(propertyType === "house" || propertyType === "office") && (
              <Field id="sqft" label="Square footage">
                <Select
                  value={sqft}
                  onValueChange={(v) => {
                    setSqft(v ?? "");
                    setDismissedNudge(false);
                  }}
                  name="sqft"
                >
                  <SelectTrigger className="bg-white border-charcoal/20">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under2k">Under 2,000 sq ft</SelectItem>
                    <SelectItem value="2to3k">2,000–3,000 sq ft</SelectItem>
                    <SelectItem value="3to4k">3,000–4,000 sq ft</SelectItem>
                    <SelectItem value="4to5k">4,000–5,000 sq ft</SelectItem>
                    <SelectItem value="over5k">5,000+ sq ft</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          </FieldRow>

          {/* Soft upgrade nudge */}
          {showUpgradeNudge && (
            <div className="bg-brand/10 border border-brand/30 rounded-xl p-4 space-y-3">
              <p className="text-sm font-semibold text-charcoal">
                Looks like Full Glow is a better fit for your home — want us to switch?
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTier("full-glow")}
                  className="text-sm font-semibold bg-brand text-charcoal px-4 py-2 rounded-full hover:bg-brand-dark transition-colors"
                >
                  Switch to Full Glow
                </button>
                <button
                  type="button"
                  onClick={() => setDismissedNudge(true)}
                  className="text-sm text-charcoal-40 hover:text-charcoal transition-colors"
                >
                  Keep Glow
                </button>
              </div>
            </div>
          )}
        </SectionCard>

        {/* Frequency */}
        <SectionCard title="Cleaning frequency">
          <Field id="frequency" label="How often?" required>
            <Select
              value={frequency}
              onValueChange={(v) => {
                setFrequency(v ?? "");
                setShowFreqError(false);
              }}
              name="frequency"
            >
              <SelectTrigger className={`bg-white ${showFreqError ? "border-red-400" : "border-charcoal/20"}`}>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-time">One Time</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                <SelectItem value="triweekly">Tri-Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          {showFreqError && (
            <p className="text-sm text-red-500 -mt-2">Please select a cleaning frequency.</p>
          )}
        </SectionCard>

        {/* Add-ons */}
        {!isCommercial ? (
          <SectionCard title="Additional services (optional)">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {residentialAddOns.map((addon) => (
                <div key={addon.id}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox
                      id={addon.id}
                      name={addon.id}
                      checked={!!checkedAddons[addon.id]}
                      onCheckedChange={(v) => toggleAddon(addon.id, !!v)}
                    />
                    <span className="text-sm text-charcoal group-hover:text-brand transition-colors">
                      {addon.label}{" "}
                      <span className="text-charcoal-40">{addon.price}</span>
                    </span>
                  </label>
                  {addon.id === "laundry" && checkedAddons.laundry && (
                    <div className="mt-2 ml-7">
                      <Select
                        value={laundryLoads}
                        onValueChange={(v) => setLaundryLoads(v ?? "")}
                        name="laundryLoads"
                      >
                        <SelectTrigger className="bg-white border-charcoal/20 h-8 text-sm">
                          <SelectValue placeholder="How many loads?" />
                        </SelectTrigger>
                        <SelectContent>
                          {["1", "2", "3", "4", "5+"].map((n) => (
                            <SelectItem key={n} value={n}>
                              {n} load{n !== "1" ? "s" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>
        ) : (
          <SectionCard title="Commercial services">
            <p className="text-xs text-charcoal-40">
              Select the services you&apos;re interested in. We&apos;ll provide custom pricing after our walk-through.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {commercialServices.map((svc) => (
                <label key={svc} className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    id={svc}
                    name={svc}
                    checked={!!commercialChecked[svc]}
                    onCheckedChange={(v) => toggleCommercial(svc, !!v)}
                  />
                  <span className="text-sm text-charcoal group-hover:text-brand transition-colors">{svc}</span>
                </label>
              ))}
            </div>
          </SectionCard>
        )}

        <div className="pt-4 space-y-3">
          <button
            type="button"
            onClick={() => handleContinue(3)}
            className="w-full bg-brand text-charcoal font-semibold py-4 rounded-full hover:bg-brand-dark transition-colors text-base"
          >
            Continue →
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="w-full text-sm text-charcoal-40 hover:text-charcoal transition-colors py-1"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* ── Step 3: Schedule & Notes ──────────────────────────────────────── */}
      <div style={{ display: step === 3 ? undefined : "none" }}>

        <SectionCard title="Preferred schedule">
          <FieldRow>
            <Field id="prefDate" label="Preferred date" required>
              <Input
                id="prefDate"
                name="prefDate"
                type="date"
                required
                className="bg-white border-charcoal/20"
              />
            </Field>
            <Field id="prefTime" label="Preferred time slot" required>
              <Select name="prefTime">
                <SelectTrigger className="bg-white border-charcoal/20">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldRow>
          <p className="text-xs text-charcoal-40">4:00 PM is the latest time slot available for residential cleanings.</p>

          {altSlots.map((slot, i) => (
            <div key={i} className="border border-charcoal/10 rounded-xl p-4 space-y-3 relative">
              <button
                type="button"
                onClick={() => removeAltSlot(i)}
                className="absolute top-3 right-3 text-charcoal-40 hover:text-teal transition-colors"
                aria-label="Remove this time slot"
              >
                <Minus size={14} />
              </button>
              <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-40">
                Alternative slot {i + 1}
              </p>
              <FieldRow>
                <Field id={`altDate${i}`} label="Date">
                  <Input
                    id={`altDate${i}`}
                    type="date"
                    value={slot.date}
                    onChange={(e) => updateAltSlot(i, "date", e.target.value)}
                    className="bg-white border-charcoal/20"
                  />
                </Field>
                <Field id={`altTime${i}`} label="Time slot">
                  <Select
                    value={slot.time}
                    onValueChange={(v) => updateAltSlot(i, "time", v ?? "")}
                  >
                    <SelectTrigger className="bg-white border-charcoal/20">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </FieldRow>
            </div>
          ))}

          {altSlots.length < 3 && (
            <button
              type="button"
              onClick={addAltSlot}
              className="flex items-center gap-1.5 text-sm text-charcoal-40 hover:text-brand transition-colors"
            >
              <Plus size={14} />
              Add alternative time slot
            </button>
          )}
        </SectionCard>

        <SectionCard title="Payment method">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Credit Card", "Debit Card", "Cash", "Venmo"].map((method) => (
              <label key={method} className="cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="sr-only"
                />
                <div
                  className={`border rounded-xl p-3 text-center text-sm font-medium transition-all ${
                    paymentMethod === method
                      ? "border-brand bg-brand/10 text-charcoal"
                      : "border-charcoal/10 text-charcoal-40 hover:border-brand/50"
                  }`}
                >
                  {method}
                </div>
              </label>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Additional notes (optional)">
          <Textarea
            name="notes"
            placeholder="Anything we should know — pets, parking instructions, specific areas to focus on..."
            className="bg-white border-charcoal/20 min-h-[100px]"
          />
        </SectionCard>

        <GuaranteeBadge className="py-3 border-t border-charcoal/5" />

        <div className="pt-4 space-y-3">
          <button
            type="submit"
            disabled={formState === "submitting"}
            className="w-full bg-brand text-charcoal font-semibold py-4 rounded-full hover:bg-brand-dark transition-colors disabled:opacity-60 text-base"
          >
            {formState === "submitting" ? "Submitting..." : "Submit Booking Request"}
          </button>
          <p className="text-center text-xs text-charcoal-40">
            We&apos;ll confirm via text or phone within 24 hours.
          </p>
          <button
            type="button"
            onClick={handleBack}
            className="w-full text-sm text-charcoal-40 hover:text-charcoal transition-colors py-1"
          >
            ← Back
          </button>
        </div>
      </div>
    </form>
  );
}
