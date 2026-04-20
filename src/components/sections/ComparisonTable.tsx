type ComparisonRow = {
  task: string;
  general: string;
  deep: string;
};

type ComparisonCategory = {
  name: string;
  rows: ComparisonRow[];
};

export const comparisonData: { categories: ComparisonCategory[] } = {
  categories: [
    {
      name: "All Rooms",
      rows: [
        { task: "Dust all surfaces", general: "Yes", deep: "Yes — thorough, including detailed areas" },
        { task: "Mirrors cleaned", general: "Yes", deep: "Yes — polished streak-free finish" },
        { task: "Cobwebs removed", general: "Yes", deep: "Yes" },
        { task: "Ceiling fans & vents", general: "—", deep: "Yes — fully dusted" },
        { task: "Light switches & doorknobs", general: "—", deep: "Yes — cleaned & disinfected" },
        { task: "Baseboards", general: "Dusted", deep: "Hand-wiped & detailed" },
        { task: "Door frames & trim", general: "Dusted", deep: "Cleaned & polished" },
        { task: "Woodwork", general: "Dusted", deep: "Cleaned & polished" },
        { task: "Window sills & ledges", general: "—", deep: "Yes — hand-wiped" },
        { task: "Floors", general: "Swept & mopped", deep: "Swept & detailed mopping" },
        { task: "Wastebaskets", general: "Emptied", deep: "Emptied & wiped inside/out" },
        { task: "Blind cleaning", general: "—", deep: "Yes — dusted" },
      ],
    },
    {
      name: "Bedrooms",
      rows: [
        { task: "Beds made (with linens provided)", general: "—", deep: "Yes" },
        { task: "Furniture (dressers, nightstands)", general: "Dusted", deep: "Polished" },
        { task: "Under bed", general: "—", deep: "Cleaned / vacuumed" },
        { task: "Inside closets", general: "—", deep: "Vacuumed & lightly organized" },
      ],
    },
    {
      name: "Bathrooms",
      rows: [
        { task: "Tub & shower", general: "Cleaned", deep: "Deep scrub of grout, tile & glass" },
        { task: "Toilet", general: "Inside/out", deep: "Detailed, including base" },
        { task: "Sink & faucet", general: "Cleaned", deep: "Polished to shine" },
        { task: "Backsplash", general: "Wiped", deep: "Detailed scrub" },
        { task: "Cabinets", general: "Exterior only", deep: "Exterior & interior (if empty)" },
        { task: "Fixtures & mirrors", general: "Cleaned", deep: "Extra polishing" },
      ],
    },
    {
      name: "Kitchen",
      rows: [
        { task: "Microwave", general: "Inside cleaned", deep: "Deep cleaned" },
        { task: "Backsplash", general: "Wiped", deep: "Detailed & degreased" },
        { task: "Range hood & appliances", general: "Exterior wiped", deep: "Exterior detailed" },
        { task: "Cabinets", general: "Exterior wiped", deep: "Exterior polished & interior (if empty)" },
        { task: "Refrigerator", general: "Exterior", deep: "Exterior + top cleaned" },
        { task: "Sink & faucet", general: "Cleaned", deep: "Deep cleaned & polished" },
        { task: "Furniture & tables", general: "Wiped", deep: "Detailed cleaning" },
      ],
    },
  ],
};

export default function ComparisonTable({ limit }: { limit?: number }) {
  const cats = limit
    ? [{ ...comparisonData.categories[0], rows: comparisonData.categories[0].rows.slice(0, limit) }]
    : comparisonData.categories;

  return (
    <div className="overflow-x-auto rounded-xl border border-charcoal/10">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-charcoal text-cream">
            <th className="text-left py-3 px-4 font-semibold">Task</th>
            <th className="py-3 px-4 font-semibold text-center text-gold-light">General</th>
            <th className="py-3 px-4 font-semibold text-center text-gold">Deep</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((cat) => (
            <>
              {!limit && (
                <tr key={`cat-${cat.name}`} className="bg-cream-100">
                  <td
                    colSpan={3}
                    className="py-2 px-4 text-xs font-semibold uppercase tracking-widest text-charcoal-40"
                  >
                    {cat.name}
                  </td>
                </tr>
              )}
              {cat.rows.map((row) => (
                <tr key={row.task} className="border-b border-charcoal/5 even:bg-cream-50">
                  <td className="py-3 px-4 text-charcoal-70">{row.task}</td>
                  <td className="py-3 px-4 text-center">
                    {row.general === "—" ? (
                      <span className="text-charcoal-40">—</span>
                    ) : (
                      <span className="text-sage-dark">{row.general}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.deep === "—" ? (
                      <span className="text-charcoal-40">—</span>
                    ) : (
                      <span className="text-charcoal font-medium">{row.deep}</span>
                    )}
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
