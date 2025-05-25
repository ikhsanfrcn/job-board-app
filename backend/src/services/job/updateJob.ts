import { ensureJobExists } from "../../helpers/jobHelper";
import prisma from "../../prisma";

export const updateJob = async (
  id: string,
  companyId: string,
  data: any
) => {
  const job = await ensureJobExists(id);
  if (job.companyId !== companyId) {
    throw { status: 403, message: "You are not authorized to update this job" };
  }

  const updated = await prisma.job.update({
    where: { id },
    data,
  });

  return {
    message: "Job updated successfully",
    data: updated,
  };
};
