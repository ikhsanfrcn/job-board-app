import { decodeToken } from "../../utils/decodeToken";
import prisma from "../../prisma";
import { getUserOrThrow } from "../../helpers/authHelpers";
import { generateToken } from "../../utils/token";
import { sendVerificationEmail } from "../../utils/mailer";
import { buildVerificationLinkUser } from "../../helpers/linkBuilder";

export const userChangeEmail = async (token: string, newEmail: string) => {
  const decoded = decodeToken(token);
  const userId = decoded.userId || decoded.id;

  const user = await getUserOrThrow(userId);

  const tokenIssuedAt = decoded.iat * 1000;
  if (tokenIssuedAt < user.updatedAt.getTime()) {
    throw { status: 400, message: "This reset link is no longer valid" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { email: newEmail, isVerify: false },
  });

  const newtoken = generateToken({ id: user.id, role: "User" });
    await sendVerificationEmail({
      email: user.email,
      subject: "Verification Email",
      templateName: "verify",
      templateData: {
        name: user.username,
        link: buildVerificationLinkUser(newtoken),
      },
    });

  return { message: "Change email success, check your email" };
};
