"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const router = useRouter();

  const goToPage = (page: number) => {
    onPageChange(page);
    router.push(`?page=${page}`);
  };

  return (
    <div className="flex justify-center gap-2 mt-5">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
      >
        Prev
      </button>
      <span className="px-2 py-2 text-sm">
        {currentPage} / {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
