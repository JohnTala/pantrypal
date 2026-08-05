import StatsCard from "./StatsCard";

type PantryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  createdAt: string;
};

interface DashboardSummaryProps {
  items: PantryItem[];
}

export default function DashboardSummary({
  items,
}: DashboardSummaryProps) {
  const today = new Date();

  const expiringSoon = items.filter((item) => {
    const expiryDate = new Date(item.expiryDate);

    const daysRemaining =
      (expiryDate.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24);

    return daysRemaining > 0 && daysRemaining <= 7;
  });

  const expiredItems = items.filter((item) => {
    return new Date(item.expiryDate) < today;
  });

  const stats = [
    {
      title: "Total Items",
      value: items.length,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Expiring Soon",
      value: expiringSoon.length,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Expired Items",
      value: expiredItems.length,
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <StatsCard
          key={stat.title}
          {...stat}
        />
      ))}
    </div>
  );
}