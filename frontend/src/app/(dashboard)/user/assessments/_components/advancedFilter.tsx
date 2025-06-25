"use client";

import { Field } from "formik";
import { FaSearch, FaTimes } from "react-icons/fa";

interface AdvancedFiltersProps {
  values: {
    title: string;
    isPassed: string;
    sortBy: string;
    sortOrder: string;
  };
  setFieldValue: (field: string, value: any) => void;
  clearFilter: (field: string, values: any, setFieldValue: any) => void;
}

export default function AdvancedFilter({
  values,
  setFieldValue,
  clearFilter,
}: AdvancedFiltersProps) {
  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filter by Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Job Title
          </label>
          <div className="relative">
            <Field
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Fullstack Developer"
              className="w-full text-sm border border-gray-300 px-3 py-2 pr-8 rounded-md focus:border-green-500 transition-colors outline-none"
            />
            {values.title && (
              <button
                type="button"
                onClick={() => clearFilter("title", values, setFieldValue)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors outline-none"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>
        </div>

        {/* Filter by isPassed */}
        <div>
          <label
            htmlFor="isPassed"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Assessment Result
          </label>
          <div className="relative">
            <Field
              as="select"
              id="isPassed"
              name="isPassed"
              className="w-full text-sm border border-gray-300 px-3 py-2 rounded-md focus:border-green-500 transition-colors outline-none"
            >
              <option value="">All</option>
              <option value="true">Passed</option>
              <option value="false">Failed</option>
            </Field>
            {values.isPassed && (
              <button
                type="button"
                onClick={() => clearFilter("isPassed", values, setFieldValue)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors outline-none"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
        <button
          type="submit"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-green-700 transition-all outline-none"
        >
          <FaSearch className="text-xs" />
          <span>Apply Filters</span>
        </button>
        <button
          type="submit"
          onClick={() => {
            setFieldValue("title", "");
            setFieldValue("isPassed", "");
            setFieldValue("sortBy", "");
            setFieldValue("sortOrder", "");
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
