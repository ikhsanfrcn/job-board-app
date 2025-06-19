import prisma from "../../prisma";

interface GetCompanyJobsParams {
  companyId: string;
  page?: number;
  limit?: number;
}

export const getCompanyJobsService = async ({
  companyId,
  page = 1,
  limit = 10,
}: GetCompanyJobsParams) => {
  const skip = (page - 1) * limit;

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where: { companyId },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.job.count({
      where: { companyId },
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    jobs,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      perPage: limit,
    },
  };
};
