import prisma from "../../prisma";
import { comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/token";

export const loginUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw { status: 404, message: "User not found" };
  if (!user.isVerify) throw { status: 403, message: "Account not verified" };

  const valid = await comparePassword(password, user.password);
  if (!valid) throw { status: 401, message: "Invalid password" };

  const token = generateToken({ id: user.id, role: "User" });
  return { message: "Login successful", data: user, access_token: token };
};
