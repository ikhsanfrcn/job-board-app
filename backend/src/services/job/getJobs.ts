import prisma from "../../prisma";
import { GetJobsParams } from "../../types/type";

export const getJobs = async ({
  titleOrCategory,
  city,
  category,
  tags,
  isPublished = true,
  page = 1,
  size = 10,
  minSalary,
  maxSalary,
  worksite,
  date,
  sort,
}: GetJobsParams) => {
  const skip = (page - 1) * size;
  const take = size;

  const where: any = { isPublished, isDeleted: false };

  if (titleOrCategory) {
    where.OR = [
      {
        title: {
          contains: titleOrCategory,
          mode: "insensitive",
        },
      },
      {
        category: {
          contains: titleOrCategory,
          mode: "insensitive",
        },
      },
    ];
  }

  if (city) {
    where.city = {
      contains: city,
      mode: "insensitive",
    };
  }

  if (worksite) {
    where.worksite = worksite;
  }

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

  if (date === "7days") {
    where.createdAt = {
      gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    };
  } else if (date === "1month") {
    where.createdAt = {
      gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    };
  }

  let orderBy: any = { createdAt: "desc" };
  if (sort === "oldest") {
    orderBy = { createdAt: "asc" };
  }

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      skip,
      take,
      orderBy,
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
