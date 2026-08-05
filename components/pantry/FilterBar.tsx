"use client";


interface FilterBarProps {
  onFilter: (category: string) => void;
}


export default function FilterBar({
  onFilter,
}: FilterBarProps) {


  return (
    <select
      onChange={(e) =>
        onFilter(e.target.value)
      }
      className="rounded-lg border border-slate-300 px-4 py-3"
    >

      <option value="">
        All Categories
      </option>

      <option value="Dairy">
        Dairy
      </option>

      <option value="Fruit">
        Fruit
      </option>

      <option value="Vegetables">
        Vegetables
      </option>

      <option value="Grains">
        Grains
      </option>

      <option value="Meat">
        Meat
      </option>

      <option value="Snacks">
        Snacks
      </option>

    </select>
  );
}