import { Request, Response } from "express";
import prisma from "../prisma";
import bcrypt, { genSalt } from "bcrypt";
import { sign } from "jsonwebtoken";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import { transporter } from "../helpers/mailer";

export class PasswordController {
  async requestResetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
      }

      const payLoad = { id: user.id };
      const token = sign(payLoad, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      const link = `${process.env.BASE_URL_FRONTEND}/password/reset/${token}`;
      const templatePath = path.join(
        __dirname,
        "../templates",
        `passwordReset.hbs`
      );
      const templateSource = fs.readFileSync(templatePath, "utf-8");
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({ link });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Password reset verification email",
        html: html,
      });
      res.status(200).json({ message: "Request sent" });
    } catch (error) {
      res.status(500).json({ message: "Server internal error" });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).send({ message: "Unauthorized" });
      }

      const { newPassword } = req.body;

      if (!newPassword || newPassword.length < 8) {
        res.status(400).json({
          message:
            "New password is required and must be at least 8 characters long",
        });
        return;
      }

      const salt = await genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await prisma.user.update({
        data: { password: hashedPassword },
        where: { id: userId },
      });
      res.status(200).json({ message: "Reset password success" });
    } catch (error) {
        console.log(error);
        
      res.status(500).json({ message: "Server internal error" });
    }
  }
}
