import prisma from "../../prisma";
import { AuthParams } from "../../types/type";
import { hashPassword } from "../../utils/password";
import { generateToken } from "../../utils/token";

export const googleAuth = async (params: AuthParams) => {
  const { email } = params;
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const hashed = await hashPassword(params.password);
    user = await prisma.user.create({
      data: { ...params, password: hashed, isVerify: true },
    });
  }

  const access_token = generateToken({ id: user.id, role: "User" });

  return { message: "Google authentication successful", data: user, access_token };
};
