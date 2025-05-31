export interface Application {
  id: string;
  status: string;
  cvUrl: string;
  expectedSalary?: string;
  createdAt: string;
  job: {
    title: string;
    city: string;
    salary: string | null;
  };
}
