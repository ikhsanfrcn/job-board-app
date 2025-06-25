"use client";

import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { IndustrySelectorModal } from "./_components/IndustrySelector";
import { CompanyRegisterSchema } from "@/schema/companySchema";
import { ICompanyRegisterForm } from "@/types/companyType";
import EmailVerificationModal from "@/components/atoms/emailVerification";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isIndustryModalOpen, setIndustryModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const initialValues: ICompanyRegisterForm = {
    name: "",
    email: "",
    password: "",
    industryId: "",
  };

  const onRegister = async (
    value: ICompanyRegisterForm,
    action: FormikHelpers<ICompanyRegisterForm>
  ) => {
    try {
      await axios.post("/company/register", value);
      action.resetForm();
      setShowModal(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message);
      } else {
        toast.error("Register Failed !");
      }
    }
  };

  return (
    <div className="relative flex-row md:flex items-center justify-center h-screen w-screen">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/authlogo.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.05,
        }}
      />
      <div className="relative flex flex-col justify-center items-center w-full md:w-[60%] mt-20 md:mt-0 p-4 h-fit md:h-full text-center text-shadow-md z-10">
        <h2 className="text-5xl font-bold my-3">
          Step Into Your Future With Us
        </h2>
        <p className="text-xl">Find the Talent That Drives Success</p>
      </div>
      <div className="relative flex flex-col items-center justify-center w-[480px] rounded-sm mx-auto pb-8 h-fit md:h-full z-10">
        <Formik
          initialValues={initialValues}
          validationSchema={CompanyRegisterSchema}
          onSubmit={onRegister}
        >
          {(props: FormikProps<ICompanyRegisterForm>) => {
            const { touched, errors, isSubmitting, setFieldValue } = props;
            return (
              <Form
                className="container w-[90%] md:w-[80%] px-8 md:px-0"
                autoComplete="off"
              >
                <div>
                  <h2 className="text-3xl text-shadow-sm font-bold">
                    Start Hiring Today
                  </h2>
                  <p className="text-sm mb-3">Create your company account</p>
                  <div>
                    <label htmlFor="name" className="text-xs tracking-wide">
                      Name
                    </label>
                    <Field
                      name="name"
                      className="mb-1 px-2 py-2 border border-gray-400 rounded-md w-full focus:outline-none focus:ring-0 focus:border-sky-400 shadow-sm"
                    />
                    {touched.name && errors.name ? (
                      <div className="text-red-500 text-[12px]">
                        {errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="email" className="text-xs tracking-wide">
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="mb-1 px-2 py-2 border border-gray-400 rounded-sm w-full focus:outline-none focus:ring-0 focus:border-sky-400 shadow-sm"
                    />
                    {touched.email && errors.email ? (
                      <div className="text-red-500 text-[12px]">
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <label htmlFor="password" className="text-xs tracking-wide">
                      Password
                    </label>
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="mb-1 px-2 py-2 border border-gray-400 rounded-sm w-full focus:outline-none focus:ring-0 focus:border-sky-400 shadow-sm"
                    />
                    <button
                      type="button"
                      className="absolute right-5 top-11 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible size={20} />
                      ) : (
                        <AiFillEye size={20} />
                      )}
                    </button>
                  </div>
                  {touched.password && errors.password ? (
                    <div className="text-red-500 text-[12px]">
                      {errors.password}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label className="text-xs tracking-wide">Industry</label>
                  <div
                    onClick={() => setIndustryModalOpen(true)}
                    className="mb-1 px-2 py-2 border border-gray-400 rounded-sm w-full bg-white cursor-pointer"
                  >
                    {selectedIndustry?.name || "Select Industry"}
                  </div>
                  {touched.industryId && errors.industryId && (
                    <div className="text-red-500 text-[12px]">
                      {errors.industryId}
                    </div>
                  )}
                </div>
                <IndustrySelectorModal
                  isOpen={isIndustryModalOpen}
                  onClose={() => setIndustryModalOpen(false)}
                  onSelect={(industry) => {
                    setSelectedIndustry(industry);
                    setFieldValue("industryId", industry.id);
                    setIndustryModalOpen(false);
                  }}
                />

                <div className="mt-4 w-full">
                  <button
                    className="font-bold py-2 px-2 rounded-sm bg-black-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-md border w-full cursor-pointer hover:bg-green-600 hover:text-white transition duration-300 text-shadow-sm"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Loading" : "Register"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className="my-5 text-xs">
          Already have an company account?&nbsp;
          <Link
            href="/company/login"
            className="font-bold text-shadow-sm transition duration-150 hover:text-green-600"
          >
            Login
          </Link>
        </div>
      </div>

      <EmailVerificationModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          router.push("/login");
        }}
      />
    </div>
  );
}
