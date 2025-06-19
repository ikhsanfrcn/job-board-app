import prisma from "../../prisma";

export default async function getUserProfile(userId?: string) {
  if (!userId) throw { status: 400, message: "User id is required" };
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) throw { status: 404, message: "User not found"}
  const { password, ...safeUser } = user;
  return safeUser;
}
