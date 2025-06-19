"use client";

import axios from "@/lib/axios";
import { CompanyLoginSchema } from "@/schema/companySchema";
import { ICompanyLoginForm } from "@/types/companyType";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: ICompanyLoginForm = {
    email: "",
    password: "",
  };

  const onRegister = async (
    value: ICompanyLoginForm,
    action: FormikHelpers<ICompanyLoginForm>
  ) => {
    try {
      const { data } = await axios.post("/company/login", value);
      const user = data.data;
      toast.success("Login Success !");
      action.resetForm();

      await signIn("credentials", {
        redirectTo: "/",
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
        accessToken: data.access_token,
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
        console.error(err);
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
          validationSchema={CompanyLoginSchema}
          onSubmit={onRegister}
        >
          {(props: FormikProps<ICompanyLoginForm>) => {
            const { touched, errors, isSubmitting } = props;
            return (
              <Form
                className="container w-[90%] md:w-[80%] px-8 md:px-0"
                autoComplete="off"
              >
                <div>
                  <h2 className="text-3xl text-shadow-sm font-bold">
                    Welcome Back
                  </h2>
                  <p className="text-sm mb-3">
                    Login to access your company account
                  </p>
                  <div>
                    <label htmlFor="email" className="text-xs tracking-wide">
                      Email
                    </label>
                    <Field
                      name="email"
                      className="mb-1 px-2 py-2 border border-gray-400 rounded-md w-full focus:outline-none focus:ring-0 focus:border-sky-400 shadow-sm"
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
                <Link
                  href={"/company/password/forgot"}
                  className="text-xs text-red-600 hover:text-red-500 tracking-wide"
                >
                  Forgot password?
                </Link>
                <div className="mt-4 w-full">
                  <button
                    className="font-bold py-2 px-2 rounded-sm bg-black-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-md border w-full cursor-pointer hover:bg-green-600 hover:text-white transition duration-300 text-shadow-sm"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Loading" : "Login"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>

        <div className="mt-5 text-xs">
          Don&apos;t have an company account?&nbsp;
          <Link
            href="/company/register"
            className="font-bold text-shadow-sm transition duration-150 hover:text-green-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
