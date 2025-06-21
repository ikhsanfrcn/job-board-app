import { ApplicationStatus, Prisma } from "../../../prisma/generated/prisma";
import prisma from "../../prisma";
import { GetApplicationsParams, IGetCompanyParams } from "../../types/type";



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

export async function getCompanyApplicationsService({
  jobId,
  companyId,
  status,
  page,
  limit,
}: IGetCompanyParams) {
  const filter: Prisma.ApplicationWhereInput = {};

  if (
    status &&
    Object.values(ApplicationStatus).includes(status as ApplicationStatus)
  ) {
    filter.status = status as ApplicationStatus;
  } else if (status) {
    throw new Error(`Invalid status value: ${status}`);
  }

  const skip = (page - 1) * limit;

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where: {
        ...filter,
        jobId,
        job: {
          companyId,
        },
      },
      include: {
        user: {
          include: {
            userTest: {
              where: {
                jobId,
              },
              select: {
                id: true,
                correctAnswers: true,
                totalQuestions: true,
                scorePercentage: true,
                completedAt: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      skip,
      take: limit,
    }),
    prisma.application.count({
      where: {
        ...filter,
        jobId,
        job: {
          companyId,
        },
      },
    }),
  ]);

  return { applications, total };
}
