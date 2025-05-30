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
      if (!test) throw { message: "No test found!" };

      // ✅ Ensure questions are parsed correctly
      let questions: Question[] = [];
      if (typeof test.questions === "string") {
        // If stored as a formatted string, parse accordingly
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
      console.log(err);
      res.status(400).send(err);
    }
  }

  async createTest(req: Request, res: Response) {
    try {
      const { jobId, title, description, questions } = req.body;

      // Ensure jobId is unique
      const existingTest = await prisma.test.findUnique({ where: { jobId } });
      if (existingTest) throw { message: "Test already exists for this job!" };

      // ✅ Store questions as a proper JSON object
      const test = await prisma.test.create({
        data: { jobId, title, description, questions },
      });

      res.status(201).json({ message: "Test created ✅", test });
    } catch (err) {
      console.log(err);
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

      // Fetch the original test questions from DB
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

      // Compare answers with correct ones
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

      // Save to UserTest
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
}
