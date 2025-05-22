import * as Yup from 'yup';

export const validatePasswordStrength = (password: string) => {
  const schema = Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required');

  schema.validateSync(password);
};
