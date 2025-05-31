import prisma from "../../prisma";
import { CreateInterviewParams } from "../../types/type";

export const createInterview = async (params: CreateInterviewParams) => {
  const interview = await prisma.interview.create({
    data: { ...params },
  });

  await prisma.application.update({
    where: { id: params.applicationId },
    data: { status: "INTERVIEW" },
  });

  return { message: "Interview created", interview };
};
