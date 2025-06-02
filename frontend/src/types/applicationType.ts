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
    salaryStart: string | null;
    salaryEnd: string | null;
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
    salaryStart: string | null;
    salaryEnd: string | null;
  };
  user: IUserProfile;
}
