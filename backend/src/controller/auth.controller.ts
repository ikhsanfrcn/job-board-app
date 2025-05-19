import { Request, Response } from "express";
import prisma from "../prisma";
import bcrypt, { compare, genSalt } from "bcrypt";
import { sign } from "jsonwebtoken";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import { transporter } from "../helpers/mailer";

export class AuthController {
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    try {
      const existingUser = await prisma.user.findUnique({
        where: { username, email },
      });

      if (existingUser) {
        res.status(400).json({ message: "Username / email already registered" });
        return;
      }

      const salt = await genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.user.create({
        data: { username, email, password: hashedPassword },
      });

      const payLoad = { id: user.id, role: "User" };
      const token = sign(payLoad, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      const link = `${process.env.BASE_URL_FRONTEND}/verify/user${token}`;
      const templatePath = path.join(__dirname, "../templates", `verify.hbs`);
      const templateSource = fs.readFileSync(templatePath, "utf-8");
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({ username, link });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Verification email",
        html: html,
      });

      res.status(200).json({ message: "User registered", user, token });
    } catch (error) {
      res.status(500).json({ message: "Server internal error" });
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(400).json({ message: "Unauthorized" });
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (user?.isVerify) {
        res.status(400).json({ message: "User already verified" });
        return;
      }

      await prisma.user.update({
        data: { isVerify: true },
        where: { id: userId },
      });

      res.status(200).json({ message: "Verification Success" });
    } catch (error) {
      res.status(500).json({ message: "Server internal error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await prisma.user.findUnique({ where: { username } });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (!user.isVerify) {
        res.status(400).json({ message: "Account is not verified" });
        return;
      }

      const isValidPass = await compare(password, user.password);
      if (!isValidPass) {
        res.status(400).json({ message: "Invalid Password" });
        return;
      }

      const payLoad = { id: user.id, role: "User" };
      const access_token = sign(payLoad, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Login success", data: user, access_token });
    } catch (error) {
      res.status(500).json({ message: "Server internal error" });
    }
  }
}
