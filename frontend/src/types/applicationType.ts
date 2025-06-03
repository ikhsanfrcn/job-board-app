import { IUserProfile } from "./userProfile";

export interface Application {
  id: string;
  status: string;
  cvUrl: string;
  expectedSalary?: string;
  createdAt: string;
  job: {
    title: string;
    city: string;
    salaryMin: string | null;
    salaryMax: string | null;
  };
}
export interface IApplication {
  id: string;
  status: string;
  cvUrl: string;
  expectedSalary?: string;
  createdAt: string;
  job: {
    title: string;
    city: string;
    salaryMin: string | null;
    salaryMax: string | null;
  };
  user: IUserProfile;
}
