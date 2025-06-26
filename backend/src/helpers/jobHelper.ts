import prisma from "../prisma";

export const ensureJobExists = async (id: string) => {
  const job = await prisma.job.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!job) throw { status: 404, message: "Job not found" };

  return job;
};

