import prisma from "../../prisma";

export const getJobById = async (id: string) => {
  const job = await prisma.job.findUnique({
    where: { id },
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
  });

  if (!job) throw { status: 404, message: "Job not found" };

  return {
    message: "Job fetched successfully",
    data: job,
  };
};
