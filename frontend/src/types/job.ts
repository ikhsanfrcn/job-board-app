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
  createdAt: string;
}