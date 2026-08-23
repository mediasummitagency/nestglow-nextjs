import { HOURS, toMinutes } from "@/lib/hours";

/**
 * Time-aware CTA mode. Renders one inline <script> into <head>, which sets
 * `data-cta-mode="open"` or `"closed"` on <html> before the parser has reached
 * a single call-to-action in <body>.
 *
 * Ported from `bdf-nextjs/src/components/ui/CtaMode.tsx` (2026-08-19b). The
 * mechanism is carried over intact, INCLUDING both hydration fixes — they were
 * learned the hard way on TCG's live site and must not be dropped.
 *
 * ── WHY IT RUNS IN THE BROWSER AND NOT ON THE SERVER ──────────────────────
 * Every route here is prerendered static, so the HTML a visitor gets was
 * rendered at build time, possibly days ago. "Are we open?" cannot be answered
 * at build time at all. It has to be decided in the browser, at view time.
 *
 * ── WHY THERE IS NO FLASH OF THE WRONG BUTTON ─────────────────────────────
 * The script is synchronous and sits in <head>, so the attribute is on <html>
 * before <body> is parsed. The CSS in `globals.css` keys off that attribute to
 * hide the variant that does not apply. Nothing is painted and then swapped.
 * That is also why this is a raw inline <script> rather than `next/script` —
 * even `beforeInteractive` is not early enough to beat the first paint of a
 * static page, and a React effect is far too late.
 *
 * ── HOW NESTGLOW DIFFERS FROM BDF, TCG AND GORSEGNER ──────────────────────
 * 1. **Nothing on this site ever says "Closed."** Same call as TCG and BDF.
 *    Caroline's Google Business Profile is still being set up (Lucas is working
 *    it), so the site must not start making hours claims a future GBP could
 *    contradict. The after-hours state simply stops offering the phone.
 * 2. **The home page needed no changes at all.** It is already form-first — the
 *    hero is a ZIP router into /contact and carries no phone CTA — so the only
 *    surfaces that switch are the desktop header, the mobile dock, and the
 *    contact page's method cards.
 * 3. **Sunday is genuinely closed in the placeholder shape**, unlike BDF where
 *    every day is answered. That means "first thing Monday" is reachable here,
 *    so the weekday-naming branch of `nextPhrase` is live code rather than the
 *    unreachable leftover it is on BDF.
 * 4. **No response-time promise is invented in either state.** The site already
 *    says "we reply within one business day", which is equally true at 2pm and
 *    2am and is left alone. `CtaNext` only ever restates the hours in
 *    `lib/hours.ts`; it never promises a human.
 *
 * Calling is not offered after hours in any of the four builds. A CTA that
 * rings out is worse than no CTA: the homeowner does not leave a voicemail,
 * they hit back and call the next cleaner.
 *
 * ── THIS FILE DOES NOT DRIVE THE GOOGLE BUSINESS PROFILE ──────────────────
 * Changing `HOURS` changes the website and nothing else. GBP is edited by hand.
 * Gorsegner logged this exact trap on 2026-08-17 — hours corrected across 454
 * pages while the profile still advertised the old ones. When Caroline's
 * profile goes live, check the two agree, or decide on purpose that they do not.
 */
export function CtaMode() {
  if (!HOURS.ENABLED) return null;

  // ISO weekday -> [openMinutes, closeMinutes]. Serialised at build time; a
  // weekday missing from the map is closed all day.
  const win: Record<number, [number, number]> = {};
  for (const [dow, [open, close]] of Object.entries(HOURS.windows)) {
    win[Number(dow)] = [toMinutes(open), toMinutes(close)];
  }

  // Everything the script needs, serialised at build time. No fetch, no
  // hydration, no dependency on React having booted.
  //
  // NOTE: no backticks anywhere inside this template literal, not even in a
  // comment — one in TCG's version terminated the literal and broke the whole
  // script (2026-08-18).
  const script = `(function(){
var TZ=${JSON.stringify(HOURS.tz)},WIN=${JSON.stringify(win)},
CLOSED=${JSON.stringify(HOURS.closedDates)},
W={Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6,Sun:7},
N=[,'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
root=document.documentElement,last=null;
/* Reads the wall clock in New Jersey regardless of where the visitor is or how
   their own clock is set. hourCycle h23 rather than hour12:false because the
   latter still reports midnight as "24" in some engines.
   window.__NG_CTA_NOW is a test seam; nothing on the live site defines it. */
function now(){var p=new Intl.DateTimeFormat('en-US',{timeZone:TZ,weekday:'short',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(window.__NG_CTA_NOW||new Date()),o={},i;
for(i=0;i<p.length;i++){o[p[i].type]=p[i].value;}
return{dow:W[o.weekday],date:o.year+'-'+o.month+'-'+o.day,mins:parseInt(o.hour,10)*60+parseInt(o.minute,10)};}
/* A day is workable if it has a window at all and is not a one-off closure.
   The two are separate: WIN answers "is Sunday ever answered", CLOSED answers
   "is this particular date off". */
function workday(d,date){return !!WIN[d]&&CLOSED.indexOf(date)===-1;}
/* "8:00 AM" from 480. Computed rather than baked in, because the opening time
   is per-day — Saturday and Tuesday open at different times here. */
function label(mins){var h=Math.floor(mins/60),m=mins%60,s=h<12?'AM':'PM',h12=h%12===0?12:h%12;
return h12+':'+(m<10?'0'+m:m)+' '+s;}
/* "YYYY-MM-DD" n days on. UTC arithmetic on a bare date string, so a DST
   change cannot move it by a day. */
function addDays(ds,n){var p=ds.split('-'),dt=new Date(Date.UTC(+p[0],+p[1]-1,+p[2]));
dt.setUTCDate(dt.getUTCDate()+n);
return dt.getUTCFullYear()+'-'+('0'+(dt.getUTCMonth()+1)).slice(-2)+'-'+('0'+dt.getUTCDate()).slice(-2);}
/* Reads after "back". "at 8:00 AM this morning" is what someone wants at 7am;
   "first thing tomorrow" beats naming the weekday when it IS tomorrow. This only
   ever restates lib/hours.ts — it never promises a human.

   The search SKIPS one-off closures as well as unanswered weekdays. Checking
   only WIN[d] (which is what TCG and Gorsegner still do) would promise "first
   thing tomorrow" on Christmas Eve with Christmas Day sitting in CLOSED. */
function nextPhrase(t){var w=WIN[t.dow];
if(workday(t.dow,t.date)&&w&&t.mins<w[0]){return'at '+label(w[0])+' this morning';}
var d,n;for(n=1;n<=7;n++){d=(t.dow+n-1)%7+1;
if(WIN[d]&&CLOSED.indexOf(addDays(t.date,n))===-1){return n===1?'first thing tomorrow':'first thing '+N[d];}}
return'as soon as we are back';}
/* ?cta=open / ?cta=closed forces a mode for the whole visit, so either version
   can be looked at on the live site at any hour. Not linked from anywhere. */
var forced=(location.search.match(/[?&]cta=(open|closed)/)||[])[1]||null;
function apply(){var t=now(),w=WIN[t.dow],
isOpen=workday(t.dow,t.date)&&!!w&&t.mins>=w[0]&&t.mins<w[1],
mode=forced||(isOpen?'open':'closed');
/* Compare against the DOM, NOT against a cached value. React's hydration pass
   strips this attribute off <html> because it is not in the element's props,
   and a cache-only guard ("if (mode === last) return") would then never put it
   back: last still equals the mode, so every later tick short-circuits and the
   page sits with NO attribute, showing BOTH variants stacked. That shipped to
   TCG's live site on 2026-08-18 with every automated check green. Reading the
   attribute makes it self-healing. */
if(root.getAttribute('data-cta-mode')!==mode){root.setAttribute('data-cta-mode',mode);}
var phrase=nextPhrase(t),els=document.querySelectorAll('[data-cta-next]'),i;
for(i=0;i<els.length;i++){if(els[i].textContent!==phrase){els[i].textContent=phrase;}}
if(mode===last){return;}
last=mode;
/* So GA4/GTM can split conversions by which version of the page the visitor
   was actually shown. Guarded by last so it fires once per real mode change
   rather than on every re-assert above. GTM boots late here (and is not even
   configured yet — TRACKING.gtmId is blank), so dataLayer is a plain array
   until then and the push is picked up whenever a container finally loads. */
window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'cta_mode_set',cta_mode:mode});
window.NG_CTA_MODE=mode;}
window.__NG_CTA_REFRESH=function(){last=null;try{apply();}catch(e){}};
/* If anything throws, fall back to the after-hours state. That is the safe
   failure: the form always works, a phone that nobody answers does not. */
try{apply();}catch(e){root.setAttribute('data-cta-mode','closed');}
/* A tab left open across closing time should not keep offering a phone call.
   Re-checked on a timer and on tab focus, where browsers throttle timers. */
setInterval(function(){try{apply();}catch(e){}},60000);
document.addEventListener('visibilitychange',function(){if(!document.hidden){try{apply();}catch(e){}}});
/* [data-cta-next] elements are parsed after this script runs, so the first
   apply() found none. Fill them once the document is there. */
document.addEventListener('DOMContentLoaded',function(){try{apply();}catch(e){}});
/* And again after load, which is after React has hydrated. */
window.addEventListener('load',function(){try{apply();}catch(e){}});
/* The real guard: React strips the attribute at an unpredictable moment during
   hydration, and any fixed schedule either fires too early or leaves the page
   showing both variants until it catches up. Watching the attribute itself
   restores it in the same frame it is removed. No loop risk — apply() only
   writes when the value actually differs, so the write it triggers here is a
   no-op that ends the cycle. */
if(window.MutationObserver){new MutationObserver(function(){try{apply();}catch(e){}}).observe(root,{attributes:true,attributeFilter:['data-cta-mode']});}
})();`;

  return (
    <>
      {/* Without JS the mode attribute is never set, so both variants would
          stack. Hiding the after-hours copy is the safer default of the two:
          the open-hours markup is this site's existing, always-true copy. */}
      <noscript>
        <style>{`.cta-variant[data-when="closed"]{display:none}`}</style>
      </noscript>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
