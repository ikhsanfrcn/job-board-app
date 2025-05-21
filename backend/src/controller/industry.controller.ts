import { Request, Response } from "express";
import { createIndustry } from "../services/developer/createIndustry";
import prisma from "../prisma";

export class IndustryController {
  async createIndustry(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const result = await createIndustry(name);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getIndustry(req: Request, res: Response) {
    try {
      const result = await prisma.industry.findMany();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}
