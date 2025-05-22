import prisma from "../../prisma";
import { sign } from "jsonwebtoken";
import { sendVerificationEmail } from "../../utils/mailer";
import { buildCompanyResetPasswordLink } from "../../helpers/linkBuilder";

export const requestPasswordReset = async (email: string) => {
  const company = await prisma.company.findUnique({ where: { email } });
  if (!company) throw { status: 400, message: "Company not found" };

  const token = sign({ id: company.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  await sendVerificationEmail({
    email,
    subject: "Password Reset",
    templateName: "passwordReset",
    templateData: {
      name: company.name,
      link: buildCompanyResetPasswordLink(token),
    },
  });

  return { message: "Request sent" };
};
