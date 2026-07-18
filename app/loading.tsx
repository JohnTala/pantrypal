

export default function Loading() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col px-4 py-8">
      {/* Hero Skeleton */}
      <div className="mb-12 animate-pulse">
        <div className="mb-4 h-10 w-72 rounded-md bg-green-200" />
        <div className="mb-2 h-4 w-full max-w-2xl rounded bg-slate-200" />
        <div className="h-4 w-2/3 rounded bg-slate-200" />
      </div>

      {/* Feature Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((card) => (
          <div
            key={card}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 h-6 w-1/2 animate-pulse rounded bg-green-200" />
            <div className="mb-2 h-4 animate-pulse rounded bg-slate-200" />
            <div className="mb-2 h-4 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Button Skeletons */}
      <div className="mt-12 flex flex-col gap-4 sm:flex-row">
        <div className="h-12 w-40 animate-pulse rounded-lg bg-green-300" />
        <div className="h-12 w-40 animate-pulse rounded-lg bg-slate-300" />
      </div>
    </main>
  );
}