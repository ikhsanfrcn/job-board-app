import prisma from "../../prisma";
import { comparePassword, hashPassword } from "../../utils/password";
import { decodeToken } from "../../utils/decodeToken";
import { validatePasswordStrength } from "../../utils/validatePassword";
import { getCompanyOrThrow } from "../../helpers/companyHelpers";

export const companyPasswordChange = async (companyId: string, currentPassword: string, newPassword: string) => {
  validatePasswordStrength(newPassword);

  const company = await getCompanyOrThrow(companyId)

   const passwordMatch = await comparePassword(currentPassword, company.password);
    if (!passwordMatch) {
      throw new Error('The old password you entered is incorrect');
    }

  const hashed = await hashPassword(newPassword);
  await prisma.company.update({
    where: { id: company.id },
    data: { password: hashed },
  });

  return { message: "Reset password success" };
};
