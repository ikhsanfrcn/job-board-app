"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { FaSearch, FaRedo } from "react-icons/fa";
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
  };

  const handleSubmit = (values: typeof initialValues) => {
    const params = new URLSearchParams();
    if (values.status) params.set("status", values.status);
    if (values.userFirstName) params.set("userFirstName", values.userFirstName);
    if (values.usereducation) params.set("usereducation", values.usereducation);
    if (values.expectedSalary)
      params.set("expectedSalary", values.expectedSalary);
    params.set("page", "1");
    router.push(`/company/manage-jobs/${jobId}?${params.toString()}`);
  };

  const handleReset = () => {
    router.push(`/company/manage-jobs/${jobId}?page=1`);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between mb-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
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

            {/* Expected Salary */}
            <div className="flex flex-col gap-1">
              <label htmlFor="expectedSalary" className="text-sm font-medium">
                Expected Salary
              </label>
              <FormatCurrencyInput
                name="expectedSalary"
                className="border p-2 rounded w-full text-sm"
                placeholder="Expected Salary"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-2 md:mt-0 text-sm">
            <button
              type="submit"
              className="w-full flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm"
            >
              <FaSearch />
              <span>Apply</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition text-sm"
            >
              <FaRedo />
              <span>Reset</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
