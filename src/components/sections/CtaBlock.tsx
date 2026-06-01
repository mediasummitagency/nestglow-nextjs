import Link from "next/link";
import { ZipRouter } from "@/components/forms/ZipRouter";
import { BUSINESS } from "@/lib/config";

interface CtaBlockProps {
  variant?: "zip" | "book" | "phone";
  heading?: string;
  subheading?: string;
  className?: string;
}

export default function CtaBlock({
  variant = "zip",
  heading,
  subheading,
  className = "",
}: CtaBlockProps) {
  const base =
    "bg-cream-100 rounded-2xl p-8 md:p-10 border border-charcoal/5 text-center";

  if (variant === "zip") {
    return (
      <div className={`${base} ${className}`}>
        {heading && (
          <p className="text-lg font-semibold text-charcoal mb-4">{heading}</p>
        )}
        {subheading && (
          <p className="text-charcoal-70 mb-4">{subheading}</p>
        )}
        <ZipRouter variant="inline" />
      </div>
    );
  }

  if (variant === "book") {
    return (
      <div className={`${base} ${className}`}>
        {heading && (
          <h3 className="text-2xl font-bold text-charcoal mb-2">{heading}</h3>
        )}
        {subheading && (
          <p className="text-charcoal-70 mb-6">{subheading}</p>
        )}
        <Link
          href="/book"
          className="inline-block bg-brand text-charcoal font-semibold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
        >
          Book a cleaning
        </Link>
      </div>
    );
  }

  // phone variant
  return (
    <div className={`${base} ${className}`}>
      {heading && (
        <h3 className="text-2xl font-bold text-charcoal mb-2">{heading}</h3>
      )}
      {subheading && (
        <p className="text-charcoal-70 mb-6">{subheading}</p>
      )}
      <a
        href={BUSINESS.phoneHref}
        className="inline-block bg-brand text-charcoal font-semibold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
      >
        {BUSINESS.phone}
      </a>
      <p className="mt-3 text-sm text-charcoal-70">
        or{" "}
        <a
          href={BUSINESS.smsHref}
          className="font-semibold text-charcoal hover:text-charcoal-70 underline underline-offset-2"
        >
          text us
        </a>
      </p>
    </div>
  );
}
