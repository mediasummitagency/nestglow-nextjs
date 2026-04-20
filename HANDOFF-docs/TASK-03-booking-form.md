# TASK-03 — Booking form page (`/book`)

**Paste this into a fresh Claude Code conversation in Antigravity.**
**Run after TASK-02 is complete.**

---

You are migrating the existing Formspree booking form to its own dedicated page
at `/book`. The existing form is functional and has a thoughtful structure —
we are preserving its logic, just rebuilding it as React components and
placing it on a dedicated page so it can be targeted directly with paid ads.

Project root: `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow-nextjs/`

## Reference — existing form

The working form in the old site is at:
`/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/index.html`
(search for `id="booking-form"` — the form is roughly lines 960-1250)

All of the form logic is already working with Formspree endpoint `xnngyenw`.
We are rebuilding it in React, not rewriting the logic.

## Step 1 — Build `BookingForm` component

Location: `src/components/forms/BookingForm.tsx`

This is a client component (`"use client"`). It should have these sections in order,
each in its own visual card/fieldset:

### Section 1 — Contact info
- First name (required)
- Last name (required)
- Email (required, type=email)
- Phone (required, type=tel)
- Address (required)

### Section 2 — Property type & details
- Property type (select: Apartment, House, Townhouse, Office/Commercial) — required
- Number of bedrooms (select: 0-5+)
- Number of full bathrooms (select: 0-4+)
- Number of half bathrooms (select: 0-3+)
- Square footage (select: under 2k / 2-3k / 3-4k / 4-5k / 5k+) — only shown when property type is "House" or "Office/Commercial"

### Section 3 — Cleaning frequency
- Frequency (select: One Time, Weekly, Bi-Weekly, Tri-Weekly, Monthly) — required

### Section 4 — Scheduling
- Preferred date (required, `<input type="date">`)
- Preferred time slot (required, select: 8-10am, 10am-12pm, 12-2pm, 2-4pm)
- Note: "4:00 PM is the latest time slot available for residential cleanings."
- "Add another time" button — allows up to 3 alternative time slots as backup
- Each alternative has Date + Time Slot + Remove button

### Section 5 — Additional services (residential — shown when property type is NOT Office/Commercial)

Checkboxes with pricing shown next to each:
- Inside Refrigerator (+$30)
- Inside Oven (+$30)
- Inside Cabinets (+$50)
- Laundry Service (+$15 per load) — when checked, reveal "How many loads?" select
- Window Cleaning (+$40)
- Same Day Cleaning (+$70)
- Deep Cleaning (+$150)
- Post Construction (+$500)
- Move In/Out (+$120)

### Section 6 — Commercial services (shown ONLY when property type is Office/Commercial)

Instead of the residential add-ons, show:
- Note: "Please select the services you're interested in. We'll provide custom pricing after our walk-through."
- Checkboxes (no prices):
  - Office Window Cleaning
  - Carpet Cleaning
  - Kitchen/Break Room Cleaning
  - Restroom Deep Clean
  - Desk/Workstation Cleaning
  - After Hours Cleaning
  - Weekly Recurring Service
  - Monthly Recurring Service
  - One-Time Deep Clean

### Section 7 — Payment method (radio group)
- Credit Card
- Debit Card
- Cash
- Venmo

### Section 8 — Submit
- Primary button: "Submit Booking Request"
- Below: small text "We'll confirm via text or phone within 24 hours."

## Step 2 — Form submission behavior

Use `fetch` to POST to `FORMS.booking` (from `src/lib/config.ts`). On success:
1. Hide the form
2. Show a thank-you card in the same container
   - For residential: "Your cleaning service request has been submitted. We'll confirm via text or phone within 24 hours."
   - For commercial: "Your commercial cleaning inquiry has been submitted. We'll be in touch to schedule a walk-through and provide a custom quote."
3. Show phone number and email
4. Show a "Book Another Service" button that resets the form

On error:
- Show an inline error banner at the top of the form
- Fallback contact: "There was an issue submitting your form. Please call us directly at (732) 614-0192."

Use React Hook Form or plain React state — either is fine. Keep it simple.

## Step 3 — Conversion tracking

On successful submission, fire GTM events:

```ts
if (typeof window !== "undefined" && "dataLayer" in window) {
  (window as any).dataLayer.push({
    event: "form_submit",
    form_type: propertyType === "office" ? "commercial_booking" : "residential_booking",
    frequency,
    property_type: propertyType,
  });
}
```

Also attach a `tel:` click tracker to the phone CTA (fires `phone_click` event).

## Step 4 — Build `/book` page

`src/app/book/page.tsx`

### Metadata

```ts
export const metadata = {
  title: "Book a Cleaning",
  description: "Book a residential or commercial cleaning with NestGlow Co. Serving Monmouth, Ocean, and Middlesex County, NJ. Insured, bonded, and guaranteed.",
  alternates: { canonical: `${BASE_URL}/book` },
};
```

### Structure

1. **Breadcrumb**: Home / Book Cleaning

2. **Hero**
   - Eyebrow: "Booking"
   - H1: "Book Your Cleaning"
   - Subhead: "Tell us about your space. We'll confirm your appointment within 24 hours."
   - Trust strip: Insured & bonded · Background-checked team · 24-hour satisfaction guarantee

3. **Two-column layout on desktop** (single column on mobile):
   - Left (2/3 width): The `BookingForm` component
   - Right (1/3 width): Sticky sidebar with:
     - "Why book with NestGlow Co" — 4 bullet points (trust signals)
     - "Prefer to call?" — Phone number with tel: link
     - Contact hours (if applicable)
     - A small testimonial quote (pick one of the 5 real ones)

4. **Below the form** (full width):
   - FAQ accordion with 4-5 booking-specific questions:
     - "When will you confirm my appointment?"
     - "What if I need to reschedule?"
     - "Do I need to be home during the cleaning?"
     - "What happens after I submit this form?"
     - "Is my payment processed now?"

5. **FAQPage schema JSON-LD** for the booking FAQs

## Step 5 — Update the home hero `QuickQuoteForm` (if FORMS.quickQuote is empty)

If `FORMS.quickQuote` is still empty when this task runs, modify the
`QuickQuoteForm` component so that on submit it redirects to `/book` with
the captured fields as URL params:

```
/book?first_name=...&phone=...&zip=...&property_type=...&frequency=...
```

The `/book` page should read these params on mount and pre-fill the `BookingForm`.
This way the quick-quote form still works even without a dedicated Formspree endpoint.

## Verify

- `/book` renders with the full form
- Submitting the form with valid data successfully POSTs to Formspree and shows thank-you
- Commercial property type hides residential add-ons and shows commercial checkboxes
- Adding and removing alternative time slots works
- Laundry checkbox reveals the loads selector
- Mobile layout stacks cleanly
- Schema validator passes on `/book`

## Update PROGRESS.md

- Mark TASK-03 complete
- Note if the quick-quote fallback to URL params was used

## Rules

- Form component must be a client component (`"use client"`)
- Use Formspree endpoint from `FORMS.booking` — do NOT hardcode
- Keep the form accessible: every `<input>` and `<select>` has an associated `<label>`
- Use shadcn `<Input>`, `<Select>`, `<Checkbox>` primitives
- Do NOT auto-submit or store any form data in localStorage
