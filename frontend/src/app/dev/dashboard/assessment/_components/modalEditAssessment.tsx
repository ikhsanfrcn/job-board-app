"use client";

import axios from "@/lib/axios";
import { IAssessment } from "@/types/assessment";
import { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface EditAssessmentProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: IAssessment | null;
  onSuccess: () => void;
}

export default function ModalEditAssessment({
  isOpen,
  onClose,
  assessment,
  onSuccess,
}: EditAssessmentProps) {
  if (!isOpen || !assessment) return null;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>("");

  const initialValues = {
    title: assessment.title || "",
    description: assessment.description || "",
    category: assessment.category || "",
    questions:
      assessment.questions && assessment.questions.length > 0
        ? assessment.questions.map((q) => ({
            question: q.question || "",
            options:
              q.options && q.options.length === 4
                ? q.options
                : ["", "", "", ""],
            answer: q.answer || "",
          }))
        : Array(25).fill({
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
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("questions", JSON.stringify(values.questions));
      if (selectedImage) {
        formData.append("badgeImage", selectedImage);
      }
      const { data } = await axios.put(
        `/assessment/${assessment.id}`,
        formData
      );
      toast.success(data.message || "Assessment updated successfully");
      onSuccess();
      onClose();
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || "Update failed");
        console.log(err);
      } else {
        toast.error("Update assessment failed!");
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
      setImageError("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4 font-sans">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Edit Skill Assessment</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full p-2 transition duration-200"
            >
              <VscChromeClose className="text-2xl" />
            </button>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
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
                  className="text-red-500 text-xs mt-1"
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
                  className="text-red-500 text-xs mt-1"
                />
                <label
                  className="text-gray-700 font-medium"
                  htmlFor="badgeImage"
                >
                  Badge Image
                </label>
                <div className="flex gap-3 items-center">
                  <div className="border border-gray-300 rounded-md p-1 h-12 w-12">
                    {imageError && (
                      <p className="text-red-500 text-xs mt-1">{imageError}</p>
                    )}
                    {!selectedImage && assessment.badgeImage && (
                      <Image
                        src={assessment.badgeImage}
                        width={100}
                        height={100}
                        alt="Current Badge"
                        className="rounded-md w-full h-full"
                      />
                    )}
                    {selectedImage && (
                      <Image
                        src={URL.createObjectURL(selectedImage)}
                        width={100}
                        height={100}
                        alt="Selected Preview"
                        className="rounded-md w-full h-auto"
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
                        type="button"
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
                    type="button"
                    onClick={onClose}
                    className="border border-gray-300 flex-1 py-3 bg-white rounded-lg text-sm font-medium hover:bg-gray-100 transition duration-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="border border-gray-300 flex-1 py-3 bg-white rounded-lg text-sm font-medium hover:text-white hover:bg-green-600 transition duration-200 cursor-pointer"
                  >
                    Update Assessment
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
