"use client";

import { IFilterUserAssessments } from "@/types/assessment";
import { FaTimes } from "react-icons/fa";

interface ActiveFiltersDisplayProps {
  values: IFilterUserAssessments;
  sortOptions: Array<{ value: string; label: string }>;
  clearFilter: (
    field: keyof IFilterUserAssessments,
    values: IFilterUserAssessments,
    setFieldValue: (
      field: keyof IFilterUserAssessments,
      value: string | boolean
    ) => void
  ) => void;
  setFieldValue: (
    field: keyof IFilterUserAssessments,
    value: string | boolean
  ) => void;
  hasActiveFilters: (values: IFilterUserAssessments) => boolean;
}

export default function ActiveFiltersDisplay({
  values,
  sortOptions,
  clearFilter,
  setFieldValue,
  hasActiveFilters,
}: ActiveFiltersDisplayProps) {
  if (!hasActiveFilters(values)) return null;

  const getIsPassedLabel = () => {
    if (values.isPassed === "true") return "Passed";
    if (values.isPassed === "false") return "Not Passed";
    return null;
  };

  const sortLabel =
    sortOptions.find((o) => o.value === values.sortBy)?.label || "Unknown";

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

        {getIsPassedLabel() && (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
            Result: {getIsPassedLabel()}
            <button
              type="button"
              onClick={() => clearFilter("isPassed", values, setFieldValue)}
              className="text-green-600 hover:text-green-800 ml-1 outline-none"
            >
              <FaTimes className="text-xs" />
            </button>
          </span>
        )}

        <span className="text-xs text-green-600 ml-2">
          | Sorted by {sortLabel} ({values.sortOrder === "asc" ? "A-Z" : "Z-A"})
        </span>
      </div>
    </div>
  );
}
