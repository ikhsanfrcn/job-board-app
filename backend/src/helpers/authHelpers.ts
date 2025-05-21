import prisma from "../prisma";

export const ensureUserNotExists = async (email: string, username: string) => {
  const emailExists = await prisma.user.findUnique({ where: { email } });
  const usernameExists = await prisma.user.findUnique({ where: { username } });
  const isCompanyRegistered  = await prisma.company.findUnique({ where: { email } });
  if (emailExists || usernameExists) throw { status: 400, message: "Username / Email already registered" };
  if (isCompanyRegistered) throw { status: 400, message: "Email is already registered to a company"}
};

export const getUserOrThrow = async (userId?: string) => {
  if (!userId) throw { status: 400, message: "Unauthorized" };
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw { status: 404, message: "User not found" };
  return user;
};
