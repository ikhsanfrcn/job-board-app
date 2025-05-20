import prisma from "../../prisma";

export const verifyCompanyAccount = async (companyId?: string) => {
  if (!companyId) throw { status: 401, message: "Unauthorized" };

  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) throw { status: 404, message: "Company not found" };
  if (company.isVerify) throw { status: 400, message: "Already verified" };

  await prisma.company.update({ where: { id: companyId }, data: { isVerify: true } });

  return { message: "Verification successful" };
};
