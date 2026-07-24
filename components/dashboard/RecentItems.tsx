const recentItems = [
  {
    name: "Milk",
    category: "Dairy",
    expires: "2026-07-20",
  },
  {
    name: "Bread",
    category: "Bakery",
    expires: "2026-07-19",
  },
  {
    name: "Rice",
    category: "Grains",
    expires: "2027-01-15",
  },
];

export default function RecentItems() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-xl font-semibold">
          Recently Added Items
        </h2>
      </div>

      <div className="divide-y divide-slate-200">
        {recentItems.map((item) => (
          <div
            key={item.name}
            className="flex flex-col justify-between gap-4 px-6 py-4 md:flex-row md:items-center"
          >
            <div>
              <h3 className="font-semibold">
                {item.name}
              </h3>

              <p className="text-sm text-slate-500">
                Category: {item.category}
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              Expires: {item.expires}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}