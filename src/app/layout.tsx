import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { TRACKING, BASE_URL, BUSINESS } from "@/lib/config";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import { CtaMode } from "@/components/ui/CtaMode";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    // Kept under ~60 chars so Google does not truncate it. The counties live in
    // the description and on the page, not in the title.
    default: `House Cleaning in Monmouth, Ocean & Middlesex County NJ`,
    template: `%s | ${BUSINESS.name}`,
  },
  description: BUSINESS.tagline,
  openGraph: {
    title: `${BUSINESS.name} | Professional Cleaning in NJ`,
    description: `${BUSINESS.tagline} 100% satisfaction guarantee — we'll make it right or it's free.`,
    url: BASE_URL,
    siteName: BUSINESS.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} | Professional Cleaning in NJ`,
    description: `${BUSINESS.tagline} 100% satisfaction guarantee — we'll make it right or it's free.`,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning on <html>: CtaMode's head script adds
    // `data-cta-mode` to this element before React hydrates. Note this
    // suppresses the WARNING only — it does NOT stop React stripping the
    // attribute during hydration, which is why CtaMode carries its own
    // MutationObserver. See CtaMode.tsx.
    //
    // data-scroll-behavior="smooth" pairs with `scroll-behavior: smooth` in
    // globals.css (line 184). Without it Next issues its route-change scroll
    // reset as a SMOOTH scroll, and WebKit discards it — so every client-side
    // navigation on iPhone keeps the previous page's scroll offset. Tap Quote
    // from halfway down the home page and you land halfway down /contact.
    // Broke gorsegner-nextjs sitewide, mobile only, and is invisible in
    // Chromium; already fixed on bdf-nextjs. Next itself warns about this in
    // the dev console, which is how it surfaced here (2026-08-23).
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Must stay in <head> and stay synchronous — the attribute has to be
            on <html> before the parser reaches the first CTA in <body>, or the
            wrong button paints and then swaps. Renders nothing at all while
            HOURS.ENABLED is false. See CtaMode.tsx. */}
        <CtaMode />
      </head>
      <body className={`${roboto.variable} antialiased`}>
        {TRACKING.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${TRACKING.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {TRACKING.gtmId && (
          /* Google Tag Manager — the canonical Summit loader, standardized 2026-08-31.
             Until then this site loaded GTM on afterInteractive (immediately after
             hydration, every pageview); it now loads on the visitor's first gesture, or
             1 second after the first painted frame, whichever comes first. The timer is
             deliberately armed off two nested requestAnimationFrames — a plain setTimeout
             from navigation start races the LCP paint and is the documented cause of TCG
             scoring 66 and G360 scoring 60. Do not flatten it.
             See divisions/software/plan-2026-08-31-gtm-standardization.md.

             `no-before-interactive-script-outside-document` is a Pages Router rule that
             fires on every correct App Router usage; the root layout is the right mount
             per Next's own docs. beforeInteractive matters: the listeners are once:true,
             so they must be registered before the reader's first scroll. */
          // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
          <Script id="gtm-loader" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){
  w[l]=w[l]||[];
  if(!i)return;
  var loaded=false;
  var evts=['scroll','pointerdown','keydown','touchstart','mousemove'];
  function load(){
    if(loaded)return;
    loaded=true;
    evts.forEach(function(e){w.removeEventListener(e,load)});
    w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  }
  evts.forEach(function(e){w.addEventListener(e,load,{once:true,passive:true})});
  w.requestAnimationFrame(function(){
    w.requestAnimationFrame(function(){
      w.setTimeout(load,1000);
    });
  });
})(window,document,'script','dataLayer','${TRACKING.gtmId}');` }} />
        )}
        <div className="hidden md:block">
          <Suspense fallback={null}>
            <SiteNav />
          </Suspense>
        </div>
        {children}
        {/* Footer carries `dock-clearance` itself. The dock is fixed over the
            page and the footer is the last thing on every route, so the padding
            has to live inside it — a wrapper around it would clear the bar but
            leave a white band under the dark footer. */}
        <Footer />
        <Suspense fallback={null}>
          <MobileStickyBar />
        </Suspense>
      </body>
    </html>
  );
}
