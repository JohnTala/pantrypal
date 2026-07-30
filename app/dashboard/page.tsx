import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import RecentItems from "@/components/dashboard/RecentItems";
import Link from "next/link";
import { getUserPantryItems } from "@/lib/pantry";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const pantryItems = await getUserPantryItems(
    session.user.id,
  );

  return (
    <section className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-green-600">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Welcome back, {session.user.name}. Here's a quick overview of your pantry.
        </p>
      </div>

      <DashboardSummary items={pantryItems} />

      <RecentItems items={pantryItems} />

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/pantry/new"
          className="rounded-lg bg-green-600 px-6 py-3 text-center font-medium text-white hover:bg-green-700"
        >
          Add Pantry Item
        </Link>

        <Link
          href="/pantry"
          className="rounded-lg border border-green-600 px-6 py-3 text-center font-medium text-green-600 hover:bg-green-50"
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