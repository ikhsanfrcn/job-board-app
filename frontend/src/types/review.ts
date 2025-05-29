export interface IReview {
  id: string;
  userId: string;
  companyId: string;
  rating: number;
  isCurrentEmployee: boolean;
  employmentStatus: string;
  jobTitle: string;
  headline: string;
  pros: string;
  cons: string;
  advice: string;
  createdAt: Date;
}
