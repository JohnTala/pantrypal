export default function ExpiringItems() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-xl font-semibold">
          Expiring Soon
        </h2>
      </div>

      <div className="px-6 py-6">
        <p className="text-slate-500">
          No expiring items to display yet.
        </p>
      </div>
    </div>
  );
}