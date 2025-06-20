import * as yup from "yup";

export const createJobSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  province: yup.string().required("Province is required"),
  city: yup.string().required("City is required"),
  category: yup.string().required("Category is required"),
  employmentStatus: yup
    .mixed<
      | "FULLTIME"
      | "PARTTIME"
      | "CONTRACT"
      | "FREELANCE"
      | "SELFEMPLOYED"
      | "INTERN"
      | "SEASONAL"
    >()
    .oneOf(
      [
        "FULLTIME",
        "PARTTIME",
        "CONTRACT",
        "FREELANCE",
        "SELFEMPLOYED",
        "INTERN",
        "SEASONAL",
      ],
      "Invalid employment type"
    )
    .required("Employment status is required"),
  worksite: yup
    .mixed<"ONSITE" | "HYBRID" | "REMOTE">()
    .oneOf(["ONSITE", "HYBRID", "REMOTE"], "Invalid worksite type")
    .required("Worksite type is required"),
  tags: yup
    .array()
    .of(yup.string().required("Each tag must be a string"))
    .min(1, "At least one tag is required")
    .required("Tags are required"),
  salaryMin: yup.number().nullable(),
  salaryMax: yup.number().nullable(),
  deadline: yup
    .string()
    .required("Deadline is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Deadline must be in YYYY-MM-DD format"),
});

export const updateJobSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  province: yup.string().required("Province is required"),
  city: yup.string().required("City is required"),
  category: yup.string().required("Category is required"),
  employmentStatus: yup
    .mixed<
      | "FULLTIME"
      | "PARTTIME"
      | "CONTRACT"
      | "FREELANCE"
      | "SELFEMPLOYED"
      | "INTERN"
      | "SEASONAL"
    >()
    .oneOf(
      [
        "FULLTIME",
        "PARTTIME",
        "CONTRACT",
        "FREELANCE",
        "SELFEMPLOYED",
        "INTERN",
        "SEASONAL",
      ],
      "Invalid employment type"
    )
    .required("Employment status is required"),
  worksite: yup
    .mixed<"ONSITE" | "HYBRID" | "REMOTE">()
    .oneOf(["ONSITE", "HYBRID", "REMOTE"], "Invalid worksite type")
    .required("Worksite type is required"),
  tags: yup
    .array()
    .of(yup.string().required("Each tag must be a string"))
    .min(1, "At least one tag is required")
    .required("Tags are required"),
  salaryMin: yup.number().nullable(),
  salaryMax: yup.number().nullable(),
  deadline: yup
    .string()
    .required("Deadline is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Deadline must be in YYYY-MM-DD format"),
  isPublished: yup.boolean().required("Publish status is required"),
});
