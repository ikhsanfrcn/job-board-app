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

  async getAssessmentById(req: Request, res: Response) {
    try {
      const { templateId } = req.params;
      const template = await prisma.skillAssessmentTemplate.findUnique({
        where: { id: templateId },
      });

      if (!template) throw { message: "Assessment template not found!" };

      res.status(200).json(template);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }

  async startAssessment(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) throw { message: "User not found!" };
      const { templateId } = req.params;
      // ✅ Validate template existence
      const template = await prisma.skillAssessmentTemplate.findUnique({
        where: { id: templateId },
      });

      if (!template) throw { message: "Assessment template not found!" };

      // ✅ Check if user has an active session for this template
      const existingSession = await prisma.assessmentSession.findFirst({
        where: {
          userId,
          templateId,
          isActive: true,
        },
      });

      if (existingSession) {
        // ✅ Return existing session instead of creating new one
        console.log("🔄 Returning existing active session");
        res.status(200).json({
          sessionToken: existingSession.sessionToken,
          existingSession: existingSession,
          isResuming: true,
        });
        return;
      }

      // ✅ Create new session only if no active session exists
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
      res.status(201).json({ sessionToken, newSession, isResuming: false });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  async updateSessionProgress(req: Request, res: Response) {
    try {
      const { sessionToken, currentQuestionIndex, answers, timeRemaining } =
        req.body;

      if (!sessionToken) throw { message: "Session token is required!" };

      const session = await prisma.assessmentSession.findUnique({
        where: { sessionToken },
      });

      if (!session || !session.isActive) {
        throw { message: "Session expired or invalid!" };
      }

      // ✅ Update session with current progress
      const updatedSession = await prisma.assessmentSession.update({
        where: { sessionToken },
        data: {
          currentQuestionIndex:
            currentQuestionIndex ?? session.currentQuestionIndex,
          answers: answers ?? session.answers,
          timeRemaining: timeRemaining ?? session.timeRemaining,
          updatedAt: new Date(),
        },
      });

      res.status(200).json({
        message: "Session progress updated",
        session: updatedSession,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  async updateSessionTime(req: Request, res: Response) {
    try {
      const { sessionToken, timeRemaining } = req.body;

      const session = await prisma.assessmentSession.findUnique({
        where: { sessionToken },
      });

      if (!session || !session.isActive)
        throw { message: "Session expired or invalid!" };

      const updatedSession = await prisma.assessmentSession.update({
        where: { sessionToken },
        data: { timeRemaining, updatedAt: new Date() },
      });
      res.status(200).json(updatedSession);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  async resumeAssessment(req: Request, res: Response) {
    try {
      const { sessionToken } = req.params;
      if (!sessionToken) throw { message: "Session token is required!" };
      const session = await prisma.assessmentSession.findUnique({
        where: { sessionToken },
        include: { template: true },
      });
      if (!session || !session.isActive)
        throw { message: "Session expired or invalid!" };
      // ✅ Check if session has expired based on time
      if (session.timeRemaining <= 0) {
        await prisma.assessmentSession.update({
          where: { id: session.id },
          data: { isActive: false },
        });
        throw { message: "Session has expired!" };
      }
      res.status(200).json({
        timeRemaining: session.timeRemaining,
        currentQuestionIndex: session.currentQuestionIndex || 0,
        answers: session.answers || {},
        template: session.template,
        sessionToken: session.sessionToken,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  // ✅ NEW: Get active session for user and template
  async getActiveSession(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { templateId } = req.params;

      if (!userId) throw { message: "User not found!" };

      const activeSession = await prisma.assessmentSession.findFirst({
        where: {
          userId,
          templateId,
          isActive: true,
        },
        include: {
          template: true,
        },
      });

      if (!activeSession) {
        res.status(404).json({ message: "No active session found" });
        return;
      }

      // ✅ Check if session has expired
      if (activeSession.timeRemaining <= 0) {
        await prisma.assessmentSession.update({
          where: { id: activeSession.id },
          data: { isActive: false },
        });
        res.status(404).json({ message: "Session has expired" });
        return;
      }

      res.status(200).json({
        sessionToken: activeSession.sessionToken,
        timeRemaining: activeSession.timeRemaining,
        currentQuestionIndex: activeSession.currentQuestionIndex || 0,
        answers: activeSession.answers || {},
        template: activeSession.template,
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
      let isPassed = score >= (template?.passingScore || 75);
      const assessmentResult = await prisma.skillAssessment.create({
        data: {
          userId: session.userId,
          templateId: session.templateId,
          score,
          totalPoints: template?.totalPoints || 100,
          isPassed,
          timeSpent: (template?.timeLimit || 1800) - session.timeRemaining,
          answers,
          startedAt: session.createdAt,
          completedAt: new Date(),
        },
      });
      await prisma.assessmentSession.update({
        where: { id: session.id },
        data: { isActive: false },
      });
      res.status(200).json({
        message: "Assessment submitted successfully",
        result: assessmentResult,
        score,
        isPassed,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}

function calculateScore(answers: any, questions: any) {
  // ✅ Improved scoring logic
  if (!answers || typeof answers !== "object") return 0;
  if (!questions) return 0;

  // Parse questions if they're stored as JSON string
  let parsedQuestions = questions;
  if (typeof questions === "string") {
    try {
      parsedQuestions = JSON.parse(questions);
    } catch (e) {
      console.error("Error parsing questions:", e);
      return 0;
    }
  }

  if (!Array.isArray(parsedQuestions)) return 0;

  let correctAnswers = 0;

  // If answers is an array (from frontend)
  if (Array.isArray(answers)) {
    correctAnswers = answers.filter((ans: any) => ans && ans.isCorrect).length;
  } else {
    // If answers is an object
    correctAnswers = Object.values(answers).filter(
      (ans: any) => ans && ans.isCorrect
    ).length;
  }

  const totalQuestions = parsedQuestions.length || 1;
  return Math.round((correctAnswers / totalQuestions) * 100);
}
