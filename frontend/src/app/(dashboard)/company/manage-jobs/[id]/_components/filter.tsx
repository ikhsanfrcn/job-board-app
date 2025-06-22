"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { FaSearch, FaRedo, FaSort } from "react-icons/fa";
import FormatCurrencyInput from "@/components/atoms/formatCurencyInput";

interface Props {
  jobId: string;
  statusOptions: string[];
}

export default function Filter({ jobId, statusOptions }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialValues = {
    status: searchParams.get("status") || "",
    userFirstName: searchParams.get("userFirstName") || "",
    usereducation: searchParams.get("usereducation") || "",
    expectedSalary: searchParams.get("expectedSalary") || "",
    age: searchParams.get("age") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "asc",
  };

  const sortOptions = [
    { value: "createdAt", label: "Applied At" },
    { value: "status", label: "Status" },
    { value: "expectedSalary", label: "Expected Salary" },
    { value: "user.firstName", label: "First Name" },
    { value: "user.education", label: "Education" },
  ];

  const handleSubmit = (values: typeof initialValues) => {
    const params = new URLSearchParams();

    if (values.status) params.set("status", values.status);
    if (values.userFirstName) params.set("userFirstName", values.userFirstName);
    if (values.usereducation) params.set("usereducation", values.usereducation);
    if (values.expectedSalary)
      params.set("expectedSalary", values.expectedSalary);
    if (values.age) params.set("age", values.age);

    if (values.sortBy) params.set("sortBy", values.sortBy);
    if (values.sortOrder) params.set("sortOrder", values.sortOrder);

    params.set("page", "1");
    router.push(`/company/manage-jobs/${jobId}?${params.toString()}`);
  };

  const handleReset = () => {
    router.push(
      `/company/manage-jobs/${jobId}?page=1&sortBy=createdAt&sortOrder=asc`
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-4 mb-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
            <div className="flex flex-col gap-1">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <Field
                as="select"
                id="status"
                name="status"
                className="border p-2 rounded w-full text-sm"
              >
                <option value="">All Status</option>
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Field>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="age" className="text-sm font-medium">
                Age (≤)
              </label>
              <Field
                id="age"
                name="age"
                type="number"
                min="1"
                placeholder="Max age"
                className="border p-2 rounded w-full text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="usereducation" className="text-sm font-medium">
                Education
              </label>
              <Field
                as="select"
                id="usereducation"
                name="usereducation"
                className="border p-2 rounded w-full text-sm"
              >
                <option value="">All Education</option>
                <option value="High School">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="Doctorate">Doctorate</option>
                <option value="Other">Other</option>
              </Field>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="userFirstName" className="text-sm font-medium">
                First Name
              </label>
              <Field
                id="userFirstName"
                name="userFirstName"
                type="text"
                placeholder="First Name"
                className="border p-2 rounded w-full text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="expectedSalary" className="text-sm font-medium">
                Expected Salary (≤)
              </label>
              <FormatCurrencyInput
                name="expectedSalary"
                className="border p-2 rounded w-full text-sm"
                placeholder="Max salary"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
            <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
              <div className="flex flex-col gap-1 w-full md:w-auto">
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
                  className="border p-2 rounded w-full md:w-48 text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="flex flex-col gap-1 w-full md:w-auto">
                <label htmlFor="sortOrder" className="text-sm font-medium mb-1">
                  Order
                </label>
                <Field
                  as="select"
                  id="sortOrder"
                  name="sortOrder"
                  className="border p-2 rounded w-full md:w-32 text-sm"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </Field>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <button
                type="submit"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition text-sm"
              >
                <FaSearch />
                <span>Apply</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition text-sm"
              >
                <FaRedo />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {(values.status ||
            values.userFirstName ||
            values.usereducation ||
            values.expectedSalary ||
            values.age) && (
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border-l-4 border-green-400">
              <span className="font-medium">Active filters:</span>
              {values.status && (
                <span className="ml-2 bg-green-100 px-2 py-1 rounded">
                  Status: {values.status}
                </span>
              )}
              {values.age && (
                <span className="ml-2 bg-green-100 px-2 py-1 rounded">
                  Age ≤ {values.age}
                </span>
              )}
              {values.usereducation && (
                <span className="ml-2 bg-green-100 px-2 py-1 rounded">
                  Education: {values.usereducation}
                </span>
              )}
              {values.userFirstName && (
                <span className="ml-2 bg-green-100 px-2 py-1 rounded">
                  Name: {values.userFirstName}
                </span>
              )}
              {values.expectedSalary && (
                <span className="ml-2 bg-green-100 px-2 py-1 rounded">
                  Salary ≤{" "}
                  {Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(Number(values.expectedSalary))}
                </span>
              )}
              <span className="ml-4 text-gray-500">
                | Sorted by{" "}
                {sortOptions.find((o) => o.value === values.sortBy)?.label} (
                {values.sortOrder === "asc" ? "A-Z" : "Z-A"})
              </span>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
