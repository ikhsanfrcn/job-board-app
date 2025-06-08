import { Request, Response } from "express";
import prisma from "../prisma";
import { v4 as uuidv4 } from "uuid";

export class SkillAssessmentController {
  async createAssessment(req: Request, res: Response) {
    try {
      const { title, description, category, questions } = req.body;

      const newAssessment = await prisma.skillAssessmentTemplate.create({
        data: { title, description, category, questions },
      });

      res
        .status(201)
        .json({ message: "Skill assessment created ✅", newAssessment });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  async getAllAssessment(req: Request, res: Response) {
    try {
      const templates = await prisma.skillAssessmentTemplate.findMany();

      res.status(200).json(templates);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }

  async startAssessment(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) throw { message: "User not found!" };
      const { templateId } = req.body;
      const sessionToken = uuidv4();
      const newSession = await prisma.assessmentSession.create({
        data: {
          userId,
          templateId,
          sessionToken,
          answers: {},
          timeRemaining: 1800,
          expiresAt: new Date(Date.now() + 1800000),
        },
      });
      res.status(201).json({ sessionToken, newSession });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  async updateSessionTime(req: Request, res: Response) {
    try {
      const { sessionToken, timeRemaining } = req.body;
      const session = await prisma.assessmentSession.update({
        where: { sessionToken },
        data: { timeRemaining },
      });
      res.status(200).json(session);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  async resumeAssessment(req: Request, res: Response) {
    try {
      const { sessionToken } = req.body;
      const session = await prisma.assessmentSession.findUnique({
        where: { sessionToken },
      });
      if (!session || !session.isActive)
        throw { message: "Session expired or invalid!" };
      res
        .status(200)
        .json({
          timeRemaining: session.timeRemaining,
          currentQuestionIndex: session.currentQuestionIndex,
          answers: session.answers,
        });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  async submitAssessment(req: Request, res: Response) {
    try {
      const { sessionToken, answers } = req.body;
      const session = await prisma.assessmentSession.findUnique({
        where: { sessionToken },
      });
      if (!session || !session.isActive) throw { message: "Invalid session!" };
      const template = await prisma.skillAssessmentTemplate.findUnique({
        where: { id: session.templateId },
      });
      if (!template) throw { message: "Template not found!" };

      let score = calculateScore(answers, template?.questions);
      let isPassed = score >= template?.passingScore;
      await prisma.skillAssessment.create({
        data: {
          userId: session.userId,
          templateId: session.templateId,
          score,
          totalPoints: template?.totalPoints,
          isPassed,
          timeSpent: template?.timeLimit - session.timeRemaining,
          answers,
          startedAt: session.createdAt,
          completedAt: new Date(),
        },
      });
      await prisma.assessmentSession.update({
        where: { id: session.id },
        data: { isActive: false },
      });
      res.status(200).json({});
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}

function calculateScore(answers: any, questions: any) {
  // Simple scoring logic (Adjust as needed)
  if (!answers || typeof answers !== "object") return 0;
  if (!questions || typeof questions !== "object") return 0;
  let correctAnswers = Object.values(answers).filter(
    (ans: any) => ans && ans.isCorrect
  ).length;
  let totalQuestions = Object.keys(questions).length || 1;
  return Math.round((correctAnswers / totalQuestions) * 100);
}
