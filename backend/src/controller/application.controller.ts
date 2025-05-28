import { Request, Response } from "express";
import { cloudinaryUpload } from "../helpers/cloudinary";
import { createApplication } from "../services/application/createApplication";
import { getUserApplications } from "../services/application/getApplication";

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
}
