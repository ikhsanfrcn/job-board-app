import { Company } from "../../../prisma/generated/prisma";
import prisma from "../../prisma";

export const getCompanyDetailService = async (companyId: string) => {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      Review: true,
    },
  });

  if (!company) {
    return null;
  }

  const totalReviews = company.Review.length;

  let totalRatingSum = 0;

  for (const review of company.Review) {
    const {
      cultureRating,
      workLifeBalanceRating,
      facilitiesRating,
      careerOpportunitiesRating,
    } = review;

    const averagePerReview =
      (cultureRating +
        workLifeBalanceRating +
        facilitiesRating +
        careerOpportunitiesRating) / 4;

    totalRatingSum += averagePerReview;
  }

  const averageRating =
    totalReviews > 0 ? totalRatingSum / totalReviews : 0;

  const { password, ...companyWithoutPassword } = company as Company & { password?: string };

  return {
    ...companyWithoutPassword,
    averageRating: parseFloat(averageRating.toFixed(1)),
  };
};
