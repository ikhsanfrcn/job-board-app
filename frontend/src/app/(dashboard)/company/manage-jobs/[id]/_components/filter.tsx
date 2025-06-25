"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { FaRedo, FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import ActiveFilterDisplay from "./activeFilterDisplay";
import AdvancedFilter from "./advancedFilter";
import { IFilterApplicants } from "@/types/applicationType";

interface Props {
  jobId: string;
  statusOptions: string[];
}

const sortOptions: { value: IFilterApplicants["sortBy"]; label: string }[] = [
  { value: "createdAt", label: "Applied At" },
  { value: "status", label: "Status" },
  { value: "expectedSalary", label: "Expected Salary" },
  { value: "user.firstName", label: "First Name" },
  { value: "user.education", label: "Education" },
];

export default function Filter({ jobId, statusOptions }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const initialValues: IFilterApplicants = {
    status: searchParams.get("status") || "",
    userFirstName: searchParams.get("userFirstName") || "",
    usereducation: searchParams.get("usereducation") || "",
    expectedSalary: searchParams.get("expectedSalary") || "",
    age: searchParams.get("age") || "",
    sortBy:
      (searchParams.get("sortBy") as IFilterApplicants["sortBy"]) || "createdAt",
    sortOrder:
      (searchParams.get("sortOrder") as IFilterApplicants["sortOrder"]) || "asc",
  };

  const handleSubmit = (values: IFilterApplicants) => {
    const params = new URLSearchParams();

    if (values.status) params.set("status", values.status);
    if (values.userFirstName) params.set("userFirstName", values.userFirstName);
    if (values.usereducation) params.set("usereducation", values.usereducation);
    if (values.expectedSalary) params.set("expectedSalary", values.expectedSalary);
    if (values.age) params.set("age", values.age);

    if (values.sortBy) params.set("sortBy", values.sortBy);
    if (values.sortOrder) params.set("sortOrder", values.sortOrder);

    params.set("page", "1");

    router.push(`/company/manage-jobs/${jobId}?${params.toString()}`);
  };

  const handleReset = () => {
    router.push(`/company/manage-jobs/${jobId}?page=1&sortBy=createdAt&sortOrder=asc`);
    setShowAdvanced(false);
  };

  const clearFilter = (
    field: keyof IFilterApplicants,
    values: IFilterApplicants,
    setFieldValue: (field: keyof IFilterApplicants, value: string) => void
  ) => {
    setFieldValue(field, "");
    const newValues = { ...values, [field]: "" };
    handleSubmit(newValues);
  };

  const hasActiveFilters = (values: IFilterApplicants): boolean => {
    return (
      !!values.status ||
      !!values.userFirstName ||
      !!values.usereducation ||
      !!values.expectedSalary ||
      !!values.age
    );
  };

  const getActiveFiltersCount = (values: IFilterApplicants): number => {
    return [
      values.status,
      values.userFirstName,
      values.usereducation,
      values.expectedSalary,
      values.age,
    ].filter(Boolean).length;
  };

  return (
    <Formik<IFilterApplicants>
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
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setFieldValue("sortBy", e.target.value);
                      handleSubmit({ ...values, sortBy: e.target.value as IFilterApplicants["sortBy"] });
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
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setFieldValue("sortOrder", e.target.value);
                      handleSubmit({ ...values, sortOrder: e.target.value as IFilterApplicants["sortOrder"] });
                    }}
                  >
                    <option value="asc">Ascending (A-Z)</option>
                    <option value="desc">Descending (Z-A)</option>
                  </Field>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200 ${
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
                        {getActiveFiltersCount(values)}
                      </span>
                    )}
                  </button>

                  {hasActiveFilters(values) && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <FaRedo className="text-xs" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  showAdvanced ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <AdvancedFilter
                  values={values}
                  setFieldValue={setFieldValue}
                  statusOptions={statusOptions}
                  clearFilter={clearFilter}
                />
              </div>
            </Form>
          </div>

          {hasActiveFilters(values) && (
            <ActiveFilterDisplay
              values={values}
              clearFilter={clearFilter}
              setFieldValue={setFieldValue}
              sortOptions={sortOptions}
            />
          )}
        </div>
      )}
    </Formik>
  );
}
