import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { PasswordController } from "../controller/password.controller";

export class PasswordRouter {
  private router: Router;
  private passwordController: PasswordController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.passwordController = new PasswordController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post("/request-reset", this.passwordController.requestResetPassword);
    this.router.patch("/reset", this.authMiddleware.verifyToken, this.passwordController.resetPassword);
  }

  getRouter(): Router {
    return this.router;
  }
}
