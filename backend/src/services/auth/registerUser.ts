import { ensureUserNotExists } from "../../helpers/authHelpers";
import { buildVerificationLinkUser } from "../../helpers/linkBuilder";
import prisma from "../../prisma";
import { AuthParams } from "../../types/type";
import { sendVerificationEmail } from "../../utils/mailer";
import { hashPassword } from "../../utils/password";
import { generateToken } from "../../utils/token";

export const registerUser = async (params: AuthParams) => {
  await ensureUserNotExists(params.email, params.username);

  const hashed = await hashPassword(params.password);
  const user = await prisma.user.create({
    data: { ...params, password: hashed },
  });

  const token = generateToken({ id: user.id, role: "User" });
  await sendVerificationEmail({
    email: params.email,
    subject: "Verification Email",
    templateName: "verify",
    templateData: {
      name: params.username,
      link: buildVerificationLinkUser(token),
    },
  });

  return { message: "User registered", user, token };
};
