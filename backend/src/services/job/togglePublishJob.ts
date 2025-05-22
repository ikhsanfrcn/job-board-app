import { ensureJobExists } from "../../helpers/jobHelper";
import prisma from "../../prisma";

export const togglePublishJob = async (id: string, companyId: string, isPublished: boolean) => {
  const job = await ensureJobExists(id)
  if (job.companyId !== companyId) {
    throw { status: 403, message: "You are not authorized to update this job" };
  }

  const updated = await prisma.job.update({
    where: { id },
    data: { isPublished },
  });

  return {
    message: "Job publish status updated",
    data: {
      id: updated.id,
      title: updated.title,
      isPublished: updated.isPublished,
    },
  };
};
