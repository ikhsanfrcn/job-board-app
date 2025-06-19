import * as yup from "yup";

export const CompanyRegisterSchema = yup.object().shape({
  name: yup.string().min(6, "Min 6 character").required("Name is required!"),
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
  industryId: yup.string().required("Industry is required!"),
});

export const CompanyLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required!"),
  password: yup
    .string()
    .min(6, "Min 6 character")
    .required("Password is required!"),
});

export const CompanyResetSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, "Min 6 character")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Password is required!"),
});

export const CompanyForgotSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required!"),
});

export const companyProfileSchema = yup.object({
  name: yup.string().required("Name is required"),
  phoneNumber: yup.string().nullable(),
  address: yup.string().nullable(),
  country: yup.string().nullable(),
  state: yup.string().nullable(),
  city: yup.string().nullable(),
  zipCode: yup.string().nullable(),
  regionNumber: yup.string().nullable(),
  website: yup.string().url("Invalid URL").nullable(),
  about: yup.string().nullable(),
  latitude: yup.string().nullable(),
  longitude: yup.string().nullable(),
  logo: yup.string().nullable(),
  industryId: yup.string().required("Industry ID is required"),
});
