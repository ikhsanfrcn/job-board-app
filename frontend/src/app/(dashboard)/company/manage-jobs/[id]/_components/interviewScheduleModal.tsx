"use client";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { Fragment } from "react";

interface Props {
  applicationId: string;
  onClose: () => void;
  onSubmit: (data: {
    applicationId: string;
    date: string;
    time: string;
    location: string;
  }) => void;
}

const validationSchema = yup.object().shape({
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  location: yup.string().required("Location is required"),
});

export default function InterviewScheduleModal({
  applicationId,
  onClose,
  onSubmit,
}: Props) {
  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
      location: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, applicationId });
    },
  });

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full px-4 py-8 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">
                  Schedule Interview
                </Dialog.Title>

                <form onSubmit={formik.handleSubmit} className="mt-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full border p-2 rounded"
                    />
                    {formik.touched.date && formik.errors.date && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.date}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formik.values.time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full border p-2 rounded"
                    />
                    {formik.touched.time && formik.errors.time && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.time}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="e.g. Zoom, Google Meet, Office"
                      className="w-full border p-2 rounded"
                    />
                    {formik.touched.location && formik.errors.location && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.location}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm bg-gray-300 hover:bg-gray-400 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
