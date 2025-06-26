"use client";

import axios from "@/lib/axios";
import { changeEmailSchema } from "@/schema/authSchema";
import { IEmailChange } from "@/types/authType";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChangePasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token;

  const [changeSuccess, setChangeSuccess] = useState(false);
  const [changeFailed, setChangeFailed] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const initialValues: IEmailChange = {
    newEmail: "",
  };

  const onChange = async (
    value: IEmailChange,
    action: FormikHelpers<IEmailChange>
  ) => {
    try {
      console.log(token);
      await axios.patch("/users/change-email", value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      

      action.setSubmitting(false);
      setChangeSuccess(true);
    } catch (err) {
      const error = err as AxiosError;
      const msg =
        typeof error.response?.data === "object" &&
        error.response?.data !== null &&
        "message" in error.response.data
          ? (error.response.data as any).message
          : "Failed to change email";

      setErrorMessage(msg);
      setChangeFailed(true);
      action.setSubmitting(false);
    }
  };

  useEffect(() => {
  if (changeSuccess) {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }
}, [changeSuccess]);

useEffect(() => {
  if (changeSuccess && countdown <= 0) {
    router.push("/login");
  }
}, [countdown, changeSuccess, router]);

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

        {changeSuccess ? (
          <div className="text-center p-8 bg-green-50 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Email Change Successful!
            </h2>
            <p className="text-md text-gray-700">
              Redirecting to login page in <strong>{countdown}</strong> seconds...
            </p>
          </div>

        ) : changeFailed ? (
          <div className="text-center p-8 bg-red-50 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-red-700 mb-4">
              Email Change Failed
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
            validationSchema={changeEmailSchema}
            onSubmit={onChange}
          >
            {(props: FormikProps<IEmailChange>) => {
              const { touched, errors, isSubmitting } = props;
              return (
                <Form className="container w-[90%] md:w-[80%] px-8 md:px-0" autoComplete="off">
                  <div>
                    <h2 className="text-3xl text-shadow-sm font-bold text-center my-3">
                      Change Email
                    </h2>
                    <p className="text-sm mb-6 text-center">
                      Enter your new email below.
                    </p>
                  </div>
                  <div className="relative">
                    <label htmlFor="newEmail" className="text-xs tracking-wide">
                      New Email
                    </label>
                    <Field
                      name="newEmail"
                      type="email"
                      className="mb-1 pl-2 pr-2 py-2 border border-gray-400 rounded-sm w-full focus:outline-none focus:ring-0 focus:border-sky-400 shadow-sm"
                      placeholder="Enter new email"
                    />
                    {touched.newEmail && errors.newEmail ? (
                      <div className="text-red-500 text-[12px]">
                        {errors.newEmail}
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-4 w-full">
                    <button
                      className="font-bold py-2 px-2 rounded-sm bg-black-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-md border w-full cursor-pointer hover:bg-green-600 hover:text-white transition duration-300 text-shadow-sm"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Loading" : "Change Email"}
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
