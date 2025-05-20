import { getUserOrThrow } from "../../helpers/authHelpers";
import prisma from "../../prisma";

export const verifyUserAccount = async (userId?: string) => {

  const user = await getUserOrThrow(userId);
  
  if (user.isVerify) throw { status: 400, message: "Already verified" };

  await prisma.user.update({ where: { id: userId }, data: { isVerify: true } });
  return { message: "Verification successful" };
};
