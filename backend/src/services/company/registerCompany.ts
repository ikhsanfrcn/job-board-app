import prisma from "../../prisma";
import { hashPassword } from "../../utils/password";
import { generateToken } from "../../utils/token";
import { sendVerificationEmail } from "../../utils/mailer";
import { RegisterCompanyParams } from "../../types/type";
import { buildVerificationLink, ensureCompanyNotExists } from "../../helpers/companyHelpers";

export const registerCompany = async (params: RegisterCompanyParams) => {
  await ensureCompanyNotExists(params.email);

  const hashed = await hashPassword(params.password);
  const company = await prisma.company.create({
    data: { ...params, password: hashed },
  });

  const token = generateToken({ id: company.id, role: "Admin" });
  await sendVerificationEmail({
  email: params.email,
  subject: "Company Registration Verification",
  templateName: "verifyCompany",
  templateData: {
    name: params.name,
    link: buildVerificationLink(token),
  },
});

  return { message: "Company registered", company, token };
};
