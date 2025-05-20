import prisma from "../prisma";

export const ensureUserNotExists = async (email: string, password: string) => {
  if (await prisma.user.findUnique({ where: { email, password } }))
    throw { status: 400, message: "Email already registered" };
};

export const getUserOrThrow = async (userId?: string) => {
  if (!userId) throw { status: 400, message: "Unauthorized" };
  
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw { status: 404, message: "User not found" };

  return user;
};
