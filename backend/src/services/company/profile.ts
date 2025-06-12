import prisma from "../../prisma";

export async function getCompanyProfile(companyId: string) {
  if (!companyId) throw { status: 400, message: "Company ID is required" };
  const company = await prisma.company.findUnique({
    where: { id: companyId },
  });
  if (!company) throw { status: 404, message: "Company not found" };
  const { password, ...safeCompany } = company;
  return safeCompany;
}
