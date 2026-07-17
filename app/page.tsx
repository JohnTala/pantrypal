// app/page.tsx

import Link from "next/link";

export default async function HomePage() {
   // Simulate a 2-second server delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <section className="flex flex-col items-center justify-center py-16 text-center">
      <div className="max-w-3xl">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-green-600">
          Welcome to PantryPal
        </h1>

        <p className="mb-8 text-lg text-slate-600">
          Organize your pantry, track expiration dates, and reduce food waste
          with a simple and intuitive pantry management application.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="rounded-md bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-md border border-green-600 px-6 py-3 font-medium text-green-600 transition hover:bg-green-50"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="mt-20 grid w-full max-w-6xl gap-8 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-green-600">
            Track Pantry Items
          </h2>
          <p className="text-slate-600">
            Keep all your pantry items organized in one place.
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-green-600">
            Monitor Expiration Dates
          </h2>
          <p className="text-slate-600">
            Know exactly which items are expiring soon to reduce waste.
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-green-600">
            Smart Dashboard
          </h2>
          <p className="text-slate-600">
            View pantry statistics and important reminders at a glance.
          </p>
        </div>
      </div>
    </section>
  );
}