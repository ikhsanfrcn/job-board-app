import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Field, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Modal } from "@/components/atoms/Modal";

interface Industry {
  id: string;
  name: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (industry: Industry) => void;
}

export const IndustrySelectorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [filteredIndustries, setFilteredIndustries] = useState<Industry[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const fetchIndustries = async () => {
    try {
      const { data } = await axios.get("/industries");
      setIndustries(data);
      setFilteredIndustries(data);
    } catch (err) {
      console.error("Failed to fetch industries", err);
    }
  };

  useEffect(() => {
    if (isOpen) fetchIndustries();
  }, [isOpen]);

  const handleSearch = (term: string) => {
    const lowerTerm = term.toLowerCase();
    setFilteredIndustries(
      industries.filter((ind) => ind.name.toLowerCase().includes(lowerTerm))
    );
  };

  const handleCreateIndustry = async (
    values: { name: string },
    actions: FormikHelpers<{ name: string }>
  ) => {
    try {
      const { data } = await axios.post("/industries/create", values);
      setIndustries((prev) => [...prev, data]);
      setFilteredIndustries((prev) => [...prev, data]);
      onSelect(data);
      actions.resetForm();
      setIsCreating(false);
      onClose();
    } catch (err) {
      console.error("Failed to create industry", err);
      actions.setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Industry">
      {!isCreating ? (
        <>
          <input
            type="text"
            placeholder="Search industry..."
            className="mb-3 w-full px-2 py-1 border rounded"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="max-h-[200px] overflow-y-auto">
            {filteredIndustries.map((industry, index) => (
              <div
                key={index}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSelect(industry);
                  onClose();
                }}
              >
                {industry.name}
              </div>
            ))}
          </div>
          <button
            className="mt-4 text-blue-600 hover:underline text-sm cursor-pointer"
            onClick={() => setIsCreating(true)}
          >
            + Create new industry
          </button>
        </>
      ) : (
        <Formik
          initialValues={{ name: "" }}
          validationSchema={yup.object().shape({
            name: yup.string().required("Industry name is required!"),
          })}
          onSubmit={handleCreateIndustry}
        >
          {({ touched, errors, isSubmitting, handleSubmit }) => (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-xs">
                  Industry Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="mb-1 px-2 py-2 border border-gray-400 rounded-sm w-full focus:outline-none focus:ring-0 focus:border-sky-400 shadow-sm"
                />
                {touched.name && errors.name && (
                  <div className="text-red-500 text-xs">{errors.name}</div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="text-sm text-gray-500 hover:text-red-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="text-black border px-4 py-2 rounded-md cursor-pointer hover:bg-green-600 hover:text-white transition duration-300 text-shadow-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Industry"}
                </button>
              </div>
            </div>
          )}
        </Formik>
      )}
    </Modal>
  );
};
