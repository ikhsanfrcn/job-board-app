import { Request, Response } from "express";
import prisma from "../prisma";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export class TestController {
  async getAllTest(req: Request, res: Response) {
    try {
      const tests = await prisma.test.findMany();
      res.status(200).send({ tests });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async getTest(req: Request, res: Response) {
    try {
      const { jobId } = req.params;
      const test = await prisma.test.findUnique({ where: { jobId } });
      if (!test) throw { message: "No test found!" };

      let questions: Question[] = [];
      if (typeof test.questions === "string") {
        questions = test.questions
          .split("||")
          .filter(Boolean)
          .map((q: string) => {
            const [question, options, answer] = q.split("|");
            return {
              question,
              options: options ? options.split(";") : [],
              answer,
            };
          });
      } else if (Array.isArray(test.questions)) {
        questions = test.questions as unknown as Question[];
      }
      const parsedTest = { ...test, questions };

      res.status(200).json(parsedTest);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async createTest(req: Request, res: Response) {
    try {
      const { jobId, title, description, questions } = req.body;

      const existingTest = await prisma.test.findUnique({ where: { jobId } });
      if (existingTest) throw { message: "Test already exists for this job!" };

      const result = await prisma.$transaction(async (tx) => {
        const test = await tx.test.create({
          data: {
            jobId,
            title,
            description,
            questions,
            isActive: true,
          },
        });

        await tx.job.update({
          where: { id: jobId },
          data: { isTestActive: true },
        });

        return test;
      });

      res.status(201).json({ message: "Test created", test: result });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async submitUserTest(req: Request, res: Response) {
    try {
      const { userId, jobId, answers } = req.body;

      if (!userId || !jobId || !Array.isArray(answers)) {
        console.error("Invalid test submission body:", req.body);
        throw { message: "Invalid request body" };
      }

      const test = await prisma.test.findUnique({
        where: { jobId },
      });

      if (!test) throw { message: "Test not found" };

      const parsedQuestions =
        typeof test.questions === "string"
          ? JSON.parse(test.questions)
          : test.questions;

      const totalQuestions = parsedQuestions.length;

      let correctAnswers = 0;

      answers.forEach(({ question, selected }) => {
        const original = parsedQuestions.find(
          (q: any) => q.question === question
        );
        if (
          original?.answer?.trim().toLowerCase() ===
          selected?.trim().toLowerCase()
        ) {
          correctAnswers++;
        }
      });

      const scorePercentage = parseFloat(
        ((correctAnswers / totalQuestions) * 100).toFixed(2)
      );

      const savedResult = await prisma.userTest.create({
        data: {
          userId,
          jobId,
          correctAnswers,
          totalQuestions,
          scorePercentage,
        },
      });

      return res.status(201).json({
        message: "Test submitted successfully",
        result: savedResult,
      });
    } catch (err) {
      console.error(err);
      return res.status(400).json(err);
    }
  }

  async activateTest(req: Request, res: Response) {
    try {
      const { jobId } = req.params;
      const companyId = req.user?.id;

      const job = await prisma.job.findFirst({
        where: { id: jobId, companyId: companyId },
        include: { test: true },
      });

      if (!job) throw { message: "Job not found!" };
      if (job.test?.isActive) throw { message: "Test already active" };

      await prisma.test.update({
        where: { jobId: jobId },
        data: { isActive: true },
      });

      await prisma.job.update({
        where: { id: jobId },
        data: { isTestActive: true },
      });

      return res.status(200).send({ message: "Test activated successfully" });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async deactivateTest(req: Request, res: Response) {
    try {
      const { jobId } = req.params;
      const companyId = req.user?.id;

      const job = await prisma.job.findFirst({
        where: { id: jobId, companyId: companyId },
        include: { test: true },
      });

      if (!job) throw { message: "Job not found!" };
      if (!job.test) throw { message: "No test found for this job!" };
      if (!job.test.isActive) throw { message: "Test is already inactive" };

      await prisma.test.update({
        where: { jobId: jobId },
        data: { isActive: false },
      });

      await prisma.job.update({
        where: { id: jobId },
        data: { isTestActive: false },
      });

      return res.status(200).send({ message: "Test deactivate successfully" });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async checkIsTestActive(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const test = await prisma.job.findUnique({
        where: {
          id,
          isTestActive: true,
        },
      });
      res.status(200).json({ isTestActive: !!test });
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}
