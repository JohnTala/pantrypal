import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import PantryItem from "@/models/PantryItem";

import SearchBar from "@/components/pantry/SearchBar";
import FilterBar from "@/components/pantry/FilterBar";
import DeleteDialog from "@/components/pantry/DeleteDialog";
import Pagination from "@/components/pantry/Pagination";

export const metadata: Metadata = {
  title: "My Pantry",
  description:
    "View, organize, and manage your pantry items while tracking expiration dates in PantryPal.",
};

interface PantryPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}

export default async function PantryPage({
  searchParams,
}: PantryPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectDB();

  const { search, category, page } = await searchParams;

  const currentPage = Number(page) || 1;
  const ITEMS_PER_PAGE = 3;

  const filter: {
    userId: string;
    category?: string;
    name?: {
      $regex: string;
      $options: string;
    };
  } = {
    userId: session.user.id,
  };

  // Category filter
  if (category) {
    filter.category = category;
  }

  // Search filter
  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  // Count matching items
  const totalItems = await PantryItem.countDocuments(filter);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Fetch current page
  const items = await PantryItem.find(filter)
    .sort({ createdAt: -1 })
    .skip((currentPage - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .lean();

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-bold text-green-600">
            My Pantry
          </h1>

          <p className="mt-2 text-slate-600">
            Manage your pantry items and track expiration dates.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {totalItems} item{totalItems !== 1 ? "s" : ""} found
          </p>
        </div>

        <Link
          href="/pantry/new"
          className="rounded-lg bg-green-600 px-5 py-3 text-center font-medium text-white transition hover:bg-green-700"
        >
          + Add Pantry Item
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="grid gap-4 md:grid-cols-2">
        <SearchBar />
        <FilterBar />
      </div>

      {/* Pantry Items */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-slate-600">
            No pantry items match your search or filter.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item._id.toString()}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h2 className="text-xl font-semibold text-slate-800">
                  {item.name}
                </h2>

                <p className="mt-3 text-sm text-slate-500">
                  <span className="font-medium">Category:</span>{" "}
                  {item.category}
                </p>

                <p className="text-sm text-slate-500">
                  <span className="font-medium">Quantity:</span>{" "}
                  {item.quantity} {item.unit}
                </p>

                <p className="mt-3 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Expires:{" "}
                  {new Date(item.expirationDate).toLocaleDateString()}
                </p>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/pantry/${item._id.toString()}/edit`}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <DeleteDialog
                    itemId={item._id.toString()}
                    itemName={item.name}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </section>
  );
}