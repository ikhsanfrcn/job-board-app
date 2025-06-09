import * as Yup from "yup";

export const ResumeSchema = Yup.object().shape({
  summary: Yup.string().required("Summary is required"),

  workExperience: Yup.array().of(
    Yup.object().shape({
      company: Yup.string().required("Company is required"),
      description: Yup.string().required("Description is required"),
      employmentType: Yup.string().required("Employment type is required"),
      startDate: Yup.string().required("Start date is required"),
      endDate: Yup.string().nullable().notRequired(),
      jobdesc: Yup.object().shape({
        name: Yup.string().required("Job title is required"),
      }),
    })
  ),

  education: Yup.array().of(
    Yup.object().shape({
      schoolName: Yup.string().required("School name is required"),
      degree: Yup.string().required("Degree is required"),
      fieldOfStudy: Yup.string().required("Field of study is required"),
      startDate: Yup.string().required("Start date is required"),
      endDate: Yup.string().nullable().notRequired(),
    })
  ),

  leadership: Yup.array().of(
    Yup.object().shape({
      organization: Yup.string().required("Organization is required"),
      role: Yup.string().required("Role is required"),
      description: Yup.string().required("Description is required"),
      startDate: Yup.string().required("Start date is required"),
      endDate: Yup.string().required("End date is required"),
    })
  ),

  additional: Yup.array().of(
    Yup.object().shape({
      category: Yup.string().required("Category is required"),
      items: Yup.array()
        .of(Yup.string().required("Item cannot be empty"))
        .required("Items are required"),
      description: Yup.string().nullable().notRequired(),
    })
  ),
});
