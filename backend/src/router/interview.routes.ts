import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { InterviewController } from "../controller/interview.controller";

export class InterviewRouter {
  private router: Router;
  private interviewController: InterviewController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.interviewController = new InterviewController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post("/", this.interviewController.createInterview)
    this.router.post("/send-reminder", this.interviewController.sendInterviewReminders)
  }

  getRouter(): Router {
    return this.router
  }
}
