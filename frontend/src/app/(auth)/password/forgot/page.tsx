/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import Link from "next/link";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "react-toastify";
import * as yup from "yup";

const ForgotSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required!"),
});

interface IForgotForm {
  email: string;
}

export default function Page() {

  const initialValues: IForgotForm = {
    email: "",
  };

  const onForgot = async (
    value: IForgotForm,
    action: FormikHelpers<IForgotForm>
  ) => {
    try {
      await axios.post("/password/request-reset", {
        email: value.email,
      });

      toast.success("Reset link has been sent to your email");
      action.setSubmitting(false);
    } catch (err) {
      const error = err as AxiosError;
      const msg =
        typeof error.response?.data === "object" &&
        error.response?.data !== null &&
        "message" in error.response.data
          ? (error.response.data as any).message
          : "Failed to send reset email";

      toast.error(msg);
      action.setSubmitting(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen">
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
      <div className="relative flex flex-col items-center justify-center w-[480px] rounded-sm mx-auto pb-8 h-fit md:h-full z-10">
        <Formik
          initialValues={initialValues}
          validationSchema={ForgotSchema}
          onSubmit={onForgot}
        >
          {(props: FormikProps<IForgotForm>) => {
            const { touched, errors, isSubmitting } = props;
            return (
              <Form
                className="container w-[90%] md:w-[80%] px-8 md:px-0"
                autoComplete="off"
              >
                <div>
                  <h2 className="text-3xl text-shadow-sm font-bold text-center my-3">
                    Forgot Password
                  </h2>
                  <p className="text-sm mb-6 text-center">
                    Enter your email address to reset the password
                  </p>
                </div>
                <div className="relative">
                  <label htmlFor="email" className="text-xs tracking-wide">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="mb-1 pl-8 pr-2 py-2 border border-gray-400 rounded-sm w-full focus:outline-none focus:ring-0 focus:border-sky-400 shadow-sm"
                    placeholder="Enter your email"
                  />
                  <div className="absolute left-2 top-9">
                    <MdOutlineEmail className="text-lg text-gray-500" />
                  </div>
                  {touched.email && errors.email ? (
                    <div className="text-red-500 text-[12px]">
                      {errors.email}
                    </div>
                  ) : null}
                </div>
                <div className="mt-4 w-full">
                  <button
                    className="font-bold py-2 px-2 rounded-sm bg-black-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-md border w-full cursor-pointer hover:bg-green-600 hover:text-white transition duration-300 text-shadow-sm"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Loading" : "Reset Password"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className="my-5 text-xs">
          Remember your password?&nbsp;
          <Link
            href="/login"
            className="font-bold text-shadow-sm transition duration-150 hover:text-green-600"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
