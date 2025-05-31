import * as yup from "yup";

export const createInterviewSchema = yup.object({
    applicationId: yup.string().required("Application Id is required"),
    date: yup.string().required("Date is required"),
    location: yup.string().required("Location is required")
})