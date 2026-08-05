type ReminderCardProps = {
  name: string;
  category: string;
  expiryDate: string;
  status?: "expired" | "soon" | "normal";
};

export default function ReminderCard({
  name,
  category,
  expiryDate,
  status = "normal",
}: ReminderCardProps) {
  const statusStyles = {
    expired: "bg-red-100 text-red-700",
    soon: "bg-yellow-100 text-yellow-700",
    normal: "bg-green-100 text-green-700",
  };

  const statusText = {
    expired: "Expired",
    soon: "Expiring Soon",
    normal: "Good",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {name}
          </h3>

          <p className="text-sm text-slate-500">
            Category: {category}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Expiry date:{" "}
            {new Date(expiryDate).toLocaleDateString()}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
        >
          {statusText[status]}
        </span>
      </div>
    </div>
  );
}