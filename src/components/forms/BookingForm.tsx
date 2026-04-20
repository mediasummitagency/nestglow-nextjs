"use client";

import { useState, FormEvent } from "react";
import { Plus, Minus } from "lucide-react";
import { FORMS, BUSINESS } from "@/lib/config";
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
        {required && <span className="text-terracotta ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}

export default function BookingForm({
  prefill,
}: {
  prefill?: { firstName?: string; phone?: string; zip?: string; propertyType?: string; frequency?: string };
}) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [propertyType, setPropertyType] = useState(prefill?.propertyType ?? "");
  const [frequency, setFrequency] = useState(prefill?.frequency ?? "");
  const [altSlots, setAltSlots] = useState<AltSlot[]>([]);
  const [checkedAddons, setCheckedAddons] = useState<Record<string, boolean>>({});
  const [laundryLoads, setLaundryLoads] = useState("");
  const [commercialChecked, setCommercialChecked] = useState<Record<string, boolean>>({});
  const [paymentMethod, setPaymentMethod] = useState("");

  const isCommercial = propertyType === "office";

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

  function fireGTM(data: Record<string, string>) {
    if (typeof window !== "undefined" && "dataLayer" in window) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: "form_submit",
        ...data,
      });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");

    const formEl = e.currentTarget;
    const data = new FormData(formEl);

    // Append alt slots manually
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
        fireGTM({
          form_type: isCommercial ? "commercial_booking" : "residential_booking",
          frequency,
          property_type: propertyType,
        });
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

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
            <a href={BUSINESS.phoneHref} className="text-gold font-semibold hover:text-gold-dark">
              {BUSINESS.phone}
            </a>
          </p>
          <p>
            <a href={BUSINESS.emailHref} className="hover:text-gold transition-colors">
              {BUSINESS.email}
            </a>
          </p>
        </div>
        <button
          onClick={() => {
            setFormState("idle");
            setPropertyType("");
            setFrequency("");
            setAltSlots([]);
            setCheckedAddons({});
            setPaymentMethod("");
          }}
          className="text-sm text-charcoal-40 underline hover:text-gold transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {formState === "error" && (
        <div className="bg-terracotta/10 border border-terracotta/30 rounded-xl p-4 text-sm text-terracotta">
          There was an issue submitting your form. Please call us directly at{" "}
          <a href={BUSINESS.phoneHref} className="font-semibold underline">
            {BUSINESS.phone}
          </a>
          .
        </div>
      )}

      {/* Section 1 — Contact info */}
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
            <Input id="lastName" name="lastName" required placeholder="Smith" className="bg-white border-charcoal/20" />
          </Field>
        </FieldRow>
        <FieldRow>
          <Field id="email" label="Email" required>
            <Input id="email" name="email" type="email" required placeholder="jane@example.com" className="bg-white border-charcoal/20" />
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
          <Input id="address" name="address" required placeholder="123 Main St, Neptune City, NJ 07753" className="bg-white border-charcoal/20" />
        </Field>
      </SectionCard>

      {/* Section 2 — Property */}
      <SectionCard title="Property details">
        <Field id="propertyType" label="Property type" required>
          <Select value={propertyType} onValueChange={(v) => setPropertyType(v ?? "")} name="propertyType">
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
              <SelectTrigger className="bg-white border-charcoal/20"><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent>
                {["Studio/0", "1", "2", "3", "4", "5+"].map((v) => (
                  <SelectItem key={v} value={v}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field id="fullBaths" label="Full bathrooms">
            <Select name="fullBaths">
              <SelectTrigger className="bg-white border-charcoal/20"><SelectValue placeholder="Select..." /></SelectTrigger>
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
              <SelectTrigger className="bg-white border-charcoal/20"><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent>
                {["0", "1", "2", "3+"].map((v) => (
                  <SelectItem key={v} value={v}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          {(propertyType === "house" || propertyType === "office") && (
            <Field id="sqft" label="Square footage">
              <Select name="sqft">
                <SelectTrigger className="bg-white border-charcoal/20"><SelectValue placeholder="Select..." /></SelectTrigger>
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
      </SectionCard>

      {/* Section 3 — Frequency */}
      <SectionCard title="Cleaning frequency">
        <Field id="frequency" label="How often?" required>
          <Select value={frequency} onValueChange={(v) => setFrequency(v ?? "")} name="frequency">
            <SelectTrigger className="bg-white border-charcoal/20"><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">One Time</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-Weekly</SelectItem>
              <SelectItem value="triweekly">Tri-Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </SectionCard>

      {/* Section 4 — Scheduling */}
      <SectionCard title="Preferred schedule">
        <FieldRow>
          <Field id="prefDate" label="Preferred date" required>
            <Input id="prefDate" name="prefDate" type="date" required className="bg-white border-charcoal/20" />
          </Field>
          <Field id="prefTime" label="Preferred time slot" required>
            <Select name="prefTime">
              <SelectTrigger className="bg-white border-charcoal/20"><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent>
                {timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
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
              className="absolute top-3 right-3 text-charcoal-40 hover:text-terracotta transition-colors"
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
                <Select value={slot.time} onValueChange={(v) => updateAltSlot(i, "time", v ?? "")}>
                  <SelectTrigger className="bg-white border-charcoal/20"><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
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
            className="flex items-center gap-1.5 text-sm text-charcoal-40 hover:text-gold transition-colors"
          >
            <Plus size={14} />
            Add alternative time slot
          </button>
        )}
      </SectionCard>

      {/* Section 5/6 — Add-ons */}
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
                  <span className="text-sm text-charcoal group-hover:text-gold transition-colors">
                    {addon.label}{" "}
                    <span className="text-charcoal-40">{addon.price}</span>
                  </span>
                </label>
                {addon.id === "laundry" && checkedAddons.laundry && (
                  <div className="mt-2 ml-7">
                    <Select value={laundryLoads} onValueChange={(v) => setLaundryLoads(v ?? "")} name="laundryLoads">
                      <SelectTrigger className="bg-white border-charcoal/20 h-8 text-sm">
                        <SelectValue placeholder="How many loads?" />
                      </SelectTrigger>
                      <SelectContent>
                        {["1", "2", "3", "4", "5+"].map((n) => (
                          <SelectItem key={n} value={n}>{n} load{n !== "1" ? "s" : ""}</SelectItem>
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
                <span className="text-sm text-charcoal group-hover:text-gold transition-colors">{svc}</span>
              </label>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Section 7 — Payment */}
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
                    ? "border-gold bg-gold/10 text-charcoal"
                    : "border-charcoal/10 text-charcoal-40 hover:border-gold/50"
                }`}
              >
                {method}
              </div>
            </label>
          ))}
        </div>
      </SectionCard>

      {/* Notes */}
      <SectionCard title="Additional notes (optional)">
        <Textarea
          name="notes"
          placeholder="Anything we should know — pets, parking instructions, specific areas to focus on..."
          className="bg-white border-charcoal/20 min-h-[100px]"
        />
      </SectionCard>

      {/* Section 8 — Submit */}
      <div className="space-y-3">
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="w-full bg-gold text-charcoal font-semibold py-4 rounded-full hover:bg-gold-dark transition-colors disabled:opacity-60 text-base"
        >
          {formState === "submitting" ? "Submitting..." : "Submit Booking Request"}
        </button>
        <p className="text-center text-xs text-charcoal-40">
          We&apos;ll confirm via text or phone within 24 hours.
        </p>
      </div>
    </form>
  );
}
