"use client";

import { IFilterUserApplicants } from "@/types/applicationType";
import { FaTimes } from "react-icons/fa";

interface ActiveFiltersDisplayProps {
  values: IFilterUserApplicants;
  sortOptions: Array<{ value: string; label: string }>;
  clearFilter: (
    field: keyof IFilterUserApplicants,
    values: IFilterUserApplicants,
    setFieldValue: (field: keyof IFilterUserApplicants, value: string) => void
  ) => void;
  setFieldValue: (field: keyof IFilterUserApplicants, value: string) => void;
  hasActiveFilters: (values: IFilterUserApplicants) => boolean;
}

export default function ActiveFiltersDisplay({
  values,
  sortOptions,
  clearFilter,
  setFieldValue,
  hasActiveFilters,
}: ActiveFiltersDisplayProps) {
  if (!hasActiveFilters(values)) {
    return null;
  }

  return (
    <div className="bg-green-50 border-t border-green-200 px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-green-800">
          Active filters:
        </span>
        {values.title && (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
            Title: {values.title}
            <button
              type="button"
              onClick={() => clearFilter("title", values, setFieldValue)}
              className="text-green-600 hover:text-green-800 ml-1 outline-none"
            >
              <FaTimes className="text-xs" />
            </button>
          </span>
        )}
        {values.company && (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
            Category: {values.company}
            <button
              type="button"
              onClick={() => clearFilter("company", values, setFieldValue)}
              className="text-green-600 hover:text-green-800 ml-1 outline-none"
            >
              <FaTimes className="text-xs" />
            </button>
          </span>
        )}
        <span className="text-xs text-green-600 ml-2">
          | Sorted by{" "}
          {sortOptions.find((o) => o.value === values.sortBy)?.label} (
          {values.sortOrder === "asc" ? "A-Z" : "Z-A"})
        </span>
      </div>
    </div>
  );
}
