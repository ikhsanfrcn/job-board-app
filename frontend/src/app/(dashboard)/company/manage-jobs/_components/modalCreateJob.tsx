/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { createJobSchema } from "@/schema/jobSchema";
import { IMJob } from "@/types/job";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  handleCreate: (newJob: IMJob) => void;
}

export default function ModalCreateJob({
  isOpen,
  onClose,
  handleCreate,
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

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">Create Job</h3>
        <Formik
          initialValues={{
            title: "",
            description: "",
            province: "",
            city: "",
            category: "",
            tags: "",
            salaryMin: "",
            salaryMax: "",
            deadline: "",
            isPublished: false,
          }}
          validationSchema={createJobSchema}
          onSubmit={(values, { resetForm }) => {
            const newJob: IMJob = {
              id: crypto.randomUUID(),
              title: values.title,
              description: values.description,
              city: values.city,
              category: values.category,
              tags: values.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== ""),
              salaryMin:
                values.salaryMin === "" ? null : Number(values.salaryMin),
              salaryMax:
                values.salaryMax === "" ? null : Number(values.salaryMax),
              deadline: values.deadline,
              isPublished: values.isPublished,
              createdAt: new Date().toISOString(),
              isTestActive: false,
            };
            handleCreate(newJob);
            resetForm();
            onClose();
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
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
                      provinces.find((p) => p.id === selectedId)?.name || "";
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
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
                >
                  Create
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}
