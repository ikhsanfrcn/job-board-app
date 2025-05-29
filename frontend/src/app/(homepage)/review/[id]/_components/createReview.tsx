"use client";
import axios from "@/lib/axios";
import { ICompanyProfile } from "@/types/companyType";
import { AxiosError } from "axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IoEarth, IoStar } from "react-icons/io5";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import { VscCircleSlash } from "react-icons/vsc";
import SkeletonReview from "./skeletonReview";
import { ReviewSchema } from "@/schema/reviewSchema";
import { useSession } from "next-auth/react";

interface IProps {
  companyId: string;
}

export default function CreateReview({ companyId }: IProps) {
  const { data: user } = useSession();
  const accessToken = user?.accessToken;

  const [detail, setDetail] = useState<ICompanyProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchDetail = useCallback(async () => {
    if (!accessToken) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`/company/${companyId}`);
      setDetail(data.data);
    } catch (err) {
      console.error(err);
      setDetail(null);
    } finally {
      setLoading(false);
    }
  }, [companyId, accessToken]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const handleSubmit = async (values: any) => {
    if (!accessToken) return;
    setSubmitting(true);

    try {
      const { agreed, ...dataToSend } = values;

      const payload = {
        ...dataToSend,
        isCurrentEmployee: dataToSend.isCurrentEmployee === "current",
      };

      await axios.post(`/reviews/${companyId}`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Create Success !");
      fetchDetail();
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Create Failed !");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !detail) return <SkeletonReview />;

  return (
    <div className="w-full p-4">
      <h4 className="text-2xl font-semibold mb-3">Rate a company</h4>
      <p className="text-sm mb-3">
        It only takes a minute! And your anonymous review will help other job
        seekers.
      </p>

      <Formik
        initialValues={{
          rating: 0,
          isCurrentEmployee: "",
          employmentStatus: "",
          jobTitle: "",
          headline: "",
          pros: "",
          cons: "",
          advice: "",
          agreed: false,
        }}
        validationSchema={ReviewSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="space-y-4">
            <div className="w-full flex items-center space-x-4">
              <div className="w-16 h-16 border rounded overflow-hidden">
                <Image
                  src={detail.logo}
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-full">
                <label className="text-xs">Company Name*</label>
                <input
                  type="text"
                  value={detail.name}
                  readOnly
                  className="w-full border border-gray-300 bg-gray rounded-lg px-4 py-2"
                />
              </div>
            </div>

            <div>
              <label className="text-xs">Overall Rating*</label>
              <div className="flex space-x-1 mt-1">
                {[1, 2, 3, 4, 5].map((i) => {
                  const filled = i <= (hoverRating || values.rating);
                  return (
                    <IoStar
                      key={i}
                      className={`text-4xl cursor-pointer transition-colors duration-200 ${
                        filled ? "text-green-600" : "text-gray-300"
                      }`}
                      onClick={() => setFieldValue("rating", i)}
                      onMouseEnter={() => setHoverRating(i)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  );
                })}
              </div>
              {errors.rating && touched.rating && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <VscCircleSlash className="text-base" />
                  {errors.rating}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs">
                Are you a current or former employee?*
              </label>
              <div className="flex gap-4 mt-1">
                {["current", "former"].map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-1 font-semibold text-lg cursor-pointer"
                  >
                    <Field
                      type="radio"
                      name="isCurrentEmployee"
                      value={status} // kirim string "current" atau "former"
                    />
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </label>
                ))}
              </div>
              {errors.isCurrentEmployee && touched.isCurrentEmployee && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <VscCircleSlash className="text-base" />
                  {errors.isCurrentEmployee}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs">Employment Status*</label>
              <Field
                as="select"
                name="employmentStatus"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="">Select status</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="intern">Intern</option>
                <option value="contract">Contract</option>
              </Field>
              {errors.employmentStatus && touched.employmentStatus && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <VscCircleSlash className="text-base" />
                  {errors.employmentStatus}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs">Job Title*</label>
              <Field
                name="jobTitle"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.jobTitle && touched.jobTitle && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <VscCircleSlash className="text-base" />
                  {errors.jobTitle}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs">Review Headline*</label>
              <Field
                name="headline"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.headline && touched.headline && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <VscCircleSlash className="text-base" />
                  {errors.headline}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs">Pros*</label>
              <Field
                as="textarea"
                name="pros"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.pros && touched.pros && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <VscCircleSlash className="text-base" />
                  {errors.pros}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs">Cons*</label>
              <Field
                as="textarea"
                name="cons"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.cons && touched.cons && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <VscCircleSlash className="text-base" />
                  {errors.cons}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs">Advice for management*</label>
              <Field
                as="textarea"
                name="advice"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.advice && touched.advice && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <VscCircleSlash className="text-base" />
                  {errors.advice}
                </div>
              )}
            </div>

            <div className="w-full flex items-center space-x-4 border border-gray-300 rounded-lg p-2">
              <div className="min-w-[24px]">
                <IoEarth className="text-xl sm:text-2xl" />
              </div>
              <p className="text-sm">
                All information contributed above will be visible to people who
                visit JobsDoors.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Field type="checkbox" name="agreed" />
              <label className="text-sm">
                I agree to the JobsDoors{" "}
                <span className="text-green-600">Terms of Use </span>and that
                this review is an honest and accurate account of my experience
                at my current or former employer.
              </label>
            </div>
            {errors.agreed && touched.agreed && (
              <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <VscCircleSlash className="text-base" />
                {errors.agreed}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="text-white text-sm px-4 py-2 bg-black rounded-lg hover:scale-105 transition duration-200 cursor-pointer disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit review"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
