import { Request, Response } from "express";
import { createJob } from "../services/job/createJob";
import { deleteJob } from "../services/job/deleteJob";
import { getJobs } from "../services/job/getJobs";
import { getJobById } from "../services/job/getJobById";
import { getCompanyJobs } from "../services/job/getCompanyJob";
import { togglePublishJob } from "../services/job/togglePublishJob";
import { updateJob } from "../services/job/updateJob";
import { createJobSchema, updateJobSchema } from "../validation/jobValidation";

export class JobController {
  async create(req: Request, res: Response) {
    try {
      const companyId = req.company?.id;
      if (!companyId) throw { status: 400, message: "Unauthorized" };

      const validatedData = await createJobSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const jobData = {
        ...validatedData,
        companyId: companyId as string,
        isPublished: req.body.isPublished ?? false,
      };
      const job = await createJob(jobData);

      res.status(200).json(job);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getJobs(req: Request, res: Response) {
    try {
      const {
        city,
        category,
        tags,
        isPublished,
        page = "1",
        size = "10",
        minSalary,
        maxSalary,
      } = req.query;

      const parsedTags = typeof tags === "string" ? tags.split(",") : [];

      const jobsResult = await getJobs({
        city: city as string,
        category: category as string,
        tags: parsedTags as string[],
        isPublished: isPublished === "false" ? false : true,
        page: parseInt(page as string),
        size: parseInt(size as string),
        minSalary: minSalary ? parseInt(minSalary as string) : undefined,
        maxSalary: maxSalary ? parseInt(maxSalary as string) : undefined,
      });

      res.status(200).json(jobsResult);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await getJobById(id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getCompanyJobs(req: Request, res: Response) {
    try {
      const companyId = req.company?.id;
      if (!companyId) throw { status: 401, message: "Unauthorized" };

      const { page = "1", size = "10" } = req.query;

      const result = await getCompanyJobs({
        companyId,
        page: parseInt(page as string),
        size: parseInt(size as string),
      });

      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async togglePublish(req: Request, res: Response) {
    try {
      const companyId = req.company?.id;
      if (!companyId) throw { status: 401, message: "Unauthorized" };

      const { id } = req.params;
      const { isPublished } = req.body;

      if (typeof isPublished !== "boolean") {
        throw { status: 400, message: "`isPublished` must be a boolean" };
      }

      const result = await togglePublishJob(id, companyId, isPublished);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const companyId = req.company?.id;
      if (!companyId) throw { status: 401, message: "Unauthorized" };

      const { id } = req.params;
      const validatedData = await updateJobSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const result = await updateJob(id, companyId, validatedData);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.name === "ValidationError") {
        res.status(400).json({
          message: "Validation failed",
          errors: error.errors,
        });
        return;
      }

      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const companyId = req.company?.id;
      if (!companyId) throw { status: 400, message: "Unauthorized" };
      const { id } = req.params;

      const job = await deleteJob(id, companyId);
      res.status(200).json(job);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}
