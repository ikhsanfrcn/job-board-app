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
    this.router.post("/start", this.skillAssessmentController.startAssessment);
    this.router.patch("/update", this.skillAssessmentController.updateSessionTime);
    this.router.get("/resume", this.skillAssessmentController.resumeAssessment);
    this.router.post("/submit", this.skillAssessmentController.submitAssessment);
  }

  getRouter(): Router {
    return this.router;
  }
}
