import { ensureIndustryNotExists, validateIndustryName } from "../../helpers/industryHelpers";
import prisma from "../../prisma";

export const createIndustry = async (name: string) => {
  validateIndustryName(name);
  await ensureIndustryNotExists(name);

  const result = await prisma.industry.create({
    data: { name },
  });
  return { message: "Industry created", result };
};
