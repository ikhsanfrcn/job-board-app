import prisma from "../../prisma";
import { comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/token";

export const loginDeveloper = async (email: string, password: string) => {
  const dev = await prisma.developer.findUnique({ where: { email } });
  if (!dev) throw { status: 404, message: "Developer not found" };

  const valid = await comparePassword(password, dev.password);
  if (!valid) throw { status: 401, message: "Invalid password" };

  const token = generateToken({ id: dev.id, role: dev.role });
  return { message: "Login successful", data: dev, access_token: token };
};