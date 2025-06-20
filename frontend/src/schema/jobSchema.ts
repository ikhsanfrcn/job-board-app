import * as yup from "yup";

export const createJobSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  province: yup.string().required("Province is required"),
  city: yup.string().required("City is required"),
  category: yup.string().required("Category is required"),
  employmentStatus: yup
    .string()
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
      "Invalid employment status"
    )
    .required("Employment status is required"),

  worksite: yup
    .string()
    .oneOf(["ONSITE", "HYBRID", "REMOTE"], "Invalid worksite type")
    .required("Worksite is required"),
  tags: yup
    .string()
    .required("Tags are required")
    .test("is-not-empty", "Tags cannot be empty", (value) => {
      return (
        value
          ?.split(",")
          .map((tag) => tag.trim())
          .filter(Boolean).length > 0
      );
    }),
  salaryMin: yup
    .number()
    .typeError("Salary must be a number")
    .min(0, "Salary cannot be negative")
    .required("Salary start is required"),
  salaryMax: yup
    .number()
    .typeError("Salary must be a number")
    .min(0, "Salary cannot be negative")
    .nullable()
    .when("salaryMin", ([salaryMin], schema) => {
      if (salaryMin != null) {
        return schema.min(
          salaryMin + 1,
          "Salary end must be greater than salary start"
        );
      }
      return schema;
    }),
  deadline: yup
    .date()
    .typeError("Deadline must be a valid date")
    .required("Deadline is required"),
  isPublished: yup.boolean().required("Publish status is required"),
});
