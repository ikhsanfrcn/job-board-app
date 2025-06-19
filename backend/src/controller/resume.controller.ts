import { Request, Response } from "express";
import prisma from "../prisma";
import path from "path";
import ejs from "ejs";
import puppeteer from "puppeteer";

export class ResumeController {
  async createResume(req: Request, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    const {
      summary,
      workExperience = [],
      education = [],
      leadership = [],
      additional = [],
    } = req.body;

    try {
      const resume = await prisma.userResume.create({
        data: {
          summary,
          user: { connect: { id: userId } },
          workExperience: {
            create: workExperience.map((job: any) => ({
              company: job.company,
              description: job.description,
              employmentType: job.employmentType,
              startDate: job.startDate,
              endDate: job.endDate ? job.endDate : null,
              jobdesc: {
                connectOrCreate: {
                  where: { name: job.jobdesc.name },
                  create: { name: job.jobdesc.name },
                },
              },
            })),
          },
          education: {
            create: education.map((edu: any) => ({
              schoolName: edu.schoolName,
              degree: edu.degree,
              fieldOfStudy: edu.fieldOfStudy,
              startDate: edu.startDate,
              endDate: edu.endDate ? edu.endDate : null,
            })),
          },
          leadership: {
            create: leadership.map((lead: any) => ({
              organization: lead.organization,
              role: lead.role,
              description: lead.description,
              startDate: lead.startDate,
              endDate: lead.endDate,
            })),
          },
          additional: {
            create: additional.map((add: any) => ({
              category: add.category,
              items: add.items,
              description: add.description,
            })),
          },
        },
        include: {
          workExperience: {
            include: {
              jobdesc: true,
            },
          },
          education: true,
          leadership: true,
          additional: true,
        },
      });

      res
        .status(200)
        .send({ message: "Resume created successfully", resume });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  async getUserResume(req: Request, res: Response) {
    const userId = req.user?.id;
    try {
      const resume = await prisma.userResume.findUnique({
        where: { userId },
        include: {
          workExperience: {
            include: {
              jobdesc: true,
            },
          },
          education: true,
          leadership: true,
          additional: true,
        },
      });
      res
        .status(200)
        .send({ message: "Resume fetched successfully", resume });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }

  async updateResume(req: Request, res: Response) {
    const userId = req.user?.id;

    const {
      summary,
      workExperience = [],
      education = [],
      leadership = [],
      additional = [],
    } = req.body;

    try {
      const resume = await prisma.userResume.update({
        where: {
          userId,
        },
        data: {
          summary,
          workExperience: {
            deleteMany: {},
            create: workExperience.map((job: any) => ({
              company: job.company,
              description: job.description,
              employmentType: job.employmentType,
              startDate: job.startDate,
              endDate: job.endDate ?? null,
              jobdesc: {
                connectOrCreate: {
                  where: { name: job.jobdesc.name },
                  create: { name: job.jobdesc.name },
                },
              },
            })),
          },
          education: {
            deleteMany: {},
            create: education.map((edu: any) => ({
              schoolName: edu.schoolName,
              degree: edu.degree,
              fieldOfStudy: edu.fieldOfStudy,
              startDate: edu.startDate,
              endDate: edu.endDate ?? null,
            })),
          },
          leadership: {
            deleteMany: {},
            create: leadership.map((lead: any) => ({
              organization: lead.organization,
              role: lead.role,
              description: lead.description,
              startDate: lead.startDate,
              endDate: lead.endDate,
            })),
          },
          additional: {
            deleteMany: {},
            create: additional.map((add: any) => ({
              category: add.category,
              items: add.items,
              description: add.description,
            })),
          },
        },
        include: {
          workExperience: {
            include: {
              jobdesc: true,
            },
          },
          education: true,
          leadership: true,
          additional: true,
        },
      });

      res.status(200).send({
        message: "Resume updated successfully",
        resume,
      });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  async generatePdf(req: Request, res: Response) {
    const userId = req.user?.id;

    try {
      const resume = await prisma.userResume.findUnique({
        where: { userId },
        include: {
          workExperience: { include: { jobdesc: true } },
          education: true,
          leadership: true,
          additional: true,
          user: true,
        },
      });

      if (!resume) {
        res.status(404).send({ message: "Resume not found" });
        return;
      }

      const templatePath = path.join(
        __dirname,
        "..",
        "templates",
        "cvGenerate.ejs"
      );

      const html = await ejs.renderFile(templatePath, {
        resume,
        user: resume.user,
      });

      const browser = await puppeteer.launch({
        headless: true,
      });

      const page = await browser.newPage();
      await page.setContent(html, {
        waitUntil: "networkidle0",
      });

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
      });

      await browser.close();

      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
        "Content-Length": pdfBuffer.length,
      });

      res.status(200).send(pdfBuffer);
      return;
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
}
