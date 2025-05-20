import { Request, Response } from "express";
import { registerUser } from "../services/auth/registerUser";
import { verifyUserAccount } from "../services/auth/verifyUser";
import { loginUser } from "../services/auth/loginUser";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const user = await registerUser({
        username,
        email,
        password,
      });

      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const result = await verifyUserAccount(req.user?.id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const result = await loginUser(username, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}
