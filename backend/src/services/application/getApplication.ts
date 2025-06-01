import prisma from "../../prisma";
import { GetApplicationsParams } from "../../types/type";

export const getUserApplications = async ({
  userId,
  page = 1,
  pageSize = 10,
}: GetApplicationsParams) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const totalApplications = await prisma.application.count({
    where: { userId },
  });

  const applications = await prisma.application.findMany({
    where: { userId },
    include: { job: true },
    skip,
    take,
  });

  return {
    message: "Applications fetched successfully",
    applications,
    totalApplications,
    totalPages: Math.ceil(totalApplications / pageSize),
    currentPage: page,
  };
};

export async function getCompanyApplicationsService(
  jobId: string,
  companyId: string
) {
  return prisma.application.findMany({
    where: {
      jobId,
      job: {
        companyId: companyId,
      },
    },
    include: {
      user: true,
    },
  });
}
