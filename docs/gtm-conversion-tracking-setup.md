# GTM conversion tracking — NestGlow Co

Container **GTM-K85T24PZ**, installed 2026-08-27 via `TRACKING.gtmId`. This document is the
build spec for its tags, triggers and variables. Written while the container was empty.

## Before anything: there is no destination yet

GTM does not store or report data. It routes it. As of 2026-08-27 NestGlow has **no GA4
property and no Google Ads account**, so there is nowhere for the container to send anything.

Create the GA4 property first (below), get its Measurement ID, then build the container.

## Step 0 — create the GA4 property

1. analytics.google.com → **Admin** (bottom left) → **Create** → **Property**
2. Property name `NestGlow Co`, time zone **United States (Eastern)**, currency **USD**
3. Industry `Home & Garden` (nearest fit), business size smallest
4. Objective: **Generate leads**
5. Platform **Web**. Website URL `https://www.nestglowco.com` (the **www**, which is what
   Vercel actually serves — the apex 308s to it). Stream name `NestGlow Co — Website`
6. Copy the **Measurement ID**. **Done 2026-08-27: `G-GR0Y62J3G0`.** That is the only value the
   container needs.

### ⚠️ DO NOT PASTE GA4'S `gtag.js` SNIPPET INTO THE SITE

GA4 hands you an install snippet the moment the property is created. **Ignore it.** GA4 is
configured as a *tag inside this container*, exactly like every other Summit Media build — see
the header comment on `TRACKING` in `src/lib/config.ts`.

Pasting it means GA4 loads twice: once from the page and once from the container's Google Tag.
Every page view and every conversion is then counted twice, and the inflated numbers look
plausible enough that nobody notices for months. Same rule that applies to GTM's own snippet.

**Leave Enhanced Measurement on**, but know what it already does for you: it collects page views
across client-side navigation on its own, which matters because this is a Next.js app where most
navigation never reloads the page. Do not add a page-view tag; you would double-count.

**With one exception — turn OFF "Form interactions."** Data stream → Enhanced measurement → the
gear icon → untick **Form interactions** only. It auto-collects an event *also named*
`form_submit`, which would sit in the reports beside this container's custom tracking and
disagree with it: the automatic one fires on every attempt whether or not it succeeded, and it
cannot tell a real quote request from an out-of-area waitlist signup. The custom tracking does
both. Two numbers measuring almost-but-not-quite the same thing is how tracking stops being
trusted. Leave page views, scrolls, outbound clicks and the rest on.

**Stream created 2026-08-27:** name `NestGlow`, stream ID `15515322068`, Measurement ID
`G-GR0Y62J3G0`. "Data collection isn't active" is the expected state until the container's
Google Tag is published — it is not a fault to chase.

## The events the site already pushes

All of these are live in the code today. No site changes are needed to track any of them.

| dataLayer event | Fires when | Fields carried |
|---|---|---|
| `form_submit` | contact form submits successfully | `form_type`, `zip`, `service`, `tier` |
| `tier_card_click` | a pricing card CTA is clicked | `tier_id`, `tier_name`, `source_page` |
| `zip_router_match` | ZIP entered is inside the service area | `zip`, `county`, `town` |
| `zip_router_miss` | ZIP entered is outside it | `zip` |
| `cta_mode_set` | page renders in call-now vs after-hours mode | `cta_mode` |
| `mobile_sticky_{home,call,text,quote,menu}_click` | mobile dock taps | — |

Source of truth: `ContactForm.tsx`, `Tiers.tsx`, `ZipRouter.tsx`, `CtaMode.tsx`,
`MobileStickyBar.tsx`. If an event name changes there, the trigger here breaks silently.

### ⚠️ `form_submit` is TWO different things

It fires for real quote requests **and** for out-of-area waitlist signups. `form_type` is what
separates them: `quote_request` vs `waitlist`.

**A waitlist signup is not a lead.** Counting both as one conversion means that, the day Google
Ads runs, smart bidding starts optimising toward towns Caroline does not serve. Every trigger
below filters on `form_type` for this reason. Do not collapse them.

### ⚠️ Phone and text links are mostly untracked in code

`tel:` and `sms:` links appear in the nav, footer, contact block, CTA buttons and the mobile
dock, but only the dock pushes an event. Rather than adding pushes to five components, the
container catches all of them with one click trigger on the link URL. That also covers any
phone link added later, with no code change.

## Variables

**Enable these built-ins** (Variables → Configure): Click URL, Click Text, Click Element,
Page Path, Page URL.

**Create one Constant:**

| Name | Type | Value |
|---|---|---|
| `CONST - GA4 Measurement ID` | Constant | `G-GR0Y62J3G0` from step 0 |

Keeping the ID in one variable means a property swap is a one-field edit, not a hunt through tags.

**Create these Data Layer Variables** (name them exactly as the dataLayer key):

`DLV - form_type`, `DLV - service`, `DLV - zip`, `DLV - tier`, `DLV - tier_name`,
`DLV - tier_id`, `DLV - county`, `DLV - cta_mode`

## Triggers

| Name | Type | Configuration |
|---|---|---|
| `Init - All Pages` | Initialization | **Do not create this.** GTM ships it built in and it does not appear in the Triggers list — pick it from the dropdown when building the Google Tag |
| `CE - form_submit - quote` | Custom Event | Event name `form_submit`, **Some** Custom Events, `DLV - form_type` **equals** `quote_request` |
| `CE - form_submit - waitlist` | Custom Event | Event name `form_submit`, **Some** Custom Events, `DLV - form_type` **equals** `waitlist` |
| `Click - tel link` | Click – Just Links | **Some** Link Clicks, `Click URL` **contains** `tel:` |
| `Click - sms link` | Click – Just Links | **Some** Link Clicks, `Click URL` **contains** `sms:` |
| `CE - tier_card_click` | Custom Event | Event name `tier_card_click` |
| `CE - zip_router_miss` | Custom Event | Event name `zip_router_miss` |

Set the two `form_submit` triggers to **Some** Custom Events, never All. On All they both fire on
every submission and the quote-versus-waitlist split this whole document is built around quietly
collapses. The value is `quote_request` — underscore, exact, and no quote marks around it in the
field.

On both link triggers leave **Wait for Tags** and **Check Validation** unticked. `tel:` and
`sms:` hand off to the OS rather than navigating the page, so there is nothing to wait for and
ticking them only adds delay.

## Tags

### 1. `Google Tag - GA4`
Type **Google Tag**. Tag ID `{{CONST - GA4 Measurement ID}}`. Trigger `Init - All Pages`.
This one must exist before any event tag will report.

### 2. `GA4 - generate_lead` ← the conversion
Type **Google Analytics: GA4 Event**. Measurement ID `{{CONST - GA4 Measurement ID}}`.
Event name **`generate_lead`**. Trigger `CE - form_submit - quote`.

Event parameters: `service` → `{{DLV - service}}`, `zip` → `{{DLV - zip}}`,
`tier` → `{{DLV - tier}}`.

**Why `generate_lead` and not `form_submit`:** it is one of GA4's own recommended event names,
so GA4 and Google Ads both understand it without configuration. It also avoids confusion with
Enhanced Measurement's automatic form tracking, which uses the name `form_submit`.

### 3. `GA4 - join_waitlist`
Event name `join_waitlist`. Trigger `CE - form_submit - waitlist`.
Parameters: `zip` → `{{DLV - zip}}`, `service` → `{{DLV - service}}`.

Not a conversion. It is the map of where demand exists outside the service area, which is the
input to any decision about expanding it.

### 4. `GA4 - click_to_call`
Event name `click_to_call`. Trigger `Click - tel link`.
Parameters: `page_path` → `{{Page Path}}`, `link_url` → `{{Click URL}}`.

**Tracked, deliberately not counted as a conversion** (Lucas, 2026-08-27). A tap includes
misclicks and calls that are hung up before connecting, so counting them from day one inflates
the number and teaches Ads bidding the wrong lesson. Watch the volume first; promote it later if
it earns it, or add real call tracking.

### 5. `GA4 - click_to_text`
Event name `click_to_text`. Trigger `Click - sms link`. Same parameters as above.

### 6. `GA4 - tier_card_click`
Event name `tier_card_click`. Trigger `CE - tier_card_click`.
Parameters: `tier_id` → `{{DLV - tier_id}}`, `tier_name` → `{{DLV - tier_name}}`.

Shows which of the three plans people actually reach for, which is pricing-page feedback.

### 7. `GA4 - zip_router_miss`
Event name `zip_router_miss`. Trigger `CE - zip_router_miss`.
Parameter: `zip` → `{{DLV - zip}}`.

## Publishing and verification

1. **Preview** (top right) → enter `https://www.nestglowco.com` → the Tag Assistant window opens.
2. Walk the site and confirm each one fires:
   - load a page → `Google Tag - GA4` fires once
   - tap a phone number → `click_to_call`
   - click a pricing card → `tier_card_click`
   - enter an out-of-area ZIP → `zip_router_miss`
   - **submit the contact form with a real in-area ZIP** → `GA4 - generate_lead` fires and
     `GA4 - join_waitlist` does **not**
   - submit with an out-of-area ZIP → the reverse
3. That form test sends a real lead to Caroline and texts her. Warn her, or use an obviously
   fake name.
4. **Submit** the container. Name the version something legible, e.g.
   `Initial conversion tracking`.
5. In GA4: **Admin → Events**, wait for `generate_lead` to appear (up to 24h), then mark it as
   a **Key event**. An event that is not marked is not a conversion, no matter what it is named.

## Later, when Google Ads runs

Do not add a separate Ads conversion tag. Link GA4 to the Ads account and **import**
`generate_lead` as a conversion. One event, one definition, counted once. Adding a parallel Ads
tag on the same trigger is how accounts end up double-counting.

The BDF note in `STATUS.md` applies here too: confirm who owns any Ads account before wiring
conversions into it.
