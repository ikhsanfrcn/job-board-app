import * as yup from 'yup';

export const updateProfileSchema = yup.object({
  name: yup.string().required(),
  about: yup.string().nullable(),
  country: yup.string().nullable(),
  state: yup.string().nullable(),
  city: yup.string().nullable(),
  zipCode: yup.string().nullable(),
  regionNumber: yup.string().nullable(),
  phoneNumber: yup.string().nullable(),
  address: yup.string().nullable(),
  website: yup.string().nullable(),
  logo: yup.string().nullable(),
  latitude: yup.string().nullable(),
  longitude: yup.string().nullable(),
  industryId: yup.string().nullable(),
});
