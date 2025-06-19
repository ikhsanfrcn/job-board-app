import * as Yup from "yup";

export const userProfileSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string()
    .oneOf(["Male", "Female", "PreferNotToSay"])
    .required("Gender is required"),
  dob: Yup.string().required("Date of birth is required"),
  education: Yup.string().required("Education is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.number().required("Zip code is required"),
  regionNumber: Yup.number().required("Region number is required"),
  phoneNumber: Yup.number().required("Phone number is required"),
});
