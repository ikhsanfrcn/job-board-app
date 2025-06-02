export interface IJob {
  id: string;
  title: string;
  description: string;
  city: string;
  category: string;
  tags: string[];
  salary?: string;
  deadline: string;
  isPublished: boolean;
  isTestActive: boolean;
  createdAt: string;
  company: {
    name: string
  }
}

export interface IMJob {
  id: string;
  title: string;
  description: string;
  city: string;
  category: string;
  tags: string[];
  salary?: string;
  deadline: string;
  isPublished: boolean;
  isTestActive: boolean;
  createdAt: string;
}