import prisma from "../../prisma";
import { CreateJobParams } from "../../types/type";

export const createJob = async (params: CreateJobParams) => {
  const job = await prisma.job.create({
    data: { ...params },
  });

  return { message: "Job Created", job };
};
