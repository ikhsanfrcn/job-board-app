import { Request, Response } from "express";
import { registerCompany } from "../services/company/registerCompany";
import { loginCompany } from "../services/company/loginCompany";
import { verifyCompanyAccount } from "../services/company/verifyCompany";
import { requestPasswordReset } from "../services/company/requestReset";
import { passwordReset } from "../services/company/passwordReset";
import { registerCompanySchema } from "../validation/authValidation";
import { getCompanyProfile } from "../services/company/profile";
import prisma from "../prisma";
import { cloudinaryUpload } from "../helpers/cloudinary";

export class CompanyController {
  async register(req: Request, res: Response) {
    try {
      const validateData = await registerCompanySchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      const result = await registerCompany(validateData);

      res.status(201).json(result);
    } catch (err: any) {
      res.status(err.status || 500).json({ message: err.message });
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const result = await verifyCompanyAccount(req.company?.id);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(err.status || 500).json({ message: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await loginCompany(email, password);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(err.status || 500).json({ message: err.message });
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
        message: "Profile fetched successfully✅",
        profile,
      });
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const companyId = req.company?.id;
      const {
        name,
        about,
        country,
        state,
        city,
        zipCode,
        regionNumber,
        phoneNumber,
        address,
        website,
        logo,
        latitude,
        longitude,
        industryId,
      } = req.body;

      const updated = await prisma.company.update({
        where: { id: companyId },
        data: {
          name,
          about,
          country,
          state,
          city,
          zipCode,
          regionNumber,
          phoneNumber,
          address,
          website,
          logo,
          latitude,
          longitude,
          industryId,
        },
      });

      res
        .status(200)
        .send({ message: "Profile updated successfully ✅", data: updated });
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  }

  async getAllCompanies(req: Request, res: Response) {
    try {
      const { name, city, industryId } = req.query;

      const filters: any = {};

      if (name) {
        filters.name = { contains: name as string, mode: "insensitive" };
      }
      if (city) {
        filters.city = { contains: city as string, mode: "insensitive" };
      }
      if (industryId) {
        filters.industryId = industryId as string;
      }

      const companies = await prisma.company.findMany({
        where: filters,
        select: {
          id: true,
          name: true,
          about: true,
          country: true,
          state: true,
          city: true,
          zipCode: true,
          regionNumber: true,
          phoneNumber: true,
          address: true,
          website: true,
          logo: true,
          industryId: true,
        },
      });

      res.status(200).json({
        message: "Companies fetched successfully ✅",
        data: companies,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch companies" });
    }
  }
  async getCompanyDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const company = await prisma.company.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          about: true,
          country: true,
          state: true,
          city: true,
          zipCode: true,
          regionNumber: true,
          phoneNumber: true,
          address: true,
          website: true,
          logo: true,
        },
      });
      res
        .status(200)
        .send({ message: "Company fetched successfully ✅", data: company });
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  }

  async updateLogo(req: Request, res: Response) {
    try {
      const companyId = req.company?.id;

      if (!req.file) throw { message: "Logo is required" };
      const { secure_url } = await cloudinaryUpload(req.file, "jobsdoors");

      await prisma.company.update({
        where: { id: companyId },
        data: {
          logo: secure_url,
        },
      });
      res
        .status(200)
        .send({ message: "Logo updated successfully ✅", secure_url });
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  }
}
