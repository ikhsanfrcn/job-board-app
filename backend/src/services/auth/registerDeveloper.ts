import { ensureDevNotExists } from "../../helpers/authDevHelpers";
import prisma from "../../prisma";
import { AuthDeveloperParams } from "../../types/type";
import { hashPassword } from "../../utils/password";
import { generateToken } from "../../utils/token";

export const registerDeveloper = async (params: AuthDeveloperParams) => {
  await ensureDevNotExists(params.email);

  const hashed = await hashPassword(params.password);
  const dev = await prisma.developer.create({
    data: { ...params, password: hashed },
  });

  const token = generateToken({ id: dev.id, role: "Developer" });

  return { message: "Developer registered", dev, token };
};
