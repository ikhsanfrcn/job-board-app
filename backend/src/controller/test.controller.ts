import { Request, Response } from "express";
import prisma from "../prisma";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export class TestController {
  async getTest(req: Request, res: Response) {
    try {
      const { jobId } = req.params;      
      
      const test = await prisma.test.findUnique({ where: { jobId } });

      res.status(200).json(test || { message: "No test found!" });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async createTest(req: Request, res: Response) {
    try {
      const { jobId, title, description, questions } = req.body;

      // Ensure jobId is unique
      const existingTest = await prisma.test.findUnique({ where: { jobId } });
      if (existingTest) throw ({ message: "Test already exists for this job!" });

      // Store questions as a formatted string
      const formattedQuestions = (questions as Question[])
        .map(
          (q: Question) => `${q.question}|${q.options.join(";")}|${q.answer}`
        )
        .join("||");

      const test = await prisma.test.create({
        data: { jobId, title, description, questions: formattedQuestions },
      });

      res.status(201).json({ message: "Test created ✅" });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
