import Link from "next/link";

export default function RemindersPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-green-600">
          Reminders
        </h1>

        <p className="mt-2 text-slate-600">
          View and manage your pantry expiry reminders.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">
          No reminders available yet. Reminder functionality will be implemented in a future update.
        </p>
      </div>

      <Link
        href="/dashboard"
        className="inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
      >
        Back to Dashboard
      </Link>
    </section>
  );
}