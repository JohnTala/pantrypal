"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());

    return `/pantry?${params.toString()}`;
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <Link
        href={createPageURL(Math.max(currentPage - 1, 1))}
        className={`rounded border px-4 py-2 ${
          currentPage === 1
            ? "pointer-events-none opacity-50"
            : "hover:bg-slate-100"
        }`}
      >
        Previous
      </Link>

      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;

        return (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`rounded border px-4 py-2 ${
              page === currentPage
                ? "bg-green-600 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={createPageURL(Math.min(currentPage + 1, totalPages))}
        className={`rounded border px-4 py-2 ${
          currentPage === totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-slate-100"
        }`}
      >
        Next
      </Link>
    </div>
  );
}