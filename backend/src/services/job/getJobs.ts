import prisma from "../../prisma";
import { GetJobsParams } from "../../types/type";

export const getJobs = async ({
  city,
  category,
  tags,
  isPublished = true,
  page = 1,
  size = 10,
  minSalary,
  maxSalary,
}: GetJobsParams) => {
  const skip = (page - 1) * size;
  const take = size;

  const where: any = { isPublished };

  if (city) where.city = city;
  if (category) where.category = category;
  if (tags && tags.length > 0) {
    where.tags = { hasEvery: tags };
  }
   if (minSalary) {
    where.salaryMin = { gte: minSalary };
  }
  if (maxSalary) {
    where.salaryMax = { lte: maxSalary };
  }

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            city: true,
            website: true,
            logo: true,
          },
        },
      },
    }),
    prisma.job.count({ where }),
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
