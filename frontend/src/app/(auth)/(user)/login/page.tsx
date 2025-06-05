"use client";

import axios from "@/lib/axios";
import { LoginSchema } from "@/schema/authSchema";
import { ILoginForm } from "@/types/authType";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: ILoginForm = {
    username: "",
    password: "",
  };

  const onRegister = async (
    value: ILoginForm,
    action: FormikHelpers<ILoginForm>
  ) => {
    try {
      const { data } = await axios.post("/auth/login", value);
      const user = data.data;
      toast.success("Login Success !");
      action.resetForm();

      await signIn("credentials", {
        redirectTo: "/",
        id: user.id,
        name: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
        accessToken: data.access_token,
      });
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Login failed");
        console.log(err);
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
          Your Next Big Move Starts Here
        </h2>
        <p className="text-xl">Where Talent Meets Destiny</p>
      </div>
      <div className="relative flex flex-col items-center justify-center w-[480px] rounded-sm mx-auto pb-8 h-fit md:h-full z-10">
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={onRegister}
        >
          {(props: FormikProps<ILoginForm>) => {
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
                  <p className="text-sm mb-3">Login to access your account</p>
                  <div>
                    <label htmlFor="username" className="text-xs tracking-wide">
                      Username
                    </label>
                    <Field
                      name="username"
                      className="mb-1 px-2 py-2 border border-gray-400 rounded-md w-full focus:outline-none focus:ring-0 focus:border-sky-400 shadow-sm"
                    />
                    {touched.username && errors.username ? (
                      <div className="text-red-500 text-[12px]">
                        {errors.username}
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
                  href={"/password/forgot"}
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
        <div className="relative w-[77%] md:w-[80%] mt-5">
          <hr className="text-gray-400 w-full" />
          <label
            htmlFor="or"
            className="absolute -top-2.5 left-[47%] bg-white px-2 text-sm"
          >
            or
          </label>
        </div>
        <button
          onClick={() => signIn("google", {redirectTo: "/"})}
          className="flex justify-between items-center border w-[77%] md:w-[80%] my-5 py-2 px-3 font-semibold text-md text-shadow-sm rounded-sm cursor-pointer hover:border-green-600"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google<span>&nbsp;</span>
        </button>
        <div className="text-xs">
          Don&apos;t have an account?&nbsp;
          <Link
            href="/register"
            className="font-bold text-shadow-sm transition duration-150 hover:text-green-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
