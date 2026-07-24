import DashboardSummary from "@/components/dashboard/DashboardSummary";
import RecentItems from "@/components/dashboard/RecentItems";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <section className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-green-600">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Welcome to PantryPal. Here's a quick overview of your pantry.
        </p>
      </div>

      <DashboardSummary />

      <RecentItems />

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/pantry"
          className="rounded-lg bg-green-600 px-6 py-3 text-center font-medium text-white hover:bg-green-700"
        >
          View Pantry
        </Link>

        <Link
          href="/reminders"
          className="rounded-lg border border-green-600 px-6 py-3 text-center font-medium text-green-600 hover:bg-green-50"
        >
          View Reminders
        </Link>
      </div>
    </section>
  );
}