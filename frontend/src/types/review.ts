export interface IReview {
  id: string;
  userId: string;
  companyId: string;
  salaryEstimate: string;
  cultureRating: number;
  workLifeBalanceRating: number;
  facilitiesRating: number;
  careerOpportunitiesRating: number;
  averageRating: number;
  employmentStatus: string;
  jobTitle: string;
  headline: string;
  pros: string;
  cons: string;
  advice: string;
  createdAt: Date;
}
