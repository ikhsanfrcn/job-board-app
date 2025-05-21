import prisma from "../../prisma";
import { hashPassword } from "../../utils/password";
import { decodeToken } from "../../utils/decodeToken";
import { validatePasswordStrength } from "../../utils/validatePassword";

export const passwordReset = async (token: string, newPassword: string) => {
  validatePasswordStrength(newPassword);

  const decoded = decodeToken(token);
  const companyId = decoded.companyId || decoded.id;

  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) throw { status: 404, message: "Company not found" };

  const tokenIssuedAt = decoded.iat * 1000;
  if (tokenIssuedAt < company.updatedAt.getTime()) {
    throw { status: 400, message: "This reset link is no longer valid" };
  }

  const hashed = await hashPassword(newPassword);
  await prisma.company.update({
    where: { id: company.id },
    data: { password: hashed },
  });

  return { message: "Reset password success" };
};
