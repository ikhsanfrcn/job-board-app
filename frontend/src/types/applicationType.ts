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
