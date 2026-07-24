// lib/dashboard.ts

export async function getDashboardData() {
    // This will be replaced with real database queries
    return {
      totalItems: 42,
      expiringSoon: 8,
      expiredItems: 3,
      recentItems: [
        { id: 1, name: "Milk", quantity: 2, expiresAt: "2026-07-20" },
        { id: 2, name: "Eggs", quantity: 12, expiresAt: "2026-07-25" },
        { id: 3, name: "Bread", quantity: 1, expiresAt: "2026-07-18" },
      ],
      expiringItems: [
        { id: 4, name: "Yogurt", quantity: 3, expiresAt: "2026-07-15", daysLeft: 1 },
        { id: 5, name: "Chicken", quantity: 1, expiresAt: "2026-07-16", daysLeft: 2 },
      ]
    };
  }