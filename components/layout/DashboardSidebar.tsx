// components/layout/DashboardSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineBell,
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: HiOutlineSquares2X2 },
  { href: "/pantry", label: "Pantry", icon: HiOutlineHome },
  { href: "/reminders", label: "Reminders", icon: HiOutlineBell },
  { href: "/profile", label: "Profile", icon: HiOutlineUser },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

// components/layout/DashboardSidebar.tsx (logout function)

// components/layout/DashboardSidebar.tsx (update handleLogout)

const handleLogout = async () => {
    try {
      // Clear localStorage (for demo)
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      
      // Call logout API (when you have it)
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
  
      // Redirect to login page
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  };

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200 py-9">
        <Link href="/dashboard" className="text-2xl font-bold text-emerald-600">
          🥫 PantryPal
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${
                  active
                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 p-4 space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <HiOutlineCog6Tooth className="h-5 w-5" />
          <span>Settings</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
        >
          <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}