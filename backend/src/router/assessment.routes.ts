import { Router } from "express";
import { SkillAssessmentController } from "../controller/assessment.controller";

export class SkillAssessmentRouter {
  private router: Router;
  private skillAssessmentController: SkillAssessmentController;

  constructor() {
    this.router = Router();
    this.skillAssessmentController = new SkillAssessmentController();
    this.InitializeRoute();
  }

  private InitializeRoute() {
    this.router.get("/", this.skillAssessmentController.getAllAssessment);
    this.router.post("/", this.skillAssessmentController.createAssessment);
    this.router.get("/:templateId", this.skillAssessmentController.getAssessmentById);
    this.router.post("/start/:templateId", this.skillAssessmentController.startAssessment);
    this.router.patch("/update", this.skillAssessmentController.updateSessionTime);
    this.router.get("/resume", this.skillAssessmentController.resumeAssessment);
    this.router.post("/submit", this.skillAssessmentController.submitAssessment);
    this.router.patch("/progress", this.skillAssessmentController.updateSessionProgress);
    this.router.get("/resume/:sessionToken", this.skillAssessmentController.resumeAssessment);
    this.router.get("/active/:templateId", this.skillAssessmentController.getActiveSession);
  }

  getRouter(): Router {
    return this.router;
  }
}
