import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to PantryPal. Organize your pantry, track expiration dates, and reduce food waste with an easy-to-use pantry management application.",
};

const features = [
  {
    title: "Track Pantry Items",
    description:
      "Add, update, and organize all your pantry items in one convenient place.",
  },
  {
    title: "Monitor Expiration Dates",
    description:
      "Stay ahead of expiration dates and reduce food waste with timely reminders.",
  },
  {
    title: "Smart Dashboard",
    description:
      "View pantry insights, recent items, and key statistics from a single dashboard.",
  },
];

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
          <div className="mt-20 w-full max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-slate-900">
                Why Choose PantryPal?
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                PantryPal provides the tools you need to organize your pantry,
                monitor food freshness, and reduce unnecessary waste. Everything
                is designed to make managing your household inventory simple and
                efficient.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-lg border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h2 className="mb-3 text-xl font-semibold text-green-600">
                    {feature.title}
                  </h2>

                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
    </section>
  );
}