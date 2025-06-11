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
    this.router.get(
      "/user-assessment",
      this.authMiddleware.verifyToken,
      this.skillAssessmentController.getUserAssessments
    );

    this.router.get(
      "/generate-pdf/:id",
      this.authMiddleware.verifyToken,
      this.skillAssessmentController.generatePdf
    );

    this.router.post(
      "/start/:templateId",
      this.authMiddleware.verifyToken,
      this.skillAssessmentController.startAssessment
    );
    this.router.get("/:id", this.skillAssessmentController.getAssessmentById);
    this.router.put("/:id", this.skillAssessmentController.editAssessment);
    this.router.delete("/:id", this.skillAssessmentController.deleteAssessment);
    this.router.get(
      "/:templateId",
      this.authMiddleware.verifyToken,
      this.skillAssessmentController.getAssessmentByTemplateId
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
