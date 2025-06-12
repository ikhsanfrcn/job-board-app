import { Request, Response } from "express";
import prisma from "../prisma";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import ejs from "ejs";
import puppeteer from "puppeteer";
import { cloudinaryUpload } from "../helpers/cloudinary";

export class SkillAssessmentController {
  async createAssessment(req: Request, res: Response) {
    try {
      if (!req.file) throw { message: "Image Empty!" };
      const { title, description, category, questions } = req.body;
      const { secure_url } = await cloudinaryUpload(
        req.file,
        "jobsdoors",
        "image"
      );
      const parsedQUestions = JSON.parse(questions);

      const newAssessment = await prisma.skillAssessmentTemplate.create({
        data: {
          title,
          description,
          category,
          questions: parsedQUestions,
          badgeImage: secure_url,
        },
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
      const assessments = await prisma.skillAssessmentTemplate.findMany({ orderBy: { createdAt: "asc" } });

      res.status(200).json(assessments);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }

  async getAssessmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const assessment = await prisma.skillAssessmentTemplate.findUnique({
        where: { id },
      });

      if (!assessment) throw { message: "Assessment template not found!" };

      res.status(200).json(assessment);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }

  async editAssessment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, category, questions } = req.body;

      let badgeImagePath = undefined;
      if (req.file) {
        const { secure_url } = await cloudinaryUpload(
          req.file,
          "jobsdoors",
          "image"
        );
        badgeImagePath = secure_url;
      }

      const existingAssessment =
        await prisma.skillAssessmentTemplate.findUnique({ where: { id } });

      if (!existingAssessment) throw { message: "Assessment not found" };

      const updateData: any = {
        title,
        description,
        category,
        questions: JSON.parse(questions),
        updatedAt: new Date(),
      };

      if (badgeImagePath) {
        updateData.badgeImage = badgeImagePath;
      }

      const updatedAssessment = await prisma.skillAssessmentTemplate.update({
        where: { id },
        data: updateData,
      });

      res.status(200).json({
        message: "Assessment updated successfully✅",
        updatedAssessment,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  async deleteAssessment(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingAssessment =
        await prisma.skillAssessmentTemplate.findUnique({ where: { id } });
      if (!existingAssessment) throw { message: "Assessment not found" };

      await prisma.skillAssessmentTemplate.delete({ where: { id } });

      res.status(200).json({ message: "Assessment deleted successfully✅" });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  async getAssessmentByTemplateId(req: Request, res: Response) {
    try {
      const { templateId } = req.params;
      const assessment = await prisma.skillAssessmentTemplate.findUnique({
        where: { id: templateId },
      });

      if (!assessment) throw { message: "Assessment template not found!" };

      res.status(200).json(assessment);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }

  async startAssessment(req: Request, res: Response) {
    try {
      const { templateId } = req.params;
      const userId = req.user?.id;
      if (!userId) throw { message: "User not found!" };

      const existingSession = await prisma.assessmentSession.findFirst({
        where: {
          userId,
          templateId,
          isActive: true,
          expiresAt: { gt: new Date() },
        },
      });

      if (existingSession) {
        res.status(200).json({
          sessionToken: existingSession.sessionToken,
          timeRemaining: existingSession.timeRemaining,
          currentQuestionIndex: existingSession.currentQuestionIndex,
          answers: existingSession.answers,
        });
        return;
      }

      const template = await prisma.skillAssessmentTemplate.findUnique({
        where: { id: templateId },
      });

      if (!template) throw { message: "Assessment not found!" };

      const sessionToken = uuidv4();
      const expiresAt = new Date(Date.now() + template.timeLimit * 1000);

      const newSession = await prisma.assessmentSession.create({
        data: {
          userId,
          templateId,
          sessionToken,
          timeRemaining: template.timeLimit,
          currentQuestionIndex: 0,
          answers: {},
          expiresAt,
          isActive: true,
        },
      });

      res.status(201).json({
        sessionToken: newSession.sessionToken,
        timeRemaining: newSession.timeRemaining,
        currentQuestionIndex: 0,
        answers: {},
      });
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }

  async saveProgress(req: Request, res: Response) {
    try {
      const { sessionToken, answers, currentQuestionIndex, timeRemaining } =
        req.body;
      const userId = req.user?.id;

      const session = await prisma.assessmentSession.findUnique({
        where: { sessionToken },
      });

      if (!session || !session.isActive || session.userId !== userId)
        throw { message: "Invalid session!" };

      const updateSession = await prisma.assessmentSession.update({
        where: { sessionToken },
        data: {
          answers,
          currentQuestionIndex,
          timeRemaining,
          updatedAt: new Date(),
        },
      });

      res.status(201).json(updateSession);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }

  async submitAssessment(req: Request, res: Response) {
    try {
      const { sessionToken, answers } = req.body;
      const userId = req.user?.id;

      const session = await prisma.assessmentSession.findUnique({
        where: { sessionToken },
        include: { template: true },
      });

      if (!session || !session.isActive || session.userId !== userId)
        throw { message: "Invalid session!" };

      let questions = session.template.questions;
      if (typeof questions === "string") {
        try {
          questions = JSON.parse(questions);
        } catch (e) {
          throw { message: "Failed to parse questions." };
        }
      }
      if (!Array.isArray(questions)) {
        throw { message: "Questions are not in array format." };
      }
      const correctAnswers = questions.filter(
        (q: any, i: number) => q.answer === answers[i]
      ).length;

      const score = Math.round((correctAnswers / questions.length) * 100);
      const isPassed = score >= session.template.passingScore;
      const timeSpent = session.template.timeLimit - session.timeRemaining;

      const result = await prisma.skillAssessment.create({
        data: {
          userId,
          templateId: session.templateId,
          score,
          totalPoints: session.template.totalPoints,
          isPassed,
          timeSpent,
          answers,
          startedAt: session.createdAt,
          completedAt: new Date(),
        },
      });

      await prisma.assessmentSession.update({
        where: { sessionToken },
        data: { isActive: false },
      });

      res.status(201).json({
        score,
        isPassed,
        correctAnswers,
        totalQuestions: questions.length,
        timeSpent,
        result,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  async getUserAssessments(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      const userAssessments = await prisma.skillAssessment.findMany({
        where: { userId },
        include: {
          template: { select: { title: true, category: true } },
          user: {
            select: {
              email: true,
              username: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      res.status(200).send({
        message: "User assessments fetched successfully✅",
        userAssessments,
      });
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  }

  async generatePdf(req: Request, res: Response) {
    const userId = req.user?.id;
    const assessmentId = req.params.id;

    try {
      const assessment = await prisma.skillAssessment.findUnique({
        where: { id: assessmentId },
        include: {
          template: true,
          user: true,
        },
      });

      if (!assessment || assessment.userId !== userId) {
        res
          .status(404)
          .send({ message: "Assessment not found or unauthorized" });
        return;
      }

      const templatePath = path.join(
        __dirname,
        "../templates/certificateGenerate.ejs"
      );

      const html = await ejs.renderFile(templatePath, {
        userName: assessment.user.firstName + " " + assessment.user.lastName,
        assessmentTitle: assessment.template.title,
        score: assessment.score,
        totalPoints: assessment.totalPoints,
        completedAt: assessment.completedAt,
      });

      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20mm",
          bottom: "20mm",
          left: "15mm",
          right: "15mm",
        },
      });

      await browser.close();

      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${assessment.user.username}_certificate.pdf"`,
      });

      res.status(200).send(pdfBuffer);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
}
