import { Request, Response } from "express";
import { cloudinaryUpload } from "../helpers/cloudinary";
import { createApplication } from "../services/application/createApplication";
import {
  getCompanyApplicationsService,
  getUserApplications,
} from "../services/application/getApplication";
import prisma from "../prisma";
import { sendApplicationStatusEmail } from "../utils/mailer";

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

      const { status, page = "1", limit = "10" } = req.query;

      if (!companyId) {
        res.status(400).json({ message: "Company ID is missing" });
        return;
      }

      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);

      const { applications, total } = await getCompanyApplicationsService({
        jobId,
        companyId,
        status: status as string,
        page: pageNumber,
        limit: limitNumber,
      });

      res.status(200).send({
        message: "Applications fetched successfully",
        applications,
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Failed to fetch applications",
        error: err,
      });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const companyId = req.company?.id;
      const { status, reason } = req.body;

      const existingApplication = await prisma.application.findUnique({
        where: { id },
        include: {
          job: {
            include: {
              company: true,
            },
          },
        },
      });

      if (!existingApplication) {
        res.status(404).json({ message: "Application not found" });
        return;
      }

      if (existingApplication.job.company.id !== companyId) {
        res.status(403).json({ message: "Unauthorized" });
        return;
      }

      if (status === "REJECTED" && !reason) {
        res.status(400).json({ message: "Reason is required for rejection" });
        return;
      }

      const updatedApplication = await prisma.application.update({
        where: { id },
        data: { status },
        include: {
          user: true,
          job: {
            include: { company: true },
          },
        },
      });

      if (["OFFERED", "ACCEPTED", "REJECTED"].includes(status)) {
        const email = updatedApplication.user.email;
        const subject = `Your application has been ${status.toLowerCase()}`;
        const templateName = status.toLowerCase();

        const templateData: Record<string, string> = {
          name: updatedApplication.user.username,
          jobTitle: updatedApplication.job.title,
          companyName: updatedApplication.job.company.name,
        };

        if (status === "REJECTED") {
          templateData.reason = reason || "No reason provided";
        }

        await sendApplicationStatusEmail({
          email,
          subject,
          templateName,
          templateData,
        });
      }

      res.status(200).json({
        message: "Status updated successfully",
        application: updatedApplication,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred", error: err });
    }
  }
}
