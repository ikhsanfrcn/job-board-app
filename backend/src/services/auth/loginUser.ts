import prisma from "../../prisma";
import { comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/token";
import { sendVerificationEmail } from "../../utils/mailer";
import { buildVerificationLinkUser } from "../../helpers/linkBuilder";

export const loginUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw { status: 404, message: "User not found" };

  const valid = await comparePassword(password, user.password);
  if (!valid) throw { status: 401, message: "Invalid password" };

  if (!user.isVerify) {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    if (user.verificationSent < oneHourAgo) {
      const token = generateToken({ id: user.id, role: "User" });

      await sendVerificationEmail({
        email: user.email,
        subject: "Verification Email",
        templateName: "verify",
        templateData: {
          name: user.username,
          link: buildVerificationLinkUser(token),
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { verificationSent: now },
      });

      throw {
        status: 403,
        message: "Account not verified. Verification email resent.",
      };
    }

    throw {
      status: 403,
      message: "Account not verified. Please check your email.",
    };
  }

  const token = generateToken({ id: user.id, role: user.role });
  return { message: "Login successful", data: user, access_token: token };
};
