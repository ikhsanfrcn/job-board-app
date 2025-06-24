"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";

const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Current password required"),
  newPassword: Yup.string()
    .min(8, "The new password must be at least 8 characters long")
    .required("New password required"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword")],
      "The new password must match the confirmation password"
    )
    .required("Password confirmation required"),
});

export const ChangePassword: React.FC = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (!token) return;

        setSubmitting(true);

        const response = await axios.patch(
          "/company/change-password",
          {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        resetForm();

        toast.success(response.data.message);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred while changing the password!";
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full max-w-sm mx-auto my-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Change Password
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            id="currentPassword"
            type="password"
            name="currentPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentPassword}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <div className="text-sm text-red-500 mt-1">
              {formik.errors.currentPassword}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            name="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="text-sm text-red-500 mt-1">
              {formik.errors.newPassword}
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-sm text-red-500 mt-1">
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {formik.isSubmitting ? "Processing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};
