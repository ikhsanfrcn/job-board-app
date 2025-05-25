import prisma from "../prisma"

export const validateIndustryName = (name: string) => {
    if (!name || typeof name !== "string" || name.trim() ==='')
        throw { status: 400, message: "Name is required and must be a non-empty string"}
}

export const ensureIndustryNotExists = async (name: string) => {
    if (await prisma.industry.findFirst({ where: { name }}))
        throw { status: 400, message: "Industry already exists"}
}