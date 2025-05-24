import prisma from "../../prisma";

interface GetCompanyJobsParams {
  companyId: string;
  page?: number;
  size?: number;
}

export const getCompanyJobs = async ({
  companyId,
  page = 1,
  size = 10,
}: GetCompanyJobsParams) => {
  const skip = (page - 1) * size;
  const take = size;

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where: { companyId },
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    prisma.job.count({
      where: { companyId },
    }),
  ]);

  return {
    message: "Jobs fetched successfully",
    data: {
      jobs,
      pagination: {
        total,
        page,
        size,
        totalPages: Math.ceil(total / size),
      },
    },
  };
};
