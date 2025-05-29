import prisma from "../../prisma";
import { CreateApplicationParams } from "../../types/type";

export const createApplication = async (params: CreateApplicationParams) => {
  const application = await prisma.application.create({
    data: { ...params },
  });
  return { message: "Application created", application}
};
