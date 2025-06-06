import { Request, Response } from "express";
import { registerDeveloper } from "../services/auth/registerDeveloper";
import { registerDevSchema } from "../validation/authValidation";
import { loginDeveloper } from "../services/auth/loginDeveloper";

export class DeveloperController {
  async registerDeveloper(req: Request, res: Response) {
    try {
      const validatedData = await registerDevSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const dev = await registerDeveloper(validatedData);

      res.status(201).json(dev);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async loginDeveloper(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await loginDeveloper(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}
