import * as yup from "yup";

export const createJobSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  province: yup.string().required("Province is required"),
  city: yup.string().required("City is required"),
  category: yup.string().required("Category is required"),
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
  salaryStart: yup
    .number()
    .typeError("Salary must be a number")
    .min(0, "Salary cannot be negative")
    .nullable(),
  salaryEnd: yup
    .number()
    .typeError("Salary must be a number")
    .min(0, "Salary cannot be negative")
    .nullable()
    .when('salaryStart', ([salaryStart], schema) => {
      if (salaryStart != null) {
        return schema.min(salaryStart + 1, "Salary end must be greater than salary start");
      }
      return schema;
    }),
  deadline: yup
    .date()
    .typeError("Deadline must be a valid date")
    .required("Deadline is required"),
  isPublished: yup.boolean().required("Publish status is required"),
});
