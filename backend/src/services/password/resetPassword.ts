import prisma from "../../prisma";
import { hashPassword } from "../../utils/password";

export const resetPassword = async (userId: string, newPassword: string) => {
  if (!newPassword || newPassword.length < 8) {
    throw { status: 400, message: "New password is required and must be at least 8 characters long" };
  }

  const hashed = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed },
  });

  return { message: "Reset password success" };
};
