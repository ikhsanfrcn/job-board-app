export interface RegisterCompanyParams {
  name: string;
  email: string;
  password: string;
  industryId: string;
}

export interface AuthParams {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface CreateJobParams {
  title: string;
  description: string;
  city: string;
  category: string;
  tags: string[];
  salaryMin?: number | null | undefined;
  salaryMax?: number | null | undefined;
  deadline: string;
  companyId: string;
  isPublished?: boolean;
}

export interface GetCompanyJobsParams {
  companyId: string;
  page?: number;
  size?: number;
}

export interface GetJobsParams {
  title?: string;
  city?: string;
  category?: string;
  tags?: string[];
  isPublished?: boolean;
  page?: number;
  size?: number;
  minSalary?: number;
  maxSalary?: number;
}

export interface CreateApplicationParams {
  userId: string;
  jobId: string;
  expectedSalary: string;
  cvUrl: string;
}

export interface GetApplicationsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface CreateInterviewParams {
  applicationId: string;
  date: string;
  location: string;
}