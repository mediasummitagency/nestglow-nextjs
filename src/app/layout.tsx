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
    <html lang="en" suppressHydrationWarning>
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
          <Script id="gtm-loader" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${TRACKING.gtmId}');
          `}</Script>
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
