export interface ICompanyRegisterForm {
  name: string;
  email: string;
  password: string;
  industryId: string;
}

export interface ICompanyLoginForm {
  email: string;
  password: string;
}

export interface ICompanyResetForm {
  newPassword: string;
}

export interface ICompanyForgotForm {
  email: string;
}

export interface ICompanyProfile {
  name: string;
  email: string;
  about: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  regionNumber: string;
  phoneNumber: string;
  address: string;
  website: string;
}
