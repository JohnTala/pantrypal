// components/layout/DashboardHeader.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineArrowRightOnRectangle,
  HiOutlineMagnifyingGlass,
  HiOutlineSquares2X2,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

export default function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/login");
        router.refresh();
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/pantry?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Mobile menu toggle & Page Title */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            {isMobileMenuOpen ? (
              <HiOutlineXMark className="h-6 w-6" />
            ) : (
              <HiOutlineBars3 className="h-6 w-6" />
            )}
          </button>

          {/* Page Title - hidden on mobile when search is active */}
          <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">
            {getPageTitle(pathname)}
          </h1>
        </div>

        {/* Center - Search Input */}
        <div className="flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search pantry items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-gray-50 hover:bg-white"
            />
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <HiOutlineXMark className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            aria-label="Notifications"
          >
            <HiOutlineBell className="h-6 w-6 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <HiOutlineUser className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="hidden sm:inline text-sm font-medium text-gray-700">
              John Doe
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar (overlay) */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-white z-50 md:hidden shadow-xl">
            <MobileSidebarContent 
              onClose={() => setIsMobileMenuOpen(false)} 
              onLogout={handleLogout}
            />
          </div>
        </>
      )}
    </header>
  );
}

// Helper function to get page title
function getPageTitle(pathname: string) {
  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/pantry": "Pantry",
    "/pantry/new": "Add New Item",
    "/reminders": "Reminders",
    "/profile": "Profile",
    "/settings": "Settings",
  };

  if (pathname.startsWith("/pantry/") && !pathname.includes("/edit")) {
    return "Item Details";
  }
  if (pathname.includes("/edit")) {
    return "Edit Item";
  }

  return titles[pathname] || "PantryPal";
}

// Mobile Sidebar Content
function MobileSidebarContent({ 
  onClose, 
  onLogout 
}: { 
  onClose: () => void;
  onLogout: () => void;
}) {
  const pathname = usePathname();
  const sidebarLinks = [
    { href: "/dashboard", label: "Dashboard", icon: HiOutlineSquares2X2 },
    { href: "/pantry", label: "Pantry", icon: HiOutlineHome },
    { href: "/reminders", label: "Reminders", icon: HiOutlineBell },
    { href: "/profile", label: "Profile", icon: HiOutlineUser },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link href="/dashboard" className="text-xl font-bold text-emerald-600">
          🥫 PantryPal
        </Link>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <HiOutlineXMark className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
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

      <div className="border-t border-gray-200 p-4 space-y-2">
        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <HiOutlineCog6Tooth className="h-5 w-5" />
          <span>Settings</span>
        </Link>
        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
        >
          <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}