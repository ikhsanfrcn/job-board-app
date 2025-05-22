import * as yup from "yup";

export const RegSchema = yup.object().shape({
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

export const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, "Min 6 character")
    .required("Username is required!"),
  password: yup
    .string()
    .min(6, "Min 6 character")
    .required("Password is required!"),
});

export const ForgotSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required!"),
});

export const ResetSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, "Min 6 character")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Password is required!"),
});

