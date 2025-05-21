import prisma from "../prisma";

export const ensureCompanyNotExists = async (email: string) => {
  const emailExists = await prisma.company.findUnique({ where: { email } })
  const isUserRegistered = await prisma.user.findUnique({ where: { email } })
  if (emailExists) throw { status: 400, message: "Email already registered" };
  if (isUserRegistered) throw { status:400, message: "Email is already associated with a user"}
};

export const getCompanyOrThrow = async (companyId?: string) => {
  if (!companyId) throw { status: 400, message: "Unauthorized" };
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) throw { status: 404, message: "Company not found" };
  return company;
};