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
  userFirstName,
  usereducation,
  expectedSalary,
  age,
  sortBy,
  sortOrder,
  page,
  limit,
}: IGetCompanyParams & {
  userFirstName?: string;
  usereducation?: string;
  expectedSalary?: number;
  age?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const filter: Prisma.ApplicationWhereInput = {
    jobId,
    job: {
      companyId,
    },
    user: {},
  };

  if (
    status &&
    Object.values(ApplicationStatus).includes(status as ApplicationStatus)
  ) {
    filter.status = status as ApplicationStatus;
  } else if (status) {
    throw new Error(`Invalid status value: ${status}`);
  }

  if (expectedSalary) {
    filter.expectedSalary = {
      lte: expectedSalary,
    };
  }

  if (userFirstName || usereducation || age !== undefined) {
    filter.user = {};

    if (userFirstName) {
      filter.user.firstName = {
        contains: userFirstName,
        mode: "insensitive",
      };
    }

    if (usereducation) {
      filter.user.education = {
        contains: usereducation,
        mode: "insensitive",
      };
    }

    if (age !== undefined) {
      const today = new Date();
      const minAllowedDob = new Date(today);
      minAllowedDob.setFullYear(minAllowedDob.getFullYear() - age - 1);
      minAllowedDob.setDate(minAllowedDob.getDate() + 1);

      filter.user.dob = {
        gte: minAllowedDob.toISOString().split("T")[0],
      };
    }
  }

  const skip = (page - 1) * limit;

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where: filter,
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
        [sortBy ?? "createdAt"]: sortOrder ?? "asc",
      },
      skip,
      take: limit,
    }),
    prisma.application.count({
      where: filter,
    }),
  ]);

  return { applications, total };
}
