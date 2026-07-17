
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:px-6 lg:px-8">
        {/* Brand */}
        <div>
          <p className="font-medium text-slate-800">
            &copy; {currentYear} PantryPal
          </p>
          <p>Helping reduce food waste, one pantry at a time.</p>
        </div>

        {/* Footer Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="transition hover:text-green-600"
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className="transition hover:text-green-600"
          >
            Dashboard
          </Link>

          <Link
            href="/pantry"
            className="transition hover:text-green-600"
          >
            Pantry
          </Link>

          <Link
            href="/reminders"
            className="transition hover:text-green-600"
          >
            Reminders
          </Link>
        </div>
      </div>
    </footer>
  );
}