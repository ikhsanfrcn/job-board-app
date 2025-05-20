import prisma from "../../prisma";
import { hashPassword } from "../../utils/password";
import { decodeToken } from "../../utils/decodeToken";
import { validatePasswordStrength } from "../../utils/validatePassword";

export const resetPassword = async (token: string, newPassword: string) => {
  validatePasswordStrength(newPassword);

  const decoded = decodeToken(token);
  const userId = decoded.userId || decoded.id;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw { status: 404, message: "User not found" };

  const tokenIssuedAt = decoded.iat * 1000;
  if (tokenIssuedAt < user.updatedAt.getTime()) {
    throw { status: 400, message: "This reset link is no longer valid" };
  }

  const hashed = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed },
  });

  return { message: "Reset password success" };
};
