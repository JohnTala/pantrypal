// components/layout/Header.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Will be replaced with auth check

  const navItems = [
    { href: '/pantry', label: 'Pantry' },
    { href: '/reminders', label: 'Reminders' },
    { href: '/profile', label: 'Profile' },
    // Dashboard removed - it's now the landing page after login
  ];

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
          🥫 PantryPal
        </Link>

        {isLoggedIn && (
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-700 hover:text-blue-600 transition-colors ${
                  pathname === item.href ? 'text-blue-600 font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <button
              onClick={() => {/* Handle logout */}}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}