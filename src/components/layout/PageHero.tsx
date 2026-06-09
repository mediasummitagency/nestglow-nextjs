import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollHint } from "@/components/ui/ScrollHint";

export type PageHeroCrumb = { label: string; href?: string };

type Props = {
  heading: ReactNode;
  subheading?: ReactNode;
  eyebrow?: string;
  topContent?: ReactNode;
  heroFootnote?: ReactNode;
  breadcrumbs?: PageHeroCrumb[];
  children?: ReactNode;
  centered?: boolean;
  fullHeight?: boolean;
};

export function PageHero({ heading, subheading, eyebrow, topContent, heroFootnote, breadcrumbs, children, centered, fullHeight }: Props) {
  return (
    <section className={cn("relative overflow-hidden", fullHeight && "min-h-screen flex items-center")}>
      <Image
        src="/images/shared/hero.jpg"
        alt=""
        fill
        priority
        quality={85}
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.72))" }}
      />
      <div className="relative z-20 w-full">
        {breadcrumbs && (
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 pt-[88px] pb-0 flex items-center gap-2 text-sm text-white/50 flex-wrap">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={12} />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-brand transition-colors text-white/60">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div
          className={cn(
            "mx-auto px-4 sm:px-6 space-y-5",
            centered ? "max-w-3xl text-center" : "max-w-7xl",
            breadcrumbs ? "py-10 pb-16" : "pt-28 pb-16"
          )}
        >
          {topContent}
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">{eyebrow}</p>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {heading}
          </h1>
          {subheading && (
            <div className="text-white/80 text-lg max-w-3xl leading-relaxed">
              {subheading}
            </div>
          )}
          {children}
        </div>
      </div>
      {heroFootnote && (
        <div className="absolute bottom-24 inset-x-0 z-30 flex justify-center pointer-events-none">
          {heroFootnote}
        </div>
      )}
      {fullHeight && <ScrollHint />}
    </section>
  );
}
