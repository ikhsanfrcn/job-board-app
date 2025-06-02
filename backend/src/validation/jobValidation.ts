import * as yup from "yup";

export const createJobSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  city: yup.string().required("City is required"),
  category: yup.string().required("Category is required"),
  tags: yup
    .array()
    .of(yup.string().required("Each tag must be a string"))
    .min(1, "At least one tag is required")
    .required("Tags are required"),
  salaryStart: yup.string().nullable(),
  salaryEnd: yup.string().nullable(),
  deadline: yup
    .string()
    .required("Deadline is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Deadline must be in YYYY-MM-DD format"),
});


export const updateJobSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  city: yup.string().required("City is required"),
  category: yup.string().required("Category is required"),
  tags: yup
    .array()
    .of(yup.string().required("Each tag must be a string"))
    .min(1, "At least one tag is required")
    .required("Tags are required"),
  salaryStart: yup.string().nullable(),
  salaryEnd: yup.string().nullable(),
  deadline: yup
    .string()
    .required("Deadline is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Deadline must be in YYYY-MM-DD format"),
});
