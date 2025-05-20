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
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async resetPassword(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    const { newPassword } = req.body;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(400).json({ message: "Authorization token is missing or invalid" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const result = await resetPassword(token, newPassword);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
}

}
