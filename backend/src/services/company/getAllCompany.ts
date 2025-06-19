import { Prisma } from "../../../prisma/generated/prisma";
import prisma from "../../prisma";

interface GetAllCompaniesParams {
  name?: string;
  city?: string;
  industryId?: string;
}

export const getAllCompaniesService = async (params: GetAllCompaniesParams) => {
  const { name, city, industryId } = params;

  const filters: Prisma.CompanyWhereInput = {};

  if (name) {
    filters.name = { contains: name, mode: "insensitive" };
  }
  if (city) {
    filters.city = { contains: city, mode: "insensitive" };
  }
  if (industryId) {
    filters.industryId = industryId;
  }

  const companies = await prisma.company.findMany({
    where: filters,
    include: {
      Review: {
        select: {
          cultureRating: true,
          workLifeBalanceRating: true,
          facilitiesRating: true,
          careerOpportunitiesRating: true,
        },
      },
    },
  });

  return companies.map((company) => {
    const reviews = company.Review;
    const totalReviews = reviews.length;

    let totalRatingSum = 0;

    for (const review of reviews) {
      const averagePerReview =
        (review.cultureRating +
          review.workLifeBalanceRating +
          review.facilitiesRating +
          review.careerOpportunitiesRating) / 4;

      totalRatingSum += averagePerReview;
    }

    const averageRating =
      totalReviews > 0 ? totalRatingSum / totalReviews : 0;

    const { Review, ...companyData } = company;

    return {
      ...companyData,
      averageRating: parseFloat(averageRating.toFixed(1)),
    };
  });
};
