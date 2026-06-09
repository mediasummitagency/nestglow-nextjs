import { addOns } from "@/lib/checklist";

export function AddOnServices() {
  return (
    <section className="border-t border-charcoal/10 bg-cream-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-lg font-bold text-charcoal mb-2 text-center">Available add-ons</h2>
        <p className="text-sm text-charcoal-40 text-center mb-6">
          Book any of these extras alongside your clean — just note it when you book.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {addOns.map((addon) => (
            <div
              key={addon.title}
              className="bg-cream-50 border border-charcoal/10 rounded-2xl p-5 space-y-2"
            >
              <p className="text-sm font-bold text-charcoal">{addon.title}</p>
              <p className="text-sm text-charcoal-70 leading-relaxed">{addon.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
