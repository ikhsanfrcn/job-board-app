"use client";

import { IFilterUserApplicants } from "@/types/applicationType";
import { Field } from "formik";
import { FaSearch, FaTimes } from "react-icons/fa";

interface AdvancedFiltersProps {
  values: IFilterUserApplicants;
  setFieldValue: (field: keyof IFilterUserApplicants, value: string) => void;
  clearFilter: (
    field: keyof IFilterUserApplicants,
    values: IFilterUserApplicants,
    setFieldValue: (field: keyof IFilterUserApplicants, value: string) => void
  ) => void;
}

export default function AdvancedFilter({
  values,
  setFieldValue,
  clearFilter,
}: AdvancedFiltersProps) {
  const renderField = (
    name: keyof AdvancedFiltersProps["values"],
    label: string,
    placeholder: string
  ) => (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <Field
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          className="w-full text-sm border border-gray-300 px-3 py-2 pr-8 rounded-md focus:border-green-500 transition-colors outline-none"
        />
        {values[name] && (
          <button
            type="button"
            onClick={() => clearFilter(name, values, setFieldValue)}
            aria-label={`Clear ${label}`}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors outline-none"
          >
            <FaTimes className="text-xs" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderField("title", "Job Title", "e.g. Fullstack Developer")}
        {renderField("company", "Company", "e.g. Google")}
      </div>

      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
        <button
          type="submit"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-green-700 transition-all outline-none"
        >
          <FaSearch className="text-xs" />
          <span>Apply Filters</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setFieldValue("title", "");
            setFieldValue("company", "");
          }}
          className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-all outline-none"
        >
          <FaTimes className="text-xs" />
          <span>Clear Advanced</span>
        </button>
      </div>
    </div>
  );
}
