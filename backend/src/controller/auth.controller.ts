import { Request, Response } from "express";
import { registerUser } from "../services/auth/registerUser";
import { verifyUserAccount } from "../services/auth/verifyUser";
import { loginUser } from "../services/auth/loginUser";
import { googleAuth } from "../services/auth/googleAuth";
import { userPasswordReset } from "../services/auth/resetPassword";
import { requestUserPasswordReset } from "../services/auth/requestReset";

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

  async googleAuth(req: Request, res: Response) {
    try {
      const {email, username, password, avatar} = req.body;

      const result = await googleAuth({email, username, password, avatar});
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message})
    }
  }

  async requestPasswordReset(req: Request, res: Response) {
      try {
        const { email } = req.body;
        const result = await requestUserPasswordReset(email);
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
        res.status(400).json({ message: "Authorization token is missing or invalid" });
        return;
      }
  
      const token = authHeader.split(" ")[1];
  
      const result = await userPasswordReset(token, newPassword);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
  }
}
