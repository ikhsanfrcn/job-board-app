export interface IJob {
  id: string;
  title: string;
  description: string;
  province: string;
  city: string;
  category: string;
  employmentStatus: string;
  worksite: string;
  tags: string[];
  salaryMin?: number;
  salaryMax?: number;
  deadline: string;
  isPublished: boolean;
  isTestActive: boolean;
  createdAt: string;
  company: {
    name: string;
    logo: string;
  };
}

export interface IMJob {
  id?: string;
  title: string;
  description: string;
  employmentStatus: string;
  worksite: string;
  province: string;
  city: string;
  category: string;
  tags: string[];
  salaryMin?: number | null;
  salaryMax?: number | null;
  deadline: string;
  isPublished: boolean;
  isTestActive: boolean;
  createdAt: string;
}
