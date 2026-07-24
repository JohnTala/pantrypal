// app/dashboard/page.tsx

import Link from "next/link";
import { getDashboardData } from "@/lib/dashboard";

export default async function DashboardPage() {
  // This will be replaced with real data from your database
  const data = await getDashboardData();

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Items"
          value={data.totalItems}
          icon="📦"
          color="bg-emerald-50"
        />
        <DashboardCard
          title="Expiring Soon"
          value={data.expiringSoon}
          icon="⚠️"
          color="bg-amber-50"
          subtitle={`${data.expiringSoon} items need attention`}
        />
        <DashboardCard
          title="Expired"
          value={data.expiredItems}
          icon="❌"
          color="bg-red-50"
          subtitle="Time to clean out!"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expiring Soon List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🔔</span>
            Expiring Soon
          </h2>
          
          {data.expiringItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No items expiring soon! 🎉
            </p>
          ) : (
            <div className="space-y-3">
              {data.expiringItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} • Expires in {item.daysLeft} day{item.daysLeft !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-amber-700">
                    {item.daysLeft === 0 ? 'Today!' : `${item.daysLeft}d`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Items */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🕐</span>
            Recently Added
          </h2>
          
          {data.recentItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No items yet</p>
              <Link
                href="/pantry/new"
                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm mt-2 inline-block"
              >
                Add your first item →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {data.recentItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} • Expires: {new Date(item.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    href={`/pantry/${item.id}`}
                    className="text-emerald-600 hover:text-emerald-700 text-sm"
                  >
                    View →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper Component for Dashboard Cards
function DashboardCard({ 
  title, 
  value, 
  icon, 
  color, 
  subtitle 
}: { 
  title: string; 
  value: number; 
  icon: string; 
  color: string;
  subtitle?: string;
}) {
  return (
    <div className={`${color} rounded-xl p-6 border border-gray-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}