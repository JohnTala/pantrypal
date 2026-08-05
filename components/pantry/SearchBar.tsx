"use client";

interface SearchBarProps {
  onSearch: (value: string) => void;
}


export default function SearchBar({
  onSearch,
}: SearchBarProps) {

  return (
    <input
      type="text"
      placeholder="Search pantry items..."
      onChange={(e) =>
        onSearch(e.target.value)
      }
      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
    />
  );
}