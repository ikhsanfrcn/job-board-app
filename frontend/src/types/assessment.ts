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
}
