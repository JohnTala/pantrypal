type PantryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expirationDate: string;
  createdAt: string;
};

interface RecentItemsProps {
  items: PantryItem[];
}

export default function RecentItems({
  items,
}: RecentItemsProps) {
  const recentItems = items.slice(0, 5);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-xl font-semibold">
          Recently Added Items
        </h2>
      </div>

      <div className="divide-y divide-slate-200">
        {recentItems.length === 0 ? (
          <p className="px-6 py-4 text-slate-500">
            No pantry items added yet.
          </p>
        ) : (
          recentItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-4 px-6 py-4 md:flex-row md:items-center"
            >
              <div>
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-500">
                  Category: {item.category}
                </p>

                <p className="text-sm text-slate-500">
                  Quantity: {item.quantity} {item.unit}
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Expires:{" "}
                {new Date(item.expirationDate).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}