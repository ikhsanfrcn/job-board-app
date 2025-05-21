import { Request, Response } from "express";
import { requestPasswordReset } from "../services/password/requestReset";
import { resetPassword } from "../services/password/resetPassword";

export class PasswordController {
  async requestResetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await requestPasswordReset(email);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { newPassword } = req.body;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const result = await resetPassword(userId, newPassword);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
  }
}
