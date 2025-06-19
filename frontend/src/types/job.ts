export interface IJob {
  id: string;
  title: string;
  description: string;
  province: string;
  city: string;
  category: string;
  tags: string[];
  salaryMin?: number;
  salaryMax?: number;
  deadline: string;
  isPublished: boolean;
  isTestActive: boolean;
  createdAt: string;
  company: {
    name: string;
  };
}

export interface IMJob {
  id: string;
  title: string;
  description: string;
  city: string;
  category: string;
  tags: string[];
  salaryMin?: number | null;
  salaryMax?: number| null;
  deadline: string;
  isPublished: boolean;
  isTestActive: boolean;
  createdAt: string;
}