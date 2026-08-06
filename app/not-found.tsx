import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">
        <h1 className="text-7xl font-extrabold text-green-600">404</h1>

        <h2 className="mt-4 text-2xl font-bold text-slate-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-600">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
          >
            Dashboard
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}