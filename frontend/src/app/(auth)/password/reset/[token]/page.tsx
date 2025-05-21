/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as yup from "yup";

const ResetSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, "Min 6 character")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Password is required!"),
});

interface IResetForm {
  newPassword: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token;

  const initialValues: IResetForm = {
    newPassword: "",
  };

  const onReset = async (
    value: IResetForm,
    action: FormikHelpers<IResetForm>
  ) => {
    try {
      await axios.patch("/password/reset", value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Password has been reset. You can now log in.");
      action.setSubmitting(false);

      setTimeout(() => router.push("/login"), 3000);
    } catch (err) {
      const error = err as AxiosError;
      const msg =
        typeof error.response?.data === "object" &&
        error.response?.data !== null &&
        "message" in error.response.data
          ? (error.response.data as any).message
          : "Failed to reset password";

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
          validationSchema={ResetSchema}
          onSubmit={onReset}
        >
          {(props: FormikProps<IResetForm>) => {
            const { touched, errors, isSubmitting } = props;
            return (
              <Form
                className="container w-[90%] md:w-[80%] px-8 md:px-0"
                autoComplete="off"
              >
                <div>
                  <h2 className="text-3xl text-shadow-sm font-bold text-center my-3">
                    Reset Password
                  </h2>
                  <p className="text-sm mb-6 text-center">
                    Enter your new password below.
                  </p>
                </div>
                <div className="relative">
                  <label
                    htmlFor="newPassword"
                    className="text-xs tracking-wide"
                  >
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
      </div>
    </div>
  );
}
