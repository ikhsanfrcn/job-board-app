import { Request, Response } from "express";
import prisma from "../prisma";

export class IndustryController {
  async createIndustry(req: Request, res: Response) {
    try {
      const { name } = req.body;

      if (!name) {
        res.status(400).json({ message: "Industry name is required" });
        return;
      }

      const existingIndustry = await prisma.industry.findFirst({
        where: { name },
      });

      if (existingIndustry) {
        res.status(400).json({ message: "Industry is available" });
        return;
      }

      const industry = await prisma.industry.create({
        data: { name },
      });

      res.status(200).json({ message: "Industry created", industry });
    } catch (error) {
      res.status(500).json({ message: "Server internal error" });
    }
  }
}
