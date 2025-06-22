"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { FaSearch, FaRedo } from "react-icons/fa";

export default function JobFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

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
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values }) => (
        <div className="flex flex-col gap-4 mb-6">
          <Form className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="flex flex-col gap-2 w-full md:flex-row md:gap-4">
              <div className="flex-1">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Title
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. UI Designer"
                  className="w-32 text-sm border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <Field
                  id="category"
                  name="category"
                  type="text"
                  placeholder="e.g. Design"
                  className="w-32 text-sm border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="sortBy"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sort By
                </label>
                <Field
                  as="select"
                  id="sortBy"
                  name="sortBy"
                  className="w-full text-sm border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="sortOrder"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Order
                </label>
                <Field
                  as="select"
                  id="sortOrder"
                  name="sortOrder"
                  className="w-full text-sm border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </Field>
              </div>
            </div>

            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                type="submit"
                className="w-full text-sm flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                <FaSearch />
                <span>Apply</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full text-sm flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
              >
                <FaRedo />
                <span>Reset</span>
              </button>
            </div>
          </Form>

          {(values.title || values.category) && (
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border-l-4 border-green-400">
              <span className="font-medium">Active filters:</span>
              {values.title && (
                <span className="ml-2 bg-green-100 px-2 py-1 rounded">
                  Title: {values.title}
                </span>
              )}
              {values.category && (
                <span className="ml-2 bg-green-100 px-2 py-1 rounded">
                  Category: {values.category}
                </span>
              )}
              <span className="ml-4 text-gray-500">
                | Sorted by{" "}
                {sortOptions.find((o) => o.value === values.sortBy)?.label} (
                {values.sortOrder === "asc" ? "A-Z" : "Z-A"})
              </span>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
}
