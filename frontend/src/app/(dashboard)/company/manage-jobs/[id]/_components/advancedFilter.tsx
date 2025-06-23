"use client";

import { Field } from "formik";
import { FaSearch, FaTimes } from "react-icons/fa";
import FormatCurrencyInput from "@/components/atoms/formatCurencyInput";

interface AdvancedFilterProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  statusOptions: string[];
  clearFilter: (field: string, values: any, setFieldValue: any) => void;
}

const educationOptions = [
  { value: "", label: "All Education" },
  { value: "High School", label: "High School" },
  { value: "Diploma", label: "Diploma" },
  { value: "Bachelor", label: "Bachelor" },
  { value: "Master", label: "Master" },
  { value: "Doctorate", label: "Doctorate" },
  { value: "Other", label: "Other" },
];

export default function AdvancedFilter({
  values,
  setFieldValue,
  statusOptions,
  clearFilter,
}: AdvancedFilterProps) {
  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status
          </label>
          <div className="relative">
            <Field
              as="select"
              id="status"
              name="status"
              className="w-full text-sm border border-gray-300 px-3 py-2 rounded-md focus:border-green-500 transition-colors appearance-none outline-none"
            >
              <option value="">All Status</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Field>
            {values.status && (
              <button
                type="button"
                onClick={() => clearFilter("status", values, setFieldValue)}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors outline-none"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="userFirstName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            First Name
          </label>
          <div className="relative">
            <Field
              id="userFirstName"
              name="userFirstName"
              type="text"
              placeholder="Search by first name"
              className="w-full text-sm border border-gray-300 px-3 py-2 pr-8 rounded-md focus:border-green-500 transition-colors outline-none"
            />
            {values.userFirstName && (
              <button
                type="button"
                onClick={() =>
                  clearFilter("userFirstName", values, setFieldValue)
                }
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors outline-none"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="usereducation"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Education
          </label>
          <div className="relative">
            <Field
              as="select"
              id="usereducation"
              name="usereducation"
              className="w-full text-sm border border-gray-300 px-3 py-2 rounded-md focus:border-green-500 transition-colors appearance-none outline-none"
            >
              {educationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
            {values.usereducation && (
              <button
                type="button"
                onClick={() =>
                  clearFilter("usereducation", values, setFieldValue)
                }
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors outline-none"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Max Age
          </label>
          <div className="relative">
            <Field
              id="age"
              name="age"
              type="number"
              min="1"
              max="100"
              placeholder="Maximum age"
              className="w-full text-sm border border-gray-300 px-3 py-2 pr-8 rounded-md focus:border-green-500 transition-colors outline-none"
            />
            {values.age && (
              <button
                type="button"
                onClick={() => clearFilter("age", values, setFieldValue)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors outline-none"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-1">
          <label
            htmlFor="expectedSalary"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Max Expected Salary
          </label>
          <div className="relative">
            <FormatCurrencyInput
              name="expectedSalary"
              className="w-full text-sm border border-gray-300 px-3 py-2 pr-8 rounded-md focus:border-green-500 transition-colors outline-none"
              placeholder="Maximum salary"
            />
            {values.expectedSalary && (
              <button
                type="button"
                onClick={() =>
                  clearFilter("expectedSalary", values, setFieldValue)
                }
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors outline-none"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>
        </div>
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
          type="submit"
          onClick={() => {
            setFieldValue("status", "");
            setFieldValue("userFirstName", "");
            setFieldValue("usereducation", "");
            setFieldValue("expectedSalary", "");
            setFieldValue("age", "");
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
