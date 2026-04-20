"use client";

import { useSearchParams } from "next/navigation";
import BookingForm from "@/components/forms/BookingForm";

export default function BookingFormWrapper() {
  const params = useSearchParams();

  const prefill = {
    firstName: params.get("first_name") ?? undefined,
    phone: params.get("phone") ?? undefined,
    zip: params.get("zip") ?? undefined,
    propertyType: params.get("property_type") ?? undefined,
    frequency: params.get("frequency") ?? undefined,
  };

  return <BookingForm prefill={prefill} />;
}
