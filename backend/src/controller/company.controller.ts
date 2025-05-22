import { Request, Response } from "express";
import { registerCompany } from "../services/company/registerCompany";
import { loginCompany } from "../services/company/loginCompany";
import { verifyCompanyAccount } from "../services/company/verifyCompany";
import { requestPasswordReset } from "../services/company/requestReset";
import { passwordReset } from "../services/company/passwordReset";
import { registerCompanySchema } from "../validation/authValidation";

export class CompanyController {
  async register(req: Request, res: Response) {
    try {
      const validateData = await registerCompanySchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      })
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
}
