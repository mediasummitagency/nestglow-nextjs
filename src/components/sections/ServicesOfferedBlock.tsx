import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { services } from "@/lib/services";

type Props = {
  town?: string;
};

export function ServicesOfferedBlock({ town }: Props) {
  const heading = town
    ? `Every cleaning service ${town} needs, in one place`
    : "Every cleaning service, in one place";

  const body = town
    ? `From recurring upkeep to one-time resets, NestGlow Co covers the full range of home and business cleaning in ${town} and the surrounding area. Every service is fully insured, bonded, and backed by our 24-hour satisfaction guarantee.`
    : "From recurring upkeep to one-time resets, NestGlow Co covers the full range of home and business cleaning across Monmouth, Ocean, and Middlesex County. Every service is fully insured, bonded, and backed by our 24-hour satisfaction guarantee.";

  return (
    <section className="border-t border-charcoal/10 bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">{heading}</h2>
          <p className="text-charcoal-70 leading-relaxed">{body}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <Link
                key={svc.href}
                href={svc.href}
                className="group flex items-start gap-4 bg-cream rounded-2xl p-5 border border-charcoal/10 hover:border-brand hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 rounded-full bg-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={16} className="text-brand-dark" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-charcoal group-hover:text-brand transition-colors">
                    {svc.title}
                  </p>
                  <p className="text-xs text-charcoal-40 mt-1 leading-relaxed line-clamp-2">
                    {svc.copy}
                  </p>
                </div>
                <ChevronRight size={14} className="text-charcoal-40 group-hover:text-brand transition-colors shrink-0 mt-1 ml-auto" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
