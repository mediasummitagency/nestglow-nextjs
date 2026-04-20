"use client";

import { useState, FormEvent } from "react";
import { FORMS } from "@/lib/config";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

type FormState = "idle" | "submitting" | "success" | "error";

export default function QuickQuoteForm() {
  const [state, setState] = useState<FormState>("idle");
  const [propertyType, setPropertyType] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // If no endpoint configured, redirect to booking form with prefill params
    if (!FORMS.quickQuote) {
      const form = e.currentTarget;
      const data = new FormData(form);
      const params = new URLSearchParams({
        first_name: data.get("firstName") as string ?? "",
        phone: data.get("phone") as string ?? "",
        zip: data.get("zip") as string ?? "",
        property_type: propertyType,
        frequency,
      });
      window.location.href = `/book?${params.toString()}`;
      return;
    }

    setState("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMS.quickQuote, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-lg font-semibold text-charcoal">
          Thanks! We will be in touch within 24 hours.
        </p>
        <Link
          href="/book"
          className="inline-block bg-gold text-charcoal font-semibold px-6 py-3 rounded-full hover:bg-gold-dark transition-colors"
        >
          Book full appointment
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="space-y-1">
          <Label htmlFor="qq-first-name" className="text-sm font-medium text-charcoal">
            First name
          </Label>
          <Input
            id="qq-first-name"
            name="firstName"
            required
            placeholder="Jane"
            className="bg-white border-charcoal/20"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="qq-phone" className="text-sm font-medium text-charcoal">
            Phone
          </Label>
          <Input
            id="qq-phone"
            name="phone"
            type="tel"
            required
            placeholder="(732) 555-0100"
            className="bg-white border-charcoal/20"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="qq-zip" className="text-sm font-medium text-charcoal">
            Zip code
          </Label>
          <Input
            id="qq-zip"
            name="zip"
            required
            placeholder="07753"
            className="bg-white border-charcoal/20"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-medium text-charcoal">Property type</Label>
          <Select value={propertyType} onValueChange={(v) => setPropertyType(v ?? "")} name="propertyType">
            <SelectTrigger className="bg-white border-charcoal/20">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="office">Office</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-medium text-charcoal">Frequency</Label>
          <Select value={frequency} onValueChange={(v) => setFrequency(v ?? "")} name="frequency">
            <SelectTrigger className="bg-white border-charcoal/20">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">One-time</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {state === "error" && (
        <p className="text-sm text-terracotta">
          Something went wrong. Please call us at{" "}
          <a href="tel:+17326140192" className="underline">
            (732) 614-0192
          </a>
          .
        </p>
      )}

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="bg-gold text-charcoal font-semibold px-8 py-3 rounded-full hover:bg-gold-dark transition-colors disabled:opacity-60"
        >
          {state === "submitting" ? "Sending..." : "Get a Quick Quote"}
        </button>
      </div>
    </form>
  );
}
