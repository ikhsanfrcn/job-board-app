"use client";

import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import * as yup from "yup";

const RegSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, "Min 6 character")
    .required("Username is required!"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required!"),
  password: yup
    .string()
    .min(6, "Min 6 character")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Password is required!"),
});

interface IRegForm {
  username: string;
  email: string;
  password: string;
}

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const initialValues: IRegForm = {
    username: "",
    email: "",
    password: "",
  };

  const onRegister = async (
    value: IRegForm,
    action: FormikHelpers<IRegForm>
  ) => {
    try {
      const { data } = await axios.post("/users/register", value);
      action.resetForm();
      toast.success(data.message);
      router.push("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message);
        console.log(err);
      } else {
        toast.error("Register Failed !");
        console.log(err);
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
      <div className="relative flex flex-col justify-center items-center w-full md:w-[60%] p-4 h-fit md:h-full text-center text-shadow-md z-10">
        <h2 className="text-5xl font-bold my-3">
          Your Next Big Move Starts Here
        </h2>
        <p className="text-xl">Where Talent Meets Destiny</p>
      </div>
      <div className="relative flex flex-col items-center justify-center w-[480px] rounded-sm mx-auto pb-8 h-fit md:h-full z-10">
        <Formik
          initialValues={initialValues}
          validationSchema={RegSchema}
          onSubmit={onRegister}
        >
          {(props: FormikProps<IRegForm>) => {
            const { touched, errors, isSubmitting } = props;
            return (
              <Form
                className="container w-[90%] md:w-[80%] px-8 md:px-0"
                autoComplete="off"
              >
                <div>
                  <h2 className="text-3xl text-shadow-sm font-bold">
                    Get Hired Today
                  </h2>
                  <p className="text-sm mb-3">Create your account</p>
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
          Already have an account?&nbsp;
          <Link
            href="/login"
            className="font-bold text-shadow-sm transition duration-150 hover:text-green-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
