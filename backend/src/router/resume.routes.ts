import { Router } from "express";
import { ResumeController } from "../controller/resume.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class ResumeRouter {
  private router: Router;
  private resumeController: ResumeController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.resumeController = new ResumeController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post(
      "/",
      this.authMiddleware.verifyToken,
      this.resumeController.createResume
    );

    this.router.put(
      "/",
      this.authMiddleware.verifyToken,
      this.resumeController.updateResume
    );

    this.router.get(
      "/user",
      this.authMiddleware.verifyToken,
      this.resumeController.getUserResume
    );

    this.router.get(
      "/generate-pdf",
      this.authMiddleware.verifyToken,
      this.resumeController.generatePdf
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
