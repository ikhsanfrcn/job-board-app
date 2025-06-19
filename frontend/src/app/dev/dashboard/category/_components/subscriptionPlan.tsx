/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Modal } from "@/components/atoms/Modal";
import { subscriptionSchema } from "@/schema/subscriptionSchema";
import { useFormik } from "formik";

interface PlanFormModalProps {
  isEdit: boolean;
  isOpen: boolean;
  initialValues: any;
  onClose: () => void;
  onSubmit: (values: any, resetForm: () => void) => void;
}

export const PlanFormModal = ({
  isEdit,
  isOpen,
  initialValues,
  onClose,
  onSubmit,
}: PlanFormModalProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema: subscriptionSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => onSubmit(values, resetForm),
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Subscription Plan" : "Create Subscription Plan"}
      size="md"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {["name", "type", "price", "features"].map((field) => (
          <div key={field}>
            {field === "features" ? (
              <textarea
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full p-2 border rounded"
                rows={4}
              />
            ) : (
              <input
                name={field}
                type={field === "price" ? "number" : "text"}
                value={formik.values[field]}
                onChange={formik.handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full p-2 border rounded"
              />
            )}
            {formik.touched[field] && formik.errors[field] && (
              <p className="text-red-500 text-sm">
                {typeof formik.errors[field] === "string"
                  ? formik.errors[field]
                  : ""}
              </p>
            )}
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
              ? "Update Plan"
              : "Create Plan"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
