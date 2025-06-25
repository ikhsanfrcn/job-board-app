export interface IAssessment {
  id: string;
  title: string;
  description: string;
  category: string;
  questions?: Array<{
    question: string;
    options: string[];
    answer: string;
  }>;
  badgeImage: string;
}

export interface IUserAssessment {
  id: string;
  score: number;
  totalPoints: number;
  isPassed: boolean;
  timeSpent: number;
  startedAt: string;
  completedAt: string;
  template: {
    title: string;
    category: string;
  };
  user: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface IFilterUserAssessments {
  title: string;
  isPassed: string;
  sortBy: "createdAt" | "title";
  sortOrder: "asc" | "desc";
}
