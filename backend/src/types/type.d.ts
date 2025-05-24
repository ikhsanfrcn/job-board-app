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
  salary?: string | null | undefined;
  deadline: string;
  companyId: string;
  isPublished?: boolean;
}

export interface GetJobsParams {
  city?: string;
  category?: string;
  tags?: string[];
  isPublished?: boolean;
  page?: number;
  size?: number;
}