import { Request, Response } from "express";
import { registerCompany } from "../services/company/registerCompany";
import { loginCompany } from "../services/company/loginCompany";
import { verifyCompanyAccount } from "../services/company/verifyCompany";
import { requestPasswordReset } from "../services/company/requestReset";
import { passwordReset } from "../services/company/passwordReset";
import { registerCompanySchema } from "../validation/authValidation";
import { getCompanyProfile } from "../services/company/profile";
import { updateProfileSchema } from "../validation/companyValidation";
import updateCompanyProfile from "../services/company/updateProfile";
import { getAllCompaniesService } from "../services/company/getAllCompany";
import { getCompanyDetailService } from "../services/company/getCompanyDetail";
import { updateCompanyLogoService } from "../services/company/updateLogo";
import { getCompanyJobsService } from "../services/company/getCompanyJobs";

export class CompanyController {
  async register(req: Request, res: Response) {
    try {
      const validateData = await registerCompanySchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      const result = await registerCompany(validateData);

      res.status(201).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async verify(req: Request, res: Response) {
    try {
      console.log(req.user?.id);
      
      const result = await verifyCompanyAccount(req.user?.id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await loginCompany(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await requestPasswordReset(email);
      res.status(200).json(result);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async passwordReset(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      const { newPassword } = req.body;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res
          .status(400)
          .json({ message: "Authorization token is missing or invalid" });
        return;
      }

      const token = authHeader.split(" ")[1];

      const result = await passwordReset(token, newPassword);
      res.status(200).json(result);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async profile(req: Request, res: Response) {
    try {
      const profile = await getCompanyProfile(req.company?.id!);
      res.status(200).send({
        message: "Profile fetched successfully",
        profile,
      });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const companyId = req.company?.id;
      if (!companyId) throw { statusCode: 400, message: "Unauthorized" };

      const validatedData = await updateProfileSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const updated = await updateCompanyProfile(companyId, validatedData);

      res.status(200).json({
        message: "Profile updated successfully",
        data: updated,
      });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async getAllCompanies(req: Request, res: Response) {
    try {
      const { name, city, industryId } = req.query;

      const companies = await getAllCompaniesService({
        name: name as string,
        city: city as string,
        industryId: industryId as string,
      });

      res.status(200).send({
        message: "Companies fetched successfully",
        data: companies,
      });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }
  async getCompanyDetail(req: Request, res: Response) {
    try {
      const { id: companyId } = req.params;

      const company = await getCompanyDetailService(companyId);

      if (!company) {
        res.status(404).send({ message: "Company not found" });
        return;
      }

      res.status(200).send({
        message: "Company fetched successfully",
        data: company,
      });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async updateLogo(req: Request, res: Response) {
    try {
      const companyId = req.company?.id;

      if (!companyId) {
        res.status(400).send({ message: "Unauthorized" });
        return;
      }

      const secure_url = await updateCompanyLogoService(companyId, req.file!);

      res
        .status(200)
        .send({ message: "Logo updated successfully", secure_url });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async getCompanyJobs(req: Request, res: Response) {
    try {
      const { id: companyId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await getCompanyJobsService({ companyId, page, limit });

      res.status(200).send({
        message: "Jobs fetched successfully",
        jobs: result.jobs,
        pagination: result.pagination,
      });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }
}
