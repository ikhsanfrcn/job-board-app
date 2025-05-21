import { getCompanyOrThrow } from "../../helpers/companyHelpers";
import prisma from "../../prisma";

export const verifyCompanyAccount = async (companyId?: string) => {
  const company = await getCompanyOrThrow(companyId)
  
  if (company.isVerify) throw { status: 400, message: "Already verified" };

  await prisma.company.update({ where: { id: companyId }, data: { isVerify: true } });

  return { message: "Verification successful" };
};
