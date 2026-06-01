import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { reviews, type Review } from "@/lib/reviews";

interface TestimonialsProps {
  currentTown?: string;
  currentCounty?: string;
}

function relevanceScore(r: Review, currentTown?: string, currentCounty?: string): number {
  if (currentTown && r.town === currentTown) return 2;
  if (currentCounty && r.county === currentCounty) return 1;
  return 0;
}

export function Testimonials({ currentTown, currentCounty }: TestimonialsProps) {
  const sorted = [...reviews].sort(
    (a, b) =>
      relevanceScore(b, currentTown, currentCounty) -
      relevanceScore(a, currentTown, currentCounty)
  );

  return (
    <section className="py-16 bg-white border-t border-charcoal/10">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">

        {/* Centered header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
            What our clients say.
          </h2>
          <p className="text-charcoal-70 max-w-2xl mx-auto">
            Real reviews from homeowners across Monmouth, Ocean, and Middlesex County.
          </p>
        </div>

        {/* 5 editorial cards — 3 col grid, last row 2 cards centered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {sorted.map((t) => (
            <blockquote
              key={t.name}
              className="flex flex-col bg-white border-2 border-charcoal/20 rounded-2xl shadow-md p-7"
            >
              <div className="flex gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-charcoal text-sm leading-none">●</span>
                ))}
              </div>
              <p className="text-base text-charcoal-70 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <hr className="my-6 border-charcoal/10" />
              <footer>
                <p className="text-base font-semibold text-charcoal">{t.name}</p>
                <p className="text-sm text-charcoal-40 mt-0.5">{t.location}</p>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
          >
            Read all reviews <ChevronRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
