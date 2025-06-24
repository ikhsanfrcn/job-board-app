import prisma from "../../prisma";
import { Prisma } from "../../../prisma/generated/prisma";
import { GetUserAssessmentsParams } from "../../types/type";

export const getUserAssessments = async ({
  userId,
  title,
  isPassed,
  sortBy = "createdAt",
  sortOrder = "asc",
  page = 1,
  limit = 10,
}: GetUserAssessmentsParams & {
  userId: string;
  title?: string;
  isPassed?: boolean;
  sortBy?: "createdAt" | "title" | "isPassed";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}) => {
  const skip = (page - 1) * limit;
  const take = limit;

  const filter: Prisma.SkillAssessmentWhereInput = {
    userId,
    ...(typeof isPassed === "boolean" && { isPassed }),
    ...(title && {
      template: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    }),
  };

  const orderBy: Prisma.SkillAssessmentOrderByWithRelationInput = (() => {
    if (sortBy === "title") {
      return {
        template: {
          title: sortOrder,
        },
      };
    }

    return {
      [sortBy]: sortOrder,
    };
  })();

  const assessments = await prisma.skillAssessment.findMany({
    where: filter,
    include: {
      template: true,
    },
    orderBy,
    skip,
    take,
  });

  const total = await prisma.skillAssessment.count({
    where: filter,
  });

  return {
    message: "User assessments fetched successfully",
    assessments,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
