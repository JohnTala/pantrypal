import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import PantryItem from "@/models/PantryItem";

export const metadata: Metadata = {
  title: "Reminders",
  description:
    "View and manage your pantry expiration reminders to help reduce food waste.",
};

interface ReminderItem {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expirationDate: Date;
}

export default async function RemindersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectDB();

  const today = new Date();

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const reminders = (await PantryItem.find({
    userId: session.user.id,
    expirationDate: {
      $gte: today,
      $lte: nextWeek,
    },
  })
    .sort({ expirationDate: 1 })
    .lean()) as ReminderItem[];

  return (
    <section className="mx-auto max-w-5xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-green-600">
          Expiration Reminders
        </h1>

        <p className="mt-2 text-slate-600">
          Pantry items that expire within the next 7 days.
        </p>
      </div>

      {reminders.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-500">
            Excellent! There are no items expiring within the next week.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left">Item</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Expiration</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {reminders.map((item) => {
                const expiration = new Date(item.expirationDate);

                const diffDays = Math.ceil(
                  (expiration.getTime() - today.getTime()) /
                    (1000 * 60 * 60 * 24)
                );

                let status = "";

                if (diffDays === 0) {
                  status = "Expires Today";
                } else if (diffDays === 1) {
                  status = "Expires Tomorrow";
                } else {
                  status = `Expires in ${diffDays} days`;
                }

                return (
                  <tr key={item._id.toString()} className="border-t">
                    <td className="px-6 py-4 font-medium">
                      {item.name}
                    </td>

                    <td className="px-6 py-4">
                      {item.category}
                    </td>

                    <td className="px-6 py-4">
                      {item.quantity} {item.unit}
                    </td>

                    <td className="px-6 py-4">
                      {expiration.toLocaleDateString()}
                    </td>

                    <td
                      className={`px-6 py-4 font-medium ${
                        diffDays <= 1
                          ? "text-red-600"
                          : "text-amber-600"
                      }`}
                    >
                      {status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Link
        href="/pantry"
        className="inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
      >
        Back to Pantry
      </Link>
    </section>
  );
}