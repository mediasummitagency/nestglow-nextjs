import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL, BUSINESS } from "@/lib/config";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for NestGlow Co.",
  alternates: { canonical: `${BASE_URL}/privacy-policy` },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-[72px]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <header className="mb-10 space-y-3">
            <h1 className="text-3xl font-bold text-charcoal">Privacy Policy</h1>
            <p className="text-sm text-charcoal-40">Last updated: April 2026</p>
          </header>

          <div className="space-y-8 text-charcoal-70 leading-relaxed">

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">Overview</h2>
              <p>
                {BUSINESS.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the website at nestglowco.com. This Privacy Policy explains what information we collect when you use our site, how we use it, and your rights regarding that information.
              </p>
              <p>
                We take your privacy seriously. We collect only what we need to respond to your inquiries and schedule cleaning services. We do not sell your information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">What we collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">Information you provide directly</h3>
                  <p>
                    When you submit a booking request or contact form, we collect:
                  </p>
                  <ul className="mt-2 space-y-1 pl-4 list-disc list-outside text-sm">
                    <li>Your name</li>
                    <li>Phone number</li>
                    <li>Email address</li>
                    <li>Service address</li>
                    <li>Property details (bedrooms, bathrooms, size)</li>
                    <li>Any notes or special requests you include</li>
                  </ul>
                  <p className="mt-2 text-sm">
                    This information is submitted through Formspree, a third-party form processing service, and is forwarded to our team to respond to your request.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">Analytics data</h3>
                  <p className="text-sm">
                    We use Google Analytics and Google Tag Manager to understand how visitors use our site — which pages are viewed, how long visitors stay, and how they found us. This data is aggregated and anonymized. It does not identify you personally.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">How we use your information</h2>
              <ul className="space-y-2 pl-4 list-disc list-outside text-sm">
                <li>To respond to booking requests and cleaning inquiries</li>
                <li>To schedule and confirm service appointments</li>
                <li>To follow up on service quality after a cleaning</li>
                <li>To improve our website and understand what content is useful to visitors</li>
              </ul>
              <p className="text-sm">
                We do not use your contact information for unsolicited marketing. We may contact you about your appointment or follow up on a request you initiated.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">Third-party services</h2>
              <p>
                We use the following third-party services that may process data from your visit:
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-charcoal text-sm">Formspree</p>
                  <p className="text-sm">Processes form submissions. When you submit a booking or contact form, your data passes through Formspree&apos;s servers before being forwarded to us. See Formspree&apos;s privacy policy at formspree.io.</p>
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">Google Analytics / Google Tag Manager</p>
                  <p className="text-sm">Collects anonymized website usage data (pages visited, session duration, traffic source). No personally identifiable information is sent to Google Analytics. See Google&apos;s privacy policy at policies.google.com.</p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">Cookies</h2>
              <p className="text-sm">
                Our site uses analytics cookies placed by Google Analytics to track aggregated usage patterns. These cookies do not contain personally identifiable information and are not used for cross-site advertising tracking.
              </p>
              <p className="text-sm">
                You can opt out of Google Analytics tracking by installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-dark underline transition-colors"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">Data retention</h2>
              <p className="text-sm">
                Form submission data is retained only as long as needed to respond to your inquiry and manage your service relationship. Analytics data is retained according to Google Analytics&apos; standard retention settings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">Your rights</h2>
              <p className="text-sm">You have the right to:</p>
              <ul className="space-y-1 pl-4 list-disc list-outside text-sm">
                <li>Request access to the personal information we hold about you</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of analytics data collection (see Cookies section above)</li>
                <li>Correct inaccurate information we hold about you</li>
              </ul>
              <p className="text-sm">
                To exercise any of these rights, contact us at{" "}
                <a href={BUSINESS.emailHref} className="text-gold hover:text-gold-dark underline transition-colors">
                  {BUSINESS.email}
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">New Jersey residents</h2>
              <p className="text-sm">
                New Jersey residents have additional rights under the New Jersey Privacy Act. These include the right to know what personal data we collect, the right to delete your data, and the right to opt out of the sale of your personal data. We do not sell personal data. To submit a rights request, contact us at the email below.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">Children&apos;s privacy</h2>
              <p className="text-sm">
                Our website is not directed at children under 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us and we will delete it promptly.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">Changes to this policy</h2>
              <p className="text-sm">
                We may update this Privacy Policy from time to time. Changes will be posted to this page with an updated &ldquo;last updated&rdquo; date. Continued use of the site after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">Contact</h2>
              <p className="text-sm">
                Questions about this Privacy Policy? Contact us at:
              </p>
              <p className="text-sm">
                {BUSINESS.name}<br />
                <a href={BUSINESS.emailHref} className="text-gold hover:text-gold-dark underline transition-colors">
                  {BUSINESS.email}
                </a><br />
                <a href={BUSINESS.phoneHref} className="text-gold hover:text-gold-dark underline transition-colors">
                  {BUSINESS.phone}
                </a>
              </p>
            </section>

          </div>

          <div className="mt-12 pt-8 border-t border-charcoal/10">
            <Link href="/" className="text-sm text-gold hover:text-gold-dark underline transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
