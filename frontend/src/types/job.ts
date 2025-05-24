export interface Job {
  id: string;
  title: string;
  description: string;
  city: string;
  category: string;
  tags: string[];
  salary?: string;
  deadline: string;
  company: {
    id: string,
    name: string,
  }
}
