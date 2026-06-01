export function TrustBadges() {
  return (
    <section className="bg-white py-8 border-t border-b border-charcoal/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-6">
        {/* Google Verified */}
        <div className="flex items-center gap-3 bg-cream-50 border border-charcoal/10 rounded-2xl px-6 py-4 shadow-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <div>
            <p className="text-xs font-bold text-charcoal tracking-wide">Google Verified</p>
            <p className="text-xs text-charcoal-40">5.0 · Verified reviews</p>
          </div>
        </div>

        {/* Care.com */}
        <div className="flex items-center gap-3 bg-cream-50 border border-charcoal/10 rounded-2xl px-6 py-4 shadow-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#00b5ad"/>
          </svg>
          <div>
            <p className="text-xs font-bold text-charcoal tracking-wide">Care.com</p>
            <p className="text-xs text-charcoal-40">Verified provider</p>
          </div>
        </div>
      </div>
    </section>
  );
}
