import { Request, Response } from "express";
import prisma from "../prisma";
import bcrypt, { genSalt } from "bcrypt";
import { sign } from "jsonwebtoken";

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
          industryId
        },
      });

      const payLoad = { id: company.id, role: "Admin" };
      const token = sign(payLoad, process.env.JWT_SECRET!, { expiresIn: "1h" });

      const link = `${process.env.BASE_URL_FRONTEND}/verify/company/${token}`;

      res
        .status(200)
        .json({ message: "Company registered", company, token });
    } catch (error) {
      res.status(500).json({ message: "Server internal error" });
    }
  }
}
