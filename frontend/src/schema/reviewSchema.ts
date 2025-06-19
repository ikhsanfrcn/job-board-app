import * as yup from "yup";

export const ReviewSchema = yup.object().shape({
  cultureRating: yup
    .number()
    .min(1, "Please provide at least 1 star rating.")
    .max(5, "Maximum rating is 5 stars.")
    .required("Culture rating is required."),

  workLifeBalanceRating: yup
    .number()
    .min(1, "Please provide at least 1 star rating.")
    .max(5, "Maximum rating is 5 stars.")
    .required("Work-life balance rating is required."),

  facilitiesRating: yup
    .number()
    .min(1, "Please provide at least 1 star rating.")
    .max(5, "Maximum rating is 5 stars.")
    .required("Facilities rating is required."),

  salaryEstimate: yup.string().required("Salary estimate is required."),

  employmentStatus: yup
    .string()
    .required(
      "Please select your employment status (e.g., full-time, part-time, intern)."
    ),

  jobTitle: yup
    .string()
    .required("Please enter your job title at the company."),

  headline: yup
    .string()
    .required("Please provide a brief headline for your review."),

  pros: yup
    .string()
    .required(
      "Please mention at least one positive aspect of working at the company."
    ),

  cons: yup
    .string()
    .required(
      "Please mention at least one negative aspect of working at the company."
    ),

  advice: yup
    .string()
    .required(
      "Please provide any advice you have for the company’s management."
    ),

  agreed: yup
    .boolean()
    .oneOf(
      [true],
      "Before you can proceed, you must read and accept JobsDoors's Terms of Use."
    ),
});
