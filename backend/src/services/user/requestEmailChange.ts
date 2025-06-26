import prisma from "../../prisma";
import { sign } from "jsonwebtoken";
import { sendVerificationEmail } from "../../utils/mailer";
import { buildChangeEmailLink } from "../../helpers/linkBuilder";

export const requestUserEmailChange = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
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
    email: user.email,
    subject: "Email Change Verification",
    templateName: "emailChange",
    templateData: {
      name: user.username,
      link: buildChangeEmailLink(token),
    },
  });

  return { message: "Request sent" };
};
