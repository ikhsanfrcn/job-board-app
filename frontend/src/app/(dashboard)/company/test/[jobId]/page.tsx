"use client";

import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function Page({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const router = useRouter();
  const { jobId } = React.use(params);

  const initialValues = {
    title: "",
    description: "",
    questions: [{ question: "", options: ["", "", "", ""], answer: "" }],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    questions: Yup.array().of(
      Yup.object({
        question: Yup.string().required("Question cannot be empty"),
        options: Yup.array().of(
          Yup.string().required("Option cannot be empty")
        ),
        answer: Yup.string().required("Correct answer cannot be empty"),
      })
    ),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const { data } = await axios.post("/test", { jobId, ...values });
      toast.success(data.message);
      router.push("/company/manage-jobs");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else {
        toast.error("Create test failed!");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 border border-gray-300 bg-white shadow-lg rounded-lg my-10 font-sans">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create Pre Selection Test
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Field
              type="text"
              name="title"
              placeholder="Test Title"
              className="border border-gray-300 rounded-sm p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <ErrorMessage
              name="title"
              component="p"
              className="text-red-500 text-xs mt-1"
            />

            <Field
              as="textarea"
              name="description"
              placeholder="Test Description"
              className="border border-gray-300 rounded-sm p-3 w-full mt-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <ErrorMessage
              name="description"
              component="p"
              className="text-red-500 text-xs"
            />

            {values.questions.map((q, index) => (
              <div
                key={index}
                className="mb-6 p-5 border mt-4 border-gray-300 rounded-sm shadow-md relative"
              >
                <Field
                  type="text"
                  name={`questions[${index}].question`}
                  className="border p-2 w-full border-gray-300 rounded-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder={`Question ${index + 1}`}
                />
                <ErrorMessage
                  name={`questions[${index}].question`}
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />

                <label className="block font-semibold mt-3 text-gray-700">
                  Options
                </label>
                {q.options.map((_, optIndex) => (
                  <div key={optIndex}>
                    <Field
                      type="text"
                      name={`questions[${index}].options[${optIndex}]`}
                      className="border border-gray-300 rounded-sm p-2 w-full mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      placeholder={`Option ${optIndex + 1}`}
                    />
                    <ErrorMessage
                      name={`questions[${index}].options[${optIndex}]`}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                ))}

                <label className="block font-semibold mt-3 text-gray-700">
                  Correct Answer
                </label>
                <Field
                  type="text"
                  name={`questions[${index}].answer`}
                  className="border border-gray-300 rounded-sm mt-2 p-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Correct Answer"
                />
                <ErrorMessage
                  name={`questions[${index}].answer`}
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />

                <div className="flex gap-4 mt-4 text-gray-700">
                  <button
                    className="border border-gray-300 flex-1 py-2 rounded-lg text-sm font-medium hover:bg-yellow-300 transition duration-200 cursor-pointer"
                    onClick={() =>
                      setFieldValue(`questions[${index}]`, {
                        question: "",
                        options: ["", "", "", ""],
                        answer: "",
                      })
                    }
                  >
                    Reset
                  </button>
                  {values.questions.length > 1 && (
                    <button
                      className="border border-gray-300 flex-1 py-2 hover:bg-red-500 hover:text-white rounded-lg text-sm font-medium transition duration-200 cursor-pointer"
                      onClick={() =>
                        setFieldValue(
                          "questions",
                          values.questions.filter(
                            (_, qIndex) => qIndex !== index
                          )
                        )
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-4 mt-6">
              <button
                className="border border-gray-300 flex-1 py-3 bg-white rounded-lg text-sm font-medium hover:text-white hover:bg-green-600 transition duration-200 cursor-pointer"
                onClick={() =>
                  setFieldValue("questions", [
                    ...values.questions,
                    { question: "", options: ["", "", "", ""], answer: "" },
                  ])
                }
              >
                Add question
              </button>
              <button
                type="submit"
                className="border border-gray-300 flex-1 py-3 bg-white rounded-lg text-sm font-medium hover:text-white hover:bg-green-600 transition duration-200 cursor-pointer"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
