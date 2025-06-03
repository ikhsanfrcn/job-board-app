/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IMJob } from "@/types/job";
import { Dialog } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { createJobSchema } from "@/schema/jobSchema";

interface IProps {
  editJob: IMJob | null;
  setEditJob: React.Dispatch<React.SetStateAction<IMJob | null>>;
  handleEditSave: (updatedJob: IMJob) => void;
}

export default function ModalEditJob({
  editJob,
  setEditJob,
  handleEditSave,
}: IProps) {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      setProvinces(response.data);
    } catch (error) {
      console.error("Failed to fetch provinces:", error);
    }
  };

  const fetchCities = async (provinceId: string) => {
    try {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      );
      setCities(response.data);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvinceId) {
      fetchCities(selectedProvinceId);
    } else {
      setCities([]);
    }
  }, [selectedProvinceId]);

  if (!editJob) return null;

  return (
    <Dialog
      open={!!editJob}
      onClose={() => setEditJob(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">Edit Job</h3>
        <Formik
          initialValues={{
            title: editJob.title,
            description: editJob.description,
            province: "", // optional
            city: editJob.city,
            category: editJob.category,
            tags: editJob.tags.join(", "),
            salaryMin: editJob.salaryMin,
            salaryMax: editJob.salaryMax,
            deadline: editJob.deadline,
            isPublished: editJob.isPublished,
          }}
          validationSchema={createJobSchema}
          onSubmit={(values) => {
            const updatedJob: IMJob = {
              ...editJob,
              title: values.title,
              description: values.description,
              city: values.city,
              category: values.category,
              tags: values.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
              salaryMin: values.salaryMin,
              salaryMax: values.salaryMax,
              deadline: values.deadline,
              isPublished: values.isPublished,
            };

            handleEditSave(updatedJob);
            setEditJob(null);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="title"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Job Title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  as="select"
                  name="province"
                  className="w-full border px-3 py-2 rounded"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const selectedId = e.target.value;
                    const selectedName =
                      provinces.find((p) => p.id === selectedId)?.id || "";
                    setFieldValue("province", selectedName);
                    setFieldValue("city", "");
                    setSelectedProvinceId(selectedId);
                  }}
                >
                  <option value="">Select Province</option>
                  {provinces.map((prov: any) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="province"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  as="select"
                  name="city"
                  className="w-full border px-3 py-2 rounded"
                  disabled={!cities.length}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFieldValue("city", e.target.value)
                  }
                  value={values.city}
                >
                  <option value="">Select City</option>
                  {cities.map((city: any) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  name="category"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Category"
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  name="tags"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Tags (comma separated)"
                />
                <ErrorMessage
                  name="tags"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  name="salaryMin"
                  type="number"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Salary Start"
                />
                <ErrorMessage
                  name="salaryMin"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  name="salaryMax"
                  type="number"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Salary End"
                />
                <ErrorMessage
                  name="salaryMax"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  name="deadline"
                  type="date"
                  className="w-full border px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="deadline"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <Field type="checkbox" name="isPublished" />
                <label htmlFor="isPublished" className="text-sm">
                  Published
                </label>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditJob(null)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}
