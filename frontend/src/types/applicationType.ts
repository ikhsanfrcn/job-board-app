import { IUserProfile } from "./userProfile";

export interface Application {
  id: string;
  status: string;
  cvUrl: string;
  expectedSalary?: number;
  createdAt: string;
  job: {
    title: string;
    city: string;
    salaryMin: string | null;
    salaryMax: string | null;
    company: {
      name: string;
      logo: string;
    };
  };
}

export interface ITestResult {
  id: string;
  correctAnswers: number;
  totalQuestions: number;
  scorePercentage: number;
  completedAt: string;
}

export interface IUserProfileWithTest extends IUserProfile {
  userTest?: ITestResult[];
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
  user: IUserProfileWithTest;
}

export interface IFilterApplicants {
  status: string;
  userFirstName: string;
  usereducation: string;
  expectedSalary: string;
  age: string;
  sortBy:
    | "createdAt"
    | "status"
    | "expectedSalary"
    | "user.firstName"
    | "user.education";
  sortOrder: "asc" | "desc";
}

export interface IFilterUserApplicants {
  title: string;
  company: string;
  sortBy: "createdAt" | "title";
  sortOrder: "asc" | "desc";
}
