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