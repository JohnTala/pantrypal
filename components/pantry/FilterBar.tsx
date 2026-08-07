"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleFilter(category: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex justify-end">
      <select
        defaultValue={searchParams.get("category") ?? ""}
        onChange={(e) => handleFilter(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-green-600 focus:outline-none"
      >
        <option value="">All Categories</option>
        <option value="Dairy">Dairy</option>
        <option value="Fruit">Fruit</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Grains">Grains</option>
        <option value="Meat">Meat</option>
        <option value="Snacks">Snacks</option>
      </select>
    </div>
  );
}