import prisma from "../../prisma";
import { getUserOrThrow } from "../../helpers/authHelpers";

export const userChangeEmail = async (userId: string, newEmail: string) => {

  const user = await getUserOrThrow(userId)

  await prisma.user.update({
    where: { id: user.id },
    data: { email: newEmail },
  });

  return { message: "Change password success" };
};
