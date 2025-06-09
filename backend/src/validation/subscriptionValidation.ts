import * as yup from "yup";

export const subscriptionSchema = yup.object({
 name: yup.string().required("Name is required"),
 type: yup.string().required("Type is required"),
 features: yup.string().required("features is required"),
 price: yup.number().required("Price is required")
})