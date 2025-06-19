import prisma from "../../prisma";

export default async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { message: "User not found" };
  return user;
}
