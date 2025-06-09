import { Router } from "express";
import { SkillAssessmentController } from "../controller/assessment.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class SkillAssessmentRouter {
  private router: Router;
  private skillAssessmentController: SkillAssessmentController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.skillAssessmentController = new SkillAssessmentController();
    this.authMiddleware = new AuthMiddleware();
    this.InitializeRoute();
  }

  private InitializeRoute() {
    this.router.get("/", this.skillAssessmentController.getAllAssessment);
    this.router.post("/", this.skillAssessmentController.createAssessment);
    this.router.get(
      "/:templateId",
      this.authMiddleware.verifyToken,
      this.skillAssessmentController.getAssessmentById
    );
    this.router.post(
      "/start/:templateId",
      this.authMiddleware.verifyToken,
      this.skillAssessmentController.startAssessment
    );
    this.router.put(
      "/progress",
      this.authMiddleware.verifyToken,
      this.skillAssessmentController.saveProgress
    );
    this.router.post(
      "/submit",
      this.authMiddleware.verifyToken,
      this.skillAssessmentController.submitAssessment
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
