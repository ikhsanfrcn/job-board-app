import prisma from "../prisma";

export const ensureDevNotExists = async (email: string) => {
  const emailExists = await prisma.developer.findUnique({ where: { email } });
  if (emailExists) throw { status: 400, message: "Email already registered" };
};
