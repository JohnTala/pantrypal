type StatsCardProps = {
  title: string;
  value: number;
  color: string;
};

export default function StatsCard({
  title,
  value,
  color,
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <div
        className={`mt-4 inline-flex rounded-lg px-4 py-2 text-3xl font-bold ${color}`}
      >
        {value}
      </div>
    </div>
  );
}