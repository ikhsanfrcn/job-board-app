import { Prisma } from "../../../prisma/generated/prisma";
import prisma from "../../prisma";

interface GetAllCompaniesParams {
  name?: string;
  city?: string;
  industryId?: string;
  sort?: "name_asc" | "name_desc" | "rating_asc" | "rating_desc";
  page?: number;
  limit?: number;
}

export const getAllCompaniesService = async (params: GetAllCompaniesParams) => {
  const { name, city, sort, page = 1, limit = 10 } = params;

  const filters: Prisma.CompanyWhereInput = {};

  if (name) {
    filters.name = { contains: name, mode: "insensitive" };
  }
  if (city) {
    filters.city = { contains: city, mode: "insensitive" };
  }

  let orderBy: Prisma.CompanyOrderByWithRelationInput | undefined;

  if (sort === "name_asc") orderBy = { name: "asc" };
  else if (sort === "name_desc") orderBy = { name: "desc" };

  const totalCount = await prisma.company.count({ where: filters });

  const skip = (page - 1) * limit;

  const companies = await prisma.company.findMany({
    where: filters,
    orderBy,
    skip,
    take: limit,
    include: {
      Review: {
        select: {
          cultureRating: true,
          workLifeBalanceRating: true,
          facilitiesRating: true,
          careerOpportunitiesRating: true,
        },
      },
      jobs: {
        select: {
          id: true,
          Application: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  const mapped = companies.map((company) => {
    const reviews = company.Review;
    const totalReviews = reviews.length;

    const totalRatingSum = reviews.reduce((sum, review) => {
      const avg =
        (review.cultureRating +
          review.workLifeBalanceRating +
          review.facilitiesRating +
          review.careerOpportunitiesRating) /
        4;
      return sum + avg;
    }, 0);

    const averageRating = totalReviews > 0 ? totalRatingSum / totalReviews : 0;

    const totalJobs = company.jobs.length;

    const totalApplicants = company.jobs.reduce(
      (sum, job) => sum + job.Application.length,
      0
    );

    const { Review, jobs, ...companyData } = company;

    return {
      ...companyData,
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalJobs,
      totalApplicants,
    };
  });

  if (sort === "rating_asc") {
    mapped.sort((a, b) => a.averageRating - b.averageRating);
  } else if (sort === "rating_desc") {
    mapped.sort((a, b) => b.averageRating - a.averageRating);
  }

  return {
    data: mapped,
    total: totalCount,
    page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
  };
};
