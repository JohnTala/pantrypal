import Link from "next/link";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Pantry",
    href: "/pantry",
  },
  {
    name: "Add Item",
    href: "/pantry/new",
  },
  {
    name: "Reminders",
    href: "/reminders",
  },
  {
    name: "Profile",
    href: "/profile",
  },
];

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 border-r border-slate-200 bg-white p-6">
      <h2 className="mb-6 text-xl font-bold text-green-600">
        PantryPal
      </h2>

      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-lg px-4 py-3 text-slate-700 transition hover:bg-green-50 hover:text-green-700"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}