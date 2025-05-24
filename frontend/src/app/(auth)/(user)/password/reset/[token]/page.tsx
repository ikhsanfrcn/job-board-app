"use client";

import axios from "@/lib/axios";
import { ResetSchema } from "@/schema/authSchema";
import { IResetForm } from "@/types/authType";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token;

  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetFailed, setResetFailed] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const initialValues: IResetForm = {
    newPassword: "",
  };

  const onReset = async (
    value: IResetForm,
    action: FormikHelpers<IResetForm>
  ) => {
    try {
      await axios.patch("/auth/password-reset", value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      action.setSubmitting(false);
      setResetSuccess(true);
    } catch (err) {
      const error = err as AxiosError;
      const msg =
        typeof error.response?.data === "object" &&
        error.response?.data !== null &&
        "message" in error.response.data
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? (error.response.data as any).message
          : "Failed to reset password";

      setErrorMessage(msg);
      setResetFailed(true);
      action.setSubmitting(false);
    }
  };

  useEffect(() => {
  if (resetSuccess) {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }
}, [resetSuccess]);

useEffect(() => {
  if (resetSuccess && countdown <= 0) {
    router.push("/login");
  }
}, [countdown, resetSuccess, router]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen bg-white">
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

        {resetSuccess ? (
          <div className="text-center p-8 bg-green-50 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Password Reset Successful!
            </h2>
            <p className="text-md text-gray-700">
              Redirecting to login page in <strong>{countdown}</strong> seconds...
            </p>
          </div>

        ) : resetFailed ? (
          <div className="text-center p-8 bg-red-50 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-red-700 mb-4">
              Password Reset Failed
            </h2>
            <p className="text-md text-gray-700 mb-6">
              {errorMessage}
            </p>
            <button
              onClick={() => router.push("/")}
              className="py-2 px-4 bg-red-600 text-white font-semibold rounded-sm hover:bg-red-700 transition cursor-pointer"
            >
              Go to Home Page
            </button>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={ResetSchema}
            onSubmit={onReset}
          >
            {(props: FormikProps<IResetForm>) => {
              const { touched, errors, isSubmitting } = props;
              return (
                <Form className="container w-[90%] md:w-[80%] px-8 md:px-0" autoComplete="off">
                  <div>
                    <h2 className="text-3xl text-shadow-sm font-bold text-center my-3">
                      Reset Password
                    </h2>
                    <p className="text-sm mb-6 text-center">
                      Enter your new password below.
                    </p>
                  </div>
                  <div className="relative">
                    <label htmlFor="newPassword" className="text-xs tracking-wide">
                      New Password
                    </label>
                    <Field
                      name="newPassword"
                      type="password"
                      className="mb-1 pl-2 pr-2 py-2 border border-gray-400 rounded-sm w-full focus:outline-none focus:ring-0 focus:border-sky-400 shadow-sm"
                      placeholder="Enter new password"
                    />
                    {touched.newPassword && errors.newPassword ? (
                      <div className="text-red-500 text-[12px]">
                        {errors.newPassword}
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
        )}
      </div>
    </div>
  );
}
