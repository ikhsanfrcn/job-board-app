import { Request, Response } from "express";
import { registerCompany } from "../services/company/registerCompany";
import { loginCompany } from "../services/company/loginCompany";
import { verifyCompanyAccount } from "../services/company/verifyCompany";

export class CompanyController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, industryId } = req.body;
      const result = await registerCompany({
        name,
        email,
        password,
        industryId,
      });

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
}
