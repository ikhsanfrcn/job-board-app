import prisma from "../../prisma";

export async function getCompanyProfile(companyId: string) {
  if (!companyId) throw new Error("Company ID is required");
  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });
  if (!company) throw new Error("Company not found");
  return company;
}
