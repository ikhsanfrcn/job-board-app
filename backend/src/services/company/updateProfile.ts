import prisma from "../../prisma";

export default async function updateCompanyProfile(companyId: string, data: any) {
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) throw { message: "Company not found" };

  return prisma.company.update({
    where: { id: companyId },
    data
  });
}
