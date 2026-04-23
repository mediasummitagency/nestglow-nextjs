import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL, BUSINESS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for NestGlow Co.",
  alternates: { canonical: `${BASE_URL}/terms-of-service` },
  robots: { index: false, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <>
      <main className="pt-[72px]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <header className="mb-10 space-y-3">
            <h1 className="text-3xl font-bold text-charcoal">Terms of Service</h1>
            <p className="text-sm text-charcoal-40">Last updated: April 2026</p>
          </header>

          <div className="space-y-8 text-charcoal-70 leading-relaxed">

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">1. Acceptance of terms</h2>
              <p className="text-sm">
                By accessing or using the nestglowco.com website (&ldquo;Site&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Site.
              </p>
              <p className="text-sm">
                These terms apply to the website only. Actual cleaning services provided by {BUSINESS.name} are governed by separate service agreements confirmed at the time of booking.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">2. Description of services</h2>
              <p className="text-sm">
                This Site provides information about {BUSINESS.name}&apos;s cleaning services and allows visitors to submit booking inquiries. Submitting a form on this Site constitutes an inquiry or request — not a confirmed service contract. Service is confirmed separately via direct communication with our team.
              </p>
              <p className="text-sm">
                Pricing, availability, and service scope are subject to confirmation. Any estimates presented on this Site are ranges based on typical homes and are not binding quotes. A firm quote is provided after reviewing your specific home details.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">3. Accuracy of information</h2>
              <p className="text-sm">
                We make reasonable efforts to ensure the information on this Site is accurate and up to date. However, we make no warranties that content is error-free, complete, or current. We reserve the right to correct errors or update information at any time without notice.
              </p>
              <p className="text-sm">
                Pricing ranges shown on the Site are estimates. Actual pricing is provided in writing via a formal quote based on your home&apos;s details.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">4. Intellectual property</h2>
              <p className="text-sm">
                All content on this Site — including text, design, graphics, logos, and guides — is the property of {BUSINESS.name} and is protected by copyright. You may not reproduce, distribute, or create derivative works from any Site content without prior written permission.
              </p>
              <p className="text-sm">
                You are permitted to share links to pages on this Site and to quote brief excerpts for non-commercial purposes with attribution.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">5. User conduct</h2>
              <p className="text-sm">You agree not to:</p>
              <ul className="space-y-1 pl-4 list-disc list-outside text-sm">
                <li>Use the Site for any unlawful purpose</li>
                <li>Submit false, misleading, or fraudulent information through our forms</li>
                <li>Attempt to interfere with the Site&apos;s technical operation</li>
                <li>Scrape or systematically extract content from the Site without permission</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">6. Links to third-party sites</h2>
              <p className="text-sm">
                This Site may contain links to third-party websites. We do not control and are not responsible for the content or privacy practices of those sites. Links are provided for convenience only and do not constitute an endorsement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">7. Disclaimer of warranties</h2>
              <p className="text-sm">
                This Site is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.
              </p>
              <p className="text-sm">
                Information on this Site is for general informational purposes. It does not constitute professional advice.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">8. Limitation of liability</h2>
              <p className="text-sm">
                To the fullest extent permitted by law, {BUSINESS.name} and its owners, employees, and contractors shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this Site or reliance on any information presented here.
              </p>
              <p className="text-sm">
                Our total liability for any claim arising from use of this Site shall not exceed the amount you paid us for services in the 30 days preceding the claim, or $100, whichever is less.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">9. Governing law</h2>
              <p className="text-sm">
                These Terms of Service are governed by the laws of the State of New Jersey, without regard to conflict of law principles. Any disputes arising from these terms or use of this Site shall be resolved in the state or federal courts located in Monmouth County, New Jersey.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">10. Changes to these terms</h2>
              <p className="text-sm">
                We reserve the right to update these Terms of Service at any time. Changes will be posted to this page with an updated &ldquo;last updated&rdquo; date. Continued use of the Site after changes constitutes acceptance of the revised terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-charcoal">11. Contact</h2>
              <p className="text-sm">
                Questions about these Terms of Service? Contact us at:
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
    </>
  );
}
