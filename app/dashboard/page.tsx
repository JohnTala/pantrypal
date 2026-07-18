// app/dashboard/page.tsx

import Link from "next/link";

const stats = [
  {
    title: "Total Items",
    value: 24,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Expiring Soon",
    value: 5,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Expired Items",
    value: 2,
    color: "bg-red-100 text-red-700",
  },
];

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

export default function DashboardPage() {
  return (
    <section className="space-y-10">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-green-600">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Welcome to PantryPal. Here's a quick overview of your pantry.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">
              {stat.title}
            </p>

            <div
              className={`mt-4 inline-flex rounded-lg px-4 py-2 text-3xl font-bold ${stat.color}`}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Pantry Items */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-slate-800">
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
                <h3 className="font-semibold text-slate-800">
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

      {/* Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/pantry"
          className="rounded-lg bg-green-600 px-6 py-3 text-center font-medium text-white transition hover:bg-green-700"
        >
          View Pantry
        </Link>

        <Link
          href="/reminders"
          className="rounded-lg border border-green-600 px-6 py-3 text-center font-medium text-green-600 transition hover:bg-green-50"
        >
          View Reminders
        </Link>
      </div>
    </section>
  );
}