import * as Yup from 'yup';

export const subscriptionSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  type: Yup.string().required('Type is required'),
  price: Yup.string()
    .matches(/^\d+$/, 'Price must be a number')
    .required('Price is required'),
  features: Yup.string().required('Features are required'),
});
