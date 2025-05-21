import prisma from "../../prisma";
import { hashPassword } from "../../utils/password";
import { decodeToken } from "../../utils/decodeToken";
import { validatePasswordStrength } from "../../utils/validatePassword";
import { getCompanyOrThrow } from "../../helpers/companyHelpers";

export const passwordReset = async (token: string, newPassword: string) => {
  validatePasswordStrength(newPassword);

  const decoded = decodeToken(token);
  const companyId = decoded.companyId || decoded.id;

  const company = await getCompanyOrThrow(companyId)

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
