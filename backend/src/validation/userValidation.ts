import * as yup from "yup";

export const updateUserSchema = yup.object({
  username: yup.string().optional(),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  gender: yup
    .string()
    .oneOf(["Male", "Female", "PreferNotToSay"])
    .optional(),
  dob: yup
    .string()
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "dob must be in YYYY-MM-DD format"),
  education: yup.string().optional(),
  country: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  zipCode: yup.string().optional(),
  regionNumber: yup.string().optional(),
  phoneNumber: yup.string().optional(),
});
