// components/ui/LogoutButton.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout?")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/login");
        router.refresh();
      } else {
        console.error("Logout failed");
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full disabled:opacity-50"
    >
      <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
      <span>{isLoading ? "Logging out..." : "Logout"}</span>
    </button>
  );
}