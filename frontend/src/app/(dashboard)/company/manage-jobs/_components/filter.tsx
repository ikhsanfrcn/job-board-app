"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field } from "formik";
import {
  FaSearch,
  FaRedo,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import ActiveFiltersDisplay from "./activeFilterDisplay";
import AdvancedFilter from "./advancedFilter";

export default function JobFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const initialValues = {
    title: searchParams.get("title") || "",
    category: searchParams.get("category") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "desc",
  };

  const sortOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "title", label: "Title" },
    { value: "category", label: "Category" },
  ];

  const handleSubmit = (values: typeof initialValues) => {
    const params = new URLSearchParams();

    if (values.title) params.set("title", values.title);
    if (values.category) params.set("category", values.category);

    if (values.sortBy) params.set("sortBy", values.sortBy);
    if (values.sortOrder) params.set("sortOrder", values.sortOrder);

    params.set("page", "1");
    router.push(`/company/manage-jobs?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/company/manage-jobs?page=1&sortBy=createdAt&sortOrder=desc");
    setShowAdvanced(false);
  };

  const clearFilter = (field: string, values: any, setFieldValue: any) => {
    setFieldValue(field, "");
    const newValues = { ...values, [field]: "" };
    handleSubmit(newValues);
  };

  const hasActiveFilters = (values: any) => {
    return values.title || values.category;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <div className="bg-white border border-gray-200 rounded-lg mb-6">
          <div className="p-4">
            <Form>
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="sortBy"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Sort By
                  </label>
                  <Field
                    as="select"
                    id="sortBy"
                    name="sortBy"
                    className="w-full text-sm border border-gray-300 px-3 py-2 rounded-md focus:border-green-500 transition-colors outline-none"
                    onChange={(e: any) => {
                      setFieldValue("sortBy", e.target.value);
                      handleSubmit({ ...values, sortBy: e.target.value });
                    }}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="sortOrder"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Order
                  </label>
                  <Field
                    as="select"
                    id="sortOrder"
                    name="sortOrder"
                    className="w-full text-sm border border-gray-300 px-3 py-2 rounded-md focus:border-green-500 transition-colors outline-none"
                    onChange={(e: any) => {
                      setFieldValue("sortOrder", e.target.value);
                      handleSubmit({ ...values, sortOrder: e.target.value });
                    }}
                  >
                    <option value="desc">Descending (Z-A)</option>
                    <option value="asc">Ascending (A-Z)</option>
                  </Field>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200 outline-none ${
                      showAdvanced || hasActiveFilters(values)
                        ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <FaFilter className="text-xs" />
                    <span>Advanced</span>
                    {showAdvanced ? (
                      <FaChevronUp className="text-xs" />
                    ) : (
                      <FaChevronDown className="text-xs" />
                    )}
                    {hasActiveFilters(values) && (
                      <span className="bg-green-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                        {(values.title ? 1 : 0) + (values.category ? 1 : 0)}
                      </span>
                    )}
                  </button>

                  {hasActiveFilters(values) && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors outline-none"
                    >
                      <FaRedo className="text-xs" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  showAdvanced
                    ? "max-h-96 opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <AdvancedFilter
                  values={values}
                  setFieldValue={setFieldValue}
                  clearFilter={clearFilter}
                />
              </div>
            </Form>
          </div>

          <ActiveFiltersDisplay
            values={values}
            sortOptions={sortOptions}
            clearFilter={clearFilter}
            setFieldValue={setFieldValue}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      )}
    </Formik>
  );
}
