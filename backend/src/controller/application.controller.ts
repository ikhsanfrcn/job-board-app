import { Request, Response } from "express";
import { cloudinaryUpload } from "../helpers/cloudinary";
import { createApplication } from "../services/application/createApplication";
import { getUserApplications } from "../services/application/getApplication";
import prisma from "../prisma";

export class ApplicationController {
  async createApplication(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!req.file) throw { status: 400, message: "Resume file is required" };
      const { jobId, expectedSalary } = req.body;

      const { secure_url } = await cloudinaryUpload(
        req.file,
        "JobsDoors",
        "raw"
      );
      const applicationData = {
        userId: userId as string,
        jobId,
        expectedSalary,
        cvUrl: secure_url,
      };
      const application = await createApplication(applicationData);
      res.status(200).json({ application, secure_url });
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getUserApplications(req: Request, res: Response) {
    try {
      const userId = req.user?.id as string;

      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;

      const application = await getUserApplications({ userId, page, pageSize });

      res.status(200).json(application);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getCompanyApplications(req: Request, res: Response) {
    try {
      const { id: jobId } = req.params;
      const companyId = req.company?.id;
      const { status } = req.query;
      const filter: any = {};

      if (status) {
        filter.status = status as string;
      }

      const applications = await prisma.application.findMany({
        where: {
          ...filter,
          jobId,
          job: {
            companyId: companyId,
          },
        },
        include: {
          user: {
            include: {
              userTest: {
                where: {
                  jobId: jobId,
                },
                select: {
                  id: true,
                  correctAnswers: true,
                  totalQuestions: true,
                  scorePercentage: true,
                  completedAt: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.status(200).send({
        message: "Applications fetched successfully",
        applications,
      });
    } catch (err) {
      console.error(err);
      res.status(404).send(err);
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const companyId = req.company?.id;
      const { status } = req.body;
      const application = await prisma.application.update({
        where: {
          id,
          job: {
            companyId,
          },
        },
        data: { status },
      });
      res
        .status(200)
        .send({ message: "Status updated successfully", application });
    } catch (err) {
      console.error(err);
      res.status(404).send(err);
    }
  }
}
