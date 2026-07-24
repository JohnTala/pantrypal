import StatsCard from "./StatsCard";

const stats = [
  {
    title: "Total Items",
    value: 24,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Expiring Soon",
    value: 5,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Expired Items",
    value: 2,
    color: "bg-red-100 text-red-700",
  },
];

export default function DashboardSummary() {
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