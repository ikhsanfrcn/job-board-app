import prisma from "../../prisma";
import { comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/token";

export const loginCompany = async (email: string, password: string) => {
  const company = await prisma.company.findUnique({ where: { email } });
  if (!company) throw { status: 404, message: "Company not found" };
  if (!company.isVerify) throw { status: 403, message: "Account not verified" };

  const valid = await comparePassword(password, company.password);
  if (!valid) throw { status: 401, message: "Invalid password" };

  const token = generateToken({ id: company.id, role: "Admin" });
  return { message: "Login successful", data: company, access_token: token };
};
