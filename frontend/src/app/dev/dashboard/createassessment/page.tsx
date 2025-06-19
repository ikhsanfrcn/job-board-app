"use client";

import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>("");
  const router = useRouter();

  const initialValues = {
    title: "",
    description: "",
    category: "",
    questions: Array(25).fill({
      question: "",
      options: ["", "", "", ""],
      answer: "",
    }),
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
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
      if (!selectedImage) {
        setImageError("Badge image is required!");
        toast.error("Badge Image is required!");
        return;
      }
      setImageError("");
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("badgeImage", selectedImage);
      formData.append("questions", JSON.stringify(values.questions));
      const { data } = await axios.post("/assessment", formData);
      toast.success(data.message);
      router.push("/dev/dashboard/assessment");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
        console.log(err);
      } else {
        toast.error("Create skill assessment failed!");
        console.log(err);
      }
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const f = event.target.files?.[0];
    if (f) {
      setSelectedImage(f);
      setImageError("");
    } else {
      setSelectedImage(null);
      setImageError("Badge image is required");
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <nav className="text-sm text-gray-500">
            <span>🏠 / Dashboards / Create Assessment </span>
          </nav>
        </div>
        <div className="w-full mx-auto p-8 border border-gray-300 shadow-lg rounded-lg my-10 font-sans overflow-y-auto h-[70vh]">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Create Skill Assessment
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
                <Field
                  type="text"
                  name="category"
                  placeholder="Test Category"
                  className="border border-gray-300 rounded-sm p-3 w-full mt-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 mb-3"
                />
                <ErrorMessage
                  name="category"
                  component="p"
                  className="text-red-500 text-xs"
                />
                <label
                  className="text-gray-700 font-medium"
                  htmlFor="badgeImage"
                >
                  Badge Image
                </label>
                <div className="flex gap-3 items-center">
                  <div className="border border-gray-300 rounded-md p-1 h-12 w-12">
                    {!selectedImage && (
                      <p className="text-red-500 text-xs mt-1">{imageError}</p>
                    )}
                    {selectedImage && (
                      <Image
                        src={URL.createObjectURL(selectedImage)}
                        width={100}
                        height={100}
                        alt="Selected Preview"
                        className="rounded-md w-full h-full"
                      />
                    )}
                  </div>
                  <Field
                    type="file"
                    name="badgeImage"
                    className="border border-gray-300 rounded-sm p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    accept="image/png, image/jpeg, image/webp, image/svg"
                    onChange={handleImageChange}
                  />
                </div>
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
                    {q.options.map((_: string, optIndex: number) => (
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
                    </div>
                  </div>
                ))}
                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="border border-gray-300 flex-1 py-3 bg-white rounded-lg text-sm font-medium hover:text-white hover:bg-green-600 transition duration-200 cursor-pointer"
                  >
                    Save Test
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
