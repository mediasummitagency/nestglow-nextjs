import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="pt-[72px] min-h-[60vh] flex items-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-24 text-center space-y-6">
          <p className="text-6xl font-bold text-gold/40">404</p>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal">
            That page got lost in the laundry.
          </h1>
          <p className="text-charcoal-70 leading-relaxed">
            The page you&apos;re looking for does not exist, but your clean home does. Let&apos;s get you back on track.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="bg-gold text-charcoal font-semibold px-6 py-3 rounded-full hover:bg-gold-dark transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/book"
              className="border border-charcoal/20 text-charcoal font-semibold px-6 py-3 rounded-full hover:bg-cream-100 transition-colors"
            >
              Book a Cleaning
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
