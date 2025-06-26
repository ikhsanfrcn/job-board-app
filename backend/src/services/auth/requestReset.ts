import prisma from "../../prisma";
import { sign } from "jsonwebtoken";
import { sendVerificationEmail } from "../../utils/mailer";
import { buildResetPasswordLink } from "../../helpers/linkBuilder";

export const requestUserPasswordReset = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 400, message: "User not found" };

  if (user.socialLogin) {
    throw {
      status: 400,
      message: "Users who register with social login cannot reset their password with this feature.",
    };
  }

  const token = sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  await sendVerificationEmail({
    email,
    subject: "Password Reset",
    templateName: "passwordReset",
    templateData: {
      name: user.username,
      link: buildResetPasswordLink(token),
    },
  });

  return { message: "Request sent" };
};
