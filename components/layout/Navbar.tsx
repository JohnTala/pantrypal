"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pantry", label: "Pantry" },
  { href: "/reminders", label: "Reminders" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-green-600 transition hover:text-green-700"
        >
          PantryPal
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                isActive(link.href)
                  ? "font-semibold text-green-600"
                  : "text-slate-700 hover:text-green-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Authentication Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-md border border-green-600 px-4 py-2 text-sm font-medium text-green-600 transition hover:bg-green-50"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <HiOutlineXMark className="h-6 w-6" />
          ) : (
            <HiOutlineBars3 className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="flex flex-col px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-md px-3 py-2 transition ${
                  isActive(link.href)
                    ? "bg-green-50 font-semibold text-green-600"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 flex gap-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-md border border-green-600 px-4 py-2 text-center text-sm font-medium text-green-600 transition hover:bg-green-50"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-md bg-green-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-green-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}