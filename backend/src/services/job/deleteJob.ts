import { ensureJobExists } from "../../helpers/jobHelper";
import prisma from "../../prisma";

export const deleteJob = async (id: string, companyId: string) => {
  const job = await ensureJobExists(id);
  if (job.companyId !== companyId) {
    throw { status: 403, message: "You are not authorized to delete this job" };
  }
  const deletedJob = await prisma.job.delete({ where: { id } });
  return { message: "Job deleted", deletedJob };
};
