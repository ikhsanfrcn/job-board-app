import { Request, Response } from "express";
import prisma from "../prisma";
import bcrypt, { compare, genSalt } from "bcrypt";
import { sign } from "jsonwebtoken";
import handlebars from "handlebars";
import fs from "fs";
import { transporter } from "../helpers/mailer";
import path from "path";

export class CompanyController {
  async registerCompany(req: Request, res: Response) {
    const { name, email, password, industryId } = req.body;

    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(500).json({ message: "Unauthorized" });
        return;
      }

      const existingCompany = await prisma.company.findUnique({
        where: { email },
      });

      if (existingCompany) {
        res.status(400).json({ message: "Email already registered" });
        return;
      }

      const salt = await genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const company = await prisma.company.create({
        data: {
          name,
          email,
          password: hashedPassword,
          industryId,
        },
      });

      const payLoad = { id: company.id, role: "Admin" };
      const token = sign(payLoad, process.env.JWT_SECRET!, { expiresIn: "1h" });

      const link = `${process.env.BASE_URL_FRONTEND}/verify/company/${token}`;
      const templatePath = path.join(__dirname, "../templates", `verifyCompany.hbs`);
      const templateSource = fs.readFileSync(templatePath, "utf-8");
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({ name, link });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Company Registration Verification",
        html: html,
      });

      res.status(200).json({ message: "Company registered", company, token });
    } catch (error) {
      res.status(500).json({ message: "Server internal error" });
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const companyId = req.user?.id;

      if (!companyId) {
        res.status(400).json({ message: "Unauthorized" });
      }

      const company = await prisma.company.findUnique({
        where: { id: companyId },
      });
      if (!company) {
        res.status(404).json({ message: "Company is not registered" });
        return;
      }

      if (company?.isVerify) {
        res.status(400).json({ message: "Company already verified" });
        return;
      }

      await prisma.company.update({
        data: { isVerify: true },
        where: { id: companyId },
      });

      res.status(200).json({ message: "Verification Success" });
    } catch (error) {
      res.status(500).json({ message: "Server internal error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const company = await prisma.company.findUnique({ where: { email } });

      if (!company) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (!company.isVerify) {
        res.status(400).json({ message: "Account is not verified" });
        return;
      }

      const isValidPass = await compare(password, company.password);
      if (!isValidPass) {
        res.status(400).json({ message: "Invalid Password" });
        return;
      }

      const payLoad = { id: company.id, role: "Admin" };
      const access_token = sign(payLoad, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      res
        .status(200)
        .json({ message: "Login success", data: company, access_token });
    } catch (error) {
      res.status(500).json({ message: "Server internal error" });
    }
  }
}
