"use client";

import axios from "@/lib/axios";
import { LoginDevSchema } from "@/schema/authSchema";
import { ILoginDev } from "@/types/authType";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: ILoginDev = {
    email: "",
    password: "",
  };

  const onLogin = async (
    value: ILoginDev,
    action: FormikHelpers<ILoginDev>
  ) => {
    try {
      const { data } = await axios.post("/dev/login", value);
      const dev = data.data;
      toast.success("Login Success !");
      action.resetForm();

      await signIn("credentials", {
        redirectTo: "/dev/dashboard",
        id: dev.id,
        name: dev.devname,
        email: dev.email,
        role: dev.role,
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
    <div className="relative h-screen max-w-screen">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/screen.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
        }}
      />
      <div className="relative flex flex-col items-center w-[480px] rounded-sm mx-auto pb-8 h-full z-10">
        <Formik
          initialValues={initialValues}
          validationSchema={LoginDevSchema}
          onSubmit={onLogin}
        >
          {(props: FormikProps<ILoginDev>) => {
            const { touched, errors, isSubmitting } = props;
            return (
              <Form
                className="container w-[90%] md:w-[80%] px-8 md:px-0"
                autoComplete="off"
              >
                <div>
                  <h2 className="text-3xl text-shadow-sm font-bold mb-7 mt-35">
                    Welcome Back Developer
                  </h2>
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
      </div>
    </div>
  );
}
