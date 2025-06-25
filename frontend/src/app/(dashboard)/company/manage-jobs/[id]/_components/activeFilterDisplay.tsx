"use client";

import { IFilterApplicants } from "@/types/applicationType";
import { FaTimes } from "react-icons/fa";

interface ActiveFilterDisplayProps {
  values: IFilterApplicants;
  clearFilter: (
    field: keyof IFilterApplicants,
    values: IFilterApplicants,
    setFieldValue: (field: keyof IFilterApplicants, value: string) => void
  ) => void;
  setFieldValue: (field: keyof IFilterApplicants, value: string) => void;
  sortOptions: Array<{ value: string; label: string }>;
}

export default function ActiveFilterDisplay({
  values,
  clearFilter,
  setFieldValue,
  sortOptions,
}: ActiveFilterDisplayProps) {
  return (
    <div className="bg-green-50 border-t border-green-200 px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-green-800">
          Active filters:
        </span>
        {values.status && (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
            Status: {values.status}
            <button
              type="button"
              onClick={() => clearFilter("status", values, setFieldValue)}
              className="text-green-600 hover:text-green-800 ml-1"
            >
              <FaTimes className="text-xs" />
            </button>
          </span>
        )}
        {values.userFirstName && (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
            Name: {values.userFirstName}
            <button
              type="button"
              onClick={() =>
                clearFilter("userFirstName", values, setFieldValue)
              }
              className="text-green-600 hover:text-green-800 ml-1"
            >
              <FaTimes className="text-xs" />
            </button>
          </span>
        )}
        {values.usereducation && (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
            Education: {values.usereducation}
            <button
              type="button"
              onClick={() =>
                clearFilter("usereducation", values, setFieldValue)
              }
              className="text-green-600 hover:text-green-800 ml-1"
            >
              <FaTimes className="text-xs" />
            </button>
          </span>
        )}
        {values.age && (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
            Age ≤ {values.age}
            <button
              type="button"
              onClick={() => clearFilter("age", values, setFieldValue)}
              className="text-green-600 hover:text-green-800 ml-1"
            >
              <FaTimes className="text-xs" />
            </button>
          </span>
        )}
        {values.expectedSalary && (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
            Salary ≤{" "}
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(Number(values.expectedSalary))}
            <button
              type="button"
              onClick={() =>
                clearFilter("expectedSalary", values, setFieldValue)
              }
              className="text-green-600 hover:text-green-800 ml-1"
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
