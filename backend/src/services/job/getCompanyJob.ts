import { Prisma } from "../../../prisma/generated/prisma";
import prisma from "../../prisma";
import { GetCompanyJobsParams } from "../../types/type";

export const getCompanyJobs = async ({
  companyId,
  title,
  category,
  sortBy = "createdAt",
  sortOrder = "desc",
  page = 1,
  size = 10,
}: GetCompanyJobsParams & {
  title?: string;
  category?: string;
  sortBy?: "createdAt" | "title" | "category";
  sortOrder?: "asc" | "desc";
}) => {
  const skip = (page - 1) * size;
  const take = size;

  // Filter
  const filters: Prisma.JobWhereInput = {
    companyId,
    ...(title && {
      title: {
        contains: title,
        mode: "insensitive",
      },
    }),
    ...(category && {
      category: {
        contains: category,
        mode: "insensitive",
      },
    }),
  };

  // Sort (gunakan array agar lebih aman terhadap Prisma)
  const orderBy: Prisma.Enumerable<Prisma.JobOrderByWithRelationInput> = [
    { [sortBy]: sortOrder },
  ];

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where: filters,
      skip,
      take,
      orderBy,
    }),
    prisma.job.count({
      where: filters,
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
