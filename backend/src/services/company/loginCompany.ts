import prisma from "../../prisma";
import { comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/token";
import { sendVerificationEmail } from "../../utils/mailer";
import { buildVerificationLinkCompany } from "../../helpers/linkBuilder";

export const loginCompany = async (email: string, password: string) => {
  const company = await prisma.company.findUnique({ where: { email } });
  if (!company) throw { status: 404, message: "Company not found" };

  const valid = await comparePassword(password, company.password);
  if (!valid) throw { status: 401, message: "Invalid password" };

  if (!company.isVerify) {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    if (company.verificationSent < oneHourAgo) {
      const token = generateToken({ id: company.id, role: "Admin" });

      await sendVerificationEmail({
        email: company.email,
        subject: "Company Registration Verification",
        templateName: "verifyCompany",
        templateData: {
          name: company.name,
          link: buildVerificationLinkCompany(token),
        },
      });

      await prisma.company.update({
        where: { id: company.id },
        data: { verificationSent: now },
      });

      throw {
        status: 403,
        message: "Account not verified. Verification email resent.",
      };
    }

    throw {
      status: 403,
      message: "Account not verified. Please check your email.",
    };
  }

  const token = generateToken({ id: company.id, role: company.role });
  return { message: "Login successful", data: company, access_token: token };
};
