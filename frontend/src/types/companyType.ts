import { IReview } from "./review";

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
  id: string;
  name: string;
  email: string;
  role: string;
  about: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  regionNumber: string;
  phoneNumber: string;
  address: string;
  website: string;
  logo: string;
  isVerify: boolean;
  industryId: string;
  latitude: string;
  longitude: string;
  createdAt: Date;
  updatedAt: Date;
  averageRating: number;
  totalJobs: number;
  totalApplicants: number;
  Review: IReview[];
}
