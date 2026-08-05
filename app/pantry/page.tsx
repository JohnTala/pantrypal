import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import PantryItem from "@/models/PantryItem";

export const metadata: Metadata = {
  title: "My Pantry",
  description:
    "View, organize, and manage your pantry items while tracking expiration dates in PantryPal.",
};

export default async function PantryPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectDB();

  const items = await PantryItem.find({
    userId: session.user.id,
  })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-green-600">
          My Pantry
        </h1>

        <p className="mt-2 text-slate-600">
          Manage your pantry items and track expiry dates.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-slate-600">
            Your pantry is empty. Add your first item.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item._id.toString()}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-800">
                {item.name}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Category: {item.category}
              </p>

              <p className="text-sm text-slate-500">
                Quantity: {item.quantity} {item.unit}
              </p>

              <p className="mt-3 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Expires:{" "}
                {new Date(item.expiryDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}