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